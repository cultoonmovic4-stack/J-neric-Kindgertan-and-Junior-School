import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { schoolProfile } from '../data/schoolProfile';
import { newsArticles } from '../data/newsData';
import heroSlide1Img from '../assets/images/6.jpg';
import heroSlide2Img from '../assets/images/2.jpg';
import heroSlide3Img from '../assets/images/7.jpg';
import heroSlide4Img from '../assets/images/3.jpg';
import leadershipImg from '../assets/images/4.jpg';

interface HeroSlide {
  id: number;
  eyebrow: string;
  headline: string;
  paragraph: string;
  imagePath: string;
  imageAlt: string;
  fallbackCaption: string;
}

const HERO_SLIDE_INTERVAL_MS = 8000;

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: '01 / 04 • KEYSTONE VALUES • J-NERIC SCHOOL',
    headline:
      'Nurturing Confident Learners with Love, Discipline, and Academic Excellence',
    paragraph:
      'J-Neric Kindergarten & Junior School is a private pre-primary and primary institution in Namulanda Ward, Kajjansi Town Council. Guided by our motto, “Nurture with Love,” we partner with families to build strong literacy, numeracy, moral character, and joyful curiosity from Baby Class through Primary Seven.',
    imagePath: heroSlide1Img,
    imageAlt:
      'J-Neric Kindergarten & Junior School learners and teachers in school uniforms at Namulanda Campus',
    fallbackCaption: 'Slide 01: Focus on Whole-Child Development',
  },
  {
    id: 2,
    eyebrow: '02 / 04 • EARLY YEARS • BABY, MIDDLE & TOP CLASS',
    headline:
      'A Warm, Safe First Step in Learning Designed for Joyful Discovery',
    paragraph:
      'Our early childhood program focuses on gentle social transition, play-based exploration, phonics, and early numeracy. We provide a highly secure environment in Namulanda where our youngest learners feel loved and encouraged to learn.',
    imagePath: heroSlide2Img,
    imageAlt:
      'Kindergarten Baby, Middle, and Top Class learners engaged in guided early years discovery at J-Neric',
    fallbackCaption: 'Slide 02: Early Years Exploration',
  },
  {
    id: 3,
    eyebrow: '03 / 04 • PRIMARY SECTION • MASTERING FOUNDATIONS',
    headline:
      'Building Strong Readers, Critical Thinkers, and Upright Citizens',
    paragraph:
      'Guided by the Uganda National Curriculum and our active reading culture (including enjuba’s DEAR Day), our Primary P.1 to P.7 classes prioritize core literacy, science exploration, spiritual grounding, and moral integrity.',
    imagePath: heroSlide3Img,
    imageAlt:
      'Primary One through Primary Seven learners reading and collaborating at J-Neric Junior School',
    fallbackCaption: 'Slide 03: Primary Learning & Literacy',
  },
  {
    id: 4,
    eyebrow: '04 / 04 • CAMPUS LIFE • NAMULANDA, KAJJANSI',
    headline:
      'Creative Expression, Moral Character, and Joyful Everyday Growth',
    paragraph:
      'From hands-on classroom discovery and storytelling to music, outdoor play, and daily morning devotion, every learner at J-Neric is encouraged to grow in confidence, kindness, and steady self-discipline.',
    imagePath: heroSlide4Img,
    imageAlt:
      'Young J-Neric learners smiling during hands-on creative classroom activities at Namulanda Campus',
    fallbackCaption: 'Slide 04: Creative Expression & Character',
  },
];

interface WhyChooseScene {
  num: string;
  shortTitle: string;
  title: string;
  image: string;
  description: string;
}

interface FeaturedTestimonial {
  familyCaption: string;
  image: string;
  quote: string;
  author: string;
  meta: string;
}

interface SecondaryQuote {
  quote: string;
  author: string;
}

