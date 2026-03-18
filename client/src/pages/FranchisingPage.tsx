import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  FileText,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Linkedin,
  Youtube,
  ChevronUp,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   X / Twitter SVG icon (lucide dropped it)
   ═══════════════════════════════════════════════════════════════════════════ */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.018 2.25H8.08l4.253 5.623L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const FRANCHISEE_TESTIMONIALS = [
  {
    name: 'DIANA NINSIIMA',
    title: 'Master Franchisee of Uganda',
    quote:
      '\u201CAs a master franchisee you can build a strong community of business owners in your country\u201D',
    photo: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=200&q=80',
    videoTitle: 'BNI Master Franchise - Managing Resour...',
    videoThumb: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=640&q=80',
  },
  {
    name: 'MARCO RODRIGUEZ',
    title: 'Master Franchisee of Mexico',
    quote:
      '\u201CBNI provided me with a proven system to build and lead a powerful referral network across Latin America\u201D',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    videoTitle: 'BNI Master Franchise - Growing Your Net...',
    videoThumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=640&q=80',
  },
  {
    name: 'PRIYA SHARMA',
    title: 'Master Franchisee of India',
    quote:
      '\u201CThe global support from BNI has been instrumental in building thriving chapters across our country\u201D',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    videoTitle: 'BNI Master Franchise - Building Communi...',
    videoThumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=640&q=80',
  },
];

