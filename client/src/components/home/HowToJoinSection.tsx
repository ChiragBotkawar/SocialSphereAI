import { motion } from 'framer-motion';
import { HOW_TO_JOIN_STEPS } from '../../utils/constants';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import { Link } from 'react-router-dom';

export default function HowToJoinSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionTitle
          eyebrow="Get Started"
          title="How to Join BNI"
          subtitle="Joining BNI is straightforward. Follow these four steps to become part of the world's largest referral network."
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-primary/20 hidden lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TO_JOIN_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {/* Step number circle */}
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-black text-white shadow-lg">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/find-a-chapter" className="btn-primary px-10 py-4 text-base">
            Start Your Journey
          </Link>
        </div>
      </Container>
    </section>
  );
}
