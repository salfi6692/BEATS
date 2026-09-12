/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlideItem {
  id: string;
  image: string;
  tag: string;
  title: string;
  caption: string;
}

export interface MarqueeItem {
  id: string;
  text: string;
  badge?: string;
  link?: string;
  isUrgent?: boolean;
  urgent?: boolean;
}

export interface MarqueeSettings {
  enabled: boolean;
  label: string;
  speed: 'slow' | 'normal' | 'fast';
  theme: 'navy' | 'blue' | 'gold' | 'dark';
  pauseOnHover: boolean;
  items: MarqueeItem[];
}

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: 'Campus Life' | 'Academics' | 'Facilities' | 'Ceremony';
  image: string;
  caption: string;
}

export type SectionKey =
  | 'hero'
  | 'statsBanner'
  | 'aboutOverview'
  | 'academicStreams'
  | 'achievements'
  | 'whyChooseUs'
  | 'campusGallery'
  | 'regionalDirectory';

export interface SectionVisibility {
  topBar: boolean;
  hero: boolean;
  statsBanner: boolean;
  aboutOverview: boolean;
  academicStreams: boolean;
  achievements: boolean;
  whyChooseUs: boolean;
  campusGallery: boolean;
  regionalDirectory: boolean;
  footer: boolean;
}

export interface SiteSettings {
  // Brand identity
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  
  // Theme & Appearance
  navyThemeShade: 'deep-navy' | 'royal-navy' | 'midnight-navy';
  fontSizeScale: 'compact' | 'normal' | 'large';
  accentColor: string;
  
  // Contact & Announcement
  headerAnnouncement: string;
  admissionPhone: string;
  admissionEmail: string;
  prospectusUrl: string;
  
  // Marquee / Live Ticker
  marquee: MarqueeSettings;

  // Hero slider
  heroAutoPlaySpeed: number; // in seconds
  heroHeadline: string;
  heroSubheadline: string;
  heroBadgeText: string;
  slides: SlideItem[];
  
  // Section order & visibility
  sectionOrder: SectionKey[];
  sections: SectionVisibility;
  
  // Key Metrics
  statCampuses: string;
  statStudents: string;
  statFaculty: string;
  statPassRate: string;
  statInstitutes: string;

  // About Section Content
  aboutBadge: string;
  aboutHeading: string;
  aboutDescription: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;

  // Academic Streams Section Content
  academicBadge: string;
  academicHeading: string;
  academicSubheading: string;

  // Achievements Section Content
  achievementsHeading: string;
  achievementsSubheading: string;
  cnsAwardTitle: string;
  cnsAwardDesc: string;

  // Why Choose Us Section Content
  whyChooseHeading: string;
  whyChooseSubheading: string;

  // Campus Life Gallery Photos
  galleryHeading: string;
  gallerySubheading: string;
  galleryPhotos: GalleryPhotoItem[];

  // Regional Directory Section Content
  directoryHeading: string;
  directorySubheading: string;
  northCampusesCount: number;
  centreCampusesCount: number;
  southCampusesCount: number;

  // Footer Content
  footerDescription: string;
  footerHelpline: string;
  footerEmail: string;
  footerAddress: string;
}

export const DEFAULT_MARQUEE_ITEMS: MarqueeItem[] = [
  {
    id: 'm1',
    text: 'Admissions Open 2025-2026: Montessori, Primary, Secondary (SSC), HSSC & Cambridge O-Level across all campuses nationwide.',
    badge: 'ADMISSIONS 2025-26',
    isUrgent: true
  },
  {
    id: 'm2',
    text: 'Chief of Naval Staff Admiral M Amjad Khan Niazi NI (M) S Bt confers Certificates of Appreciation & Cash Prizes to BISE Position Holders.',
    badge: 'CNS AWARD',
    isUrgent: false
  },
  {
    id: 'm3',
    text: 'Grade 10 Annual BISE Examinations: 1,607 BFC candidates achieve an outstanding 94% passing average across all 3 regions.',
    badge: '94% PASS RATE',
    isUrgent: false
  },
  {
    id: 'm4',
    text: 'Bahria Education & Training System currently operates 87+ Colleges & Schools catering to ~37,000 students with dedicated Teacher Training Institutes.',
    badge: 'NETWORK',
    isUrgent: false
  },
  {
    id: 'm5',
    text: 'Official Prospectus 2024-2026 available for instant download with detailed curriculum, fee schedule, and scholarship criteria.',
    badge: 'PROSPECTUS',
    isUrgent: false
  }
];

