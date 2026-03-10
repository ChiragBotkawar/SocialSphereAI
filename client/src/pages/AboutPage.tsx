import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import { BNI_HISTORY } from '../utils/constants';
import FindChapterCTA from '../components/home/FindChapterCTA';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About BNI | Our Story & Mission</title>
        <meta name="description" content="Learn about BNI's history, mission, and values. Founded in 1985 by Dr. Ivan Misner, BNI is built on the philosophy of Givers Gain®." />
      </Helmet>

      {/* Hero */}
      <section className="bg-dark py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">About BNI</span>
            <h1 className="mb-6 text-4xl font-black text-white lg:text-5xl">The BNI Story</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Founded in 1985 by Dr. Ivan Misner in California, BNI has grown from a single chapter to the world's
              largest and most successful business referral organisation, with over 355,000 members worldwide.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {[
              { title: 'Our Mission', content: 'To help members increase their business through a structured, positive and professional referral marketing program that enables them to develop long-term, meaningful relationships with quality business professionals.' },
              { title: 'Our Vision', content: 'To be the most powerful networking organisation in the world, enabling millions of business professionals to build meaningful and profitable business relationships.' },
              { title: 'Givers Gain®', content: 'Our foundational philosophy: if I give business to you, you will want to give business to me. This creates a virtuous cycle of giving that has generated billions in business for members worldwide.' },
            ].map((item) => (
              <div key={item.title} className="card border-t-4 border-t-primary">
                <h3 className="mb-3 text-xl font-bold text-dark">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-light-bg">
        <Container>
          <SectionTitle eyebrow="Our History" title="Milestones That Shaped BNI" />
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2" />

            <div className="space-y-10">
              {BNI_HISTORY.map((entry, idx) => (
                <motion.div
                  key={entry.year}
                  className={`relative flex items-start gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 -translate-x-1/2 -translate-y-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md md:left-1/2">
                    {entry.year.toString().slice(2)}
                  </div>

                  <div className={`ml-12 card md:ml-0 md:w-5/12 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">{entry.year}</p>
                    <p className="text-sm text-gray-700">{entry.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FindChapterCTA />
    </>
  );
}
