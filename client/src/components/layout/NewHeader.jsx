import { useState } from 'react';
import { Mail, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const navItems = [
    { label: 'The BNI Experience', href: '/the-bni-experience' },
    { label: 'Our Global Community', href: '/find-a-chapter' },
    { label: 'My BNI Story', href: '/success-stories' },
    { label: 'BNI Franchising', href: '/start-a-chapter' },
    { label: 'About BNI', href: '/about', hasMegaMenu: true },
  ];

  return (
    <header className="relative bg-white shadow-sm">
      <div className="h-20 flex items-center justify-between mx-auto px-6" style={{ maxWidth: '1240px' }}>
        {/* Logo */}
        <div className="flex items-center" style={{ marginRight: '40px' }}>
          <a href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="BNI Logo" 
              className="h-[38px]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="h-[38px] flex items-center gap-2"
              style={{ display: 'none' }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded bg-[#d71920]">
                <span className="text-xl font-black text-white">B</span>
              </div>
              <span className="text-2xl font-black text-[#222222]">
                BNI<span className="text-[#d71920]">®</span>
              </span>
            </div>
          </a>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center flex-1 justify-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasMegaMenu && setIsMegaMenuOpen(true)}
              onMouseLeave={() => item.hasMegaMenu && setIsMegaMenuOpen(false)}
            >
              <a
                href={item.href}
                className="flex items-center text-[15px] font-medium text-[#222222] hover:text-[#cc0000] transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
                {item.hasMegaMenu && (
                  <ChevronDown 
                    className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Email */}
          <a
            href="mailto:support@bni.com"
            className="flex items-center gap-2 text-[#cc0000] hover:text-[#d71920] transition-colors duration-200"
          >
            <Mail className="h-5 w-5" />
            <span className="text-[15px] font-medium whitespace-nowrap">support@bni.com</span>
          </a>

          {/* CTA Button */}
          <a
            href="/find-a-chapter"
            className="px-[26px] py-3 rounded-full text-white text-[14px] font-semibold tracking-wide whitespace-nowrap shadow-md hover:opacity-90 transition-opacity duration-200"
            style={{
              background: 'linear-gradient(90deg, #d71920, #c40000)',
            }}
          >
            GET INVITED
          </a>
        </div>
      </div>

      {/* Mega Menu */}
      {isMegaMenuOpen && (
        <div
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <MegaMenu />
        </div>
      )}
    </header>
  );
}
