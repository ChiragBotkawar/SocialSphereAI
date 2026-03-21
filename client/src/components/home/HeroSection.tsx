import { type ReactNode, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import CountUp from 'react-countup';

// ── tiny helpers ─────────────────────────────────────────────────────────────
function StatCell({ children }: { children: ReactNode }) {
  return <div className="px-4 py-5 text-center">{children}</div>;
}
function StatValue({ children }: { children: ReactNode }) {
  return <p className="text-4xl font-black text-primary lg:text-[2.6rem]">{children}</p>;
}
function StatLabel({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-sm font-semibold text-dark">{children}</p>;
}
function StatSub({ children }: { children: ReactNode }) {
  return <p className="mt-0.5 text-[11px] text-gray-500">{children}</p>;
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-60px' });

  // Rotating words animation
  const words = ['Business', 'Network', 'Revenue'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      {/* ── Section 1: Full-width video banner (FIRST) ─────────────────── */}
      <section className="px-6 sm:px-12 lg:px-16 pt-8 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: '460px' }}
        >
          {/* Background video — add <source src="..." /> when ready */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1560439514-4e9645039924?w=1800&q=80"
          >
            {/* <source src="/videos/BWN-hero-banner.mp4" type="video/mp4" /> */}
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="relative flex min-h-[460px] flex-col justify-end px-8 sm:px-12 lg:px-16 pb-12 lg:pb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-5xl font-black text-white drop-shadow-2xl lg:text-6xl xl:text-7xl"
              >
                Grow Your{' '}
                <span className="inline-block" style={{ minWidth: '300px' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[currentWordIndex]}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="shrink-0"
              >
                <Link
                  to="/find-a-chapter"
                  className="inline-block rounded-full bg-primary px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl transition-all duration-200 hover:bg-primary-dark hover:shadow-primary/30"
                >
                  GET INVITED
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Section 2: Heading + Stats (SECOND) ────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-bni">
          {/* 4-cell grid: row1 = heading|description, row2 = video|stats — ensures same vertical level */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[42%_1fr]">

            {/* Row 1, Left: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <h2 className="text-[2.75rem] font-bold leading-tight lg:text-5xl lg:leading-tight">
                <span className="text-gray-600">Join </span>
                <span className="font-black text-primary">BWN®</span>
                <span className="text-gray-600">, the world's largest</span>
                <br />
                <span className="text-gray-600">and most successful </span>
                <span className="text-primary font-bold">referral</span>
                <br />
                <span className="text-primary font-bold">networking organization</span>
              </h2>
            </motion.div>

            {/* Row 1, Right: Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
              className="flex items-center"
            >
              <p className="text-base leading-relaxed text-dark lg:text-lg">
                Discover how BWN Members around the world meet each week locally
                to pass millions of referrals to each other worth billions of dollars
                in revenue for businesses just like yours.
              </p>
            </motion.div>

            {/* Row 2, Left: Video */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Video — add <source src="..." /> when ready */}
              <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black shadow-xl cursor-pointer">
                <video
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  loop
                  poster="https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80"
                >
                  {/* <source src="/videos/what-is-BWN.mp4" type="video/mp4" /> */}
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-200 group-hover:bg-black/40">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl"
                  >
                    <Play className="ml-1 h-7 w-7 text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Row 2, Right: Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            >

              {/* Stats Section */}
              <div ref={statsRef} className="relative rounded-2xl overflow-hidden bg-[#EBEBEB]">
                {/* 2x2 quadrant grid */}
                <div className="grid grid-cols-2 grid-rows-2">

                  {/* Top-left — gray */}
                  <div className="bg-[#EBEBEB] px-5 py-12 lg:px-8 lg:py-14 text-center">
                    <p className="text-4xl lg:text-[2.75rem] font-black text-primary leading-none">
                      {inView ? <CountUp end={355} duration={2.5} suffix="K+" /> : '0'}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-900">Global Members</p>
                    <p className="mt-1 text-xs text-gray-500">As of 31st December, 2025</p>
                  </div>

                  {/* Top-right — white */}
                  <div className="bg-white px-5 py-12 lg:px-8 lg:py-14 text-center">
                    <p className="text-4xl lg:text-[2.75rem] font-black text-primary leading-none">
                      {inView ? <CountUp end={11600} duration={2.5} separator="," suffix="+" /> : '0'}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-900">Global Chapters</p>
                  </div>

                  {/* Bottom-left — white */}
                  <div className="bg-white px-5 py-12 lg:px-8 lg:py-14 text-center">
                    <p className="text-4xl lg:text-[2.75rem] font-black text-primary leading-none">
                      {inView ? <CountUp end={76} duration={2.5} /> : '76'}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-900">Countries</p>
                  </div>

                  {/* Bottom-right — gray */}
                  <div className="bg-[#EBEBEB] px-5 py-12 lg:px-8 lg:py-14 text-center">
                    <p className="text-4xl lg:text-[2.75rem] font-black text-primary leading-none">
                      {inView ? <CountUp end={17.8} decimals={1} duration={2.5} suffix="M" /> : '0'}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-900">Member Referrals</p>
                    <p className="mt-1 text-xs text-gray-500">Last 12 Months*</p>
                  </div>
                </div>

                {/* Center floating white card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[52%] max-w-[260px]">
                  <div className="bg-white rounded-2xl shadow-lg px-5 py-7 text-center">
                    <p className="text-4xl lg:text-[2.75rem] font-black text-primary leading-none">
                      {inView ? <CountUp end={26.5} decimals={1} duration={2.5} prefix="$" suffix="B" /> : '$0B'}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-900">Member Generated Business</p>
                    <p className="mt-1 text-xs text-gray-500">Last 12 Months*</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
