/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SiteSettings, DEFAULT_SITE_SETTINGS, SectionKey } from '../types/settings';

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  saveSettingsPermanently: (overrideSettings?: Partial<SiteSettings>) => Promise<{ success: boolean; message: string }>;
  isSaving: boolean;
  lastSavedTime: string | null;
  resetSettings: () => void;
  updateSectionVisibility: (sectionKey: keyof SiteSettings['sections'], value: boolean) => void;
  reorderSections: (newOrder: SectionKey[]) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'beats_site_settings_v2';
const AUTH_KEY = 'beats_admin_auth_v1';

async function persistSettingsToServer(latestSettings: SiteSettings): Promise<{ success: boolean; message: string }> {
  try {
    const payload = JSON.stringify({ settings: latestSettings });
    let res: Response | null = null;
    try {
      res = await fetch('/api/save-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });
    } catch {}

    if (!res || !res.ok) {
      try {
        // Fallback to PHP script for cPanel Apache hosting
        res = await fetch('api/save-settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });
      } catch {}
    }

    if (res && res.ok) {
      return { success: true, message: 'Settings saved permanently to disk (site-settings.json)' };
    }
    return { success: true, message: 'Settings saved safely in browser storage' };
  } catch (e) {
    console.warn('Background server save failed, settings remain cached locally:', e);
    return { success: true, message: 'Settings saved in browser local storage' };
  }
}

function mergeSettings(target: SiteSettings, source: any): SiteSettings {
  if (!source || typeof source !== 'object') return target;
  return {
    ...target,
    ...source,
    sections: {
      ...target.sections,
      ...(source.sections || {})
    },
    sectionOrder: Array.isArray(source.sectionOrder) && source.sectionOrder.length > 0
      ? source.sectionOrder
      : target.sectionOrder,
    slides: Array.isArray(source.slides) && source.slides.length > 0
      ? source.slides
      : target.slides,
    galleryPhotos: Array.isArray(source.galleryPhotos) && source.galleryPhotos.length > 0
      ? source.galleryPhotos
      : target.galleryPhotos,
    marquee: {
      ...target.marquee,
      ...(source.marquee || {}),
      items: Array.isArray(source.marquee?.items) && source.marquee.items.length > 0
        ? source.marquee.items
        : target.marquee.items
    }
  };
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('beats_site_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return mergeSettings(DEFAULT_SITE_SETTINGS, parsed);
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const settingsRef = useRef<SiteSettings>(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Load latest settings from server on mount while protecting user edits from being overwritten
  useEffect(() => {
    let isMounted = true;

    async function loadServerSettings() {
      try {
        let serverData: any = null;
        try {
          const res = await fetch(`/api/settings?v=${Date.now()}`);
          if (res.ok) {
            serverData = await res.json();
          }
        } catch {}

        if (!serverData) {
          try {
            const res = await fetch(`site-settings.json?v=${Date.now()}`);
            if (res.ok) {
              serverData = await res.json();
            }
          } catch {}
        }

        if (serverData && typeof serverData === 'object' && isMounted) {
          setSettings((prev) => {
            const localTimestamp = prev.updatedAt || 0;
            const serverTimestamp = serverData.updatedAt || 0;

            // 1. If local settings were saved AFTER server settings, local changes WIN.
            // Never let older server defaults erase user's custom images or documents!
            if (localTimestamp > serverTimestamp) {
              // Silently sync local changes back to the server so site-settings.json catches up
              persistSettingsToServer(prev);
              settingsRef.current = prev;
              return prev;
            }

            // 2. Otherwise server is newer or equal:
            const mergedFromServer = mergeSettings(DEFAULT_SITE_SETTINGS, serverData);

            // Protect any custom uploaded media paths (/media/ or data:) from being replaced by remote fallbacks
            const mediaKeys: (keyof SiteSettings)[] = [
              'logoUrl', 'faviconUrl', 'prospectusUrl', 'mdImage', 'dmdImage',
              'aboutImage', 'achievementsImage', 'whyChooseImage'
            ];
            const finalMerged = { ...mergedFromServer };
            let hasLocalMediaOverride = false;
            for (const key of mediaKeys) {
              const localVal = prev[key] as string;
              const serverVal = serverData[key] as string;
              if (localVal && (localVal.includes('/media/') || localVal.startsWith('data:'))) {
                if (!serverVal || !serverVal.includes('/media/') || localTimestamp >= serverTimestamp) {
                  (finalMerged as any)[key] = localVal;
                  if (localVal !== serverVal) hasLocalMediaOverride = true;
                }
              }
            }

            if (hasLocalMediaOverride) {
              persistSettingsToServer(finalMerged);
            }

            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMerged));
            } catch {}
            settingsRef.current = finalMerged;
            return finalMerged;
          });
        }
      } catch (err) {
        console.warn('Could not fetch server site-settings.json:', err);
      }
    }

    loadServerSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Keep favicon & title updated dynamically
  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
    if (settings.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
  }, [settings.siteTitle, settings.faviconUrl]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const now = Date.now();
    const updated: SiteSettings = { 
      ...settingsRef.current, 
      ...newSettings,
      updatedAt: now
    };
    settingsRef.current = updated;
    setSettings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist settings to localStorage', e);
    }
    // Persist permanently to site-settings.json on disk / cPanel hosting
    persistSettingsToServer(updated);
  };

  const saveSettingsPermanently = async (overrideSettings?: Partial<SiteSettings>): Promise<{ success: boolean; message: string }> => {
    setIsSaving(true);
    try {
      const now = Date.now();
      const latest: SiteSettings = {
        ...settingsRef.current,
        ...(overrideSettings || {}),
        updatedAt: now
      };
      settingsRef.current = latest;
      setSettings(latest);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(latest));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      const res = await persistSettingsToServer(latest);
      setLastSavedTime(new Date().toLocaleTimeString());
      return res;
    } finally {
      setIsSaving(false);
    }
  };

  const updateSectionVisibility = (sectionKey: keyof SiteSettings['sections'], value: boolean) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionKey]: value
        },
        updatedAt: Date.now()
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist section visibility', e);
      }
      persistSettingsToServer(updated);
      return updated;
    });
  };

  const reorderSections = (newOrder: SectionKey[]) => {
    setSettings((prev) => {
      const updated = { 
        ...prev, 
        sectionOrder: newOrder,
        updatedAt: Date.now()
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      persistSettingsToServer(updated);
      return updated;
    });
  };

  const resetSettings = () => {
    const reset = { ...DEFAULT_SITE_SETTINGS, updatedAt: Date.now() };
    setSettings(reset);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('beats_site_settings_v1');
    } catch (e) {
      console.error(e);
    }
    persistSettingsToServer(reset);
  };

  const loginAdmin = (user: string, pass: string): boolean => {
    // Credentials required by user:
    // user: salfi6692
    // pass: Bilal@123
    if (user.trim() === 'salfi6692' && pass === 'Bilal@123') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        saveSettingsPermanently,
        isSaving,
        lastSavedTime,
        resetSettings,
        updateSectionVisibility,
        reorderSections,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
