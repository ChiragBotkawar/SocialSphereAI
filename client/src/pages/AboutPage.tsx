import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckSquare,
  Lightbulb,
  Settings,
  Smile,
  Star,
  Users,
  ChevronDown,
} from 'lucide-react';
import AboutTabNav from '../components/about/AboutTabNav';
import CountUp from 'react-countup';

/* Handshake icon with circular arrows */
function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      {/* Top-right circular arrow */}
      <path d="M40 8 A32 32 0 0 1 72 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      <polygon points="68,30 76,42 66,40" fill="currentColor" />
      {/* Bottom-left circular arrow */}
      <path d="M40 72 A32 32 0 0 1 8 40" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      <polygon points="12,50 4,38 14,40" fill="currentColor" />
      {/* Handshake hands */}
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M20 46 L30 36 L38 41" />
        <path d="M60 40 L50 34 L42 39" />
        <path d="M38 41 L42 39" />
        <path d="M28 52 L36 46 L44 50 L52 44" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  { type: 'stat' as const, value: '355,000+', label: 'Global Members' },
  { type: 'image' as const, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80', alt: 'BNI event' },
  { type: 'stat' as const, value: '17.8M+', label: 'Member Referrals' },
  { type: 'image' as const, src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80', alt: 'Networking' },
  { type: 'stat' as const, value: '$26.5B+', label: 'Member Generated Business' },
  { type: 'image' as const, src: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=500&q=80', alt: 'BNI meeting' },
  { type: 'stat' as const, value: '11,600+', label: 'Global Chapters' },
  { type: 'image' as const, src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80', alt: 'Professional event' },
  { type: 'stat' as const, value: '76', label: 'Countries' },
  { type: 'image' as const, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80', alt: 'Team discussion' },
];

const MISSION_TEXT =
  'The mission of BNI is to help Members increase their business through a structured, positive and professional referral marketing program that enables them to develop long-term, meaningful relationships with quality business professionals.';

const CORE_VALUES_DATA = [
  {
    title: 'Recognition',
    description:
      'We appreciate that recognition fuels the growth of successful organizations. The person who masters the art of recognition attracts success, meaning, and happiness.',
    icon: Award,
    position: 'top-left' as const,
  },
  {
    title: 'Lifelong Learning',
    description:
      'Your value grows as you develop your knowledge and skills. Create a curriculum based on the person you want to become and follow that curriculum to get yourself there.',
    icon: BookOpen,
    position: 'top-right' as const,
  },
  {
    title: 'Accountability',
    description:
      'We keep the promises we make, especially when it is hard to do so. This creates trust and supports strong relationships.',
    icon: CheckSquare,
    position: 'mid-left' as const,
  },
  {
    title: 'Traditions + Innovation',
    description:
      'We honor our traditions and look to a brighter future fueled by innovation, optimism, and excitement.',
    icon: Lightbulb,
    position: 'mid-right' as const,
  },
  {
    title: 'Building Relationships',
    description:
      'Building strong relationships creates an environment of trust and support that yields happiness, opportunity and meaning.',
    icon: Users,
    position: 'bottom-left' as const,
  },
  {
    title: 'Positive Attitude',
    description:
      'We find the good in everything that happens to us, and that propels our lives forward. Finding the good in every person enables us to attract terrific people, opportunities, and wealth.',
    icon: Smile,
    position: 'bottom-right' as const,
  },
];

const ACCORDION_ITEMS = [
  {
    title: 'BNI\u2019s Core Values Start with Givers Gain\u00AE',
    content:
      'The altruism and goodwill we feel towards one another, and to the world, start with a genuine love of people \u2013 all people, equally. We encourage and embrace diversity in every respect.',
  },
  {
    title: 'Our Statement on Equality and Non-discrimination',
    content:
      'BNI is committed to creating an inclusive environment where all individuals, regardless of race, gender, religion, sexual orientation, or disability, are treated with dignity and respect. Our network thrives because of the diversity of thought, experience, and perspectives our members bring.',
  },
  {
    title: 'BNI Does Not Get Involved in Politics, Geopolitics, or Religion',
    content:
      'BNI is a business networking organization focused solely on helping members grow their businesses through referrals. We do not take positions on political, geopolitical, or religious matters. Our chapters are places of professional collaboration, not political or ideological discourse.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HERO + TAB NAV
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="bg-white">
      {/* Tab navigation bar */}
      <AboutTabNav />

      {/* Hero content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-[40%]"
          >
            <h1 className="text-[36px] lg:text-[44px] font-bold leading-[1.15] text-gray-500">
              Changing the Way the
              <br />
              <span className="text-[#E31837] font-bold">
                World Does Business
              </span>
              <sup className="text-[18px] lg:text-[22px]">&reg;</sup>
            </h1>
          </motion.div>

          {/* Right — description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:w-[60%]"
          >
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Founded by Dr. Ivan Misner in 1985, BNI<sup>&reg;</sup> is now the
              world&rsquo;s largest networking organization with 41 years of
              continuous growth.
            </p>
            <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">
              Over the years, hundreds of thousands of Members have unlocked
              exponential business growth through BNI and the power of referral
              marketing.
            </p>
          </motion.div>
        </div>

        {/* Large photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1560439514-4e9645039924?w=1400&q=80"
            alt="BNI global networking event"
            className="w-full h-[300px] lg:h-[450px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW BNI HELPS — with infinite marquee
   ═══════════════════════════════════════════════════════════════════════════ */
function HowBNIHelpsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-white py-16 lg:py-24">
      {/* Title + description */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-14">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="lg:w-[40%]">
            <h2 className="text-[30px] lg:text-[38px] font-bold leading-tight text-dark">
              How BNI helps
              <br />
              <span className="text-[#E31837] italic">businesses grow</span>
            </h2>
          </div>
          <div className="lg:w-[60%]">
            <p className="text-[15px] text-gray-600 leading-relaxed">
              A BNI Membership provides the environment, training and support to
              build trusted relationships. Members across the globe attend weekly
              Chapter meetings that follow a structured agenda proven to maximize
              referrals.
            </p>
            <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">
              Members take the time to learn about each other&rsquo;s businesses
              and build trust, exchanging quality referrals when opportunities
              arise. And with just one person from each profession in each
              Chapter, our Members can focus on collaboration rather than
              competition.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite scrolling marquee */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-5"
          style={{
            animation: 'scrollLeft 35s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {/* Duplicate items for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) =>
            item.type === 'stat' ? (
              <div
                key={`stat-${idx}`}
                className="flex-shrink-0 w-[260px] h-[200px] bg-[#F5F5F5] rounded-2xl flex flex-col items-center justify-center shadow-sm"
              >
                <p className="text-[36px] lg:text-[42px] font-black text-[#E31837]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-600 text-center">
                  {item.label}
                </p>
              </div>
            ) : (
              <div
                key={`img-${idx}`}
                className="flex-shrink-0 w-[260px] h-[200px] rounded-2xl overflow-hidden shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OUR MISSION — scroll-driven word-by-word color animation
   ═══════════════════════════════════════════════════════════════════════════ */
function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const words = useMemo(() => MISSION_TEXT.split(' '), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start animation when section enters viewport, complete when section center passes viewport center
      const sectionH = rect.height;
      const start = windowH; // section top hits bottom of viewport
      const end = -sectionH * 0.4; // section scrolled past center

      const current = rect.top;
      const p = 1 - (current - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-[#F9F9F9]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-[#E31837] rounded-sm" />
          <span className="text-[15px] font-medium text-dark">
            Our <span className="text-[#E31837] font-bold">Mission</span>
          </span>
        </div>

        {/* Animated text */}
        <p className="text-[28px] lg:text-[42px] font-bold leading-[1.3] lg:leading-[1.35]">
          {words.map((word, idx) => {
            // Calculate which word index the progress has reached
            const wordProgress = (idx + 1) / words.length;
            const isActive = progress >= wordProgress;

            return (
              <span
                key={idx}
                className="transition-colors duration-150"
                style={{
                  color: isActive ? '#222222' : '#D0D0D0',
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CORE VALUES — wheel/radial layout with hover interactions
   ═══════════════════════════════════════════════════════════════════════════ */
function CoreValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /* Annular sector (pie-slice ring) path builder */
  const sectorPath = (startDeg: number, endDeg: number, outerR: number, innerR: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const cx = 200, cy = 200;
    const x1 = cx + outerR * Math.cos(toRad(startDeg));
    const y1 = cy + outerR * Math.sin(toRad(startDeg));
    const x2 = cx + outerR * Math.cos(toRad(endDeg));
    const y2 = cy + outerR * Math.sin(toRad(endDeg));
    const x3 = cx + innerR * Math.cos(toRad(endDeg));
    const y3 = cy + innerR * Math.sin(toRad(endDeg));
    const x4 = cx + innerR * Math.cos(toRad(startDeg));
    const y4 = cy + innerR * Math.sin(toRad(startDeg));
    return `M${x1},${y1} A${outerR},${outerR} 0 0 1 ${x2},${y2} L${x3},${y3} A${innerR},${innerR} 0 0 0 ${x4},${y4} Z`;
  };

  /* Wheel segment data: maps each segment → CORE_VALUES_DATA index */
  const wheelSegments = [
    { start: -120, end: -60,  iconAngle: -90,  Icon: Award,       vi: 0 },
    { start: -60,  end: 0,    iconAngle: -30,  Icon: Lightbulb,   vi: 1 },
    { start: 0,    end: 60,   iconAngle: 30,   Icon: Settings,    vi: 3 },
    { start: 60,   end: 120,  iconAngle: 90,   Icon: Smile,       vi: 5 },
    { start: 120,  end: 180,  iconAngle: 150,  Icon: Users,       vi: 4 },
    { start: 180,  end: 240,  iconAngle: 210,  Icon: CheckSquare, vi: 2 },
  ];

  /* Outer connector-stub angles (at segment boundaries) */
  const stubAngles = [-120, -60, 0, 60, 120, 180];

  /* Shared wheel SVG renderer */
  const WheelSVG = ({ size, interactive = false }: { size: string; interactive?: boolean }) => (
    <svg viewBox="0 0 400 400" className={size}>
      {wheelSegments.map((seg, idx) => {
        const isHov = interactive && hoveredIndex === seg.vi;
        const iR = 135;
        const ix = 200 + iR * Math.cos((seg.iconAngle * Math.PI) / 180);
        const iy = 200 + iR * Math.sin((seg.iconAngle * Math.PI) / 180);
        return (
          <g
            key={idx}
            {...(interactive ? {
              onMouseEnter: () => setHoveredIndex(seg.vi),
              onMouseLeave: () => setHoveredIndex(null),
              style: { cursor: 'pointer' },
            } : {})}
          >
            <path
              d={sectorPath(seg.start, seg.end, 180, 82)}
              stroke="#E0E0E0"
              strokeWidth="1.5"
              style={{ fill: isHov ? '#4A4A4A' : '#F0F0F0', transition: 'fill 0.3s ease' }}
            />
            <foreignObject x={ix - 14} y={iy - 14} width="28" height="28">
              <div className="flex items-center justify-center w-full h-full">
                <seg.Icon
                  className="w-5 h-5 transition-colors duration-300"
                  style={{ color: isHov ? '#ffffff' : '#9CA3AF' }}
                />
              </div>
            </foreignObject>
          </g>
        );
      })}
      {/* Connector stubs at segment boundaries */}
      {stubAngles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 180 * Math.cos(rad);
        const y1 = 200 + 180 * Math.sin(rad);
        const x2 = 200 + 195 * Math.cos(rad);
        const y2 = 200 + 195 * Math.sin(rad);
        return (
          <g key={`stub-${angle}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C0C0C0" strokeWidth="1.5" />
            <circle cx={x2} cy={y2} r="3" fill="#B0B0B0" />
          </g>
        );
      })}
      {/* Center circle + handshake */}
      <circle cx="200" cy="200" r="72" fill="white" stroke="#E31837" strokeWidth="3" />
      <foreignObject x="155" y="155" width="90" height="90">
        <div className="flex items-center justify-center w-full h-full">
          <HandshakeIcon className="w-14 h-14 text-[#E31837]" />
        </div>
      </foreignObject>
    </svg>
  );

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* ─── Core Values intro ─── */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-16">
          <div className="lg:w-[45%]">
            <h2 className="text-[30px] lg:text-[38px] font-bold text-dark leading-tight">
              Core <span className="text-[#E31837] italic">Values</span>
            </h2>
            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed max-w-md">
              BNI is built on a set of guiding principles which form the
              foundation on which Members interact, conduct themselves and
              fulfill their goals.
            </p>
          </div>
          <div className="lg:w-[55%]">
            <p className="text-[22px] lg:text-[26px] font-semibold text-dark leading-snug">
              At BNI, we&rsquo;re{' '}
              <span className="font-bold">
                Changing the Way the World Does Business
              </span>
              <sup className="text-[12px]">&reg;</sup>.
            </p>
          </div>
        </div>

        {/* ─── Givers Gain heading — RED ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h3 className="text-[28px] lg:text-[34px] font-bold text-[#E31837]">
            Givers Gain<sup className="text-[16px]">&reg;</sup>
          </h3>
          <p className="mt-2 text-[13px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Be willing to give first, before you expect to gain. Giving
            unconditionally creates a better world for everyone and creates
            important opportunities and lasting relationships.
          </p>
        </motion.div>

        {/* ─── Vertical red gradient line → wheel ─── */}
        <div className="flex flex-col items-center">
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#f5c6ce] to-[#E31837]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E31837]" />
        </div>

        {/* ═══ Desktop: left values │ wheel │ right values ═══ */}
        <div className="hidden lg:flex items-stretch justify-center mt-4">
          {/* Left column — right-aligned text + connector toward wheel */}
          <div className="flex flex-col justify-between w-[300px] py-6">
            {[0, 2, 4].map((vi) => {
              const v = CORE_VALUES_DATA[vi];
              const active = hoveredIndex === vi;
              return (
                <div
                  key={vi}
                  className="flex items-center cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(vi)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex-1 text-right pr-3">
                    <h4
                      className={`text-[16px] font-bold transition-colors duration-300 ${
                        active ? 'text-[#E31837]' : 'text-gray-400'
                      }`}
                    >
                      {v.title}
                    </h4>
                    <p
                      className={`mt-1 text-[13px] leading-relaxed transition-colors duration-300 max-w-[240px] ml-auto ${
                        active ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {v.description}
                    </p>
                  </div>
                  {/* Connector: dot → line */}
                  <div className="flex items-center shrink-0">
                    <div
                      className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                        active ? 'bg-gray-800' : 'bg-gray-400'
                      }`}
                    />
                    <div
                      className={`w-10 h-[1.5px] transition-colors duration-300 ${
                        active ? 'bg-[#E31837]' : 'bg-gray-300'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wheel (centered vertically via flex) */}
          <div className="shrink-0 flex items-center mx-4">
            <WheelSVG size="w-[400px] h-[400px]" interactive />
          </div>

          {/* Right column — connector toward wheel + left-aligned text */}
          <div className="flex flex-col justify-between w-[300px] py-6">
            {[1, 3, 5].map((vi) => {
              const v = CORE_VALUES_DATA[vi];
              const active = hoveredIndex === vi;
              return (
                <div
                  key={vi}
                  className="flex items-center cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(vi)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Connector: line → dot */}
                  <div className="flex items-center shrink-0">
                    <div
                      className={`w-10 h-[1.5px] transition-colors duration-300 ${
                        active ? 'bg-[#E31837]' : 'bg-gray-300'
                      }`}
                    />
                    <div
                      className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                        active ? 'bg-gray-800' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1 pl-3">
                    <h4
                      className={`text-[16px] font-bold transition-colors duration-300 ${
                        active ? 'text-[#E31837]' : 'text-gray-400'
                      }`}
                    >
                      {v.title}
                    </h4>
                    <p
                      className={`mt-1 text-[13px] leading-relaxed transition-colors duration-300 max-w-[240px] ${
                        active ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ Mobile layout: wheel → stacked values ═══ */}
        <div className="lg:hidden mt-4">
          <div className="flex justify-center mb-8">
            <WheelSVG size="w-[260px] h-[260px]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            {CORE_VALUES_DATA.map((v) => (
              <div key={v.title}>
                <h4 className="text-[15px] font-bold text-[#E31837]">{v.title}</h4>
                <p className="mt-1 text-[12px] text-gray-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BEGIN YOUR BNI JOURNEY — CTA banner
   ═══════════════════════════════════════════════════════════════════════════ */
function JourneyCTA() {
  return (
    <section className="relative">
      {/* Dark red background with subtle pattern */}
      <div className="bg-[#E31837] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=60')",
            }}
          />
        </div>
        <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-white">
            Begin Your BNI Journey
          </h2>
          <p className="mt-3 text-[15px] text-white/80">
            Want to expand your business and make powerful connections? Get
            started today.
          </p>
          <Link
            to="/find-a-chapter"
            className="mt-7 inline-flex items-center gap-2 bg-white text-[#E31837] font-bold px-10 py-3.5 rounded-full text-sm tracking-wider hover:bg-gray-100 transition-colors shadow-md uppercase"
          >
            GET INVITED
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCORDION SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function AccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section className="bg-[#F9F9F9] py-16 lg:py-24">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {ACCORDION_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between py-6 text-left group"
            >
              <span
                className={`text-[16px] lg:text-[18px] font-medium transition-colors ${
                  openIndex === idx
                    ? 'text-[#E31837]'
                    : 'text-gray-700 group-hover:text-[#E31837]'
                }`}
              >
                {item.title}
              </span>
              <span className="ml-4 shrink-0">
                {openIndex === idx ? (
                  <ChevronDown className="h-5 w-5 text-[#E31837] rotate-180 transition-transform" />
                ) : (
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#E31837] transition-colors" />
                )}
              </span>
            </button>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pb-6"
              >
                <p className="text-[14px] text-gray-600 leading-relaxed max-w-4xl">
                  {item.content}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About BNI | Changing the Way the World Does Business</title>
        <meta
          name="description"
          content="Founded by Dr. Ivan Misner in 1985, BNI is the world's largest networking organization. Learn about our mission, core values, and how we help businesses grow."
        />
      </Helmet>

      <HeroSection />
      <HowBNIHelpsSection />
      <MissionSection />
      <CoreValuesSection />
      <JourneyCTA />
      <AccordionSection />
    </>
  );
}
