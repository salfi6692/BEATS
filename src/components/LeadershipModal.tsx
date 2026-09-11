import React, { useState } from 'react';
import { X, Award, ChevronRight, Quote, Shield } from 'lucide-react';
import { LEADERSHIP_PROFILES } from '../data/beatsData';

interface LeadershipModalProps {
  initialId: 'md' | 'dmd';
  isOpen: boolean;
  onClose: () => void;
}

export const LeadershipModal: React.FC<LeadershipModalProps> = ({
  initialId,
  isOpen,
  onClose
}) => {
  const [activeLeaderId, setActiveLeaderId] = useState<'md' | 'dmd'>(initialId);

  if (!isOpen) return null;

  const activeLeader = LEADERSHIP_PROFILES.find((p) => p.id === activeLeaderId) || LEADERSHIP_PROFILES[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Tabs */}
        <div className="bg-slate-900 p-4 sm:p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLeaderId('md')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLeaderId === 'md'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              MD-BF Message
            </button>
            <button
              onClick={() => setActiveLeaderId('dmd')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLeaderId === 'dmd'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              DMD-BEATS Message
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative">
              <img
                src={activeLeader.image}
                alt={activeLeader.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-900 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-blue-900 text-amber-400 flex items-center justify-center shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {activeLeader.designation}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {activeLeader.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Bahria Foundation • Pakistan Navy
              </p>
            </div>
          </div>

          {/* Quote Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Quote className="w-6 h-6 text-blue-900 shrink-0 mt-1" />
            <p className="text-sm font-medium italic text-blue-950 leading-relaxed">
              &ldquo;{activeLeader.messageSnippet}&rdquo;
            </p>
          </div>

          {/* Full Message Paragraphs */}
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {activeLeader.fullMessage.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official Directorate Dispatch • BEATS</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
