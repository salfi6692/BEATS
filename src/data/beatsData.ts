import { AcademicStream, RegionalOffice, GalleryItem, LeadershipProfile } from '../types';

export const ACADEMIC_STREAMS: AcademicStream[] = [
  {
    id: 'montessori',
    title: 'Montessori Section',
    level: 'Early Childhood Care & Education (ECCE)',
    gradeRange: 'Playgroup to Kindergarten',
    ageGroup: '3 – 5 Years',
    description: 'Nurturing curiosity, cognitive foundations, phonics, motor skills, and creative play in a safe, stimulating child-centered environment.',
    highlights: [
      'Activity-based sensorial learning',
      'Child-safe indoor & outdoor play zones',
      'Phonics and bilingual language readiness',
      'Individualized pastoral care and attention'
    ],
    iconName: 'Baby',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'primary',
    title: 'Primary Section',
    level: 'Foundational Education',
    gradeRange: 'Grade 1 to Grade 5',
    ageGroup: '6 – 10 Years',
    description: 'Strengthening literacy, numeracy, scientific inquiry, moral character, and critical thinking with English medium instruction.',
    highlights: [
      'Concept-driven STEM and English medium curriculum',
      'Islamic Studies, character building, and ethics',
      'Interactive IT and computer literacy from Grade 1',
      'Sports, visual arts, and inter-house debates'
    ],
    iconName: 'BookOpen',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 'secondary',
    title: 'Secondary Section',
    level: 'Middle & Secondary School Certificate (SSC)',
    gradeRange: 'Grade 6 to Grade 10 (SSC-I & SSC-II)',
    ageGroup: '11 – 15 Years',
    description: 'Preparing students for BISE board exams with distinguished academic rigor, science laboratory experiments, and character development.',
    highlights: [
      'Boards of Intermediate & Secondary Education (BISE) alignment',
      'Hands-on Physics, Chemistry, and Biology laboratories',
      'Proven track record with 94%+ board passing average',
      'Leadership training, scouting, and physical fitness'
    ],
    iconName: 'GraduationCap',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'hssc',
    title: 'Higher Secondary (HSSC)',
    level: 'Intermediate College Education',
    gradeRange: 'Grade 11 & 12 (F.Sc / ICS)',
    ageGroup: '16 – 18 Years',
    description: 'Premier college education offering Pre-Medical, Pre-Engineering, and General Science / Computer Science tracks for entry into top universities.',
    highlights: [
      'Pre-Medical & Pre-Engineering specialized faculty',
      'ICS (Computer Science) with advanced coding & data labs',
      'Entry test preparation & career counseling seminars',
      'Naval welfare and merit-based college scholarships'
    ],
    iconName: 'Award',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    id: 'olevel',
    title: 'Cambridge O Level',
    level: 'International Curriculum',
    gradeRange: 'O-1, O-2, O-3',
    ageGroup: '13 – 16 Years',
    description: 'Globally recognized Cambridge Assessment International Education (CAIE) curriculum fostering global perspectives and analytical aptitude.',
    highlights: [
      'Accredited Cambridge curriculum and examinations',
      'International standard science labs and digital libraries',
      'Focus on analytical problem solving & research writing',
      'Seamless progression to Cambridge A-Levels and top universities'
    ],
    iconName: 'Globe',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  }
];

