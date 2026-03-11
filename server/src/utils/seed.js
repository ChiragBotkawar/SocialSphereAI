/**
 * Database seed script
 * Run: npm run seed (from /server directory)
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Country = require('../models/Country');
const Chapter = require('../models/Chapter');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const Event = require('../models/Event');
const User = require('../models/User');
const Career = require('../models/Career');

const connectDB = require('../config/database');

// ──────────────────────────────────────────────
// Seed Data
// ──────────────────────────────────────────────

const countries = [
  { name: 'India', slug: 'india', code: 'IN', region: 'South Asia', flag: '🇮🇳', chapterCount: 850, memberCount: 32000, isActive: true, isFeatured: true },
  { name: 'United States', slug: 'usa', code: 'US', region: 'North America', flag: '🇺🇸', chapterCount: 2100, memberCount: 85000, isActive: true, isFeatured: true },
  { name: 'United Kingdom', slug: 'uk', code: 'GB', region: 'Europe', flag: '🇬🇧', chapterCount: 580, memberCount: 18000, isActive: true, isFeatured: true },
  { name: 'Australia', slug: 'australia', code: 'AU', region: 'Asia Pacific', flag: '🇦🇺', chapterCount: 420, memberCount: 14000, isActive: true, isFeatured: true },
  { name: 'Canada', slug: 'canada', code: 'CA', region: 'North America', flag: '🇨🇦', chapterCount: 380, memberCount: 13000, isActive: true, isFeatured: true },
  { name: 'Germany', slug: 'germany', code: 'DE', region: 'Europe', flag: '🇩🇪', chapterCount: 210, memberCount: 8500, isActive: true, isFeatured: false },
  { name: 'Singapore', slug: 'singapore', code: 'SG', region: 'Asia Pacific', flag: '🇸🇬', chapterCount: 65, memberCount: 2800, isActive: true, isFeatured: false },
  { name: 'UAE', slug: 'uae', code: 'AE', region: 'Middle East & Africa', flag: '🇦🇪', chapterCount: 95, memberCount: 3200, isActive: true, isFeatured: true },
  { name: 'South Africa', slug: 'south-africa', code: 'ZA', region: 'Middle East & Africa', flag: '🇿🇦', chapterCount: 180, memberCount: 6500, isActive: true, isFeatured: false },
  { name: 'Brazil', slug: 'brazil', code: 'BR', region: 'Latin America', flag: '🇧🇷', chapterCount: 310, memberCount: 11000, isActive: true, isFeatured: false },
  { name: 'Mexico', slug: 'mexico', code: 'MX', region: 'Latin America', flag: '🇲🇽', chapterCount: 240, memberCount: 8000, isActive: true, isFeatured: false },
  { name: 'Japan', slug: 'japan', code: 'JP', region: 'Asia Pacific', flag: '🇯🇵', chapterCount: 150, memberCount: 5500, isActive: true, isFeatured: false },
];

const testimonials = [
  {
    authorName: 'Rajesh Kumar',
    authorTitle: 'Founder & CEO',
    authorCompany: 'TechVision Solutions',
    content: 'BNI has completely transformed my business. In just 2 years, I\'ve received over 150 referrals and grown my revenue by 300%. The relationships I\'ve built are priceless.',
    rating: 5,
    category: 'Member Success',
    businessRevenue: '$2M+',
    yearsAsMember: 4,
    isActive: true,
    isFeatured: true,
    order: 1,
  },
  {
    authorName: 'Sarah Mitchell',
    authorTitle: 'Licensed Financial Advisor',
    authorCompany: 'Wealth Forward Advisors',
    content: 'The BNI philosophy of "Givers Gain" is not just a motto — it\'s a way of doing business that genuinely works. My network has given me clients I never could have found on my own.',
    rating: 5,
    category: 'Business Referral',
    businessRevenue: '$500K+',
    yearsAsMember: 3,
    isActive: true,
    isFeatured: true,
    order: 2,
  },
  {
    authorName: 'Michael Oduya',
    authorTitle: 'Marketing Director',
    authorCompany: 'Brand Amplify Africa',
    content: 'Joining BNI was the single best business decision I\'ve made. The training, the structure, and most importantly the people have shaped not just my business but my professional character.',
    rating: 5,
    category: 'Leadership',
    businessRevenue: '$300K+',
    yearsAsMember: 2,
    isActive: true,
    isFeatured: true,
    order: 3,
  },
  {
    authorName: 'Priya Sharma',
    authorTitle: 'Architect',
    authorCompany: 'PS Designs Studio',
    content: 'In my first year with BNI, I closed more business than in my previous three years combined. This organization is uniquely powerful for service professionals.',
    rating: 5,
    category: 'Member Success',
    businessRevenue: '$400K+',
    yearsAsMember: 2,
    isActive: true,
    isFeatured: true,
    order: 4,
  },
  {
    authorName: 'Carlos Mendez',
    authorTitle: 'General Contractor',
    authorCompany: 'Mendez Construction',
    content: 'BNI gave me the confidence and the community to grow. My chapter has become my most trusted business allies and closest friends. The referrals are just the beginning.',
    rating: 5,
    category: 'Chapter Growth',
    businessRevenue: '$1M+',
    yearsAsMember: 5,
    isActive: true,
    isFeatured: true,
    order: 5,
  },
  {
    authorName: 'Emma Thompson',
    authorTitle: 'Digital Marketing Consultant',
    authorCompany: 'ET Digital Agency',
    content: 'The structured meeting format ensures every member gets value from every session. BNI is not a social club — it\'s a business engine.',
    rating: 5,
    category: 'Networking',
    businessRevenue: '$180K+',
    yearsAsMember: 1,
    isActive: true,
    isFeatured: false,
    order: 6,
  },
];

const careerListings = [
  {
    title: 'Senior Software Engineer',
    department: 'Technology',
    location: { city: 'San Diego', country: 'USA', isRemote: true },
    employmentType: 'Full-Time',
    description: 'Join our global technology team to build and scale platforms that serve 355,000+ members worldwide.',
    responsibilities: [
      'Design and develop scalable backend services using Node.js and MongoDB',
      'Collaborate with cross-functional teams to deliver world-class member experiences',
      'Participate in code reviews and maintain high code quality standards',
      'Mentor junior developers and contribute to technical architecture decisions',
    ],
    requirements: [
      '5+ years of professional software development experience',
      'Proficiency in Node.js, React, and MongoDB',
      'Experience with cloud platforms (AWS or GCP preferred)',
      'Strong understanding of RESTful APIs and microservices',
    ],
    benefits: ['Competitive salary', 'Remote work flexibility', 'Health insurance', 'Professional development budget'],
    status: 'open',
    isFeatured: true,
  },
  {
    title: 'Regional Marketing Manager',
    department: 'Marketing',
    location: { city: 'London', country: 'UK', isRemote: false },
    employmentType: 'Full-Time',
    description: 'Lead marketing initiatives for BNI\'s European region, driving member acquisition and brand awareness.',
    responsibilities: [
      'Develop and execute regional marketing strategies aligned with global brand standards',
      'Manage digital campaigns across social media, email, and paid channels',
      'Collaborate with country directors to localize global campaigns',
      'Analyze campaign performance and present insights to leadership',
    ],
    requirements: [
      '7+ years of marketing experience, with 3+ in a B2B or membership organization',
      'Proven track record in digital marketing and lead generation',
      'Excellent communication and presentation skills',
      'Familiarity with CRM and marketing automation platforms',
    ],
    benefits: ['Competitive salary', 'Flexible working hours', 'International travel opportunities', 'Pension scheme'],
    status: 'open',
    isFeatured: true,
  },
  {
    title: 'Training & Education Specialist',
    department: 'Training',
    location: { city: 'Remote', country: 'Global', isRemote: true },
    employmentType: 'Full-Time',
    description: 'Design and deliver world-class training programs for BNI members and chapter leaders globally.',
    responsibilities: [
      'Develop training curriculum for new and existing BNI members',
      'Facilitate virtual and in-person training sessions',
      'Assess training effectiveness and continuously improve content',
      'Work with regional teams to adapt content for local markets',
    ],
    requirements: [
      '4+ years of corporate training or educational design experience',
      'Experience with LMS platforms and e-learning tools',
      'Excellent facilitation and public speaking skills',
      'Background in adult learning principles',
    ],
    benefits: ['Competitive salary', 'Global travel', 'Career development', 'Remote-first culture'],
    status: 'open',
    isFeatured: false,
  },
];

// ──────────────────────────────────────────────
// Run seeder
// ──────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('\n🌱 Starting database seed...\n');

    // Clear existing data
    await Promise.all([
      Country.deleteMany({}),
      Testimonial.deleteMany({}),
      Career.deleteMany({}),
    ]);
    console.log('✅ Cleared existing seed data');

    // Seed countries
    const createdCountries = await Country.insertMany(countries);
    console.log(`✅ Seeded ${createdCountries.length} countries`);

    // Seed chapters (linked to India and USA)
    const india = createdCountries.find(c => c.slug === 'india');
    const usa = createdCountries.find(c => c.slug === 'usa');
    const uk = createdCountries.find(c => c.slug === 'uk');

    const chapters = [
      {
        name: 'BNI Mumbai Success',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: india._id,
        address: 'Trident Hotel, Bandra Kurla Complex',
        location: { type: 'Point', coordinates: [72.8777, 19.0760] },
        meetingSchedule: { dayOfWeek: 'Tuesday', time: '7:00 AM', frequency: 'Weekly', venue: 'Trident Hotel BKC' },
        contactPerson: { name: 'Amit Shah', email: 'amit.shah@bnimumbai.com', phone: '+91-9876543210' },
        memberCount: 45,
        foundedYear: 2012,
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'BNI Delhi Pinnacle',
        city: 'New Delhi',
        state: 'Delhi',
        country: india._id,
        address: 'Taj Palace Hotel, Sardar Patel Marg',
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        meetingSchedule: { dayOfWeek: 'Wednesday', time: '7:30 AM', frequency: 'Weekly', venue: 'Taj Palace Hotel' },
        contactPerson: { name: 'Sunita Verma', email: 'sunita.v@bnidelhi.com', phone: '+91-9812345678' },
        memberCount: 38,
        foundedYear: 2015,
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'BNI NYC Powerhouse',
        city: 'New York',
        state: 'New York',
        country: usa._id,
        address: '1221 Avenue of the Americas, Midtown Manhattan',
        location: { type: 'Point', coordinates: [-73.9857, 40.7484] },
        meetingSchedule: { dayOfWeek: 'Thursday', time: '7:00 AM', frequency: 'Weekly', venue: 'Midtown Conference Center' },
        contactPerson: { name: 'Robert Chen', email: 'robert.chen@bni-nyc.com', phone: '+1-212-555-0192' },
        memberCount: 52,
        foundedYear: 2008,
        isActive: true,
        isFeatured: true,
      },
      {
        name: 'BNI San Francisco Golden Gate',
        city: 'San Francisco',
        state: 'California',
        country: usa._id,
        address: 'Four Seasons Hotel, 757 Market Street',
        location: { type: 'Point', coordinates: [-122.4194, 37.7749] },
        meetingSchedule: { dayOfWeek: 'Friday', time: '7:30 AM', frequency: 'Weekly', venue: 'Four Seasons SF' },
        contactPerson: { name: 'Jessica Williams', email: 'jwilliams@bni-sf.com', phone: '+1-415-555-0178' },
        memberCount: 41,
        foundedYear: 2011,
        isActive: true,
        isFeatured: false,
      },
      {
        name: 'BNI London City',
        city: 'London',
        state: 'England',
        country: uk._id,
        address: 'Grange City Hotel, 8-14 Cooper\'s Row, London',
        location: { type: 'Point', coordinates: [-0.0729, 51.5117] },
        meetingSchedule: { dayOfWeek: 'Tuesday', time: '6:45 AM', frequency: 'Weekly', venue: 'Grange City Hotel' },
        contactPerson: { name: 'David Harrington', email: 'd.harrington@bni-london.co.uk', phone: '+44-20-7946-0958' },
        memberCount: 48,
        foundedYear: 2009,
        isActive: true,
        isFeatured: true,
      },
    ];

    await Chapter.deleteMany({});
    const createdChapters = await Chapter.insertMany(chapters);
    console.log(`✅ Seeded ${createdChapters.length} chapters`);

    // Seed testimonials with country references
    const testimonialData = testimonials.map((t, i) => ({
      ...t,
      country: createdCountries[i % createdCountries.length]._id,
    }));
    const createdTestimonials = await Testimonial.insertMany(testimonialData);
    console.log(`✅ Seeded ${createdTestimonials.length} testimonials`);

    // Seed careers
    const createdCareers = await Career.insertMany(careerListings);
    console.log(`✅ Seeded ${createdCareers.length} careers`);

    console.log('\n✨ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
