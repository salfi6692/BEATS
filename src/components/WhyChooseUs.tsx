import React from 'react';
import { ShieldCheck, Compass, UserCheck, MapPin, FlaskConical, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { WHY_CHOOSE_REASONS } from '../data/beatsData';

interface WhyChooseUsProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal
}) => {
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
            Why Choose Bahria Foundation Colleges?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Combining naval ethos with modern academic pedagogy to foster well-rounded, capable, and confident citizens of Pakistan.
          </p>
        </div>

        {/* Top Infographic Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Educational Philosophy</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Character, Discipline &amp; Academic Leadership Under One Roof
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bahria Foundation Colleges represent a standard of trust. Our schools cultivate an atmosphere where academic curiosity is matched by personal discipline, patriotic reverence, and empathy.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Standardized Centralized Examination System</div>
                    <div className="text-[11px] text-slate-500">Uniform academic quality overseen by the Directorate in Islamabad.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Seamless Inter-Campus Transferability</div>
                    <div className="text-[11px] text-slate-500">Relocating families and armed forces personnel enjoy hassle-free campus admissions across Pakistan.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Accessible &amp; Subsidized Tuition Fees</div>
                    <div className="text-[11px] text-slate-500">Affordable world-class education with dedicated scholarships for deserving students.</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center gap-4">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-900 hover:bg-blue-800 shadow-sm transition-all cursor-pointer"
                >
                  Start Admission Process
                </button>
                <button
                  onClick={onOpenProspectusModal}
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Download Prospectus
                </button>
              </div>
            </div>

            {/* Infographic Image from Official Site */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                <img
                  src="https://beats.com.pk/wp-content/uploads/2026/09/ChatGPT-Image-Sep-2-2026-12_06_20-PM-1024x683.png"
                  alt="Reasons to Choose Bahria Foundation Colleges Infographic"
                  className="w-full h-auto object-cover max-h-[420px]"
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
