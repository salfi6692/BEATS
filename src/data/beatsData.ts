import { AcademicStream, RegionalOffice, GalleryItem, LeadershipProfile } from '../types';

export const ABOUT_DATA = {
  overview:
    'Bahria Education And Training System (BEATS) was established in 1998 following the vision of Bahria Foundation to spread education facilities all over the country, especially in under-developed areas.',
  overviewContinuation:
    'BEATS has progressed well over the years and is presently operating more than 87 BFEIs (120 campuses) located all across Pakistan. Catering to the educational needs of approximately 37,000 students in rural and urban areas of Pakistan. The foundation ensures quality education through vigorous monitoring and academic audits.',
  history:
    'Bahria Foundation has always given immense importance to quality education and is therefore, pursuing persistently for the promotion of education by establishing Bahria Foundation School/Colleges all over the country, particularly, in semi urban and under developed areas. For this purpose, a separate division known as Bahria Education & Training Services (BEATS) was established in 1998. Since then, BEATS has earned a reputation of excellence in quality education, discipline and character building. To date BEATS has established more than 87 BFEIs all over Pakistan (more than 58 in North, 8 in Centre and 20 in South Region) with strength of over 37,000 students and has provided employment to over 3,200 personnel of Pakistan Navy/ Armed Forces retired personnel and local community of the area, as faculty and non-faculty staff.',
  vision:
    'To provide sustainable development opportunities to All through innovative and inclusive educational activities aligned with national aspirations and global outlook',
  mission:
    'To provide quality and affordable education for equipping the beneficiaries with knowledge and skills for self-sustainability and socio-economic growth',
  quaidQuote:
    'There is no doubt that the future of our state will and must greatly depend upon the type of education we give to our children and the way in which we bring them up as future citizens of Pakistan.',
  objectives: [
    'Educate students with best teaching methodologies',
    "Build student's self-confidence and self-esteem",
    'Promote team work',
    'Develop leadership qualities',
    'Eliminate negative personality traits',
    'Promote creativity',
    'Polish innate skills',
    'Develop sense of pride, achievement and quest for excellence',
    'Enable students to recognize their capabilities and maximize their individual potentials',
  ],
  committees: {
    educationCommittee: {
      title: 'Education Committee',
      members: [
        { role: 'Non-Executive Director', designation: 'Chairman' },
        { role: 'DMD BEATS', designation: 'Member' },
        { role: 'CFO', designation: 'Member' },
        { role: 'Independent Co-Opt.', designation: 'Co-Opted Member' },
        { role: 'Independent Co-Opt.', designation: 'Co-Opted Member' },
        { role: 'DGWR', designation: 'Co-opted Member' },
        { role: 'Dir PNBA', designation: 'Co-opted Member' },
        { role: 'COO BEATS', designation: 'Secretary' },
      ],
    },
    coordinationCommittee: {
      title: 'BEATS Coordination Committee (BCC)',
      members: [
        { role: 'DMD (BEATS)', designation: 'Chairman' },
        { role: 'Regional Directors (BEATS)', designation: 'Member' },
        { role: 'COO (BEATS)', designation: 'Member' },
        { role: 'AALA', designation: 'Member' },
        { role: 'Director / Manager (F&A, BEATS)', designation: 'Member' },
        { role: 'Co-opted Members', designation: 'As required' },
        { role: 'DM / Secy, BCC', designation: 'Secretary' },
      ],
    },
    academicReviewCommittee: {
      title: 'Academic Review Committee (ARC)',
      members: [
        { role: 'COO BEATS', designation: 'President' },
        { role: 'Representative from Regional Office', designation: '1 each Region – Member' },
        { role: 'Nominees from BFEIs', designation: '3 each Region – Member' },
        { role: 'DD Academics, BEATS', designation: 'Secretary' },
      ],
    },
  },
};

export const MD_MESSAGE_DATA = {
  leaderTitle: 'Vice Admiral Imran Ahmed HI (M)',
  leaderDesignation: 'Managing Director Bahria Foundation (MD-BF)',
  salutation: 'My Dear Parents',
  heading: 'Message MD-BF',
  paragraphs: [
    'Welcome to Bahria Education & Training System (BEATS).',
    'BEATS over the years, has achieved milestones in Access, Quality and Governance. This has been done through focused efforts exerted at every level. With 87 BFCs, 120 campuses more than 37,000 students and over 3,200 teaching and non teaching staff, we are committed to ensure that each student at our institutions gets the opportunity to pursue his/her interests and passion, unlock talent and creativity and brings ultimate change in our communities.',
    'We are also partnering with local stakeholders to identify new avenues for collaboration / joint ventures to develop a strong network of supporters committed to advance our Mission.',
    'I am optimistic that with BEATS ability to innovate and inspire, Bahria Foundation Schools & Colleges will bring excellence and will touch the new heights of glory.',
  ],
};

