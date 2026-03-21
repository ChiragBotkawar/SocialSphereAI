import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, ArrowUpDown, MapPin, ChevronDown, ChevronLeft, ChevronRight, Play, Calendar as CalendarIcon } from 'lucide-react';
import Container from '../components/ui/Container';

/* ═══════════════════════════════════════════════════
   DUMMY DATA — Upcoming Events (matching the design)
   ═══════════════════════════════════════════════════ */
interface EventItem {
  id: string;
  title: string;
  venue: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  isGlobal?: boolean; // red card for Global Convention
}

const UPCOMING_EVENTS: EventItem[] = [
  { id: 'e1', title: 'BWN UAE EXPO 2026', venue: 'Jebel Ali Convention Center, Dubai, UAE', startDate: '2026-04-17', endDate: '2026-04-18' },
  { id: 'e2', title: 'BWN JAPAN NATIONAL CONFERENCE 2026', venue: 'Tokyo Big Sight', startDate: '2026-04-28', endDate: '2026-04-30' },
  { id: 'e3', title: 'BWN US & CANADA NATIONAL CONFERENCE 2026', venue: 'Loews Portofino Bay Hotel', startDate: '2026-04-29', endDate: '2026-05-01' },
  { id: 'e4', title: 'BWN NETHERLANDS & BELGIUM NATIONAL CONFERENCE 2026', venue: 'BMCC', startDate: '2026-05-08', endDate: '2026-05-09' },
  { id: 'e5', title: 'BWN SOUTH AFRICA NATIONAL CONFERENCE 2026', venue: 'Johannesburg', startDate: '2026-05-15', endDate: '2026-05-16' },
  { id: 'e6', title: 'BWN BRAZIL NATIONAL CONFERENCE 2026', venue: 'VILLA BLUE TREE - SÃO PAULO', startDate: '2026-05-20', endDate: '2026-05-23' },
  { id: 'e7', title: 'BWN AUSTRALIA NATIONAL CONFERENCE 2026', venue: 'Manly, New South Wales - Australia', startDate: '2026-05-21', endDate: '2026-05-23' },
  { id: 'e8', title: 'INTERNATIONAL BUSINESS MATCHING CONFERENCE (IBMC)', venue: 'NPAT, Newport World Resorts, Pasay Manila Philippines', startDate: '2026-06-17', endDate: '2026-06-18' },
  { id: 'e9', title: 'BWN HONG KONG INTERNATIONAL CONFERENCE 2026', venue: 'Grand Hall, 3/F, Hong Kong Convention & Exhibition Centre, Wan Chai, Hong Kong', startDate: '2026-07-08', endDate: '2026-07-09' },
  { id: 'e10', title: 'BWN COSTA RICA NATIONAL CONFERENCE 2026', venue: 'Santa Ana Country Club', startDate: '2026-09-10', endDate: '2026-09-10' },
  { id: 'e11', title: 'BWN FRANCE & FRENCH SPEAKING BELGIUM NATIONAL CONFERENCE', venue: 'Grimaldi Forum, Monaco', startDate: '2026-10-27', endDate: '2026-10-27' },
  { id: 'e12', title: '2026 BWN GLOBAL CONVENTION', venue: 'Monaco', startDate: '2026-10-28', endDate: '2026-10-30', isGlobal: true },
  { id: 'e13', title: 'BWN COLOMBIA NATIONAL CONFERENCE 2026', venue: 'Cartagena', startDate: '2026-11-17', endDate: '2026-11-20' },
];

/* ═══════════════════════════════════════════════════
   DUMMY DATA — Previous Events
   ═══════════════════════════════════════════════════ */
interface PreviousEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
}

