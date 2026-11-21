import { Link } from 'react-router-dom';
import { schoolProfile } from '../../data/schoolProfile';

export function TopUtilityBar() {
  return (
    <div className="border-t-[3px] border-pencil-gold bg-crest-navy text-pure-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs">
        <p className="text-white/95 font-normal tracking-wide">
          Namulanda Ward, Kajjansi &bull; Entebbe Road
        </p>

        <div className="flex flex-wrap items-center gap-y-1">
          <a
            href={schoolProfile.phoneHref}
            className="text-pure-white hover:text-pencil-gold transition-colors font-normal tracking-wide"
          >
            Admissions:{' '}
            <span className="font-medium">{schoolProfile.phoneDisplay}</span>
          </a>

          <span
            aria-hidden="true"
            className="mx-3 h-3.5 border-l border-white/25 inline-block"
          />

          <Link
            to="/admissions#schoolpay"
            className="text-pencil-gold font-medium hover:underline underline-offset-4"
          >
            SchoolPay Fees Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
