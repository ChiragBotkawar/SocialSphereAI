import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, Users, Globe, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/ui/Container';

/* ── Data ───────────────────────────────────────────────── */

const BENEFITS = [
  {
    title: 'Make Powerful Connections',
    description: 'Engage with like-minded businesspeople and enhance your expertise through speed networking style one-to-one meetings.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    icon: Users,
  },
  {
    title: 'Global Networking Opportunities',
    description: 'Connect with thousands of business leaders from around the world at global and national networking events.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    icon: Globe,
  },
  {
    title: 'Become a Leader in Your Community',
    description: 'Build your career through BNI with opportunities for learning and growth into leadership roles.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    icon: Award,
  },
  {
    title: 'Structured Business Growth',
    description: 'Follow a proven system of weekly meetings, referral tracking, and accountability that drives consistent business results.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    icon: Users,
  },
  {
    title: 'Exclusive Professional Seat',
    description: 'Only one member per profession per chapter ensures no internal competition — your specialty is yours alone.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: Award,
  },
  {
    title: 'World-Class Training',
    description: 'Access BNI University with 200+ courses, business builder programs, and regional conferences to sharpen your skills.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    icon: Globe,
  },
  {
    title: 'Proven Referral System',
    description: 'BNI\'s structured weekly meetings and accountability framework consistently generate qualified warm referrals.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    icon: Award,
  },
  {
    title: 'Lifelong Relationships',
    description: 'Build trusted partnerships that extend beyond business — BNI members become your allies for life.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    icon: Users,
  },
];

const TESTIMONIALS = [
  {
    name: 'Yusuf Ziya Nisanoğlu',
    country: 'Turkey',
    role: 'Ticari Gayrimenkul Uzmanı',
    quote: "Kazancımın %40'ını BNI ile elde ediyorum",
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Sarah Chen',
    country: 'Singapore',
    role: 'Digital Marketing Director',
    quote: 'BNI transformed my business within the first year — my referrals increased by 300%.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Carlos Mendez',
    country: 'Mexico',
    role: 'Arquitecto Senior',
    quote: 'Las conexiones que he hecho en BNI son invaluables para mi crecimiento profesional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Emma Thompson',
    country: 'United Kingdom',
    role: 'Financial Consultant',
    quote: 'BNI gave me the structured networking I needed to scale my consulting practice.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'Raj Patel',
    country: 'India',
    role: 'IT Solutions Provider',
    quote: 'My chapter has been the single best investment for growing my technology company.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
];

/* ── Donut Chart Component ──────────────────────────────── */

function DonutChart({ percentage }: { percentage: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="90" height="90" viewBox="0 0 90 90" className="shrink-0">
      <circle cx="45" cy="45" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="7" />
      <circle
        cx="45" cy="45" r={radius} fill="none"
        stroke="#E31837" strokeWidth="7"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 45 45)"
        className="transition-all duration-1000"
      />
      <text x="45" y="45" textAnchor="middle" dominantBaseline="central"
        className="fill-primary text-lg font-black"
      >
        {percentage}%
      </text>
    </svg>
  );
}

/* ── Page Component ─────────────────────────────────────── */

