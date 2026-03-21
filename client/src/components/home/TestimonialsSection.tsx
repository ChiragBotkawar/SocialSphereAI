import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '1',
    title: 'Visit a BWN chapter',
    description: 'and experience the power of the BWN network',
  },
  {
    number: '2',
    title: 'Meet the Members',
    description: 'and learn how they can help you grow your business',
  },
  {
    number: '3',
    title: 'Apply',
    description: 'to become a Member of a BWN Chapter',
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#B81C2C' }}
    >
      {/* Subtle dot-grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.13) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="container-bni relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black text-white lg:text-5xl mb-4"
        >
          3 Steps to Success
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 text-base lg:text-lg mb-16 max-w-2xl mx-auto"
        >
          Get invited to a BWN networking meeting and witness the power of referrals in action.
        </motion.p>

        {/* Steps row */}
        <div className="relative flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-0 mb-14">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-1/2 -translate-x-1/2 w-[54%] h-px bg-white/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center flex-1 max-w-[240px] mx-auto"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.13 }}
            >
              {/* Number circle */}
              <div
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5 shadow-md"
              >
                <span
                  className="text-2xl font-black"
                  style={{ color: '#B81C2C' }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/find-a-chapter"
            className="inline-block bg-white font-black text-sm uppercase tracking-widest px-12 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            style={{ color: '#B81C2C' }}
          >
            GET INVITED
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

