import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AboutTabNav from '../components/about/AboutTabNav';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const CEO = {
  name: 'Mary Kennedy Thompson',
  title: 'Chief Executive Officer',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  bio: [
    'With more than 30 years in franchising, Mary Kennedy Thompson has led businesses and franchise of all sizes. She has extensive experience in global expansion, high growth organizations, integrations, and leadership.',
    'Prior to starting at BNI® in 2024, Mary served as Chief Operating Officer at Neighborly®, the world\u2019s largest home services company, where she worked since 2006.',
    'Mary\u2019s tenure at Neighborly included roles as Executive Vice President and President of Mr. Rooter®, their largest brand.',
  ],
};

const EXECUTIVE_TEAM = [
  {
    name: 'Andrew Bender',
    title: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Elitsa Bryant',
    title: 'Associate General Counsel',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  },
  {
    name: 'Dave Collins',
    title: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Tim Cook',
    title: 'Sr. Director of Product Management',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Sarah Mitchell',
    title: 'VP of Global Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'Robert Chen',
    title: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
  {
    name: 'Jennifer Adams',
    title: 'VP of Member Experience',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80',
  },
  {
    name: 'Michael Torres',
    title: 'Sr. Director of Training',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
];

const SENATORS = [
  {
    name: 'Andy Hart',
    region: 'Ireland',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  },
  {
    name: 'Gilly Lawson',
    region: 'UK',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
  {
    name: 'Marc-William Attie',
    region: 'France',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80',
  },
  {
    name: 'Norm Dominguez',
    region: 'USA',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80',
  },
  {
    name: 'Lorena Rodriguez',
    region: 'Mexico',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
  },
  {
    name: 'Hiroshi Tanaka',
    region: 'Japan',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80',
  },
  {
    name: 'Priya Sharma',
    region: 'India',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
  },
  {
    name: 'Klaus Weber',
    region: 'Germany',
    image: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&q=80',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MEET OUR CEO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function MeetCEOSection() {
  const [expanded, setExpanded] = useState(false);

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
          Meet <span className="text-[#E31837] font-bold">Our CEO</span>
        </motion.h2>

        {/* CEO card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col lg:flex-row items-stretch gap-0 bg-[#F5F5F5] rounded-3xl overflow-hidden"
        >
          {/* Left — Bio */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-[26px] lg:text-[32px] font-bold text-[#E31837]">
              {CEO.name}
            </h3>
            <p className="text-[15px] text-gray-500 mt-1">{CEO.title}</p>

            <div className="mt-6 space-y-4">
              {CEO.bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-[15px] text-gray-700 leading-relaxed ${
                    !expanded && idx >= 2 ? 'hidden' : ''
                  }`}
                >
                  {paragraph}
                </p>
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
                src={CEO.image}
                alt={CEO.name}
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
   TEAM MEMBER CARD
   ═══════════════════════════════════════════════════════════════════════════ */
function TeamMemberCard({
  name,
  title,
  image,
  delay = 0,
}: {
  name: string;
  title: string;
  image: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Gradient overlay with name/title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-20 pb-5 px-5">
        <h4 className="text-white font-bold text-[16px] leading-tight">
          {name}
        </h4>
        <p className="text-white/80 text-[13px] mt-0.5">{title}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXECUTIVE LEADERSHIP TEAM SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function ExecutiveTeamSection() {
  return (
    <section className="bg-[#F9F9F9] py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-[40%]"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-800 leading-tight">
              Executive
              <br />
              <span className="text-[#E31837]">Leadership Team</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[60%]"
          >
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Our Executive Leadership Team leads and executes BNI&rsquo;s
              vision. These are passionate individuals who help craft the plan to
              grow BNI.
            </p>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXECUTIVE_TEAM.map((member, idx) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              title={member.title}
              image={member.image}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   THE SENATORS SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function SenatorsSection() {
  return (
    <section className="bg-[#F9F9F9] py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-[40%]"
          >
            <h2 className="text-[30px] lg:text-[40px] font-bold text-gray-800 leading-tight">
              The
              <br />
              <span className="text-[#E31837]">Senators</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[60%]"
          >
            <p className="text-[15px] text-gray-600 leading-relaxed">
              One of BNI&rsquo;s Strategic Advisory Groups, the Senators are an
              elite group of long-standing, tenured BNI leaders whose passion,
              experience and expertise help drive the organization forward.
            </p>
          </motion.div>
        </div>

        {/* Senators grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SENATORS.map((member, idx) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              title={member.region}
              image={member.image}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LeadershipPage() {
  return (
    <>
      <Helmet>
        <title>Leadership | BNI</title>
        <meta
          name="description"
          content="Meet BNI's leadership team including our CEO, executive leadership, and the Senators who guide our global organization."
        />
      </Helmet>

      <AboutTabNav />
      <MeetCEOSection />
      <ExecutiveTeamSection />
      <SenatorsSection />
    </>
  );
}
