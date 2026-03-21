import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, FileText, Play, Headphones } from 'lucide-react';
import Container from '../components/ui/Container';

/* ─── Media type helpers ─── */
type MediaType = 'article' | 'video' | 'podcast';

function MediaTypeIcon({ type, className }: { type: MediaType; className?: string }) {
  switch (type) {
    case 'video':
      return <Play className={className} />;
    case 'podcast':
      return <Headphones className={className} />;
    default:
      return <FileText className={className} />;
  }
}

/* ─── Dummy media items ─── */
type MediaItem = {
  id: string;
  publication: string;
  publicationLogo?: string;
  date: string;
  title: string;
  category: 'Franchising' | 'Leadership';
  mediaType: MediaType;
  link: string;
};

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm1',
    publication: 'bizwomen',
    date: 'March 2026',
    title: 'Strategies: No One Wins Alone, Not In The Marine Corps Or The C-Suite',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm2',
    publication: 'FranchiseWire',
    date: 'March 2026',
    title: 'IFA 2026 Convention Brings Franchise Leaders To Las Vegas',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm3',
    publication: 'TPF',
    date: 'August 2025',
    title: "Givers Gain: Mary Kennedy Thompson On BWN's Strategy For Business Growth",
    category: 'Franchising',
    mediaType: 'video',
    link: '#',
  },
  {
    id: 'm4',
    publication: 'iFA',
    date: 'August 2025',
    title: 'BWN Mid-Year Report: Global Network Surges As Businesses Prioritize Quality Referrals',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm5',
    publication: 'yahoo finance',
    date: 'August 2025',
    title: 'BWN Mid-Year Report: Global Network Surges As Businesses Prioritize Quality Referrals',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm6',
    publication: 'FRANCHISING Magazine USA',
    date: 'August 2025',
    title: 'Strength In Numbers: The Power Of Belonging To A Network During Economic Uncertainty',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm7',
    publication: 'Human Capital Innovators',
    date: 'July 2025',
    title: "Why Leadership Without Service Isn't Leadership At All",
    category: 'Leadership',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm8',
    publication: 'Global Franchise',
    date: 'June 2025',
    title: 'Six Ideas With Mary Kennedy Thompson',
    category: 'Franchising',
    mediaType: 'article',
    link: '#',
  },
  {
    id: 'm9',
    publication: 'Franchise Today',
    date: 'June 2025',
    title: 'BWN Global CEO And IFA Chair, Mary Kennedy Thompson: Friendship, Franchising And The Power Of Networks!',
    category: 'Franchising',
    mediaType: 'podcast',
    link: '#',
  },
  {
    id: 'm10',
    publication: 'WCNC',
    date: 'May 2025',
    title: 'How This Former Marine Became A CEO Of A Charlotte-Based Company',
    category: 'Leadership',
    mediaType: 'video',
    link: '#',
  },
  {
    id: 'm11',
    publication: 'Franchising Today',
    date: 'May 2025',
    title: 'How To Build A Referral-Based Business With BWN CEO Mary Kennedy Thompson',
    category: 'Franchising',
    mediaType: 'podcast',
    link: '#',
  },
  {
    id: 'm12',
    publication: 'FW',
    date: 'May 2025',
    title: 'Brands Expanding',
    category: 'Leadership',
    mediaType: 'article',
    link: '#',
  },
];

const CATEGORIES = ['All', 'Franchising', 'Leadership'] as const;
const ITEMS_PER_LOAD = 6;

/* ─── Publication logo component (text-based for demo) ─── */
function PublicationLogo({ name }: { name: string }) {
  const styles: Record<string, { className: string; text: string }> = {
    bizwomen: { className: 'text-red-600 font-bold text-lg', text: 'bizwomen' },
    FranchiseWire: { className: 'text-gray-900 font-black text-lg', text: 'FranchiseWire' },
    TPF: { className: 'text-gray-900 font-black text-lg tracking-wider', text: 'TPF' },
    iFA: { className: 'text-blue-800 font-black text-xl italic', text: 'iFA' },
    'yahoo finance': { className: 'text-purple-700 font-black text-lg', text: 'yahoo finance' },
    'FRANCHISING Magazine USA': { className: 'text-gray-900 font-black text-sm uppercase tracking-wider', text: 'FRANCHISING' },
    'Human Capital Innovators': { className: 'text-blue-700 font-bold text-sm', text: 'Human Capital Innovators' },
    'Global Franchise': { className: 'text-gray-900 font-black text-lg', text: 'Global Franchise' },
    'Franchise Today': { className: 'text-orange-600 font-bold text-sm', text: 'Franchise Today' },
    WCNC: { className: 'text-blue-900 font-black text-lg', text: 'WCNC' },
    'Franchising Today': { className: 'text-orange-600 font-bold text-sm', text: 'Franchising Today' },
    FW: { className: 'text-gray-900 font-black text-2xl', text: 'FW.' },
  };

  const s = styles[name] || { className: 'text-gray-900 font-bold text-sm', text: name };
  return <span className={s.className}>{s.text}</span>;
}

export default function InTheMediaPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return MEDIA_ITEMS;
    return MEDIA_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <>
      <Helmet>
        <title>In The Media | BWN</title>
        <meta name="description" content="BWN has been recognized across leading business and industry publications for its long-standing contribution to business growth and professional networking." />
      </Helmet>

      {/* ── Hero Section ── */}
      <section className="bg-white py-12 lg:py-20">
        <Container>
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              {/* Rounded card wrapper */}
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
                  alt="BWN in the media — magazine feature"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '16/7' }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── In The Media Section ── */}
      <section className="bg-white pb-16 lg:pb-24">
        <Container>
          {/* Heading + description row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                In The <span className="text-primary">Media</span>
              </h1>
            </div>
            <p className="text-gray-600 text-base lg:text-lg max-w-xl leading-relaxed">
              BWN<sup>&reg;</sup> has been recognized across leading business and industry publications for its
              long-standing contribution to business growth and professional networking, reflecting its scale,
              credibility, and enduring role in helping business owners build trusted referral relationships
              and sustainable enterprises worldwide.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 min-h-[260px]"
              >
                {/* Top: logo + media type */}
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <PublicationLogo name={item.publication} />
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 shrink-0">
                      <MediaTypeIcon type={item.mediaType} className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Bottom: category + arrow */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-semibold text-primary">{item.category}</span>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 text-gray-500 group-hover:border-primary group-hover:text-primary transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-3.5 rounded-full text-sm uppercase tracking-wider transition-colors shadow-md"
              >
                Load More
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
