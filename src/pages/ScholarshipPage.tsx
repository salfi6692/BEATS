/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SCHOLARSHIP_PAGE_DATA } from '../data/beatsData';

interface ScholarshipPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onOpenAdmission: () => void;
}

export const ScholarshipPage: React.FC<ScholarshipPageProps> = ({
  onNavigateHome,
  onNavigateContact,
  onOpenAdmission,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Scholarship & Further Studies', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <Award className="w-3.5 h-3.5" />
              Academic Pathways &amp; Welfare Subsidies
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Scholarships &amp; Higher Studies
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Empowering Bahria graduates with strategic university partnerships, merit concessions, and skill training opportunities for sustainable career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Featured MoU with Iqra University */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: MoU Announcement */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Institutional Partnership
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  MoU with Iqra University (Chak Shahzad Campus)
                </h2>
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <p className="text-xs sm:text-sm text-blue-950 font-bold">
                  {SCHOLARSHIP_PAGE_DATA.mouHeading}
                </p>
                <div className="space-y-1.5 pl-2">
                  {SCHOLARSHIP_PAGE_DATA.programs.map((prog, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Bahria Education &amp; Training System is dedicated to creating sustainable pathways for our matric and intermediate graduates. Through this strategic Memorandum of Understanding, enrolled BFEI alumni benefit from preferential scholarship packages, tuition fee concessions, and direct counseling support.
                </p>
                <p>
                  Both institutions collaborate in advancing technical vocational competence, contemporary IT training, and globally benchmarked undergraduate degree programs.
                </p>
              </div>

              {/* Contact Callout from PDF */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-slate-700">
                  <div className="font-bold text-slate-900">For Further Details &amp; Application Assistance:</div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 text-blue-900 font-semibold">
                      <Mail className="w-3.5 h-3.5" /> beats@bahriafoundation.com
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                      <Phone className="w-3.5 h-3.5" /> 0317-1178979
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateContact}
                  className="px-4 py-2 bg-blue-950 text-white rounded-lg text-xs font-bold hover:bg-blue-900 transition-colors shrink-0 cursor-pointer"
                >
                  Contact Desk
                </button>
              </div>
            </div>

            {/* Right Column: Visual highlights */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1E3F] to-slate-950 text-white p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-blue-800/80 mb-6">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">Key Strategic Focus Areas</h3>
                </div>

                <div className="space-y-4 text-xs text-slate-200">
                  {SCHOLARSHIP_PAGE_DATA.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blue-900/30 border border-blue-800/50">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-blue-900/60 mt-6 text-[11px] text-slate-400">
                MoU executed under the supervision of Directorate BEATS &amp; Iqra University Islamabad Administration.
              </div>
            </div>

          </div>
        </div>

        {/* Additional Welfare & Higher Studies Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Merit Scholarships</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Awarded to high achievers who secure distinction and top positions in BISE Board and Cambridge examinations across our 87+ colleges nationwide.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Naval Personnel &amp; MDP Subsidies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Special tuition fee reductions and dedicated seats for children of naval personnel, armed forces service members, and martyrs of defense (MDP).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Career Counseling &amp; Pre-Meds</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive mentoring seminars for MDCAT, ECAT, ISSB, and competitive scholarship admissions into prime Pakistani and overseas universities.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