const whyChooseScenes: WhyChooseScene[] = [
  {
    num: '01',
    shortTitle: '01. Nurturing Classrooms',
    title: '01. Nurturing Classrooms & Personal Attention',
    image: '/images/campus/why-classrooms.jpg',
    description:
      'Small class sizes and attentive teachers who know every learner by name, temperament, and learning pace.',
  },
  {
    num: '02',
    shortTitle: '02. Literacy & DEAR Day',
    title: '02. Strong Literacy & enjuba DEAR Day Culture',
    image: '/images/campus/dear-day-reading.jpg',
    description:
      "Structured phonics from Baby Class upward, reinforced by whole-school participation in enjuba's Drop Everything And Read (DEAR) Day.",
  },
  {
    num: '03',
    shortTitle: '03. Christian Values',
    title: '03. Christian Values & Moral Formation',
    image: '/images/campus/morning-devotion.jpg',
    description:
      'Daily morning devotion, gratitude, honesty, and disciplined character formation woven naturally into everyday school life.',
  },
  {
    num: '04',
    shortTitle: '04. Parent Partnership',
    title: '04. Transparent SchoolPay & Parent Partnership',
    image: '/images/campus/parent-partnership.jpg',
    description:
      'Weekly progress feedback, nutritious campus meals, and seamless fee payments via SchoolPay (MTN MoMo, Airtel Money & partner banks).',
  },
];

const featuredTestimonials: FeaturedTestimonial[] = [
  {
    familyCaption: 'THE MUKASA FAMILY • PARENTS OF P.3 & TOP CLASS LEARNERS',
    image: '/images/community/family-mukasa.jpg',
    quote:
      "Since joining J-Neric in Baby Class, our daughter's confidence in reading and spoken English has blossomed. The teachers know her personally, communicate every week, and treat every child with genuine love.",
    author: 'Mrs. Sarah & Mr. David Mukasa',
    meta: 'Kajjansi, Wakiso District • Parents since 2024',
  },
  {
    familyCaption: 'THE NAMONO FAMILY • PARENTS OF P.5 & MIDDLE CLASS LEARNERS',
    image: '/images/community/family-namono.jpg',
    quote:
      'What stands out most is the calm discipline and reading culture. Our children come home eager to share stories from DEAR Day and complete their homework without being chased.',
    author: 'Mr. Samuel & Mrs. Grace Namono',
    meta: 'Entebbe Road Corridor • Parents since 2023',
  },
  {
    familyCaption: 'THE KIGGUNDU FAMILY • PARENTS OF P.7 CANDIDATE',
    image: '/images/community/family-kiggundu.jpg',
    quote:
      'From weekly assessments to transparent SchoolPay billing, everything is orderly and dependable. We feel genuinely partnered with as our son prepares for his PLE.',
    author: 'Dr. & Mrs. Joseph Kiggundu',
    meta: 'Wakiso District • Parents since 2022',
  },
];

const secondaryQuotes: SecondaryQuote[] = [
  {
    quote:
      'The transition to Baby Class was so gentle. The daily feedback from her teacher is incredible.',
    author: 'Ms. Gloria Nabakooza • Baby Class Parent',
  },
  {
    quote:
      'J-Neric prepares them for PLE without losing focus on character, morality, and sports.',
    author: 'Mr. Arthur Ssewankambo • P.6 Parent',
  },
];

