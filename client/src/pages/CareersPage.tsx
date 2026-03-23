import { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, MapPin, Mail, Linkedin, Plus, Minus, Search, ExternalLink } from 'lucide-react';
import Container from '../components/ui/Container';

// ─── DATA ────────────────────────────────────────────────────────

const SECTIONS = [
  'Meet Our Recruitment Team',
  'Core Values',
  'Life at BNI',
  'Hear From Our People',
  'Current Openings',
] as const;

const RECRUITMENT_TEAM = [
  {
    name: 'Todd Rimer',
    title: 'Talent Acquisition Global Director',
    org: 'BNI Global, Scion, CorporateConnections®',
    bio: 'Leading Global Talent Acquisition for BNI and its divisions since December 2022, Todd brings 29 years of experience in both corporate and agency recruiting.',
    location: 'Global HQ, Charlotte, NC',
    email: 'toddrimer@bni.com',
    quote: '"People make the competitive difference."',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
  },
  {
    name: 'Sarah Mitchell',
    title: 'Senior Recruiter',
    org: 'BNI Global',
    bio: 'Sarah has been with BNI for 5 years, specializing in operations and marketing roles across North America and Europe.',
    location: 'New York, NY',
    email: 'sarahm@bni.com',
    quote: '"Great teams build great organizations."',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
  },
  {
    name: 'David Chen',
    title: 'Talent Acquisition Specialist',
    org: 'BNI APAC',
    bio: 'David focuses on recruitment for the Asia-Pacific region, bringing a deep understanding of local markets and talent pools.',
    location: 'Singapore',
    email: 'davidc@bni.com',
    quote: '"Connecting talent with purpose is my passion."',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    linkedin: '#',
  },
];

const CORE_VALUES = [
  {
    name: 'Givers Gain®',
    description: 'Be willing to give first, before you expect to gain. Giving unconditionally creates a better world for everyone and creates important opportunities and lasting relationships.',
    icon: '🤝',
  },
  { name: 'Lifelong Learning', description: 'Commit to continuous personal and professional development. Every interaction at BNI is an opportunity to grow, learn, and evolve.' },
  { name: 'Traditions + Innovation', description: 'Honor the proven methods that built BNI while embracing change and new ideas that drive us forward in a fast-moving world.' },
  { name: 'Positive Attitude', description: 'Approach challenges with optimism and enthusiasm. A positive mindset creates an environment where everyone can thrive and succeed.' },
  { name: 'Building Relationships', description: 'Invest in meaningful connections built on trust, respect, and mutual benefit. Strong relationships are the foundation of sustainable success.' },
  { name: 'Accountability', description: 'Take ownership of your commitments and results. Accountability keeps our teams aligned, motivated, and consistently performing at their best.' },
  { name: 'Recognition', description: 'Celebrate achievements, big and small. Recognizing contributions inspires excellence, builds morale, and strengthens our community.' },
];

const LIFE_AT_BNI = [
  {
    title: 'Harvard Business School Program',
    description: 'Open to all employees, this intensive 13-week program helps you develop your leadership skills and gain global exposure. Conducted by the Harvard Business School alumni, it follows the HBR case study method and is designed for continuous growth and success.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=500&h=300&fit=crop',
  },
  {
    title: 'Global Reach',
    description: 'Expand your career with our global presence in 79 countries. Join our team to collaborate with international experts, contribute to global initiatives, and make a difference across diverse communities.',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&h=300&fit=crop',
  },
  {
    title: 'Meaningful Opportunities',
    description: 'At BNI, we offer meaningful work that drives real impact. Explore opportunities for growth across multiple verticals, develop your skills, and advance your career in a dynamic, supportive environment.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=300&fit=crop',
  },
  {
    title: 'The BNI Culture',
    description: 'Success is celebrated, collaboration is encouraged, and every team member\'s talent is valued. Each day brings new challenges and rewards in a company that truly cares.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
  },
  {
    title: 'Professional Development',
    description: 'We invest heavily in our people with mentorship programs, leadership training, and cross-functional projects that accelerate your career growth.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop',
  },
];

