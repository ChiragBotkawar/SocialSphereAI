import { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, ArrowUpRight, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import { useBlogs, useBlogCategories } from '../hooks/useBlogs';
import { formatDate } from '../utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

/* ─────────────────────────────────────────────
   Category tabs matching the BWN site
────────────────────────────────────────────── */
const BLOG_CATEGORIES = [
  'All',
  'The BWN® Foundation',
  'News and Events',
  'Networking Tips',
  'MY BWN Story',
  'Growing your Business',
  'From the Founder',
  'Chapter Success',
];

const ITEMS_PER_PAGE = 6;

/* ─────────────────────────────────────────────
   Dummy blog images (reliable unsplash)
────────────────────────────────────────────── */
const BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80',
  'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
];

/* ─────────────────────────────────────────────
   Dummy "The Latest" featured posts
────────────────────────────────────────────── */
const DUMMY_FEATURED = [
  {
    _id: 'f1',
    slug: 'how-much-time-does-BWN-take',
    title: 'How Much Time Does BWN Take?',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'March 12, 2026',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
  },
  {
    _id: 'f2',
    slug: 'why-trust-is-the-most-valuable-growth-asset',
    title: 'Why Trust Is the Most Valuable Growth Asset You Can Build',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'March 09, 2026',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
  },
  {
    _id: 'f3',
    slug: 'why-relationships-still-drive-business-growth',
    title: 'Why Relationships Still Drive Business Growth Around the World',
    category: 'Growing your Business',
    author: 'BWN Global',
    date: 'February 23, 2026',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80',
  },
];

/* ─────────────────────────────────────────────
   Dummy blog cards
────────────────────────────────────────────── */
const DUMMY_BLOGS = [
  { _id: 'b1', slug: 'how-much-time-does-BWN-take', title: 'How Much Time Does BWN Take?', category: 'Growing your Business', author: 'BWN Global', date: 'March 12, 2026', image: BLOG_IMAGES[0] },
  { _id: 'b2', slug: 'why-trust-is-valuable-growth-asset', title: 'Why Trust Is the Most Valuable Growth Asset You Can Build', category: 'Growing your Business', author: 'BWN Global', date: 'March 09, 2026', image: BLOG_IMAGES[1] },
  { _id: 'b3', slug: 'why-relationships-drive-business', title: 'Why Relationships Still Drive Business Growth Around the World', category: 'Growing your Business', author: 'BWN Global', date: 'February 23, 2026', image: BLOG_IMAGES[2] },
  { _id: 'b4', slug: 'why-1-to-1s-are-where-relationships-take-shape', title: 'Why 1-to-1s Are Where Relationships Take Shape in BWN', category: 'Growing your Business', author: 'BWN Global', date: 'February 03, 2026', image: BLOG_IMAGES[3] },
  { _id: 'b5', slug: 'whats-BWN-anyway', title: "What's BWN, Anyway?", category: 'Growing your Business', author: 'BWN Global', date: 'January 23, 2026', image: BLOG_IMAGES[4] },
  { _id: 'b6', slug: 'power-of-referrals', title: 'The Power of Referrals in Modern Business', category: 'Networking Tips', author: 'BWN Global', date: 'January 15, 2026', image: BLOG_IMAGES[5] },
  { _id: 'b7', slug: 'building-your-network', title: 'Building Your Network: A Step-by-Step Guide', category: 'Networking Tips', author: 'BWN Global', date: 'January 08, 2026', image: BLOG_IMAGES[6] },
  { _id: 'b8', slug: 'chapter-success-stories-2025', title: 'Chapter Success Stories from 2025', category: 'Chapter Success', author: 'BWN Global', date: 'December 20, 2025', image: BLOG_IMAGES[7] },
  { _id: 'b9', slug: 'BWN-foundation-year-in-review', title: 'BWN Foundation: Year in Review', category: 'The BWN® Foundation', author: 'BWN Global', date: 'December 10, 2025', image: BLOG_IMAGES[0] },
  { _id: 'b10', slug: 'networking-tips-for-introverts', title: 'Networking Tips for Introverts', category: 'Networking Tips', author: 'BWN Global', date: 'November 28, 2025', image: BLOG_IMAGES[1] },
  { _id: 'b11', slug: 'from-the-founder-future-of-BWN', title: 'From the Founder: The Future of BWN', category: 'From the Founder', author: 'Dr. Ivan Misner', date: 'November 15, 2025', image: BLOG_IMAGES[2] },
  { _id: 'b12', slug: 'my-BWN-story-transforming-business', title: 'My BWN Story: How Networking Transformed My Business', category: 'MY BWN Story', author: 'BWN Global', date: 'November 05, 2025', image: BLOG_IMAGES[3] },
];

