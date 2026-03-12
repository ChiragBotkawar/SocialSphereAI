import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Lightbulb, Star, Target, type LucideProps } from 'lucide-react';
import { CORE_VALUES } from '../../utils/constants';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Heart, Users, BookOpen, Lightbulb, Star, Target,
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function WhyBNISection() {
  return (
    <section className="section-padding bg-light-bg">
      <Container>
        <SectionTitle
          eyebrow="Why BNI"
          title="Built on a Foundation of Giving"
          subtitle="Our philosophy of Givers Gain® — what you give to others, you receive in return — has powered the growth of millions of businesses worldwide."
        />

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CORE_VALUES.map((value) => {
            const Icon = ICON_MAP[value.icon] ?? Star;
            return (
              <motion.div
                key={value.title}
                variants={item}
                className="card group relative overflow-hidden p-8 hover:shadow-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-dark leading-snug">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 pb-2">{value.description}</p>
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
