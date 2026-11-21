import { useState } from 'react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const [heroImageError, setHeroImageError] = useState(false);
  const [sceneErrors, setSceneErrors] = useState<
    Record<'morning' | 'kindergarten' | 'junior' | 'dearDay', boolean>
  >({
    morning: false,
    kindergarten: false,
    junior: false,
    dearDay: false,
  });

  return (
    <div>
      {/* Editorial Masthead + Wide Panoramic Campus Hero */}
      <section className="bg-paper-ivory pt-14 pb-12 lg:pt-16 lg:pb-16 border-b border-rule-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-Column Editorial Masthead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 mb-8 border-b border-rule-gray">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                ABOUT J-NERIC
              </p>
              <h1 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our School &amp; Heritage
              </h1>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-ink/85 text-base sm:text-lg leading-relaxed max-w-xl">
                Rooted in Namulanda Ward, Kajjansi Town Council along the
                Entebbe Road corridor, J-Neric Kindergarten &amp; Junior School
                provides disciplined, loving pre-primary and primary education.
              </p>
            </div>
          </div>

          {/* Wide Panoramic Campus Photograph */}
          <figure>
            <div className="w-full aspect-[21/9] max-h-[420px] overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
              {!heroImageError ? (
                <img
                  src="/images/campus/about-hero.jpg"
                  alt="Learners and teaching staff at J-Neric Kindergarten & Junior School in Namulanda, Kajjansi"
                  onError={() => setHeroImageError(true)}
                  className="w-full h-full object-cover object-[50%_18%]"
                />
              ) : (
                <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#EEECE6]">
                  <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em]">
                      <span className="text-crest-crimson">
                        Namulanda Campus Panorama
                      </span>
                      <span className="font-serif text-crest-navy">
                        J-Neric School
                      </span>
                    </div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-crest-navy">
                      Learners &amp; Teaching Staff — Namulanda, Kajjansi
                    </p>
                    <span className="font-mono text-[10px] text-muted-slate">
                      public/images/campus/about-hero.jpg
                    </span>
                  </div>
                </div>
              )}
            </div>

            <figcaption className="text-xs italic text-muted-slate mt-3">
              Learners and teaching staff at our Namulanda Campus, Kajjansi.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 01. Documentary Photo-Essay — Founding Vision & Campus Story */}
      <section
        aria-label="Founding Vision and Campus Story"
        className="bg-pure-white py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Scene 01 — Morning in Namulanda */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 border-b border-rule-gray"
          >
            {/* Wide Photo Left (7 cols) */}
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!sceneErrors.morning ? (
                  <img
                    src="/images/campus/about-morning.jpg"
                    alt="Learners smiling during morning classroom sessions at J-Neric in Namulanda"
                    onError={() =>
                      setSceneErrors((prev) => ({ ...prev, morning: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                        Scene 01 Archive
                      </span>
                      <p className="font-serif text-xl font-bold text-crest-navy">
                        Morning in Namulanda
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/about-morning.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Story Right (5 cols) */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                SCENE 01 &bull; MORNING IN NAMULANDA
              </p>

              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl leading-snug mb-4">
                Where Every Child Is Known by Name
              </h2>

              <div className="space-y-3 text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                <p>
                  Established in Namulanda Ward, Kajjansi Town Council along the
                  Entebbe Road corridor, J-Neric Kindergarten &amp; Junior
                  School gives families a disciplined, loving learning home
                  spanning Early Childhood Development through Primary Seven.
                </p>
                <p>
                  Following our August 2026 Official School Commissioning
                  presided over by Bishop Henry Katumba Tamale, every learner is
                  welcomed daily with structured care, reading culture, and
                  clear academic expectations.
                </p>
              </div>

              <Link
                to="/academics"
                className="inline-block mt-4 text-sm font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors"
              >
                Explore Our Academic Divisions
              </Link>
            </div>
          </div>

          {/* Scene 02 — From First Steps to Primary Seven (Photographic Diptych) */}
          <div data-aos="fade-up" className="pt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-1">
                  SCENE 02 &bull; CONTINUITY OF LEARNING
                </p>
                <h3 className="font-serif font-bold text-crest-navy text-xl sm:text-2xl">
                  From First Steps to Primary Seven
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-slate">
                Baby Class to P.7 on one Namulanda campus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Frame — Kindergarten Division */}
              <figure>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                  {!sceneErrors.kindergarten ? (
                    <img
                      src="/images/campus/about-kindergarten.jpg"
                      alt="Kindergarten learners discovering drawing and early learning activities at J-Neric"
                      onError={() =>
                        setSceneErrors((prev) => ({
                          ...prev,
                          kindergarten: true,
                        }))
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                      <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-laurel-green">
                          Kindergarten Archive
                        </span>
                        <p className="font-serif text-lg font-bold text-crest-navy">
                          Early Years: First Steps in Curiosity
                        </p>
                        <span className="font-mono text-[10px] text-muted-slate">
                          public/images/campus/about-kindergarten.jpg
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-serif font-bold text-crest-navy text-sm">
                    Early Years: First Steps in Curiosity
                  </span>
                  <span className="text-xs text-muted-slate">
                    Baby, Middle &amp; Top Class
                  </span>
                </figcaption>
              </figure>

              {/* Right Frame — Junior School Division */}
              <figure>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                  {!sceneErrors.junior ? (
                    <img
                      src="/images/campus/about-junior.jpg"
                      alt="Junior School learner writing attentively in class at J-Neric Junior School"
                      onError={() =>
                        setSceneErrors((prev) => ({ ...prev, junior: true }))
                      }
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full p-5 flex flex-col justify-between bg-[#EEECE6]">
                      <div className="w-full h-full border border-rule-gray bg-pure-white p-5 flex flex-col justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-sky">
                          Junior School Archive
                        </span>
                        <p className="font-serif text-lg font-bold text-crest-navy">
                          Junior School: Disciplined Readiness for P.7
                        </p>
                        <span className="font-mono text-[10px] text-muted-slate">
                          public/images/campus/about-junior.jpg
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-serif font-bold text-crest-navy text-sm">
                    Junior School: Disciplined Readiness for P.7
                  </span>
                  <span className="text-xs text-muted-slate">
                    Primary One &ndash; Primary Seven
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Asymmetric Motto Spotlight + Stacked Pillars */}
      <section
        aria-label="Mission, Vision, Motto and Core Values"
        className="bg-paper-ivory py-16 lg:py-20 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header */}
          <div
            data-aos="fade-up"
            className="pb-6 mb-10 border-b border-rule-gray"
          >
            <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
              02. INSTITUTIONAL IDENTITY
            </p>
            <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
              Mission, Vision, Motto &amp; Core Values
            </h2>
            <p className="text-sm text-muted-slate max-w-xl mt-2.5 leading-relaxed">
              The four foundational commitments that govern our classrooms,
              discipline standards, and daily community life.
            </p>
          </div>

          {/* Asymmetric 12-Column Editorial Spread (Full-Height Gold Anchor + Centered Motto) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column (5 cols) — Full-Height Gold Bar with Vertically Centered Motto */}
            <div data-aos="fade-up" className="lg:col-span-5 flex">
              <div className="w-full h-full border-l-[4px] border-pencil-gold pl-6 sm:pl-8 py-4 lg:py-8 flex flex-col justify-center">
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-3">
                  01. OUR MOTTO
                </p>
                <p className="font-serif italic font-bold text-crest-navy text-3xl sm:text-4xl leading-tight mb-4">
                  &ldquo;Nurture with Love&rdquo;
                </p>
                <p className="text-slate-ink/85 text-base leading-relaxed max-w-md">
                  Every lesson, correction, and daily interaction is anchored in
                  warmth, patience, and genuine care for each learner&rsquo;s
                  dignity and potential.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols) — Stacked Pillars */}
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="lg:col-span-7 lg:border-l lg:border-rule-gray lg:pl-12"
            >
              <div className="divide-y divide-rule-gray">
                {/* Row 1 — Our Vision */}
                <div className="pb-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                  <div className="sm:col-span-4 flex items-baseline gap-2.5">
                    <span className="font-serif font-bold text-crest-navy text-lg">
                      02.
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson">
                      OUR VISION
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="font-serif font-bold text-crest-navy text-lg sm:text-xl mb-2">
                      Confident, Grounded Lifelong Learners
                    </h3>
                    <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                      To raise morally upright, articulate, and academically
                      capable young citizens prepared to thrive in secondary
                      school and serve their communities with integrity.
                    </p>
                  </div>
                </div>

                {/* Row 2 — Our Mission */}
                <div className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                  <div className="sm:col-span-4 flex items-baseline gap-2.5">
                    <span className="font-serif font-bold text-crest-navy text-lg">
                      03.
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson">
                      OUR MISSION
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="font-serif font-bold text-crest-navy text-lg sm:text-xl mb-2">
                      Holistic Pre-Primary &amp; Primary Formation
                    </h3>
                    <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                      To provide a safe, structured, and joyful school
                      environment in Namulanda that builds foundational
                      literacy, numeracy, curiosity, discipline, and Christian
                      moral character.
                    </p>
                  </div>
                </div>

                {/* Row 3 — Core Values */}
                <div className="pt-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                  <div className="sm:col-span-4 flex items-baseline gap-2.5">
                    <span className="font-serif font-bold text-crest-navy text-lg">
                      04.
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson">
                      CORE VALUES
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="font-serif font-bold text-crest-navy text-lg sm:text-xl mb-2">
                      Love, Discipline, Diligence &amp; Partnership
                    </h3>
                    <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                      We uphold child-centered kindness, personal
                      responsibility, a thriving reading culture, respect for
                      God and neighbor, and transparent communication with
                      parents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Scene 03 & Teaching Ethos — Governance & Child-Centered Philosophy */}
      <section
        aria-label="Governance and Teaching Ethos"
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
                03. GOVERNANCE &amp; TEACHING ETHOS
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                Leadership &amp; Child-Centered Philosophy
              </h2>
            </div>

            <p className="text-sm text-muted-slate max-w-md">
              Stewarded by Director Jackline Luga and 13+ dedicated teachers
              committed to academic rigor and tender care.
            </p>
          </div>

          {/* Scene 03 — Reading Culture & Faculty */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 border-b border-rule-gray"
          >
            {/* Lead Photo Left (7 cols) */}
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
                {!sceneErrors.dearDay ? (
                  <img
                    src="/images/campus/dear-day-reading.jpg"
                    alt="J-Neric learners reading together during enjuba's Drop Everything And Read Day"
                    onError={() =>
                      setSceneErrors((prev) => ({ ...prev, dearDay: true }))
                    }
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EEECE6]">
                    <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                        Scene 03 Archive
                      </span>
                      <p className="font-serif text-xl font-bold text-crest-navy">
                        enjuba DEAR Day Reading Culture
                      </p>
                      <span className="font-mono text-[10px] text-muted-slate">
                        public/images/campus/dear-day-reading.jpg
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Narrative Right (5 cols) */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                SCENE 03 &bull; READING CULTURE &amp; FACULTY
              </p>

              <h3 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl leading-snug mb-4">
                enjuba DEAR Day &amp; Structured Instruction
              </h3>

              <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed mb-4">
                Our faculty delivers structured phonics in Early Years and
                rigorous Uganda National Curriculum instruction across Primary
                One through Primary Seven. Whole-school literacy
                initiatives&mdash;including participation in enjuba&rsquo;s Drop
                Everything And Read (DEAR) Day with over 150 learners and 13+
                teachers&mdash;cultivate confident, inquisitive readers.
              </p>

              <Link
                to="/news"
                className="inline-block text-sm font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy transition-colors"
              >
                Read Our Literacy &amp; Campus News
              </Link>
            </div>
          </div>

          {/* Open 2-Column Spread — Pastoral Care & Family Partnership */}
          <div
            data-aos="fade-up"
            className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12"
          >
            {/* Left Column — Pastoral Care & Safety */}
            <div className="border-l-[3px] border-crest-navy pl-5">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                PASTORAL CARE &amp; SAFETY
              </p>
              <h3 className="font-serif font-bold text-crest-navy text-xl sm:text-2xl mb-3">
                Child Safety, Dignity &amp; Morning Devotion
              </h3>
              <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                Every child is received warmly at the gate, supervised closely
                throughout lessons and outdoor play, and corrected with firmness
                rooted in love. Daily morning devotions anchor our learners in
                gratitude, honesty, and respect for God and neighbor.
              </p>
            </div>

            {/* Right Column — Family Partnership */}
            <div className="md:border-l md:border-rule-gray md:pl-10 lg:pl-12">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                FAMILY PARTNERSHIP
              </p>
              <h3 className="font-serif font-bold text-crest-navy text-xl sm:text-2xl mb-3">
                Open Parent-Teacher Partnership
              </h3>
              <p className="text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                Education succeeds best when families and teachers speak
                candidly and often. Through scheduled termly visitation days,
                timely academic feedback, and accessible campus leadership,
                parents remain active partners in their child&rsquo;s growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Visit Namulanda Campus Invitation Band */}
      <section
        aria-label="Visit Namulanda Campus"
        data-aos="fade-up"
        className="bg-paper-ivory py-14 lg:py-16 border-b border-rule-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Editorial Invitation */}
            <div className="border-l-[3px] border-pencil-gold pl-5 sm:pl-6 max-w-2xl">
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                VISIT NAMULANDA CAMPUS
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl leading-snug mb-2.5">
                Meet our teachers and tour our classrooms in person.
              </h2>
              <p className="text-sm sm:text-base text-slate-ink/85 leading-relaxed">
                Walk our Kindergarten and Junior School wings along Entebbe Road
                with Director Jackline Luga and our academic team.
              </p>
            </div>

            {/* Right Inline Actions */}
            <div className="flex flex-wrap items-center gap-6 shrink-0">
              <Link
                to="/admissions"
                className="inline-block bg-crest-crimson hover:bg-[#b82d20] text-pure-white font-semibold text-sm px-6 py-3 rounded-[3px] tracking-wide transition-colors whitespace-nowrap"
              >
                Book a Campus Visit
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
      </section>
    </div>
  );
}
