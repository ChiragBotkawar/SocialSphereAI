import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Youtube, Twitter, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Container from '../components/ui/Container';

/* ─── Countries list for dropdown ────────────────────────────── */
const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Singapore',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Finland',
  'Ireland', 'New Zealand', 'Brazil', 'Argentina', 'Mexico', 'China', 'Japan',
  'South Korea', 'Sri Lanka', 'Vietnam', 'Turkey', 'South Africa', 'Nigeria',
  'Kenya', 'UAE', 'Saudi Arabia', 'Israel', 'Poland', 'Switzerland', 'Austria',
  'Belgium', 'Denmark', 'Norway', 'Portugal', 'Czech Republic', 'Romania',
  'Hungary', 'Thailand', 'Malaysia', 'Philippines', 'Indonesia', 'Colombia',
  'Chile', 'Peru', 'Puerto Rico', 'Pakistan', 'Bangladesh', 'Other',
];

/* ─── Help topics ────────────────────────────────────────────── */
const HELP_TOPICS = [
  'General Enquiry', 'Membership Information', 'Start a Chapter',
  'Visiting a Chapter', 'Technical Support', 'Media / Press',
  'Partnerships', 'Careers', 'Other',
];

/* ─── Social links ───────────────────────────────────────────── */
const SOCIALS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'X' },
];

/* ─── Global Offices data ────────────────────────────────────── */
const OFFICES = [
  { city: 'Castlebar', image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&h=300&fit=crop' },
  { city: 'Charlotte (HQ)', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
  { city: 'Colombo', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
  { city: 'Gothenburg', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=400&h=300&fit=crop' },
  { city: 'Hong Kong', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop' },
  { city: 'Kuala Lumpur', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop' },
  { city: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop' },
  { city: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop' },
  { city: 'New Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop' },
  { city: 'São Paulo', image: 'https://images.unsplash.com/photo-1543059080-cefa5cef3e11?w=400&h=300&fit=crop' },
  { city: 'Shanghai', image: 'https://images.unsplash.com/photo-1537519646099-7ffb05e905e0?w=400&h=300&fit=crop' },
  { city: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop' },
  { city: 'Stockholm', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&h=300&fit=crop' },
  { city: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop' },
  { city: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop' },
  { city: 'Toronto', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=300&fit=crop' },
];

const ITEMS_PER_PAGE = 4;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', country: '', postalCode: '',
    phone: '', email: '', helpTopic: '', message: '',
    newsletter: false, agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [officePage, setOfficePage] = useState(0);

  const totalOfficePages = Math.ceil(OFFICES.length / ITEMS_PER_PAGE);
  const visibleOffices = OFFICES.slice(officePage * ITEMS_PER_PAGE, (officePage + 1) * ITEMS_PER_PAGE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | BWN</title>
        <meta name="description" content="Contact BWN — for general enquiries, membership information, starting a chapter, or media requests." />
      </Helmet>

      {/* ── "Contact Us" Title ─────────────────────────────────────── */}
      <section className="bg-white pt-10 pb-2">
        <Container>
          <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
        </Container>
      </section>

      {/* ── Hero building image ────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=500&fit=crop"
              alt="BWN Global Headquarters"
              className="h-[300px] w-full object-cover md:h-[420px] lg:h-[480px]"
            />
          </div>
        </Container>
      </section>

      {/* ── Get in Touch + Form ────────────────────────────────────── */}
      <section className="bg-[#fafafa] py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact info */}
            <div>
              <h2 className="text-3xl font-black text-dark lg:text-4xl">
                Get In <span className="text-primary">Touch</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-500">
                Have a question or need more information? Whether you&apos;re interested in
                membership, learning about Chapters, or exploring franchise
                opportunities, we&apos;re here to help. Reach out, and our team will connect
                you with the right resources.
              </p>

              {/* Addresses */}
              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-dark">Mailing Address:</p>
                    <p className="text-sm text-gray-600">
                      8240 Ballantyne Commons<br />
                      Pkwy PO Box #49248<br />
                      Charlotte, NC 28277
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-dark">Office Address:</p>
                    <p className="text-sm text-gray-600">
                      3430 Toringdon Way, Suite<br />
                      300 Charlotte, NC 28277
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-sm text-gray-600">(800)-825-8286</p>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-sm text-gray-600">support@bni.com</p>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8">
                <p className="mb-3 font-bold text-primary">Follow BWN</p>
                <div className="flex gap-4">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="text-gray-400 transition-colors hover:text-primary"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We&apos;ll respond shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', country: '', postalCode: '', phone: '', email: '', helpTopic: '', message: '', newsletter: false, agreeTerms: false }); }}
                    className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="mb-8 text-center text-2xl font-bold text-primary">
                    Drop us a Line
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Names */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          First Name <span className="text-primary">*</span>
                        </label>
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          required
                          className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          Last Name <span className="text-primary">*</span>
                        </label>
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                          className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Row 2: Country + Postal */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          Country <span className="text-primary">*</span>
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                        >
                          <option value="">Select the country</option>
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          Postal Code <span className="text-primary">*</span>
                        </label>
                        <input
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder="Enter your postal code"
                          required
                          className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Row 3: Phone + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                          className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-gray-600">
                          E-Mail <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your e-mail Address"
                            required
                            className="w-full border-b border-gray-300 bg-transparent py-2 pr-8 text-sm outline-none transition-colors focus:border-primary"
                          />
                          <Mail className="absolute right-0 top-2.5 h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* How can we help */}
                    <div>
                      <select
                        name="helpTopic"
                        value={formData.helpTopic}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-gray-500 outline-none transition-colors focus:border-primary"
                      >
                        <option value="">How can we Help?</option>
                        {HELP_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1 block text-sm text-gray-600">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        rows={3}
                        className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="mt-0.5"
                        />
                        I would like to sign up to receive BWN&apos;s monthly newsletter, BWN SuccessNet™.
                      </label>
                      <label className="flex items-start gap-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                          className="mt-0.5"
                        />
                        <span>
                          I agree to be contacted by BWN according to the{' '}
                          <a href="#" className="font-semibold text-dark underline">Privacy Policy</a> and{' '}
                          <a href="#" className="font-semibold text-dark underline">Terms and Conditions</a>.
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full max-w-[200px] rounded-full bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 sm:w-auto sm:px-12"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Google Maps ────────────────────────────────────────────── */}
      <section className="bg-white py-8">
        <Container>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <iframe
              title="BWN Global Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.069792498!2d-80.8386!3d35.0555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885421c9f3f2f1c1%3A0x24e7aa1f9f11d4ef!2s3430%20Toringdon%20Way%20Suite%20300%2C%20Charlotte%2C%20NC%2028277!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      {/* ── Global Offices carousel ────────────────────────────────── */}
      <section className="bg-white py-16">
        <Container>
          {/* Header */}
          <div className="mb-10 grid items-start gap-6 lg:grid-cols-2">
            <h2 className="text-4xl font-light text-dark">
              Global <span className="font-black italic text-primary">Offices</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-gray-500">
              BWN&apos;s global presence spans across numerous countries, with offices
              strategically located to support our ever-growing network of Members
              worldwide. These offices ensure that entrepreneurs and business
              professionals have access to the resources and connections they need
              to grow their business.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {visibleOffices.map((office) => (
              <div key={office.city} className="text-center">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="h-[200px] w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">{office.city}</p>
              </div>
            ))}
          </div>

          {/* Dots pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalOfficePages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setOfficePage(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === officePage ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
