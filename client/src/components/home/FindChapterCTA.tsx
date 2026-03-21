import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import Container from '../ui/Container';

export default function FindChapterCTA() {
  return (
    <section className="section-padding bg-primary">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-black text-white lg:text-4xl">
              Find a BWN Chapter Near You
            </h2>
            <p className="mt-3 max-w-xl text-red-100">
              With 11,600+ chapters in 76 countries, there's a BWN chapter close to you. Visit as a guest for free before committing.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link to="/find-a-chapter" className="btn-white flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Chapters
            </Link>
            <Link to="/start-a-chapter" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Start a Chapter
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
