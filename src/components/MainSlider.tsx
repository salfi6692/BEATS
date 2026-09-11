/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  GraduationCap, 
  BookOpen, 
  Download, 
  ArrowUpRight, 
  Shield, 
  Award, 
  Users, 
  Compass,
  MessageSquare
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface MainSliderProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenLeadershipModal: (id: 'md' | 'dmd') => void;
  onExploreStreams: () => void;
}

export const MainSlider: React.FC<MainSliderProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onExploreStreams
}) => {
  const { settings } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const slides = settings.slides && settings.slides.length > 0 ? settings.slides : [];

  const autoPlaySeconds = settings.heroAutoPlaySpeed || 6;

  // Auto-play timer with pause on hover
  useEffect(() => {
    if (!isPlaying || isHovered || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlaySeconds * 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, slides.length, autoPlaySeconds]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex % slides.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slider Canvas: Modern Cinematic Aspect Ratio */}
      <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Animated Slide Background with Smooth Fade & Gentle Zoom */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id || currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layered Modern Gradient Overlays for optimal readability and maritime aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071326]/95 via-[#071326]/80 to-transparent sm:w-3/4" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & Actions */}
            <div className="lg:col-span-8 space-y-6 text-left">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  {/* Tag Pill with Naval Emblem Indicator */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-600/40 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-md">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span className="text-amber-300 uppercase tracking-wider text-[11px] font-bold">
                      {currentSlide.tag || 'Bahria Education & Training System'}
                    </span>
                  </div>

                  {/* Main Slide Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-display max-w-3xl drop-shadow-md">
                    {currentSlide.title}
                  </h1>

                  {/* Slide Description Caption */}
                  <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
                    {currentSlide.caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onOpenAdmissionModal}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                  <span>Apply for Admission</span>
                </button>

                <button
                  onClick={onExploreStreams}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer backdrop-blur-md"
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Academic Streams</span>
                </button>

                <a
                  href={settings.prospectusUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Prospectus</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

              {/* Quick Institutional Highlights */}
              <div className="pt-4 flex flex-wrap gap-2 sm:gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Under Bahria Foundation (Pakistan Navy)</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span>94% Passing Average in BISE</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>87+ Campuses • 37,000+ Students</span>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Leadership Quick Cards (from original code) */}
            <div className="lg:col-span-4 hidden lg:block space-y-3">
              <div className="p-4 rounded-2xl bg-[#08152c]/85 border border-blue-900/40 backdrop-blur-xl shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Executive Leadership</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Bahria Foundation</span>
                </div>

                {/* MD-BF Mini Profile */}
                <div 
                  onClick={() => onOpenLeadershipModal('md')}
                  className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all cursor-pointer"
                >
                  <img
                    src="https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg"
                    alt="MD-BF"
                    className="w-13 h-13 rounded-lg object-cover border border-amber-400/40 shrink-0 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        Managing Director (MD-BF)
                      </h4>
                      <span className="text-[9px] bg-blue-900/90 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                        Message
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate">Vice Admiral (Retd) • Bahria Foundation</p>
                    <span className="text-[10px] text-amber-400/90 flex items-center gap-1 mt-0.5">
                      <MessageSquare className="w-2.5 h-2.5" /> Read Leadership Address
                    </span>
                  </div>
                </div>

                {/* DMD-BEATS Mini Profile */}
                <div 
                  onClick={() => onOpenLeadershipModal('dmd')}
                  className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-950/80 border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer"
                >
                  <img
                    src="https://beats.com.pk/wp-content/uploads/2026/09/wordpress_image-931x1024.png"
                    alt="DMD-BEATS"
                    className="w-13 h-13 rounded-lg object-cover border border-sky-400/40 shrink-0 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                        Deputy MD (DMD-BEATS)
                      </h4>
                      <span className="text-[9px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded font-bold border border-sky-800">
                        Director
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate">Bahria Education &amp; Training System</p>
                    <span className="text-[10px] text-sky-400/90 flex items-center gap-1 mt-0.5">
                      <MessageSquare className="w-2.5 h-2.5" /> Operational Overview
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>87+ Campuses Nationwide</span>
                  <span className="text-amber-400 font-semibold">Established 1998</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Navigation Controls (Left & Right Buttons with Smooth Hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-blue-900 text-white border border-white/10 hover:border-amber-400/60 backdrop-blur-md flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          title="Previous slide"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-slate-100" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-blue-900 text-white border border-white/10 hover:border-amber-400/60 backdrop-blur-md flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
          title="Next slide"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-slate-100" />
        </button>
      </div>

      {/* Modern Bottom Navigation Bar: Slide Tabs, Progress Dots & Play/Pause */}
      <div className="relative z-20 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Interactive Slide Thumbnail Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id || idx}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-amber-300 border border-amber-400/40 shadow-sm'
                      : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-slate-800'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-400' : 'bg-slate-600'}`} />
                  <span className="truncate max-w-[140px] sm:max-w-[180px]">
                    {slide.tag || `Slide ${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Slide Counter, Progress Dots & Play/Pause */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide Counter */}
            <div className="text-xs font-mono font-bold text-slate-400">
              <span className="text-amber-400 text-sm">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-slate-600">/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>

            {/* Pagination Dots with Animated Progress */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className="group relative py-1 focus:outline-hidden cursor-pointer"
                    title={`Go to slide ${idx + 1}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-7 bg-amber-400 shadow-xs shadow-amber-400/50'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-md bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
