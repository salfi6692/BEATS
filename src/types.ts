export interface AcademicStream {
  id: string;
  title: string;
  level: string;
  gradeRange: string;
  ageGroup: string;
  description: string;
  highlights: string[];
  iconName: string;
  badgeColor: string;
}

export interface RegionalOffice {
  id: string;
  region: string;
  title: string;
  city: string;
  address: string;
  phones: string[];
  email: string;
  fax?: string;
  campusesCount: number;
  highlightDistricts: string[];
  branchesLink: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Academics' | 'Campus Life' | 'Ceremony' | 'Facilities';
  image: string;
  caption: string;
}

export interface LeadershipProfile {
  id: string;
  role: string;
  title: string;
  name: string;
  designation: string;
  image: string;
  messageSnippet: string;
  fullMessage: string[];
}
