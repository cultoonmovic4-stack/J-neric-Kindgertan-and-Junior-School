import { useState } from 'react';
import { Link } from 'react-router-dom';
import { academicDivisions } from '../data/academicsData';

interface CoCurricularPlate {
  id: string;
  title: string;
  tag: string;
  plateLabel: string;
  image: string;
  caption: string;
  description: string;
}

type TimetableDivision = 'All Learners' | 'Kindergarten' | 'Junior School';
type TimetableFilter = 'all' | 'kindergarten' | 'junior';

interface TimetableRow {
  time: string;
  activity: string;
  division: TimetableDivision;
  notes: string;
}

const timetableRows: TimetableRow[] = [
  {
    time: '7:30 AM – 8:00 AM',
    activity: 'Arrival, Welcome & Morning Devotion',
    division: 'All Learners',
    notes:
      'Teachers receive learners at the gate; assembly, prayers, and school motto reflection.',
  },
  {
    time: '8:00 AM – 10:00 AM',
    activity: 'Core Morning Lessons (Block I)',
    division: 'All Learners',
    notes:
      'Phonics and early numeracy in Kindergarten; English and Mathematics in Junior School.',
  },
  {
    time: '10:00 AM – 10:30 AM',
    activity: 'Morning Break & Nutritious Porridge',
    division: 'All Learners',
    notes: 'Supervised refreshment and outdoor social break.',
  },
  {
    time: '10:30 AM – 12:40 PM',
    activity: 'Core Lessons & Guided Practice (Block II)',
    division: 'All Learners',
    notes:
      'Integrated Science, Social Studies, Literacy reading sessions, and sensory activities.',
  },
  {
    time: '12:40 PM – 1:40 PM',
    activity: 'Lunch & Midday Rest',
    division: 'All Learners',
    notes:
      'Warm school lunch followed by Kindergarten rest time and quiet reading for Primary classes.',
  },
  {
    time: '1:40 PM – 2:30 PM',
    activity: 'Kindergarten Afternoon Enrichment & Dismissal',
    division: 'Kindergarten',
    notes:
      'Storytelling, art, and orderly parent pick-up for Baby, Middle, and Top Class learners.',
  },
  {
    time: '1:40 PM – 3:45 PM',
    activity: 'Afternoon Primary Lessons & Guided Revision',
    division: 'Junior School',
    notes:
      'Subject consolidation, writing workshops, and individual teacher support.',
  },
  {
    time: '3:45 PM – 4:30 PM',
    activity: 'Co-Curricular Clubs, Sports & Junior School Dismissal',
    division: 'Junior School',
    notes:
      'Games, reading clubs, choir practice, closing prayer, and supervised departure at 4:30 PM.',
  },
];

const timetableFilters: { id: TimetableFilter; label: string }[] = [
  { id: 'all', label: 'ALL LEARNERS' },
  { id: 'kindergarten', label: 'KINDERGARTEN' },
  { id: 'junior', label: 'JUNIOR SCHOOL' },
];

const coCurricularPlates: CoCurricularPlate[] = [
  {
    id: '01',
    title: 'Reading Culture & DEAR Day',
    tag: 'Literacy & Library',
    plateLabel: 'PLATE 01 / 04 • ENJUBA DEAR DAY',
    image: '/images/campus/dear-day-reading.jpg',
    caption:
      "Over 150+ learners and 13+ teachers participating in enjuba's Drop Everything And Read (DEAR) Day.",
    description:
      "We champion joyful literacy through classroom reading corners, storytelling circles, and whole-school participation in enjuba's Drop Everything And Read (DEAR) Day, involving 150+ learners and 13+ teachers on our Namulanda campus.",
  },
  {
    id: '02',
    title: 'Music, Dance & Drama',
    tag: 'Stage & Poise',
    plateLabel: 'PLATE 02 / 04 • CREATIVE EXPRESSION',
    image: '/images/campus/music-dance-drama.jpg',
    caption:
      'Choral singing, poetry recitation, and termly cultural performances for parents.',
    description:
      'Learners build stage poise, rhythm, and expressive confidence through choral singing, poetry recitation, and termly cultural performances for parents.',
  },
  {
    id: '03',
    title: 'Physical Education & Outdoor Play',
    tag: 'Teamwork & Stamina',
    plateLabel: 'PLATE 03 / 04 • ACTIVE PLAY',
    image: '/images/campus/outdoor-sports.jpg',
    caption:
      'Structured games, coordination drills, and supervised outdoor play across both divisions.',
    description:
      'Structured games, coordination drills, and supervised outdoor play nurture physical stamina, teamwork, and sportsmanship across both divisions.',
  },
  {
    id: '04',
    title: 'Christian Moral Formation & Devotion',
    tag: 'Daily Devotion',
    plateLabel: 'PLATE 04 / 04 • CHARACTER & FAITH',
    image: '/images/campus/morning-devotion.jpg',
    caption:
      'Daily morning devotion, scripture memory, and guided character conversations.',
    description:
      'Daily morning devotion, scripture memory, and guided character conversations reinforce honesty, gratitude, kindness, and respect for community.',
  },
];

