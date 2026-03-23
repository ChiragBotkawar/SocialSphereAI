import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import { contactService } from '../services/contactService';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

// ─── HOW IT WORKS STEPS ─────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Contact your Local BNI Team',
    description: 'Your regional team will talk you through the options for getting started and introduce you to fellow business owners who have successfully launched BNI Chapters. You\'ll also meet the team who will be guiding you through the process.',
  },
  {
    number: '02',
    title: 'Attend an Interest Meeting',
    description: 'Interest Meetings talk you through the steps of starting a BNI Chapter. You may also be invited to visit an existing Chapter to see how it works, and how it helps members to grow their businesses.',
  },
  {
    number: '03',
    title: 'Form a Core Group',
    description: 'Together with your local BNI team, you\'ll start building your Core Group — a team of founding members who share your vision. This is where your chapter begins to take shape.',
  },
  {
    number: '04',
    title: 'Launch Your Chapter',
    description: 'Once you have enough committed members, your chapter will officially launch. BNI will support you with training, resources, and ongoing guidance to ensure a successful start.',
  },
];

// ─── COUNTRIES LIST ─────────────────────────────────────────────

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'India',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Sweden',
  'Singapore', 'China', 'Japan', 'Brazil', 'Mexico', 'Argentina',
  'South Africa', 'New Zealand', 'Ireland', 'Finland', 'Vietnam',
  'Sri Lanka', 'Puerto Rico', 'Other',
];

export default function StartChapterPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', country: '', postalCode: '',
    phone: '', email: '', message: '',
    newsletter: false, agreePrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.country) errs.country = 'Country is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.agreePrivacy) errs.agreePrivacy = 'You must agree to the Privacy Policy and Terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await contactService.submitContact({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        subject: 'Start a Chapter Enquiry',
        message: formData.message || `Country: ${formData.country}, Postal Code: ${formData.postalCode}`,
        inquiryType: 'Start a Chapter',
        country: formData.country,
      });
      toast.success('Enquiry sent! A BNI representative will contact you soon.');
      setIsSuccess(true);
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Start a BNI Chapter | Launch in Your Area</title>
        <meta name="description" content="Start a new BNI Chapter in your area. Fill out the form and our team will guide you through the process." />
      </Helmet>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* ── LEFT: Info + How it Works ──────────────────── */}
            <div>
              <h1 className="text-4xl font-light text-dark lg:text-5xl">
                Start a <span className="font-black text-primary">BNI Chapter</span>
              </h1>

              <p className="mt-6 max-w-lg text-gray-500 leading-relaxed">
                Starting a new BNI Chapter is a powerful way to grow your business and support your local business community.
              </p>
              <p className="mt-4 max-w-lg text-gray-500 leading-relaxed">
                If your business category is already represented in local Chapters, your regional <span className="font-semibold text-dark">BNI team</span> will support you in creating a new one.
              </p>

              {/* How it Works */}
              <h2 className="mt-14 text-2xl font-light text-dark">
                How it <span className="font-black text-primary">Works</span>
              </h2>

              <div className="mt-8 space-y-0">
                {STEPS.map((step, i) => (
                  <div key={step.number} className="flex gap-6">
                    {/* Number + vertical line */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black text-primary">{step.number}</span>
                      {i < STEPS.length - 1 && (
                        <div className="mt-2 flex-1 w-px bg-gray-200" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-10">
                      <h3 className="text-lg font-bold text-dark">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ───────────────────────────────── */}
            <div className="rounded-2xl bg-light-bg p-8 lg:p-10">
              {isSuccess ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-dark">Thank you!</h3>
                  <p className="text-sm text-gray-600">A BNI representative will reach out to discuss next steps.</p>
                  <button onClick={() => { setIsSuccess(false); setFormData({ firstName: '', lastName: '', country: '', postalCode: '', phone: '', email: '', message: '', newsletter: false, agreePrivacy: false }); }} className="btn-secondary mt-2">
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name / Last Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        First Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.firstName && <p className="mt-1 text-xs text-primary">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        Last Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.lastName && <p className="mt-1 text-xs text-primary">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Country / Postal Code */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        Country <span className="text-primary">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                      >
                        <option value="">Select the country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-1 text-xs text-primary">{errors.country}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        Postal Code <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                        placeholder="Enter your postal code"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.postalCode && <p className="mt-1 text-xs text-primary">{errors.postalCode}</p>}
                    </div>
                  </div>

                  {/* Phone / Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-bold text-dark">
                        E-mail <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Enter your e-mail address"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.email && <p className="mt-1 text-xs text-primary">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-dark">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      rows={4}
                      placeholder="Message"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-dark placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => updateField('newsletter', e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to sign up to receive BNI's monthly newsletter, BNI SuccessNet™.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreePrivacy}
                        onChange={(e) => updateField('agreePrivacy', e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to be contacted by BNI according to the{' '}
                        <a href="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</a>
                        {' '}and{' '}
                        <a href="/terms" className="font-semibold text-primary hover:underline">Terms and Conditions</a>.
                      </span>
                    </label>
                    {errors.agreePrivacy && <p className="text-xs text-primary">{errors.agreePrivacy}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
