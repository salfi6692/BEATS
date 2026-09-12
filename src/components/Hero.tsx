/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  ChevronRight, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ArrowUpRight, 
  Download, 
  Building2, 
  Award,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { MainSlider } from './MainSlider';

interface HeroProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenLeadershipModal: (id: 'md' | 'dmd') => void;
  onExploreStreams: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onExploreStreams
}) => {
  const { settings } = useSettings();

  return (
    <section id="hero" className="relative bg-slate-950 overflow-hidden">
      {/* 1. Main Slider Component with Smooth Faded Animation & Full Navigation */}
      <MainSlider
        onOpenAdmissionModal={onOpenAdmissionModal}
        onOpenProspectusModal={onOpenProspectusModal}
        onOpenLeadershipModal={onOpenLeadershipModal}
        onExploreStreams={onExploreStreams}
      />

      {/* 2. Institutional Welcome Banner (Text directly from provided code) */}
      <div className="relative z-10 bg-gradient-to-b from-slate-950 via-[#071326] to-slate-900 border-b border-blue-900/40 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Welcome Narrative */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{settings.heroBadgeText || 'Welcome To Bahria Education and Training System'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                {settings.heroHeadline || 'Bahria Education and Training System (BEATS)'}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {settings.heroSubheadline || 'Bahria Education And Training System (BEATS) was established in 1998 following the vision of Bahria Foundation to spread education facilities all over the country, especially in under-developed areas.'}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                BEATS has progressed well over the years and is presently operating more than <span className="text-amber-400 font-bold">{settings.statCampuses || '87+'} Bahria Foundation School and Colleges</span> located all across Pakistan. BEATS is catering to the educational needs of approximately <span className="text-sky-300 font-bold">{settings.statStudents || '37,000+'} students</span> in rural and urban areas of Pakistan. BEATS also own training institutes to train their teachers.
              </p>

              {/* Badges / Metrics Row */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-xs">
                  <div className="text-xs text-slate-400 font-medium">Campuses</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400">87+</div>
                  <div className="text-[11px] text-slate-500">Across Pakistan</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-xs">
                  <div className="text-xs text-slate-400 font-medium">Students</div>
                  <div className="text-xl sm:text-2xl font-black text-sky-400">37,000+</div>
                  <div className="text-[11px] text-slate-500">Rural &amp; Urban</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-xs">
                  <div className="text-xs text-slate-400 font-medium">BISE Pass Rate</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">94%</div>
                  <div className="text-[11px] text-slate-500">1,607 Candidates</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-xs">
                  <div className="text-xs text-slate-400 font-medium">Training Centers</div>
                  <div className="text-xl sm:text-2xl font-black text-purple-400">03 TTIs</div>
                  <div className="text-[11px] text-slate-500">Faculty Growth</div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Actions / Direct Regional Jump */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1E3F]/80 to-slate-950 border border-blue-800/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Direct Access</span>
                  <span className="text-[10px] text-slate-400">Bahria Network</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={onOpenAdmissionModal}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-white font-semibold text-xs border border-blue-700/60 transition-all cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Online Admission Form</span>
                    </span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>

                  <a
                    href={settings.prospectusUrl || 'https://beats.com.pk/wp-content/uploads/2024/12/Final-PROSPECTUS-22-02-2024.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-800 transition-all cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-sky-400" />
                      <span>Official Prospectus 2024–26</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </a>

                  <button
                    onClick={() => onOpenLeadershipModal('md')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-800 transition-all cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>MD-BF Leadership Message</span>
                    </span>
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 text-center">
                  Head Office: Japan Road, Near Ibadat university, Sihala, Islamabad
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