const PREVIOUS_EVENTS: PreviousEvent[] = [
  {
    id: 'p1',
    title: 'BWN Global Convention 2025 | Highlights',
    description: 'Experience the full journey of the 2025 BWN Global Convention in Sydney — four days of standout speakers, powerful insights, and unforgettable networking moments.',
    location: 'Sydney, Australia',
    date: 'November 19, 2025',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80',
  },
  {
    id: 'p2',
    title: 'BWN US & Canada National Conference 2025',
    description: 'A celebration of referral networking in Orlando — members gathered for training, awards, and inspiration.',
    location: 'Orlando, USA',
    date: 'May 15, 2025',
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=900&q=80',
  },
  {
    id: 'p3',
    title: 'BWN Japan National Conference 2025',
    description: 'Tokyo hosted an incredible gathering of Japanese BWN members for networking and growth strategies.',
    location: 'Tokyo, Japan',
    date: 'March 22, 2025',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80',
  },
];

/* ═══════════════════════════════════════════════════
   DATE HELPERS
   ═══════════════════════════════════════════════════ */
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function parseDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return {
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
    dayName: DAY_NAMES[d.getDay()],
    monthShort: MONTH_SHORT[d.getMonth()],
  };
}

function groupByMonth(events: EventItem[]) {
  const groups: { key: string; label: string; events: EventItem[] }[] = [];
  for (const ev of events) {
    const s = parseDate(ev.startDate);
    const key = `${s.year}-${String(s.month).padStart(2, '0')}`;
    const label = `${MONTHS[s.month]} ${s.year}`;
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label, events: [] };
      groups.push(group);
    }
    group.events.push(ev);
  }
  return groups.sort((a, b) => a.key.localeCompare(b.key));
}

/* ═══════════════════════════════════════════════════
   EVENT BAR COMPONENT
   ═══════════════════════════════════════════════════ */
