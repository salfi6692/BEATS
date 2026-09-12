import React from 'react';
import { ShieldCheck, Compass, UserCheck, MapPin, FlaskConical, Sparkles, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { WHY_CHOOSE_REASONS } from '../data/beatsData';
import { useSettings } from '../context/SettingsContext';

interface WhyChooseUsProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal
}) => {
  const { settings } = useSettings();

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Compass': return Compass;
      case 'UserCheck': return UserCheck;
      case 'MapPin': return MapPin;
      case 'FlaskConical': return FlaskConical;
      case 'Sparkles': return Sparkles;
      default: return CheckCircle2;
    }
  };

  return (
    <section id="why-choose" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
            <span>Institutional Distinctions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {settings.whyChooseHeading || 'Why Choose Bahria Foundation Colleges?'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {settings.whyChooseSubheading || 'Combining naval ethos with modern academic pedagogy to foster well-rounded, capable, and confident citizens of Pakistan.'}
          </p>
        </div>

        {/* Top Infographic Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Educational Philosophy</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {settings.whyChoosePhilosophyTitle || 'Character, Discipline & Academic Leadership Under One Roof'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {settings.whyChoosePhilosophyDesc || 'Bahria Foundation Colleges represent a standard of trust. Our schools cultivate an atmosphere where academic curiosity is matched by personal discipline, patriotic reverence, and empathy.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Merit &amp; Transparent Admissions</div>
                    <div className="text-[11px] text-slate-500">Accessible standard fee structure nationwide with welfare concessions for naval families.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Naval Mentorship &amp; Integrity</div>
                    <div className="text-[11px] text-slate-500">Supervised directly by seasoned retired Naval officers ensuring high ethical standards.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Continuous Faculty Empowerment</div>
                    <div className="text-[11px] text-slate-500">Dedicated Teacher Training Institutes providing year-round modern pedagogic upskilling.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Apply Now for Session 2025–26</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <a
                  href={settings.prospectusUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Prospectus</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                <img
                  src={settings.whyChooseImage || 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-3.webp'}
                  alt="Bahria Foundation College Campus"
                  className="w-full h-auto object-cover max-h-[380px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_REASONS.map((reason, idx) => {
            const Icon = getIcon(reason.icon);
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {reason.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
