import React, { useState } from 'react';
import { Menu, X, ChevronDown, PhoneCall, Sparkles, GraduationCap, MapPin, Download, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenLeadershipModal: (id: 'md' | 'dmd') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmissionModal,
  onOpenProspectusModal,
  onOpenLeadershipModal,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const [campusesDropdownOpen, setCampusesDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setAcademicsDropdownOpen(false);
    setCampusesDropdownOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand with Official Crest */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="https://beats.com.pk/wp-content/uploads/2023/04/beats-bahria-logo-300x112-1.webp"
                alt="Bahria Education & Training System"
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-102"
                onError={(e) => {
                  // graceful fallback in case of connection drop
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden items-center gap-2">
                <div className="w-11 h-11 rounded-lg bg-navy-900 bg-gradient-to-br from-blue-900 to-slate-900 text-amber-400 font-bold flex items-center justify-center text-xl shadow-md border border-amber-500/30">
                  ⚓
                </div>
                <div>
                  <span className="block font-bold text-slate-900 tracking-tight text-lg">BEATS</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Bahria Foundation</span>
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Home
            </button>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('about')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-blue-800' : 'text-slate-400'}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 divide-y divide-slate-100">
                    <div className="px-1 py-1">
                      <button
                        onClick={() => handleNavClick('about')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 rounded-md transition-colors"
                      >
                        Introduction &amp; History (1998)
                      </button>
                      <button
                        onClick={() => handleNavClick('about')}
                        className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-900 rounded-md transition-colors"
                      >
                        Vision, Mission &amp; Objectives
                      </button>
                      <button
                        onClick={() => handleNavClick('bfeis')}
                        className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-900 rounded-md transition-colors"
                      >
                        Institutional Footprint (BFEIs)
                      </button>
                    </div>
                    <div className="px-1 py-1 bg-slate-50/50">
                      <button
                        onClick={() => {
                          setAboutDropdownOpen(false);
                          onOpenLeadershipModal('md');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-blue-950 font-medium hover:bg-blue-100/60 rounded-md flex items-center justify-between"
                      >
                        <span>MD-BF Message</span>
                        <span className="text-[10px] bg-blue-900 text-white px-1.5 py-0.5 rounded font-bold">Admiral</span>
                      </button>
                      <button
                        onClick={() => {
                          setAboutDropdownOpen(false);
                          onOpenLeadershipModal('dmd');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 rounded-md flex items-center justify-between"
                      >
                        <span>DMD-BEATS Message</span>
                        <span className="text-[10px] text-slate-500">Directorate</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Academics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademicsDropdownOpen(true)}
              onMouseLeave={() => setAcademicsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('academics')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>Academics</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${academicsDropdownOpen ? 'rotate-180 text-blue-800' : 'text-slate-400'}`} />
              </button>

              {academicsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2">
                    <button
                      onClick={() => handleNavClick('academics')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="font-semibold text-xs text-slate-800 group-hover:text-blue-900">Montessori &amp; Primary</div>
                      <div className="text-[11px] text-slate-500">Early childhood &amp; foundational English medium</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('academics')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="font-semibold text-xs text-slate-800 group-hover:text-blue-900">Secondary &amp; HSSC</div>
                      <div className="text-[11px] text-slate-500">BISE SSC-I/II &amp; Intermediate Pre-Medical / Pre-Engg</div>
                    </button>
                    <button
                      onClick={() => handleNavClick('academics')}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <div className="font-semibold text-xs text-purple-900 flex items-center justify-between">
                        <span>Cambridge O Level</span>
                        <span className="text-[9px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">CAIE</span>
                      </div>
                      <div className="text-[11px] text-slate-500">International General Certificate of Secondary Education</div>
                    </button>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => handleNavClick('achievements')}
                        className="w-full text-left p-2 text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-lg flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>94% Passing Average &amp; BISE Awards</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Campuses Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCampusesDropdownOpen(true)}
              onMouseLeave={() => setCampusesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('campuses')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>Campuses Network</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${campusesDropdownOpen ? 'rotate-180 text-blue-800' : 'text-slate-400'}`} />
              </button>

              {campusesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 divide-y divide-slate-100">
                    <div className="space-y-0.5 pb-1">
                      <button
                        onClick={() => handleNavClick('campuses')}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-md flex items-center justify-between"
                      >
                        <span className="font-semibold">North Region</span>
                        <span className="text-[11px] text-slate-500">Islamabad (42)</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('campuses')}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-md flex items-center justify-between"
                      >
                        <span className="font-semibold">Centre Region</span>
                        <span className="text-[11px] text-slate-500">Lahore (26)</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('campuses')}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-slate-800 hover:text-blue-900 rounded-md flex items-center justify-between"
                      >
                        <span className="font-semibold">South Region</span>
                        <span className="text-[11px] text-slate-500">Karachi / Coast (19)</span>
                      </button>
                    </div>
                    <div className="pt-1.5 px-2">
                      <a
                        href="https://beats.com.pk/campuses/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-medium text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>View Complete Campus Index &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('gallery')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Campus Life
            </button>

            <button
              onClick={() => handleNavClick('why-choose')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Why BEATS
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-2 rounded-lg hover:text-blue-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenProspectusModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-slate-200 cursor-pointer"
              title="Download Prospectus"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Prospectus</span>
            </button>

            <button
              onClick={onOpenAdmissionModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 hover:from-blue-800 hover:to-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-blue-950/40"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Admissions 2025–26</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdmissionModal}
              className="sm:flex hidden items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 rounded-lg"
            >
              <span>Apply</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={onOpenAdmissionModal}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-white bg-blue-900 rounded-lg"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Admissions</span>
            </button>
            <button
              onClick={onOpenProspectusModal}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Prospectus PDF</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-800 pt-1">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              About BEATS &amp; History
            </button>
            <button
              onClick={() => handleNavClick('bfeis')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Institutions &amp; Streams (BFEIs)
            </button>
            <button
              onClick={() => handleNavClick('academics')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Academics &amp; Curriculum
            </button>
            <button
              onClick={() => handleNavClick('achievements')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-amber-800 font-semibold"
            >
              Board Achievements &amp; CNS Medals
            </button>
            <button
              onClick={() => handleNavClick('campuses')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Campuses &amp; Regional Offices
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Campus Life &amp; Gallery
            </button>
            <button
              onClick={() => handleNavClick('why-choose')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Why Choose Bahria Foundation
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Regional Contacts &amp; Inquiries
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>UAN: +92-51-8153585</span>
            <span>Islamabad • Lahore • Karachi</span>
          </div>
        </div>
      )}
    </header>
  );
};
