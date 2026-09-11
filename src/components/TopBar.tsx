import React from 'react';
import { Phone, Mail, FileText, MapPin, Award, ShieldAlert, Download } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface TopBarProps {
  onOpenProspectusModal: () => void;
  onSelectRegion: (regionId: string) => void;
  onOpenAdmin: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenProspectusModal, onSelectRegion, onOpenAdmin }) => {
  const { settings, isAdminAuthenticated } = useSettings();

  return (
    <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Info & dynamic announcement */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-5">
          <a 
            href={`tel:${settings.admissionPhone}`} 
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium text-slate-200"
            title="Call Admission Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings.admissionPhone}</span>
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <a 
            href={`mailto:${settings.admissionEmail}`} 
            className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            title="Official Email"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings.admissionEmail}</span>
          </a>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="hidden xl:inline-block text-slate-400 max-w-sm truncate text-[11px]">
            {settings.headerAnnouncement}
          </span>
        </div>

        {/* Right: Quick Portals & Prospectus & Admin portal link */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-1 text-slate-400 text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Bahria Foundation (Pakistan Navy)</span>
          </div>

          <span className="text-slate-700 hidden lg:inline">•</span>

          <button
            onClick={() => onSelectRegion('all')}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{settings.statCampuses} Campuses</span>
          </button>

          {/* Prospectus link directly to settings.prospectusUrl */}
          <a
            href={settings.prospectusUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 px-2.5 py-1 rounded font-semibold border border-amber-500/30 transition-all cursor-pointer"
            title="Download Prospectus"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Prospectus</span>
          </a>

          {/* Admin link */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
              isAdminAuthenticated
                ? 'bg-blue-900/60 text-amber-300 border-amber-500/40 hover:bg-blue-800'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800'
            }`}
            title="BEATS Administration Panel (/admin)"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>{isAdminAuthenticated ? 'Admin Dashboard' : 'Admin'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
