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

export type PageBlockType =
  | 'heading'
  | 'text'
  | 'image'
  | 'video'
  | 'buttons'
  | 'features'
  | 'accordion'
  | 'callout';

export interface PageBlockButton {
  id: string;
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'gold' | 'outline';
  isExternal?: boolean;
}

export interface PageBlockFeature {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

export interface PageBlockFaq {
  id: string;
  question: string;
  answer: string;
}

export interface PageBlock {
  id: string;
  type: PageBlockType;
  // Heading
  title?: string;
  subtitle?: string;
  level?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
  badge?: string;
  // Text / paragraph
  content?: string;
  // Image
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  imageWidth?: 'normal' | 'wide' | 'full';
  // Video
  videoUrl?: string; // e.g. YouTube embed, direct video mp4
  videoTitle?: string;
  videoCaption?: string;
  // Buttons / Links
  buttons?: PageBlockButton[];
  // Features / Grid Cards
  features?: PageBlockFeature[];
  featuresColumns?: 2 | 3 | 4;
  // FAQ Accordion
  faqItems?: PageBlockFaq[];
  // Callout Box
  calloutType?: 'info' | 'quote' | 'navy' | 'gold';
  quoteAuthor?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  badge?: string;
  bannerImage?: string;
  published: boolean;
  isCorePage?: boolean;
  useCustomLayout?: boolean;
  metaDescription?: string;
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface NavDropdownItem {
  id: string;
  label: string;
  route?: string;
  link?: string;
  pageId?: string;
  isExternal?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  route: string; // matches PortalRoute or custom slug
  pageId?: string; // id of CustomPage if custom
  hasDropdown?: boolean;
  visible: boolean;
  isCustom?: boolean;
  order?: number;
  items?: NavDropdownItem[];
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
  updatedAt?: number;
  // Brand identity
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  
  // Media & Upload Directory Settings
  mediaUploadPath?: string; // e.g. '/media' or '/abc/media'
  
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

  // Executive Leadership (MD-BF & DMD-BEATS)
  mdName: string;
  mdTitle: string;
  mdDesignation: string;
  mdRank: string;
  mdImage: string;
  mdSnippet: string;
  mdMessage: string;

  dmdName: string;
  dmdTitle: string;
  dmdDesignation: string;
  dmdRank: string;
  dmdImage: string;
  dmdSnippet: string;
  dmdMessage: string;

  // About Section Content & Image
  aboutImage: string;
  aboutMission: string;
  aboutHistory: string;
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

  // Achievements Section Content & Image
  achievementsHeading: string;
  achievementsSubheading: string;
  achievementsImage: string;
  achievementsStatCandidates: string;
  achievementsStatTopPositions: string;
  cnsAwardTitle: string;
  cnsAwardDesc: string;

  // Why Choose Us Section Content & Image
  whyChooseHeading: string;
  whyChooseSubheading: string;
  whyChooseImage: string;
  whyChoosePhilosophyTitle: string;
  whyChoosePhilosophyDesc: string;

  // Campus Life Gallery Photos
  galleryHeading: string;
  gallerySubheading: string;
  galleryPhotos: GalleryPhotoItem[];

  // Regional Directory Section Content & Office Details
  directoryHeading: string;
  directorySubheading: string;
  northCampusesCount: number;
  centreCampusesCount: number;
  southCampusesCount: number;
  northAddress: string;
  northPhones: string;
  northEmail: string;
  northDistricts: string;
  centreAddress: string;
  centrePhones: string;
  centreEmail: string;
  centreDistricts: string;
  southAddress: string;
  southPhones: string;
  southEmail: string;
  southDistricts: string;

  // Footer Content
  footerDescription: string;
  footerHelpline: string;
  footerEmail: string;
  footerAddress: string;

  // Navigation Menu Customization (Add, Update, Delete)
  menuItems: MenuItem[];

  // Custom Pages Created via Page Designer
  customPages: CustomPage[];

  // Tombstones for explicitly deleted pages and menu items
  deletedPageIds?: string[];
  deletedMenuItemIds?: string[];

  // Social & External Portals
  socialFacebook?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  socialLinkedin?: string;
  socialInstagram?: string;

  // Specific Page Settings & Polices
  admissionNotes?: string;
  admissionBankInfo?: string;
  campusLifeHouseColors?: string;
  scholarshipMaxPerStudent?: string;
  contactGoogleMapQuery?: string;
}

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'menu-home', label: 'Home', route: 'home', visible: true, order: 1 },
  {
    id: 'menu-about',
    label: 'About',
    route: 'about',
    pageId: 'page-about',
    hasDropdown: true,
    visible: true,
    order: 2,
    items: [
      { id: 'sub-about-1', label: 'Introduction & History (1998)', route: 'about' },
      { id: 'sub-about-2', label: 'Vision, Mission & Objectives', route: 'about' },
      { id: 'sub-about-3', label: 'BEATS Committee & Structure', route: 'about' },
      { id: 'sub-about-4', label: 'Institutional Footprint (BFEIs)', route: 'about' },
      { id: 'sub-about-5', label: 'Campuses Network (North, Centre, South)', route: 'campuses' }
    ]
  },
  { id: 'menu-md', label: "MD's Message", route: 'md-message', pageId: 'page-md-message', visible: true, order: 3 },
  {
    id: 'menu-adm',
    label: 'Admission',
    route: 'admission',
    pageId: 'page-admission',
    hasDropdown: true,
    visible: true,
    order: 4,
    items: [
      { id: 'sub-adm-1', label: 'Admission Procedure & Age Criteria', route: 'admission' },
      { id: 'sub-adm-2', label: 'Documents Required for Admission', route: 'admission' },
      { id: 'sub-adm-3', label: 'College Dues & Fee Regulations', route: 'admission' },
      { id: 'sub-adm-4', label: 'Interactive Admission Inquiry Form', route: 'admission' }
    ]
  },
  {
    id: 'menu-acad',
    label: 'Academics',
    route: 'academics',
    pageId: 'page-academics',
    hasDropdown: true,
    visible: true,
    order: 5,
    items: [
      { id: 'sub-acad-1', label: 'Montessori & Primary Section', route: 'academics' },
      { id: 'sub-acad-2', label: 'Secondary (SSC) & HSSC College', route: 'academics' },
      { id: 'sub-acad-3', label: 'Cambridge O Level (CAIE)', route: 'academics' },
      { id: 'sub-acad-4', label: 'Academic Session & Promotion Policy', route: 'academics' },
      { id: 'sub-acad-5', label: 'Religious & Moral Education', route: 'academics' },
      { id: 'sub-acad-6', label: 'Faculty & Teacher Training (TTIs)', route: 'academics' }
    ]
  },
  {
    id: 'menu-campus-life',
    label: 'Campus Life',
    route: 'campus-life',
    pageId: 'page-campus-life',
    hasDropdown: true,
    visible: true,
    order: 6,
    items: [
      { id: 'sub-cl-1', label: 'Enhanced Learning Environment (ELE)', route: 'campus-life' },
      { id: 'sub-cl-2', label: 'BEATS Houses (Jinnah, Iqbal, Tippu, Zafar)', route: 'campus-life' },
      { id: 'sub-cl-3', label: 'Attendance (Face Recognition Protocol)', route: 'campus-life' },
      { id: 'sub-cl-4', label: 'Student Leave Rules & Transfers', route: 'campus-life' },
      { id: 'sub-cl-5', label: 'Summer & Winter Uniform Regulations', route: 'campus-life' }
    ]
  },
  { id: 'menu-campuses', label: 'Campuses', route: 'campuses', pageId: 'page-campuses', visible: true, order: 7 },
  { id: 'menu-scholarship', label: 'Scholarship', route: 'scholarship', pageId: 'page-scholarship', visible: true, order: 8 },
  { id: 'menu-alumni', label: 'Alumni', route: 'alumni', pageId: 'page-alumni', visible: true, order: 9 },
  { id: 'menu-contact', label: 'Contact Us', route: 'contact', pageId: 'page-contact', visible: true, order: 10 }
];

