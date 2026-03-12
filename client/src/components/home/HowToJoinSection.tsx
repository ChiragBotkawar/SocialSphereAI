import { useState } from 'react';

/* ── Testimonial data ──────────────────────────────────────────────────── */
const ROW_1 = [
  {
    quote: 'BNI has been a game changer for my business.',
    name: 'Manuel Gutierrez',
    company: 'Goper Coma S.L',
    country: 'Spain',
    photo: 'https://i.pravatar.cc/80?img=11',
  },
  {
    quote: 'Friendships, connection & likeminded people make the added bonus of increased business & income worthwhile.',
    name: 'Matthew S.',
    company: 'Real Estate',
    country: 'Australia',
    photo: 'https://i.pravatar.cc/80?img=52',
  },
  {
    quote: 'Today we own a Pvt. Ltd. Firm that has achieved Rs 1.5 Cr in business within 9 months, with 95% of it coming from BNI.',
    name: 'Bhavesh Vora',
    company: 'Engineering Solutions',
    country: 'India',
    photo: 'https://i.pravatar.cc/80?img=70',
  },
  {
    quote: 'BNI has shown me how to raise the bar and push my business blueprint to new heights.',
    name: 'Farzana Ahmad',
    company: 'Business Coaching',
    country: 'UAE',
    photo: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote: 'The referrals I get through BNI account for over 60% of my annual revenue. It\'s the best investment I\'ve ever made.',
    name: 'Priya Mehta',
    company: 'Tech Ventures',
    country: 'Singapore',
    photo: 'https://i.pravatar.cc/80?img=44',
  },
  {
    quote: 'BNI opened doors I didn\'t even know existed. My network grew threefold in just one year.',
    name: 'Carlos Rivera',
    company: 'Consulting Group',
    country: 'Mexico',
    photo: 'https://i.pravatar.cc/80?img=15',
  },
];

const ROW_2 = [
  {
    quote: 'I highly recommend BNI to every person who is looking to multiply their business connections.',
    name: 'Jay Patel',
    company: 'Digital Services',
    country: 'USA',
    photo: 'https://i.pravatar.cc/80?img=60',
  },
  {
    quote: 'BNI expanded my business network and improved communication, boosting credibility and service quality.',
    name: 'Juliet Kim',
    company: 'Investment Capital',
    country: 'South Korea',
    photo: 'https://i.pravatar.cc/80?img=23',
  },
  {
    quote: 'There is no strategy that benefits so many areas in one\'s life than BNI!',
    name: 'Dr. Aditi Gupta',
    company: 'Healthcare Plus',
    country: 'India',
    photo: 'https://i.pravatar.cc/80?img=39',
  },
  {
    quote: 'I\'ve shifted my entire business model to one developed via referrals — all with zero competition, thanks to BNI.',
    name: 'Kurt Braun',
    company: 'Industrial Solutions',
    country: 'Germany',
    photo: 'https://i.pravatar.cc/80?img=20',
  },
  {
    quote: 'Joining BNI was the single best decision I made for my consulting firm. Revenue doubled in 18 months.',
    name: 'Maria Santos',
    company: 'Growth Consulting',
    country: 'Brazil',
    photo: 'https://i.pravatar.cc/80?img=32',
  },
  {
    quote: 'The accountability and structure of BNI meetings keep me sharp and my pipeline consistently full.',
    name: 'Sophie Laurent',
    company: 'Marketing Agency',
    country: 'France',
    photo: 'https://i.pravatar.cc/80?img=41',
  },
];

/* ── Single card ───────────────────────────────────────────────────────── */
function TestimonialCard({
  quote, name, company, country, photo,
}: (typeof ROW_1)[0]) {
  return (
    <div
      className="flex-shrink-0 w-[300px] lg:w-[340px] rounded-2xl p-6 flex flex-col justify-between"
      style={{ backgroundColor: '#8B1A25', minHeight: '220px' }}
    >
      {/* Quote */}
      <p className="text-white text-sm leading-relaxed line-clamp-4 mb-6">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={photo}
          alt={name}
          className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
          loading="lazy"
        />
        <div>
          <p className="text-white font-bold text-sm leading-tight">{name}</p>
          <p className="text-white/65 text-xs mt-0.5">{company}, {country}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Scrolling lane ────────────────────────────────────────────────────── */
function MarqueeLane({
  items,
  direction,
}: {
  items: typeof ROW_1;
  direction: 'left' | 'right';
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-5"
        style={{
          width: 'max-content',
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} 38s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((card, i) => (
          <TestimonialCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export default function HowToJoinSection() {
  return (
    <section
      className="py-16 lg:py-20 overflow-hidden"
      style={{ backgroundColor: '#B81C2C' }}
    >
      <div className="flex flex-col gap-5">
        <MarqueeLane items={ROW_1} direction="left" />
        <MarqueeLane items={ROW_2} direction="right" />
      </div>
    </section>
  );
}