const TESTIMONIALS = [
  {
    name: 'Courtney Burke',
    role: 'Sr. Communications Associate',
    quote: 'What makes BNI unique is the opportunity to work with people across the globe from diverse backgrounds, cultures, and experiences. It\'s inspiring to see how passionate everyone is about their work and how committed they are to supporting one another in any way they can.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Regional Operations Manager | India',
    quote: 'BNI gave me the platform to grow both personally and professionally. The culture of Givers Gain is truly lived here every single day. I\'m proud to be part of a team that\'s changing the way the world does business.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Emily Watson',
    role: 'Marketing Director | UK',
    quote: 'The collaborative spirit at BNI is unlike anywhere I\'ve worked. From brainstorming sessions to global campaigns, every voice matters and creativity is truly valued.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Marco Silva',
    role: 'IT Lead | Brazil',
    quote: 'Working at BNI means being part of something bigger. The technology challenges are exciting, and the impact we have on small businesses worldwide makes every project meaningful.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Li Wei',
    role: 'Finance Analyst | China',
    quote: 'BNI\'s commitment to lifelong learning isn\'t just a value on the wall — it\'s real. I\'ve grown more in two years here than in a decade elsewhere.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Priya Sharma',
    role: 'HR Business Partner | Singapore',
    quote: 'The diversity and inclusion at BNI is genuine. Every day I collaborate with incredible colleagues from different continents, and our differences make us stronger.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
  },
];

