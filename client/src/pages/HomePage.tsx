import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import WhyBNISection from '../components/home/WhyBNISection';
import BenefitsSection from '../components/home/BenefitsSection';
import VideoSection from '../components/home/VideoSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import HowToJoinSection from '../components/home/HowToJoinSection';
import FindChapterCTA from '../components/home/FindChapterCTA';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>BNI — Business Network International | Grow Through Referrals</title>
        <meta
          name="description"
          content="Join the world's largest business referral organisation. 355,000+ members across 11,600+ chapters in 76 countries generating $26.5B in business annually."
        />
      </Helmet>

      <HeroSection />
      <WhyBNISection />
      <BenefitsSection />
      <VideoSection />
      <TestimonialsSection />
      <HowToJoinSection />
      <FindChapterCTA />
    </>
  );
}
