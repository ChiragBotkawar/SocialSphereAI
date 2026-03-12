import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function ScrollToTopRoute() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-none"
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTopRoute />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
