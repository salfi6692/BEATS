/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
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

function MainPortal() {
  const { settings } = useSettings();
  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin'>('home');
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [selectedAdmissionRegion, setSelectedAdmissionRegion] = useState<string | undefined>(undefined);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState<'md' | 'dmd'>('md');

  // Detect URL path or hash route (e.g. /admin, /#admin, or /#/admin)
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path.includes('/admin') ||
        hash.includes('admin') ||
        hash.includes('#/admin')
      ) {
        setCurrentRoute('admin');
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

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    window.location.hash = '#/admin';
    setCurrentRoute('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentRoute === 'admin') {
      navigateToHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
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
    return <AdminPanel onBackToSite={navigateToHome} />;
  }

  // Dynamic Section Map based on sectionOrder
  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero':
        return settings.sections.hero ? (
          <Hero
            key="hero"
            onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
            onOpenProspectusModal={() => setProspectusModalOpen(true)}
            onOpenLeadershipModal={handleOpenLeadership}
            onExploreStreams={() => scrollToSection('academics')}
          />
        ) : null;
      case 'statsBanner':
        return settings.sections.statsBanner ? <StatsBanner key="statsBanner" /> : null;
      case 'aboutOverview':
        return settings.sections.aboutOverview ? (
          <AboutOverview
            key="aboutOverview"
            onOpenProspectus={() => setProspectusModalOpen(true)}
            onExploreCampuses={() => scrollToSection('campuses')}
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

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-900 selection:text-white ${navyToneClass} ${fontScaleClass}`}>
      {/* Institutional Top Bar (Toggable) */}
      {settings.sections.topBar && (
        <TopBar
          onOpenProspectusModal={() => setProspectusModalOpen(true)}
          onSelectRegion={() => scrollToSection('campuses')}
          onOpenAdmin={navigateToAdmin}
        />
      )}

      {/* Main Responsive Sticky Navbar */}
      <Navbar
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

      {/* Main Content Areas rendered dynamically according to sectionOrder */}
      <main className="flex-1">
        {activeSectionOrder.map((sectionKey) => renderSectionByKey(sectionKey))}
      </main>

      {/* Institutional Footer (Toggable) */}
      {settings.sections.footer && (
        <Footer
          onOpenProspectus={() => setProspectusModalOpen(true)}
          onOpenAdmission={() => handleOpenAdmissionWithRegion()}
          onNavigateSection={scrollToSection}
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