export const ADMISSION_PAGE_DATA = {
  procedureTitle: 'Admission Procedure',
  procedureDesc:
    'Upon availing of this prospectus, following documents required for admission:',
  requiredDocuments: [
    'Admission Form duly filled and signed by parents/guardian',
    '4 passport size photographs with sky blue background',
    'Attested copy of Birth Certificate or Form-B issued by NADRA',
    'Attested copy of CNIC of Father / Guardian',
    'School Leaving Certificate / Character Certificate from previous institution (if applicable)',
    'Attested copies of previous academic progress report / mark sheet',
    'Service Certificate in case of Armed Forces / Navy / BF employee beneficiaries',
  ],
  concessions: [
    'Sibling',
    'Children of BF & BFEIs Regular Employees',
    'Children of BF & BFEIs Contract Employees',
    'Children of Naval Personnel',
    'Children of Army & Air Force Personnel',
    'Martyrs of Défense Personnel (MDP)',
    'Merit Scholarship',
  ],
  duesRules: [
    'Fee challan are issued by 5th of each month.',
    'College dues shall be paid through online methods/Apps or bank counter.',
    'Monthly fee/challan must be cleared latest by 15th of each month.',
    'Late fee/fine will be charged after due date, till 25th of each month as mentioned in fee challan.',
    'Monthly fee once paid is not refundable.',
    'Fee structure may be revised according to financial exigencies.',
    'College leaving Certificate is issued only after all dues have been cleared.',
    'In case of non-payment of dues for consecutive two months, the name of the student is struck off from the college roll on the last working day of the second month. If re-admitted, the entire admission fee will be charged.',
  ],
};

export const ACADEMICS_PAGE_DATA = {
  session: {
    title: 'Academic Session',
    content:
      'The academic session of BFC commences in March and ends in February of the following year except HSSC, which ends in May. The academic session of O-Level starts in August each year.',
  },
  streamsIntro: {
    title: 'BFC Academic Streams',
    content:
      'The medium of instruction at BFCs is English. The academic division of the School/College is as below: Montessori Section, Primary Section, Secondary Section, HSSC, and O Level.',
  },
  religiousEducation: {
    title: 'Religious Education',
    intro:
      'Bahria Foundation shows special concern for religious education. The following steps have been taken in this context:',
    points: [
      'School starts with Quran recitation in the morning assembly with Urdu/English translation',
      'Quranic Education has been formally introduced as a part of BFC curriculum',
      'Quranic Education is taught by subject specialist teachers',
    ],
  },
  promotionPolicy: {
    title: 'Promotion Policy',
    intro:
      'Examinations up to class IV are conducted in house by the College and examinations from class V to VII are conducted centrally. The promotion policy is as follows:',
    rules: [
      'Final percentage is tabulated on the basis of 50% weightage of both the 1st and 2nd terminal examination',
      'The passing percentage is 45% in aggregate',
      'The passing percentage for each subject is 40%',
      'Failing in three subjects is considered a failure in the final examination',
    ],
  },
};

