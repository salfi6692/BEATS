/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { TopBar } from './components/TopBar';
import { Navbar, PortalRoute } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { AboutOverview } from './components/AboutOverview';
import { AcademicStreams } from './components/AcademicStreams';
import { AchievementsSection } from './components/AchievementsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CampusGallery } from './components/CampusGallery';
import { RegionalDirectory } from './components/RegionalDirectory';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { ProspectusModal } from './components/ProspectusModal';
import { LeadershipModal } from './components/LeadershipModal';
import { AdminPanel } from './components/AdminPanel';
import { MarqueeTicker } from './components/MarqueeTicker';

// Full Page Components with Content from BEATS Documentation
import { AboutPage } from './pages/AboutPage';
import { MdMessagePage } from './pages/MdMessagePage';
import { AdmissionPage } from './pages/AdmissionPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { CampusesPage } from './pages/CampusesPage';
import { ScholarshipPage } from './pages/ScholarshipPage';
import { AlumniPage } from './pages/AlumniPage';
import { ContactPage } from './pages/ContactPage';
import { CustomPageView } from './pages/CustomPageView';

function MainPortal() {
  const { settings } = useSettings();
  const [currentRoute, setCurrentRoute] = useState<PortalRoute>('home');
  const [targetCampusRegion, setTargetCampusRegion] = useState<string | undefined>(undefined);
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [selectedAdmissionRegion, setSelectedAdmissionRegion] = useState<string | undefined>(undefined);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState<'md' | 'dmd'>('md');

  // Detect URL path or hash route
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('/admin') || hash.includes('admin')) {
        setCurrentRoute('admin');
      } else if (path.includes('/about') || hash.includes('about')) {
        setCurrentRoute('about');
      } else if (path.includes('/md-message') || hash.includes('md-message') || hash.includes('message')) {
        setCurrentRoute('md-message');
      } else if (path.includes('/admission') || hash.includes('admission')) {
        setCurrentRoute('admission');
      } else if (path.includes('/academic') || hash.includes('academic')) {
        setCurrentRoute('academics');
      } else if (path.includes('/campus-life') || hash.includes('campus-life') || hash.includes('gallery')) {
        setCurrentRoute('campus-life');
      } else if (path.includes('/campuse') || hash.includes('campuse')) {
        setCurrentRoute('campuses');
      } else if (path.includes('/scholarship') || path.includes('/higherstudiesscholarship') || hash.includes('scholarship')) {
        setCurrentRoute('scholarship');
      } else if (path.includes('/alumni') || hash.includes('alumni')) {
        setCurrentRoute('alumni');
      } else if (path.includes('/contact') || hash.includes('contact')) {
        setCurrentRoute('contact');
      } else {
        setCurrentRoute('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);

    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  const navigateToRoute = (route: PortalRoute, subRegion?: string) => {
    if (subRegion) setTargetCampusRegion(subRegion);
    if (route === 'home') {
      window.history.pushState({}, '', '/');
      window.location.hash = '';
    } else {
      window.history.pushState({}, '', `/${route}`);
      window.location.hash = `#/${route}`;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    navigateToRoute('admin');
  };

  const navigateToHome = () => {
    navigateToRoute('home');
  };

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== 'home') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmissionWithRegion = (region?: string) => {
    setSelectedAdmissionRegion(region);
    setAdmissionModalOpen(true);
  };

  const handleOpenLeadership = (id: 'md' | 'dmd') => {
    setSelectedLeaderId(id);
    setLeadershipModalOpen(true);
  };

  // Navy theme class mapping
  const navyToneClass =
    settings.navyThemeShade === 'midnight-navy'
      ? 'bg-slate-950 text-slate-900'
      : settings.navyThemeShade === 'royal-navy'
      ? 'bg-blue-950/5 text-slate-900'
      : 'bg-slate-50 text-slate-900';

  // Font size scale class
  const fontScaleClass =
    settings.fontSizeScale === 'compact'
      ? 'text-sm'
      : settings.fontSizeScale === 'large'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  // Render Admin View if on /admin route
  if (currentRoute === 'admin') {
    return (
      <AdminPanel
        onBackToSite={navigateToHome}
        onNavigateToRoute={navigateToRoute}
      />
    );
  }

  // Dynamic Section Map based on sectionOrder for Home Page
  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero':
        return settings.sections.hero ? (
          <Hero
            key="hero"
            onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
            onOpenProspectusModal={() => setProspectusModalOpen(true)}
            onOpenLeadershipModal={handleOpenLeadership}
            onExploreStreams={() => navigateToRoute('academics')}
          />
        ) : null;
      case 'statsBanner':
        return settings.sections.statsBanner ? <StatsBanner key="statsBanner" /> : null;
      case 'aboutOverview':
        return settings.sections.aboutOverview ? (
          <AboutOverview
            key="aboutOverview"
            onOpenProspectus={() => setProspectusModalOpen(true)}
            onExploreCampuses={() => navigateToRoute('campuses')}
          />
        ) : null;
      case 'academicStreams':
        return settings.sections.academicStreams ? (
          <AcademicStreams
            key="academicStreams"
            onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
            onOpenProspectus={() => setProspectusModalOpen(true)}
          />
        ) : null;
      case 'achievements':
        return settings.sections.achievements ? <AchievementsSection key="achievements" /> : null;
      case 'whyChooseUs':
        return settings.sections.whyChooseUs ? (
          <WhyChooseUs
            key="whyChooseUs"
            onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
            onOpenProspectusModal={() => setProspectusModalOpen(true)}
          />
        ) : null;
      case 'campusGallery':
        return settings.sections.campusGallery ? <CampusGallery key="campusGallery" /> : null;
      case 'regionalDirectory':
        return settings.sections.regionalDirectory ? (
          <RegionalDirectory
            key="regionalDirectory"
            onOpenAdmissionModal={(region) => handleOpenAdmissionWithRegion(region)}
          />
        ) : null;
      default:
        return null;
    }
  };

  const activeSectionOrder = settings.sectionOrder && settings.sectionOrder.length > 0
    ? settings.sectionOrder
    : ['hero', 'statsBanner', 'aboutOverview', 'academicStreams', 'achievements', 'whyChooseUs', 'campusGallery', 'regionalDirectory'];

  // Route Body Rendering
  const renderRouteContent = () => {
    // If the route was explicitly deleted, display a clean 404 notice instead of obsolete content
    const deletedSet = new Set((settings.deletedPageIds || []).map((s) => s.toLowerCase()));
    if (deletedSet.has(currentRoute.toLowerCase())) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center mb-4">
            <span className="text-xl font-bold">404</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            This page has been removed from the website by the administrator.
          </p>
          <button
            onClick={navigateToHome}
            className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      );
    }

    // Check if currentRoute matches any CustomPage created or configured via Page Designer
    const customPageMatch = settings.customPages?.find(
      (p) =>
        p.slug.toLowerCase() === currentRoute.toLowerCase() ||
        p.id.toLowerCase() === currentRoute.toLowerCase()
    );

    // If custom page exists, is published, and has useCustomLayout active (or is a custom non-core page)
    if (
      customPageMatch &&
      customPageMatch.published &&
      (customPageMatch.useCustomLayout || !customPageMatch.isCorePage)
    ) {
      return (
        <CustomPageView
          page={customPageMatch}
          onNavigateHome={navigateToHome}
          onNavigateRoute={navigateToRoute}
          onOpenAdmission={() => handleOpenAdmissionWithRegion()}
          onOpenProspectus={() => setProspectusModalOpen(true)}
        />
      );
    }

    switch (currentRoute) {
      case 'about':
        return (
          <AboutPage
            onNavigateHome={navigateToHome}
            onOpenProspectus={() => setProspectusModalOpen(true)}
            onNavigateCampuses={() => navigateToRoute('campuses')}
          />
        );
      case 'md-message':
        return (
          <MdMessagePage
            onNavigateHome={navigateToHome}
            onOpenLeadershipModal={handleOpenLeadership}
          />
        );
      case 'admission':
        return (
          <AdmissionPage
            onNavigateHome={navigateToHome}
            onOpenProspectus={() => setProspectusModalOpen(true)}
            onOpenOnlineModal={() => handleOpenAdmissionWithRegion()}
          />
        );
      case 'academics':
        return (
          <AcademicsPage
            onNavigateHome={navigateToHome}
            onOpenAdmission={() => handleOpenAdmissionWithRegion()}
            onOpenProspectus={() => setProspectusModalOpen(true)}
          />
        );
      case 'campus-life':
        return (
          <CampusLifePage
            onNavigateHome={navigateToHome}
            onOpenAdmission={() => handleOpenAdmissionWithRegion()}
          />
        );
      case 'campuses':
        return (
          <CampusesPage
            onNavigateHome={navigateToHome}
            onOpenAdmission={() => handleOpenAdmissionWithRegion()}
            initialRegion={targetCampusRegion}
          />
        );
      case 'scholarship':
        return (
          <ScholarshipPage
            onNavigateHome={navigateToHome}
            onNavigateContact={() => navigateToRoute('contact')}
            onOpenAdmission={() => handleOpenAdmissionWithRegion()}
          />
        );
      case 'alumni':
        return (
          <AlumniPage
            onNavigateHome={navigateToHome}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onNavigateHome={navigateToHome}
            onNavigateCampuses={(reg) => navigateToRoute('campuses', reg)}
          />
        );
      case 'home':
        return (
          <>
            {activeSectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
          </>
        );
      default: {
        // Check if currentRoute matches any CustomPage created via Page Designer
        const customPage = settings.customPages?.find(
          (p) =>
            p.slug.toLowerCase() === currentRoute.toLowerCase() ||
            p.id.toLowerCase() === currentRoute.toLowerCase()
        );

        if (customPage) {
          return (
            <CustomPageView
              page={customPage}
              onNavigateHome={navigateToHome}
              onNavigateRoute={navigateToRoute}
              onOpenAdmission={() => handleOpenAdmissionWithRegion()}
              onOpenProspectus={() => setProspectusModalOpen(true)}
            />
          );
        }

        return (
          <>
            {activeSectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
          </>
        );
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-900 selection:text-white ${navyToneClass} ${fontScaleClass}`}>
      {/* Institutional Top Bar (Toggable) */}
      {settings.sections.topBar && (
        <TopBar
          onOpenProspectusModal={() => setProspectusModalOpen(true)}
          onSelectRegion={() => navigateToRoute('campuses')}
          onOpenAdmin={navigateToAdmin}
        />
      )}

      {/* Main Responsive Sticky Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigateRoute={navigateToRoute}
        onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
        onOpenProspectusModal={() => setProspectusModalOpen(true)}
        onOpenLeadershipModal={handleOpenLeadership}
        onNavigateSection={scrollToSection}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Live Updates & Announcements Marquee Ticker (Configured via Admin Panel) */}
      <MarqueeTicker
        onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
        onOpenProspectusModal={() => setProspectusModalOpen(true)}
        onOpenLeadershipModal={handleOpenLeadership}
        onNavigateSection={scrollToSection}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {renderRouteContent()}
      </main>

      {/* Institutional Footer (Toggable) */}
      {settings.sections.footer && (
        <Footer
          onOpenProspectus={() => setProspectusModalOpen(true)}
          onOpenAdmission={() => handleOpenAdmissionWithRegion()}
          onNavigateSection={scrollToSection}
          onNavigateRoute={navigateToRoute}
        />
      )}

      {/* Interactive Modals */}
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        preselectedRegion={selectedAdmissionRegion}
      />

      <ProspectusModal
        isOpen={prospectusModalOpen}
        onClose={() => setProspectusModalOpen(false)}
        onOpenAdmission={() => {
          setProspectusModalOpen(false);
          setAdmissionModalOpen(true);
        }}
      />

      <LeadershipModal
        initialId={selectedLeaderId}
        isOpen={leadershipModalOpen}
        onClose={() => setLeadershipModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <MainPortal />
    </SettingsProvider>
  );
}
