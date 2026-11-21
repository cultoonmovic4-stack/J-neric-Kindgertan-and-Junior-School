import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { schoolProfile } from '../../data/schoolProfile';

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about', end: false },
  { label: 'Academics', to: '/academics', end: false },
  { label: 'Admissions', to: '/admissions', end: false },
  { label: 'News & Calendar', to: '/news', end: false },
  { label: 'Contact', to: '/contact', end: false },
];

export function MainHeader() {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-pure-white">
      {/* Tier 1 — Spacious Brand Masthead */}
      <div className="bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
          {/* Borderless Official Crest + Institutional Serif Lockup */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-4 sm:gap-5 group min-w-0"
          >
            {!logoError ? (
              <img
                src="/images/logo.png"
                alt={`${schoolProfile.name} Official Crest`}
                onError={() => setLogoError(true)}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain shrink-0"
              />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 border border-crest-navy rounded-[3px] flex flex-col items-center justify-center text-center bg-pure-white">
                <span className="font-serif text-lg font-bold text-crest-navy leading-none">
                  JN
                </span>
                <span className="text-[9px] uppercase tracking-widest text-crest-crimson font-semibold mt-1">
                  Crest
                </span>
              </div>
            )}

            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-crest-navy text-xl sm:text-2xl lg:text-[26px] leading-tight group-hover:text-crest-crimson transition-colors">
                {schoolProfile.name}
              </span>
              <span className="font-serif italic text-muted-slate text-sm sm:text-base mt-1">
                &ldquo;{schoolProfile.motto}&rdquo;
              </span>
            </div>
          </Link>

          {/* Right Side: Single Tailored Primary CTA (Desktop) + Text-Only Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/admissions"
              className="hidden md:inline-flex items-center justify-center bg-crest-crimson hover:bg-[#b82d20] text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors"
            >
              Apply Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-primary-nav"
              className="md:hidden px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-crest-navy border border-rule-gray rounded-[3px] bg-paper-ivory hover:border-crest-navy transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2 — Dedicated Navigation Strip (Desktop) */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:block bg-paper-ivory border-y border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 lg:gap-12">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `py-3.5 text-sm tracking-wide transition-colors border-b-[3px] -mb-px ${
                    isActive
                      ? 'text-crest-crimson font-semibold border-crest-crimson'
                      : 'text-slate-ink hover:text-crest-navy font-medium border-transparent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer (< md) */}
      <div className="md:hidden border-b border-rule-gray">
        {mobileMenuOpen && (
          <nav
            id="mobile-primary-nav"
            aria-label="Mobile Navigation"
            className="bg-paper-ivory border-t border-rule-gray px-4 sm:px-6 py-4 space-y-1"
          >
            {navigationItems.map((item, idx) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-sm rounded-[3px] border-l-[3px] transition-colors ${
                    isActive
                      ? 'bg-pure-white text-crest-crimson font-semibold border-crest-crimson'
                      : 'text-slate-ink font-medium border-transparent hover:bg-pure-white hover:text-crest-navy'
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="text-xs font-normal text-muted-slate">
                  0{idx + 1}.
                </span>
              </NavLink>
            ))}

            <div className="pt-3">
              <Link
                to="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-crest-crimson hover:bg-[#b82d20] text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
