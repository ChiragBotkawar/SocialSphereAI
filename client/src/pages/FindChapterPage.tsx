import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowLeft, MapPin, Clock, Users, Monitor, Calendar, CalendarPlus, ChevronLeft } from 'lucide-react';
import Container from '../components/ui/Container';
import Spinner from '../components/ui/Spinner';
import { useChapters } from '../hooks/useChapters';
import { visitRequestService } from '../services/visitRequestService';
import { getMeetingDisplay } from '../utils/helpers';
import toast from 'react-hot-toast';
import type { Chapter } from '../types';

// ─── GEOAPIFY TYPES ──────────────────────────────────────────────

interface GeoapifySuggestion {
  properties: {
    formatted: string;
    city?: string;
    state?: string;
    country?: string;
    lat: number;
    lon: number;
  };
}

const GEOAPIFY_KEY = '0745b0b99e384972a54882ec95a8d862';

// ─── TESTIMONIALS FOR SIDEBAR ────────────────────────────────────

const SIDEBAR_TESTIMONIALS = [
  {
    quote: 'BNI is certainly a great investment, and we will continue our membership for many years to come! I would certainly recommend BNI to any business that wants to grow and learning lots of stuff along the way!',
    name: 'Andrew Hope',
    company: 'Hope Creativity Design Ltd | BNI Victory',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: 'I used to struggle to get trusted logistic partners in other countries. Since I joined BNI, I get credible and trusted partners in just an hour after asking.',
    name: 'Ernest Buabeng',
    company: 'Clearing & Forwarding, Ghana',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  },
];

const SIDEBAR_STATS = [
  { value: '16.8M', label: 'Referrals Passed by Members' },
  { value: '340K', label: 'Members' },
  { value: '$25.4B', label: 'Member Generated Business' },
];

// ─── STEP TYPE ───────────────────────────────────────────────────

type Step = 'search' | 'results' | 'form' | 'confirmation';

// ─── MEETING FORMAT TYPES ────────────────────────────────────────

type MeetingFormat = 'All' | 'In Person' | 'Online' | 'Hybrid';

// ─── GENERATE UPCOMING DATES FOR A DAY OF WEEK ──────────────────

