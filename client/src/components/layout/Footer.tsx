import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import Container from '../ui/Container';

const SOCIAL_ENTRIES = [
  { name: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: Facebook },
  { name: 'Twitter', href: SOCIAL_LINKS.twitter, Icon: Twitter },
  { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { name: 'YouTube', href: SOCIAL_LINKS.youtube, Icon: Youtube },
];

const FOOTER_COLUMNS = [
  { heading: 'Company', links: FOOTER_LINKS.company },
  { heading: 'Network', links: FOOTER_LINKS.network },
  { heading: 'Regions', links: FOOTER_LINKS.regions },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-primary">
                <span className="text-lg font-black text-white">B</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                BNI<span className="text-primary">®</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Business Network International — the world's leading business referral organisation with over 300,000 members in 76+ countries.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_ENTRIES.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} BNI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
