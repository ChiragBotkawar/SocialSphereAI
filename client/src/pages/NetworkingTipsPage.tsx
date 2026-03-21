import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ChevronDown } from 'lucide-react';
import Container from '../components/ui/Container';

/* ─── Categories sidebar ─── */
const CATEGORIES = [
  'Chapter Success',
  'From the Founder',
  'Growing your Business',
  'MY BWN Story',
  'Networking Tips',
  'News and Events',
  'The BWN® Foundation',
];

/* ─── Dummy blog data ─── */
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

const DUMMY_BLOGS: BlogPost[] = [
  {
    id: 'nt1',
    slug: 'how-building-relationships-is-a-game-changer',
    title: 'How Building Relationships is a Game Changer for Business Success in 2025',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'February 17, 2025',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
  },
  {
    id: 'nt2',
    slug: 'the-art-of-transforming-connections',
    title: 'The Art of Transforming Connections into Business Value',
    category: 'Networking Tips',
    author: 'BWN Global',
    date: 'December 10, 2024',
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80',
  },
  {
    id: 'nt3',
    slug: 'dos-and-donts-of-networking',
    title: "The Dos and Don'ts of Networking: Etiquette Tips for Success",
    category: 'Networking Tips',
    author: 'BWN Global',
    date: 'June 20, 2023',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 'nt4',
    slug: 'transformational-power-of-referrals',
    title: 'The Transformational Power of Referrals: 4 Stats Every Business Owner Should Know',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'July 04, 2024',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
  {
    id: 'nt5',
    slug: '6-proven-time-management-tips',
    title: '6 Proven Time Management Tips for BWN Success',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    id: 'nt6',
    slug: 'inviting-for-the-speaker',
    title: 'Inviting for the Speaker',
    category: 'Networking Tips',
    author: 'BWN Global',
    date: 'October 12, 2023',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
  },
  {
    id: 'nt7',
    slug: 'the-sponsoring-mindset',
    title: 'The Sponsoring Mindset',
    category: 'Networking Tips',
    author: 'BWN Global',
    date: 'March 31, 2021',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  },
  {
    id: 'nt8',
    slug: 'pure-joy-in-one-to-ones',
    title: 'Pure Joy in One-to-Ones',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'September 23, 2020',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  },
  {
    id: 'nt9',
    slug: 'building-trust-through-networking',
    title: 'Building Trust Through Consistent Networking Habits',
    category: 'Networking Tips',
    author: 'BWN Global',
    date: 'August 14, 2020',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  },
  {
    id: 'nt10',
    slug: 'maximizing-your-chapter-meetings',
    title: 'Maximizing Your Chapter Meetings for Better Results',
    category: 'Chapter Success',
    author: 'BWN Global',
    date: 'May 02, 2020',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
];

const ITEMS_PER_LOAD = 6;

/* ─── Blog Card Component ─── */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-gray-50 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* BWN logo badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-md px-2 py-1">
          <span className="text-sm font-black text-white tracking-tight">BWN</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
          {post.category}
        </span>
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">By {post.author}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Featured Card Component ─── */
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-gray-50 rounded-2xl overflow-hidden block hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image — larger */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* Content row */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {post.category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-500">By {post.author}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── CTA Sidebar Card ─── */
function CTACard() {
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80"
        alt="Power of referral networking"
        className="w-full h-32 object-cover"
      />
      <div className="p-5">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Experience the <strong>Power of referral networking</strong> in action
        </p>
        <Link
          to="/find-a-chapter"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors w-full text-center"
        >
          GET INVITED
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function NetworkingTipsPage() {
  const [activeCategory, setActiveCategory] = useState('Networking Tips');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const filtered = useMemo(() => {
    let items = DUMMY_BLOGS;
    if (activeCategory !== 'All') {
      // Show all items but prioritize the active category
      items = [...DUMMY_BLOGS];
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const visible = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <>
      <Helmet>
        <title>Networking Tips | BWN</title>
        <meta
          name="description"
          content="Read about how members grow their businesses with BWN. Expert networking tips, referral strategies, and business growth insights."
        />
      </Helmet>

      <section className="bg-[#f7f7f7] min-h-screen py-10 lg:py-14">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ── LEFT SIDEBAR ── */}
            <aside className="w-full lg:w-[280px] shrink-0">
              {/* Search */}
              <div className="relative mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h2 className="text-xl font-black text-gray-900 mb-5">Categories</h2>
                <ul className="space-y-0">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            setActiveCategory(cat);
                            setVisibleCount(ITEMS_PER_LOAD);
                          }}
                          className={`w-full text-left py-3 pl-4 text-sm transition-colors border-l-[3px] ${
                            isActive
                              ? 'border-primary text-primary font-semibold'
                              : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* CTA Card — visible only on lg+ */}
              <div className="hidden lg:block">
                <CTACard />
              </div>
            </aside>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 min-w-0">
              {/* Heading */}
              <h1 className="text-3xl lg:text-4xl font-black text-primary leading-tight mb-2">
                {activeCategory}
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Read about how members grow their businesses with BWN
              </p>

              {/* Featured Card */}
              {featured && <FeaturedCard post={featured} />}

              {/* Masonry Grid */}
              {visible.length > 0 && (
                <div className="mt-8 columns-1 md:columns-2 gap-6 space-y-6">
                  {/* CTA Card — shown as first item in flow on mobile, hidden on lg (shown in sidebar) */}
                  <div className="break-inside-avoid lg:hidden">
                    <CTACard />
                  </div>

                  {visible.map((post, idx) => (
                    <div key={post.id} className="break-inside-avoid">
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
                  >
                    LOAD MORE
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