export const DEFAULT_CUSTOM_PAGES: CustomPage[] = [
  // 1. About BEATS
  {
    id: 'page-about',
    slug: 'about',
    title: 'About BEATS',
    subtitle: 'Spreading quality education and moral discipline across Pakistan since 1998, empowering over 37,000 students in 87+ institutions.',
    badge: 'Established 1998',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Discover the history, leadership, vision, and institutional footprint of Bahria Education & Training System.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'ab-b1',
        type: 'heading',
        title: 'Introduction & Institutional Overview',
        subtitle: 'Fostering intellectual vigor, moral discipline, and patriotism under the aegis of Pakistan Navy.',
        level: 'h2',
        align: 'left',
        badge: 'Institutional Footprint'
      },
      {
        id: 'ab-b2',
        type: 'text',
        content: 'Bahria Education and Training System (BEATS) was established in 1998 under the auspices of Pakistan Navy Bahria Foundation. From its modest beginnings with a few regional campuses, BEATS has evolved into a premier national education network operating 87+ high-standard institutions across Pakistan.\n\nOur schools and colleges cater to ~37,000 students from Montessori to Higher Secondary and Cambridge O-Level. We instill naval traditions of discipline, punctuality, and honor, preparing confident leaders who serve Pakistan with distinction.'
      },
      {
        id: 'ab-b3',
        type: 'callout',
        calloutType: 'quote',
        content: 'Our core philosophy balances academic rigor with moral integrity. We do not just teach textbooks; we mold characters of unshakeable patriotism and ethical strength.',
        quoteAuthor: 'Vice Admiral (R) Muhammad Amjad Khan, Managing Director Bahria Foundation'
      },
      {
        id: 'ab-b4',
        type: 'features',
        featuresColumns: 4,
        features: [
          {
            id: 'ab-f1',
            icon: 'Shield',
            title: 'Moral Integrity & Drill',
            description: 'Daily assemblies, honor codes, and student leadership councils.'
          },
          {
            id: 'ab-f2',
            icon: 'Award',
            title: 'Academic Laurels',
            description: '94% average pass rate with top positions across BISE boards nationwide.'
          },
          {
            id: 'ab-f3',
            icon: 'BookOpen',
            title: 'Modern Curricula',
            description: 'English medium instruction across FBISE, BISE, and Cambridge O-Level.'
          },
          {
            id: 'ab-f4',
            icon: 'GraduationCap',
            title: 'Teacher Training (TTIs)',
            description: '03 dedicated institutes continuous pedagogical development for 2,400+ educators.'
          }
        ]
      },
      {
        id: 'ab-b5',
        type: 'video',
        videoTitle: 'Naval Parades and Campus Life at Bahria Foundation',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoCaption: 'Watch annual sports, parade ceremonies, and laboratory sessions at Bahria Foundation Colleges.'
      },
      {
        id: 'ab-b6',
        type: 'accordion',
        faqItems: [
          {
            id: 'ab-faq1',
            question: 'What governance structure supervises BEATS institutions?',
            answer: 'BEATS is administered directly by the Committee of Administration and the Directorate of BEATS, chaired by Managing Director Bahria Foundation and Deputy Managing Director BEATS.'
          },
          {
            id: 'ab-faq2',
            question: 'Are BEATS colleges open to civilian students?',
            answer: 'Yes. Admissions are conducted on merit basis and are open to civilian students as well as children of Naval and Armed Forces personnel.'
          }
        ]
      },
      {
        id: 'ab-b7',
        type: 'buttons',
        buttons: [
          {
            id: 'ab-btn1',
            label: 'Apply for Admission 2025-26',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'ab-btn2',
            label: 'Explore Nationwide Campuses',
            url: '/campuses',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 2. MD's Message
  {
    id: 'page-md-message',
    slug: 'md-message',
    title: "MD's Message",
    subtitle: 'Vice Admiral (R) Muhammad Amjad Khan, Managing Director Bahria Foundation',
    badge: 'Executive Leadership',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Read the official message and leadership vision of the Managing Director of Bahria Foundation.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'md-b1',
        type: 'heading',
        title: 'Guiding the Next Generation Toward Purpose & Excellence',
        subtitle: 'Leadership, character, and national dedication through disciplined education.',
        level: 'h2',
        align: 'center',
        badge: 'Vision & Mission'
      },
      {
        id: 'md-b2',
        type: 'callout',
        calloutType: 'quote',
        content: 'Education without moral grounding is a rudderless ship. In an era of rapid technological changes, our youth must anchor themselves in unshakeable ethical principles and relentless pursuit of knowledge.',
        quoteAuthor: 'Vice Admiral (R) Muhammad Amjad Khan, Managing Director Bahria Foundation'
      },
      {
        id: 'md-b3',
        type: 'text',
        content: 'It gives me immense pride to witness the transformational trajectory of Bahria Education & Training System (BEATS). Established under the auspices of Pakistan Navy, Bahria Foundation has striven tirelessly to bring high-quality, subsidized, and character-driven education to every corner of Pakistan.\n\nFrom urban metropolises to remote coastal districts in Balochistan and Sindh, BEATS colleges act as beacons of enlightenment. We ensure that merit is celebrated, character is refined, and every student is equipped to become a patriotic leader of tomorrow.'
      },
      {
        id: 'md-b4',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'md-f1',
            icon: 'Shield',
            title: 'Moral Rectitude',
            description: 'Cultivating honesty, civic responsibility, and mutual respect.'
          },
          {
            id: 'md-f2',
            icon: 'Award',
            title: 'Academic Distinction',
            description: 'Board laurels, Cambridge accreditation, and competitive examination training.'
          },
          {
            id: 'md-f3',
            icon: 'Users',
            title: 'Nationwide Inclusivity',
            description: 'Empowering communities through financial assistance and merit scholarships.'
          }
        ]
      },
      {
        id: 'md-b5',
        type: 'buttons',
        buttons: [
          {
            id: 'md-btn1',
            label: 'Explore Admission Guidelines',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'md-btn2',
            label: 'Read About BEATS History',
            url: '/about',
            variant: 'outline'
          }
        ]
      }
    ]
  },

  // 3. Admission Guidelines
  {
    id: 'page-admission',
    slug: 'admission',
    title: 'Admission Guidelines',
    subtitle: 'Procedure, age criteria, document checklist, fee regulations, and online application portal.',
    badge: 'Admissions 2025-26',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Comprehensive guide to admissions across all Bahria Foundation Colleges and Schools nationwide.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'adm-b1',
        type: 'heading',
        title: 'Admission Procedure & Age Criteria',
        subtitle: 'Structured, transparent enrollment across Montessori, Primary, Secondary, and HSSC.',
        level: 'h2',
        align: 'left',
        badge: 'Enrollment Guide'
      },
      {
        id: 'adm-b2',
        type: 'text',
        content: 'Admissions in Bahria Foundation Colleges are announced twice a year prior to the commencement of academic sessions. Candidate registration is conducted on prescribed application forms available at college administration offices or online through this portal.\n\nAll prospective students undergo a structured placement assessment tailored to their grade level to ensure appropriate academic placement.'
      },
      {
        id: 'adm-b3',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'adm-f1',
            icon: 'Users',
            title: 'Montessori Section',
            description: 'Beginner: Age 3 to 4 years. Junior: Age 4 to 5 years. Senior: Age 5 to 6 years.'
          },
          {
            id: 'adm-f2',
            icon: 'BookOpen',
            title: 'Primary & Middle (1st - 8th)',
            description: 'Placement assessment in English, Mathematics, and Urdu with verified school leaving certificates.'
          },
          {
            id: 'adm-f3',
            icon: 'GraduationCap',
            title: 'SSC, HSSC & O-Level',
            description: 'Enrollment based on 9th/10th Board marks, aptitude evaluation, and subject prerequisites.'
          }
        ]
      },
      {
        id: 'adm-b4',
        type: 'callout',
        calloutType: 'gold',
        content: 'Fee vouchers are issued through designated branches of Askari Bank Ltd and Habib Bank Ltd (HBL). Dues must be settled within the specified grace period to confirm admission seat.'
      },
      {
        id: 'adm-b5',
        type: 'accordion',
        faqItems: [
          {
            id: 'adm-faq1',
            question: 'What documents are required at the time of admission?',
            answer: 'Required documents include: Attested Nadra Birth Certificate or Form-B, 4 recent passport-size photographs, Father/Guardian CNIC copy, Previous School Leaving Certificate (SLC), and Progress Report Cards.'
          },
          {
            id: 'adm-faq2',
            question: 'Are there fee concessions for Naval and Armed Forces wards?',
            answer: 'Yes, designated fee concessions are provided to children of serving and retired Pakistan Navy personnel and Armed Forces wards in accordance with Foundation policies.'
          },
          {
            id: 'adm-faq3',
            question: 'Can students transfer between different Bahria Foundation campuses?',
            answer: 'Yes, inter-campus transfer is facilitated seamlessly across all 87+ campuses nationwide with waiver of admission re-registration fee.'
          }
        ]
      },
      {
        id: 'adm-b6',
        type: 'buttons',
        buttons: [
          {
            id: 'adm-btn1',
            label: 'Fill Online Admission Form',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'adm-btn2',
            label: 'Download Prospectus 2025-26',
            url: '/admission',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 4. Academics & Curricula
  {
    id: 'page-academics',
    slug: 'academics',
    title: 'Academics & Curricula',
    subtitle: 'Excellence in instruction from Montessori to Cambridge O-Level and HSSC College.',
    badge: 'Curriculum & Streams',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-27-at-6.14.33-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Explore the academic tiers, STEM labs, faculty development, and Cambridge education at BEATS.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'acad-b1',
        type: 'heading',
        title: 'Multi-Tiered Academic Streams',
        subtitle: 'Rigorous national and international curricula cultivating critical inquiry and analytical skill.',
        level: 'h2',
        align: 'left',
        badge: 'Academic Streams'
      },
      {
        id: 'acad-b2',
        type: 'text',
        content: 'Bahria Education & Training System offers structured academic streams designed to cater to diverse student aspirations. We emphasize modern STEM integration, digital literacy, and English language fluency while fostering religious and moral consciousness.'
      },
      {
        id: 'acad-b3',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'acad-f1',
            icon: 'BookOpen',
            title: 'Montessori & Primary Section',
            description: 'Activity-based learning, phonics, numeracy, and character development in a caring environment.'
          },
          {
            id: 'acad-f2',
            icon: 'Award',
            title: 'Secondary (SSC) & HSSC College',
            description: 'Federal Board (FBISE) and regional BISE affiliations in Pre-Medical, Pre-Engineering, and ICS.'
          },
          {
            id: 'acad-f3',
            icon: 'GraduationCap',
            title: 'Cambridge O-Level (CAIE)',
            description: 'Internationally benchmarked education fostering independent research, debate, and global readiness.'
          }
        ]
      },
      {
        id: 'acad-b4',
        type: 'callout',
        calloutType: 'navy',
        content: 'Teacher Training Institutes (TTIs) located in North, Centre, and South regions conduct continuous capacity-building workshops, ensuring our 2,400+ educators employ cutting-edge pedagogical methodologies.'
      },
      {
        id: 'acad-b5',
        type: 'buttons',
        buttons: [
          {
            id: 'acad-btn1',
            label: 'Apply for Admission 2025-26',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'acad-btn2',
            label: 'View Nationwide Campuses',
            url: '/campuses',
            variant: 'secondary'
          }
        ]
      }
    ]
  },

  // 5. Campus Life & Ethos
  {
    id: 'page-campus-life',
    slug: 'campus-life',
    title: 'Campus Life & Ethos',
    subtitle: 'Sports, House system, drill ceremonies, Face-Recognition attendance, and co-curricular vibrancy.',
    badge: 'Student Experience',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Discover vibrant student life, inter-house competitions, uniforms, and sports at Bahria Foundation Colleges.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'cl-b1',
        type: 'heading',
        title: 'Discipline, Sportsmanship & Camaraderie',
        subtitle: 'Cultivating well-rounded personalities through structured co-curricular and sports programs.',
        level: 'h2',
        align: 'left',
        badge: 'Campus Life'
      },
      {
        id: 'cl-b2',
        type: 'text',
        content: 'Campus life at Bahria Foundation Colleges is designed to blend academic diligence with physical vitality and teamwork. From early morning parades to inter-house football, cricket, basketball, and debate tournaments, every student is encouraged to participate actively.'
      },
      {
        id: 'cl-b3',
        type: 'features',
        featuresColumns: 4,
        features: [
          {
            id: 'cl-f1',
            icon: 'Shield',
            title: 'Jinnah House (Red)',
            description: 'Motto: Unity, Faith, Discipline. Inspiring exemplary focus, duty, and perseverance.'
          },
          {
            id: 'cl-f2',
            icon: 'Award',
            title: 'Iqbal House (Green)',
            description: 'Motto: Knowledge, Wisdom, Action. Fostering literary distinction and intellectual inquiry.'
          },
          {
            id: 'cl-f3',
            icon: 'Anchor',
            title: 'Tippu House (Blue)',
            description: 'Motto: Valor, Honor, Sacrifice. Promoting physical resilience and athletic excellence.'
          },
          {
            id: 'cl-f4',
            icon: 'Users',
            title: 'Zafar House (Yellow)',
            description: 'Motto: Diligence, Glory, Brotherhood. Emphasizing community service and teamwork.'
          }
        ]
      },
      {
        id: 'cl-b4',
        type: 'callout',
        calloutType: 'info',
        content: 'All BEATS campuses are equipped with AI Face-Recognition Attendance systems, ensuring automated parent SMS notifications and robust campus perimeter security.'
      },
      {
        id: 'cl-b5',
        type: 'buttons',
        buttons: [
          {
            id: 'cl-btn1',
            label: 'Apply for Admission',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'cl-btn2',
            label: 'Explore Nationwide Directory',
            url: '/campuses',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 6. Campuses Network
  {
    id: 'page-campuses',
    slug: 'campuses',
    title: 'Campuses Network',
    subtitle: '87+ high-standard institutions across North, Central, and South regions.',
    badge: 'Nationwide Footprint',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Explore Bahria Foundation Colleges and Schools across Islamabad, Punjab, Sindh, KP, AJK, and Balochistan.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'cp-b1',
        type: 'heading',
        title: 'Spanning Every Province of Pakistan',
        subtitle: 'Quality education accessible to students in metropolises and coastal regions alike.',
        level: 'h2',
        align: 'center',
        badge: 'Regional Network'
      },
      {
        id: 'cp-b2',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'cp-f1',
            icon: 'Shield',
            title: 'North Region (42 Campuses)',
            description: 'Islamabad, Rawalpindi, Peshawar, Abbottabad, Gilgit, Muzaffarabad, Gujar Khan, Wah Cantt.'
          },
          {
            id: 'cp-f2',
            icon: 'Award',
            title: 'Centre Region (26 Campuses)',
            description: 'Lahore, Faisalabad, Multan, Sialkot, Gujranwala, Bahawalpur, Sargodha, Gujrat, Sahiwal.'
          },
          {
            id: 'cp-f3',
            icon: 'Anchor',
            title: 'South Region (19 Campuses)',
            description: 'Karachi, Hyderabad, Ormara, Gwadar, Pasni, Sukkur, Larkana, Nawabshah, Badin.'
          }
        ]
      },
      {
        id: 'cp-b3',
        type: 'callout',
        calloutType: 'gold',
        content: 'All colleges share standardized curriculum pacing, uniform mid-year and final assessments, and centralized quality audits by the Directorate of BEATS.'
      },
      {
        id: 'cp-b4',
        type: 'buttons',
        buttons: [
          {
            id: 'cp-btn1',
            label: 'Interactive Campus Directory',
            url: '/campuses',
            variant: 'gold'
          },
          {
            id: 'cp-btn2',
            label: 'Regional Office Contacts',
            url: '/contact',
            variant: 'outline'
          }
        ]
      }
    ]
  },

  // 7. Scholarships & Financial Aid
  {
    id: 'page-scholarship',
    slug: 'scholarship',
    title: 'Scholarship & Aid',
    subtitle: 'Empowering bright and deserving students through merit rewards and welfare concessions.',
    badge: 'Financial Assistance',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Learn about CNS position scholarships, Naval ward fee concessions, and need-based financial aid.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'sc-b1',
        type: 'heading',
        title: 'Nurturing Talent Without Financial Barriers',
        subtitle: 'Comprehensive financial support programs funded by Pakistan Navy Bahria Foundation.',
        level: 'h2',
        align: 'left',
        badge: 'Merit & Need Aid'
      },
      {
        id: 'sc-b2',
        type: 'text',
        content: 'Bahria Foundation firmly upholds the principle that financial constraint must never impede an industrious student from achieving their potential. We operate a multi-faceted assistance framework recognizing academic brilliance and supporting underprivileged families.'
      },
      {
        id: 'sc-b3',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'sc-f1',
            icon: 'Award',
            title: 'CNS Position Scholarships',
            description: 'Cash prizes and full tuition fee waivers awarded to Federal & Regional BISE position holders.'
          },
          {
            id: 'sc-f2',
            icon: 'Shield',
            title: 'Shuhada & Naval Concessions',
            description: 'Dedicated fee remissions for children of martyred, serving, and retired Pakistan Navy personnel.'
          },
          {
            id: 'sc-f3',
            icon: 'Users',
            title: 'Need-Based Welfare Grants',
            description: 'Discretionary tuition support assessed by campus scholarship committees for deserving students.'
          }
        ]
      },
      {
        id: 'sc-b4',
        type: 'buttons',
        buttons: [
          {
            id: 'sc-btn1',
            label: 'Apply for Admission & Aid',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'sc-btn2',
            label: 'Contact Scholarship Desk',
            url: '/contact',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 8. Alumni Network
  {
    id: 'page-alumni',
    slug: 'alumni',
    title: 'Alumni Network',
    subtitle: 'Connecting thousands of BFC graduates serving with honor across Pakistan and worldwide.',
    badge: 'Distinguished Alumni',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Celebrate the accomplishments of Bahria Foundation alumni and join our global graduate directory.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'al-b1',
        type: 'heading',
        title: 'Proud Custodians of Our Naval Ethos',
        subtitle: 'Graduates leading in the Armed Forces, Medicine, Engineering, Civil Services, and Tech.',
        level: 'h2',
        align: 'left',
        badge: 'Alumni Heritage'
      },
      {
        id: 'al-b2',
        type: 'text',
        content: 'Since our establishment in 1998, tens of thousands of young men and women have graduated from Bahria Foundation Colleges. Our alumni serve with valor as Commissioned Officers in Pakistan Navy, Army, and Air Force, as renowned physicians, corporate leaders, and scholars.'
      },
      {
        id: 'al-b3',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'al-f1',
            icon: 'Anchor',
            title: 'Armed Forces Cadets',
            description: 'Hundreds of alumni inducted into Pakistan Naval Academy, PMA Kakul, and PAF Risalpur.'
          },
          {
            id: 'al-f2',
            icon: 'Award',
            title: 'Top Universities',
            description: 'Graduates pursuing higher degrees at NUST, GIKI, King Edward, AKU, and Oxford.'
          },
          {
            id: 'al-f3',
            icon: 'Users',
            title: 'Global Chapters',
            description: 'Active alumni networks across United Kingdom, North America, UAE, and Australia.'
          }
        ]
      },
      {
        id: 'al-b4',
        type: 'buttons',
        buttons: [
          {
            id: 'al-btn1',
            label: 'Register in Alumni Directory',
            url: '/alumni',
            variant: 'gold'
          },
          {
            id: 'al-btn2',
            label: 'Contact Alumni Secretariat',
            url: '/contact',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 9. Contact & Directorate
  {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact Directorate',
    subtitle: 'Head Office Islamabad & Regional Directorates in Lahore and Karachi.',
    badge: 'Official Secretariat',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: true,
    useCustomLayout: false,
    metaDescription: 'Contact addresses, phone helplines, emails, and office timings of BEATS Directorates.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'ct-b1',
        type: 'heading',
        title: 'Directorate Secretariat & Regional Offices',
        subtitle: 'Connect directly with admissions, examinations, and administrative directorates.',
        level: 'h2',
        align: 'left',
        badge: 'Get In Touch'
      },
      {
        id: 'ct-b2',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'ct-f1',
            icon: 'Shield',
            title: 'Head Office Islamabad',
            description: 'Japan Road, Near Ibadat University, Sihala, Islamabad. Tel: +92-51-8153585'
          },
          {
            id: 'ct-f2',
            icon: 'Award',
            title: 'Centre Directorate Lahore',
            description: 'Naval Complex Askari-1, Near Walton Airport, Gulberg-III, Lahore. Tel: +92-42-5889415'
          },
          {
            id: 'ct-f3',
            icon: 'Anchor',
            title: 'South Directorate Karachi',
            description: '2nd Floor, Bahria Complex-I, M.T. Khan Road, Karachi. Tel: +92-21-35610364'
          }
        ]
      },
      {
        id: 'ct-b3',
        type: 'accordion',
        faqItems: [
          {
            id: 'ct-faq1',
            question: 'What are the official working hours?',
            answer: 'All Regional Directorates and the Head Office operate Monday through Friday from 08:00 AM to 04:00 PM.'
          },
          {
            id: 'ct-faq2',
            question: 'How can I verify educational certificates issued by BEATS?',
            answer: 'Verification applications can be submitted to the Examination Wing at Head Office Islamabad or through the regional directorate.'
          }
        ]
      },
      {
        id: 'ct-b4',
        type: 'buttons',
        buttons: [
          {
            id: 'ct-btn1',
            label: 'Start Admission Inquiry',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'ct-btn2',
            label: 'Locate Nearest Campus',
            url: '/campuses',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 10. Maritime Ethos & Naval Heritage (Custom Page)
  {
    id: 'page-maritime-heritage',
    slug: 'maritime-heritage',
    title: 'Maritime Ethos & Naval Heritage',
    subtitle: 'Nurturing patriotism, physical resilience, and moral rectitude under the aegis of Pakistan Navy.',
    badge: 'Institutional Ethos',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.46-PM-768x512.jpeg',
    published: true,
    isCorePage: false,
    useCustomLayout: true,
    metaDescription: 'Discover how Bahria Foundation Colleges blend disciplined naval traditions with modern academic excellence.',
    createdAt: '2025-01-01',
    updatedAt: '2025-02-15',
    blocks: [
      {
        id: 'b1',
        type: 'heading',
        title: 'Maritime Discipline & Character Development',
        subtitle: 'Inspiring young minds with the valor, discipline, and selfless devotion of Pakistan Navy.',
        level: 'h2',
        align: 'center',
        badge: 'Honor & Excellence'
      },
      {
        id: 'b2',
        type: 'text',
        content: 'Bahria Education and Training System (BEATS) instills a distinct sense of pride, self-confidence, and maritime consciousness in every student. From daily morning parades and flag-hoisting ceremonies to inter-house regattas and swimming programs, students learn that leadership begins with humility, discipline, and brotherhood.'
      },
      {
        id: 'b3',
        type: 'callout',
        calloutType: 'quote',
        content: 'Character building is not a chapter in a textbook; it is the living culture that echoes through our parade grounds, classrooms, and community service initiatives across all 87+ campuses.',
        quoteAuthor: 'Vice Admiral (R) Muhammad Amjad Khan, Managing Director Bahria Foundation'
      },
      {
        id: 'b4',
        type: 'features',
        featuresColumns: 3,
        features: [
          {
            id: 'f1',
            icon: 'Anchor',
            title: 'Naval Cadets & Drill',
            description: 'Structured marching drills, assembly inspections, and student council leadership.'
          },
          {
            id: 'f2',
            icon: 'Shield',
            title: 'Uncompromising Integrity',
            description: 'Strict adherence to anti-cheating honor codes, mutual respect, and ethical conduct.'
          },
          {
            id: 'f3',
            icon: 'Award',
            title: 'Armed Forces Pathway',
            description: 'Guidance and physical preparation for admissions into Naval Academy and Armed Forces colleges.'
          }
        ]
      },
      {
        id: 'b5',
        type: 'video',
        videoTitle: 'Naval Parades and Student Life at Bahria Foundation',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoCaption: 'Watch highlights from our nationwide campuses showcasing sports, drills, and academic assemblies.'
      },
      {
        id: 'b6',
        type: 'buttons',
        buttons: [
          {
            id: 'btn1',
            label: 'Apply for Admission 2025-26',
            url: '/admission',
            variant: 'gold'
          },
          {
            id: 'btn2',
            label: 'Explore Nationwide Campuses',
            url: '/campuses',
            variant: 'primary'
          }
        ]
      }
    ]
  },

  // 11. STEM Innovation & Digital Labs (Custom Page)
  {
    id: 'page-stem-innovation',
    slug: 'stem-innovation',
    title: 'STEM Innovation & Digital Labs',
    subtitle: 'State-of-the-art computer science, robotics, and experimental physics laboratories across BEATS.',
    badge: 'Technological Excellence',
    bannerImage: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-5.webp',
    published: true,
    isCorePage: false,
    useCustomLayout: true,
    metaDescription: 'Explore the modern STEM laboratories, IT infrastructure, and digital classrooms at Bahria Foundation Colleges.',
    createdAt: '2025-01-15',
    updatedAt: '2025-02-20',
    blocks: [
      {
        id: 'stem-b1',
        type: 'heading',
        title: 'Modern Science & ICT Infrastructure',
        subtitle: 'Empowering students to transition from theoretical textbooks to practical scientific discoveries.',
        level: 'h2',
        align: 'left',
        badge: 'Hands-on Learning'
      },
      {
        id: 'stem-b2',
        type: 'text',
        content: 'All Bahria Foundation Colleges feature fully accredited science laboratories for Physics, Chemistry, and Biology, alongside high-speed multimedia ICT suites. Under the guidance of certified instructors, students conduct laboratory experiments aligned with FBISE and Cambridge O-Level curricula.'
      },
      {
        id: 'stem-b3',
        type: 'image',
        imageUrl: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-5.webp',
        imageAlt: 'Modern Computer and Science Laboratory',
        caption: 'Students engaged in practical experimental learning inside our high-tech laboratories.',
        imageWidth: 'wide'
      },
      {
        id: 'stem-b4',
        type: 'accordion',
        faqItems: [
          {
            id: 'faq1',
            question: 'Are laboratories equipped according to Federal Board (FBISE) standards?',
            answer: 'Yes, all science and IT laboratories undergo rigorous annual academic audits by BEATS Directorates to maintain strict compliance with BISE and Cambridge standards.'
          },
          {
            id: 'faq2',
            question: 'How early do students start using computer facilities?',
            answer: 'Computer literacy and algorithmic thinking begin in Primary grades, transitioning into Python programming and office productivity in Middle school.'
          }
        ]
      }
    ]
  }
];

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
  updatedAt: 0,
  siteTitle: 'Bahria Education & Training System',
  tagline: 'A Prestigious Education Network Under Bahria Foundation (Pakistan Navy)',
  logoUrl: 'https://beats.com.pk/wp-content/uploads/2023/04/beats-bahria-logo-300x112-1.webp',
  faviconUrl: 'https://beats.com.pk/wp-content/uploads/2023/04/cropped-beats-fav-32x32.png',
  mediaUploadPath: '/media',
  
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

  // Executive Leadership (MD-BF & DMD-BEATS)
  mdName: 'Vice Admiral (R) Muhammad Amjad Khan',
  mdTitle: 'Managing Director – Bahria Foundation',
  mdDesignation: 'Managing Director Bahria Foundation (MD-BF)',
  mdRank: 'Vice Admiral (Retd) • Bahria Foundation',
  mdImage: 'https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg',
  mdSnippet: 'To provide quality and affordable education for equipping our youth with knowledge and skills for self-sustainability and socio-economic growth.',
  mdMessage: 'Bahria Education and Training System (BEATS) was founded with a profound patriotic vision: to deliver world-class academic institutions to every corner of Pakistan, especially our coastal belts and under-served hinterlands.\n\nUnder the umbrella of Bahria Foundation, we take immense pride in nurturing over 37,000 students across 87+ campuses. We blend disciplined naval values with modern pedagogical standards to cultivate resilient leaders of tomorrow.\n\nOur commitment remains steadfast in supporting families through affordable tuition, merit scholarships, and modern digital learning infrastructure.',

  dmdName: 'Commodore (R) DMD BEATS',
  dmdTitle: 'Deputy Managing Director – BEATS',
  dmdDesignation: 'Deputy Managing Director (DMD-BEATS)',
  dmdRank: 'Bahria Education & Training System',
  dmdImage: 'https://beats.com.pk/wp-content/uploads/2026/09/wordpress_image-931x1024.png',
  dmdSnippet: 'Empowering future generations with academic distinction, moral integrity, and certified teacher development.',
  dmdMessage: 'At BEATS, we believe the heart of an institution lies in its teaching faculty and student welfare. We have established dedicated Teacher Training Institutes to continually upskill our educators.\n\nWith a 94% BISE passing average and consistent nationwide board positions, our schools and colleges provide a proven launchpad for admissions into prestigious medical, engineering, and defense academies.\n\nWe welcome parents and students into the Bahria family where tradition meets progressive education.',

  // About Section
  aboutImage: 'https://beats.com.pk/wp-content/uploads/2026/09/Code_Generated_Image-4-853x1024.gif',
  aboutMission: 'To provide quality and affordable education for equipping the beneficiaries with knowledge and skills for self-sustainability and socio-economic growth.',
  aboutHistory: 'Bahria Education And Training System (BEATS) was established in 1998 following the visionary directive of the Bahria Foundation to spread modern, high-quality educational facilities all over the country—especially in under-developed and remote areas.',
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
  achievementsImage: 'https://beats.com.pk/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-01-at-6.38.24-PM-768x576.jpeg',
  achievementsStatCandidates: '1,607',
  achievementsStatTopPositions: 'Top 10',
  cnsAwardTitle: 'Chief of Naval Staff Academic Excellence Award',
  cnsAwardDesc: 'Top-performing students and best-performing Bahria Foundation Colleges receive ceremonial shields, certificates of honor, and cash prizes personally awarded by the Chief of Naval Staff, Pakistan Navy.',

  // Why Choose Us
  whyChooseHeading: 'Why Choose Bahria Foundation Colleges?',
  whyChooseSubheading: 'Discover the hallmark distinctions that set our 87+ campuses apart as the primary choice for over 37,000 families across Pakistan.',
  whyChooseImage: 'https://beats.com.pk/wp-content/uploads/2023/05/bfeis-3.webp',
  whyChoosePhilosophyTitle: 'Character, Discipline & Academic Leadership Under One Roof',
  whyChoosePhilosophyDesc: 'Bahria Foundation Colleges represent a standard of trust. Our schools cultivate an atmosphere where academic curiosity is matched by personal discipline, patriotic reverence, and empathy.',

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
  northAddress: 'Japan Road, Near Ibadat University, Sihala, Islamabad',
  northPhones: '+92-51-8153585, +92-51-8153584, +92-51-8153588',
  northEmail: 'beats@bahriafoundation.com',
  northDistricts: 'Islamabad, Rawalpindi, Peshawar, Abbottabad, Gilgit, Muzaffarabad, Gujar Khan',
  centreAddress: 'Naval Complex Askari - 1, Near Walton Airport, Gulberg - III, Lahore',
  centrePhones: '+92-42-5889415',
  centreEmail: 'dbeatsc@bahriafoundation.com',
  centreDistricts: 'Lahore, Faisalabad, Multan, Sialkot, Gujranwala, Bahawalpur, Sargodha',
  southAddress: '2nd Floor, Bahria Complex-I, M.T. Khan Road, Karachi',
  southPhones: '+92-21-35610364, +92-21-35610242-3',
  southEmail: 'dbeatss@bahriafoundation.com',
  southDistricts: 'Karachi, Hyderabad, Ormara, Gwadar, Pasni, Sukkur, Larkana',

  // Footer
  footerDescription: 'Bahria Education & Training System (BEATS) operates 87+ high-standard schools and colleges across Pakistan under Bahria Foundation, Pakistan Navy.',
  footerHelpline: '+92 51 8356193',
  footerEmail: 'info@beats.com.pk',
  footerAddress: 'Bahria Foundation, Head Office, H-8/4, Islamabad, Pakistan',

  // Navigation Menu Customization
  menuItems: DEFAULT_MENU_ITEMS,

  // Custom Pages Created via Page Designer
  customPages: DEFAULT_CUSTOM_PAGES,

  // Tombstones for explicitly deleted items
  deletedPageIds: [],
  deletedMenuItemIds: [],

  // Social Media Links
  socialFacebook: 'https://facebook.com/BahriaFoundationOfficial',
  socialTwitter: 'https://twitter.com/BahriaFdn',
  socialYoutube: 'https://youtube.com/@BahriaFoundation',
  socialLinkedin: 'https://linkedin.com/company/bahria-foundation',
  socialInstagram: 'https://instagram.com/bahriafoundation',

  // Specific Page Settings & Policies
  admissionNotes: 'All admissions are subject to verification of original birth/B-Form certificates and success in regional placement assessments.',
  admissionBankInfo: 'Designated Fee Collection: Askari Bank Ltd & Habib Bank Ltd (HBL) designated branches nationwide.',
  campusLifeHouseColors: 'Jinnah (Crimson Red), Iqbal (Emerald Green), Tippu (Navy Blue), Zafar (Golden Yellow)',
  scholarshipMaxPerStudent: 'Full Tuition Waiver + Rs. 15,000 Book & Research Allowance for qualifying BS/MS scholars.',
  contactGoogleMapQuery: 'Bahria Foundation Head Office Islamabad'
};
