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

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('beats_site_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          sections: {
            ...DEFAULT_SITE_SETTINGS.sections,
            ...(parsed.sections || {})
          },
          sectionOrder: Array.isArray(parsed.sectionOrder) && parsed.sectionOrder.length > 0
            ? parsed.sectionOrder
            : DEFAULT_SITE_SETTINGS.sectionOrder,
          slides: Array.isArray(parsed.slides) && parsed.slides.length > 0
            ? parsed.slides
            : DEFAULT_SITE_SETTINGS.slides,
          galleryPhotos: Array.isArray(parsed.galleryPhotos) && parsed.galleryPhotos.length > 0
            ? parsed.galleryPhotos
            : DEFAULT_SITE_SETTINGS.galleryPhotos,
          marquee: {
            ...DEFAULT_SITE_SETTINGS.marquee,
            ...(parsed.marquee || {}),
            items: Array.isArray(parsed.marquee?.items) && parsed.marquee.items.length > 0
              ? parsed.marquee.items
              : DEFAULT_SITE_SETTINGS.marquee.items
          }
        };
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

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
        console.error('Failed to persist settings', e);
      }
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
