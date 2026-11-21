import { useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolProfile } from '../../data/schoolProfile';

const ourSchoolLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Term Calendar', to: '/news' },
];

const admissionsLinks = [
  { label: 'Apply Now', to: '/admissions' },
  { label: 'SchoolPay Guide', to: '/admissions#schoolpay' },
  { label: 'News & Press', to: '/news' },
  { label: 'Contact Campus', to: '/contact' },
];

export function MainFooter() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="mt-auto">
      {/* Upper Light Editorial Footer Band */}
      <div className="bg-paper-ivory border-t border-rule-gray py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Column 1: Crest, Title & Campus Office Details */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3.5 mb-5 group">
                {!logoError ? (
                  <img
                    src="/images/logo.png"
                    alt={`${schoolProfile.name} Official Crest`}
                    onError={() => setLogoError(true)}
                    className="h-14 w-14 object-contain shrink-0"
                  />
                ) : (
                  <div className="h-14 w-14 shrink-0 border border-crest-navy rounded-[3px] bg-pure-white flex flex-col items-center justify-center text-center">
                    <span className="font-serif text-sm font-bold text-crest-navy leading-none">
                      JN
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-crest-crimson font-semibold mt-0.5">
                      Crest
                    </span>
                  </div>
                )}

                <div>
                  <p className="font-serif font-bold text-crest-navy text-lg leading-snug group-hover:text-crest-crimson transition-colors">
                    {schoolProfile.name}
                  </p>
                  <p className="font-serif italic text-crest-crimson text-sm">
                    &ldquo;{schoolProfile.motto}&rdquo;
                  </p>
                </div>
              </Link>

              <div className="space-y-3 text-sm text-slate-ink/85">
                <p>Namulanda Ward, Kajjansi (Off Entebbe Road)</p>

                <div>
                  <span className="block text-[11px] font-semibold tracking-[0.08em] text-muted-slate">
                    DIRECT TELEPHONE
                  </span>
                  <a
                    href={schoolProfile.phoneHref}
                    className="font-bold text-crest-navy text-base hover:text-crest-crimson transition-colors"
                  >
                    {schoolProfile.phoneDisplay}
                  </a>
                </div>

                <p>Mon&ndash;Fri: 7:30 AM &ndash; 5:00 PM</p>
              </div>
            </div>

            {/* Column 2: Our School */}
            <div className="lg:col-span-2 lg:border-l lg:border-rule-gray lg:pl-6">
              <h2 className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-4 font-sans">
                OUR SCHOOL
              </h2>
              <nav
                aria-label="Our School Footer Links"
                className="flex flex-col space-y-2.5 text-sm font-medium text-crest-navy"
              >
                {ourSchoolLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="whitespace-nowrap hover:text-crest-crimson transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Admissions */}
            <div className="lg:col-span-2">
              <h2 className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-4 font-sans">
                ADMISSIONS
              </h2>
              <nav
                aria-label="Admissions Footer Links"
                className="flex flex-col space-y-2.5 text-sm font-medium text-crest-navy"
              >
                {admissionsLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="whitespace-nowrap hover:text-crest-crimson transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 4: SchoolPay Fees */}
            <div className="lg:col-span-4 lg:border-l lg:border-rule-gray lg:pl-8">
              <h2 className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-4 font-sans">
                SCHOOLPAY FEES
              </h2>

              <p className="font-bold text-crest-navy text-base tracking-wide mb-4">
                {schoolProfile.schoolPay.registeredEntityName}
              </p>

              {/* Payment Channel Logos Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="h-9 px-3 py-1.5 bg-[#FFCC00] border border-[#E5B800] rounded-[3px] flex items-center gap-2">
                  <img
                    src="/images/payments/mtn-momo.png"
                    alt="MTN Mobile Money"
                    className="h-5 w-auto object-contain"
                  />
                  <span className="text-xs font-bold text-[#1A1A1A] leading-none">
                    MoMo
                  </span>
                </div>

                <div className="h-9 px-3 py-1.5 bg-pure-white border border-rule-gray rounded-[3px] flex items-center gap-2">
                  <img
                    src="/images/payments/airtel-money.png"
                    alt="Airtel Money"
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs font-bold text-[#E40000] leading-none">
                    Money
                  </span>
                </div>

                <div className="h-9 px-3.5 bg-crest-navy text-pure-white font-semibold text-xs rounded-[3px] flex items-center justify-center leading-none tracking-wide">
                  Partner Banks
                </div>
              </div>

              <Link
                to="/admissions#schoolpay"
                className="inline-block text-sm font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors"
              >
                View Payment Steps
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Royal Navy Colophon Strip */}
      <div className="border-t-[3px] border-pencil-gold bg-crest-navy text-pure-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-pure-white/90">
          <p>
            &copy; 2026 {schoolProfile.name}. All rights reserved.
          </p>
          <p>
            Director: {schoolProfile.director.name} &bull; Namulanda Ward,
            Kajjansi
          </p>
        </div>
      </div>
    </footer>
  );
}
