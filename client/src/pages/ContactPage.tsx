import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import { contactService } from '../services/contactService';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(4, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  country: z.string().optional(),
});

type ContactForm = z.infer<typeof schema>;

const INQUIRY_TYPES = [
  'General Enquiry', 'Membership', 'Start a Chapter', 'Media / Press', 'Partnerships', 'Careers', 'Other',
];

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    await contactService.submitContact(data);
    toast.success('Message sent! We\'ll be in touch within 24 hours.');
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact BWN | Get in Touch</title>
        <meta name="description" content="Contact BWN — for general enquiries, membership information, starting a chapter, or media requests." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <div className="max-w-xl">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Get in Touch</span>
            <h1 className="mb-4 text-4xl font-black text-white">Contact Us</h1>
            <p className="text-gray-300">Have a question about BWN? We're here to help. Fill in the form and our team will respond within 24 hours.</p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-light-bg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-6">
              <SectionTitle eyebrow="Contact Info" title="How to Reach Us" centered={false} className="mb-6" />
              {[
                { label: 'Global Headquarters', value: '545 College Commerce Way, Upland, CA 91786, USA' },
                { label: 'Phone', value: '1-800-522-1717' },
                { label: 'Email', value: 'support@BWN.com' },
                { label: 'Office Hours', value: 'Mon–Fri 8am–5pm PST' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
                  <p className="mt-1 text-sm text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card">
                {isSubmitSuccessful ? (
                  <div className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-dark">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for reaching out. We'll respond within 24 hours.</p>
                    <button onClick={() => reset()} className="btn-primary">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input label="Full Name *" {...register('name')} error={errors.name?.message} />
                      <Input label="Email *" type="email" {...register('email')} error={errors.email?.message} />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />
                      <Input label="Country" {...register('country')} error={errors.country?.message} />
                    </div>
                    <div>
                      <label className="form-label">Inquiry Type *</label>
                      <select {...register('inquiryType')} className="form-input">
                        <option value="">Select...</option>
                        {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.inquiryType && <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>}
                    </div>
                    <Input label="Subject *" {...register('subject')} error={errors.subject?.message} />
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea {...register('message')} rows={5} className="form-input" placeholder="Tell us how we can help..." />
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" isLoading={isSubmitting} className="w-full justify-center">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
