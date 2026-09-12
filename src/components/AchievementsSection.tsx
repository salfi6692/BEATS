import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const AchievementsSection: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors &amp; Board Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            {settings.achievementsHeading || 'Academic Achievements & CNS Honors'}
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            {settings.achievementsSubheading || 'Consistently outperforming nationwide benchmarks through dedicated pedagogical training, disciplined focus, and relentless pursuit of excellence.'}
          </p>
        </div>

        {/* Highlight Banner with Naval Chief Honors */}
        <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-10 backdrop-blur-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-600 shadow-xl group">
                <img
                  src={settings.achievementsImage || 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg'}
                  alt="Chief of Naval Staff Awarding Medals and Certificates to BFC Position Holders"
                  className="w-full h-auto object-cover max-h-[380px] transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 text-left">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Official Ceremony</div>
                  <div className="text-sm font-semibold text-white">Chief of Naval Staff Annual Awards &amp; Medals Distribution</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center italic">
                Award ceremony honoring BISE position holders and top scorers of Bahria Foundation Colleges nationwide.
              </p>
            </div>

            {/* Right Narrative & Metrics */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 text-blue-200 text-xs font-semibold">
                  <Medal className="w-4 h-4 text-amber-400" />
                  <span>Grade 10 Annual Examination (SSC-II)</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {settings.cnsAwardTitle || 'Chief of Naval Staff Academic Excellence Award'}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {settings.cnsAwardDesc || 'The Chief of Naval Staff awarded Certificates of Appreciation, Cash Prizes, and Gold/Silver Medals to the students of Bahria Foundation Colleges (BFCs) who secured top positions in the Grade 10 Annual Examinations conducted by Boards of Intermediate and Secondary Education (BISE).'}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  Results of the centralized formal assessment of Grade 10 students across Pakistan revealed that out of <strong className="text-amber-300 font-semibold">{settings.achievementsStatCandidates || '1,607'} BFC candidates</strong> appearing in the SSC-II examination, the overall passing average across all 3 regions remained a remarkable <strong className="text-emerald-400 font-bold">{settings.statPassRate || '94%'}</strong>.
                </p>
              </div>

              {/* Stat Highlights Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">{settings.statPassRate || '94%'}</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Passing Average</div>
                  <div className="text-[10px] text-slate-400">All 3 regional zones</div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">{settings.achievementsStatCandidates || '1,607'}</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Candidates</div>
                  <div className="text-[10px] text-slate-400">SSC-II examinations</div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 text-left col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-display">{settings.achievementsStatTopPositions || 'Top 10'}</div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">Board Positions</div>
                  <div className="text-[10px] text-slate-400">Cash prizes &amp; medals</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Scholarships for higher college &amp; university studies granted to position holders.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
