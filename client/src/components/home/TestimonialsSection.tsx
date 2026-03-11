import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';
import Container from '../ui/Container';
import SectionTitle from '../ui/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { testimonialService } from '../../services/testimonialService';
import { getInitials } from '../../utils/helpers';

export default function TestimonialsSection() {
  const { data: testimonials } = useQuery({
    queryKey: ['testimonials', 'featured'],
    queryFn: () => testimonialService.getTestimonials({ featured: true, limit: 8 }),
  });

  const fallback = [
    { authorName: 'Rajesh Sharma', authorTitle: 'CEO', authorCompany: 'TechSolutions India', content: 'BNI completely transformed my business. Within 6 months of joining, I received over 40 qualified referrals and generated ₹25 lakhs in additional revenue.', rating: 5 },
    { authorName: 'Sarah Mitchell', authorTitle: 'Founder', authorCompany: 'Creative Studio NYC', content: 'The structured networking and accountability in BNI is unmatched. My chapter became my most valuable business partner.', rating: 5 },
    { authorName: 'Ahmed Al-Rashid', authorTitle: 'Managing Director', authorCompany: 'Gulf Trade Co', content: 'As a business owner in Dubai, BNI gave me a global network and local trusted relationships that no other platform could deliver.', rating: 5 },
  ];

  const displayData = testimonials?.length ? testimonials : fallback;

  return (
    <section className="section-padding bg-light-bg">
      <Container>
        <SectionTitle
          eyebrow="Success Stories"
          title="Members Who Transformed Their Business"
          subtitle="Real stories from real BNI members who leveraged the power of referrals to grow their revenue."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {displayData.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="card h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: ('rating' in t ? t.rating : 5) }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-700 italic">"{t.content}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shrink-0">
                    {getInitials(t.authorName)}
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{t.authorName}</p>
                    <p className="text-xs text-gray-500">{t.authorTitle}, {t.authorCompany}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
