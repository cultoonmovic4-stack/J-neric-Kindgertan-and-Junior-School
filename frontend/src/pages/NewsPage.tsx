import { useEffect, useState } from 'react';
import AOS from 'aos';
import { newsArticles } from '../data/newsData';
import { academicCalendar } from '../data/calendarData';
import type { NewsCategory } from '../types/school';
import { SectionHeading } from '../components/ui/SectionHeading';
import { EditorialImageFrame } from '../components/ui/EditorialImageFrame';

type FilterCategory = 'All' | NewsCategory;

const FILTER_TABS: FilterCategory[] = [
  'All',
  'Milestone',
  'Academics',
  'Admissions',
];

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    newsArticles[0]?.id ?? null
  );
  const [heroErrors, setHeroErrors] = useState<{
    commissioning: boolean;
    dearDay: boolean;
  }>({ commissioning: false, dearDay: false });

  const filteredArticles =
    activeCategory === 'All'
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);

  function handleSelectCategory(category: FilterCategory) {
    setActiveCategory(category);
    const matching =
      category === 'All'
        ? newsArticles
        : newsArticles.filter((article) => article.category === category);
    if (
      expandedArticleId !== null &&
      !matching.some((item) => item.id === expandedArticleId)
    ) {
      setExpandedArticleId(matching[0]?.id ?? null);
    }
  }

  useEffect(() => {
    AOS.refreshHard();
  }, [activeCategory, expandedArticleId]);

  return (
    <div>
      {/* Editorial Masthead + Two-Photo Campus Journal Diptych Hero */}
      <section className="bg-paper-ivory pt-14 pb-12 lg:pt-16 lg:pb-16 border-b border-rule-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-Column Editorial Masthead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 mb-8 border-b border-rule-gray">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                CAMPUS JOURNAL &amp; SCHEDULE
              </p>
              <h1 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                News, Milestones &amp; Term Calendar
              </h1>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-ink/85 text-base sm:text-lg leading-relaxed max-w-xl">
                Official campus announcements, community celebrations, literacy
                initiatives, and the 2026 academic term calendar for J-Neric
                Kindergarten &amp; Junior School.
              </p>
            </div>
          </div>

          {/* Two-Frame Photographic Diptych */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Frame — Campus Milestones & Commissioning */}
            <figure
              data-aos="fade-right"
              data-aos-once="false"
              data-aos-delay="60"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!heroErrors.commissioning ? (
                  <img
                    src="/images/campus/about-morning.jpg"
                    alt="J-Neric learners smiling during campus celebrations and classroom learning in Namulanda"
                    onError={() =>
                      setHeroErrors((prev) => ({ ...prev, commissioning: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                        Campus Milestone Archive
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        Official School Commissioning
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/about-morning.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <figcaption className="mt-3">
                <span className="font-serif font-bold text-crest-navy text-sm">
                  Campus Milestones &amp; Commissioning
                </span>
              </figcaption>
            </figure>

            {/* Right Frame — DEAR Day Reading Culture */}
            <figure
              data-aos="fade-left"
              data-aos-once="false"
              data-aos-delay="120"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!heroErrors.dearDay ? (
                  <img
                    src="/images/campus/dear-day-reading.jpg"
                    alt="J-Neric learners reading together during enjuba's Drop Everything And Read Day"
                    onError={() =>
                      setHeroErrors((prev) => ({ ...prev, dearDay: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-laurel-green">
                        Literacy Archive
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        enjuba DEAR Day Celebration
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/dear-day-reading.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif font-bold text-crest-navy text-sm">
                  enjuba DEAR Day Reading Celebration
                </span>
                <span className="text-xs text-muted-slate">
                  150+ Learners &amp; 13+ Teachers
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 01. School Press & Announcements */}
      <section className="py-16 lg:py-20 bg-pure-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-once="false">
            <SectionHeading
              number="01."
              eyebrow="Campus Press"
              title="School Press & Announcements"
              description="Filter by category to browse campus stories, milestones, and official notices from our Namulanda campus."
              layout="split"
              showDivider={false}
            />
          </div>

          {/* Interactive 4-Tab Editorial Selector Bar (Zero Cards, HomePage Scene 01 Style) */}
          <div
            role="tablist"
            aria-label="Filter school news by category"
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-delay="80"
            className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-2 border-b border-rule-gray"
          >
            {FILTER_TABS.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === 'All'
                  ? newsArticles.length
                  : newsArticles.filter((a) => a.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectCategory(category)}
                  className={
                    isActive
                      ? 'font-serif font-bold text-lg text-crest-navy pb-3 border-b-[3px] border-crest-crimson -mb-px text-left cursor-pointer'
                      : 'font-serif text-lg text-muted-slate hover:text-crest-navy pb-3 border-b-[3px] border-transparent -mb-px text-left transition-colors cursor-pointer'
                  }
                >
                  {category}{' '}
                  <span
                    className={`text-sm font-sans ml-1 ${
                      isActive
                        ? 'text-crest-crimson font-semibold'
                        : 'text-muted-slate'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Open Editorial Press List (Always-Visible Photography, Zero Dropdowns, Zero Cards) */}
          <div className="divide-y divide-rule-gray border-b border-rule-gray">
            {filteredArticles.map((article, index) => {
              const isExpanded = expandedArticleId === article.id;

              return (
                <article
                  key={article.id}
                  data-aos="fade-up"
                  data-aos-once="false"
                  data-aos-delay={Math.min(index * 75, 225)}
                  className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
                >
                  {/* Always-Visible Editorial Photograph */}
                  <div className="lg:col-span-5">
                    <EditorialImageFrame
                      src={article.imagePath}
                      alt={article.title}
                      caption={article.imageCaption}
                      fallbackLabel={article.category}
                      fallbackTitle={article.displayDate}
                      fallbackDetail={article.author}
                      aspectClass="aspect-[16/10]"
                    />
                  </div>

                  {/* Story Copy & Inline Read-More Control */}
                  <div className="lg:col-span-7 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.15em]">
                      <span className="font-serif text-crest-navy">
                        0{index + 1}.
                      </span>
                      <span className="text-crest-crimson">
                        {article.category}
                      </span>
                      <span className="text-rule-gray" aria-hidden="true">
                        |
                      </span>
                      <span className="text-muted-slate">
                        {article.displayDate}
                      </span>
                      <span className="text-rule-gray" aria-hidden="true">
                        |
                      </span>
                      <span className="text-muted-slate">{article.author}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-crest-navy mt-3 leading-snug">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-slate-ink leading-relaxed">
                      {article.summary}
                    </p>

                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-rule-gray space-y-4 text-sm sm:text-base text-slate-ink/90 leading-relaxed">
                        {article.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedArticleId(isExpanded ? null : article.id)
                      }
                      className="mt-5 inline-block text-sm font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors cursor-pointer"
                    >
                      {isExpanded ? 'Show Less' : 'Read Full Story'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02. Academic Term Dates Table */}
      <section
        id="calendar"
        className="py-16 lg:py-20 bg-paper-ivory border-t border-rule-gray scroll-mt-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-once="false">
            <SectionHeading
              number="02."
              eyebrow="2026 Academic Schedule"
              title="Academic Term Dates"
              actionLabel="Admissions & Fee Payment"
              actionTo="/admissions"
            />
          </div>

          {/* Open Editorial Term Dates Ledger (Line Separators, Zero Cards) */}
          <div>
            {/* Desktop Column Labels */}
            <div
              data-aos="fade-up"
              data-aos-once="false"
              data-aos-delay="60"
              className="hidden lg:grid lg:grid-cols-12 gap-6 py-4 border-b border-rule-gray text-[11px] font-bold uppercase tracking-[0.14em] text-muted-slate"
            >
              <span className="lg:col-span-1">Term</span>
              <span className="lg:col-span-2">Opening Date</span>
              <span className="lg:col-span-2">Mid-Term Break</span>
              <span className="lg:col-span-2">Visitation Day</span>
              <span className="lg:col-span-2">Closing Date</span>
              <span className="lg:col-span-3">Key Highlights</span>
            </div>

            {/* Hairline-Divided Term Rows */}
            <div className="divide-y divide-rule-gray border-b border-rule-gray">
              {academicCalendar.map((item, idx) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-once="false"
                  data-aos-delay={idx * 80}
                  className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-4 gap-x-6 items-baseline hover:bg-pure-white/50 px-2 -mx-2 rounded-[3px] transition-colors text-sm"
                >
                  <div className="sm:col-span-2 lg:col-span-1">
                    <span className="font-serif font-bold text-crest-navy text-base block">
                      {item.term}
                    </span>
                    <span className="text-xs text-muted-slate">
                      {item.academicYear}
                    </span>
                  </div>

                  <div className="lg:col-span-2">
                    <span className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.12em] text-muted-slate mb-1">
                      Opening Date
                    </span>
                    <span className="font-medium text-slate-ink">
                      {item.openingDate}
                    </span>
                  </div>

                  <div className="lg:col-span-2">
                    <span className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.12em] text-muted-slate mb-1">
                      Mid-Term Break
                    </span>
                    <span className="text-slate-ink">{item.midtermBreak}</span>
                  </div>

                  <div className="lg:col-span-2">
                    <span className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.12em] text-muted-slate mb-1">
                      Visitation Day
                    </span>
                    <span className="font-semibold text-crest-crimson">
                      {item.visitationDay}
                    </span>
                  </div>

                  <div className="lg:col-span-2">
                    <span className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.12em] text-muted-slate mb-1">
                      Closing Date
                    </span>
                    <span className="font-medium text-slate-ink">
                      {item.closingDate}
                    </span>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <span className="block lg:hidden text-[10px] font-bold uppercase tracking-[0.12em] text-muted-slate mb-1">
                      Key Highlights
                    </span>
                    <span className="text-muted-slate leading-relaxed">
                      {item.notes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-delay="120"
            className="mt-6 text-xs text-muted-slate"
          >
            Note: Dates align with Uganda Ministry of Education and Sports term
            guidelines and are confirmed via parent circulars at the start of
            each term.
          </p>
        </div>
      </section>
    </div>
  );
}