export const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    id: 'north',
    region: 'North Region',
    title: 'Regional Office Director BEATS North',
    city: 'Islamabad / Rawalpindi',
    address: 'Japan Road, Near Ibadat University, Sihala, Islamabad',
    phones: ['+92-51-8153585', '+92-51-8153584', '+92-51-8153588'],
    email: 'beats@bahriafoundation.com',
    campusesCount: 42,
    highlightDistricts: ['Islamabad', 'Rawalpindi', 'Peshawar', 'Abbottabad', 'Gilgit', 'Muzaffarabad', 'Gujar Khan'],
    branchesLink: 'https://beats.com.pk/campuses/north-region/'
  },
  {
    id: 'centre',
    region: 'Centre Region',
    title: 'Regional Office Director BEATS Centre',
    city: 'Lahore & Punjab',
    address: 'Naval Complex Askari - 1, Near Walton Airport, Gulberg - III, Lahore',
    phones: ['+92-42-5889415'],
    fax: '+92-42-5884431',
    email: 'dbeatsc@bahriafoundation.com',
    campusesCount: 26,
    highlightDistricts: ['Lahore', 'Faisalabad', 'Multan', 'Sialkot', 'Gujranwala', 'Bahawalpur', 'Sargodha'],
    branchesLink: 'https://beats.com.pk/campuses/center-region/'
  },
  {
    id: 'south',
    region: 'South Region',
    title: 'Regional Office Director BEATS South',
    city: 'Karachi & Coastal Belt',
    address: '2nd Floor, Bahria Complex-I, M.T. Khan Road, Karachi',
    phones: ['+92-21-35610364', '+92-21-35610242-3'],
    fax: '+92-21-35610749',
    email: 'dbeatss@bahriafoundation.com',
    campusesCount: 19,
    highlightDistricts: ['Karachi', 'Hyderabad', 'Ormara', 'Gwadar', 'Pasni', 'Sukkur', 'Larkana'],
    branchesLink: 'https://beats.com.pk/campuses/south-region/'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
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
    caption: 'Annual sports gala instilling teamwork, resilience, sportsmanship, and physical vigor.'
  },
  {
    id: 'g6',
    title: 'Art, Cultural & Science Exhibition',
    category: 'Academics',
    image: 'https://beats.com.pk/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-12.14.12-PM-768x432.jpeg',
    caption: 'Young scientists and artists presenting innovative STEM and cultural heritage projects.'
  }
];

export const LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    id: 'md',
    role: 'Managing Director',
    title: 'Managing Director – Bahria Foundation',
    name: 'Vice Admiral (R) Muhammad Amjad Khan',
    designation: 'Managing Director Bahria Foundation (MD-BF)',
    image: 'https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg',
    messageSnippet: 'To provide quality and affordable education for equipping our youth with knowledge and skills for self-sustainability and socio-economic growth.',
    fullMessage: [
      'Bahria Education and Training System (BEATS) was founded with a profound patriotic vision: to deliver world-class academic institutions to every corner of Pakistan, especially our coastal belts and under-served hinterlands.',
      'Under the umbrella of Bahria Foundation, we take immense pride in nurturing over 37,000 students across 87+ campuses. We blend disciplined naval values with modern pedagogical standards to cultivate resilient leaders of tomorrow.',
      'Our commitment remains steadfast in supporting families through affordable tuition, merit scholarships, and modern digital learning infrastructure.'
    ]
  },
  {
    id: 'dmd',
    role: 'Deputy Managing Director',
    title: 'Deputy Managing Director – BEATS',
    name: 'Commodore (R) DMD BEATS',
    designation: 'Deputy Managing Director (DMD-BEATS)',
    image: 'https://beats.com.pk/wp-content/uploads/2026/09/wordpress_image-931x1024.png',
    messageSnippet: 'Empowering future generations with academic distinction, moral integrity, and certified teacher development.',
    fullMessage: [
      'At BEATS, we believe the heart of an institution lies in its teaching faculty and student welfare. We have established dedicated Teacher Training Institutes to continually upskill our educators.',
      'With a 94% BISE passing average and consistent nationwide board positions, our schools and colleges provide a proven launchpad for admissions into prestigious medical, engineering, and defense academies.',
      'We welcome parents and students into the Bahria family where tradition meets progressive education.'
    ]
  }
];

export const WHY_CHOOSE_REASONS = [
  {
    title: 'Naval Heritage & Character Building',
    description: 'Grounded in the values of Pakistan Navy—discipline, integrity, honor, and patriotism are cultivated from early years.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Dual Academic Pathways',
    description: 'Flexible offerings spanning National BISE Matriculation/F.Sc alongside Cambridge International O-Level certifications.',
    icon: 'Compass'
  },
  {
    title: 'Dedicated Teacher Training Institutes',
    description: 'BEATS operates its own faculty development academies ensuring pedagogical mastery, modern STEM tools, and student psychology.',
    icon: 'UserCheck'
  },
  {
    title: 'National Footprint in 87+ Campuses',
    description: 'Providing seamless student transfers across all major cities, military cantonments, and remote coastal regions without academic disruption.',
    icon: 'MapPin'
  },
  {
    title: 'State-of-the-Art Science & IT Labs',
    description: 'Equipped with contemporary apparatus, high-speed computer labs, robotics kits, and well-curated library resources.',
    icon: 'FlaskConical'
  },
  {
    title: 'Higher Studies Scholarships & Welfare',
    description: 'Generous financial aid, merit stipends, and dedicated higher education scholarships for promising students.',
    icon: 'Sparkles'
  }
];
