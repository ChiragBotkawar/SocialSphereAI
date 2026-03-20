import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AboutTabNav from '../components/about/AboutTabNav';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const REGION_TABS = ['The Americas', 'Asia Pacific', 'Europe, Middle East, and Africa'] as const;
type Region = (typeof REGION_TABS)[number];

interface Director {
  name: string;
  countries: string[];
  flags: string[];
  image: string;
}

const DIRECTORS: Record<Region, Director[]> = {
  'The Americas': [
    { name: 'Alberto Frankrajch', countries: ['Argentina'], flags: ['\u{1F1E6}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
    { name: 'Arturo Leon', countries: ['Panama'], flags: ['\u{1F1F5}\u{1F1E6}'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { name: 'Cristian Campero', countries: ['Chile'], flags: ['\u{1F1E8}\u{1F1F1}'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
    { name: 'Dr. Lisa Renz', countries: ['USA'], flags: ['\u{1F1FA}\u{1F1F8}'], image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
    { name: 'Carissa Mucci', countries: ['USA'], flags: ['\u{1F1FA}\u{1F1F8}'], image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
    { name: 'Estuardo Cruz', countries: ['Guatemala'], flags: ['\u{1F1EC}\u{1F1F9}'], image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
    { name: 'Francisco Pujol', countries: ['Per\u00FA'], flags: ['\u{1F1F5}\u{1F1EA}'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
    { name: 'Gabriel Alejandro Rojchman', countries: ['Argentina'], flags: ['\u{1F1E6}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80' },
    { name: 'Hal Corbin', countries: ['Barbados'], flags: ['\u{1F1E7}\u{1F1E7}'], image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
    { name: 'Henrique Fontenelle', countries: ['Colombia'], flags: ['\u{1F1E8}\u{1F1F4}'], image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80' },
    { name: 'Isabella Restrepo', countries: ['Ecuador'], flags: ['\u{1F1EA}\u{1F1E8}'], image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80' },
    { name: 'Jorge Mendez', countries: ['Mexico'], flags: ['\u{1F1F2}\u{1F1FD}'], image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80' },
    { name: 'Marcos Silva', countries: ['Brazil'], flags: ['\u{1F1E7}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=200&q=80' },
    { name: 'Patricia Vargas', countries: ['Costa Rica'], flags: ['\u{1F1E8}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80' },
    { name: 'Ryan O\u2019Brien', countries: ['Canada'], flags: ['\u{1F1E8}\u{1F1E6}'], image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80' },
  ],
  'Asia Pacific': [
    { name: 'Anousith Luanglath', countries: ['Laos'], flags: ['\u{1F1F1}\u{1F1E6}'], image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=200&q=80' },
    { name: 'Asato Ohno', countries: ['Japan'], flags: ['\u{1F1EF}\u{1F1F5}'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
    { name: 'Avryl Au', countries: ['Hong Kong, China and Macau', 'China', 'Thailand'], flags: ['\u{1F1ED}\u{1F1F0}', '\u{1F1E8}\u{1F1F3}', '\u{1F1F9}\u{1F1ED}'], image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80' },
    { name: 'Candy Lim', countries: ['Singapore'], flags: ['\u{1F1F8}\u{1F1EC}'], image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&q=80' },
    { name: 'Chinzorig Enktaivan', countries: ['Mongolia'], flags: ['\u{1F1F2}\u{1F1F3}'], image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
    { name: 'Christine Ho', countries: ['Vietnam'], flags: ['\u{1F1FB}\u{1F1F3}'], image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
    { name: 'Dexter Ortega', countries: ['Philippines'], flags: ['\u{1F1F5}\u{1F1ED}'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { name: 'Eddy Sugiri', countries: ['Indonesia'], flags: ['\u{1F1EE}\u{1F1E9}'], image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
    { name: 'Frederick Marcoux', countries: ['Australia'], flags: ['\u{1F1E6}\u{1F1FA}'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
    { name: 'Grace Hakim', countries: ['Indonesia'], flags: ['\u{1F1EE}\u{1F1E9}'], image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
    { name: 'Hyun-Soo Park', countries: ['South Korea'], flags: ['\u{1F1F0}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
    { name: 'Kavita Mehta', countries: ['India'], flags: ['\u{1F1EE}\u{1F1F3}'], image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80' },
    { name: 'Liam Zhang', countries: ['New Zealand'], flags: ['\u{1F1F3}\u{1F1FF}'], image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80' },
    { name: 'Michelle Tan', countries: ['Malaysia'], flags: ['\u{1F1F2}\u{1F1FE}'], image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80' },
    { name: 'Rajiv Patel', countries: ['India'], flags: ['\u{1F1EE}\u{1F1F3}'], image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80' },
  ],
  'Europe, Middle East, and Africa': [
    { name: 'Achraf BOUQDIB', countries: ['Morocco'], flags: ['\u{1F1F2}\u{1F1E6}'], image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80' },
    { name: 'Allan Nielsen', countries: ['Denmark'], flags: ['\u{1F1E9}\u{1F1F0}'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
    { name: 'Andras Avidor', countries: ['Hungary'], flags: ['\u{1F1ED}\u{1F1FA}'], image: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=200&q=80' },
    { name: 'Arunoday Ganguly', countries: ['Bahrain'], flags: ['\u{1F1E7}\u{1F1ED}'], image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
    { name: 'Anuradha Shah', countries: ['UAE'], flags: ['\u{1F1E6}\u{1F1EA}'], image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80' },
    { name: 'Ayse Aslan', countries: ['T\u00FCrkiye'], flags: ['\u{1F1F9}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&q=80' },
    { name: 'Bijay Shah', countries: ['Kenya', 'UAE', 'Uganda'], flags: ['\u{1F1F0}\u{1F1EA}', '\u{1F1E6}\u{1F1EA}', '\u{1F1FA}\u{1F1EC}'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { name: 'Bridge Adams Eshun', countries: ['Ghana'], flags: ['\u{1F1EC}\u{1F1ED}'], image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
    { name: 'Brigita Pirc', countries: ['Croatia', 'Macedonia', 'Slovenia', 'Serbia', 'New Zealand'], flags: ['\u{1F1ED}\u{1F1F7}', '\u{1F1F2}\u{1F1F0}', '\u{1F1F8}\u{1F1EE}', '\u{1F1F7}\u{1F1F8}', '\u{1F1F3}\u{1F1FF}'], image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
    { name: 'Chimaobi Agwu', countries: ['Nigeria'], flags: ['\u{1F1F3}\u{1F1EC}'], image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
    { name: 'David Kowalski', countries: ['Poland'], flags: ['\u{1F1F5}\u{1F1F1}'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
    { name: 'Elena Marchetti', countries: ['Italy'], flags: ['\u{1F1EE}\u{1F1F9}'], image: 'https://images.unsplash.com/image-1573496359142-b8d87734a5a2?w=200&q=80' },
    { name: 'Francois Dupont', countries: ['France'], flags: ['\u{1F1EB}\u{1F1F7}'], image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80' },
    { name: 'Hans Mueller', countries: ['Germany', 'Austria'], flags: ['\u{1F1E9}\u{1F1EA}', '\u{1F1E6}\u{1F1F9}'], image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80' },
    { name: 'Ingrid Svensson', countries: ['Sweden'], flags: ['\u{1F1F8}\u{1F1EA}'], image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Title + Description */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-[40%]"
          >
            <h1 className="text-[34px] lg:text-[44px] font-bold leading-tight text-gray-800 italic">
              National
              <br />
              <span className="text-[#E31837]">Directors</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-[60%]"
          >
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Our National Directors are passionate, purpose-driven leaders in
              their respective countries. Committed to creating thriving business
              communities, upholding BNI&rsquo;s Core Values and Vision, and
              helping generate business for every BNI Member. This is both a
              responsibility and a privilege.
            </p>
          </motion.div>
        </div>

        {/* Group photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80"
            alt="BNI National Directors group photo"
            className="w-full h-[280px] lg:h-[450px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DIRECTOR CARD (circular photo)
   ═══════════════════════════════════════════════════════════════════════════ */
function DirectorCard({ director, delay }: { director: Director; delay: number }) {
  const multiCountry = director.countries.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center text-center"
    >
      {/* Circular photo */}
      <div className="w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden bg-gray-100 shadow-sm mb-3">
        <img
          src={director.image}
          alt={director.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h4 className="text-[14px] lg:text-[15px] font-semibold text-gray-800 leading-snug">
        {director.name}
      </h4>

      {/* Country text */}
      <p className="text-[12px] lg:text-[13px] text-gray-500 mt-0.5 leading-snug max-w-[160px]">
        {multiCountry ? director.countries.join(', ') : director.countries[0]}
      </p>

      {/* Flag(s) */}
      <div className="flex items-center gap-1 mt-1">
        {director.flags.map((flag, idx) => (
          <span key={idx} className="text-[16px]">{flag}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DIRECTORS BY REGION SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function DirectorsByRegionSection() {
  const [activeRegion, setActiveRegion] = useState<Region>('The Americas');

  return (
    <section className="bg-[#F9F9F9] py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Region tabs */}
        <div className="flex items-center justify-center gap-8 lg:gap-14 mb-14 border-b border-gray-200 pb-0">
          {REGION_TABS.map((region) => {
            const isActive = region === activeRegion;
            return (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`relative pb-3 text-[14px] lg:text-[16px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#E31837]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {region}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E31837] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Region title */}
        <motion.h2
          key={activeRegion}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[28px] lg:text-[38px] font-bold text-[#E31837] mb-10"
        >
          {activeRegion}
        </motion.h2>

        {/* Directors grid */}
        <motion.div
          key={`grid-${activeRegion}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10"
        >
          {DIRECTORS[activeRegion].map((director, idx) => (
            <DirectorCard
              key={director.name}
              director={director}
              delay={idx * 0.04}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function NationalDirectorsPage() {
  return (
    <>
      <Helmet>
        <title>National Directors | BNI</title>
        <meta
          name="description"
          content="Meet BNI's National Directors — passionate, purpose-driven leaders committed to creating thriving business communities worldwide."
        />
      </Helmet>

      <AboutTabNav />
      <HeroSection />
      <DirectorsByRegionSection />
    </>
  );
}