const WHY_FRANCHISE_CARDS = [
  {
    title: 'Grow Your Business',
    description:
      'Our proven business model is designed to help you grow BNI in your country and regions within your country in a structured and positive manner.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  },
  {
    title: 'Build Business Relationships',
    description:
      'Building a business is hard, but our trusted and experienced Master Franchisees collaborate to help make their BNI experience a rewarding one.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
  },
  {
    title: 'People Who Care',
    description:
      "At BNI, you have the power of our Global Support Team to help you grow. We\u2019re always looking for ways to help your business grow and succeed, not just today, but tomorrow and over the years to come.",
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
];

const FRAN_NAV: { label: string; children?: { label: string }[] }[] = [
  {
    label: 'How it works',
    children: [
      { label: 'Why BNI' },
      { label: 'Getting Started Process' },
      { label: 'Frequently Asked Questions' },
    ],
  },
  {
    label: 'Opportunities',
    children: [
      { label: 'Global opportunities' },
      { label: 'US Opportunities' },
    ],
  },
  {
    label: 'Support',
    children: [
      { label: 'Resources & Support' },
      { label: 'Blog' },
    ],
  },
  { label: 'Contact Us' },
  { label: 'Leadership' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FRANCHISING HEADER
   ═══════════════════════════════════════════════════════════════════════════ */
function FranchisingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Red top line accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E31837] to-[#B1122B]" />

      <div className="max-w-[1280px] mx-auto flex h-[72px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="/bni-franchising" className="flex items-center gap-2 shrink-0">
          <span className="text-[2.2rem] font-black text-[#E31837] tracking-tight leading-none">
            BNI
          </span>
          <span className="text-gray-300 text-2xl font-light">|</span>
          <span className="text-lg font-medium text-gray-600 tracking-wide">Franchising</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {FRAN_NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 text-[15px] font-normal transition-colors whitespace-nowrap ${
                  openDropdown === item.label ? 'text-[#E31837]' : 'text-gray-700 hover:text-[#E31837]'
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-2 z-50 min-w-[220px]">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {/* Red top accent line */}
                    <div className="h-[3px] bg-[#E31837] rounded-t-lg absolute top-2 left-0 right-0" />
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href="#"
                        className="block px-5 py-2.5 text-[15px] text-gray-700 hover:text-[#E31837] hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Get Started CTA */}
        <a
          href="#connect"
          className="hidden lg:inline-flex bg-[#E31837] hover:bg-[#B1122B] text-white font-bold px-7 py-2.5 rounded-full text-sm tracking-wider transition-colors shadow-md"
        >
          Get Started
        </a>

        {/* Mobile hamburger */}
        <button
          className="inline-flex lg:hidden items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 shadow-lg">
          {FRAN_NAV.map((item) => (
            <div key={item.label}>
              <button
                onClick={() =>
                  item.children
                    ? setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    : undefined
                }
                className="flex w-full items-center justify-between py-3 text-[15px] text-gray-700 hover:text-[#E31837] transition-colors border-b border-gray-50"
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileExpanded === item.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.children && mobileExpanded === item.label && (
                <div className="pl-4 border-l-2 border-[#E31837]/20 ml-2 my-1">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href="#"
                      className="block py-2 text-[14px] text-gray-600 hover:text-[#E31837] transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#connect"
            className="mt-4 block w-full text-center bg-[#E31837] text-white font-bold py-3 rounded-full text-sm"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="bg-white pt-12 pb-0 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-4">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-[45%] pt-4 lg:pt-8"
          >
            <h1 className="text-[40px] lg:text-[48px] font-bold leading-[1.15] text-dark">
              Own a Thriving BNI
              <sup className="text-[20px] lg:text-[24px]">&reg;</sup>
              <br />
              Franchise &amp;{' '}
              <span className="text-[#E31837]">
                Empower Local
                <br />
                Businesses
              </span>
            </h1>
            <p className="mt-6 text-[17px] text-gray-600 leading-relaxed max-w-md">
              Build a Powerful Networking Community
              <br />
              While Growing Your Business.
            </p>
            <a
              href="#connect"
              className="mt-8 inline-flex items-center gap-2 bg-[#E31837] hover:bg-[#B1122B] text-white font-semibold px-10 py-4 rounded-full text-base transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Now <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          {/* Right — Photo collage + Badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[55%] relative min-h-[420px] lg:min-h-[480px]"
          >
            {/* Photo grid */}
            <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[420px] lg:h-[480px]">
              {/* Top-left photo */}
              <div className="col-span-6 row-span-3 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80"
                  alt="BNI networking event"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Top-right photo (taller) */}
              <div className="col-span-6 row-span-4 overflow-hidden rounded-2xl shadow-lg ml-2">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80"
                  alt="Business professionals networking"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Bottom-center photo */}
              <div className="col-start-5 col-span-4 row-span-3 overflow-hidden rounded-2xl shadow-lg -mt-2">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80"
                  alt="BNI chapter meeting"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Franchise 500 Badges */}
            <div className="absolute bottom-16 left-0 flex gap-3 lg:bottom-12 lg:left-4">
              <div className="w-[80px] h-[100px] lg:w-[90px] lg:h-[110px] bg-gradient-to-b from-[#C5A84A] to-[#8B7635] rounded-lg flex flex-col items-center justify-center text-white shadow-xl border border-[#D4B84E]/60 p-1">
                <span className="text-[8px] font-bold tracking-wider uppercase">Entrepreneur</span>
                <span className="text-[11px] font-black mt-0.5">FRANCHISE</span>
                <span className="text-[28px] font-black leading-none text-white">500</span>
                <span className="text-[7px] font-bold tracking-wider uppercase mt-0.5">RANKED</span>
                <span className="text-[12px] font-black">2026</span>
              </div>
              <div className="w-[80px] h-[100px] lg:w-[90px] lg:h-[110px] bg-gradient-to-b from-[#C5A84A] to-[#8B7635] rounded-lg flex flex-col items-center justify-center text-white shadow-xl border border-[#D4B84E]/60 p-1">
                <span className="text-[8px] font-bold tracking-wider uppercase">Entrepreneur</span>
                <span className="text-[11px] font-black mt-0.5">FRANCHISE</span>
                <span className="text-[28px] font-black leading-none text-white">500</span>
                <span className="text-[6px] font-bold tracking-wider uppercase mt-0.5">#1 IN CATEGORY</span>
                <span className="text-[12px] font-black">2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Tab Bar — centered capsule */}
      <div className="mt-12 bg-[#F3F3F3] py-8 lg:py-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex justify-center">
          <div className="inline-flex items-center bg-white rounded-full shadow-md px-3 py-3 gap-2 flex-wrap justify-center">
            {/* "Get Started Here" label with right divider */}
            <span className="text-[16px] lg:text-[18px] font-semibold text-gray-500 px-5 lg:px-8 border-r border-gray-200 mr-1">
              Get Started Here
            </span>
            <a
              href="#stats"
              className="inline-flex items-center gap-2 bg-[#E31837] text-white font-semibold px-6 lg:px-8 py-3.5 rounded-full text-[14px] hover:bg-[#B1122B] transition-colors"
            >
              <Globe className="h-4 w-4" />
              Global Opportunities
            </a>
            <a
              href="#resources"
              className="inline-flex items-center gap-2 bg-[#E31837] text-white font-semibold px-6 lg:px-8 py-3.5 rounded-full text-[14px] hover:bg-[#B1122B] transition-colors"
            >
              <FileText className="h-4 w-4" />
              Resources &amp; Support
            </a>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 bg-[#E31837] text-white font-semibold px-6 lg:px-8 py-3.5 rounded-full text-[14px] hover:bg-[#B1122B] transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              Getting Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" className="bg-white py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Stats grid */}
          <div className="lg:w-[50%] w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '1.35' }}>
              {/* 2×2 grid background */}
              <div className="grid grid-cols-2 grid-rows-2 h-full">
                {/* Top-left — lighter gray */}
                <div className="bg-[#F0F0F0] flex flex-col items-center justify-center p-6">
                  <p className="text-3xl lg:text-[2.6rem] font-black text-[#E31837]">
                    {inView ? <CountUp end={355} duration={2} separator="," /> : '0'}K+
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark text-center">Global Members</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    As of 31<sup>st</sup> December, 2025
                  </p>
                </div>
                {/* Top-right — darker gray */}
                <div className="bg-[#E4E4E4] flex flex-col items-center justify-center p-6">
                  <p className="text-3xl lg:text-[2.6rem] font-black text-[#E31837]">
                    {inView ? (
                      <CountUp end={11600} duration={2} separator="," />
                    ) : (
                      '0'
                    )}
                    +
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark text-center">Global Chapters</p>
                </div>
                {/* Bottom-left — darker gray */}
                <div className="bg-[#E4E4E4] flex flex-col items-center justify-center p-6">
                  <p className="text-3xl lg:text-[2.6rem] font-black text-[#E31837]">
                    {inView ? <CountUp end={76} duration={2} /> : '0'}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark text-center">Countries</p>
                </div>
                {/* Bottom-right — lighter gray */}
                <div className="bg-[#F0F0F0] flex flex-col items-center justify-center p-6">
                  <p className="text-3xl lg:text-[2.6rem] font-black text-[#E31837]">
                    {inView ? <CountUp end={17.8} duration={2} decimals={1} /> : '0'}M
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark text-center">Member Referrals</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">Last 12 Months*</p>
                </div>
              </div>

              {/* Center elevated card */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-xl shadow-xl px-6 py-5 lg:px-8 lg:py-6 text-center pointer-events-auto">
                  <p className="text-3xl lg:text-[2.5rem] font-black text-[#E31837]">
                    ${inView ? <CountUp end={26.5} duration={2} decimals={1} /> : '0'}B
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark">
                    Member Generated
                    <br />
                    Business
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">Last 12 Months*</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-[50%]"
          >
            <h2 className="text-[32px] lg:text-[40px] font-bold leading-tight text-dark">
              The World&rsquo;s Largest
              <br />
              and{' '}
              <span className="text-[#E31837]">
                Most Successful
                <br />
                Referral Networking
                <br />
                Franchise
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-gray-600 leading-relaxed max-w-lg">
              Why do people choose BNI<sup>&reg;</sup>? BNI is the world&rsquo;s leading referral
              networking franchise. It&rsquo;s not just our tools, our people, or our technology
              &ndash; it&rsquo;s how we have created a roadmap for your business to thrive. BNI is
              your way forward and as a Master Franchisee, it&rsquo;s like something you&rsquo;ve
              never experienced anywhere else in the world.
            </p>
            <a
              href="#why-franchise"
              className="mt-8 inline-flex items-center gap-2 bg-[#E31837] hover:bg-[#B1122B] text-white font-bold px-8 py-3.5 rounded-full text-sm tracking-wider transition-colors shadow-md uppercase"
            >
              WHY BNI <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY FRANCHISE SECTION (cards with hover effect)
   ═══════════════════════════════════════════════════════════════════════════ */
function WhyFranchiseSection() {
  return (
    <section id="why-franchise" className="bg-[#FAFAFA] py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] lg:text-[40px] font-bold text-dark">
            Why Franchise <span className="text-[#E31837]">with BNI?</span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#E31837] rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {WHY_FRANCHISE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-400 hover:shadow-2xl hover:bg-[#E31837] cursor-pointer"
            >
              {/* Image */}
              <div className="h-[220px] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Content */}
              <div className="p-7 transition-colors duration-400">
                <h3 className="text-xl font-bold text-dark group-hover:text-white transition-colors duration-400">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-400">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS SLIDER SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FRANCHISEE_TESTIMONIALS.length);
    }, 6000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const goTo = (idx: number) => {
    stopAutoplay();
    setActiveSlide(idx);
    startAutoplay();
  };

  const goPrev = () => goTo((activeSlide - 1 + FRANCHISEE_TESTIMONIALS.length) % FRANCHISEE_TESTIMONIALS.length);
  const goNext = () => goTo((activeSlide + 1) % FRANCHISEE_TESTIMONIALS.length);

  const slide = FRANCHISEE_TESTIMONIALS[activeSlide];

  return (
    <section className="bg-white py-16 lg:py-24 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Heading row */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 mb-12">
          <div className="lg:w-[45%]">
            <h2 className="text-[28px] lg:text-[36px] font-bold text-dark leading-tight">
              Hear from Some of Our
              <br />
              <span className="text-[#E31837]">Master Franchisees</span>
            </h2>
            <div className="mt-4 w-16 h-1 bg-[#E31837] rounded-full" />
          </div>
          <div className="lg:w-[55%]">
            <p className="text-[15px] text-gray-600 leading-relaxed max-w-xl">
              Many people are unsure if they should franchise. Hear why many have chosen BNI as
              their franchisor of choice and what it means to be part of the BNI family.
            </p>
          </div>
        </div>

        {/* Slider content */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative">
          {/* Left — Video placeholder */}
          <div className="lg:w-[45%] w-full">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src={slide.videoThumb}
                alt={slide.videoTitle}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              {/* BNI tv badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow">
                  <span className="text-[10px] font-black text-[#E31837] leading-none">
                    BNi
                    <br />
                    <span className="text-[7px] text-gray-600">tv</span>
                  </span>
                </div>
                <span className="text-white text-sm font-medium drop-shadow-lg">
                  {slide.videoTitle}
                </span>
              </div>
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 bg-[#E31837]/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7 ml-1">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              {/* YouTube brand */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-10">
                <Youtube className="h-5 w-5 text-red-500" />
                <span className="text-white text-xs font-medium drop-shadow-lg">YouTube</span>
              </div>
            </div>
          </div>

          {/* Right — Testimonial */}
          <div className="lg:w-[55%] w-full">
            <div className="flex flex-col items-start">
              {/* Quote mark */}
              <span className="text-[80px] lg:text-[100px] font-serif text-[#E31837]/20 leading-none -mb-6 lg:-mb-10 select-none">
                &ldquo;
              </span>
              {/* Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-gray-100 mb-5">
                <img
                  src={slide.photo}
                  alt={slide.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Quote */}
              <p className="text-[16px] lg:text-[17px] text-gray-700 leading-relaxed max-w-md">
                {slide.quote}
              </p>
              {/* Name */}
              <p className="mt-5 text-[16px] font-bold text-[#E31837] tracking-wide">
                {slide.name}
              </p>
              <p className="mt-1 text-[14px] text-gray-500">{slide.title}</p>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="hidden lg:flex absolute left-2 top-[60%] -translate-y-1/2 w-12 h-12 rounded-full bg-[#E31837]/15 hover:bg-[#E31837]/30 items-center justify-center transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-[#E31837]" />
        </button>
        <button
          onClick={goNext}
          className="hidden lg:flex absolute right-2 top-[60%] -translate-y-1/2 w-12 h-12 rounded-full bg-[#E31837]/15 hover:bg-[#E31837]/30 items-center justify-center transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-[#E31837]" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2.5 mt-8 lg:mt-10">
          {FRANCHISEE_TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeSlide
                  ? 'w-3 h-3 bg-[#333]'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESOURCES SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function ResourcesSection() {
  return (
    <section id="resources" className="bg-[#FAFAFA] py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-[50%]"
          >
            <h2 className="text-[28px] lg:text-[38px] font-bold leading-tight text-dark">
              Best-in-Class Resources
              <br />
              and Support{' '}
              <span className="italic text-[#E31837]">
                at Your
                <br />
                Fingertips
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-gray-600 leading-relaxed max-w-md">
              We offer a full suite of resources and support to help you be successful in every
              aspect of your BNI business, led by BNI Connect and BNI Business Builder.
            </p>
            <a
              href="#connect"
              className="mt-8 inline-flex items-center gap-2 border-2 border-[#E31837] text-[#E31837] font-bold px-8 py-3.5 rounded-full text-sm tracking-wider hover:bg-[#E31837] hover:text-white transition-colors uppercase"
            >
              RESOURCES &amp; SUPPORT <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-[50%] w-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                alt="BNI resources and support"
                className="w-full h-[320px] lg:h-[380px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA SECTION (full-width background + red card)
   ═══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section id="connect" className="relative">
      {/* Background image */}
      <div
        className="h-[500px] lg:h-[520px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Red card overlay */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 relative -mt-36">
        <div className="bg-[#E31837] rounded-xl shadow-2xl px-8 py-10 lg:px-14 lg:py-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Left text */}
          <div className="lg:w-[50%] lg:border-r lg:border-white/30 lg:pr-10">
            <h3 className="text-[24px] lg:text-[30px] font-bold text-white leading-tight">
              Is a BNI Master Franchise
              <br />
              for You?
            </h3>
            <p className="mt-3 text-[15px] text-white/80">
              Let&rsquo;s talk about it so we can provide you with some useful information.
            </p>
          </div>
          {/* Right CTA */}
          <div className="lg:w-[50%] lg:pl-10">
            <p className="text-[17px] font-semibold text-white">
              email: franchise@bni.com
            </p>
            <a
              href="mailto:franchise@bni.com"
              className="mt-5 inline-flex items-center gap-2 bg-white text-[#E31837] font-bold px-8 py-3.5 rounded-full text-sm tracking-wider hover:bg-gray-100 transition-colors shadow-md uppercase"
            >
              LET&rsquo;S CONNECT <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FRANCHISING FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
function FranchisingFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="bg-[#E31837] text-white mt-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Column 1 — Contact */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">CONTACT</h4>
              <div className="text-[14px] text-white/85 leading-relaxed">
                <p>3430 Toringdon Way,</p>
                <p>Suite 300 Charlotte,</p>
                <p>NC 28277,</p>
                <p>United States</p>
              </div>
            </div>

            {/* Column 2 — Franchise Info */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
                FOR FRANCHISE
                <br />
                INFORMATION CONTACT:
              </h4>
              <p className="text-[14px] text-white/85 mb-4">franchise@bni.com</p>
              <a
                href="mailto:franchise@bni.com"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-2.5 rounded-full text-xs tracking-wider hover:bg-white hover:text-[#E31837] transition-colors uppercase"
              >
                TALK TO US <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <p className="mt-6 text-[13px] font-semibold text-white/80">
                Connect with us on social media
              </p>
              <div className="flex items-center gap-3 mt-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Facebook, label: 'Facebook' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
                <span
                  className="w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="X (Twitter)"
                >
                  <XIcon className="h-4 w-4" />
                </span>
                <span
                  className="w-9 h-9 rounded-lg border border-white/40 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Column 3 — Pages */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase mb-5">PAGES</h4>
              <ul className="space-y-3">
                {['Cookie Policy', 'Privacy Policy', 'Terms and Conditions'].map((page) => (
                  <li key={page}>
                    <span className="text-[14px] text-white/85 hover:text-white transition-colors cursor-pointer underline underline-offset-2 decoration-white/40">
                      {page}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] text-white/60">
                &copy;2026 &ndash; BNI Global, LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gray-500/80 text-white flex items-center justify-center shadow-lg hover:bg-gray-600 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function FranchisingPage() {
  return (
    <>
      <Helmet>
        <title>BNI Franchising — Own a Thriving BNI® Franchise</title>
        <meta
          name="description"
          content="Own a thriving BNI® franchise and empower local businesses. Build a powerful networking community while growing your business. Apply now."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-white">
        <FranchisingHeader />
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <WhyFranchiseSection />
          <TestimonialsSection />
          <ResourcesSection />
          <CTASection />
        </main>
        <FranchisingFooter />
      </div>
    </>
  );
}
