import { Helmet } from 'react-helmet-async';
import { Star, TrendingUp, DollarSign } from 'lucide-react';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Spinner from '../components/ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import { testimonialService } from '../services/testimonialService';
import { getInitials } from '../utils/helpers';

export default function SuccessStoriesPage() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials', 'all'],
    queryFn: () => testimonialService.getTestimonials({ limit: 20 }),
  });

  return (
    <>
      <Helmet>
        <title>BNI Success Stories | Member Testimonials</title>
        <meta name="description" content="Hear from BNI members around the world who have grown their businesses through the power of referral networking." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Success Stories</span>
          <h1 className="text-4xl font-black text-white lg:text-5xl">Members Who Thrived</h1>
          <p className="mt-4 max-w-xl text-gray-300">Real results from real members. The power of Givers Gain® in action.</p>
        </Container>
      </section>

      {/* Stats banner */}
      <section className="bg-primary py-10">
        <Container>
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            <div>
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-red-200" />
              <p className="text-2xl font-black">17M+</p>
              <p className="text-sm text-red-200">Referrals passed annually</p>
            </div>
            <div>
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-red-200" />
              <p className="text-2xl font-black">$26.5B+</p>
              <p className="text-sm text-red-200">Business generated</p>
            </div>
            <div>
              <Star className="h-8 w-8 mx-auto mb-2 text-red-200" />
              <p className="text-2xl font-black">355K+</p>
              <p className="text-sm text-red-200">Active members</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-light-bg">
        <Container>
          <SectionTitle eyebrow="Testimonials" title="What Our Members Say" />
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(testimonials ?? []).map((t, i) => (
                <div key={i} className="card flex flex-col">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic leading-relaxed text-gray-700">"{t.content}"</p>
                  {(t.businessRevenue || t.yearsAsMember) && (
                    <div className="mt-4 flex gap-4 rounded-lg bg-primary/5 p-3 text-xs">
                      {t.businessRevenue && (
                        <div>
                          <p className="font-semibold text-primary">{t.businessRevenue}</p>
                          <p className="text-gray-500">Revenue generated</p>
                        </div>
                      )}
                      {t.yearsAsMember && (
                        <div>
                          <p className="font-semibold text-primary">{t.yearsAsMember} yrs</p>
                          <p className="text-gray-500">Member tenure</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shrink-0">
                      {getInitials(t.authorName)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark">{t.authorName}</p>
                      <p className="text-xs text-gray-500">{t.authorTitle}, {t.authorCompany}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