export default function BNIExperiencePage() {
  /* Benefits carousel */
  const [benefitIndex, setBenefitIndex] = useState(0);
  const benefitTimer = useRef<ReturnType<typeof setInterval>>();
  const visibleBenefits = 3;
  const maxBenefitIndex = BENEFITS.length - visibleBenefits;

  useEffect(() => {
    benefitTimer.current = setInterval(() => {
      setBenefitIndex((prev) => (prev >= maxBenefitIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(benefitTimer.current);
  }, [maxBenefitIndex]);

  /* Testimonials carousel */
  const [activeTestimonial, setActiveTestimonial] = useState(2);
  const testimonialTimer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    testimonialTimer.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(testimonialTimer.current);
  }, []);

  /* Video modal */
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <>
      <Helmet>
        <title>The BNI Experience | How BNI Works</title>
        <meta name="description" content="Discover the power of referrals — from weekly structured meetings and member benefits to BNI testimonials and the meeting experience." />
      </Helmet>

      {/* ── Section 1: Power of Referrals Hero ──────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-black leading-tight text-dark lg:text-5xl xl:text-[3.25rem]">
                The Power of Referrals
                <br />
                <span className="text-primary">to Transform</span>
                <br />
                <span className="text-primary">Your Business</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-gray-600 lg:text-lg max-w-lg">
                Looking for higher-converting leads? That's where referrals come in. People like to do business with those they know, like, and trust. Even in today's digital age, word-of-mouth holds the greatest power to influence purchase decisions.
              </p>
              <p className="mt-4 text-sm font-bold text-dark">
                Experience the power of referral networking in action.
              </p>
              <Link
                to="/find-a-chapter"
                className="mt-6 inline-block rounded-lg bg-primary px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-primary/30"
              >
                GET INVITED
              </Link>
            </motion.div>

            {/* Right — Image with stats overlay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                  alt="BNI members networking at an event"
                  className="w-full h-[380px] lg:h-[440px] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 right-4 lg:right-6 bg-white rounded-xl shadow-2xl px-5 py-4 flex items-center gap-4 max-w-xs"
              >
                <DonutChart percentage={82} />
                <div>
                  <p className="text-sm text-gray-700 leading-snug">
                    of small business owners get their <strong>new businesses through referrals.</strong>
                  </p>
                  <p className="mt-1 text-xs text-gray-400 italic">– Constant Contact</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Section 2: How Members Benefit ─────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Blurred background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=60"
            alt="" aria-hidden="true"
            className="w-full h-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="container-bni relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl font-black text-white lg:text-5xl mb-14"
          >
            How Members Benefit
          </motion.h2>

          {/* Carousel */}
          <div className="relative px-2">
            <div className="overflow-hidden rounded-xl">
              <motion.div
                className="flex"
                style={{ gap: '24px' }}
                animate={{ x: `calc(-${benefitIndex} * (calc(33.333% - 16px + 24px)))` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {BENEFITS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={i}
                      className="shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/15 hover:border-white/25 transition-colors duration-300"
                      style={{ width: 'calc(33.333% - 16px)', minWidth: '280px' }}
                    >
                      <div className="h-52 overflow-hidden">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-lg font-bold text-white leading-snug">{b.title}</h3>
                          <Icon className="h-7 w-7 text-white/50 shrink-0" />
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => { clearInterval(benefitTimer.current); setBenefitIndex((p) => Math.max(0, p - 1)); }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm transition-all duration-200 shadow-lg"
              aria-label="Previous benefits"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => { clearInterval(benefitTimer.current); setBenefitIndex((p) => Math.min(maxBenefitIndex, p + 1)); }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm transition-all duration-200 shadow-lg"
              aria-label="Next benefits"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-12">
            {Array.from({ length: maxBenefitIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { clearInterval(benefitTimer.current); setBenefitIndex(i); }}
                className={`rounded-full transition-all duration-300 ${i === benefitIndex ? 'bg-white w-3 h-3' : 'bg-white/40 w-2.5 h-2.5 hover:bg-white/60'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Hear from Our Members ───────────────── */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14">
            <div>
              <h2 className="text-4xl font-black text-dark lg:text-5xl">
                Hear from <span className="text-primary">Our Members</span>
              </h2>
              <p className="mt-3 text-gray-600 max-w-lg">
                Don't just take our word for it. Find out why thousands of entrepreneurs around the world attribute their business success to BNI.
              </p>
            </div>
            {/* MY BNI STORY branding */}
            <div className="shrink-0 hidden lg:block">
              <p className="text-right leading-none">
                <span className="text-[2.5rem] font-black text-dark">MY </span>
                <span className="text-[2.5rem] font-black text-primary">BN</span>
                <span className="text-[2.5rem] font-black text-primary">i</span>
                <span className="text-[1.2rem] text-primary align-super">®</span>
              </p>
              <p className="text-right leading-none -mt-1">
                <span className="text-[2.5rem] font-black text-dark tracking-wider">ST</span>
                <span className="text-[2.5rem] font-black text-primary">O</span>
                <span className="text-[2.5rem] font-black text-dark tracking-wider">RY</span>
              </p>
            </div>
          </div>

          {/* Testimonial avatars row */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 lg:gap-6 mb-12">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeTestimonial;
              const distance = Math.abs(i - activeTestimonial);
              return (
                <button
                  key={i}
                  onClick={() => { clearInterval(testimonialTimer.current); setActiveTestimonial(i); }}
                  className={`relative rounded-full overflow-hidden transition-all duration-500 ease-out ${isActive
                      ? 'w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 ring-4 ring-primary shadow-2xl z-20'
                      : distance === 1
                        ? 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 opacity-70 hover:opacity-90 z-10'
                        : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 opacity-40 hover:opacity-60'
                    }`}
                  style={{ marginBottom: isActive ? '0px' : distance === 1 ? '8px' : '16px' }}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>

          {/* Testimonial content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl bg-light-bg rounded-xl overflow-hidden shadow-sm"
            >
              {/* Red accent bar */}
              <div className="flex justify-center pt-6">
                <div className="w-20 h-1 bg-primary rounded-full" />
              </div>
              <div className="px-8 pt-5 pb-8 text-center">
                <p className="text-lg text-dark leading-relaxed">
                  {TESTIMONIALS[activeTestimonial].quote}
                </p>
                <p className="mt-6 text-primary font-bold text-base">
                  {TESTIMONIALS[activeTestimonial].name} | {TESTIMONIALS[activeTestimonial].country}
                </p>
                <p className="text-sm text-gray-500 mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { clearInterval(testimonialTimer.current); setActiveTestimonial(i); }}
                className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-dark w-3 h-3' : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section 4: Begin Your BNI Journey CTA ──────────── */}
      <section className="px-4 sm:px-8 lg:px-12 py-8">
        <div className="bg-primary rounded-2xl px-8 py-14 lg:py-20 text-center relative overflow-hidden max-w-[1200px] mx-auto">
          {/* Subtle world-map dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Faint world map silhouette */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&q=30")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white lg:text-4xl xl:text-5xl">
              Begin Your BNI Journey
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto text-base lg:text-lg">
              Want to expand your business and make powerful connections? Get started today.
            </p>
            <Link
              to="/find-a-chapter"
              className="mt-8 inline-block bg-white text-primary font-black text-sm uppercase tracking-widest px-14 py-4 rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
            >
              GET INVITED
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: BNI Meeting Experience Video ────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-dark lg:text-5xl">
              BNI Meeting <span className="text-primary">Experience</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative mx-auto max-w-3xl overflow-hidden cursor-pointer group"
            onClick={() => setVideoPlaying(true)}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80"
                alt="BNI Meeting Experience video thumbnail"
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-2xl"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Video modal */}
      {videoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setVideoPlaying(false)}
            aria-label="Close video"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full"
              title="BNI Meeting Experience Video"
            />
          </div>
        </div>
      )}
    </>
  );
}
