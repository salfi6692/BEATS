/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  CheckCircle2, 
  Users, 
  Shield, 
  MapPin, 
  ArrowRight,
  BookOpen,
  Award,
  Download,
  GraduationCap
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ABOUT_DATA } from '../data/beatsData';
import { useSettings } from '../context/SettingsContext';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateCampuses: () => void;
  onOpenAdmission: () => void;
  onOpenProspectus: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateCampuses,
  onOpenAdmission,
  onOpenProspectus
}) => {
  const { settings } = useSettings();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'About', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <Shield className="w-3.5 h-3.5" />
              Established 1998 • Pakistan Navy Bahria Foundation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              About Bahria Education &amp; Training System
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Spreading quality education and moral discipline across Pakistan since 1998, empowering over 37,000 students in 87+ institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Introduction & History Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Institutional Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Introduction &amp; Overview of BEATS
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  {ABOUT_DATA.overview}
                </p>
                <p>
                  {ABOUT_DATA.overviewContinuation}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">History &amp; Milestones</h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {ABOUT_DATA.history}
                </p>
              </div>

              {/* Quick Action Links */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  onClick={onNavigateCampuses}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-950 hover:bg-blue-900 transition-colors shadow-sm cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>View Our Campuses Network</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenProspectus}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Prospectus</span>
                </button>
              </div>
            </div>

            {/* Visual Graphic Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group bg-slate-900">
                <img
                  src={settings.aboutImage || 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-5.webp'}
                  alt="Bahria Foundation College Campus"
                  className="w-full h-80 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    BFEIs Network
                  </span>
                  <p className="text-sm font-medium text-slate-200">
                    87+ Colleges &amp; 120 Campuses across North, Centre &amp; South Regions
                  </p>
                </div>
              </div>

              {/* Statistics strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-950">87+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Institutions</div>
                </div>
                <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-amber-700">37,000+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Students</div>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-emerald-800">3,200+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Staff Members</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission & Quaid Quote Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vision & Mission Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 mb-4">
                <Target className="w-6 h-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Vision of BEATS</h3>
              <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-4 border-amber-500 pl-4 py-1">
                &ldquo;{ABOUT_DATA.vision}&rdquo;
              </blockquote>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <Compass className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mission of BEATS</h3>
              <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-4 border-blue-900 pl-4 py-1">
                &ldquo;{ABOUT_DATA.mission}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Quaid-e-Azam Muhammad Ali Jinnah Quote Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1E3F] to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-3 mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Father of the Nation
                </span>
                <span className="text-xs text-slate-400">Quaid-e-Azam</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic font-serif">
                &ldquo;{ABOUT_DATA.quaidQuote}&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-blue-900/60 mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-bold text-amber-400">
                🇵🇰
              </div>
              <div>
                <strong className="block text-sm text-white font-bold">Quaid-e-Azam Muhammad Ali Jinnah</strong>
                <span className="text-xs text-slate-400">Founder of Pakistan</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9 Core Objectives */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Our Educational Objectives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Cultivating holistic intellectual, moral, and leadership excellence in every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ABOUT_DATA.objectives.map((obj, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-all hover:border-blue-200 group"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Organizational Structure: BEATS Committees */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="border-b border-slate-100 pb-6 mb-8 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Governance &amp; Oversight
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Organizational Structure &amp; Committees
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Structured leadership and academic audit governance ensuring quality benchmarks nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Committee 1: Education Committee */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                  <Building2 className="w-5 h-5 text-blue-950" />
                  <h3 className="font-bold text-slate-900 text-base">
                    {ABOUT_DATA.committees.educationCommittee.title}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-200/60 text-xs">
                  {ABOUT_DATA.committees.educationCommittee.members.map((m, i) => (
                    <li key={i} className="py-2 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{m.role}</span>
                      <span className="text-blue-900 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-medium border border-blue-100">
                        {m.designation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Committee 2: BEATS Coordination Committee (BCC) */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                  <Users className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    {ABOUT_DATA.committees.coordinationCommittee.title}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-200/60 text-xs">
                  {ABOUT_DATA.committees.coordinationCommittee.members.map((m, i) => (
                    <li key={i} className="py-2 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{m.role}</span>
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-100">
                        {m.designation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Committee 3: Academic Review Committee (ARC) */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-bold text-slate-900 text-base">
                    {ABOUT_DATA.committees.academicReviewCommittee.title}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-200/60 text-xs">
                  {ABOUT_DATA.committees.academicReviewCommittee.members.map((m, i) => (
                    <li key={i} className="py-2 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{m.role}</span>
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-100">
                        {m.designation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0A1A36] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-blue-900">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Join the Bahria Legacy?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Admissions are open for 2025–26 across Montessori, Primary, Secondary, HSSC &amp; O Level.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmission}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md transition-all cursor-pointer"
            >
              Apply for Admission
            </button>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
            >
              Back to Home
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