function EventBar({ event }: { event: EventItem }) {
  const start = parseDate(event.startDate);
  const end = parseDate(event.endDate);
  const isSingleDay = event.startDate === event.endDate;
  const bg = event.isGlobal ? 'bg-primary' : 'bg-[#6B6B6B]';

  return (
    <div className={`${bg} rounded-lg px-5 py-4 flex items-center gap-5 text-white mb-3 hover:opacity-95 transition-opacity cursor-pointer`}>
      {/* Date block */}
      <div className="flex items-center gap-1 shrink-0" style={{ minWidth: '100px' }}>
        {/* Start date */}
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{start.dayName}</div>
          <div className="text-3xl font-black leading-none">{String(start.day).padStart(2, '0')}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{start.monthShort}</div>
        </div>

        {!isSingleDay && (
          <>
            <span className="text-xl font-light opacity-50 mx-1">·</span>
            {/* End date */}
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{end.dayName}</div>
              <div className="text-3xl font-black leading-none">{String(end.day).padStart(2, '0')}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{end.monthShort}</div>
            </div>
          </>
        )}
      </div>

      {/* Title + venue */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-black uppercase tracking-wide leading-tight truncate">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin className="h-3 w-3 shrink-0 opacity-80" />
          <span className="text-xs opacity-80 truncate">{event.venue}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [prevIdx, setPrevIdx] = useState(0);

  // Filter events by search
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return UPCOMING_EVENTS;
    const q = searchQuery.toLowerCase();
    return UPCOMING_EVENTS.filter(
      (e) => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const grouped = useMemo(() => groupByMonth(filteredEvents), [filteredEvents]);

  const currentPrev = PREVIOUS_EVENTS[prevIdx];

  return (
    <>
      <Helmet>
        <title>Global Events | BWN</title>
        <meta name="description" content="BWN hosts the Global Convention, and national and regional conferences that bring together Members from across the world." />
      </Helmet>

      {/* ═══ HERO BANNER — Monaco Convention ═══ */}
      <section className="bg-white pt-6 pb-0 lg:pt-10">
        <Container>
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl" style={{ minHeight: '280px' }}>
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1400&q=80"
              alt="Monaco aerial view"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3a4a7a]/90 via-[#3a4a7a]/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
              {/* Left side — BWN branding + event info */}
              <div className="text-center lg:text-left shrink-0">
                <div className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-4">
                  BWN<span className="text-xs align-top">®</span>
                </div>
                <div className="w-12 h-[2px] bg-white/50 mx-auto lg:mx-0 mb-4" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-[0.2em]">ACCELERATE</p>
                <p className="text-sm font-black text-white uppercase tracking-wider">2026 GLOBAL CONVENTION</p>
                <p className="text-sm font-bold text-white uppercase tracking-wider">MONACO</p>
                <p className="text-xs text-white/70 mt-2">October 28 - 30, 2026</p>
              </div>

              {/* Vertical divider */}
              <div className="hidden lg:block w-[1px] h-32 bg-white/30 shrink-0" />

              {/* Right side — CTA */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl lg:text-4xl font-light text-white leading-snug">
                  Experience<br />
                  the <strong className="font-black">2026 BWN<sup className="text-xs">&reg;</sup> Global<br />Convention</strong> in Monaco!
                </h2>
                <a
                  href="#register"
                  className="inline-block mt-6 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3 rounded-full transition-colors shadow-lg"
                >
                  Click Here To Register
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ UPCOMING EVENTS ═══ */}
      <section className="bg-[#f5f5f5] py-12 lg:py-16">
        <Container>
          {/* Heading row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Upcoming<br /><span className="text-primary">Events</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-xl leading-relaxed lg:pt-2">
              BWN hosts the Global Convention, and national and regional conferences that bring together
              Members from across the world, fostering connections and collaboration on an international
              scale. These events provide unique opportunities for networking, learning, and growing
              within the global BWN community.
            </p>
          </div>

          {/* Filter/Sort icons */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors" aria-label="Sort">
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Events"
              className="w-full pl-5 pr-12 py-3.5 bg-white border-2 border-gray-800 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
          </div>

          {/* Filter dropdowns */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-3 mb-6 bg-gray-100 rounded-xl p-4">
              {['Event Type', 'Country', 'Event Location'].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:border-gray-400 transition-colors"
                >
                  {filter}
                  <ChevronDown className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}

          {/* Month groups */}
          {grouped.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500">No events match your search.</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.key} className="mb-6">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide mb-3">
                  {group.label}
                </h3>
                {group.events.map((ev) => (
                  <EventBar key={ev.id} event={ev} />
                ))}
              </div>
            ))
          )}
        </Container>
      </section>

      {/* ═══ PREVIOUS EVENTS ═══ */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          {/* Heading row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Previous<br /><span className="text-primary">Events</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-xl leading-relaxed lg:pt-2">
              Explore highlights of previous BWN events around the world; a testament to the power of
              connection and the memorable experiences that define our global community.
            </p>
          </div>

          {/* Carousel card */}
          {currentPrev && (
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-0">
                {/* Image with play button */}
                <div className="relative lg:w-[55%] shrink-0">
                  <img
                    src={currentPrev.image}
                    alt={currentPrev.title}
                    className="w-full h-72 lg:h-[420px] object-cover"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors cursor-pointer">
                      <Play className="h-7 w-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">
                    {currentPrev.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {currentPrev.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-semibold text-gray-900">{currentPrev.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-semibold text-gray-900">{currentPrev.date}</span>
                    </div>
                  </div>

                  {/* Nav arrows */}
                  <div className="flex items-center gap-3 mt-8 justify-end">
                    <button
                      onClick={() => setPrevIdx((i) => (i > 0 ? i - 1 : PREVIOUS_EVENTS.length - 1))}
                      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800 transition-colors"
                      aria-label="Previous event"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setPrevIdx((i) => (i < PREVIOUS_EVENTS.length - 1 ? i + 1 : 0))}
                      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-500 hover:border-gray-500 hover:text-gray-800 transition-colors"
                      aria-label="Next event"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
