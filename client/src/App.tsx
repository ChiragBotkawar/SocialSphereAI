import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

// Pages — lazy-loaded for code splitting
import { lazy, Suspense } from 'react';
import Spinner from './components/ui/Spinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BNIExperiencePage = lazy(() => import('./pages/BNIExperiencePage'));
const FindChapterPage = lazy(() => import('./pages/FindChapterPage'));
const StartChapterPage = lazy(() => import('./pages/StartChapterPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CountryPage = lazy(() => import('./pages/CountryPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const FranchisingPage = lazy(() => import('./pages/FranchisingPage'));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'));
const NationalDirectorsPage = lazy(() => import('./pages/NationalDirectorsPage'));
const OurFounderPage = lazy(() => import('./pages/OurFounderPage'));

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <Routes>
        <Route path="/bni-franchising" element={<FranchisingPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/leadership" element={<LeadershipPage />} />
          <Route path="about/national-directors" element={<NationalDirectorsPage />} />
          <Route path="about/our-founder" element={<OurFounderPage />} />
          <Route path="the-bni-experience" element={<BNIExperiencePage />} />
          <Route path="find-a-chapter" element={<FindChapterPage />} />
          <Route path="start-a-chapter" element={<StartChapterPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="success-stories" element={<SuccessStoriesPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="country/:slug" element={<CountryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