function getUpcomingDates(dayOfWeek: string, count: number): Date[] {
  const dayMap: Record<string, number> = {
    sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6,
  };
  const targetDay = dayMap[dayOfWeek.toLowerCase()] ?? 1;
  const dates: Date[] = [];
  const today = new Date();
  const current = new Date(today);

  // Find next occurrence
  while (current.getDay() !== targetDay) {
    current.setDate(current.getDate() + 1);
  }

  for (let i = 0; i < count; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

function formatShortDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  return { day, month };
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────

export default function FindChapterPage() {
  const [step, setStep] = useState<Step>('search');

  // Search state
  const [locationText, setLocationText] = useState('');
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ formatted: string; lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Results state
  const [formatFilter, setFormatFilter] = useState<MeetingFormat>('All');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null); // chapter _id

  // Form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', profession: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation state
  const [confirmedDetails, setConfirmedDetails] = useState<{
    chapterName: string;
    date: string;
    location: string;
  } | null>(null);

  // Chapter query
  const { data: chaptersData, isLoading: chaptersLoading } = useChapters(
    selectedLocation
      ? { city: selectedLocation.formatted.split(',')[0], limit: 20 }
      : { limit: 0 }
  );

  // ─── GEOAPIFY AUTOCOMPLETE ──────────────────────────────────

  useEffect(() => {
    if (locationText.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationText)}&apiKey=${GEOAPIFY_KEY}&limit=5`;
        const resp = await fetch(url, { signal: controller.signal });
        const json = await resp.json();
        setSuggestions(json.features ?? []);
        setShowSuggestions(true);
      } catch {
        // aborted or network error
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [locationText]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelectSuggestion = (s: GeoapifySuggestion) => {
    setLocationText(s.properties.formatted);
    setSelectedLocation({
      formatted: s.properties.formatted,
      lat: s.properties.lat,
      lon: s.properties.lon,
    });
    setShowSuggestions(false);
    setLocationError('');
  };

  const handleSearch = () => {
    if (!selectedLocation) {
      setLocationError('Please enter a valid location or zipcode');
      return;
    }
    setStep('results');
  };

  // ─── CHAPTER DATE SELECTION ─────────────────────────────────

  const handleChooseDate = (chapter: Chapter) => {
    setShowDatePicker(showDatePicker === chapter._id ? null : chapter._id);
    setSelectedDate(null);
  };

  const handleDateSelect = (chapter: Chapter, date: Date) => {
    setSelectedChapter(chapter);
    setSelectedDate(date);
    setStep('form');
  };

  // ─── FORM SUBMISSION ───────────────────────────────────────

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.profession.trim()) errs.profession = 'Profession is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !selectedChapter) return;

    setIsSubmitting(true);
    try {
      const [firstName, ...rest] = formData.name.trim().split(' ');
      await visitRequestService.submitVisitRequest({
        firstName: firstName || formData.name,
        lastName: rest.join(' ') || '-',
        email: formData.email,
        phone: formData.phone || undefined,
        profession: formData.profession,
        chapter: selectedChapter._id,
        preferredDate: selectedDate?.toISOString(),
      });

      setConfirmedDetails({
        chapterName: selectedChapter.name,
        date: selectedDate ? formatFullDate(selectedDate) + ' at ' + (selectedChapter.meetingSchedule?.time || '08:00 AM') : '',
        location: `${selectedChapter.city}${selectedChapter.state ? ', ' + selectedChapter.state : ''}`,
      });
      setStep('confirmation');
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── BACK NAVIGATION ──────────────────────────────────────

  const goBack = useCallback((to: Step) => {
    setStep(to);
  }, []);

  // ─── MAP URL ───────────────────────────────────────────────

  const mapEmbedUrl = selectedLocation
    ? `https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}&z=13&output=embed`
    : '';

  // ─── FILTER CHAPTERS ──────────────────────────────────────

  const filteredChapters = (chaptersData?.data ?? []).filter(() => {
    if (formatFilter === 'All') return true;
    // In a real app we'd filter by format; for now show all
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Find a BWN Chapter | Locate a BNI Chapter Near You</title>
        <meta name="description" content="Search for BWN chapters near your location. Visit a chapter meeting for free and experience the power of networking." />
      </Helmet>

      {step === 'search' && (
        <SearchStep
          locationText={locationText}
          setLocationText={setLocationText}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          suggestionsRef={suggestionsRef}
          onSelectSuggestion={handleSelectSuggestion}
          onSearch={handleSearch}
          locationError={locationError}
        />
      )}

      {step === 'results' && (
        <ResultsStep
          locationText={locationText}
          setLocationText={setLocationText}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          suggestionsRef={suggestionsRef}
          onSelectSuggestion={handleSelectSuggestion}
          onSearch={handleSearch}
          onBack={() => goBack('search')}
          chapters={filteredChapters}
          isLoading={chaptersLoading}
          formatFilter={formatFilter}
          setFormatFilter={setFormatFilter}
          showDatePicker={showDatePicker}
          onChooseDate={handleChooseDate}
          onDateSelect={handleDateSelect}
          mapEmbedUrl={mapEmbedUrl}
        />
      )}

      {step === 'form' && selectedChapter && selectedDate && (
        <FormStep
          chapter={selectedChapter}
          date={selectedDate}
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onBack={() => goBack('results')}
        />
      )}

      {step === 'confirmation' && confirmedDetails && (
        <ConfirmationStep details={confirmedDetails} />
      )}
    </>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 1: SEARCH
// ═════════════════════════════════════════════════════════════════

function SearchStep({
  locationText, setLocationText, suggestions, showSuggestions,
  suggestionsRef, onSelectSuggestion, onSearch, locationError,
}: {
  locationText: string;
  setLocationText: (v: string) => void;
  suggestions: GeoapifySuggestion[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onSelectSuggestion: (s: GeoapifySuggestion) => void;
  onSearch: () => void;
  locationError: string;
}) {
  return (
    <section className="section-padding bg-white min-h-[80vh]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,380px]">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-dark lg:text-5xl">
              Locate a <span className="text-primary font-black">BNI</span> Chapter
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Please type <span className="font-bold text-dark">in your location or zipcode</span>
            </p>

            {/* Search Input */}
            <div className="relative mt-8 max-w-lg" ref={suggestionsRef}>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                  placeholder="Enter your location or zipcode"
                  className="flex-1 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-5 py-4 text-base text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={onSearch}
                  className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800"
                  aria-label="Search"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>

              {/* Autocomplete dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectSuggestion(s)}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      {s.properties.formatted}
                    </button>
                  ))}
                </div>
              )}

              {locationError && (
                <p className="mt-2 text-sm text-primary">{locationError}</p>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <Sidebar testimonialIndex={0} statIndices={[0, 1]} />
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 2: RESULTS
// ═════════════════════════════════════════════════════════════════

function ResultsStep({
  locationText, setLocationText, suggestions, showSuggestions,
  suggestionsRef, onSelectSuggestion, onSearch, onBack,
  chapters, isLoading, formatFilter, setFormatFilter,
  showDatePicker, onChooseDate, onDateSelect, mapEmbedUrl,
}: {
  locationText: string;
  setLocationText: (v: string) => void;
  suggestions: GeoapifySuggestion[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onSelectSuggestion: (s: GeoapifySuggestion) => void;
  onSearch: () => void;
  onBack: () => void;
  chapters: Chapter[];
  isLoading: boolean;
  formatFilter: MeetingFormat;
  setFormatFilter: (f: MeetingFormat) => void;
  showDatePicker: string | null;
  onChooseDate: (c: Chapter) => void;
  onDateSelect: (c: Chapter, d: Date) => void;
  mapEmbedUrl: string;
}) {
  const formats: { label: MeetingFormat; icon: React.ReactNode }[] = [
    { label: 'All', icon: null },
    { label: 'In Person', icon: <Users className="h-4 w-4" /> },
    { label: 'Online', icon: <Monitor className="h-4 w-4" /> },
    { label: 'Hybrid', icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <section className="bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="border-b border-gray-200 py-8">
          <h2 className="text-2xl font-light text-gray-500 lg:text-3xl">
            Search results for <span className="font-bold text-dark">the location {locationText.split(',')[0]}</span>
          </h2>

          {/* Back + Search */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-dark"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="relative flex-1 max-w-lg" ref={suggestionsRef}>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                  className="flex-1 rounded-l-xl border border-r-0 border-gray-300 bg-white px-4 py-3 text-sm text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={onSearch}
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800"
                  aria-label="Search"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectSuggestion(s)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      {s.properties.formatted}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h3 className="text-base text-gray-500">
              Select a Chapter Below to <span className="font-bold text-primary">Book Your Visit</span>
            </h3>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {formats.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setFormatFilter(label)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  formatFilter === label
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-300 text-gray-500 hover:border-gray-400'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content: chapters + map */}
        <div className="grid gap-0 lg:grid-cols-[1fr,1fr]">
          {/* Chapter Cards */}
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto py-6 pr-6">
            {isLoading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : chapters.length === 0 ? (
              <p className="py-20 text-center text-gray-500">No chapters found near this location.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter._id}
                    chapter={chapter}
                    isDatePickerOpen={showDatePicker === chapter._id}
                    onChooseDate={() => onChooseDate(chapter)}
                    onDateSelect={(date) => onDateSelect(chapter, date)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="hidden border-l border-gray-200 lg:block">
            <div className="sticky top-0 h-[calc(100vh-280px)]">
              {mapEmbedUrl ? (
                <iframe
                  title="Chapter locations map"
                  src={mapEmbedUrl}
                  className="h-full w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                  Map will appear after search
                </div>
              )}
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 flex gap-4 rounded-lg bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Users className="h-3.5 w-3.5" /> In Person
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Monitor className="h-3.5 w-3.5" /> Online
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Monitor className="h-3.5 w-3.5" /> Hybrid
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── CHAPTER CARD ────────────────────────────────────────────────

function ChapterCard({
  chapter, isDatePickerOpen, onChooseDate, onDateSelect,
}: {
  chapter: Chapter;
  isDatePickerOpen: boolean;
  onChooseDate: () => void;
  onDateSelect: (date: Date) => void;
}) {
  const upcomingDates = getUpcomingDates(
    chapter.meetingSchedule?.dayOfWeek ?? 'Tuesday',
    6
  );

  return (
    <div className={`rounded-xl border-2 bg-white p-5 transition-all ${isDatePickerOpen ? 'border-primary shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-primary">{chapter.name}</h3>
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      {/* Choose Date Button */}
      <button
        onClick={onChooseDate}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Choose Date to Visit
        <Calendar className="h-4 w-4" />
      </button>

      {/* Date Picker (expanded) */}
      {isDatePickerOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          {upcomingDates.map((date) => {
            const { day, month } = formatShortDate(date);
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className="flex h-16 w-14 flex-col items-center justify-center rounded-lg border-2 border-gray-200 text-center transition-all hover:border-primary hover:bg-primary/5"
              >
                <span className="text-lg font-bold text-dark">{day}</span>
                <span className="text-[10px] font-semibold uppercase text-gray-500">{month}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Meeting Info */}
      <div className="mt-4 flex items-start gap-4 text-sm text-gray-600">
        <div>
          <p className="text-xs font-semibold text-gray-400">Meeting Time</p>
          <p className="font-bold text-dark">
            {chapter.meetingSchedule?.dayOfWeek ?? 'Tuesday'},
          </p>
          <p className="font-bold text-dark">{chapter.meetingSchedule?.time ?? '08:00 AM'}</p>
        </div>
        {(chapter.address || chapter.meetingSchedule?.venueAddress) && (
          <div className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs leading-relaxed">
              {chapter.meetingSchedule?.venueAddress || chapter.address}, {chapter.city}
              {chapter.state ? `, ${chapter.state}` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 3: VISIT REGISTRATION FORM
// ═════════════════════════════════════════════════════════════════

function FormStep({
  chapter, date, formData, setFormData, formErrors,
  isSubmitting, onSubmit, onBack,
}: {
  chapter: Chapter;
  date: Date;
  formData: { name: string; phone: string; email: string; profession: string };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  formErrors: Record<string, string>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="section-padding bg-white min-h-[80vh]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,380px]">
          {/* Left — Form */}
          <div>
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-dark"
            >
              <ChevronLeft className="h-4 w-4" /> Choose a different Chapter
            </button>

            <h2 className="text-3xl font-light text-gray-500 lg:text-4xl">
              Please enter <span className="font-bold text-dark">your details to receive your Chapter visit information</span>
            </h2>

            <form onSubmit={onSubmit} className="mt-10 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-dark">
                    Name<span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-primary">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-dark">
                    Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-0">
                    <span className="flex h-[54px] shrink-0 items-center gap-1 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      🇺🇸 +1
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="flex-1 rounded-r-xl border border-gray-300 bg-gray-50 px-5 py-4 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-dark">
                    Email<span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter your e-mail address"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-primary">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-dark">
                    Profession<span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => updateField('profession', e.target.value)}
                    placeholder="Type in your profession"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {formErrors.profession && <p className="mt-1 text-sm text-primary">{formErrors.profession}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-dark px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right Sidebar */}
          <Sidebar testimonialIndex={1} statIndices={[2]} />
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 4: CONFIRMATION
// ═════════════════════════════════════════════════════════════════

function ConfirmationStep({ details }: { details: { chapterName: string; date: string; location: string } }) {
  const handleAddToCalendar = () => {
    // Generate a simple .ics-style Google Calendar link
    const title = encodeURIComponent(`BNI Chapter Visit - ${details.chapterName}`);
    const loc = encodeURIComponent(details.location);
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${loc}&details=${encodeURIComponent('Your BNI chapter visit')}`;
    window.open(calUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section-padding bg-white min-h-[80vh]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px]">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-black text-primary lg:text-5xl">Congratulations!</h1>
            <p className="mt-4 text-xl text-gray-600 leading-relaxed">
              You are registered for the Chapter visit. Please check your email and confirm the Chapter Visit.
            </p>

            {/* Chapter Details Card */}
            <div className="mt-10 max-w-lg rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-dark">Chapter Details</h3>
                <button
                  onClick={handleAddToCalendar}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-50"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Add to Calendar
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-dark">{details.chapterName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{details.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{details.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              {['facebook', 'linkedin', 'instagram', 'youtube', 'x'].map((social) => (
                <span key={social} className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-dark">
                  <SocialIcon name={social} />
                </span>
              ))}
            </div>
          </div>

          {/* Right — Newsletter */}
          <div className="flex flex-col justify-start pt-4">
            <div>
              <h3 className="text-lg font-bold text-dark">BNI SuccessNet™</h3>
              <p className="mt-1 text-sm text-gray-500">Sign up for exclusive networking tips and more.</p>
              <div className="mt-4 flex items-center gap-0">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 rounded-l-full border border-r-0 border-gray-300 bg-white px-5 py-3 text-sm placeholder-gray-400 focus:border-primary focus:outline-none"
                />
                <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-r-full bg-primary text-white transition-colors hover:bg-primary-dark">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// SIDEBAR COMPONENT
// ═════════════════════════════════════════════════════════════════

function Sidebar({ testimonialIndex, statIndices }: { testimonialIndex: number; statIndices: number[] }) {
  const testimonial = SIDEBAR_TESTIMONIALS[testimonialIndex];
  const stats = statIndices.map((i) => SIDEBAR_STATS[i]);

  return (
    <div className="flex flex-col gap-6">
      {/* Testimonial */}
      <div className="flex items-start gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-16 w-16 shrink-0 rounded-full border-2 border-gray-200 object-cover"
        />
        <div>
          <p className="text-sm leading-relaxed text-gray-500">{testimonial.quote}</p>
          <p className="mt-3 text-sm font-bold text-dark">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.company}</p>
        </div>
      </div>

      {/* Stats */}
      {stats.map((stat) => (
        <div key={stat.label} className="border-l-4 border-gray-200 pl-4">
          <p className="text-3xl font-black text-primary">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// SOCIAL ICON (simple SVG)
// ═════════════════════════════════════════════════════════════════

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    linkedin: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    instagram: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>,
    youtube: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    x: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  };
  return <>{icons[name] ?? null}</>;
}
