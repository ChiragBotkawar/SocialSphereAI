// ──────────────────────────────────────────────
// Core Domain Types
// ──────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationMeta;
}

// ──────────────────────────────────────────────
// User
// ──────────────────────────────────────────────
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  profession?: string;
  company?: string;
  city?: string;
  country?: string;
  avatar?: string | null;
  role: 'user' | 'chapter_leader' | 'admin';
  chapter?: string | null;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ──────────────────────────────────────────────
// Country
// ──────────────────────────────────────────────
export interface Country {
  _id: string;
  name: string;
  slug: string;
  code: string;
  flag?: string;
  region?: string;
  description?: string;
  heroImage?: string | null;
  chapterCount: number;
  memberCount: number;
  nationalDirector?: {
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
  };
  website?: string;
  contactEmail?: string;
  isActive: boolean;
  isFeatured: boolean;
  stats?: {
    totalReferrals: number;
    totalRevenue: string;
    yearsActive: number;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  chapters?: Chapter[];
}

// ──────────────────────────────────────────────
// Chapter
// ──────────────────────────────────────────────
export interface MeetingSchedule {
  dayOfWeek: string;
  time: string;
  frequency: string;
  venue?: string;
  venueAddress?: string;
}

export interface Chapter {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  country: Country | string;
  city: string;
  state?: string;
  zipCode?: string;
  address?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  meetingSchedule?: MeetingSchedule;
  contactPerson?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  website?: string;
  memberCount: number;
  foundedYear?: number;
  logo?: string | null;
  coverImage?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
}

// ──────────────────────────────────────────────
// Blog Post
// ──────────────────────────────────────────────
export type BlogCategory =
  | 'Networking Tips'
  | 'Success Stories'
  | 'Leadership Insights'
  | 'Latest News'
  | 'Business Growth'
  | 'Events Recap';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string | null;
  createdAt: string;
  author: string | {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    profession?: string;
  };
  category: BlogCategory;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  publishedAt?: string;
  readTime: number;
  viewCount: number;
  metaTitle?: string;
  metaDescription?: string;
  relatedPosts?: BlogPost[];
  country?: Country | string | null;
}

// ──────────────────────────────────────────────
// Event
// ──────────────────────────────────────────────
export type EventType = 'Global Conference' | 'Local Event' | 'Training Event' | 'Webinar' | 'Workshop' | 'Networking';
export type EventFormat = 'In-Person' | 'Online' | 'Hybrid';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface BNIEvent {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  coverImage?: string | null;
  eventType: EventType;
  format: EventFormat;
  startDate: string;
  endDate: string;
  registrationDeadline?: string;
  venue?: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    onlineLink?: string;
  };
  capacity?: number;
  registeredCount: number;
  price?: {
    amount: number;
    currency: string;
    isFree: boolean;
  };
  speakers?: Array<{
    name: string;
    title?: string;
    bio?: string;
    photo?: string;
  }>;
  agenda?: Array<{
    time: string;
    title: string;
    description?: string;
    speaker?: string;
  }>;
  country?: Country | string | null;
  status: EventStatus;
  isFeatured: boolean;
  registrationUrl?: string;
}

// ──────────────────────────────────────────────
// Testimonial
// ──────────────────────────────────────────────
export interface Testimonial {
  _id: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  authorPhoto?: string | null;
  content: string;
  rating: number;
  category: string;
  country?: Country | string | null;
  businessRevenue?: string;
  yearsAsMember?: number;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  videoUrl?: string;
}

// ──────────────────────────────────────────────
// Career
// ──────────────────────────────────────────────
export interface Career {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: {
    city?: string;
    country?: string;
    isRemote: boolean;
  };
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  niceToHave?: string[];
  benefits?: string[];
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    isPublic: boolean;
  };
  applicationDeadline?: string;
  status: 'open' | 'closed' | 'on_hold';
  isFeatured: boolean;
  applicationEmail?: string;
  applicationUrl?: string;
  createdAt: string;
}

// ──────────────────────────────────────────────
// Forms
// ──────────────────────────────────────────────
export interface VisitRequestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profession: string;
  company?: string;
  city?: string;
  message?: string;
  chapter: string;
  preferredDate?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType?: string;
  country?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
  company?: string;
  city?: string;
  country?: string;
}

// ──────────────────────────────────────────────
// Chapter Search
// ──────────────────────────────────────────────
export interface ChapterSearchParams {
  search?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
  featured?: boolean;
}
