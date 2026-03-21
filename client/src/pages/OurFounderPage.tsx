import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AboutTabNav from '../components/about/AboutTabNav';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const FOUNDER = {
  name: 'Dr. Ivan Misner',
  title: 'Founder & Chief Visionary Officer',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
  bio: [
    'Dr. Ivan Misner is the Founder & Chief Visionary Officer of BWN\u00AE, the world\u2019s largest business networking organization. Founded in 1985, the organization now has over 11,700+ chapters in 76 countries throughout every populated continent of the world. Last year alone, BWN generated 17.8 million referrals resulting in more than $26.7 billion USD worth of business for its members.',
    'Called the "Father of Modern Networking" by CNN and one of the "Top Networking Experts to Watch" by Forbes, Dr. Misner is considered one of the world\u2019s leading experts on business networking and has been a keynote speaker for major corporations and associations throughout the world.',
    'He has been a columnist for Entrepreneur.com and has written over 27 books including his newest \u2013 Infinite Giving, The 7 Principles of Givers Gain\u00AE and his New York Times bestseller, Masters of Networking.',
    'He has been the recipient of the John C. Maxwell Transformational Leadership Award. He is the Co-Founder of the BWN Charitable Foundation and is married to Jody Misner. <strong>Oh, and in his spare time!!!</strong> he is also an amateur magician and a black belt in karate.',
  ],
};

const MARQUEE_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80', alt: 'BWN conference event' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80', alt: 'Networking professionals' },
  { src: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=500&q=80', alt: 'BWN chapter meeting' },
  { src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80', alt: 'Professional event' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80', alt: 'Team discussion' },
  { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80', alt: 'BWN global gathering' },
  { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80', alt: 'Keynote presentation' },
  { src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&q=80', alt: 'Business referrals' },
  { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80', alt: 'Global conference' },
  { src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=500&q=80', alt: 'Networking event' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MEET OUR FOUNDER SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function MeetFounderSection() {
  const [expanded, setExpanded] = useState(false);
  const visibleBio = expanded ? FOUNDER.bio : FOUNDER.bio.slice(0, 1);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[32px] lg:text-[42px] font-bold text-gray-800 mb-10"
        >
          Meet <span className="text-[#E31837] font-bold">Our Founder</span>
        </motion.h2>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col lg:flex-row items-stretch gap-0 bg-[#F5F5F5] rounded-3xl overflow-hidden"
        >
          {/* Left — Bio */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-[26px] lg:text-[32px] font-bold text-[#E31837]">
              {FOUNDER.name}<sup className="text-[14px]">&reg;</sup>
            </h3>
            <p className="text-[15px] text-gray-500 mt-1">{FOUNDER.title}</p>

            <div className="mt-6 space-y-4">
              {visibleBio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[15px] text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-[#E31837] text-[15px] font-medium hover:underline inline-flex items-center gap-1 self-start cursor-pointer"
            >
              {expanded ? 'Show less' : 'Read more...'}
            </button>
          </div>

          {/* Right — Photo */}
          <div className="lg:w-[380px] xl:w-[420px] shrink-0 flex items-end justify-end">
            <div className="w-full h-[350px] lg:h-full min-h-[400px] relative">
              <img
                src={FOUNDER.image}
                alt={FOUNDER.name}
                className="w-full h-full object-cover object-top lg:rounded-tl-3xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INFINITE SCROLLING IMAGE MARQUEE
   ═══════════════════════════════════════════════════════════════════════════ */
function ImageMarqueeSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-[#F9F9F9] py-16 lg:py-24 overflow-hidden">
      <div
        className="w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-5"
          style={{
            animation: 'scrollLeft 30s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((img, idx) => (
            <div
              key={`img-${idx}`}
              className="flex-shrink-0 w-[280px] lg:w-[320px] h-[200px] lg:h-[220px] rounded-2xl overflow-hidden shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function OurFounderPage() {
  return (
    <>
      <Helmet>
        <title>Our Founder — Dr. Ivan Misner | BWN</title>
        <meta
          name="description"
          content="Meet Dr. Ivan Misner, the Founder & Chief Visionary Officer of BWN — the world's largest business networking organization."
        />
      </Helmet>

      <AboutTabNav />
      <MeetFounderSection />
      <ImageMarqueeSection />
    </>
  );
}
