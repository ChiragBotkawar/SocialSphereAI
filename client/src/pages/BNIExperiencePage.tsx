import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import FindChapterCTA from '../components/home/FindChapterCTA';
import { CheckCircle } from 'lucide-react';

const EXPERIENCE_ITEMS = [
  { title: 'Weekly Meetings', description: 'Members meet weekly with a highly structured agenda to share referrals, hear member presentations, and receive business education from world-class trainers.' },
  { title: 'Referral Marketing Training', description: 'BNI provides online and in-person training programs including BNI Business Builder courses and the BNI University platform with over 200 business development courses.' },
  { title: 'BNI Connect®', description: 'Our global online platform connects all BNI members worldwide, enabling you to pass referrals, track business, and connect with other chapters beyond your local network.' },
  { title: 'Structured Accountability', description: 'Weekly attendance tracking, referral reporting, and one-to-one meetings ensure every member is accountable and actively contributing to the group.' },
  { title: 'Visitor Days', description: 'Each chapter hosts regular visitor days where local business professionals can attend as guests to experience the BNI meeting format firsthand before joining.' },
  { title: 'Regional & National Events', description: 'Quarterly regional training days, national conferences, and international events provide members with broader networking opportunities and business education.' },
];

export default function BNIExperiencePage() {
  return (
    <>
      <Helmet>
        <title>The BNI Experience | How BNI Works</title>
        <meta name="description" content="Discover how BNI works — from weekly structured meetings and referral marketing training to BNI Connect and accountability programs." />
      </Helmet>

      {/* Hero */}
      <section className="bg-dark py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">How It Works</span>
            <h1 className="mb-6 text-4xl font-black text-white lg:text-5xl">The BNI Experience</h1>
            <p className="text-lg text-gray-300">
              BNI is more than just a networking group. It's a structured business referral programme backed by world-class training, technology, and a global community.
            </p>
          </div>
        </Container>
      </section>

      {/* Features grid */}
      <section className="section-padding bg-white">
        <Container>
          <SectionTitle
            eyebrow="What to Expect"
            title="Your Membership Experience"
            subtitle="Every element of BNI membership is designed to maximise referral opportunities and business growth."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                className="card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Meeting format */}
      <section className="section-padding bg-light-bg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle eyebrow="Weekly Meeting" title="The BNI Meeting Format" centered={false} />
              <p className="mb-6 text-gray-600">
                Every BNI meeting follows a proven, structured agenda lasting approximately 90 minutes. This consistency ensures every member knows what to expect and can prepare effectively.
              </p>
              <ol className="space-y-4">
                {[
                  { time: '5 min', step: 'Open Networking' },
                  { time: '10 min', step: 'Welcome & Introductions' },
                  { time: '15 min', step: '60-Second Member Presentations' },
                  { time: '10 min', step: 'Featured Speaker Presentation' },
                  { time: '20 min', step: 'Referrals & Testimonials' },
                  { time: '10 min', step: 'One-to-Ones Scheduling' },
                  { time: '5 min', step: 'Meeting Close' },
                ].map((item) => (
                  <li key={item.step} className="flex items-center gap-4">
                    <span className="flex h-8 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {item.time}
                    </span>
                    <span className="text-sm font-medium text-dark">{item.step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
                alt="BNI meeting in progress"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <FindChapterCTA />
    </>
  );
}
