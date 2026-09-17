/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smile, 
  Cpu, 
  Flag, 
  Camera, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Shirt, 
  ArrowRightLeft, 
  Trophy, 
  CheckCircle2, 
  Info,
  Layers
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CAMPUS_LIFE_PAGE_DATA, GALLERY_ITEMS } from '../data/beatsData';

interface CampusLifePageProps {
  onNavigateHome: () => void;
  onOpenAdmission: () => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = ({
  onNavigateHome,
  onOpenAdmission,
}) => {
  const [activeUniformTab, setActiveUniformTab] = useState<'summer' | 'winter'>('summer');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#071326] via-[#0B1E3F] to-[#0D284C] text-white py-14 border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Campus Life', active: true }]} onNavigateHome={onNavigateHome} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
              <Smile className="w-3.5 h-3.5" />
              Vibrant Student Experience • Character, Sports &amp; Innovation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Life at Bahria Foundation Colleges
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Discover our Enhanced Learning Environments (ELE), House System competitions, attendance protocols via face recognition, and uniform regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        
        {/* Learning Environment & ELE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Pedagogy &amp; Spaces
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              {CAMPUS_LIFE_PAGE_DATA.learningEnvironment.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {CAMPUS_LIFE_PAGE_DATA.learningEnvironment.content}
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-blue-900/60 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-blue-800/80">
              <Cpu className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                {CAMPUS_LIFE_PAGE_DATA.ele.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {CAMPUS_LIFE_PAGE_DATA.ele.content}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                21st Century Digital Classrooms
              </span>
            </div>
          </div>
        </section>

        {/* BEATS Houses System */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              House System
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {CAMPUS_LIFE_PAGE_DATA.houses.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {CAMPUS_LIFE_PAGE_DATA.houses.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAMPUS_LIFE_PAGE_DATA.houses.items.map((house, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 shadow-xs border text-center flex flex-col justify-between ${house.color}`}
              >
                <div>
                  <Flag className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  <h3 className="text-2xl font-black tracking-widest uppercase">
                    {house.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-white/40 mx-auto my-3" />
                  <p className="text-xs opacity-90 leading-relaxed">
                    {house.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 text-[11px] font-semibold">
                  Annual Sports &amp; Debate Shield
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policies & Attendance Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Attendance Policy with Facial Recognition */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Mandatory Protocol
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {CAMPUS_LIFE_PAGE_DATA.attendance.title}
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                75% Threshold
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>{CAMPUS_LIFE_PAGE_DATA.attendance.badge}</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {CAMPUS_LIFE_PAGE_DATA.attendance.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Student Leave Rules */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Discipline Code
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {CAMPUS_LIFE_PAGE_DATA.leaveRules.title}
              </h3>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {CAMPUS_LIFE_PAGE_DATA.leaveRules.intro}
            </p>

            <div className="space-y-3 pt-2">
              {CAMPUS_LIFE_PAGE_DATA.leaveRules.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            {/* Inter-College Transfers Note */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-blue-900" />
                <span>Inter-College Transfers Policy</span>
              </div>
              <p className="text-slate-700">
                {CAMPUS_LIFE_PAGE_DATA.transfers.content}
              </p>
            </div>
          </div>

        </section>

        {/* Timings, Breaks & Competitions Strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {CAMPUS_LIFE_PAGE_DATA.timings.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {CAMPUS_LIFE_PAGE_DATA.timings.content}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {CAMPUS_LIFE_PAGE_DATA.breaks.title}
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {CAMPUS_LIFE_PAGE_DATA.breaks.items.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {CAMPUS_LIFE_PAGE_DATA.activities.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {CAMPUS_LIFE_PAGE_DATA.activities.content}
            </p>
          </div>
        </section>

        {/* Uniform Regulations (Summer & Winter Lists for Boys & Girls) */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Dress Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Official Uniform Regulations
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Prescribed disciplined attire for Bahria Foundation College students.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setActiveUniformTab('summer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  activeUniformTab === 'summer'
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Summer Uniform
              </button>
              <button
                onClick={() => setActiveUniformTab('winter')}
                className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  activeUniformTab === 'winter'
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Winter Uniform
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boys Uniform */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <Shirt className="w-5 h-5 text-blue-950" />
                <h3 className="font-bold text-slate-900 text-base">
                  Boys Uniform ({activeUniformTab === 'summer' ? 'Summer' : 'Winter'})
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {CAMPUS_LIFE_PAGE_DATA.uniform[activeUniformTab].boys.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Girls Uniform */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <Shirt className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Girls Uniform ({activeUniformTab === 'summer' ? 'Summer' : 'Winter'})
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {CAMPUS_LIFE_PAGE_DATA.uniform[activeUniformTab].girls.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
