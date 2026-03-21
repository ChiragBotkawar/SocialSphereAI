import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import { contactService } from '../services/contactService';
import toast from 'react-hot-toast';
import { CheckCircle, MapPin, Users, TrendingUp } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  subject: z.string().default('Start a Chapter Enquiry'),
  message: z.string().min(20, 'Please tell us more about your interest'),
  inquiryType: z.string().default('Start a Chapter'),
  country: z.string().min(2, 'Please enter your country'),
});

type FormData = z.infer<typeof schema>;

const REQUIREMENTS = [
  'A minimum of 20 founding members to launch',
  'A designated chapter leader and supporting committee',
  'A suitable weekly meeting venue in your area',
  'Commitment to BWN\u2019s code of ethics and membership standards',
  'Regional director approval and onboarding support',
];

export default function StartChapterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: 'Start a Chapter Enquiry', inquiryType: 'Start a Chapter' },
  });

  const onSubmit = async (data: FormData) => {
    await contactService.submitContact(data);
    toast.success('Enquiry sent! A BWN representative will contact you within 48 hours.');
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Start a BWN Chapter | Launch in Your Area</title>
        <meta name="description" content="Interested in starting a BWN chapter in your area? Learn the requirements and submit your interest." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Expand BWN</span>
          <h1 className="text-4xl font-black text-white lg:text-5xl">Start a Chapter</h1>
          <p className="mt-4 max-w-xl text-gray-300">Bring the power of BWN to your community. Launch a chapter and help local businesses thrive together.</p>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionTitle eyebrow="Why Start a Chapter" title="The Opportunity" centered={false} />
              <div className="space-y-6">
                {[
                  { Icon: MapPin, title: 'Serve Your Community', desc: 'Give local business owners access to a trusted, structured referral network.' },
                  { Icon: Users, title: 'Build Your Network', desc: 'As a chapter founder, you build deep relationships with the most motivated business professionals in your area.' },
                  { Icon: TrendingUp, title: 'Generate Revenue', desc: 'Chapter founders often become the most active referral recipients in the group.' },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">{title}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="mb-4 font-bold text-dark">Requirements</h3>
                <ul className="space-y-3">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <h2 className="mb-6 text-xl font-bold text-dark">Express Your Interest</h2>
              {isSubmitSuccessful ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="font-bold text-dark">Thank you!</h3>
                  <p className="text-sm text-gray-600">A BWN representative will reach out within 48 hours to discuss next steps.</p>
                  <button onClick={() => reset()} className="btn-secondary">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input label="Full Name *" {...register('name')} error={errors.name?.message} />
                  <Input label="Email *" type="email" {...register('email')} error={errors.email?.message} />
                  <Input label="Phone *" type="tel" {...register('phone')} error={errors.phone?.message} />
                  <Input label="Country *" {...register('country')} error={errors.country?.message} />
                  <div>
                    <label className="form-label">Tell us about your interest *</label>
                    <textarea {...register('message')} rows={4} className="form-input" placeholder="Where are you located? Do you already have potential members in mind?" />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" isLoading={isSubmitting} className="w-full justify-center">
                    Submit Interest
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
