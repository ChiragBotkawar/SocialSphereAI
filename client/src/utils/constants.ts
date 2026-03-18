// ──────────────────────────────────────────────
// Global Stats (from SRS)
// ──────────────────────────────────────────────
export const BNI_STATS = [
  { value: 355000, suffix: '+', label: 'Members Worldwide', prefix: '' },
  { value: 11600, suffix: '+', label: 'Chapters Globally', prefix: '' },
  { value: 76, suffix: '', label: 'Countries', prefix: '' },
  { value: 17, suffix: 'M+', label: 'Referrals Annually', prefix: '' },
  { value: 26.5, suffix: 'B+', label: 'Revenue Generated', prefix: '$' },
] as const;

// ──────────────────────────────────────────────
// Core Values
// ──────────────────────────────────────────────
export const CORE_VALUES = [
  {
    title: 'Givers Gain®',
    description:
      'The foundational BNI philosophy. By giving business to others, you will get business in return. Generosity is the engine of our referral network.',
    icon: 'Heart',
  },
  {
    title: 'Building Relationships',
    description:
      'BNI is built on trusted relationships. The know, like, and trust principle drives every referral and every interaction.',
    icon: 'Users',
  },
  {
    title: 'Lifelong Learning',
    description:
      'Every week, BNI members grow through sharing expertise, attending training programs, and continuously sharpening their business skills.',
    icon: 'BookOpen',
  },
  {
    title: 'Traditions + Innovation',
    description:
      'BNI honors its proven structure while embracing change. From chapter meetings to the BNI Connect app, we evolve with our members.',
    icon: 'Lightbulb',
  },
  {
    title: 'Positive Attitude',
    description:
      'Members bring enthusiasm and an abundance mindset to every meeting. A positive environment is essential to a thriving chapter.',
    icon: 'Star',
  },
  {
    title: 'Accountability',
    description:
      'Structured reporting of referrals and business keeps every member motivated and chapters performing at their best.',
    icon: 'Target',
  },
] as const;

// ──────────────────────────────────────────────
// How to Join Steps
// ──────────────────────────────────────────────
export const HOW_TO_JOIN_STEPS = [
  {
    step: 1,
    title: 'Find a Chapter',
    description:
      'Search for a BNI chapter in your city or zip code. Explore chapters near you with our interactive map.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Visit a Meeting',
    description:
      'Attend a chapter meeting as a guest — free of charge. Experience BNI first-hand before making any commitment.',
    icon: 'Calendar',
  },
  {
    step: 3,
    title: 'Apply for Membership',
    description:
      'If you love what you see, apply for membership. Each chapter has one seat per profession — exclusivity is built in.',
    icon: 'FileText',
  },
  {
    step: 4,
    title: 'Start Giving & Growing',
    description:
      'Join, engage, and begin building life-long business relationships that generate real revenue for your business.',
    icon: 'TrendingUp',
  },
] as const;

// ──────────────────────────────────────────────
// Benefits of Membership
// ──────────────────────────────────────────────
export const MEMBERSHIP_BENEFITS = [
  {
    title: 'Exclusive Professional Seat',
    description:
      'Only one member per profession per chapter. Your spot is exclusively yours — no competition from within.',
    icon: 'Shield',
  },
  {
    title: 'Warm Business Referrals',
    description:
      'Receive qualified referrals from trusted colleagues. Every week, members pass business to each other.',
    icon: 'ArrowRightLeft',
  },
  {
    title: 'Global Network Access',
    description:
      'As a BNI member, your network extends to 355,000+ members across 76 countries via BNI Connect.',
    icon: 'Globe',
  },
  {
    title: 'Professional Training',
    description:
      'Access world-class training in networking, presenting, and business development through BNI University.',
    icon: 'GraduationCap',
  },
  {
    title: 'Leadership Development',
    description:
      'Develop communication, management, and leadership skills by serving in chapter leadership roles.',
    icon: 'Award',
  },
  {
    title: 'BNI Connect App',
    description:
      'Manage your network, track referrals, and stay connected with your chapter anytime, anywhere.',
    icon: 'Smartphone',
  },
] as const;