export const DEFAULT_MARQUEE_SETTINGS: MarqueeSettings = {
  enabled: true,
  label: 'LATEST UPDATES',
  speed: 'normal',
  theme: 'navy',
  pauseOnHover: true,
  items: DEFAULT_MARQUEE_ITEMS
};

export const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    tag: 'Bahria Foundation • Est. 1998',
    title: 'Bahria Education & Training System (BEATS)',
    caption: 'Operating 87+ Bahria Foundation Schools & Colleges catering to ~37,000 students with naval ethos, academic rigor, and moral leadership.'
  },
  {
    id: 'slide-2',
    image: 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg',
    tag: 'Academic Distinction & Board Laurels',
    title: 'Awarded by Chief of Naval Staff for BISE Board Positions',
    caption: 'Certificates of Appreciation, Cash Prizes and Medals awarded. 94% passing average achieved across 1,607 SSC-II candidates.'
  },
  {
    id: 'slide-3',
    image: 'https://beats.com.pk/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-27-at-6.14.33-PM-768x512.jpeg',
    tag: 'Comprehensive Curriculum',
    title: 'Structured Pathways from Montessori to Cambridge O-Level & HSSC',
    caption: 'English medium instruction across Montessori, Primary, Secondary, Higher Secondary, and Cambridge O-Level streams.'
  },
  {
    id: 'slide-4',
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.15.10-PM-768x432.jpeg',
    tag: 'Bahria Foundation Educational Institutions',
    title: 'Integrated Network of Formal, Vocational & Community Education',
    caption: 'State-of-the-art facilities, modern science & computer laboratories, athletic fields, and 03 dedicated Teacher Training Institutes.'
  }
];

