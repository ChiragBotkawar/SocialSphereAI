import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Clock, Users, Monitor, Calendar, ChevronDown, Mail, Phone, X } from 'lucide-react';
import Container from './ui/Container';
import Spinner from './ui/Spinner';
import { useChapters } from '../hooks/useChapters';
import { visitRequestService } from '../services/visitRequestService';
import toast from 'react-hot-toast';
import type { Chapter } from '../types';

// ─── GEOAPIFY ────────────────────────────────────────────────────

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

// ─── SIDEBAR DATA ────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      'BNI is certainly a great investment, and we will continue our membership for many years to come! I would certainly recommend BNI to any business that wants to grow and learn lots of stuff along the way!',
    name: 'Andrew Hope',
    company: 'Hope Creative Design Ltd | BNI Victory',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote:
      'I used to struggle to get trusted logistic partners in other countries. Since I joined BNI, I get credible and trusted partners in just an hour after asking.',
    name: 'Ernest Buabeng',
    company: 'Clearing & Forwarding, Ghana',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  },
];

const QUOTE_CARDS = [
  {
    quote: 'Referred-in customers have a 37% higher retention rate than other customers.',
    source: 'Deloitte',
    logo: 'D.',
    logoBg: 'bg-black',
    logoColor: 'text-white',
  },
  {
    quote: 'People trust recommendations from friends 7X more than traditional advertising.',
    source: 'Nielsen',
    logo: '◀▶',
    logoBg: 'bg-white',
    logoColor: 'text-gray-700',
  },
];

const STATS = [
  { value: '16M+', label: 'Referrals Passed\nby Members' },
  { value: '335K+', label: 'Members' },
];

// ─── COUNTRY CODES ───────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸', label: 'US' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+91', flag: '🇮🇳', label: 'IN' },
  { code: '+61', flag: '🇦🇺', label: 'AU' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+81', flag: '🇯🇵', label: 'JP' },
  { code: '+86', flag: '🇨🇳', label: 'CN' },
  { code: '+55', flag: '🇧🇷', label: 'BR' },
  { code: '+971', flag: '🇦🇪', label: 'AE' },
  { code: '+234', flag: '🇳🇬', label: 'NG' },
  { code: '+27', flag: '🇿🇦', label: 'ZA' },
  { code: '+65', flag: '🇸🇬', label: 'SG' },
  { code: '+52', flag: '🇲🇽', label: 'MX' },
  { code: '+39', flag: '🇮🇹', label: 'IT' },
];

// ─── HELPERS ─────────────────────────────────────────────────────

type JourneyStep = 'name' | 'email' | 'phone' | 'profession' | 'location' | 'results';
type MeetingFormat = 'All' | 'In Person' | 'Online' | 'Hybrid';

