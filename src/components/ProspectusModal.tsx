import React from 'react';
import { X, FileText, Download, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmission: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmission
}) => {
  const { settings } = useSettings();
  if (!isOpen) return null;

  const prospectusContents = [
    'Complete Rules of Admission & Eligibility Criteria',
    'Curriculum Framework for Montessori, SSC & O-Levels',
    'Fee Structure, Subsidies & Armed Forces Welfare Concessions',
    'Naval Ethos, Discipline, Uniform Guidelines & House System',
    'Higher Studies Scholarships & Cash Awards for Board Toppers',
    'Comprehensive Directory of All 87+ Campuses with Contacts'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Official Publication</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Bahria Education &amp; Training System Prospectus
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 font-light">
            Comprehensive Institutional Handbook for Parents &amp; Students
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-14 rounded-lg bg-red-100 text-red-700 border border-red-200 flex flex-col items-center justify-center font-bold shrink-0 shadow-xs">
              <span className="text-[10px] uppercase font-mono">PDF</span>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Final-PROSPECTUS-BEATS.pdf
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Official document issued by Directorate BEATS, Bahria Foundation Islamabad.
              </p>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              Included in this Edition:
            </h5>
            <div className="space-y-2">
              {prospectusContents.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={settings.prospectusUrl || 'https://beats.com.pk/wp-content/uploads/2024/12/Final-PROSPECTUS-22-02-2024.pdf'}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Full Prospectus (PDF)</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenAdmission();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Apply Online
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
