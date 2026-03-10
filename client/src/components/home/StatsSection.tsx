import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BNI_STATS } from '../../utils/constants';
import Container from '../ui/Container';

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-primary py-16" ref={ref}>
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {BNI_STATS.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <p className="text-3xl font-black lg:text-4xl">
                {stat.prefix}
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm font-medium text-red-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