function getUpcomingDates(dayOfWeek: string, count: number): Date[] {
  const dayMap: Record<string, number> = {
    sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6,
  };
  const targetDay = dayMap[dayOfWeek.toLowerCase()] ?? 1;
  const dates: Date[] = [];
  const current = new Date();
  while (current.getDay() !== targetDay) current.setDate(current.getDate() + 1);
  for (let i = 0; i < count; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

function formatShortDate(date: Date) {
  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  };
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────

interface GetInvitedJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetInvitedJourney({ isOpen, onClose }: GetInvitedJourneyProps) {
  const [step, setStep] = useState<JourneyStep>('name');

  // Form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [profession, setProfession] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);

  // Location
  const [locationText, setLocationText] = useState('');
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ formatted: string; lat: number; lon: number } | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Results
  const [formatFilter, setFormatFilter] = useState<MeetingFormat>('All');
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);

  // Errors
  const [fieldError, setFieldError] = useState('');

  // Chapter query
  const { data: chaptersData, isLoading: chaptersLoading } = useChapters(
    selectedLocation && step === 'results'
      ? { city: selectedLocation.formatted.split(',')[0], limit: 20 }
      : { limit: 0 },
  );

  // ─── GEOAPIFY AUTOCOMPLETE ──────────────────────────────────

  useEffect(() => {
    if (locationText.length < 3) { setSuggestions([]); return; }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationText)}&apiKey=${GEOAPIFY_KEY}&limit=5`;
        const resp = await fetch(url, { signal: controller.signal });
        const json = await resp.json();
        setSuggestions(json.features ?? []);
        setShowSuggestions(true);
      } catch { /* aborted */ }
    }, 300);
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [locationText]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep('name');
      setName('');
      setEmail('');
      setPhone('');
      setProfession('');
      setLocationText('');
      setSelectedLocation(null);
      setAgreeToContact(false);
      setFieldError('');
    }
  }, [isOpen]);

  // ─── NAVIGATION ────────────────────────────────────────────

  const STEPS: JourneyStep[] = ['name', 'email', 'phone', 'profession', 'location', 'results'];

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const goBack = () => {
    setFieldError('');
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  // ─── STEP HANDLERS ─────────────────────────────────────────

  const handleNameNext = () => {
    if (!name.trim()) { setFieldError('Please enter your name'); return; }
    setFieldError('');
    goNext();
  };

  const handleEmailNext = () => {
    if (!email.trim()) { setFieldError('Please enter your email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('Please enter a valid email'); return; }
    setFieldError('');
    goNext();
  };

  const handlePhoneNext = () => {
    setFieldError('');
    goNext();
  };

  const handleProfessionNext = () => {
    if (!profession.trim()) { setFieldError('Please enter your profession'); return; }
    setFieldError('');
    goNext();
  };

  const handleLocationNext = () => {
    if (!selectedLocation) { setFieldError('Please select a location'); return; }
    setFieldError('');
    goNext();
  };

  const handleSelectSuggestion = (s: GeoapifySuggestion) => {
    setLocationText(s.properties.formatted);
    setSelectedLocation({
      formatted: s.properties.formatted,
      lat: s.properties.lat,
      lon: s.properties.lon,
    });
    setShowSuggestions(false);
    setFieldError('');
  };

  // ─── DATE SELECTION & SUBMIT ────────────────────────────────

  const handleDateSelect = async (chapter: Chapter, date: Date) => {
    try {
      const [firstName, ...rest] = name.trim().split(' ');
      await visitRequestService.submitVisitRequest({
        firstName: firstName || name,
        lastName: rest.join(' ') || '-',
        email,
        phone: phone ? `${countryCode}${phone}` : undefined,
        profession,
        chapter: chapter._id,
        preferredDate: date.toISOString(),
      });
      toast.success('Visit request submitted! Check your email for confirmation.');
      onClose();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong. Please try again.');
    }
  };

  // ─── MAP URL ───────────────────────────────────────────────

  const mapEmbedUrl = selectedLocation
    ? `https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}&z=13&output=embed`
    : '';

  const filteredChapters = (chaptersData?.data ?? []).filter(() => {
    if (formatFilter === 'All') return true;
    return true;
  });

  // Progress bar
  const progressPercent = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top header bar */}
      <div className="shrink-0">
        {/* Red progress bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header with logo & contact */}
        <div className="container-bni flex h-16 items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 shrink-0" aria-label="Close">
            <span className="text-2xl font-black text-primary tracking-tight leading-none">BWN</span>
            <span className="text-xl font-black text-primary leading-none pb-0.5">.</span>
          </button>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="tel:+18008258286" className="flex items-center gap-1.5 text-primary font-medium hover:text-primary-dark transition-colors">
              <Phone className="h-4 w-4" />
              (800)-825-8286
            </a>
            <a href="mailto:support@bni.com" className="flex items-center gap-1.5 text-primary font-medium hover:text-primary-dark transition-colors">
              <Mail className="h-4 w-4" />
              support@bni.com
            </a>
          </div>
          <button
            onClick={onClose}
            className="xl:hidden flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close journey"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {step === 'name' && (
          <NameStep
            name={name}
            setName={setName}
            onNext={handleNameNext}
            error={fieldError}
          />
        )}
        {step === 'email' && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            agreeToContact={agreeToContact}
            setAgreeToContact={setAgreeToContact}
            onNext={handleEmailNext}
            onBack={goBack}
            error={fieldError}
          />
        )}
        {step === 'phone' && (
          <PhoneStep
            phone={phone}
            setPhone={setPhone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            showCountryDropdown={showCountryDropdown}
            setShowCountryDropdown={setShowCountryDropdown}
            onNext={handlePhoneNext}
            onSkip={handlePhoneNext}
            onBack={goBack}
          />
        )}
        {step === 'profession' && (
          <ProfessionStep
            profession={profession}
            setProfession={setProfession}
            onNext={handleProfessionNext}
            onBack={goBack}
            error={fieldError}
          />
        )}
        {step === 'location' && (
          <LocationStep
            locationText={locationText}
            setLocationText={setLocationText}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            suggestionsRef={suggestionsRef}
            onSelectSuggestion={handleSelectSuggestion}
            onNext={handleLocationNext}
            onBack={goBack}
            error={fieldError}
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
            onSearch={handleLocationNext}
            onBack={goBack}
            chapters={filteredChapters}
            isLoading={chaptersLoading}
            formatFilter={formatFilter}
            setFormatFilter={setFormatFilter}
            showDatePicker={showDatePicker}
            onChooseDate={(c) => setShowDatePicker(showDatePicker === c._id ? null : c._id)}
            onDateSelect={handleDateSelect}
            mapEmbedUrl={mapEmbedUrl}
          />
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 1 — NAME
// ═════════════════════════════════════════════════════════════════

function NameStep({ name, setName, onNext, error }: {
  name: string;
  setName: (v: string) => void;
  onNext: () => void;
  error: string;
}) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] items-start">
          {/* Left side */}
          <div className="flex flex-col justify-center py-12">
            <h1 className="text-4xl font-bold text-dark lg:text-5xl leading-tight">
              Start your <span className="text-primary font-black">BNI</span> Journey
            </h1>
            <p className="mt-8 text-xl text-gray-500">
              Please type <span className="font-bold text-dark">in your name</span>
            </p>
            <div className="mt-6 max-w-lg">
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onNext()}
                  placeholder="Enter your name"
                  autoFocus
                  className="flex-1 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50/80 px-5 py-4 text-base text-dark placeholder-gray-400 focus:border-gray-300 focus:outline-none shadow-sm"
                />
                <button
                  onClick={onNext}
                  className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800 shadow-sm"
                  aria-label="Next"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-primary">{error}</p>}
            </div>
          </div>

          {/* Right side — testimonial + stats */}
          <div className="hidden lg:flex flex-col gap-8 py-12">
            <TestimonialCard testimonial={TESTIMONIALS[0]} />
            <div className="flex flex-col gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200" />
                  <p className="text-3xl font-black text-primary">{s.value}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 2 — EMAIL
// ═════════════════════════════════════════════════════════════════

function EmailStep({ email, setEmail, agreeToContact, setAgreeToContact, onNext, onBack, error }: {
  email: string;
  setEmail: (v: string) => void;
  agreeToContact: boolean;
  setAgreeToContact: (v: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  error: string;
}) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] items-start">
          <div className="flex flex-col justify-center py-12">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-dark hover:text-gray-600 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="text-3xl font-light text-gray-500 lg:text-4xl leading-tight">
              Enter your <span className="font-bold text-dark">email address</span>
            </h1>

            <div className="mt-8 max-w-lg">
              <div className="flex items-center gap-0">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onNext()}
                    placeholder="Your email address"
                    autoFocus
                    className="w-full rounded-l-xl border border-r-0 border-gray-200 bg-gray-50/80 px-5 py-4 pr-10 text-base text-dark placeholder-gray-400 focus:border-gray-300 focus:outline-none shadow-sm"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                </div>
                <button
                  onClick={onNext}
                  className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800 shadow-sm"
                  aria-label="Next"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-primary">{error}</p>}
            </div>

            <label className="mt-8 flex items-start gap-3 cursor-pointer max-w-lg">
              <input
                type="checkbox"
                checked={agreeToContact}
                onChange={(e) => setAgreeToContact(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to be contacted by BNI according to the{' '}
                <a href="/privacy-policy" className="text-primary font-medium hover:underline">Privacy Policy</a>{' '}
                and{' '}
                <a href="/terms" className="text-primary font-medium hover:underline">Terms and Conditions</a>
              </span>
            </label>
          </div>

          {/* Right side — Deloitte quote */}
          <div className="hidden lg:flex flex-col justify-center py-12">
            <QuoteCard quote={QUOTE_CARDS[0]} />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 3 — PHONE
// ═════════════════════════════════════════════════════════════════

function PhoneStep({ phone, setPhone, countryCode, setCountryCode, showCountryDropdown, setShowCountryDropdown, onNext, onSkip, onBack }: {
  phone: string;
  setPhone: (v: string) => void;
  countryCode: string;
  setCountryCode: (v: string) => void;
  showCountryDropdown: boolean;
  setShowCountryDropdown: (v: boolean) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setShowCountryDropdown]);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] items-start">
          <div className="flex flex-col justify-center py-12">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-dark hover:text-gray-600 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="text-3xl font-light text-gray-500 lg:text-4xl leading-tight">
              What's your <span className="font-bold text-dark">contact number?</span>
            </h1>

            <div className="mt-8 max-w-lg">
              <div className="flex items-center gap-0">
                {/* Country code selector */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex h-[58px] items-center gap-1.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50/80 px-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="font-medium">{countryCode}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                  {showCountryDropdown && (
                    <div className="absolute left-0 top-full z-30 mt-1 max-h-48 w-48 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => { setCountryCode(c.code); setShowCountryDropdown(false); }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="font-medium">{c.code}</span>
                          <span className="text-gray-400">{c.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && onNext()}
                  placeholder="Enter your phone number"
                  autoFocus
                  className="flex-1 border border-r-0 border-gray-200 bg-gray-50/80 px-5 py-4 text-base text-dark placeholder-gray-400 focus:border-gray-300 focus:outline-none shadow-sm"
                />
                <button
                  onClick={onNext}
                  className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800 shadow-sm"
                  aria-label="Next"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <button
              onClick={onSkip}
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-dark transition-colors w-fit"
            >
              Skip <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right side — Nielsen quote */}
          <div className="hidden lg:flex flex-col justify-center py-12">
            <QuoteCard quote={QUOTE_CARDS[1]} />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 4 — PROFESSION
// ═════════════════════════════════════════════════════════════════

function ProfessionStep({ profession, setProfession, onNext, onBack, error }: {
  profession: string;
  setProfession: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  error: string;
}) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] items-start">
          <div className="flex flex-col justify-center py-12">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-dark hover:text-gray-600 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="text-3xl font-light text-gray-500 lg:text-4xl leading-tight">
              What's your <span className="font-bold text-dark">profession?</span>
            </h1>

            <div className="mt-8 max-w-lg">
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onNext()}
                placeholder="Type in your profession"
                autoFocus
                className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-base text-dark placeholder-gray-400 focus:border-gray-300 focus:outline-none shadow-sm"
              />
              {error && <p className="mt-2 text-sm text-primary">{error}</p>}
            </div>
          </div>

          {/* Right side — Ernest testimonial */}
          <div className="hidden lg:flex flex-col justify-center py-12">
            <TestimonialCard testimonial={TESTIMONIALS[1]} />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 5 — LOCATION
// ═════════════════════════════════════════════════════════════════

function LocationStep({ locationText, setLocationText, suggestions, showSuggestions, suggestionsRef, onSelectSuggestion, onNext, onBack, error }: {
  locationText: string;
  setLocationText: (v: string) => void;
  suggestions: GeoapifySuggestion[];
  showSuggestions: boolean;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  onSelectSuggestion: (s: GeoapifySuggestion) => void;
  onNext: () => void;
  onBack: () => void;
  error: string;
}) {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr,400px] items-start">
          <div className="flex flex-col justify-center py-12">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-dark hover:text-gray-600 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="text-3xl font-light text-gray-500 lg:text-4xl leading-tight">
              Where are you <span className="font-bold text-dark">located?</span>
            </h1>

            <div className="mt-8 max-w-lg relative" ref={suggestionsRef}>
              <div className="flex items-center gap-0">
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => { setLocationText(e.target.value); }}
                  onKeyDown={(e) => e.key === 'Enter' && onNext()}
                  placeholder="Find your location"
                  autoFocus
                  className="flex-1 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50/80 px-5 py-4 text-base text-dark placeholder-gray-400 focus:border-gray-300 focus:outline-none shadow-sm"
                />
                <button
                  onClick={onNext}
                  className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-r-xl bg-dark text-white transition-colors hover:bg-gray-800 shadow-sm"
                  aria-label="Next"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>

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

              {error && <p className="mt-2 text-sm text-primary">{error}</p>}
            </div>
          </div>

          {/* Right side — Ernest testimonial */}
          <div className="hidden lg:flex flex-col justify-center py-12">
            <TestimonialCard testimonial={TESTIMONIALS[1]} />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
// STEP 6 — RESULTS
// ═════════════════════════════════════════════════════════════════

function ResultsStep({ locationText, setLocationText, suggestions, showSuggestions, suggestionsRef, onSelectSuggestion, onSearch, onBack, chapters, isLoading, formatFilter, setFormatFilter, showDatePicker, onChooseDate, onDateSelect, mapEmbedUrl }: {
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
    <section className="bg-white min-h-[calc(100vh-80px)]">
      <Container>
        {/* Header */}
        <div className="border-b border-gray-200 py-6">
          <h2 className="text-2xl font-light text-gray-500 lg:text-3xl">
            Search result for <span className="font-bold text-dark">the location {locationText.split(',')[0]}</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm font-semibold text-dark hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="relative flex-1 max-w-md" ref={suggestionsRef}>
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-dark focus:border-primary focus:outline-none"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectSuggestion(s)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      {s.properties.formatted}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:+18008258286"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-dark transition-colors"
            >
              Request a Call Back
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <Phone className="h-4 w-4" />
              </span>
            </a>
          </div>

          {/* Format filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
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

            <label className="ml-4 flex items-center gap-2 text-sm text-gray-500">
              <span>Include forming Chapters</span>
              <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform" />
              </div>
            </label>

            <button className="ml-auto flex items-center gap-1.5 text-sm text-gray-500 hover:text-dark transition-colors">
              <Users className="h-4 w-4" /> Sort By
            </button>
          </div>
        </div>

        {/* Content: chapters + map */}
        <div className="grid gap-0 lg:grid-cols-[1fr,1fr]">
          <div className="max-h-[calc(100vh-320px)] overflow-y-auto py-6 pr-6">
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
            <div className="sticky top-0 h-[calc(100vh-320px)]">
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

// ═════════════════════════════════════════════════════════════════
// CHAPTER CARD
// ═════════════════════════════════════════════════════════════════

function ChapterCard({ chapter, isDatePickerOpen, onChooseDate, onDateSelect }: {
  chapter: Chapter;
  isDatePickerOpen: boolean;
  onChooseDate: () => void;
  onDateSelect: (date: Date) => void;
}) {
  const upcomingDates = getUpcomingDates(chapter.meetingSchedule?.dayOfWeek ?? 'Tuesday', 6);

  return (
    <div className={`rounded-xl border-2 bg-white p-5 transition-all ${isDatePickerOpen ? 'border-primary shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-primary">{chapter.name}</h3>
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      <button
        onClick={onChooseDate}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Choose Date to Visit
        <Calendar className="h-4 w-4" />
      </button>

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

      <div className="mt-4 flex items-start gap-4 text-sm text-gray-600">
        <div>
          <p className="text-xs font-semibold text-gray-400">Meeting Time</p>
          <p className="font-bold text-dark">{chapter.meetingSchedule?.dayOfWeek ?? 'Tuesday'},</p>
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
// TESTIMONIAL CARD
// ═════════════════════════════════════════════════════════════════

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="h-20 w-20 shrink-0 rounded-full border-4 border-gray-100 object-cover"
      />
      <div>
        <p className="text-sm leading-relaxed text-gray-500">{testimonial.quote}</p>
        <p className="mt-3 text-sm font-bold text-dark">{testimonial.name}</p>
        <p className="text-xs text-gray-500">{testimonial.company}</p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// QUOTE CARD (Deloitte, Nielsen style)
// ═════════════════════════════════════════════════════════════════

function QuoteCard({ quote }: { quote: typeof QUOTE_CARDS[0] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${quote.logoBg}`}>
          <span className={`text-lg font-bold ${quote.logoColor}`}>{quote.logo}</span>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-gray-600">{quote.quote}</p>
          <p className="mt-2 text-sm font-bold text-dark">— {quote.source}</p>
        </div>
      </div>
    </div>
  );
}
