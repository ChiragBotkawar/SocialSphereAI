import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | BWN</title></Helmet>
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="text-5xl font-black text-primary">404</span>
        </div>
        <div>
          <h1 className="text-3xl font-black text-dark">Page Not Found</h1>
          <p className="mt-2 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link to="/find-a-chapter" className="btn-secondary flex items-center gap-2">
            <Search className="h-4 w-4" /> Find a Chapter
          </Link>
        </div>
      </div>
    </>
  );
}
