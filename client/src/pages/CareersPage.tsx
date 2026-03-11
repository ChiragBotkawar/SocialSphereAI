import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { careerService } from '../services/careerService';

const DEPARTMENTS = ['All', 'Technology', 'Marketing', 'Operations', 'MemberServices', 'Finance', 'HR', 'Leadership', 'Content'];

export default function CareersPage() {
  const [dept, setDept] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['careers', dept],
    queryFn: () => careerService.getCareers({ department: dept || undefined }),
  });

  return (
    <>
      <Helmet>
        <title>Careers at BNI | Join Our Team</title>
        <meta name="description" content="Explore career opportunities at BNI. Join a global team helping business professionals connect and grow worldwide." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Careers</span>
          <h1 className="text-4xl font-black text-white lg:text-5xl">Join the BNI Team</h1>
          <p className="mt-4 max-w-xl text-gray-300">Help us empower business professionals across the world. Explore our open positions.</p>
        </Container>
      </section>

      {/* Why work here */}
      <section className="section-padding bg-white">
        <Container>
          <SectionTitle eyebrow="Culture & Benefits" title="Why Work at BNI" />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { title: 'Global Impact', desc: 'Help millions of businesses grow worldwide' },
              { title: 'Flexible Work', desc: 'Remote-friendly roles across all departments' },
              { title: 'Learning Culture', desc: 'Continuous training and professional development' },
              { title: 'Inclusive Team', desc: 'Diverse, collaborative, and supportive environment' },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <h3 className="mb-2 font-bold text-dark">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Job listings */}
      <section className="section-padding bg-light-bg">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d === 'All' ? '' : d)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${(d === 'All' && !dept) || dept === d ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {d}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : !data?.data?.length ? (
            <p className="py-20 text-center text-gray-500">No open positions right now. Check back soon!</p>
          ) : (
            <div className="space-y-4">
              {data.data.map((job) => (
                <div key={job._id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-dark">{job.title}</h3>
                      <Badge variant="red">{job.department}</Badge>
                      <Badge variant="gray">{job.employmentType}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {job.location?.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          {job.location.city}{job.location.isRemote ? ' (Remote)' : ''}
                        </span>
                      )}
                      {job.salary?.min && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-primary" />
                          {job.salary.currency} {job.salary.min.toLocaleString()}–{job.salary.max?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link to={`/careers/${job.slug}`} className="btn-primary shrink-0 px-6 py-2.5">
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
