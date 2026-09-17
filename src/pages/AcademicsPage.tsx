/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Baby, 
  Globe, 
  HeartHandshake, 
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ACADEMICS_PAGE_DATA, ACADEMIC_STREAMS } from '../data/beatsData';

interface AcademicsPageProps {
  onNavigateHome: () => void;
  onOpenAdmission: () => void;
  onOpenProspectus: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({
  onNavigateHome,
  onOpenAdmission,
  onOpenProspectus,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Academics', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Excellence • National &amp; Cambridge Curriculum
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Academic Streams &amp; Curriculum Framework
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our comprehensive academic divisions from Montessori to HSSC and Cambridge O-Levels, religious education mandates, and centralized promotion policies.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Academic Session Calendar Card */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Session Timetable
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                {ACADEMICS_PAGE_DATA.session.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {ACADEMICS_PAGE_DATA.session.content}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Medium of Instruction: <span className="text-blue-900 font-bold">English</span> across all Bahria Foundation Colleges nationwide.
              </p>
            </div>

            <div className="md:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800">Regular Stream (Pre to Class 10)</span>
                <span className="font-bold text-blue-950">March – Feb</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800">Higher Secondary (HSSC)</span>
                <span className="font-bold text-blue-950">Ends in May</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-800">Cambridge O-Level</span>
                <span className="font-bold text-blue-950">Starts in August</span>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Streams Grid */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Educational Pathways
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              BFC Academic Streams
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {ACADEMICS_PAGE_DATA.streamsIntro.content}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_STREAMS.map((stream) => (
              <div
                key={stream.id}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${stream.badgeColor}`}>
                      {stream.level}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {stream.gradeRange}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {stream.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {stream.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights</h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {stream.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Age Group: <strong className="text-slate-800">{stream.ageGroup}</strong>
                  </span>
                  <button
                    onClick={onOpenAdmission}
                    className="text-xs font-bold text-blue-900 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Apply Now &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Split Section: Religious Education & Promotion Policy */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Religious Education */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-800/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-800/60 pb-3 mb-2">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {ACADEMICS_PAGE_DATA.religiousEducation.title}
                </h3>
                <span className="text-xs text-emerald-300 font-medium">
                  Values &amp; Quranic Curriculum
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {ACADEMICS_PAGE_DATA.religiousEducation.intro}
            </p>

            <div className="space-y-3 pt-2">
              {ACADEMICS_PAGE_DATA.religiousEducation.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-xs sm:text-sm text-slate-100"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {String.fromCharCode(97 + idx)}
                  </div>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-emerald-300/80 pt-2 italic">
              * Fostering high moral integrity, character building, and reverence for Islamic values in all students.
            </p>
          </div>

          {/* Promotion Policy */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3 mb-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Academic Evaluation
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {ACADEMICS_PAGE_DATA.promotionPolicy.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ACADEMICS_PAGE_DATA.promotionPolicy.intro}
            </p>

            <div className="space-y-3 pt-2">
              {ACADEMICS_PAGE_DATA.promotionPolicy.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {String.fromCharCode(97 + idx)}
                  </div>
                  <span className="font-medium">{rule}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900 mt-4">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Examinations for Classes V to VII are centrally conducted by Directorate BEATS to maintain unified academic rigor.
              </span>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
