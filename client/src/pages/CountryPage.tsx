import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Globe } from 'lucide-react';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Spinner from '../components/ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import { countryService } from '../services/countryService';
import { chapterService } from '../services/chapterService';

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: country, isLoading: loadingCountry } = useQuery({
    queryKey: ['country', slug],
    queryFn: () => countryService.getCountry(slug!),
    enabled: !!slug,
  });

  const { data: chaptersData } = useQuery({
    queryKey: ['chapters', 'country', country?._id],
    queryFn: () => chapterService.getChapters({ country: country!._id, limit: 12 }),
    enabled: !!country?._id,
  });

  if (loadingCountry) return <div className="flex min-h-screen items-center justify-center"><Spinner size="lg" /></div>;
  if (!country) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Country not found.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>BWN {country.name} | Chapters & Membership</title>
        <meta name="description" content={`Discover BWN in ${country.name}. Find local chapters, meet business professionals, and grow your network.`} />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-dark py-24 overflow-hidden">
        {country.heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${country.heroImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-dark to-dark/80" />
        <Container className="relative z-10">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-black text-white lg:text-5xl">BWN {country.name}</h1>
              <p className="text-primary font-medium">{country.region}</p>
            </div>
          </div>
          {country.description && <p className="mt-4 max-w-xl text-gray-300">{country.description}</p>}
          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-black text-primary">{country.chapterCount?.toLocaleString() ?? '—'}</p>
              <p className="text-sm text-gray-400">Chapters</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">{country.memberCount?.toLocaleString() ?? '—'}</p>
              <p className="text-sm text-gray-400">Members</p>
            </div>
          </div>
        </Container>
      </section>

      {/* National Director */}
      {country.nationalDirector?.name && (
        <section className="bg-white py-12">
          <Container>
            <div className="card max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">National Director</p>
              <p className="text-lg font-bold text-dark">{country.nationalDirector.name}</p>
              {country.nationalDirector.email && (
                <a href={`mailto:${country.nationalDirector.email}`} className="text-sm text-primary hover:underline">
                  {country.nationalDirector.email}
                </a>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Chapters in this country */}
      {chaptersData?.data?.length ? (
        <section className="section-padding bg-light-bg">
          <Container>
            <SectionTitle eyebrow="Chapters" title={`BWN Chapters in ${country.name}`} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {chaptersData.data.map((ch) => (
                <div key={ch._id} className="card">
                  <h3 className="mb-2 font-bold text-dark">{ch.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{ch.city}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{ch.memberCount} members</div>
                  </div>
                  <Link to={`/find-a-chapter`} className="btn-secondary mt-4 inline-block text-sm px-4 py-2">
                    Request Visit
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
