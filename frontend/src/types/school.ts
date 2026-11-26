/**
 * Shared TypeScript contracts for J-Neric Kindergarten & Junior School.
 * Designed to mirror Phase 2 Laravel + MySQL API schemas so static data imports
 * in src/data/ can be swapped for /api/* calls without UI refactoring.
 */

export type DivisionKey = 'kindergarten' | 'junior-school';

export type AdmissionDivisionLabel = 'Kindergarten' | 'Junior School';

export type NewsCategory = 'Milestone' | 'Academics' | 'Admissions';

/** Mirrors future `news_articles` MySQL table */
export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  category: NewsCategory;
  publishedAt: string; // ISO date string (YYYY-MM-DD)
  displayDate: string;
  summary: string;
  body: string[];
  featured: boolean;
  imagePath: string;
  imageCaption: string;
  author: string;
}

/** Mirrors future `academic_calendar_items` MySQL table */
export interface TermDateItem {
  id: number;
  term: 'Term I' | 'Term II' | 'Term III';
  academicYear: number;
  openingDate: string;
  midtermBreak: string;
  visitationDay: string;
  closingDate: string;
  notes: string;
}

/** Mirrors future `POST /api/admissions` payload & `admission_inquiries` table */
export interface AdmissionInquiryPayload {
  parentFullName: string;
  phoneNumber: string;
  email: string;
  childFullName: string;
  childDateOfBirth: string;
  division: AdmissionDivisionLabel;
  classApplyingFor: string;
  preferredVisitDate: string;
  message: string;
}

/** Mirrors future `POST /api/inquiries` payload */
export interface GeneralInquiryPayload {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface SchoolPayChannel {
  index: string;
  provider: string;
  dialOrPortal: string;
  steps: string[];
}

export interface SchoolPayGuide {
  registeredEntityName: string;
  summary: string;
  channels: SchoolPayChannel[];
  supportNote: string;
}

export interface EnrollmentStep {
  index: string;
  title: string;
  description: string;
}

export interface CoreValueItem {
  index: string;
  label: string;
  title: string;
  description: string;
}

export interface SchoolProfile {
  name: string;
  shortName: string;
  motto: string;
  eyebrowLocation: string;
  locationFull: string;
  locationShort: string;
  phoneDisplay: string;
  phoneHref: string;
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  director: {
    name: string;
    title: string;
    welcomeHeading: string;
    welcomeParagraphs: string[];
    closingQuote: string;
  };
  foundingOverview: string[];
  pillarsLedger: CoreValueItem[];
  enrollmentSteps: EnrollmentStep[];
  schoolPay: SchoolPayGuide;
}

export interface ClassLevel {
  name: string;
  ageRange: string;
  focus: string;
  image?: string;
  imageAlt?: string;
}

export interface AcademicDivision {
  id: DivisionKey;
  index: string;
  name: string;
  subtitle: string;
  accentToken: 'laurel-green' | 'crest-sky';
  summary: string;
  curriculumFocus: string[];
  classes: ClassLevel[];
}

export interface CoCurricularProgram {
  index: string;
  title: string;
  summary: string;
}

export interface DailyScheduleSlot {
  time: string;
  activity: string;
  appliesTo: 'All Learners' | 'Kindergarten' | 'Junior School';
  notes: string;
}
