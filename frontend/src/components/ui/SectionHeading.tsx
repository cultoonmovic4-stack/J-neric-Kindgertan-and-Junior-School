import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  layout?: 'stacked' | 'split';
  showDivider?: boolean;
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
  layout = 'stacked',
  showDivider = true,
}: SectionHeadingProps) {
  const dividerClass = showDivider ? 'pb-6 border-b border-rule-gray' : '';

  const titleBlock = (
    <>
      <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em]">
        {number && (
          <span className="font-serif text-crest-navy">{number}</span>
        )}
        <span className="text-crest-crimson">{eyebrow}</span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-crest-navy mt-2 leading-snug">
        {title}
      </h2>
    </>
  );

  if (layout === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 ${dividerClass}`}>
        <div className="max-w-2xl">{titleBlock}</div>

        {description && (
          <p className="text-sm text-muted-slate leading-relaxed max-w-md">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${dividerClass}`}>
      <div className="max-w-2xl">
        {titleBlock}
        {description && (
          <p className="mt-2.5 text-sm sm:text-base text-muted-slate leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && actionTo && (
        <div className="shrink-0">
          <Link
            to={actionTo}
            className="inline-block text-sm font-semibold text-crest-navy border-b border-crest-crimson pb-0.5 hover:text-crest-crimson transition-colors"
          >
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