export function HomePage() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [activeDivision, setActiveDivision] = useState<
    'kindergarten' | 'junior'
  >('kindergarten');
  const [failedDivisionImages, setFailedDivisionImages] = useState<
    Record<'kindergarten' | 'junior', boolean>
  >({ kindergarten: false, junior: false });
  const [failedPressImages, setFailedPressImages] = useState<
    Record<number, boolean>
  >({});
  const [activeScene, setActiveScene] = useState(0);
  const [failedWhyImages, setFailedWhyImages] = useState<
    Record<string, boolean>
  >({});
  const [activeStory, setActiveStory] = useState(0);
  const [failedTestimonialImages, setFailedTestimonialImages] = useState<
    Record<number, boolean>
  >({});
  const leadArticle = newsArticles[0];
  const secondaryArticles = newsArticles.slice(1, 3);
  const currentWhyScene = whyChooseScenes[activeScene];
  const currentTestimonial = featuredTestimonials[activeStory];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      {/* 01. Full-Bleed 55% / 45% Spacious Editorial Auto-Carousel Hero */}
      <section
        aria-label="J-Neric School Highlights"
        className="w-full bg-paper-ivory border-b border-rule-gray"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
          {/* Left Content Column (55%) */}
          <div className="py-20 lg:py-24 px-8 lg:px-16 flex items-center">
            <div className="w-full max-w-2xl lg:ml-auto lg:mr-6">
              {/* Cross-Fading Slide Copy Stack (Stable Height, Zero Layout Jump) */}
              <div className="grid grid-cols-1 grid-rows-1">
                {HERO_SLIDES.map((slide, index) => {
                  const isActive = index === activeSlideIndex;
                  const HeadingTag = index === 0 ? 'h1' : 'h2';

                  return (
                    <div
                      key={slide.id}
                      aria-hidden={!isActive}
                      className={`col-start-1 row-start-1 transition-opacity duration-1000 ease-in-out ${
                        isActive
                          ? 'opacity-100 z-10'
                          : 'opacity-0 z-0 pointer-events-none select-none'
                      }`}
                    >
                      <p className="text-crest-crimson font-semibold tracking-[0.1em] text-xs uppercase mb-4 sm:mb-6">
                        {slide.eyebrow}
                      </p>

                      <HeadingTag className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 lg:mb-6">
                        {slide.headline}
                      </HeadingTag>

                      <p className="text-slate-ink/85 leading-relaxed text-base sm:text-lg mb-8 max-w-xl">
                        {slide.paragraph}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Single Uncluttered Primary Action */}
              <div>
                <Link
                  to="/academics"
                  className="inline-flex items-center justify-center border-2 border-crest-navy text-crest-navy hover:bg-crest-navy hover:text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors"
                >
                  Explore Academics
                </Link>
              </div>
            </div>
          </div>

          {/* Right Photography Column (45%) — Full-Height Edge-to-Edge */}
          <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[580px] lg:h-full w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-rule-gray bg-[#EEECE6]">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === activeSlideIndex;
              const isUnavailable = Boolean(failedImages[slide.id]);

              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {!isUnavailable ? (
                    <img
                      src={slide.imagePath}
                      alt={slide.imageAlt}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [slide.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full p-8 sm:p-12 pb-24 flex flex-col justify-between bg-[#EEECE6]">
                      <div className="w-full h-full border border-rule-gray bg-pure-white p-6 sm:p-8 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2 border-b border-rule-gray pb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-crest-crimson">
                            Editorial Campus Archive
                          </span>
                          <span className="font-serif text-xs font-bold text-crest-navy">
                            0{slide.id} / 04
                          </span>
                        </div>

                        <div className="my-auto py-4">
                          <p className="font-serif text-xl sm:text-2xl font-bold text-crest-navy leading-snug">
                            {slide.fallbackCaption}
                          </p>
                          <p className="mt-3 text-xs text-muted-slate leading-relaxed max-w-sm">
                            Place campus photograph at{' '}
                            <span className="font-mono text-crest-navy">
                              public{slide.imagePath}
                            </span>{' '}
                            to display edge-to-edge photography here.
                          </p>
                        </div>

                        <div className="border-t border-rule-gray pt-3 flex items-center justify-between text-[11px] text-muted-slate">
                          <span className="font-serif italic text-crest-navy">
                            &ldquo;{schoolProfile.motto}&rdquo;
                          </span>
                          <span>Namulanda, Kajjansi</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom-Left Royal Navy Overlay Block */}
            <div className="absolute bottom-6 left-0 z-20 border-l-4 border-pencil-gold bg-crest-navy/95 text-pure-white text-sm font-serif px-4 py-3 rounded-r-[3px]">
              Daily Learning at our Namulanda Campus
            </div>
          </div>
        </div>
      </section>

      {/* 02. Compact Interactive Tabbed Prospectus — Academic Divisions */}
      <section
        aria-label="Academic Divisions"
        className="bg-pure-white py-12 lg:py-14 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tight Single-Row Header */}
          <div
            data-aos="fade-up"
            className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-1.5">
                01. ACADEMIC DIVISIONS
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl lg:text-3xl leading-tight">
                A Seamless Educational Journey from Early Years to Primary Seven
              </h2>
            </div>

            <Link
              to="/academics"
              className="text-sm font-medium text-crest-navy underline underline-offset-4 hover:text-crest-crimson transition-colors shrink-0"
            >
              View Full Curriculum &amp; Timetable
            </Link>
          </div>

          {/* Interactive 2-Tab Editorial Selector Bar (Zero Cards) */}
          <div
            role="tablist"
            aria-label="Select Academic Division"
            className="grid grid-cols-1 sm:grid-cols-2 border-b border-rule-gray mb-8"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'kindergarten'}
              onClick={() => setActiveDivision('kindergarten')}
              className={
                activeDivision === 'kindergarten'
                  ? 'font-serif font-bold text-lg text-crest-navy pb-3 border-b-[3px] border-laurel-green -mb-px text-left cursor-pointer'
                  : 'font-serif text-lg text-muted-slate hover:text-crest-navy pb-3 border-b-[3px] border-transparent -mb-px text-left transition-colors cursor-pointer'
              }
            >
              01. J-Neric Kindergarten (Early Years)
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'junior'}
              onClick={() => setActiveDivision('junior')}
              className={
                activeDivision === 'junior'
                  ? 'font-serif font-bold text-lg text-crest-navy pb-3 border-b-[3px] border-crest-sky -mb-px text-left cursor-pointer'
                  : 'font-serif text-lg text-muted-slate hover:text-crest-navy pb-3 border-b-[3px] border-transparent -mb-px text-left transition-colors cursor-pointer'
              }
            >
              02. J-Neric Junior School (Primary P.1 – P.7)
            </button>
          </div>

          {/* Compact 12-Column Non-Scrolling Editorial Spread (Directly on White Canvas) */}
          {(() => {
            const isKindergarten = activeDivision === 'kindergarten';
            const photoSrc = isKindergarten
              ? '/images/campus/kindergarten.jpg'
              : '/images/campus/junior-school.jpg';
            const photoAlt = isKindergarten
              ? 'J-Neric Kindergarten learners engaged in guided early years discovery in Namulanda'
              : 'J-Neric Junior School Primary learners reading together at Namulanda Campus';
            const photoStrip = isKindergarten
              ? 'Ages 3–6 • Baby, Middle & Top Class'
              : 'Ages 6–13 • Primary One (P.1) to Primary Seven (P.7)';
            const focusItems = isKindergarten
              ? [
                  'Jolly Phonics & Early Speech',
                  'Hands-On Numeracy',
                  'Creative Arts & Play',
                  'Safe Daily Care & Nutrition',
                ]
              : [
                  'English, Math & Integrated Science',
                  'Daily Reading & DEAR Day Culture',
                  'Weekly Continuous Assessment',
                  'PLE Readiness & Moral Leadership',
                ];

            return (
              <div
                role="tabpanel"
                data-aos="fade-up"
                data-aos-delay="100"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left (5 Columns) — Compact Framed Photograph + Flush Navy Strip */}
                <div className="lg:col-span-5">
                  <div className="rounded-[3px] overflow-hidden border border-rule-gray">
                    <div className="aspect-[16/10] max-h-[340px] w-full bg-paper-ivory">
                      {!failedDivisionImages[activeDivision] ? (
                        <img
                          key={photoSrc}
                          src={photoSrc}
                          alt={photoAlt}
                          onError={() =>
                            setFailedDivisionImages((prev) => ({
                              ...prev,
                              [activeDivision]: true,
                            }))
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full p-5 flex flex-col justify-between bg-paper-ivory">
                          <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                                isKindergarten
                                  ? 'text-laurel-green'
                                  : 'text-crest-sky'
                              }`}
                            >
                              {isKindergarten
                                ? 'Kindergarten Archive'
                                : 'Junior School Archive'}
                            </span>
                            <p className="font-serif text-lg font-bold text-crest-navy">
                              {isKindergarten
                                ? 'J-Neric Kindergarten Campus'
                                : 'J-Neric Junior School Campus'}
                            </p>
                            <span className="font-mono text-[10px] text-muted-slate">
                              public{photoSrc}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-crest-navy text-pure-white px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide">
                      {photoStrip}
                    </div>
                  </div>
                </div>

                {/* Right (7 Columns) — Crisp, Concise Editorial Story */}
                <div className="lg:col-span-7">
                  <p
                    className={`text-xs font-bold tracking-[0.1em] uppercase mb-2 ${
                      isKindergarten ? 'text-laurel-green' : 'text-crest-sky'
                    }`}
                  >
                    {isKindergarten
                      ? 'EARLY YEARS FOUNDATION'
                      : 'PRIMARY SECTION • P.1 – P.7'}
                  </p>

                  <h3 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl mb-3 leading-snug">
                    {isKindergarten
                      ? 'Nurturing Curiosity, Speech & Joyful Confidence'
                      : 'Disciplined Study, Strong Literacy & Moral Integrity'}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-ink leading-relaxed max-w-2xl">
                    {isKindergarten
                      ? 'A warm, unhurried early childhood environment where young children develop spoken confidence, early phonics, number sense, and joyful social habits through guided play and loving routines.'
                      : 'A structured primary program delivering the Uganda National Curriculum with strong emphasis on reading comprehension (DEAR Day), analytical mathematics, practical science, and Christian values.'}
                  </p>

                  {/* 2x2 Hairline-Divided Core Focus Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-y border-rule-gray divide-y sm:divide-y-0 divide-rule-gray my-5 text-sm text-slate-ink font-medium">
                    {focusItems.map((item, idx) => (
                      <div
                        key={item}
                        className={`py-3 ${
                          idx % 2 === 0 ? 'sm:pr-5 sm:border-r sm:border-rule-gray' : 'sm:pl-5'
                        } ${idx < 2 ? 'sm:border-b sm:border-rule-gray' : ''}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/academics"
                    className="inline-block bg-crest-crimson hover:bg-[#b82d20] text-pure-white text-sm font-semibold px-6 py-3 rounded-[3px] transition-colors"
                  >
                    {isKindergarten
                      ? 'Explore Kindergarten Curriculum'
                      : 'Explore Junior School Curriculum'}
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 03. Director's Welcome Letter */}
      <section
        aria-label="From the Office of the Director"
        className="bg-pure-white py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-[3px] border-pencil-gold pl-6 sm:pl-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column (7 cols) — Letter & Clean Single-Line Signature Row */}
              <div data-aos="fade-up" className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                  02. FROM THE OFFICE OF THE DIRECTOR
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-crest-navy mt-2 leading-snug">
                  {schoolProfile.director.welcomeHeading}
                </h2>

                <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-ink max-w-xl leading-relaxed">
                  {schoolProfile.director.welcomeParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-7 border-l-[3px] border-crest-navy pl-5 font-serif italic text-crest-navy text-lg leading-relaxed max-w-xl">
                  &ldquo;{schoolProfile.director.closingQuote}&rdquo;
                </blockquote>

                <div className="border-t border-rule-gray pt-5 mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="font-serif font-bold text-crest-navy text-lg leading-tight">
                      {schoolProfile.director.name}
                    </p>
                    <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted-slate mt-1">
                      School Director, J-Neric School
                    </p>
                  </div>

                  <Link
                    to="/about"
                    className="text-sm font-semibold text-crest-navy underline underline-offset-4 hover:text-crest-crimson whitespace-nowrap transition-colors"
                  >
                    Read Our School Story
                  </Link>
                </div>
              </div>

              {/* Right Column (5 cols) — Un-Boxed Portrait & Open Promise Ledger */}
              <div
                data-aos="fade-up"
                data-aos-delay="120"
                className="lg:col-span-5"
              >
                <figure>
                  <img
                    src={leadershipImg}
                    alt={`${schoolProfile.director.name}, ${schoolProfile.director.title} — Namulanda Campus`}
                    className="w-full aspect-[4/3] object-cover object-top rounded-[3px]"
                  />
                  <figcaption className="text-xs italic text-muted-slate mt-3">
                    {schoolProfile.director.name}, {schoolProfile.director.title}{' '}
                    &mdash; Namulanda Campus
                  </figcaption>
                </figure>

                <div className="border-t border-rule-gray my-6" />

                <div>
                  <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-3.5">
                    OUR PROMISE TO PARENTS
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-ink/90">
                    <li>
                      01. Safe, supervised campus &amp; attentive class sizes
                    </li>
                    <li>02. Daily Christian devotion &amp; moral discipline</li>
                    <li>03. Open, regular parent-teacher communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Asymmetric Front-Page Press Spread — School Milestones & Campus Life */}
      <section
        aria-label="School Milestones and Campus Life"
        className="bg-paper-ivory py-16 lg:py-20 border-t border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clean Single-Row Section Header */}
          <div
            data-aos="fade-up"
            className="pb-6 mb-10 border-b border-rule-gray flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                03. CAMPUS JOURNAL &amp; MILESTONES
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                School Milestones &amp; Campus Life
              </h2>
            </div>

            <Link
              to="/news"
              className="text-sm font-medium text-crest-navy underline underline-offset-4 hover:text-crest-crimson transition-colors shrink-0"
            >
              View All News &amp; Term Calendar
            </Link>
          </div>

          {/* Asymmetric 12-Column Broadsheet Layout (Zero White Cards, Zero Boxed Captions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column (7 cols) — Featured Lead Milestone */}
            {leadArticle && (
              <article
                data-aos="fade-up"
                data-aos-delay="80"
                className="lg:col-span-7"
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray mb-6 bg-[#EEECE6]">
                  {!failedPressImages[leadArticle.id] ? (
                    <img
                      src={leadArticle.imagePath}
                      alt={leadArticle.title}
                      onError={() =>
                        setFailedPressImages((prev) => ({
                          ...prev,
                          [leadArticle.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EEECE6]">
                      <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                          {leadArticle.category} Archive
                        </span>
                        <p className="font-serif text-xl font-bold text-crest-navy leading-snug">
                          {leadArticle.displayDate}
                        </p>
                        <span className="text-xs text-muted-slate">
                          {leadArticle.author}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs font-bold tracking-[0.1em] text-crest-crimson mb-2.5">
                  {leadArticle.category.toUpperCase()} &bull;{' '}
                  {leadArticle.displayDate.toUpperCase()}
                </p>

                <h3 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl leading-snug mb-3">
                  {leadArticle.title}
                </h3>

                <p className="text-slate-ink/85 text-base leading-relaxed mb-4 line-clamp-3">
                  {leadArticle.summary}
                </p>

                <Link
                  to="/news"
                  className="inline-block text-sm font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors"
                >
                  Read Full Story
                </Link>
              </article>
            )}

            {/* Right Column (5 cols) — Stacked Secondary Stories */}
            <div
              data-aos="fade-up"
              data-aos-delay="160"
              className="lg:col-span-5 lg:border-l lg:border-rule-gray lg:pl-10"
            >
              <div className="flex flex-col divide-y divide-rule-gray">
                {secondaryArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={index === 0 ? 'pb-8' : 'pt-8'}
                  >
                    <div className="grid grid-cols-12 gap-5 items-start">
                      <div className="col-span-5">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                          {!failedPressImages[article.id] ? (
                            <img
                              src={article.imagePath}
                              alt={article.title}
                              onError={() =>
                                setFailedPressImages((prev) => ({
                                  ...prev,
                                  [article.id]: true,
                                }))
                              }
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full p-2.5 bg-[#EEECE6]">
                              <div className="w-full h-full border border-rule-gray bg-pure-white p-2.5 flex flex-col justify-between">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-crest-crimson">
                                  {article.category}
                                </span>
                                <span className="font-serif text-xs font-bold text-crest-navy">
                                  {article.displayDate}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-span-7">
                        <p className="text-[11px] font-bold tracking-[0.08em] text-crest-crimson mb-1.5">
                          {article.category.toUpperCase()} &bull;{' '}
                          {article.displayDate.toUpperCase()}
                        </p>

                        <h3 className="font-serif font-bold text-crest-navy text-lg leading-snug mb-2.5">
                          {article.title}
                        </h3>

                        <Link
                          to="/news"
                          className="inline-block text-xs font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors"
                        >
                          Read Story
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Choose J-Neric — Interactive Documentary Stage + 4-Photo Filmstrip */}
      <section
        aria-label="Why Families Choose J-Neric"
        className="bg-paper-ivory py-16 lg:py-20 border-b border-rule-gray"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clean Single-Row Editorial Header */}
          <div className="pb-6 mb-8 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                WHY FAMILIES CHOOSE J-NERIC
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                A Foundation Built on Care, Literacy &amp; Discipline
              </h2>
            </div>

            <p className="text-sm text-muted-slate max-w-md">
              Early childhood warmth paired with structured national-curriculum
              excellence.
            </p>
          </div>

          {/* Wide Documentary Cinema Frame */}
          <div className="w-full aspect-[21/9] max-h-[430px] overflow-hidden rounded-[3px] border border-rule-gray bg-pure-white">
            {!failedWhyImages[currentWhyScene.num] ? (
              <img
                key={currentWhyScene.num}
                src={currentWhyScene.image}
                alt={currentWhyScene.title}
                onError={() =>
                  setFailedWhyImages((prev) => ({
                    ...prev,
                    [currentWhyScene.num]: true,
                  }))
                }
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-[#EEECE6]">
                <div className="w-full h-full border border-rule-gray bg-pure-white p-6 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-crest-crimson">
                      SCENE {currentWhyScene.num} / 04 &bull; CAMPUS DOCUMENTARY
                    </span>
                    <span className="font-mono text-[10px] text-muted-slate hidden sm:inline">
                      public{currentWhyScene.image}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-crest-navy leading-snug">
                      {currentWhyScene.title}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-muted-slate max-w-xl leading-relaxed">
                      {currentWhyScene.description}
                    </p>
                  </div>
                  <span className="font-serif italic text-xs text-crest-navy">
                    &ldquo;{schoolProfile.motto}&rdquo;
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Active Story Bar */}
          <div className="mt-6 pb-8 border-b border-rule-gray">
            <div className="border-l-[3px] border-pencil-gold pl-5">
              <h3 className="font-serif font-bold text-crest-navy text-lg sm:text-xl inline">
                {currentWhyScene.title}
              </h3>
              <span
                aria-hidden="true"
                className="hidden sm:inline text-muted-slate mx-2"
              >
                &mdash;
              </span>
              <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed mt-1 sm:mt-0 sm:inline">
                {currentWhyScene.description}
              </p>
            </div>
          </div>

          {/* Interactive 4-Photo Filmstrip Selector */}
          <div className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {whyChooseScenes.map((scene, index) => {
              const isActive = activeScene === index;

              return (
                <button
                  key={scene.num}
                  type="button"
                  onClick={() => setActiveScene(index)}
                  aria-pressed={isActive}
                  className="group text-left focus:outline-none cursor-pointer"
                >
                  <span
                    className={`block aspect-[16/10] w-full overflow-hidden rounded-[3px] mb-2.5 transition-all bg-pure-white ${
                      isActive
                        ? 'border-2 border-crest-crimson opacity-100'
                        : 'border border-rule-gray opacity-75 group-hover:opacity-100'
                    }`}
                  >
                    {!failedWhyImages[scene.num] ? (
                      <img
                        src={scene.image}
                        alt={scene.shortTitle}
                        onError={() =>
                          setFailedWhyImages((prev) => ({
                            ...prev,
                            [scene.num]: true,
                          }))
                        }
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="flex w-full h-full p-2.5 flex-col justify-between bg-[#EEECE6]">
                        <span className="flex w-full h-full border border-rule-gray bg-pure-white p-2.5 flex-col justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-crest-crimson">
                            Scene {scene.num}
                          </span>
                          <span className="font-serif text-xs font-bold text-crest-navy leading-tight">
                            {scene.shortTitle}
                          </span>
                        </span>
                      </span>
                    )}
                  </span>
                  <span
                    className={`block text-xs sm:text-sm transition-colors ${
                      isActive
                        ? 'font-bold text-crest-navy'
                        : 'font-medium text-muted-slate group-hover:text-crest-navy'
                    }`}
                  >
                    {scene.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parent Testimonials — Editorial Community Voices Spread */}
      <section
        aria-label="Parent Testimonials"
        className="bg-pure-white py-16 lg:py-20 border-b border-rule-gray"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Quiet Typographic Pagination */}
          <div className="pb-6 mb-10 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                VOICES FROM OUR COMMUNITY
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                Trusted by Families Across Our Community
              </h2>
            </div>

            <div className="flex items-center gap-5 text-xs sm:text-sm shrink-0">
              <button
                type="button"
                onClick={() =>
                  setActiveStory(
                    (prev) =>
                      (prev - 1 + featuredTestimonials.length) %
                      featuredTestimonials.length,
                  )
                }
                className="text-muted-slate hover:text-crest-navy font-medium transition-colors cursor-pointer"
              >
                &larr; Previous
              </button>
              <span className="font-bold text-crest-navy tracking-wider">
                0{activeStory + 1} / 0{featuredTestimonials.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveStory(
                    (prev) => (prev + 1) % featuredTestimonials.length,
                  )
                }
                className="text-muted-slate hover:text-crest-navy font-medium transition-colors cursor-pointer"
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Asymmetric 12-Column Featured Parent Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-rule-gray">
            {/* Left Column (4 cols) — Borderless Family Portrait */}
            <figure className="lg:col-span-4">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-paper-ivory">
                {!failedTestimonialImages[activeStory] ? (
                  <img
                    key={currentTestimonial.image}
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    onError={() =>
                      setFailedTestimonialImages((prev) => ({
                        ...prev,
                        [activeStory]: true,
                      }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-paper-ivory">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-crest-crimson">
                        FAMILY PORTRAIT 0{activeStory + 1} / 0
                        {featuredTestimonials.length}
                      </span>
                      <div>
                        <p className="font-serif text-lg sm:text-xl font-bold text-crest-navy leading-snug">
                          {currentTestimonial.author}
                        </p>
                        <p className="mt-2 text-xs text-muted-slate leading-relaxed">
                          {currentTestimonial.meta}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-muted-slate break-all">
                        public{currentTestimonial.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 text-[11px] font-bold tracking-[0.08em] uppercase text-muted-slate">
                {currentTestimonial.familyCaption}
              </figcaption>
            </figure>

            {/* Right Column (8 cols) — Pull-Quote & Attribution */}
            <div className="lg:col-span-8 border-l-[3px] border-pencil-gold pl-6 sm:pl-8">
              <blockquote className="font-serif font-bold text-crest-navy text-xl sm:text-2xl lg:text-[28px] leading-snug mb-6">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>
              <p className="font-serif font-bold text-crest-navy text-base sm:text-lg">
                {currentTestimonial.author}
              </p>
              <p className="text-xs sm:text-sm text-muted-slate mt-0.5">
                {currentTestimonial.meta}
              </p>
            </div>
          </div>

          {/* Open 2-Column Secondary Quote Strip */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-rule-gray">
            {secondaryQuotes.map((item, index) => (
              <div
                key={item.author}
                className={index === 0 ? 'md:pr-8' : 'md:pl-8'}
              >
                <blockquote className="font-serif font-bold text-crest-navy text-base sm:text-lg leading-snug mb-2">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-muted-slate">
                  &mdash; {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Open Editorial Payment Ledger — SchoolPay & Admissions */}
      <section
        aria-label="SchoolPay Fee Payments and Admissions"
        className="bg-paper-ivory py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (6 cols) — Narrative & Merchant Registration */}
            <div data-aos="fade-up" className="lg:col-span-6">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#9A7400] mb-3">
                04. SEAMLESS FEE PAYMENTS &amp; ADMISSIONS
              </p>

              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                Convenient Tuition Payments via SchoolPay
              </h2>

              <p className="text-slate-ink/85 text-base leading-relaxed max-w-xl">
                {schoolProfile.name} is registered on SchoolPay under{' '}
                <strong className="font-semibold text-crest-navy">
                  &ldquo;{schoolProfile.schoolPay.registeredEntityName}&rdquo;
                </strong>
                , allowing parents and guardians to settle school fees securely
                through MTN Mobile Money, Airtel Money, and partner commercial
                banks with instant digital reconciliation.
              </p>
            </div>

            {/* Right Column (6 cols) — 3-Channel Ledger & Inline Actions */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="lg:col-span-6 lg:border-l lg:border-rule-gray lg:pl-12"
            >
              <div className="border-y border-rule-gray divide-y divide-rule-gray mb-7">
                <div className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="h-8 w-14 bg-[#FFCC00] border border-[#E5B800] rounded-[3px] px-2 py-1 flex items-center justify-center shrink-0">
                      <img
                        src="/images/payments/mtn-momo.png"
                        alt="MTN Mobile Money Logo"
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="font-serif font-bold text-crest-navy text-sm sm:text-base">
                      01. MTN Mobile Money
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-muted-slate">
                    Dial *165*4*3*2#
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="h-8 w-14 bg-pure-white border border-rule-gray rounded-[3px] px-2 py-1 flex items-center justify-center shrink-0">
                      <img
                        src="/images/payments/airtel-money.png"
                        alt="Airtel Money Logo"
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="font-serif font-bold text-crest-navy text-sm sm:text-base">
                      02. Airtel Money
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-muted-slate">
                    Dial *185*6*2#
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="h-8 w-14 bg-crest-navy text-pure-white rounded-[3px] text-[10px] font-bold uppercase tracking-[0.12em] flex items-center justify-center shrink-0">
                      BANK
                    </span>
                    <span className="font-serif font-bold text-crest-navy text-sm sm:text-base">
                      03. Partner Commercial Banks
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-muted-slate">
                    SchoolPay Slip
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/admissions#schoolpay"
                  className="inline-block bg-crest-crimson hover:bg-[#b82d20] text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors"
                >
                  SchoolPay Fees Guide
                </Link>

                <Link
                  to="/admissions"
                  className="text-sm font-semibold text-crest-navy underline underline-offset-4 hover:text-crest-crimson transition-colors"
                >
                  Start Admissions Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