export const CAMPUS_LIFE_PAGE_DATA = {
  learningEnvironment: {
    title: 'Our Learning Environment',
    content:
      'At BFCs, we believe our school environments are reflective of our identity. Every BFCs environment is meticulously planned to ensure spaces, equipment, and resources to fully support learning and remain sensitive to the constant interplay between theory and practice. Our learning environments provide powerful contexts for learning, we see students as protagonists, leading characters, in the learning journey for whom the environment continuously develops, evolves, and transforms. It is in such an environment that students develop ideas, theories, and understanding; it is here that they reflect on the ‘what’ as well as on the ‘how’ of their learning (metacognition).',
  },
  ele: {
    title: 'Enhanced Learning Environment (ELE)',
    content:
      'Bahria Foundation Colleges have embraced the technology whole heartedly. Our Enhanced Learning Environment (ELE) integrates technology seamlessly into teaching and learning, where the digital natives of the 21st century thrive on the unlimited opportunities technology provides. Our ELE classrooms are equipped with the latest education technology selected to enrich the curriculum and inspire learners to follow their interests, be it exploring the moon, or taking on the role of an astronaut, the learning possibilities are dynamic and endless.',
  },
  houses: {
    title: 'BEATS Houses',
    intro:
      'The college students are divided into four houses: Each house comprises an almost equal number of students. This division is only for the purpose of annual competitions.',
    items: [
      { name: 'JINNAH', color: 'bg-emerald-600 text-white', border: 'border-emerald-500', desc: 'Named in honor of Quaid-e-Azam Muhammad Ali Jinnah' },
      { name: 'IQBAL', color: 'bg-blue-600 text-white', border: 'border-blue-500', desc: 'Named in honor of Allama Muhammad Iqbal' },
      { name: 'TIPPU', color: 'bg-amber-600 text-white', border: 'border-amber-500', desc: 'Named in honor of Sultan Fateh Ali Tippu' },
      { name: 'ZAFAR', color: 'bg-rose-600 text-white', border: 'border-rose-500', desc: 'Named in honor of Bahadur Shah Zafar' },
    ],
  },
  facilities: {
    title: 'Facilities & Resources',
    content:
      'The facilities and resources at Bahria Foundation Colleges provide optimum learning opportunities to students and teachers. Bahria Foundation Colleges have mostly state-of-the-art purpose-built campuses considering academic requirements. The campuses provide a safe and comfortable environment for students and have specialized areas developed in accordance with the developmental needs of the students.',
    features: [
      'Modern Science Laboratories (Physics, Chemistry, Biology)',
      'Digital ICT & Multimedia Classrooms',
      'Comprehensive Library with curriculum and reference collections',
      'Child-safe Early Learning & Montessori Activity Centers',
      'Outdoor Sports Grounds & In-door Activity Halls',
      'Secure Campus Environments with 24/7 CCTV & Naval Guard Surveillance',
    ],
  },
  attendance: {
    title: 'Attendance Policy',
    badge: 'Secure Attendance Through Face Recognition',
    paragraphs: [
      'It is mandatory for all students to attend at least 75% of lessons in each subject. Upon failing to meet this condition, they will not be allowed to sit for any annual examination of BFC.',
      'The students would be responsible for the completion of their classwork and practical journals. In addition, preparatory and sendup exams are also conducted prior to enlisting students for board exams. It is mandatory for students to qualify these exams/tests.',
    ],
  },
  leaveRules: {
    title: 'Students Leave Rules',
    intro: 'Following are the leaves rules for students:',
    rules: [
      'Applications must be forwarded by parents/guardians to the principal/Sr. Coordinator.',
      'Leave will be granted for unavoidable circumstances.',
      'Leave for reasons other than sudden illness, accident or death of a close relative must be applied for well before time.',
    ],
  },
  activities: {
    title: 'Activities & Competitions',
    content:
      'BFCs organize and participate in different Inter-Zonal, Regional, and International Competitions. These include debates, qirat & naat contests, science fairs, sports tournaments, national patriotic galas, and art exhibitions.',
  },
  breaks: {
    title: 'Summer / Winter Breaks & Vacations',
    intro: 'A general overview of summer/winter breaks is as follows:',
    items: [
      'Summer Vacation (June – August)',
      'Winter Vacation (Dec – Jan)',
      'Federal Government gazetted holidays',
      'Special Occasions, if allowed by administration/Provincial Government etc.',
    ],
  },
  timings: {
    title: 'Timings & Working Hours',
    content:
      'The College working hours depend on the local climate conditions and are promulgated by the Principal. Montessori classes will, however, finish a period earlier. Changes in college working hours, if any, will normally be notified on the respective college notice boards.',
  },
  transfers: {
    title: 'Inter-College Transfers',
    content:
      'Students desiring transfer from Bahria Foundation College in one city to Bahria College in another city would be provided this facility free of cost subject to the availability of seat. However the families need to pay the difference of security deposit.',
  },
  uniform: {
    summer: {
      boys: [
        'Half / Full Sleeves white collar shirt with front left pocket',
        'Navy blue trousers',
        'Navy blue shorts (Montessori to Class II)',
        'White socks',
        'Black school shoes with laces',
        'College necktie',
      ],
      girls: [
        'Navy blue tunic (V-neck) with left pocket',
        'White collar blouse',
        'White shalwar',
        'White socks / stockings',
        'Black school shoes',
        'White sash',
        'College necktie',
      ],
    },
    winter: {
      boys: [
        'Full Sleeves white collar shirt with front left pocket',
        'Navy blue trousers',
        'White socks',
        'Black school shoes with laces',
        'Navy blue blazer / blue pullover (V-neck)',
        'College necktie',
      ],
      girls: [
        'Navy blue tunic (V-neck) with left pocket',
        'White collar blouse',
        'White shalwar',
        'Black school shoes',
        'Navy blue blazer / blue pullover (V-neck)',
        'College necktie',
      ],
    },
  },
};