const LOCATIONS = [
  { name: 'All', flag: '' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Vietnam', flag: '🇻🇳' },
];

const CATEGORIES = ['All', 'Finance & Accounting', 'HR', 'IT', 'Legal', 'Marketing', 'Operations', 'Sales'];

const JOB_OPENINGS = [
  { title: 'Launch Director Consultant – Maryland', location: 'USA', category: 'Sales', link: '#' },
  { title: 'Launch Director Consultant – Denver', location: 'USA', category: 'Sales', link: '#' },
  { title: 'Regional Marketing Coordinator', location: 'UK', category: 'Marketing', link: '#' },
  { title: 'Senior Software Engineer', location: 'India', category: 'IT', link: '#' },
  { title: 'HR Business Partner – APAC', location: 'Singapore', category: 'HR', link: '#' },
  { title: 'Financial Analyst', location: 'USA', category: 'Finance & Accounting', link: '#' },
  { title: 'Chapter Success Coach – Toronto', location: 'Canada', category: 'Operations', link: '#' },
  { title: 'Legal Counsel – Europe', location: 'Netherlands', category: 'Legal', link: '#' },
  { title: 'Operations Manager – LATAM', location: 'Argentina', category: 'Operations', link: '#' },
  { title: 'Full Stack Developer', location: 'India', category: 'IT', link: '#' },
  { title: 'Content Marketing Specialist', location: 'USA', category: 'Marketing', link: '#' },
  { title: 'Sales Director – Nordics', location: 'Finland', category: 'Sales', link: '#' },
];

// ─── COMPONENT ───────────────────────────────────────────────────

export default function CareersPage() {
  // Section scroll refs
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = useCallback((section: string) => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Careers at BWN | Build Your Career With BNI</title>
        <meta name="description" content="Explore career opportunities at BNI. Join a global team and build a meaningful career with a world-class organization." />
      </Helmet>

      <HeroSection />
      <ApplicationProcessSection onNavigate={scrollToSection} />
      <div ref={(el) => { sectionRefs.current['Meet Our Recruitment Team'] = el; }}>
        <RecruitmentTeamSection />
      </div>
      <div ref={(el) => { sectionRefs.current['Core Values'] = el; }}>
        <CoreValuesSection />
      </div>
      <div ref={(el) => { sectionRefs.current['Life at BNI'] = el; }}>
        <LifeAtBNISection />
      </div>
      <div ref={(el) => { sectionRefs.current['Hear From Our People'] = el; }}>
        <HearFromOurPeopleSection />
      </div>
      <div ref={(el) => { sectionRefs.current['Current Openings'] = el; }}>
        <CurrentOpeningsSection />
      </div>
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────

function HeroSection() {
  const scrollToOpenings = () => {
    document.getElementById('current-openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white section-padding">
      <Container>
        <h1 className="mb-8 text-4xl font-bold text-dark lg:text-5xl">
          Build Your <span className="text-primary font-black">Career With BNI</span>
        </h1>
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=500&fit=crop"
            alt="BNI Legendary Awards team photo"
            className="h-[350px] w-full object-cover md:h-[450px] lg:h-[500px]"
          />
          {/* Overlay Card */}
          <div className="absolute bottom-6 right-6 max-w-sm rounded-2xl bg-dark/85 p-8 text-white backdrop-blur-sm md:bottom-10 md:right-10">
            <h2 className="mb-1 text-3xl font-bold leading-tight">
              Let's Grow<br /><span className="font-black">Together</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Welcome to BNI Global! Our BNI, Scion, and CorporateConnections® teams are continually growing, and you can be part of that success.
            </p>
            <button
              onClick={scrollToOpenings}
              className="mt-5 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
            >
              View Open Roles
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── APPLICATION PROCESS ─────────────────────────────────────────

function ApplicationProcessSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-light text-dark lg:text-5xl">
              The Application<br />
              <span className="font-black text-primary">Process</span>
            </h2>
            <p className="mt-6 max-w-md text-gray-500 leading-relaxed">
              Our interview process is designed to ensure we find the best fit for both you and our organization. It typically involves several stages, each aimed at understanding your skills, experience, and how you align with our Core Values and culture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition-all hover:border-primary hover:text-primary"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
              alt="Application process"
              className="max-h-[400px] rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── RECRUITMENT TEAM CAROUSEL ───────────────────────────────────

function RecruitmentTeamSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? RECRUITMENT_TEAM.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === RECRUITMENT_TEAM.length - 1 ? 0 : c + 1));

  const member = RECRUITMENT_TEAM[current];

  return (
    <section className="section-padding bg-light-bg">
      <Container>
        <h2 className="mb-12 text-center text-4xl font-bold text-dark">
          Meet Our <span className="text-primary">Recruitment Team</span>
        </h2>

        <div className="relative mx-auto max-w-3xl">
          {/* Nav Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary md:-left-14"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary md:-right-14"
            aria-label="Next team member"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg md:flex md:gap-8 md:p-8">
            <div className="mb-6 flex shrink-0 justify-center md:mb-0">
              <img
                src={member.image}
                alt={member.name}
                className="h-48 w-48 rounded-2xl object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary">{member.name}</h3>
              <p className="text-sm font-medium text-dark">{member.title}</p>
              <p className="text-sm text-gray-500">{member.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {member.location}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {member.email}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm italic text-primary">{member.quote}</p>
                <a href={member.linkedin} aria-label={`${member.name} LinkedIn`} className="text-blue-600 hover:text-blue-800 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── CORE VALUES ACCORDION ───────────────────────────────────────

function CoreValuesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="text-4xl font-bold text-dark">
              Core <span className="text-primary">Values</span>
            </h2>
            <p className="mt-6 max-w-md text-gray-500 leading-relaxed">
              BNI is built on a set of guiding principles which form the foundation on which Members interact, conduct themselves and fulfill their goals.
            </p>
            <h3 className="mt-12 text-2xl font-bold text-dark lg:text-3xl">
              At BNI, we're <span className="font-black">Changing the Way the World Does Business</span>®.
            </h3>

            {/* Testimonial */}
            <div className="mt-10 flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                alt="Nancy Deva Priya"
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-sm italic text-gray-500">
                  As Director of APAC Operations, I am grateful for the growth, learning, and global connections BNI has provided.
                </p>
                <p className="mt-2 text-sm font-bold text-dark">Nancy Deva Priya</p>
                <p className="text-xs font-medium text-primary">Director of APAC Operations | India</p>
              </div>
            </div>
          </div>

          {/* Right — Accordion */}
          <div className="divide-y divide-gray-200">
            {CORE_VALUES.map((value, i) => (
              <div key={value.name} className="py-5">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex w-full items-center justify-between text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className={`text-lg font-semibold ${openIndex === i ? 'text-primary' : 'text-dark'}`}>
                    {value.name}
                  </span>
                  {openIndex === i ? (
                    <Minus className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-gray-400" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="mt-3 flex items-start gap-3">
                    {value.icon && <span className="text-2xl">{value.icon}</span>}
                    <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── LIFE AT BNI CAROUSEL ────────────────────────────────────────

function LifeAtBNISection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 350;
    const gap = 24;
    const amount = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-padding bg-light-bg">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-dark">
              Life at <span className="text-primary">BNI</span>
            </h2>
            <p className="mt-2 text-lg text-gray-500">Why work for a <span className="font-bold">global leader</span></p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-primary hover:text-primary"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors hover:border-primary hover:text-primary"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LIFE_AT_BNI.map((item) => (
            <div
              key={item.title}
              className="w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg md:w-[370px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="flex items-start gap-2 text-lg font-bold text-dark">
                  <span className="mt-1 inline-block h-3 w-3 shrink-0 rotate-45 bg-primary" />
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── HEAR FROM OUR PEOPLE ────────────────────────────────────────

function HearFromOurPeopleSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-white">
      <Container>
        <h2 className="mb-12 text-center text-4xl font-bold text-dark">
          Hear From <span className="text-primary">Our People</span>
        </h2>

        {/* Avatar Row */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveIndex(i)}
              className={`overflow-hidden rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'h-20 w-20 ring-4 ring-primary shadow-lg scale-110'
                  : 'h-12 w-12 opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
              }`}
              aria-label={`View testimonial from ${t.name}`}
            >
              <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-2xl bg-white p-8 shadow-lg">
            <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-primary" />
            <p className="text-center text-base italic leading-relaxed text-gray-600">
              {TESTIMONIALS[activeIndex].quote}
            </p>
            <p className="mt-6 text-center text-sm font-bold text-dark">
              {TESTIMONIALS[activeIndex].name} | {TESTIMONIALS[activeIndex].role}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-3 w-3 rounded-full transition-colors ${
                i === activeIndex ? 'bg-dark' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── CURRENT OPENINGS ────────────────────────────────────────────

function CurrentOpeningsSection() {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchLocation = selectedLocation === 'All' || job.location === selectedLocation;
    const matchCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchSearch = !searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLocation && matchCategory && matchSearch;
  });

  return (
    <section id="current-openings" className="section-padding bg-white">
      <Container>
        <h2 className="text-4xl font-bold text-dark">
          Current <span className="text-primary">Openings</span>
        </h2>

        {/* Location Filters */}
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Location</h3>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setSelectedLocation(loc.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedLocation === loc.name
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {loc.flag && <span className="text-base">{loc.flag}</span>}
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Table Header */}
        <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-sm font-semibold text-gray-500">Career Summary</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Search:</span>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                placeholder="Search roles..."
              />
              <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="divide-y divide-gray-200">
          {filteredJobs.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No openings match your filters. Try adjusting your search.</p>
          ) : (
            filteredJobs.map((job, i) => (
              <div key={i} className="flex items-center justify-between py-6">
                <div>
                  <h4 className="text-lg font-semibold text-dark">{job.title}</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {job.category}
                    </span>
                  </div>
                </div>
                <a
                  href={job.link}
                  className="flex shrink-0 items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:text-primary-dark"
                >
                  View Details
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
