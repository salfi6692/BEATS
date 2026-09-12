/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, DEFAULT_SITE_SETTINGS, SectionKey } from '../types/settings';

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  updateSectionVisibility: (sectionKey: keyof SiteSettings['sections'], value: boolean) => void;
  reorderSections: (newOrder: SectionKey[]) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'beats_site_settings_v2';
const AUTH_KEY = 'beats_admin_auth_v1';

async function persistSettingsToServer(latestSettings: SiteSettings): Promise<boolean> {
  try {
    const payload = JSON.stringify({ settings: latestSettings });
    let res = await fetch('/api/save-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });

    if (!res.ok) {
      // Fallback to PHP script for cPanel Apache hosting
      res = await fetch('api/save-settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      });
    }

    return res.ok;
  } catch (e) {
    console.warn('Background server save failed, settings remain cached locally:', e);
    return false;
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

  // Load latest settings from site-settings.json on mount so all devices/visitors see updated images & texts
  useEffect(() => {
    let isMounted = true;

    async function loadServerSettings() {
      try {
        // Try fetching site-settings.json with cache buster
        const res = await fetch(`site-settings.json?v=${Date.now()}`);
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && typeof serverData === 'object') {
            if (isMounted) {
              setSettings((prev) => {
                const merged = mergeSettings(prev, serverData);
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                } catch {}
                return merged;
              });
            }
          }
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
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist settings to localStorage', e);
      }
      // Persist permanently to site-settings.json on disk / cPanel hosting
      persistSettingsToServer(updated);
      return updated;
    });
  };

  const updateSectionVisibility = (sectionKey: keyof SiteSettings['sections'], value: boolean) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionKey]: value
        }
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
      const updated = { ...prev, sectionOrder: newOrder };
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
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('beats_site_settings_v1');
    } catch (e) {
      console.error(e);
    }
    persistSettingsToServer(DEFAULT_SITE_SETTINGS);
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
