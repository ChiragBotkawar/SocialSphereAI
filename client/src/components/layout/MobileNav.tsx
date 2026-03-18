import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { NAV_ITEMS } from '../../utils/constants';
import type { NavItem } from '../../utils/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggle = (label: string) => setExpandedItem((prev) => (prev === label ? null : label));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <nav
        className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto pt-20 pb-8"
        role="navigation"
      >
        <div className="flex flex-col px-4 gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.megaMenu ? (
                <>
                  <button
                    onClick={() => toggle(item.label)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-medium text-dark hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn('h-4 w-4 text-gray-400 transition-transform duration-200', expandedItem === item.label && 'rotate-180')}
                    />
                  </button>
                  {expandedItem === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                      {item.megaMenu!.columns.map((column, colIdx: number) => (
                        <div key={colIdx}>
                          {column.heading && (
                            <div className="px-3 py-2 text-xs font-semibold text-dark uppercase tracking-wider">
                              {column.heading}
                            </div>
                          )}
                          {column.items.map((child: { label: string; href: string }) => (
                            <NavLink
                              key={child.label}
                              to={child.href}
                              onClick={onClose}
                              className={({ isActive }) =>
                                cn('rounded-lg px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors', isActive && 'text-primary font-semibold')
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : item.newTab ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-medium text-dark hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  to={item.href ?? '#'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn('block rounded-lg px-3 py-3 font-medium text-dark hover:bg-gray-50 hover:text-primary transition-colors', isActive && 'text-primary')
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}

          <div className="mt-4 pt-4 border-t">
            <Link to="/find-a-chapter" onClick={onClose} className="btn-primary w-full justify-center">
              Find a Chapter
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
