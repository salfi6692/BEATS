/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [selectedAdmissionRegion, setSelectedAdmissionRegion] = useState<string | undefined>(undefined);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  const [leadershipModalOpen, setLeadershipModalOpen] = useState(false);
  const [selectedLeaderId, setSelectedLeaderId] = useState<'md' | 'dmd'>('md');

  const scrollToSection = (sectionId: string) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Institutional Top Bar */}
      <TopBar
        onOpenProspectusModal={() => setProspectusModalOpen(true)}
        onSelectRegion={() => scrollToSection('campuses')}
      />

      {/* Main Responsive Sticky Navbar */}
      <Navbar
        onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
        onOpenProspectusModal={() => setProspectusModalOpen(true)}
        onOpenLeadershipModal={handleOpenLeadership}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
          onOpenProspectusModal={() => setProspectusModalOpen(true)}
          onOpenLeadershipModal={handleOpenLeadership}
          onExploreStreams={() => scrollToSection('academics')}
        />

        {/* 5-Metric Counter Banner */}
        <StatsBanner />

        {/* About BEATS & 4 BFEIs Pillars */}
        <AboutOverview
          onOpenProspectus={() => setProspectusModalOpen(true)}
          onExploreCampuses={() => scrollToSection('campuses')}
        />

        {/* BFC Academic Streams (Montessori, Primary, Secondary, HSSC, O-Level) */}
        <AcademicStreams
          onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
          onOpenProspectus={() => setProspectusModalOpen(true)}
        />

        {/* Academic Achievements & Chief of Naval Staff Honors */}
        <AchievementsSection />

        {/* Reason to Choose Bahria Foundation Colleges */}
        <WhyChooseUs
          onOpenAdmissionModal={() => handleOpenAdmissionWithRegion()}
          onOpenProspectusModal={() => setProspectusModalOpen(true)}
        />

        {/* Campus Life & Visual Gallery with Lightbox */}
        <CampusGallery />

        {/* Regional Directorate Directory (North, Centre, South) */}
        <RegionalDirectory
          onOpenAdmissionModal={(region) => handleOpenAdmissionWithRegion(region)}
        />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenProspectus={() => setProspectusModalOpen(true)}
        onOpenAdmission={() => handleOpenAdmissionWithRegion()}
        onNavigateSection={scrollToSection}
      />

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
