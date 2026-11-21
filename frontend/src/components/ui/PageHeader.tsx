interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
  metaLabel?: string;
  metaValue?: string;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  metaLabel,
  metaValue,
}: PageHeaderProps) {
  return (
    <section className="bg-paper-ivory border-b border-rule-gray">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
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

          {metaLabel && metaValue && (
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="bg-pure-white border border-rule-gray border-l-[3px] border-l-crest-navy rounded-[3px] px-5 py-4 w-full lg:max-w-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-slate">
                  {metaLabel}
                </p>
                <p className="font-serif text-sm font-bold text-crest-navy mt-1 leading-snug">
                  {metaValue}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
