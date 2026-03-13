import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, MapPin, Clock, Users } from 'lucide-react';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { useChapters } from '../hooks/useChapters';
import { visitRequestService } from '../services/visitRequestService';
import { getMeetingDisplay } from '../utils/helpers';
import toast from 'react-hot-toast';
import type { Chapter } from '../types';

const visitSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  profession: z.string().min(2),
  company: z.string().min(2),
  city: z.string().min(2),
  message: z.string().optional(),
  preferredDate: z.string().min(1, 'Please pick a date'),
});

type VisitForm = z.infer<typeof visitSchema>;

export default function FindChapterPage() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const { data, isLoading } = useChapters({ search, city, limit: 20 });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<VisitForm>({
    resolver: zodResolver(visitSchema),
  });

  const onSubmit = async (values: VisitForm) => {
    if (!selectedChapter) return;
    try {
      await visitRequestService.submitVisitRequest({ ...values, chapter: selectedChapter._id });
      toast.success('Visit request submitted! Check your email for confirmation.');
      setSelectedChapter(null);
      reset();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Find a BNI Chapter | Search Chapters Near You</title>
        <meta name="description" content="Search for BNI chapters near you. Find meeting times, locations, and request a visit as a guest." />
      </Helmet>

      {/* Hero */}
      <section className="bg-dark py-16">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Find a Chapter</span>
            <h1 className="mb-4 text-4xl font-black text-white">Chapters Near You</h1>
            <p className="text-gray-300">Search 11,600+ chapters worldwide. Visit as a guest for free before joining.</p>
          </div>
        </Container>
      </section>

      {/* Search bar */}
      <section className="bg-white border-b py-6 shadow-sm">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by chapter name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="section-padding bg-light-bg">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : !data?.data?.length ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">No chapters found. Try a different search.</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-gray-500">{data.pagination?.total ?? data.data.length} chapters found</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.data.map((chapter) => (
                  <div key={chapter._id} className="card flex flex-col">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="font-bold text-dark">{chapter.name}</h3>
                      <Badge variant={chapter.isActive ? 'red' : 'gray'}>{chapter.isActive ? 'Active' : 'Inactive'}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        {chapter.city}{chapter.state ? `, ${chapter.state}` : ''}
                      </div>
                      {chapter.meetingSchedule && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary shrink-0" />
                          {getMeetingDisplay(chapter.meetingSchedule)}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary shrink-0" />
                        {chapter.memberCount} members
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedChapter(chapter)}
                      className="btn-primary mt-4 w-full justify-center"
                    >
                      Request a Visit
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Visit request modal */}
      <Modal
        isOpen={!!selectedChapter}
        onClose={() => setSelectedChapter(null)}
        title={`Request to Visit — ${selectedChapter?.name ?? ''}`}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" {...register('firstName')} error={errors.firstName?.message} />
            <Input label="Last Name" {...register('lastName')} error={errors.lastName?.message} />
          </div>
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Profession" {...register('profession')} error={errors.profession?.message} />
            <Input label="Company" {...register('company')} error={errors.company?.message} />
          </div>
          <Input label="City" {...register('city')} error={errors.city?.message} />
          <Input label="Preferred Visit Date" type="date" {...register('preferredDate')} error={errors.preferredDate?.message} />
          <div>
            <label className="form-label">Message (optional)</label>
            <textarea {...register('message')} rows={3} className="form-input" placeholder="Any questions or information you'd like to share..." />
          </div>
          <Button type="submit" isLoading={isSubmitting} className="w-full justify-center">
            Submit Request
          </Button>
        </form>
      </Modal>
    </>
  );
}