// ──────────────────────────────────────────────
// BNI History Timeline
// ──────────────────────────────────────────────
export const BNI_HISTORY = [
  { year: 1985, event: 'BNI founded by Dr. Ivan Misner in Arcadia, California with the first official chapter.' },
  { year: 1990, event: 'BNI expands internationally for the first time, establishing chapters in the United Kingdom.' },
  { year: 1998, event: 'Launches in India and Asia Pacific, marking a major expansion milestone.' },
  { year: 2004, event: 'BNI reaches 100,000 members across multiple continents — a landmark achievement.' },
  { year: 2012, event: 'Launches BNI Connect, a revolutionary global networking platform for all members.' },
  { year: 2018, event: 'Surpasses 250,000 members worldwide across more than 8,300 chapters.' },
  { year: 2022, event: 'Members generate over $18.4 billion in business revenue — a new all-time record.' },
  { year: 2024, event: 'BNI reaches 355,000+ members in 11,600+ chapters across 76 countries.' },
] as const;

// ──────────────────────────────────────────────
// Navigation Structure
// ──────────────────────────────────────────────
type MegaMenuLink = { label: string; href: string };
type MegaMenuColumn = { heading?: string; items: MegaMenuLink[] };
export type NavItem = {
  label: string;
  href: string;
  newTab?: boolean;
  megaMenu?: { columns: MegaMenuColumn[] };
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'The BNI Experience',
    href: '/the-bni-experience',
  },
  {
    label: 'Our Global Community',
    href: '/find-a-chapter',
  },
  {
    label: 'My BNI Story',
    href: '/success-stories',
  },
  {
    label: 'BNI Franchising',
    href: '/bni-franchising',
    newTab: true,
  },
  {
    label: 'About BNI',
    href: '/about',
    megaMenu: {
      columns: [
        {
          items: [
            { label: 'About Us', href: '/about' },
            { label: 'Leadership', href: '/about#leadership' },
            { label: 'National Directors', href: '/about#directors' },
            { label: 'Our Founder', href: '/about#founder' },
            { label: 'BNI® Foundation', href: '/about#foundation' },
          ],
        },
        {
          heading: 'The Latest',
          items: [
            { label: 'Blog & News', href: '/blog' },
            { label: 'Networking Tips', href: '/blog?category=networking-tips' },
            { label: 'Global Events', href: '/events' },
            { label: 'Careers', href: '/careers' },
          ],
        },
        {
          items: [
            { label: 'Find a Chapter', href: '/find-a-chapter' },
            { label: 'Start a Chapter', href: '/start-a-chapter' },
            { label: 'Exclusive Member Benefits', href: '/the-bni-experience#benefits' },
            { label: 'Contact Us', href: '/contact' },
          ],
        },
      ],
    },
  },
];

// ──────────────────────────────────────────────
// Blog Categories
// ──────────────────────────────────────────────
export const BLOG_CATEGORIES = [
  'Networking Tips',
  'Success Stories',
  'Leadership Insights',
  'Latest News',
  'Business Growth',
  'Events Recap',
] as const;

// ──────────────────────────────────────────────
// Contact Inquiry Types
// ──────────────────────────────────────────────
export const INQUIRY_TYPES = [
  'General',
  'Membership',
  'Chapter',
  'Media',
  'Partnership',
  'Technical Support',
  'Other',
] as const;

// ──────────────────────────────────────────────
// Footer Links
// ──────────────────────────────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: 'About BNI', href: '/about' },
    { label: 'The BNI Experience', href: '/the-bni-experience' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  network: [
    { label: 'Find a Chapter', href: '/find-a-chapter' },
    { label: 'Start a Chapter', href: '/start-a-chapter' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
  ],
  regions: [
    { label: 'India', href: '/country/india' },
    { label: 'United States', href: '/country/usa' },
    { label: 'United Kingdom', href: '/country/uk' },
    { label: 'Australia', href: '/country/australia' },
    { label: 'Canada', href: '/country/canada' },
    { label: 'UAE', href: '/country/uae' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
} as const;

// ──────────────────────────────────────────────
// Social Links
// ──────────────────────────────────────────────
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/BNIGlobal',
  twitter: 'https://twitter.com/BNIGlobal',
  linkedin: 'https://www.linkedin.com/company/bni',
  instagram: 'https://www.instagram.com/bniglobal',
  youtube: 'https://www.youtube.com/user/BNIVideos',
} as const;