export const SCHOLARSHIP_PAGE_DATA = {
  title: 'Scholarship & Further Studies',
  mouHeading:
    'BEATS has Sign. MoU with Iqra University, Chak Shahzad Campus, for scholarships/concessions in following:',
  programs: ['1. Skill development program', '2. BS program'],
  contactInfo:
    'For further details contact Email: beats@bahriafoundation.com || Mobile No: 0317-1178979',
  highlights: [
    'Merit-based scholarships for high-achieving matric & intermediate graduates',
    'Concessions and quotas for children of naval personnel and martyrs of defense',
    'Skill training partnerships to enhance employment and technical competency',
    'Career guidance seminars and direct university admission pathways',
  ],
};

export const CONTACT_PAGE_DATA = {
  headOffice: {
    title: 'Head Office',
    address:
      '4th Floor, Laraib Plaza, Plot # 20 Business Square, Gulberg Greens, Islamabad.',
    phones: [
      '+92-51-8153584',
      '+92-51-8153585',
      '+92-51-8153588',
      '+92-51-5915601',
      '+92-51-5915602',
    ],
    emails: ['beats@bahriafoundation.com', 'nighat@bahriafoundation.com'],
  },
  regionalOffices: [
    {
      id: 'north',
      name: 'North Region',
      directorate: 'Regional Office Director BEATS North',
      address: 'Japan Road, Near Ibadat University, Sihala, Islamabad',
      phones: ['+92-51-8153584', '+92-51-8153585', '+92-51-8153588', '+92-51-5915600'],
      email: 'info-n@bahriafoundation.com',
      linkText: 'View All North Branches',
      linkPath: '/campuses?region=north',
    },
    {
      id: 'centre',
      name: 'Centre Region',
      directorate: 'Regional Office Director BEATS Centre',
      address: 'Naval Complex Askari - 1 Near Walton Airport, Gulberg - III, Lahore',
      phones: ['+92-42-5889415'],
      fax: '+92-42-5884431',
      email: 'dbeatsc@bahriafoundation.com',
      linkText: 'View All Center Branches',
      linkPath: '/campuses?region=centre',
    },
    {
      id: 'south',
      name: 'South Region',
      directorate: 'Regional Office Director BEATS South',
      address: '2nd Floor, Bahria Complex-I M.T. Khan Road, Karachi',
      phones: ['+92-21-35610364', '+92-21-35610242-3'],
      fax: '+92-21-35610749',
      email: 'dbeatss@bahriafoundation.com',
      linkText: 'View All South Branches',
      linkPath: '/campuses?region=south',
    },
  ],
};

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
    name: 'Vice Admiral Imran Ahmed HI (M)',
    designation: 'Managing Director Bahria Foundation (MD-BF)',
    image: 'https://beats.com.pk/wp-content/uploads/2024/12/md-PIC-.jpg',
    messageSnippet: 'To provide quality and affordable education for equipping our youth with knowledge and skills for self-sustainability and socio-economic growth.',
    fullMessage: [
      'Welcome to Bahria Education & Training System (BEATS).',
      'BEATS over the years, has achieved milestones in Access, Quality and Governance. This has been done through focused efforts exerted at every level. With 87 BFCs, 120 campuses more than 37,000 students and over 3,200 teaching and non teaching staff, we are committed to ensure that each student at our institutions gets the opportunity to pursue his/her interests and passion, unlock talent and creativity and brings ultimate change in our communities.',
      'We are also partnering with local stakeholders to identify new avenues for collaboration / joint ventures to develop a strong network of supporters committed to advance our Mission. I am optimistic that with BEATS ability to innovate and inspire, Bahria Foundation Schools & Colleges will bring excellence and will touch the new heights of glory.'
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
