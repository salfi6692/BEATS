import React from 'react';
import { Target, Compass, BookOpen, Wrench, Users, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface AboutOverviewProps {
  onOpenProspectus: () => void;
  onExploreCampuses: () => void;
}

export const AboutOverview: React.FC<AboutOverviewProps> = ({
  onOpenProspectus,
  onExploreCampuses
}) => {
  const { settings } = useSettings();

  const pillars = [
    {
      num: '01',
      title: settings.pillar1Title || 'Formal Academic Campuses',
      desc: settings.pillar1Desc || 'Preschool, Primary, Secondary (SSC), Higher Secondary (HSSC/College), and Cambridge O-Level curricula.',
      icon: BookOpen,
      badge: 'Core Track',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/40'
    },
    {
      num: '02',
      title: settings.pillar2Title || 'Vocational & Technical Centers',
      desc: settings.pillar2Desc || 'Applied skills, IT training, and market-driven vocational trades preparing young men and women for immediate careers.',
      icon: Wrench,
      badge: 'Applied Skills',
      color: 'border-amber-200 hover:border-amber-400 bg-amber-50/40'
    },
    {
      num: '03',
      title: settings.pillar3Title || 'Non-Formal & Adult Education',
      desc: settings.pillar3Desc || 'Community-based literacy centers providing basic numeracy and functional reading in rural and coastal settlements.',
      icon: Users,
      badge: 'Community Outreach',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40'
    },
    {
      num: '04',
      title: settings.pillar4Title || 'Joint-Venture & Promotional Projects',
      desc: settings.pillar4Desc || 'Public-private educational partnerships expanding access in remote areas of Balochistan, Sindh, and Khyber Pakhtunkhwa.',
      icon: Handshake,
      badge: 'Partnerships',
      color: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-blue-800" />
            <span>{settings.aboutBadge || 'Our Foundation & Legacy'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {settings.aboutHeading || 'A Quarter-Century of Empowering Pakistan Through Education'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {settings.aboutDescription || 'Established in 1998 by the Bahria Foundation, BEATS translates naval welfare into lasting social impact, opening doorways of enlightenment for thousands of families across Pakistan.'}
          </p>
        </div>

        {/* Narrative & Institutional Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p className="text-lg font-medium text-slate-900 leading-snug">
                Bahria Education And Training System (BEATS) was established in 1998 following the visionary directive of the Bahria Foundation to spread modern, high-quality educational facilities all over the country—especially in under-developed and remote areas.
              </p>
              <p>
                From humble beginnings, BEATS has progressed dynamically over the years and is presently operating more than <span className="font-semibold text-blue-900">{settings.statCampuses || '87+'} Bahria Foundation Schools &amp; Colleges</span> located all across Pakistan. Today, BEATS proudly caters to the educational needs of approximately <span className="font-semibold text-blue-900">{settings.statStudents || '37,000+'} students</span> in both rural and urban locales.
              </p>
              <p>
                To sustain academic excellence, BEATS also operates its own dedicated <strong className="text-slate-900">Teacher Training Institutes ({settings.statInstitutes || '03 TTIs'})</strong> where faculty members undergo rigorous pedagogical workshops, modern technology integrations, and ethical mentorship.
              </p>
            </div>

            {/* Mission Callout Card */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-md border border-blue-950">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    BEATS Official Mission Statement
                  </div>
                  <p className="text-sm sm:text-base italic text-slate-200 font-light leading-relaxed">
                    &ldquo;To provide quality and affordable education for equipping the beneficiaries with knowledge and skills for self-sustainability and socio-economic growth.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Quick check bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modern science and digital laboratories</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Naval discipline &amp; moral character building</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subsidized fees &amp; naval welfare concessions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Co-curricular houses, debates, &amp; sports</span>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                <img
                  src="https://beats.com.pk/wp-content/uploads/2026/09/Code_Generated_Image-4-853x1024.gif"
                  alt="Bahria Education and Training System Overview"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Bahria Foundation Network</div>
                    <div className="text-[11px] text-slate-500">Spread over {settings.statCampuses || '87+'} locations across Pakistan</div>
                  </div>
                  <button
                    onClick={onExploreCampuses}
                    className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Regions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bahria Foundation Educational Institutions (BFEIs) 4 Pillars */}
        <div id="bfeis" className="pt-6">
          <div className="text-left mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Bahria Foundation Educational Institutions (BFEIs)
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl">
              BFEIs encompass an integrated network of formal, vocational, and community-based education. Governed and expanded by BEATS directly and in partnership with regional stakeholders:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${item.color} bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">{item.num}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-900 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
