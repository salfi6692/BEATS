import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, GraduationCap, Award, Users, BookOpen, Compass, ArrowUpRight, Play, CheckCircle } from 'lucide-react';
import { LEADERSHIP_PROFILES } from '../data/beatsData';

interface HeroProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenLeadershipModal: (id: 'md' | 'dmd') => void;
  onExploreStreams: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    tag: 'Discipline & Character',
    title: 'Nurturing Future Leaders with Naval Heritage & Academic Rigor',
    caption: 'Student morning assembly and ethos instilled across 87+ campuses nationwide.'
  },
  {
    image: 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg',
    tag: 'Academic Distinction',
    title: 'Awarded by Chief of Naval Staff for BISE Board Positions',
    caption: '94% passing average across 1,607 SSC-II candidates in all 3 provinces.'
  },
  {
    image: 'https://beats.com.pk/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-27-at-6.14.33-PM-768x512.jpeg',
    tag: 'Holistic Education',
    title: 'From Early Montessori to Cambridge O-Level & Higher Secondary',
    caption: 'Modern multimedia classrooms, science laboratories, and co-curricular excellence.'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onExploreStreams
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative bg-gradient-to-b from-slate-950 via-[#0a1e3a] to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Maritime Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        {/* Subtle geometric naval waves */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Core Vision */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Institutional Credential Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Bahria Foundation • Established 1998</span>
              <span className="text-blue-400">|</span>
              <span className="text-amber-300">A Trusted Partner</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-amber-400 font-semibold tracking-wider text-sm uppercase">
                Welcome To Bahria Education &amp; Training System (BEATS)
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
                Excellence in Education, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-sky-300">
                  Rooted in Integrity &amp; Discipline.
                </span>
              </h1>
            </div>

            {/* Narrative Body */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Founded under the patronage of the <strong className="text-white font-medium">Bahria Foundation</strong> to provide high-quality, affordable education nationwide. Today, BEATS empowers <span className="text-amber-300 font-semibold">37,000+ students</span> across <span className="text-white font-semibold">87+ colleges and schools</span> in rural, urban, and coastal regions of Pakistan.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>English Medium BISE &amp; O-Level</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>94% Board Pass Rate</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated Faculty Training</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={onOpenAdmissionModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5 text-slate-900" />
                <span>Apply for Admission</span>
              </button>

              <button
                onClick={onExploreStreams}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/90 hover:border-slate-600 transition-all cursor-pointer backdrop-blur-xs"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Explore Academic Streams</span>
              </button>

              <button
                onClick={onOpenProspectusModal}
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
              >
                <span>View Prospectus PDF</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Leadership Spotlight Mini-Cards */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                Executive Leadership
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* MD Profile Card */}
                <div 
                  onClick={() => onOpenLeadershipModal('md')}
                  className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-700/70 hover:bg-slate-800/70 transition-all cursor-pointer"
                >
                  <img
                    src="https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg"
                    alt="MD Bahria Foundation"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700 group-hover:border-amber-400/80 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">MD-BF</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-white flex items-center">
                        Read <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">Vice Admiral (R) MD Bahria Foundation</div>
                    <div className="text-[11px] text-slate-400 truncate">Managing Director's Vision</div>
                  </div>
                </div>

                {/* DMD Profile Card */}
                <div 
                  onClick={() => onOpenLeadershipModal('dmd')}
                  className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-700/70 hover:bg-slate-800/70 transition-all cursor-pointer"
                >
                  <img
                    src="https://beats.com.pk/wp-content/uploads/2026/09/wordpress_image-931x1024.png"
                    alt="DMD BEATS"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700 group-hover:border-amber-400/80 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">DMD-BEATS</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-white flex items-center">
                        Read <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">Commodore (R) DMD BEATS</div>
                    <div className="text-[11px] text-slate-400 truncate">Directorate Welcome Message</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Slider & Statistics Overlay */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900">
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={HERO_SLIDES[currentSlide].image}
                  alt={HERO_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-100 hover:scale-102"
                />
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Slide indicator tags */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-900/90 text-amber-300 border border-blue-700/80 backdrop-blur-md">
                    {HERO_SLIDES[currentSlide].tag}
                  </span>
                </div>

                {/* Slide content overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 drop-shadow-sm">
                    {HERO_SLIDES[currentSlide].title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1 drop-shadow-xs">
                    {HERO_SLIDES[currentSlide].caption}
                  </p>
                </div>
              </div>

              {/* Slider Controls Bar */}
              <div className="px-4 py-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide ? 'w-7 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>Campus Moments ({currentSlide + 1}/{HERO_SLIDES.length})</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Pill Card */}
            <div className="bg-gradient-to-br from-blue-950/70 to-slate-900/90 border border-blue-800/40 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">BISE SSC-II Excellence</div>
                  <div className="text-sm font-bold text-white">94% Passing Average Across 3 Regions</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  1,607+ Appeared
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Elegant Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 text-slate-50 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};
