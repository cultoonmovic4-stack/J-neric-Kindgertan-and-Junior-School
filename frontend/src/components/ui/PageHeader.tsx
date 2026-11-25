interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
  metaLabel?: string;
  metaValue?: string;
  maxWidthClass?: 'max-w-6xl' | 'max-w-7xl';
  reversibleAos?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  metaLabel,
  metaValue,
  maxWidthClass = 'max-w-6xl',
  reversibleAos = false,
}: PageHeaderProps) {
  const hasMeta = Boolean(metaLabel && metaValue);
  const sectionSpacingClass = hasMeta
    ? 'py-12 sm:py-16'
    : 'pt-14 pb-12 lg:pt-16 lg:pb-16';
  const leftAosProps = reversibleAos
    ? { 'data-aos': 'fade-right', 'data-aos-once': 'false' }
    : {};
  const rightAosProps = reversibleAos
    ? {
        'data-aos': 'fade-left',
        'data-aos-once': 'false',
        'data-aos-delay': '100',
      }
    : {};

  return (
    <section
      className={`bg-paper-ivory border-b border-rule-gray overflow-hidden ${sectionSpacingClass}`}
    >
      <div className={`mx-auto ${maxWidthClass} px-4 sm:px-6 lg:px-8`}>
        {hasMeta ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div {...leftAosProps} className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crest-crimson">
                {eyebrow}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-crest-navy mt-3 leading-tight">
                {title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-ink leading-relaxed max-w-2xl">
                {lead}
              </p>
            </div>

            <div {...rightAosProps} className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="bg-pure-white border border-rule-gray border-l-[3px] border-l-crest-navy rounded-[3px] px-5 py-4 w-full lg:max-w-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-slate">
                  {metaLabel}
                </p>
                <p className="font-serif text-sm font-bold text-crest-navy mt-1 leading-snug">
                  {metaValue}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div {...leftAosProps} className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                {eyebrow}
              </p>
              <h1 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {title}
              </h1>
            </div>

            <div {...rightAosProps} className="lg:col-span-6">
              <p className="text-base sm:text-lg text-slate-ink/85 leading-relaxed max-w-xl">
                {lead}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
