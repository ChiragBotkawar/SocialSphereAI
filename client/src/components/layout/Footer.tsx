import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

/* X (Twitter) icon — lucide dropped it, draw inline */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.018 2.25H8.08l4.253 5.623L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

/* ── Column data ─────────────────────────────────────────────────────────── */
const COL1 = [
  { label: 'The BWN Experience', href: '/the-bwn-experience' },
  { label: 'Our Global Community', href: '/about' },
  { label: 'My BWN Story', href: '/success-stories' },
  { label: 'BWN Franchising', href: '/bwn-franchising', newTab: true },
];

const COL2_HEADING = 'About Us';
const COL2 = [
  { label: 'Leadership', href: '/about/leadership' },
  { label: 'National Directors', href: '/about/national-directors' },
  { label: 'Our Founder', href: '/about/our-founder' },
  { label: 'BWN® Foundation', href: '/about/bwn-foundation' },
];

const COL3_HEADING = 'Blog & News';
const COL3 = [
  { label: 'In The Media', href: '/in-the-media' },
  { label: 'Networking Tips', href: '/networking-tips' },
  { label: 'Global Events', href: '/events' },
  { label: 'Careers', href: '/careers' },
];

const COL4 = [
  { label: 'Find a Chapter', href: '/find-a-chapter' },
  { label: 'Start a Chapter', href: '/start-a-chapter' },
  { label: 'Exclusive Member Benefits', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

const COL5_HEADING = 'Member Services';
const COL5 = [
  { label: 'BWN Connect', href: '#' },
  { label: 'BWN Academy', href: '#' },
  { label: 'BWN Brandshare', href: '#' },
  { label: 'BWN US Store', href: '#' },
  { label: 'BWN Global Store', href: '#' },
];

const BG = '#6B6B6B';
const TEXT = 'text-gray-200';
const HOVER = 'hover:text-white transition-colors duration-150';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ backgroundColor: BG }} className="text-gray-300">
      {/* ── Main link grid ──────────────────────────────────────────────── */}
      <div className="container-bni py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">

          {/* Col 1 — no heading */}
          <ul className="space-y-3">
            {COL1.map(l => (
              <li key={l.label}>
                {l.newTab ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold ${TEXT} ${HOVER}`}>{l.label}</a>
                ) : (
                  <Link to={l.href} className={`text-sm font-semibold ${TEXT} ${HOVER}`}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>

          {/* Col 2 — About Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">{COL2_HEADING}</h3>
            <ul className="space-y-3">
              {COL2.map(l => (
                <li key={l.label}>
                  <Link to={l.href} className={`text-sm ${TEXT} ${HOVER}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — The Latest */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">{COL3_HEADING}</h3>
            <ul className="space-y-3">
              {COL3.map(l => (
                <li key={l.label}>
                  <Link to={l.href} className={`text-sm ${TEXT} ${HOVER}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — no heading */}
          <ul className="space-y-3">
            {COL4.map(l => (
              <li key={l.label}>
                <Link to={l.href} className={`text-sm ${TEXT} ${HOVER}`}>{l.label}</Link>
              </li>
            ))}
          </ul>

          {/* Col 5 — Member Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">{COL5_HEADING}</h3>
            <ul className="space-y-3">
              {COL5.map(l => (
                <li key={l.label}>
                  <Link to={l.href} className={`text-sm ${TEXT} ${HOVER}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 6 — Contact */}
          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gray-300" />
              <div>
                <p className="text-sm text-gray-200 font-medium">In U.S.</p>
                <p className="text-sm text-gray-300">(800)-825-8286</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gray-300" />
              <div>
                <p className="text-sm text-gray-200 font-medium">Outside U.S.</p>
                <a href="mailto:support@bwn.com" className={`text-sm text-gray-300 ${HOVER}`}>support@bwn.com</a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-300" />
              <p className="text-sm text-gray-300 leading-relaxed">
                3430 Toringdon Way,<br />Suite 300 Charlotte, NC 28277
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#5E5E5E' }} className="border-t border-white/10">
        <div className="container-bni py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left: SuccessNet blurb */}
            <div className="shrink-0">
              <p className="text-base font-black text-white tracking-tight">
                BWN SuccessNet<sup className="text-xs">TM</sup>
              </p>
              <p className="mt-0.5 text-xs text-gray-300">Sign up for exclusive networking tips and more.</p>
            </div>

            {/* Center: email form */}
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex items-center gap-0 rounded-full overflow-hidden bg-white shadow-md w-full max-w-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 min-w-0 px-5 py-3 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex-shrink-0 flex h-full items-center justify-center bg-primary hover:bg-primary-dark transition-colors px-5 py-3"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            </form>

            {/* Right: Follow BWN + socials */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm font-semibold text-white whitespace-nowrap">Follow BWN</span>
              <a href="https://www.facebook.com/BWNGlobal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={`text-gray-300 ${HOVER}`}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/bwn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-gray-300 ${HOVER}`}>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/bwnglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`text-gray-300 ${HOVER}`}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/user/BWNVideos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={`text-gray-300 ${HOVER}`}>
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/BWNGlobal" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className={`text-gray-300 ${HOVER}`}>
                <XIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Very bottom bar — legal links + copyright ──────────────────── */}
      <div style={{ backgroundColor: '#5E5E5E' }} className="border-t border-white/10">
        <div className="container-bni py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <a href="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">Terms and Conditions</a>
            </div>
            <p className="text-xs text-gray-400">&copy; 2026 BWN Global, LLC</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
