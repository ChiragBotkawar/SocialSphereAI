import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  TrendingUp,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Play,
  RefreshCw,
  ChevronDown,
  Send,
} from 'lucide-react';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import { testimonialService } from '../services/testimonialService';
import { getInitials } from '../utils/helpers';

/* ── Static featured stories for hero carousel ────────── */
const FEATURED_STORIES = [
  {
    name: 'Solange Bendlin',
    chapter: 'BR - AR Connect Virtual',
    headline: 'I am a completely different person now compared to when I first joined.',
    excerpt:
      'When I joined BWN, I was extremely shy and struggled with public speaking. The weekly 30-second presentation was my nightmare. However, I needed to grow...',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  },
  {
    name: 'Daniel Schmidt',
    chapter: 'Slovakia - Web Design Chapter',
    headline: 'BWN helped me build my freelance business into a full agency within 2 years.',
    excerpt:
      'When I first joined BWN, I was a solo web designer. Through the referrals and connections I made, I was able to grow my team and triple my revenue...',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
  },
  {
    name: 'Yusuf Ziya Nisanoğlu',
    chapter: 'Turkey - Real Estate Chapter',
    headline: "I attribute 40% of my income directly to BWN connections.",
    excerpt:
      'The structured networking format and accountability system helped me consistently generate high-quality referrals that convert into real business...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    name: 'Marek Černek',
    chapter: 'Slovakia - Conscious Living',
    headline: 'BWN fundamentally changed my life for the better.',
    excerpt:
      'I have grown both in business and on the path of self-development. The connections and the community pushed me to become a better professional and person...',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
];

/* ── Filter options ───────────────────────────────────── */
const FILTER_OPTIONS: Record<string, string[]> = {
  profession: ['Retail', 'Tailor', 'Travel Consultant', 'Web Design', 'Marketing', 'Real Estate', 'Other'],
  country: ['Australia', 'Brazil', 'Canada', 'India', 'Ireland', 'Slovakia', 'Turkey', 'Romania'],
  language: ['English', 'French', 'Japanese', 'Slovak', 'Turkish', 'Portuguese'],
};

/* ── Fallback stories when API has no data ────────────── */
interface StoryCard {
  _id: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  authorPhoto?: string | null;
  content: string;
  country?: string;
  videoUrl?: string;
}

const FALLBACK_STORIES: StoryCard[] = [
  {
    _id: 'f1',
    authorName: 'Yusuf Ziya Nisanoğlu',
    authorTitle: 'Ticari Gayrimenkul Uzmanı',
    content: "Kazancımın %40'ını BWN ile elde ediyorum. BWN bana iş hayatımda inanılmaz bir referans ağı sundu.",
    country: 'Turkey',
    authorPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    _id: 'f2',
    authorName: 'Daniel Schmidt',
    authorTitle: 'Web-design, e-learning, e-commerce',
    content: 'Do BWN som vstupoval ako čerstvý podnikateľ. Vďaka členstvu som sa v podnikaní zorientoval a postupne získaval prvé zákazky.',
    country: 'Slovakia',
    authorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    _id: 'f3',
    authorName: 'Marek Černek',
    authorTitle: 'vedomé stravovanie',
    content: 'BWN mi od základov zmenilo žovot k lepšiemu. Posunul som sa ako v podnikaní, tak aj na ceste v sebarozvoji.',
    country: 'Slovakia',
    authorPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    _id: 'f4',
    authorName: 'Andrei Aron',
    content: 'BWN has given me the platform to share my story and connect with amazing entrepreneurs worldwide.',
    country: 'Romania',
    authorPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    videoUrl: 'https://youtube.com/watch?v=example1',
  },
  {
    _id: 'f5',
    authorName: 'Monja Prole',
    authorTitle: 'biznisové stratégie',
    content: 'BWN mi dalo viac ako len profesionálnu sieť kontaktov – stalo sa pre mňa životnou filozofiou.',
    country: 'Slovakia',
    authorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    _id: 'f6',
    authorName: 'Randy Rosales',
    content: 'BWN transformed my approach to networking and helped me build lasting business relationships across Canada.',
    country: 'Canada',
    authorPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    videoUrl: 'https://youtube.com/watch?v=example2',
  },
  {
    _id: 'f7',
    authorName: 'Jana Vikrutová',
    authorTitle: 'realitná maklérka',
    content: 'V BWN som našla úžasnú komunitu podnikateľov, ktorí si navzájom pomáhajú, inšpirujú sa a spoločne rastú.',
    country: 'Slovakia',
    authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    _id: 'f8',
    authorName: 'Cindy Csordas',
    content: 'Being part of BWN has been the single best investment for growing my consulting practice in Canada.',
    country: 'Canada',
    authorPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    videoUrl: 'https://youtube.com/watch?v=example3',
  },
];

/* ── Component ────────────────────────────────────────── */

export default function SuccessStoriesPage() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials', 'all'],
    queryFn: () => testimonialService.getTestimonials({ limit: 20 }),
  });

  /* Hero carousel */
  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    heroTimer.current = setInterval(() => {
      setHeroIdx((p) => (p + 1) % FEATURED_STORIES.length);
    }, 6000);
    return () => clearInterval(heroTimer.current);
  }, []);

  const goHero = (dir: 1 | -1) => {
    clearInterval(heroTimer.current);
    setHeroIdx((p) => (p + dir + FEATURED_STORIES.length) % FEATURED_STORIES.length);
  };

  /* Filter dropdowns */
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  /* Visible count for load more */
  const [visibleCount, setVisibleCount] = useState(6);

  const story = FEATURED_STORIES[heroIdx];

  /* Split testimonials into two columns — use fallback if API empty */
  const apiStories: StoryCard[] = (testimonials ?? []).map((t) => ({
    _id: t._id,
    authorName: t.authorName,
    authorTitle: t.authorTitle,
    authorCompany: t.authorCompany,
    authorPhoto: t.authorPhoto,
    content: t.content,
    country: typeof t.country === 'object' && t.country?.name ? t.country.name : typeof t.country === 'string' ? t.country : undefined,
    videoUrl: t.videoUrl,
  }));
  const allStories = apiStories.length > 0 ? apiStories : FALLBACK_STORIES;
  const visible = allStories.slice(0, visibleCount);
  const leftCol = visible.filter((_, i) => i % 2 === 0);
  const rightCol = visible.filter((_, i) => i % 2 === 1);

  return (
    <>
      <Helmet>
        <title>BWN Success Stories | Member Testimonials</title>
        <meta
          name="description"
          content="Hear from BWN members around the world who have grown their businesses through the power of referral networking."
        />
      </Helmet>

      {/* ── Hero: Featured Story Carousel ──────────────────── */}
      <section className="relative bg-[#f3f3f3] py-16 lg:py-24 overflow-hidden">
        {/* Blurred BWN background accent */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-30">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=40"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-md"
          />
        </div>

        <Container>
          <div className="relative flex items-center">
            {/* Left arrow */}
            <button
              onClick={() => goHero(-1)}
              className="absolute -left-2 lg:-left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white/70 text-gray-500 hover:bg-white hover:text-dark transition-all shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mx-auto w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Photo */}
                  <div className="md:w-[240px] shrink-0 p-6 pb-0 md:pb-6">
                    <div className="w-48 h-48 md:w-full md:h-60 rounded-xl overflow-hidden mx-auto shadow-lg">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black text-dark leading-tight">
                        {story.headline}
                      </h2>
                      <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      {/* MY BWN STORY branding */}
                      <div className="shrink-0">
                        <p className="leading-none">
                          <span className="text-2xl font-black text-dark">MY </span>
                          <span className="text-2xl font-black text-primary">BWN</span>
                          <span className="text-xs text-primary align-super">®</span>
                        </p>
                        <p className="leading-none -mt-0.5">
                          <span className="text-2xl font-black text-dark tracking-wider">ST</span>
                          <span className="text-2xl font-black text-primary">O</span>
                          <span className="text-2xl font-black text-dark tracking-wider">RY</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-primary font-bold text-sm">{story.name}</p>
                          <p className="text-xs text-gray-400">{story.chapter}</p>
                        </div>
                        <button className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors shadow-md">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right arrow */}
            <button
              onClick={() => goHero(1)}
              className="absolute -right-2 lg:-right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white/70 text-gray-500 hover:bg-white hover:text-dark transition-all shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {FEATURED_STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(heroTimer.current);
                  setHeroIdx(i);
                }}
                className={`rounded-full transition-all duration-300 ${i === heroIdx ? 'bg-primary w-3 h-3' : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                  }`}
                aria-label={`Go to story ${i + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stats banner ──────────────────────────────────── */}
      <section className="bg-primary py-10">
        <Container>
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            {[
              { icon: TrendingUp, value: '17M+', label: 'Referrals passed annually' },
              { icon: DollarSign, value: '$26.5B+', label: 'Business generated' },
              { icon: Star, value: '355K+', label: 'Active members' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-red-200" />
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-sm text-red-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Our Stories — 3 column layout ─────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">
            {/* ── Left sidebar (sticky) ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-[260px] shrink-0 lg:sticky lg:top-28 lg:self-start"
            >
              {/* MY BWN STORY logo */}
              <div className="mb-8">
                <p className="leading-none">
                  <span className="text-[2rem] font-black text-dark">MY </span>
                  <span className="text-[2rem] font-black text-primary">BWN</span>
                  <span className="text-xs text-primary align-super">®</span>
                </p>
                <p className="leading-none -mt-0.5">
                  <span className="text-[2rem] font-black text-dark tracking-wider">ST</span>
                  <span className="text-[2rem] font-black text-primary">O</span>
                  <span className="text-[2rem] font-black text-dark tracking-wider">RY</span>
                </p>
              </div>

              <h3 className="text-2xl font-bold text-primary mb-3">Our Stories</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                BWN Members around the world create success stories every day with business growth
                created through trust and quality relationships.
              </p>

              {/* Filters with dropdown content */}
              <div className="space-y-2 mb-5">
                {(['profession', 'country', 'language'] as const).map((key) => (
                  <div key={key}>
                    <button
                      onClick={() => setOpenFilter(openFilter === key ? null : key)}
                      className="flex items-center justify-between w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      <span className="capitalize">{key}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openFilter === key ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFilter === key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="max-h-40 overflow-y-auto py-2 px-2 space-y-0.5">
                            {FILTER_OPTIONS[key].map((opt) => (
                              <button
                                key={opt}
                                className="block w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-1.5 text-primary text-sm font-medium hover:underline mb-6">
                <RefreshCw className="h-3.5 w-3.5" />
                RESET
              </button>

              <button className="w-full bg-primary text-white font-bold text-sm uppercase tracking-wider py-3 rounded-full hover:bg-primary-dark transition-colors shadow-md flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Submit Your Story
              </button>
            </motion.div>

            {/* ── Stories columns ────────────────────────────── */}
            {isLoading ? (
              <div className="flex-1 flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row gap-6">
                {/* Center column — text stories */}
                <div className="flex-1 flex flex-col gap-6">
                  {leftCol.map((t, i) => (
                    <motion.div
                      key={t._id || i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
                    >
                      {/* Author row at top */}
                      <div className="flex items-center gap-3 mb-5">
                        {t.authorPhoto ? (
                          <img
                            src={t.authorPhoto}
                            alt={t.authorName}
                            className="h-14 w-14 rounded-full object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shrink-0 shadow-sm">
                            {getInitials(t.authorName)}
                          </div>
                        )}
                        <div>
                          <p className="text-primary font-bold text-sm">{t.authorName}</p>
                          <p className="text-xs text-gray-500">
                            {t.authorTitle}
                            {t.authorCompany ? `, ${t.authorCompany}` : ''}
                          </p>
                          {t.country && (
                            <p className="text-xs text-gray-500">{t.country}</p>
                          )}
                        </div>
                      </div>

                      {/* Quote */}
                      <p className="text-dark font-bold text-lg leading-snug italic mb-5">
                        {t.content}
                      </p>

                      {/* READ MORE */}
                      <button className="bg-dark text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-md hover:bg-gray-800 transition-colors">
                        Read More
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Right column — mixed text + video stories */}
                <div className="flex-1 flex flex-col gap-6">
                  {rightCol.map((t, i) => {
                    const hasVideo = !!t.videoUrl;
                    return (
                      <motion.div
                        key={t._id || i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, delay: i * 0.08 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                      >
                        {hasVideo ? (
                          /* Video card */
                          <>
                            <div className="relative h-56 bg-gray-100 overflow-hidden group cursor-pointer">
                              <img
                                src={t.authorPhoto || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=60'}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40"
                                >
                                  <Play className="h-7 w-7 text-white ml-0.5" />
                                </motion.div>
                              </div>
                            </div>
                            <div className="p-5 flex items-center gap-3">
                              {t.authorPhoto ? (
                                <img
                                  src={t.authorPhoto}
                                  alt={t.authorName}
                                  className="h-12 w-12 rounded-full object-cover shadow-sm"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shrink-0 shadow-sm">
                                  {getInitials(t.authorName)}
                                </div>
                              )}
                              <div>
                                <p className="text-primary font-bold text-sm">{t.authorName}</p>
                                {t.country && (
                                  <p className="text-xs text-gray-500">{t.country}</p>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Text card */
                          <div className="p-6">
                            <p className="text-dark font-bold text-lg leading-snug italic mb-5">
                              {t.content}
                            </p>
                            <div className="flex items-center gap-3 mb-5">
                              {t.authorPhoto ? (
                                <img
                                  src={t.authorPhoto}
                                  alt={t.authorName}
                                  className="h-14 w-14 rounded-full object-cover shadow-sm"
                                />
                              ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shrink-0 shadow-sm">
                                  {getInitials(t.authorName)}
                                </div>
                              )}
                              <div>
                                <p className="text-primary font-bold text-sm">{t.authorName}</p>
                                <p className="text-xs text-gray-500">
                                  {t.authorTitle}
                                  {t.authorCompany ? `, ${t.authorCompany}` : ''}
                                </p>
                                {t.country && (
                                  <p className="text-xs text-gray-500">{t.country}</p>
                                )}
                              </div>
                            </div>
                            <button className="bg-dark text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-md hover:bg-gray-800 transition-colors">
                              Read More
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Load More */}
          {!isLoading && visibleCount < allStories.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-14"
            >
              <button
                onClick={() => setVisibleCount((p) => p + 6)}
                className="flex items-center gap-2 bg-dark text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors shadow-md"
              >
                Load More
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
}