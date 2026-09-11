import React, { useState } from 'react';
import { BookOpen, Check, Award, Globe, GraduationCap, ArrowRight, Baby, Sparkles, Download } from 'lucide-react';
import { ACADEMIC_STREAMS } from '../data/beatsData';
import { useSettings } from '../context/SettingsContext';

interface AcademicStreamsProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectus: () => void;
}

export const AcademicStreams: React.FC<AcademicStreamsProps> = ({
  onOpenAdmissionModal,
  onOpenProspectus
}) => {
  const { settings } = useSettings();
  const [selectedStreamId, setSelectedStreamId] = useState(ACADEMIC_STREAMS[0].id);

  const activeStream = ACADEMIC_STREAMS.find(s => s.id === selectedStreamId) || ACADEMIC_STREAMS[0];

  const getStreamIcon = (name: string) => {
    switch (name) {
      case 'Baby': return Baby;
      case 'BookOpen': return BookOpen;
      case 'GraduationCap': return GraduationCap;
      case 'Award': return Award;
      case 'Globe': return Globe;
      default: return BookOpen;
    }
  };

  return (
    <section id="academics" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span>{settings.academicBadge || 'Curriculum & Academic Pathways'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {settings.academicHeading || 'BFC Academic Streams'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {settings.academicSubheading || 'The medium of instruction at Bahria Foundation Colleges is English. We offer rigorous dual academic tracks aligning with both National BISE Boards and the Cambridge International Curriculum.'}
          </p>
        </div>

        {/* Stream Selector Buttons / Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2.5 no-scrollbar mb-10">
          {ACADEMIC_STREAMS.map((stream) => {
            const isSelected = stream.id === selectedStreamId;
            const Icon = getStreamIcon(stream.iconName);
            return (
              <button
                key={stream.id}
                onClick={() => setSelectedStreamId(stream.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 scale-102 border border-blue-950'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{stream.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stream Detailed View */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left description and key features */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-900">
                    Grade Span: {activeStream.gradeRange}
                  </span>
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900">
                    Age Group: {activeStream.ageGroup}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {activeStream.level}
                </h3>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {activeStream.description}
                </p>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Curricular Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStream.highlights.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-900 hover:bg-blue-800 text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Apply for {activeStream.title}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
                <a
                  href={settings.prospectusUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Syllabus &amp; Prospectus</span>
                </a>
              </div>
            </div>

            {/* Right stream visual & overview stats */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stream Overview</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Medium of Study:</span>
                    <span className="font-bold text-slate-900">100% English</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Board Affiliation:</span>
                    <span className="font-bold text-blue-900">Federal BISE / Cambridge CAIE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Assessment System:</span>
                    <span className="font-bold text-slate-900">Terminals &amp; Centralized Annual</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">Co-Curriculars:</span>
                    <span className="font-bold text-slate-900">Houses, Debates, Athletics, Robotics</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5">
                    <span className="text-slate-500 font-medium">Student-Teacher Ratio:</span>
                    <span className="font-bold text-emerald-700">Optimal 22:1 Care</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-3.5 rounded-xl bg-blue-950 text-white text-xs space-y-1 text-left">
                    <div className="font-bold text-amber-300">Religious &amp; Moral Instruction</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                      Alongside contemporary academic streams, comprehensive Nazra Quran, Islamic ethics, and character building are woven seamlessly into daily morning assemblies and class routines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
