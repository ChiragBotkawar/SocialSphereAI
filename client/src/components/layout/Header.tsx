import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Search, Facebook, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { NAV_ITEMS, type NavItem } from '../../utils/constants';
import MobileNav from './MobileNav';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Detect scroll for sticky shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-white transition-shadow duration-300',
          isScrolled ? 'shadow-md' : 'shadow-sm',
        )}
      >
        <div className="container-bni flex h-[96px] items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0" aria-label="BNI Home">
            <span className="text-[2.6rem] font-black text-primary tracking-tight leading-none">BNI</span>
            <span className="text-[2rem] font-black text-primary leading-none pb-1">.</span>
          </Link>

          {/* Desktop nav — pill centered */}
          <div className="hidden xl:flex items-center flex-1 justify-center">
            <div className="flex items-center bg-[#F5F5F5] rounded-full px-6 py-3.5">

              {/* Nav links */}
              <nav className="flex items-center gap-7" role="navigation">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.megaMenu && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.megaMenu ? (
                      <button
                        className={cn(
                          'flex items-center gap-1 text-[15px] font-normal text-gray-900 hover:text-primary transition-colors whitespace-nowrap',
                          activeDropdown === item.label && 'text-primary',
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn('h-4 w-4 transition-transform duration-200', activeDropdown === item.label && 'rotate-180')}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.href ?? '#'}
                        className={({ isActive }) => cn(
                          'text-[15px] font-normal text-gray-900 hover:text-primary transition-colors whitespace-nowrap',
                          isActive && 'text-primary'
                        )}
                      >
                        {item.label}
                      </NavLink>
                    )}

                    {/* Mega Menu Dropdown */}
                    {item.megaMenu && activeDropdown === item.label && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[950px]">
                        <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-8">
                          {/* Search bar */}
                          <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search"
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-primary focus:bg-white transition-colors"
                            />
                          </div>

                          {/* Three columns */}
                          <div className="grid grid-cols-3 gap-8 mb-6">
                            {item.megaMenu!.columns.map((column, idx: number) => (
                              <div key={idx}>
                                {column.heading && (
                                  <h3 className="text-[15px] font-semibold text-dark mb-3">{column.heading}</h3>
                                )}
                                <div className="space-y-2">
                                  {column.items.map((link: { label: string; href: string }) => (
                                    <NavLink
                                      key={link.label}
                                      to={link.href}
                                      className={({ isActive }) =>
                                        cn(
                                          'block text-[15px] text-gray-700 hover:text-primary transition-colors py-1',
                                          isActive && 'text-primary font-medium',
                                        )
                                      }
                                    >
                                      {link.label}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Promotional banner */}
                          <div className="relative overflow-hidden rounded-lg mb-6" style={{ height: '140px' }}>
                            <img
                              src="https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=900&q=80"
                              alt="BNI Global Convention"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                            <div className="relative h-full flex items-center px-6">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded bg-white">
                                    <span className="text-sm font-black text-primary">B</span>
                                  </div>
                                  <div className="text-white text-xs">
                                    <div className="font-semibold">Experience</div>
                                    <div>the <strong>2026 BNI Global</strong></div>
                                    <div><strong>Convention</strong> in Monaco!</div>
                                  </div>
                                </div>
                                <button className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors">
                                  Click Here To Register
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Social icons */}
                          <div className="flex items-center gap-4 justify-center">
                            <a href="https://facebook.com/bni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                              <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/company/bni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                              <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com/bni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                              <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com/bni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                              <Youtube className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com/bni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                              <Twitter className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

            </div>
          </div>

          {/* Right actions: email + CTA */}
          <div className="hidden xl:flex items-center gap-5 shrink-0">
            <a
              href="mailto:support@bni.com"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="text-[15px] font-medium whitespace-nowrap">support@bni.com</span>
            </a>
            <Link
              to="/find-a-chapter"
              className="inline-flex bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-colors shadow-md whitespace-nowrap"
            >
              GET INVITED
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="inline-flex xl:hidden items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
