// ─── Casting Opportunity ──────────────────────────────────────────────────────

export type AuditionMode = 'Online' | 'Offline' | 'Both';
export type CastingCategory =
  | 'Movie'
  | 'Short Film'
  | 'Web Series'
  | 'Advertisement'
  | 'Music Video'
  | 'TV Show'
  | 'Theatre';

export type ExperienceLevel =
  | 'Fresher'
  | '1-2 Years'
  | '3-5 Years'
  | '5+ Years'
  | 'Any';

export type Gender = 'Male' | 'Female' | 'Any' | 'Non-binary';

export interface CastingOpportunity {
  id: string;
  movieName: string;
  productionHouse: string;
  roleName: string;
  category: CastingCategory;
  genderRequired: Gender;
  ageRange: { min: number; max: number };
  languages: string[];
  experience: ExperienceLevel;
  shootingLocation: string;
  vacancies: number;
  salary: { min: number; max: number; currency: string };
  auditionMode: AuditionMode;
  applicationDeadline: string; // ISO date string
  postedDate: string;          // ISO date string
  shortDescription: string;
  tags: string[];
  verified: boolean;
  posterUrl: string;
  isBookmarked?: boolean;
}

// ─── Artist ───────────────────────────────────────────────────────────────────

export interface Artist {
  id: string;
  name: string;
  category: string;
  location: string;
  profilePhoto: string;
  coverPhoto?: string;
  bio: string;
  skills: string[];
  experience: ExperienceLevel;
  languages: string[];
  rating: number;
  projectsCount: number;
  followersCount: number;
  verified: boolean;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    imdb?: string;
  };
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  userType: 'Artist' | 'Recruiter';
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// ─── Feature ──────────────────────────────────────────────────────────────────

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface FilterState {
  search: string;
  gender: Gender | '';
  ageMin: number | '';
  ageMax: number | '';
  language: string;
  category: CastingCategory | '';
  location: string;
  experience: ExperienceLevel | '';
  salaryMin: number | '';
  salaryMax: number | '';
  auditionMode: AuditionMode | '';
  sortBy: 'latest' | 'oldest' | 'highest-salary' | 'deadline';
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

// ─── Company / Production House ───────────────────────────────────────────────

export interface Company {
  id: string;
  name: string;
  logo: string;
}
