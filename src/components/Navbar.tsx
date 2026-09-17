/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Download, 
  Shield, 
  BookOpen, 
  Building2, 
  UserCheck, 
  Award, 
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export type PortalRoute = string;

interface NavSubItem {
  label: string;
  action?: () => void;
  section?: string;
}

interface NavItem {
  id: string;
  label: string;
  route: PortalRoute;
  hasDropdown?: boolean;
  onClick?: () => void;
  action?: () => void;
  section?: string;
  items?: NavSubItem[];
}

interface NavbarProps {
  currentRoute?: PortalRoute;
  onNavigateRoute: (route: PortalRoute) => void;
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenLeadershipModal: (id: 'md' | 'dmd') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute = 'home',
  onNavigateRoute,
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onNavigateSection,
  onOpenAdmin
}) => {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    onNavigateSection(sectionId);
  };

  // Dynamically build navLinks from settings.menuItems
  const rawMenuItems = (settings.menuItems && settings.menuItems.length > 0)
    ? settings.menuItems
    : [];

  const navLinks: NavItem[] = rawMenuItems
    .filter((m) => m.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((m) => {
      const hasDropdown = Boolean(m.hasDropdown && m.items && m.items.length > 0);
      return {
        id: m.id,
        label: m.label,
        route: m.route as PortalRoute,
        hasDropdown,
        onClick: () => onNavigateRoute(m.route as PortalRoute),
        items: m.items?.map((sub) => ({
          label: sub.label,
          action: () => {
            if (sub.link && (sub.link.startsWith('http') || sub.link.startsWith('https'))) {
              window.open(sub.link, '_blank', 'noopener,noreferrer');
            } else if (sub.route === 'admission-modal') {
              onOpenAdmissionModal();
            } else if (sub.route === 'prospectus-modal') {
              onOpenProspectusModal();
            } else if (sub.route) {
              onNavigateRoute(sub.route as PortalRoute);
            }
          }
        }))
      };
    });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand with Official Bahria Crest */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-3 group focus:outline-hidden shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={settings.logoUrl}
                alt={settings.siteTitle}
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden items-center gap-2">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0B1E3F] to-slate-950 text-amber-400 font-bold flex items-center justify-center text-xl shadow-md border border-amber-500/30">
                  ⚓
                </div>
                <div>
                  <span className="block font-bold text-slate-900 tracking-tight text-lg">BEATS</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Bahria Foundation</span>
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation with Animated Navy Hover Background */}
          <nav 
            className="hidden xl:flex items-center space-x-1 text-sm font-semibold text-slate-700"
            onMouseLeave={() => {
              setHoveredNav(null);
              setActiveDropdown(null);
            }}
          >
            {navLinks.map((link) => {
              const isHovered = hoveredNav === link.id;
              const isDropdownOpen = activeDropdown === link.id;

              return (
                <div 
                  key={link.id} 
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredNav(link.id);
                    if (link.hasDropdown) {
                      setActiveDropdown(link.id);
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      if (link.onClick) {
                        link.onClick();
                      } else if (link.action) {
                        link.action();
                      } else if (link.section) {
                        handleNavClick(link.section);
                      }
                    }}
                    className={`relative z-10 flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs lg:text-[13px] font-bold transition-colors duration-200 cursor-pointer ${
                      currentRoute === link.route || isHovered || isDropdownOpen 
                        ? 'text-amber-300' 
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                        }`} 
                      />
                    )}
                  </button>

                  {/* Active or Hover Background Navy Pill */}
                  {(isHovered || currentRoute === link.route) && (
                    <motion.div
                      layoutId="navHoverNavy"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      className={`absolute inset-0 z-0 rounded-lg ${
                        currentRoute === link.route
                          ? 'bg-blue-950 text-white border border-amber-400/40 shadow-sm'
                          : 'bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0A1A36] border border-blue-700/60 shadow-md shadow-blue-950/20'
                      }`}
                    />
                  )}

                  {/* Modern Dropdown Menu with Animated Navy Hover on Sub-items */}
                  <AnimatePresence>
                    {link.hasDropdown && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 pt-2 z-50"
                      >
                        <div className="bg-slate-950/95 backdrop-blur-xl rounded-xl shadow-2xl border border-blue-900/60 p-2 text-slate-200 divide-y divide-slate-800/80">
                          <div className="space-y-1 pb-1">
                            {link.items?.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (item.action) {
                                    item.action();
                                  } else if (item.section) {
                                    handleNavClick(item.section);
                                  }
                                }}
                                className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-200 hover:text-amber-300 hover:bg-[#0B1E3F] transition-all flex items-center justify-between group cursor-pointer"
                              >
                                <span className="font-medium group-hover:translate-x-1 transition-transform">
                                  {item.label}
                                </span>
                                <span className="text-[10px] text-slate-500 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  &rarr;
                                </span>
                              </button>
                            ))}
                          </div>

                          {/* Quick Message link in About dropdown */}
                          {link.id === 'about' && (
                            <div className="pt-2 px-1 flex gap-2">
                              <button
                                onClick={() => {
                                  setActiveDropdown(null);
                                  onOpenLeadershipModal('md');
                                }}
                                className="flex-1 text-center py-1.5 px-2 bg-blue-900/80 hover:bg-blue-800 text-amber-300 text-[11px] font-bold rounded-md transition-colors"
                              >
                                MD-BF Message
                              </button>
                              <button
                                onClick={() => {
                                  setActiveDropdown(null);
                                  onOpenLeadershipModal('dmd');
                                }}
                                className="flex-1 text-center py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-sky-300 text-[11px] font-medium rounded-md transition-colors border border-slate-700"
                              >
                                DMD-BEATS
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Download Prospectus Quick Link */}
            <a
              href={settings.prospectusUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-slate-200 cursor-pointer"
              title="Download Prospectus (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Prospectus</span>
            </a>

            {/* Admission CTA Button */}
            <button
              onClick={onOpenAdmissionModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer transform active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>Admissions 2025–26</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmissionModal}
              className="sm:flex hidden items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg"
            >
              <span>Apply</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu with Animated Navy Active Highlights */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 text-white border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmissionModal();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>Apply Online</span>
            </button>
            <a
              href={settings.prospectusUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Prospectus PDF</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200 max-h-[60vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.id} className="py-0.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      link.onClick();
                    } else if (link.action) {
                      link.action();
                    } else if (link.section) {
                      handleNavClick(link.section);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-bold transition-all flex items-center justify-between ${
                    currentRoute === link.route
                      ? 'bg-blue-900 text-amber-300 border-l-4 border-amber-400'
                      : 'text-slate-100 hover:text-amber-300 hover:bg-[#0B1E3F]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {link.hasDropdown && (
                  <div className="pl-4 pr-2 py-1 space-y-1">
                    {link.items?.map((subItem, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (subItem.action) {
                            subItem.action();
                          } else if (subItem.section) {
                            handleNavClick(subItem.section);
                          }
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs rounded text-slate-300 hover:text-amber-300 hover:bg-blue-950/80 transition-colors"
                      >
                        • {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Helpline in Mobile Menu */}
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Admission Helpline:</span>
            <a href={`tel:${settings.admissionPhone}`} className="text-amber-400 font-bold">
              {settings.admissionPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
