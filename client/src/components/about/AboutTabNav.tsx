import { Link, useLocation } from 'react-router-dom';

const ABOUT_TABS = [
  { label: 'About Us', path: '/about' },
  { label: 'Leadership', path: '/about/leadership' },
  { label: 'National Directors', path: '/about/national-directors' },
  { label: 'Our Founder', path: '/about/our-founder' },
  { label: 'BNI® Foundation', path: '/about/bni-foundation' },
];

export default function AboutTabNav() {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-center px-4 py-3 bg-white">
      <div className="bg-[#5A5A5A] rounded-full px-4 lg:px-6 inline-flex items-center overflow-x-auto scrollbar-hide">
        {ABOUT_TABS.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`relative py-3.5 px-5 lg:px-8 text-[14px] lg:text-[15px] font-medium whitespace-nowrap transition-colors ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#E31837] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
