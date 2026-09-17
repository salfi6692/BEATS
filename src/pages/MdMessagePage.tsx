/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  Quote, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Compass, 
  Users, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { MD_MESSAGE_DATA, LEADERSHIP_PROFILES } from '../data/beatsData';

interface MdMessagePageProps {
  onNavigateHome: () => void;
  onNavigateCampuses: () => void;
  onOpenAdmission: () => void;
  onNavigateAbout: () => void;
}

export const MdMessagePage: React.FC<MdMessagePageProps> = ({
  onNavigateHome,
  onNavigateCampuses,
  onOpenAdmission,
  onNavigateAbout,
}) => {
  const dmdProfile = LEADERSHIP_PROFILES.find((p) => p.id === 'dmd');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "MD's Message", active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Executive Leadership • Bahria Foundation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Message from Managing Director (MD-BF)
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Guiding the vision of Bahria Education &amp; Training System toward nationwide academic distinction, innovation, and ethical leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Managing Director Main Message Card */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Portrait & Credentials */}
            <div className="lg:col-span-4 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white p-8 flex flex-col items-center text-center justify-between">
              <div className="w-full flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-slate-800">
                    <img
                      src="https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg"
                      alt={MD_MESSAGE_DATA.leaderTitle}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-3 bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-xs font-bold shadow-md">
                    Pakistan Navy
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-wide">
                  {MD_MESSAGE_DATA.leaderTitle}
                </h3>
                <p className="text-xs font-semibold text-amber-400 mt-1 uppercase tracking-wider">
                  {MD_MESSAGE_DATA.leaderDesignation}
                </p>
                <div className="w-16 h-0.5 bg-blue-800 my-4" />
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  Steering Bahria Foundation in its mission of educational welfare, socio-economic uplift, and sustainable human resource development.
                </p>
              </div>

              {/* Three Strategic Pillars */}
              <div className="w-full pt-6 border-t border-blue-900/60 mt-6 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-blue-900/40 p-2 rounded-lg border border-blue-800/60">
                  <span className="block font-bold text-amber-300">Access</span>
                  <span className="text-[10px] text-slate-300">Nationwide</span>
                </div>
                <div className="bg-blue-900/40 p-2 rounded-lg border border-blue-800/60">
                  <span className="block font-bold text-amber-300">Quality</span>
                  <span className="text-[10px] text-slate-300">Audited</span>
                </div>
                <div className="bg-blue-900/40 p-2 rounded-lg border border-blue-800/60">
                  <span className="block font-bold text-amber-300">Governance</span>
                  <span className="text-[10px] text-slate-300">Accountable</span>
                </div>
              </div>
            </div>

            {/* Right Column: Message Content */}
            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-8">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                      Official Address
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      {MD_MESSAGE_DATA.heading}
                    </h2>
                  </div>
                  <Quote className="w-12 h-12 text-slate-200 shrink-0" />
                </div>

                <div className="text-lg font-bold text-blue-950 mb-4 font-serif">
                  {MD_MESSAGE_DATA.salutation},
                </div>

                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {MD_MESSAGE_DATA.paragraphs.map((p, idx) => (
                    <p key={idx} className={idx === 0 ? 'font-medium text-slate-900' : ''}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* Key Commitments Callout */}
                <div className="mt-8 bg-blue-50/80 rounded-xl p-5 border border-blue-100/80 space-y-3">
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Key Milestones &amp; Strategic Horizons
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>87 BFCs &amp; 120 Campuses Operating</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Over 37,000 Enrolled Students</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>3,200+ Qualified Teaching &amp; Admin Staff</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Inclusive Welfare &amp; Concessions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Signature & CTAs */}
              <div className="pt-8 border-t border-slate-100 mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block font-bold text-slate-900 text-sm">
                    {MD_MESSAGE_DATA.leaderTitle}
                  </span>
                  <span className="text-xs text-slate-500">
                    {MD_MESSAGE_DATA.leaderDesignation}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onNavigateAbout}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    About BEATS
                  </button>
                  <button
                    onClick={onOpenAdmission}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Deputy Managing Director Profile Section */}
        {dmdProfile && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3 text-center">
                <div className="w-32 h-36 rounded-xl overflow-hidden border-2 border-slate-300 mx-auto mb-3 shadow-md bg-slate-100">
                  <img
                    src={dmdProfile.image}
                    alt={dmdProfile.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{dmdProfile.name}</h4>
                <p className="text-xs text-amber-700 font-semibold">{dmdProfile.designation}</p>
              </div>

              <div className="md:col-span-9 space-y-3">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider block">
                  Operations &amp; Academic Leadership
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Message from Deputy Managing Director (DMD-BEATS)
                </h3>
                <div className="space-y-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {dmdProfile.fullMessage.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
