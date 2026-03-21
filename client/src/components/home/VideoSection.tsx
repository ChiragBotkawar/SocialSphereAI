import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding bg-dark">
      <Container>
        <div className="text-center mb-10">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">The BWN Experience</span>
          <h2 className="section-title text-white">See What BWN Can Do for You</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-300">
            Hear directly from BWN members worldwide about how the power of referrals transformed their businesses.
          </p>
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setPlaying(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
            alt="BWN Experience video thumbnail"
            className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Video modal */}
        {playing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setPlaying(false)}
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
                title="BWN Experience Video"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
