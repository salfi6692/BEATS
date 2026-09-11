/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Megaphone, Pause, Play, ChevronRight, Sparkles, ExternalLink, Settings, Bell } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { MarqueeItem } from '../types/settings';

interface MarqueeTickerProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
  onOpenLeadershipModal?: (id: 'md' | 'dmd') => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onNavigateSection,
  onOpenAdmin
}) => {
  const { settings, isAdminAuthenticated } = useSettings();
  const marquee = settings.marquee;
  const [isPaused, setIsPaused] = useState(false);

  if (!marquee || !marquee.enabled) {
    return null;
  }

  const items = marquee.items && marquee.items.length > 0 ? marquee.items : [];

  if (items.length === 0) {
    return null;
  }

  // Determine theme styling
  const themeClasses = (() => {
    switch (marquee.theme) {
      case 'gold':
        return {
          wrapper: 'bg-amber-500 text-slate-950 border-amber-600/30',
          badge: 'bg-slate-950 text-amber-400 font-bold',
          itemPill: 'hover:bg-amber-400/80 text-slate-950',
          itemBadge: 'bg-slate-900 text-amber-300',
          accent: 'text-slate-950'
        };
      case 'blue':
        return {
          wrapper: 'bg-gradient-to-r from-blue-900 via-sky-900 to-blue-950 text-white border-blue-700/40',
          badge: 'bg-sky-500 text-slate-950 font-extrabold',
          itemPill: 'hover:bg-white/10 text-white',
          itemBadge: 'bg-blue-800 text-sky-300 border border-blue-700',
          accent: 'text-sky-300'
        };
      case 'dark':
        return {
          wrapper: 'bg-slate-950 text-slate-200 border-slate-800',
          badge: 'bg-emerald-500 text-slate-950 font-bold',
          itemPill: 'hover:bg-slate-900 text-slate-200',
          itemBadge: 'bg-emerald-950 text-emerald-400 border border-emerald-800',
          accent: 'text-emerald-400'
        };
      case 'navy':
      default:
        return {
          wrapper: 'bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#071326] text-slate-100 border-b border-blue-900/60 shadow-xs',
          badge: 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-xs',
          itemPill: 'hover:bg-blue-950/80 hover:text-amber-300 text-slate-100 transition-colors',
          itemBadge: 'bg-blue-900/80 text-amber-300 border border-amber-400/30',
          accent: 'text-amber-400'
        };
    }
  })();

  // Speed duration mapping in seconds
  const speedDuration = (() => {
    switch (marquee.speed) {
      case 'fast':
        return '24s';
      case 'slow':
        return '65s';
      case 'normal':
      default:
        return '40s';
    }
  })();

  const handleItemClick = (item: MarqueeItem) => {
    const textLower = item.text.toLowerCase();
    const badgeLower = (item.badge || '').toLowerCase();

    if (item.link) {
      if (item.link.startsWith('#')) {
        const id = item.link.replace('#', '');
        if (onNavigateSection) onNavigateSection(id);
      } else {
        window.open(item.link, '_blank', 'noreferrer');
      }
      return;
    }

    if (badgeLower.includes('admission') || textLower.includes('admission')) {
      if (onOpenAdmissionModal) onOpenAdmissionModal();
    } else if (badgeLower.includes('prospectus') || textLower.includes('prospectus')) {
      if (onOpenProspectusModal) onOpenProspectusModal();
    } else if (textLower.includes('admiral') || textLower.includes('naval staff') || textLower.includes('md') || textLower.includes('leadership')) {
      if (onOpenLeadershipModal) onOpenLeadershipModal('md');
    } else if (textLower.includes('stream') || textLower.includes('curriculum')) {
      if (onNavigateSection) onNavigateSection('academics');
    } else if (textLower.includes('campuses') || textLower.includes('region')) {
      if (onNavigateSection) onNavigateSection('campuses');
    }
  };

  return (
    <div
      className={`relative z-30 w-full overflow-hidden text-xs transition-colors duration-300 select-none ${themeClasses.wrapper}`}
      onMouseEnter={() => {
        if (marquee.pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (marquee.pauseOnHover) setIsPaused(false);
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center h-10">
        {/* Static Left Badge with Live Radar Glow */}
        <div className="flex items-center shrink-0 z-20 pr-3 sm:pr-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider ${themeClasses.badge}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span className="font-extrabold">{marquee.label || 'LATEST UPDATES'}</span>
          </div>
        </div>

        {/* Marquee Ticker Track with Smooth CSS Animation */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          <div
            className="flex items-center gap-8 whitespace-nowrap will-change-transform"
            style={{
              animation: `marqueeScroll ${speedDuration} linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Render items twice to ensure a seamless infinite scrolling loop */}
            {[...items, ...items].map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                onClick={() => handleItemClick(item)}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs cursor-pointer group text-left transition-all ${themeClasses.itemPill}`}
                title="Click to view details"
              >
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${themeClasses.itemBadge}`}>
                    {item.badge}
                  </span>
                )}
                <span className="font-medium text-[12px] group-hover:underline">
                  {item.text}
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls: Play/Pause toggle & Quick Admin link */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-3 z-20">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
            aria-label={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {isAdminAuthenticated && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="p-1 rounded-md hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              title="Configure Marquee in Admin Panel"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Embedded CSS for smooth marquee scrolling without external CSS dependencies */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