export function AcademicsPage() {
  const [heroErrors, setHeroErrors] = useState<{
    kindergarten: boolean;
    junior: boolean;
  }>({ kindergarten: false, junior: false });
  const [circleTimeError, setCircleTimeError] = useState(false);
  const [kindergartenClassErrors, setKindergartenClassErrors] = useState<
    Record<string, boolean>
  >({});
  const [juniorClassroomErrors, setJuniorClassroomErrors] = useState<{
    wide: boolean;
    detail: boolean;
  }>({ wide: false, detail: false });
  const [primaryClassErrors, setPrimaryClassErrors] = useState<
    Record<string, boolean>
  >({});
  const [plateErrors, setPlateErrors] = useState<Record<string, boolean>>({});
  const [timetableFilter, setTimetableFilter] =
    useState<TimetableFilter>('all');
  const [welcomeVerandaError, setWelcomeVerandaError] = useState(false);
  const kindergarten = academicDivisions.find((d) => d.id === 'kindergarten')!;
  const juniorSchool = academicDivisions.find((d) => d.id === 'junior-school')!;
  const visibleTimetableRows = timetableRows.filter((row) => {
    if (timetableFilter === 'all') return true;
    if (timetableFilter === 'kindergarten') {
      return row.division === 'All Learners' || row.division === 'Kindergarten';
    }
    return row.division === 'All Learners' || row.division === 'Junior School';
  });

  return (
    <div>
      {/* Editorial Masthead + Two-Division Photographic Diptych Hero */}
      <section className="bg-paper-ivory pt-14 pb-12 lg:pt-16 lg:pb-16 border-b border-rule-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-Column Editorial Masthead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 mb-8 border-b border-rule-gray">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                ACADEMICS &amp; DAILY LIFE
              </p>
              <h1 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Academics &amp; Curriculum
              </h1>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-ink/85 text-base sm:text-lg leading-relaxed max-w-xl">
                From joyful phonics and early discovery in Kindergarten to
                disciplined national-curriculum mastery in Primary One through
                Primary Seven, every stage is guided with warmth and structure.
              </p>
            </div>
          </div>

          {/* Two-Division Photographic Diptych */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Frame — Kindergarten Division */}
            <figure>
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!heroErrors.kindergarten ? (
                  <img
                    src="/images/campus/academics-kindergarten.jpg"
                    alt="J-Neric Kindergarten learners engaged in joyful early discovery activities"
                    onError={() =>
                      setHeroErrors((prev) => ({ ...prev, kindergarten: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-laurel-green">
                        Early Years Archive
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        Kindergarten Division
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/academics-kindergarten.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif font-bold text-crest-navy text-sm">
                  Kindergarten Division
                </span>
                <span className="text-xs text-muted-slate">
                  Baby, Middle &amp; Top Class
                </span>
              </figcaption>
            </figure>

            {/* Right Frame — Junior School Division */}
            <figure>
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!heroErrors.junior ? (
                  <img
                    src="/images/campus/academics-junior.jpg"
                    alt="J-Neric Junior School primary learner focused on classroom writing"
                    onError={() =>
                      setHeroErrors((prev) => ({ ...prev, junior: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-sky">
                        Primary Section Archive
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        Junior School Division
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/academics-junior.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif font-bold text-crest-navy text-sm">
                  Junior School Division
                </span>
                <span className="text-xs text-muted-slate">
                  Primary One to Primary Seven
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 01. Early Years Circle Time Scene — J-Neric Kindergarten */}
      <section
        aria-label="J-Neric Kindergarten"
        className="bg-pure-white py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header */}
          <div
            data-aos="fade-up"
            className="pb-6 mb-10 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                01. EARLY YEARS DIVISION
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                {kindergarten.name}
              </h2>
            </div>

            <p className="text-sm text-muted-slate">
              {kindergarten.subtitle}
            </p>
          </div>

          {/* Two-Column Open Scene Spread (Zero Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (6 cols) — Circle Time Scene & Foundation Narrative */}
            <div data-aos="fade-up" className="lg:col-span-6">
              <figure>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                  {!circleTimeError ? (
                    <img
                      src="/images/campus/kindergarten-circle-time.jpg"
                      alt="J-Neric Kindergarten learners smiling together during early childhood circle time"
                      onError={() => setCircleTimeError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EEECE6]">
                      <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-laurel-green">
                          Early Years Archive
                        </span>
                        <p className="font-serif text-xl font-bold text-crest-navy">
                          Kindergarten Circle Time
                        </p>
                        <span className="font-mono text-[10px] text-muted-slate">
                          public/images/campus/kindergarten-circle-time.jpg
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <figcaption className="text-xs italic text-muted-slate mt-3 mb-7">
                  Early Childhood Foundation &mdash; Settlement, play, and
                  phonics under caring guidance.
                </figcaption>
              </figure>

              <div>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                  EARLY CHILDHOOD FOUNDATION
                </p>
                <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                  {kindergarten.summary}
                </p>
              </div>
            </div>

            {/* Right Column (6 cols) — Open Class Progression & Core Learning Areas */}
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="lg:col-span-6"
            >
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson pb-3 border-b border-rule-gray">
                KINDERGARTEN CLASS PROGRESSION
              </p>

              <div className="divide-y divide-rule-gray border-b border-rule-gray mb-8">
                {kindergarten.classes.map((cls, index) => (
                  <div
                    key={cls.name}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-start"
                  >
                    {cls.image && (
                      <div className="sm:col-span-4 aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                        {!kindergartenClassErrors[cls.name] ? (
                          <img
                            src={cls.image}
                            alt={cls.imageAlt ?? `${cls.name} at J-Neric Kindergarten`}
                            onError={() =>
                              setKindergartenClassErrors((prev) => ({
                                ...prev,
                                [cls.name]: true,
                              }))
                            }
                            className={`w-full h-full object-cover ${
                              index === 2 ? 'object-[50%_20%]' : 'object-top'
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full p-2.5 flex flex-col justify-between bg-[#EEECE6]">
                            <div className="w-full h-full border border-rule-gray bg-pure-white p-2.5 flex flex-col justify-between">
                              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-laurel-green">
                                Early Years
                              </span>
                              <p className="font-serif text-xs font-bold text-crest-navy">
                                {cls.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className={cls.image ? 'sm:col-span-8' : 'sm:col-span-12'}>
                      <h3 className="font-serif font-bold text-crest-navy text-lg">
                        0{index + 1}. {cls.name}
                      </h3>
                      <span className="block text-[11px] font-bold tracking-[0.08em] uppercase text-crest-crimson mt-0.5 mb-2">
                        AGES {cls.ageRange}
                      </span>
                      <p className="text-slate-ink/85 text-sm leading-relaxed">
                        {cls.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-4">
                  CORE LEARNING AREAS
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-ink/85">
                  {kindergarten.curriculumFocus.map((point, index) => (
                    <p key={point} className="leading-relaxed">
                      <span className="font-serif font-bold text-crest-navy mr-1.5">
                        0{index + 1}.
                      </span>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Junior School Documentary Scene — J-Neric Junior School (P.1 – P.7) */}
      <section
        aria-label="J-Neric Junior School"
        className="bg-paper-ivory py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header */}
          <div
            data-aos="fade-up"
            className="pb-6 mb-10 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                02. PRIMARY DIVISION
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                {juniorSchool.name} (P.1 &ndash; P.7)
              </h2>
            </div>

            <p className="text-sm text-muted-slate">
              {juniorSchool.subtitle}
            </p>
          </div>

          {/* Asymmetric Two-Photo Documentary Strip + Curriculum Note */}
          <figure data-aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
              {/* Left Wide Frame (8 cols) */}
              <div className="md:col-span-8 h-[240px] sm:h-[300px] lg:h-[340px] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!juniorClassroomErrors.wide ? (
                  <img
                    src="/images/campus/junior-classroom-wide.jpg"
                    alt="J-Neric Junior School teacher guiding primary learners in classroom instruction"
                    onError={() =>
                      setJuniorClassroomErrors((prev) => ({
                        ...prev,
                        wide: true,
                      }))
                    }
                    className="w-full h-full object-cover object-[50%_18%]"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-sky">
                        Primary Division Archive
                      </span>
                      <p className="font-serif text-xl font-bold text-crest-navy">
                        J-Neric Junior School Classroom
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/junior-classroom-wide.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Accent Frame (4 cols) */}
              <div className="md:col-span-4 h-[240px] sm:h-[300px] lg:h-[340px] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!juniorClassroomErrors.detail ? (
                  <img
                    src="/images/campus/junior-classroom.jpg"
                    alt="Smiling J-Neric Junior School learners writing in class"
                    onError={() =>
                      setJuniorClassroomErrors((prev) => ({
                        ...prev,
                        detail: true,
                      }))
                    }
                    className="w-full h-full object-cover object-[50%_35%]"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-sky">
                        Primary Learners
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        Engaged Daily Study
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/junior-classroom.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <figcaption className="mt-3 pb-10 border-b border-rule-gray flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="text-xs sm:text-sm italic text-muted-slate">
                Uganda National Primary Curriculum &mdash; Strong emphasis on
                reading comprehension, analytical mathematics, and practical
                science.
              </span>
              <span className="text-xs text-muted-slate shrink-0">
                Includes enjuba DEAR Day reading culture, weekly assessment, and
                thorough PLE readiness.
              </span>
            </figcaption>
          </figure>

          {/* Open 3-Column Progression Strip (Zero Cards) */}
          <div
            data-aos="fade-up"
            data-aos-delay="120"
            className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 md:divide-x md:divide-rule-gray"
          >
            {juniorSchool.classes.map((cls, index) => {
              const colSpacing =
                index === 0 ? 'md:pr-6' : index === 1 ? 'md:px-8' : 'md:pl-8';

              return (
                <div key={cls.name} className={colSpacing}>
                  {cls.image && (
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6] mb-4">
                      {!primaryClassErrors[cls.name] ? (
                        <img
                          src={cls.image}
                          alt={
                            cls.imageAlt ?? `${cls.name} at J-Neric Junior School`
                          }
                          onError={() =>
                            setPrimaryClassErrors((prev) => ({
                              ...prev,
                              [cls.name]: true,
                            }))
                          }
                          className={`w-full h-full object-cover ${
                            index === 1 ? 'object-[50%_30%]' : 'object-top'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full p-3 flex flex-col justify-between bg-[#EEECE6]">
                          <div className="w-full h-full border border-rule-gray bg-pure-white p-3 flex flex-col justify-between">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-crest-sky">
                              Primary Division
                            </span>
                            <p className="font-serif text-sm font-bold text-crest-navy">
                              {cls.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <h3 className="font-serif font-bold text-crest-navy text-lg sm:text-xl mb-1">
                    <span className="text-crest-sky mr-1.5">
                      0{index + 1}.
                    </span>
                    {cls.name}
                  </h3>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson mb-3">
                    AGES {cls.ageRange}
                  </p>
                  <p className="text-slate-ink/85 text-sm leading-relaxed">
                    {cls.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. Co-Curriculars & Reading Culture — Living Archive */}
      <section
        aria-label="Co-Curriculars and Reading Culture"
        data-aos="fade-up"
        className="bg-pure-white py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header */}
          <div className="pb-6 mb-10 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                03. WHOLE-CHILD FORMATION
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                Co-Curriculars &amp; Reading Culture
              </h2>
            </div>

            <p className="text-sm text-muted-slate max-w-md">
              Beyond classroom notebooks, learners grow through shared reading,
              creative expression, physical activity, and Christian character
              mentorship.
            </p>
          </div>

          {/* Static 2-Column Editorial Gallery (Zero Cards, Zero Click-to-Expand) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12 gap-y-12">
            {coCurricularPlates.map((plate) => (
              <article key={plate.id} className="flex flex-col">
                <figure>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-paper-ivory">
                    {!plateErrors[plate.id] ? (
                      <img
                        src={plate.image}
                        alt={plate.caption}
                        onError={() =>
                          setPlateErrors((prev) => ({
                            ...prev,
                            [plate.id]: true,
                          }))
                        }
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-paper-ivory">
                        <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-crest-crimson">
                            {plate.plateLabel}
                          </span>
                          <p className="font-serif text-lg font-bold text-crest-navy leading-snug">
                            {plate.id}. {plate.title}
                          </p>
                          <span className="font-mono text-[10px] text-muted-slate break-all">
                            public{plate.image}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule-gray pt-3">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson">
                      {plate.plateLabel}
                    </span>
                    <span className="text-xs font-semibold text-muted-slate shrink-0">
                      {plate.tag}
                    </span>
                  </figcaption>
                </figure>

                <h3 className="mt-2.5 font-serif font-bold text-crest-navy text-xl sm:text-2xl">
                  {plate.id}. {plate.title}
                </h3>

                <p className="mt-2 text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                  {plate.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Typical School Day Timetable — Open Editorial Ledger */}
      <section
        aria-label="Typical School Day Timetable"
        data-aos="fade-up"
        className="bg-paper-ivory py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header + Quiet Inline Filter */}
          <div className="pb-6 mb-2 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                04. DAILY STRUCTURE
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl mb-2">
                Typical School Day Timetable
              </h2>
              <p className="text-sm text-muted-slate max-w-xl">
                A predictable, well-paced day from 7:30 AM Morning Devotion
                through 4:30 PM Junior School Dismissal balances focused study
                with nutrition, rest, and play.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter timetable by school division"
              className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-[0.08em] uppercase shrink-0"
            >
              {timetableFilters.map((filter, index) => {
                const isActive = timetableFilter === filter.id;

                return (
                  <div key={filter.id} className="flex items-center gap-4">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="text-rule-gray pb-1 select-none font-normal"
                      >
                        |
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setTimetableFilter(filter.id)}
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? 'text-crest-navy border-b-2 border-crest-crimson pb-1 cursor-pointer'
                          : 'text-muted-slate hover:text-crest-navy pb-1 transition-colors cursor-pointer'
                      }
                    >
                      {filter.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Open Full-Width Editorial Ledger */}
          <div className="divide-y divide-rule-gray border-b border-rule-gray">
            {visibleTimetableRows.map((row) => {
              const divisionColorClass =
                row.division === 'All Learners'
                  ? 'text-xs font-semibold text-crest-crimson'
                  : row.division === 'Kindergarten'
                    ? 'text-xs font-semibold text-[#1f6b43]'
                    : 'text-xs font-semibold text-crest-navy';

              return (
                <div
                  key={`${row.time}-${row.activity}`}
                  className="py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-8 items-baseline hover:bg-pure-white/50 px-2 -mx-2 rounded-[3px] transition-colors"
                >
                  <p className="lg:col-span-2 text-sm font-bold text-crest-navy whitespace-nowrap">
                    {row.time}
                  </p>
                  <p className="lg:col-span-3 font-serif font-bold text-crest-navy text-base leading-snug">
                    {row.activity}
                  </p>
                  <p className={`lg:col-span-2 ${divisionColorClass}`}>
                    {row.division}
                  </p>
                  <p className="lg:col-span-5 text-sm text-slate-ink/85 leading-relaxed">
                    {row.notes}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Human Closing Scene — Compact Photo + Invitation Split */}
          <div className="pt-12 mt-6 border-t border-rule-gray grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (5 cols) — Welcoming Campus Scene */}
            <div className="lg:col-span-5">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!welcomeVerandaError ? (
                  <img
                    src="/images/campus/welcome-veranda.jpg"
                    alt="Welcoming veranda at J-Neric Kindergarten and Junior School campus in Namulanda"
                    onError={() => setWelcomeVerandaError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                        Namulanda Campus Archive
                      </span>
                      <p className="font-serif text-lg font-bold text-crest-navy">
                        Campus Welcome Veranda
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/welcome-veranda.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (7 cols) — Admissions Invitation */}
            <div className="lg:col-span-7 border-l-[3px] border-pencil-gold pl-5 sm:pl-6">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                READY TO SEE OUR CLASSROOMS?
              </p>
              <h3 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl leading-snug mb-3">
                Schedule a campus tour or explore our four-step admissions
                process.
              </h3>
              <p className="text-sm sm:text-base text-slate-ink/85 leading-relaxed mb-6 max-w-xl">
                Visit our Namulanda campus to observe Kindergarten and Junior
                School lessons and meet our teachers.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/admissions"
                  className="inline-block bg-crest-crimson hover:bg-[#b82d20] text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors whitespace-nowrap"
                >
                  Proceed to Admissions
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-crest-navy underline underline-offset-4 hover:text-crest-crimson transition-colors whitespace-nowrap"
                >
                  Contact Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
