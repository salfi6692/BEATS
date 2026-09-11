import React from 'react';
import { Phone, Mail, FileText, MapPin, Award } from 'lucide-react';

interface TopBarProps {
  onOpenProspectusModal: () => void;
  onSelectRegion: (regionId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenProspectusModal, onSelectRegion }) => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Info */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <a 
            href="tel:+92518153585" 
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            title="Call Head Office"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">+92-51-8153585</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a 
            href="tel:+92518153584" 
            className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            title="Alternative Phone"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+92-51-8153584</span>
          </a>
          <span className="text-slate-600 hidden md:inline">|</span>
          <a 
            href="mailto:beats@bahriafoundation.com" 
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>beats@bahriafoundation.com</span>
          </a>
        </div>

        {/* Right: Quick Portals & Prospectus */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          <div className="hidden lg:flex items-center gap-1 text-slate-400">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Bahria Foundation • A Trusted Partner</span>
          </div>

          <span className="text-slate-700 hidden lg:inline">•</span>

          <button
            onClick={() => onSelectRegion('all')}
            className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>87+ Campuses Network</span>
          </button>

          <button
            onClick={onOpenProspectusModal}
            className="flex items-center gap-1.5 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 px-2.5 py-1 rounded font-medium border border-amber-500/30 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Prospectus (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