/* ─────────────────────────────────────────────
   Dummy press releases
────────────────────────────────────────────── */
const PRESS_RELEASES = [
  {
    id: '1',
    date: 'October 21, 2025',
    location: '',
    title: 'BWN® Names Heather McLeod as Chief Marketing Officer, Further Expanding C-Suite Strength in 2025',
  },
  {
    id: '2',
    date: 'July 29, 2025',
    location: 'Charlotte, NC',
    title: 'Prosperity Brands® Launches New Website And Publicly Debuts As A Global Family Of Franchise Brands With A Mission-Driven Focus',
  },
];

/* ─────────────────────────────────────────────
   Dummy upcoming events
────────────────────────────────────────────── */
interface DummyEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
}

const DUMMY_EVENTS: DummyEvent[] = [
  { id: 'e1', title: 'BWN UAE EXPO 2026', startDate: '2026-04-17', endDate: '2026-04-18', venue: 'Jebel Ali Convention Center', location: 'Dubai, UAE' },
  { id: 'e2', title: 'BWN JAPAN NATIONAL CONFERENCE 2026', startDate: '2026-04-28', endDate: '2026-04-30', venue: 'Tokyo Big Sight', location: 'Tokyo, Japan' },
  { id: 'e3', title: 'BWN US & CANADA NATIONAL CONFERENCE 2026', startDate: '2026-04-29', endDate: '2026-05-01', venue: 'Loews Portofino Bay Hotel', location: 'Orlando, USA' },
  { id: 'e4', title: 'BWN NETHERLANDS & BELGIUM NATIONAL CONFERENCE 2026', startDate: '2026-05-08', endDate: '2026-05-09', venue: 'BMCC', location: 'Amsterdam, Netherlands' },
  { id: 'e5', title: 'INTERNATIONAL BUSINESS MATCHING CONFERENCE (IBMC)', startDate: '2026-06-17', endDate: '2026-06-18', venue: 'NPAT, Newport World Resorts', location: 'Pasay Manila, Philippines' },
];

