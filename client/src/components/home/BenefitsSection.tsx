import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { MEMBERSHIP_BENEFITS } from '../../utils/constants';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="BNI members networking"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-2xl font-black">$26.5B+</p>
                <p className="text-sm">Business generated annually</p>
              </div>
            </div>
          </motion.div>

          {/* Right — benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTitle
              eyebrow="Member Benefits"
              title="Everything You Need to Grow"
              subtitle="BNI membership gives you a structured, supportive network that delivers results."
              centered={false}
            />
            <ul className="space-y-4">
              {MEMBERSHIP_BENEFITS.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{benefit.title}</p>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
