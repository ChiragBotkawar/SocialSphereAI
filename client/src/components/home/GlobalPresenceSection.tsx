import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { countryService } from '../../services/countryService';

const FALLBACK_REGIONS = [
  { name: 'North America', flag: '🇺🇸', chapters: 3200 },
  { name: 'Europe', flag: '🇬🇧', chapters: 2800 },
  { name: 'Asia Pacific', flag: '🌏', chapters: 2100 },
  { name: 'India', flag: '🇮🇳', chapters: 1800 },
  { name: 'Latin America', flag: '🌎', chapters: 900 },
  { name: 'Middle East', flag: '🌍', chapters: 450 },
];

export default function GlobalPresenceSection() {
  const { data: countries } = useQuery({
    queryKey: ['countries', 'featured'],
    queryFn: () => countryService.getCountries({ featured: true, limit: 12 }),
  });

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionTitle
          eyebrow="Global Presence"
          title="BWN Around the World"
          subtitle="Operating in 76+ countries with thousands of active chapters, BWN connects business professionals globally."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {(countries?.length ? countries.slice(0, 12) : FALLBACK_REGIONS).map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {'slug' in c ? (
                <Link
                  to={`/country/${c.slug}`}
                  className="card flex flex-col items-center gap-2 p-4 text-center hover:border-primary hover:border transition-all"
                >
                  <span className="text-3xl">{c.flag}</span>
                  <p className="text-sm font-semibold text-dark">{c.name}</p>
                  {'chapterCount' in c && (
                    <p className="text-xs text-gray-500">{c.chapterCount} chapters</p>
                  )}
                </Link>
              ) : (
                <div className="card flex flex-col items-center gap-2 p-4 text-center">
                  <span className="text-3xl">{'flag' in c ? c.flag : <Globe className="h-8 w-8 text-primary" />}</span>
                  <p className="text-sm font-semibold text-dark">{c.name}</p>
                  {'chapters' in c && (
                    <p className="text-xs text-gray-500">{c.chapters.toLocaleString()} chapters</p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