export const DEFAULT_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'g1',
    title: 'Investiture & Prize Distribution Ceremony',
    category: 'Ceremony',
    image: 'https://beats.com.pk/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-27-at-6.14.33-PM-768x512.jpeg',
    caption: 'Student council investiture and academic merit award ceremony at Bahria Foundation College.'
  },
  {
    id: 'g2',
    title: 'Morning Assembly & Character Building',
    category: 'Campus Life',
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    caption: 'Students gathered in disciplined naval uniform during morning parade and national anthem.'
  },
  {
    id: 'g3',
    title: 'Modern Science & ICT Laboratory',
    category: 'Facilities',
    image: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-5.webp',
    caption: 'Well-equipped physics, chemistry, and biology labs allowing practical experimental learning.'
  },
  {
    id: 'g4',
    title: 'Interactive Classroom Learning',
    category: 'Academics',
    image: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-6.webp',
    caption: 'Engaging multimedia classrooms fostering collaborative inquiry and student participation.'
  },
  {
    id: 'g5',
    title: 'Co-Curriculars & Sports Championship',
    category: 'Campus Life',
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.15.10-PM-768x432.jpeg',
    caption: 'Annual athletics meet, march-past, and inter-house football tournament.'
  },
  {
    id: 'g6',
    title: 'Montessori Activity & Play Learning',
    category: 'Academics',
    image: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-1.webp',
    caption: 'Early childhood sensorial education and cognitive development in dedicated activity suites.'
  }
];

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'hero',
  'statsBanner',
  'aboutOverview',
  'academicStreams',
  'achievements',
  'whyChooseUs',
  'campusGallery',
  'regionalDirectory'
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Bahria Education & Training System',
  tagline: 'A Prestigious Education Network Under Bahria Foundation (Pakistan Navy)',
  logoUrl: 'https://beats.com.pk/wp-content/uploads/2023/04/beats-bahria-logo-300x112-1.webp',
  faviconUrl: 'https://beats.com.pk/wp-content/uploads/2023/04/cropped-beats-fav-32x32.png',
  
  navyThemeShade: 'deep-navy',
  fontSizeScale: 'normal',
  accentColor: '#f59e0b',
  
  headerAnnouncement: 'Admissions Open for Academic Session 2025-2026 across all North, Central & South Regions!',
  admissionPhone: '+92-51-8153585',
  admissionEmail: 'beats@bahriafoundation.com',
  prospectusUrl: 'https://beats.com.pk/wp-content/uploads/2024/12/Final-PROSPECTUS-22-02-2024.pdf',
  
  marquee: DEFAULT_MARQUEE_SETTINGS,

  heroAutoPlaySpeed: 6,
  heroBadgeText: 'Bahria Foundation • Established 1998 | A Trusted Partner',
  heroHeadline: 'Nurturing Intellect, Inculcating Maritime Discipline',
  heroSubheadline: 'Empowering over 37,000 students across 87+ campuses with quality education, rigorous moral ethics, and progressive curricula.',
  slides: DEFAULT_SLIDES,
  
  sectionOrder: DEFAULT_SECTION_ORDER,
  sections: {
    topBar: true,
    hero: true,
    statsBanner: true,
    aboutOverview: true,
    academicStreams: true,
    achievements: true,
    whyChooseUs: true,
    campusGallery: true,
    regionalDirectory: true,
    footer: true
  },
  
  statCampuses: '87+',
  statStudents: '37,000+',
  statFaculty: '2,200+',
  statPassRate: '94%',
  statInstitutes: '03 TTIs',

  // About Section
  aboutBadge: 'Our Foundation & Legacy',
  aboutHeading: 'A Quarter-Century of Empowering Pakistan Through Education',
  aboutDescription: 'Bahria Education & Training System (BEATS), a key pillar of Bahria Foundation, operates as a non-profit commercial enterprise under the patronship of Pakistan Navy. Since 1998, BEATS has delivered affordable, high-standard education across Pakistan.',
  pillar1Title: 'Formal Academic Campuses',
  pillar1Desc: 'Preschool, Primary, Secondary (SSC), Higher Secondary (HSSC/College), and Cambridge O-Level curricula.',
  pillar2Title: 'Vocational & Technical Centers',
  pillar2Desc: 'Applied skills, IT training, and market-driven vocational trades preparing young men and women for immediate careers.',
  pillar3Title: 'Non-Formal & Adult Education',
  pillar3Desc: 'Community-based literacy centers providing basic numeracy and functional reading in rural and coastal settlements.',
  pillar4Title: 'Joint-Venture & Promotional Projects',
  pillar4Desc: 'Public-private educational partnerships expanding access in remote areas of Balochistan, Sindh, and Khyber Pakhtunkhwa.',

  // Academic Streams
  academicBadge: 'Academic Streams & Curriculum',
  academicHeading: 'Four Rigorous Academic Pathways for Every Stage',
  academicSubheading: 'From foundational Montessori nurturing to international Cambridge certifications and national BISE excellence, our campuses provide structured paths for student brilliance.',

  // Achievements
  achievementsHeading: 'Recognized Academic Distinction & Board Laurels',
  achievementsSubheading: 'Our scholars consistently secure top positions in BISE Board examinations, backed by nationwide merit scholarships and cash awards.',
  cnsAwardTitle: 'Chief of Naval Staff Academic Excellence Award',
  cnsAwardDesc: 'Top-performing students and best-performing Bahria Foundation Colleges receive ceremonial shields, certificates of honor, and cash prizes personally awarded by the Chief of Naval Staff, Pakistan Navy.',

  // Why Choose Us
  whyChooseHeading: 'Why Choose Bahria Foundation Colleges?',
  whyChooseSubheading: 'Discover the hallmark distinctions that set our 87+ campuses apart as the primary choice for over 37,000 families across Pakistan.',

  // Campus Life
  galleryHeading: 'Life at Bahria Foundation Colleges',
  gallerySubheading: 'Moments of academic rigor, athletic competitions, character-building assemblies, and experiential science learning across our nationwide campuses.',
  galleryPhotos: DEFAULT_GALLERY_PHOTOS,

  // Regional Directory
  directoryHeading: 'Nationwide Directorate & Regional Offices',
  directorySubheading: 'Coordinating academic excellence, quality assurance, and institutional operations across North, Central, and South regions.',
  northCampusesCount: 42,
  centreCampusesCount: 26,
  southCampusesCount: 19,

  // Footer
  footerDescription: 'Bahria Education & Training System (BEATS) operates 87+ high-standard schools and colleges across Pakistan under Bahria Foundation, Pakistan Navy.',
  footerHelpline: '+92 51 8356193',
  footerEmail: 'info@beats.com.pk',
  footerAddress: 'Bahria Foundation, Head Office, H-8/4, Islamabad, Pakistan'
};