/* ─────────────────────────────────────────────
   Helpers
────────────────────────────────────────────── */
function groupDummyEventsByMonth(events: DummyEvent[]) {
  const groups: Record<string, DummyEvent[]> = {};
  for (const ev of events) {
    const d = new Date(ev.startDate);
    const key = `${d.toLocaleString('en-US', { month: 'long' }).toUpperCase()} ${d.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(ev);
  }
  return groups;
}

function formatDayRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const sDay = s.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const eDay = e.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const sMonth = s.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  return { sDay, eDay, sDate: s.getDate(), eDate: e.getDate(), sMonth };
}

/* ═════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [pressIdx, setPressIdx] = useState(0);
  const [latestIdx, setLatestIdx] = useState(0);

  /* Events sidebar state */
  const [eventSearch, setEventSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  /* ── Featured posts: use API data if available, else dummy ── */
  const { data: featuredData } = useBlogs({ featured: true, limit: 5 });
  const featuredFromApi = featuredData?.data ?? [];
  const featuredPosts = featuredFromApi.length > 0
    ? featuredFromApi.map((p) => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        author: typeof p.author === 'object' ? `${p.author.firstName} ${p.author.lastName}` : 'BWN Global',
        date: formatDate(p.publishedAt ?? p.createdAt, 'MMMM dd, yyyy'),
        image: p.coverImage || BLOG_IMAGES[0],
      }))
    : DUMMY_FEATURED;

  /* ── Blog posts: use API data if available, else dummy ── */
  const categoryParam = activeCategory === 'All' ? undefined : activeCategory;
  const { data, isLoading } = useBlogs({
    category: categoryParam,
    search: search || undefined,
    limit: 50,
  });

  const blogCards = useMemo(() => {
    const apiPosts = data?.data ?? [];
    if (apiPosts.length > 0) {
      return apiPosts.map((p, i) => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        author: typeof p.author === 'object' ? `${p.author.firstName} ${p.author.lastName}` : 'BWN Global',
        date: formatDate(p.publishedAt ?? p.createdAt, 'MMMM dd, yyyy'),
        image: p.coverImage || BLOG_IMAGES[i % BLOG_IMAGES.length],
      }));
    }
    /* Filter dummy data by category/search */
    let filtered = DUMMY_BLOGS;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((b) => b.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((b) => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
    }
    return filtered;
  }, [data, activeCategory, search]);

  const visiblePosts = blogCards.slice(0, visibleCount);
  const hasMore = visibleCount < blogCards.length;

  /* Load more */
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  /* Latest carousel nav */
  const totalFeatured = featuredPosts.length || 1;
  const nextLatest = () => setLatestIdx((i) => (i + 1) % totalFeatured);
  const prevLatest = () => setLatestIdx((i) => (i - 1 + totalFeatured) % totalFeatured);

  /* Press release carousel nav */
  const maxPressPages = Math.ceil(PRESS_RELEASES.length / 2);
  const nextPress = () => setPressIdx((i) => (i + 1) % maxPressPages);
  const prevPress = () => setPressIdx((i) => (i - 1 + maxPressPages) % maxPressPages);

  /* ── Upcoming Events: use API data if available, else dummy ── */
  const { data: eventsData } = useQuery({
    queryKey: ['events-sidebar', eventTypeFilter, countryFilter, eventSearch],
    queryFn: () =>
      eventService.getEvents({
        eventType: eventTypeFilter || undefined,
        country: countryFilter || undefined,
        search: eventSearch || undefined,
        limit: 20,
      }),
  });

  const eventsToRender = useMemo(() => {
    const apiEvents = eventsData?.data ?? [];
    if (apiEvents.length > 0) {
      return apiEvents.map((ev) => ({
        id: ev._id,
        title: ev.title,
        startDate: ev.startDate,
        endDate: ev.endDate,
        venue: ev.venue?.name ?? '',
        location: [ev.venue?.city, ev.venue?.country].filter(Boolean).join(', '),
      }));
    }
    /* filter dummy */
    let filtered = DUMMY_EVENTS;
    if (eventSearch) {
      const q = eventSearch.toLowerCase();
      filtered = filtered.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }
    if (locationFilter) {
      const q = locationFilter.toLowerCase();
      filtered = filtered.filter((e) => e.location.toLowerCase().includes(q));
    }
    return filtered;
  }, [eventsData, eventSearch, locationFilter]);

  const groupedEvents = groupDummyEventsByMonth(eventsToRender);

  /* Current featured post */
  const currentFeatured = featuredPosts[latestIdx] ?? featuredPosts[0];

  return (
    <>
      <Helmet>
        <title>Blog & News | BWN</title>
        <meta name="description" content="Read BWN's latest articles on business networking, referral marketing, success stories, and professional growth tips." />
      </Helmet>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — The Latest (Featured Carousel)
         ═══════════════════════════════════════════════ */}
      <section className="bg-white py-12">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark md:text-4xl">
              The <span className="text-primary">Latest</span>
            </h2>
            <div className="flex items-center gap-3">
              <button onClick={prevLatest} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={nextLatest} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Next">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Featured card */}
          {currentFeatured && (
            <Link to={`/blog/${currentFeatured.slug}`} className="group relative block overflow-hidden rounded-2xl" style={{ height: 420 }}>
              <img
                src={currentFeatured.image}
                alt={currentFeatured.title}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* BWN logo overlay top-left */}
              <div className="absolute left-6 top-6">
                <span className="text-2xl font-black text-white drop-shadow-lg tracking-tight">BWN</span>
                <span className="text-xl font-black text-white drop-shadow-lg">.</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
              {/* Content overlay — bottom right */}
              <div className="absolute bottom-6 right-6 max-w-md rounded-xl bg-dark/85 backdrop-blur-sm p-6 text-white">
                <p className="mb-2 text-sm font-semibold text-gray-300">{currentFeatured.category}</p>
                <h3 className="mb-4 text-xl font-bold leading-snug md:text-2xl">{currentFeatured.title}</h3>
                <div className="flex items-end justify-between gap-6">
                  <div className="text-sm text-gray-300">
                    <p>By {currentFeatured.author}</p>
                    <p>{currentFeatured.date}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-white uppercase tracking-wider hover:bg-primary-dark transition-colors">
                    READ MORE
                  </span>
                </div>
              </div>
            </Link>
          )}
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Blog & News Grid (full-width)
         ═══════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <Container>
          {/* Heading + filters row */}
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: title + tabs */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-dark md:text-4xl">
                Blog & <span className="text-primary">News</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Search + description */}
            <div className="shrink-0 w-full lg:w-80 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Insights and strategies that help BWN chapters thrive and achieve success
              </p>
            </div>
          </div>

          {/* Blog cards grid */}
          {isLoading && blogCards.length === 0 ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : !visiblePosts.length ? (
            <div className="py-20 text-center"><p className="text-gray-500">No articles found.</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-700 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-gray-800 transition-colors"
                  >
                    LOAD MORE
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Press Releases (left) + Upcoming Events (right)
         ═══════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ── Left: Press Releases ── */}
            <div className="flex-1 min-w-0">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-dark md:text-4xl">
                  Press <span className="text-primary">Releases</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={prevPress} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Previous">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={nextPress} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-primary hover:text-primary transition-colors" aria-label="Next">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {PRESS_RELEASES.slice(pressIdx * 2, pressIdx * 2 + 2).map((pr) => (
                  <div key={pr.id} className="rounded-2xl bg-white shadow-card overflow-hidden">
                    {/* BWN logo card */}
                    <div className="flex items-center justify-center bg-gray-50 py-12">
                      <div className="text-center">
                        <div>
                          <span className="text-5xl font-black text-primary tracking-tight">BWN</span>
                          <span className="text-4xl font-black text-primary">.</span>
                        </div>
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">P R E S S &nbsp; R E L E A S E</p>
                        <p className="mt-2 text-sm font-semibold text-primary cursor-pointer hover:underline">Read Now</p>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="p-5">
                      <p className="mb-2 text-sm font-semibold text-dark">
                        {pr.date}{pr.location ? ` | ${pr.location}` : ' |'}
                      </p>
                      <p className="mb-4 text-sm text-gray-700 leading-relaxed">{pr.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-primary underline underline-offset-2 cursor-pointer hover:text-primary-dark transition-colors">
                          READ MORE <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                        {/* PDF icon */}
                        <svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15h6" />
                          <path d="M9 11h6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Upcoming Events Sidebar ── */}
            <aside className="w-full lg:w-[340px] shrink-0">
              <h3 className="mb-4 text-2xl font-bold italic text-dark">Upcoming Events</h3>

              {/* Filter + Close toggle */}
              <div className="mb-4 flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                  aria-label="Toggle filters"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setShowFilters(false);
                    setEventTypeFilter('');
                    setCountryFilter('');
                    setLocationFilter('');
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                  aria-label="Clear filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search events */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search Events"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  className="w-full rounded-full border-2 border-gray-800 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary focus:outline-none transition-colors"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>

              {/* Expandable filters */}
              {showFilters && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <select
                    value={eventTypeFilter}
                    onChange={(e) => setEventTypeFilter(e.target.value)}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 focus:border-primary focus:outline-none"
                  >
                    <option value="">Event Type</option>
                    <option value="conference">Conference</option>
                    <option value="training">Training</option>
                    <option value="regional">Regional</option>
                    <option value="national">National</option>
                    <option value="international">International</option>
                  </select>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 focus:border-primary focus:outline-none"
                  >
                    <option value="">Country</option>
                    <option value="UAE">UAE</option>
                    <option value="Japan">Japan</option>
                    <option value="USA">USA</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Philippines">Philippines</option>
                  </select>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 focus:border-primary focus:outline-none"
                  >
                    <option value="">Event Location</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Orlando">Orlando</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="Manila">Manila</option>
                  </select>
                </div>
              )}

              {/* Events grouped by month */}
              <div className="space-y-6">
                {Object.entries(groupedEvents).map(([monthYear, events]) => (
                  <div key={monthYear}>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-dark">{monthYear}</h4>
                    <div className="space-y-3">
                      {events.map((ev) => {
                        const { sDay, eDay, sDate, eDate, sMonth } = formatDayRange(ev.startDate, ev.endDate);
                        return (
                          <div
                            key={ev.id}
                            className="rounded-xl bg-[#6B6B6B] p-4 text-white hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            {/* Date bar */}
                            <div className="mb-2 flex items-end gap-3">
                              <div className="text-center">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">{sDay}</p>
                                <p className="text-3xl font-black leading-none">{String(sDate).padStart(2, '0')}</p>
                              </div>
                              <span className="text-xl font-light text-gray-400 leading-none mb-0.5">·</span>
                              <div className="text-center">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-300">{eDay}</p>
                                <p className="text-3xl font-black leading-none">{String(eDate).padStart(2, '0')}</p>
                              </div>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-300 mb-1">{sMonth}</p>
                            </div>
                            {/* Title */}
                            <h5 className="text-sm font-bold uppercase leading-snug tracking-wide">{ev.title}</h5>
                            {ev.venue && (
                              <p className="mt-1 flex items-center gap-1 text-xs text-gray-300">
                                <span className="text-primary">●</span>
                                {ev.venue}, {ev.location}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — Newsletter (BWN SuccessNet)
         ═══════════════════════════════════════════════ */}
      <section className="bg-white py-12">
        <Container>
          <div className="text-center">
            <h3 className="text-2xl font-black text-primary">
              BWN SuccessNet<sup className="text-xs">TM</sup>
            </h3>
            <p className="mt-2 text-gray-600">Sign up for exclusive networking tips and more.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-6 flex max-w-md items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="email"
                placeholder="Email"
                required
                className="flex-1 px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-full shrink-0 items-center justify-center bg-primary px-5 py-3 text-white hover:bg-primary-dark transition-colors"
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Blog Card Component (matches BWN design)
   ═══════════════════════════════════════════════ */
interface BlogCardData {
  _id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

function BlogCard({ post }: { post: BlogCardData }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* BWN logo badge top-left */}
        <div className="absolute left-3 top-3">
          <span className="text-lg font-black text-white drop-shadow-lg tracking-tight">BWN</span>
          <span className="text-base font-black text-white drop-shadow-lg">.</span>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-sm font-semibold text-primary">{post.category}</p>
        <h3 className="mb-auto text-base font-bold leading-snug text-dark group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <div className="mt-4 flex items-end justify-between">
          <div className="text-xs text-gray-500">
            <p>By {post.author}</p>
            <p>{post.date}</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
