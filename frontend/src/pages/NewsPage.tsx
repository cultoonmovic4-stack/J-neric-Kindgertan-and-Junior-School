import { useState } from 'react';
import { newsArticles } from '../data/newsData';
import { academicCalendar } from '../data/calendarData';
import type { NewsCategory } from '../types/school';
import { PageHeader } from '../components/ui/PageHeader';
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

  return (
    <div>
      <PageHeader
        eyebrow="Campus Journal & Schedule"
        title="News, Milestones & Term Calendar"
        lead="Official campus announcements, community celebrations, literacy initiatives, and the 2026 academic term calendar for J-Neric Kindergarten & Junior School."
        metaLabel="Academic Calendar"
        metaValue="Terms I, II & III — 2026 Schedule"
      />

      {/* 01. School Press & Announcements */}
      <section className="py-14 sm:py-16 bg-paper-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01."
            eyebrow="Campus Press"
            title="School Press & Announcements"
            description="Filter by category and expand any notice to read the complete story from our Namulanda campus."
          />

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter school news by category"
            className="mt-7 flex flex-wrap gap-2.5"
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
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] border rounded-[3px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-crest-navy text-pure-white border-crest-navy'
                      : 'bg-pure-white text-slate-ink border-rule-gray hover:border-crest-navy hover:text-crest-navy'
                  }`}
                >
                  {category}{' '}
                  <span
                    className={
                      isActive ? 'text-pencil-gold ml-1' : 'text-muted-slate ml-1'
                    }
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Editorial Press List with Expandable Full Reading View */}
          <div data-aos="fade-up" className="mt-8 space-y-6">
            {filteredArticles.map((article, index) => {
              const isExpanded = expandedArticleId === article.id;

              return (
                <article
                  key={article.id}
                  className="bg-pure-white border border-rule-gray rounded-[3px] p-6 sm:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="max-w-3xl">
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

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-crest-navy mt-2.5 leading-snug">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-slate-ink leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedArticleId(isExpanded ? null : article.id)
                        }
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-[3px] transition-colors cursor-pointer ${
                          isExpanded
                            ? 'bg-paper-ivory text-crest-navy border-crest-navy'
                            : 'bg-crest-crimson text-pure-white border-crest-crimson hover:bg-crest-navy hover:border-crest-navy'
                        }`}
                      >
                        {isExpanded ? 'Collapse Article' : 'Read Full Article'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-7 pt-7 border-t border-rule-gray grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-ink leading-relaxed">
                        {article.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

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
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02. Academic Term Dates Table */}
      <section
        id="calendar"
        className="py-14 sm:py-16 bg-paper-ivory border-t border-rule-gray scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02."
            eyebrow="2026 Academic Schedule"
            title="Academic Term Dates"
            description="Key reporting dates, mid-term breaks, parent visitation days, and term closing schedules for Kindergarten and Junior School families."
            actionLabel="Admissions & Fee Payment"
            actionTo="/admissions"
          />

          <div
            data-aos="fade-up"
            className="mt-8 bg-pure-white border border-rule-gray rounded-[3px] overflow-x-auto"
          >
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-crest-navy text-pure-white text-xs uppercase tracking-[0.14em]">
                  <th scope="col" className="py-3.5 px-5 font-semibold w-28">
                    Term
                  </th>
                  <th scope="col" className="py-3.5 px-5 font-semibold">
                    Opening Date
                  </th>
                  <th scope="col" className="py-3.5 px-5 font-semibold">
                    Mid-Term Break
                  </th>
                  <th scope="col" className="py-3.5 px-5 font-semibold">
                    Visitation Day
                  </th>
                  <th scope="col" className="py-3.5 px-5 font-semibold">
                    Closing Date
                  </th>
                  <th scope="col" className="py-3.5 px-5 font-semibold">
                    Key Highlights
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule-gray text-sm">
                {academicCalendar.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-paper-ivory transition-colors"
                  >
                    <td className="py-4 px-5 align-top">
                      <span className="font-serif font-bold text-crest-navy block">
                        {item.term}
                      </span>
                      <span className="text-xs text-muted-slate">
                        {item.academicYear}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-medium text-slate-ink align-top whitespace-nowrap">
                      {item.openingDate}
                    </td>
                    <td className="py-4 px-5 text-slate-ink align-top whitespace-nowrap">
                      {item.midtermBreak}
                    </td>
                    <td className="py-4 px-5 font-semibold text-crest-crimson align-top whitespace-nowrap">
                      {item.visitationDay}
                    </td>
                    <td className="py-4 px-5 font-medium text-slate-ink align-top whitespace-nowrap">
                      {item.closingDate}
                    </td>
                    <td className="py-4 px-5 text-muted-slate leading-relaxed align-top">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-slate">
            Note: Dates align with Uganda Ministry of Education and Sports term
            guidelines and are confirmed via parent circulars at the start of
            each term.
          </p>
        </div>
      </section>
    </div>
  );
}
