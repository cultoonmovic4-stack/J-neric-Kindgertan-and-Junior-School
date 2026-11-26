import { Link } from 'react-router-dom';
import { schoolProfile } from '../../data/schoolProfile';

export function TopUtilityBar() {
  return (
    <div className="border-t-[3px] border-pencil-gold bg-crest-navy text-pure-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] sm:text-xs">
        <p className="w-full sm:w-auto text-center sm:text-left text-white/85 sm:text-white/95 font-normal tracking-wide pb-1.5 sm:pb-0 border-b border-white/15 sm:border-b-0">
          Namulanda Ward, Kajjansi &bull; Entebbe Road
        </p>

        <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-x-3 gap-y-1 pt-1.5 sm:pt-0">
          <a
            href={schoolProfile.phoneHref}
            className="text-pure-white hover:text-pencil-gold transition-colors font-normal tracking-wide whitespace-nowrap"
          >
            Admissions:{' '}
            <span className="font-medium">{schoolProfile.phoneDisplay}</span>
          </a>

          <span
            aria-hidden="true"
            className="hidden sm:inline-block mx-0.5 h-3.5 border-l border-white/25"
          />

          <Link
            to="/admissions#schoolpay"
            className="text-pencil-gold font-medium hover:underline underline-offset-4 whitespace-nowrap"
          >
            SchoolPay Fees Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
