import { Search, Facebook, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';

export default function MegaMenu() {
  const column1 = {
    title: 'About Us',
    links: [
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'National Directors', href: '/about/directors' },
      { label: 'Our Founder', href: '/about/founder' },
      { label: 'BWN® Foundation', href: '/about/foundation' },
    ],
  };

  const column2 = {
    title: 'The Latest',
    links: [
      { label: 'Blog & News', href: '/blog' },
      { label: 'Networking Tips', href: '/blog/networking-tips' },
      { label: 'Global Events', href: '/events' },
      { label: 'Careers', href: '/careers' },
    ],
  };

  const column3 = {
    links: [
      { label: 'Find a Chapter', href: '/find-a-chapter' },
      { label: 'Start a Chapter', href: '/start-a-chapter' },
      { label: 'Exclusive Member Benefits', href: '/Exclusive-Member-Benefits' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/BWNGlobal', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/bwn', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/bwn', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/bwn', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/BWNGlobal', label: 'Twitter' },
  ];

  return (
    <div 
      className="absolute left-0 right-0 bg-[#f6f6f6] border-t border-[#e5e5e5] shadow-lg animate-fadeInDown"
      style={{
        animation: 'fadeInDown 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="mx-auto py-10" style={{ maxWidth: '1240px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="grid grid-cols-4 gap-10">
          {/* Column 1 */}
          <div>
            <h3 className="text-[15px] font-semibold text-[#222222] mb-4">
              {column1.title}
            </h3>
            <ul className="space-y-3">
              {column1.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-[#222222] hover:text-[#cc0000] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[15px] font-semibold text-[#222222] mb-4">
              {column2.title}
            </h3>
            <ul className="space-y-3">
              {column2.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-[#222222] hover:text-[#cc0000] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <ul className="space-y-3">
              {column3.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-[#222222] hover:text-[#cc0000] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Search + Promo + Social */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-[42px] pl-4 pr-10 rounded-full border border-gray-300 text-[15px] focus:outline-none focus:border-[#cc0000] transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Promotional Card */}
            <div className="relative rounded-[10px] overflow-hidden h-[140px]">
              <img
                src="https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=500&q=80"
                alt="Monaco Convention"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
              <div className="relative h-full flex flex-col justify-center px-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 flex items-center justify-center rounded bg-white">
                    <span className="text-xs font-black text-[#d71920]">B</span>
                  </div>
                  <div className="text-white text-xs leading-tight">
                    <div className="font-semibold">Experience the</div>
                    <div className="font-bold">2026 BWN Global</div>
                    <div className="font-bold">Convention in Monaco!</div>
                  </div>
                </div>
                <button className="bg-[#d71920] hover:bg-[#c40000] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors duration-200 self-start">
                  Click Here to Register
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#777777] hover:text-[#d71920] transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
