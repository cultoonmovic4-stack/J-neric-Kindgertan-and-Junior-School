import { useEffect, useRef, useState, type FormEvent } from 'react';
import Swal from 'sweetalert2';
import { schoolProfile } from '../data/schoolProfile';
import type {
  AdmissionDivisionLabel,
  AdmissionInquiryPayload,
} from '../types/school';
import { SectionHeading } from '../components/ui/SectionHeading';

const VISIT_CHECKLIST_ITEMS = [
  'Copy of the child’s immunization card or birth certificate',
  'Most recent school report (for Primary transfers P.1 – P.7)',
  'Two recent passport-size photographs of the learner',
];

const CLASSES_BY_DIVISION: Record<AdmissionDivisionLabel, string[]> = {
  Kindergarten: ['Baby Class', 'Middle Class', 'Top Class'],
  'Junior School': [
    'Primary One (P.1)',
    'Primary Two (P.2)',
    'Primary Three (P.3)',
    'Primary Four (P.4)',
    'Primary Five (P.5)',
    'Primary Six (P.6)',
    'Primary Seven (P.7)',
  ],
};

const INITIAL_FORM_STATE: AdmissionInquiryPayload = {
  parentFullName: '',
  phoneNumber: '',
  email: '',
  childFullName: '',
  childDateOfBirth: '',
  division: 'Kindergarten',
  classApplyingFor: CLASSES_BY_DIVISION.Kindergarten[0],
  preferredVisitDate: '',
  message: '',
};

type FormErrors = Partial<Record<keyof AdmissionInquiryPayload, string>>;

function isValidUgandanPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s()-]/g, '');
  return /^(?:\+?256|0)(?:7\d{8}|3\d{8}|2\d{8})$/.test(cleaned);
}

export function AdmissionsPage() {
  const [heroImageError, setHeroImageError] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const vLineRef = useRef<HTMLDivElement | null>(null);
  const hLineRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const titleLayerRef = useRef<HTMLDivElement | null>(null);
  const frameLayerRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] =
    useState<AdmissionInquiryPayload>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  const enrollmentSteps = schoolProfile.enrollmentSteps;
  const currentStep = enrollmentSteps[activeStepIndex] ?? enrollmentSteps[0];
  const availableClasses = CLASSES_BY_DIVISION[formData.division];

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const target = { x: 0.5, y: 0.5, active: false };
    const current = { x: 0.5, y: 0.5 };
    let rafId: number | null = null;

    function applyTransforms() {
      if (!panel) return;
      const px = current.x * panel.clientWidth;
      const py = current.y * panel.clientHeight;
      const offsetX = (current.x - 0.5) * 2;
      const offsetY = (current.y - 0.5) * 2;

      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${px}px, 0, 0)`;
      }
      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${py}px, 0)`;
      }
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }
      if (titleLayerRef.current) {
        titleLayerRef.current.style.transform = `translate3d(${offsetX * 10}px, ${offsetY * 7}px, 0)`;
      }
      if (frameLayerRef.current) {
        frameLayerRef.current.style.transform = `translate3d(${offsetX * -6}px, ${offsetY * -4}px, 0)`;
      }
    }

    function stepAnimation() {
      const ease = target.active ? 0.15 : 0.09;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      applyTransforms();

      const settled =
        !target.active &&
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005;

      if (settled) {
        current.x = target.x;
        current.y = target.y;
        applyTransforms();
        rafId = null;
        return;
      }

      rafId = window.requestAnimationFrame(stepAnimation);
    }

    function ensureLoopRunning() {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(stepAnimation);
      }
    }

    function handleMouseMove(event: MouseEvent) {
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      target.x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      target.y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      target.active = true;
      ensureLoopRunning();
    }

    function handleMouseEnter(event: MouseEvent) {
      setIsPanelHovered(true);
      handleMouseMove(event);
    }

    function handleMouseLeave() {
      setIsPanelHovered(false);
      target.x = 0.5;
      target.y = 0.5;
      target.active = false;
      ensureLoopRunning();
    }

    panel.addEventListener('mouseenter', handleMouseEnter);
    panel.addEventListener('mousemove', handleMouseMove);
    panel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      panel.removeEventListener('mouseenter', handleMouseEnter);
      panel.removeEventListener('mousemove', handleMouseMove);
      panel.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  function handleDivisionChange(nextDivision: AdmissionDivisionLabel) {
    setFormData((prev) => ({
      ...prev,
      division: nextDivision,
      classApplyingFor: CLASSES_BY_DIVISION[nextDivision][0],
    }));
    setErrors((prev) => ({ ...prev, division: undefined, classApplyingFor: undefined }));
  }

  function validate(values: AdmissionInquiryPayload): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.parentFullName.trim()) {
      nextErrors.parentFullName = 'Please enter the parent or guardian full name.';
    }

    if (!values.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Please provide a Ugandan mobile or office telephone number.';
    } else if (!isValidUgandanPhone(values.phoneNumber)) {
      nextErrors.phoneNumber =
        'Enter a valid Ugandan phone number (e.g., 0772 098405 or +256 772 098405).';
    }

    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address or leave this field blank.';
    }

    if (!values.childFullName.trim()) {
      nextErrors.childFullName = 'Please enter the prospective learner’s full name.';
    }

    if (!values.childDateOfBirth) {
      nextErrors.childDateOfBirth = 'Please select the learner’s date of birth.';
    }

    if (!values.classApplyingFor) {
      nextErrors.classApplyingFor = 'Please select the class applying for.';
    }

    if (!values.preferredVisitDate) {
      nextErrors.preferredVisitDate =
        'Please select a preferred date for your campus visit or assessment.';
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const parentName = formData.parentFullName.trim();
    const childName = formData.childFullName.trim();

    setFormData(INITIAL_FORM_STATE);
    setErrors({});

    void Swal.fire({
      icon: 'success',
      iconColor: '#1F7A3E',
      title: 'Admission Request Sent',
      text: `Thanks ${parentName}, The admission request for ${childName} has been sent successfully and you will contacted by the school soon`,
      timer: 6000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#FFFFFF',
      color: '#1A1D29',
      customClass: {
        popup: '!rounded-[3px] border border-rule-gray',
      },
    });
  }

  return (
    <div>
      {/* Editorial Masthead + Wide Panoramic Campus Hero */}
      <section className="bg-paper-ivory pt-14 pb-12 lg:pt-16 lg:pb-16 border-b border-rule-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-Column Editorial Masthead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 mb-8 border-b border-rule-gray">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-crest-crimson mb-2.5">
                ADMISSIONS &amp; ENROLLMENT
              </p>
              <h1 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Admissions &amp; Fee Payment
              </h1>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-ink/85 text-base sm:text-lg leading-relaxed max-w-xl">
                Joining J-Neric Kindergarten &amp; Junior School is clear,
                personal, and welcoming. Review our four-step enrollment
                pathway, SchoolPay tuition instructions, and book your campus
                visit below.
              </p>
            </div>
          </div>

          {/* Wide Panoramic Campus Photograph */}
          <figure
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-delay="80"
          >
            <div className="w-full aspect-[21/9] max-h-[420px] overflow-hidden rounded-[3px] border border-rule-gray bg-[#EEECE6]">
              {!heroImageError ? (
                <img
                  src="/images/campus/kindergarten.jpg"
                  alt="Smiling learners welcomed at J-Neric Kindergarten & Junior School in Namulanda, Kajjansi"
                  onError={() => setHeroImageError(true)}
                  className="w-full h-full object-cover object-[50%_28%]"
                />
              ) : (
                <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#EEECE6]">
                  <div className="w-full h-full border border-rule-gray bg-pure-white p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em]">
                      <span className="text-crest-crimson">
                        Namulanda Campus Admissions
                      </span>
                      <span className="font-serif text-crest-navy">
                        J-Neric School
                      </span>
                    </div>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-crest-navy">
                      Welcoming New Families — Namulanda, Kajjansi
                    </p>
                    <span className="font-mono text-[10px] text-muted-slate">
                      public/images/campus/kindergarten.jpg
                    </span>
                  </div>
                </div>
              )}
            </div>

            <figcaption className="text-xs italic text-muted-slate mt-3">
              Welcoming learners and prospective families at our Namulanda
              Campus, Kajjansi.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 01. Four-Step Enrollment Process — Living Archive Spread */}
      <section
        aria-label="Four-Step Enrollment Process"
        className="bg-pure-white py-16 lg:py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-Width Section Header */}
          <div
            data-aos="fade-up"
            data-aos-once="false"
            className="pb-6 mb-10 border-b border-rule-gray flex flex-col lg:flex-row lg:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.1em] uppercase text-crest-crimson mb-2">
                01. HOW TO ENROLL
              </p>
              <h2 className="font-serif font-bold text-crest-navy text-2xl sm:text-3xl lg:text-4xl">
                Four-Step Enrollment Process
              </h2>
            </div>
          </div>

          {/* Asymmetric 12-Column Interactive Step Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column (5 cols) — Interactive "Enrollment Process" Title Spotlight */}
            <div
              data-aos="fade-right"
              data-aos-once="false"
              data-aos-delay="80"
              className="lg:col-span-5 flex"
            >
              <div
                ref={panelRef}
                className="relative w-full min-h-[340px] lg:min-h-[420px] overflow-hidden bg-paper-ivory border border-rule-gray border-l-[4px] border-l-pencil-gold rounded-[3px] p-7 sm:p-9 flex flex-col justify-between cursor-crosshair select-none transition-colors duration-300 hover:border-crest-navy/40"
              >
                {/* Offset Architectural Inner Frame (Opposite Parallax) */}
                <div
                  ref={frameLayerRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-3 border rounded-[2px] transition-colors duration-300 will-change-transform ${
                    isPanelHovered ? 'border-crest-navy/25' : 'border-rule-gray/70'
                  }`}
                />

                {/* Pointer-Tracking Hairline Drafting Crosshairs */}
                <div
                  ref={vLineRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 bottom-0 w-px bg-crest-navy/15 transition-opacity duration-300 will-change-transform ${
                    isPanelHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div
                  ref={hLineRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 right-0 h-px bg-crest-navy/15 transition-opacity duration-300 will-change-transform ${
                    isPanelHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Crisp Editorial Reticle Follower */}
                <div
                  ref={reticleRef}
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 z-20 -ml-3 -mt-3 transition-opacity duration-200 will-change-transform ${
                    isPanelHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="h-6 w-6 border border-crest-navy/60 rounded-[2px] flex items-center justify-center">
                    <span className="h-1.5 w-1.5 bg-crest-crimson rotate-45 block" />
                  </div>
                  <span className="absolute left-7 top-3 whitespace-nowrap bg-crest-navy text-pure-white text-[9px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-[2px]">
                    STEP {currentStep.index.replace('.', '')}
                  </span>
                </div>

                {/* Top Step Counter & Quick-Select Ledger */}
                <div className="relative z-20 flex items-center justify-between gap-4 border-b border-rule-gray pb-4">
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-crest-crimson">
                    STEP {currentStep.index.replace('.', '')} / 04
                  </span>

                  <div
                    role="group"
                    aria-label="Select enrollment step"
                    className="flex items-center gap-1.5"
                  >
                    {enrollmentSteps.map((step, idx) => {
                      const isSelected = activeStepIndex === idx;
                      return (
                        <button
                          key={step.index}
                          type="button"
                          onClick={() => setActiveStepIndex(idx)}
                          aria-label={`View ${step.title}`}
                          aria-pressed={isSelected}
                          className={`px-2 py-1 text-[11px] font-serif font-bold rounded-[2px] border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-crest-navy text-pure-white border-crest-navy'
                              : 'bg-pure-white text-muted-slate border-rule-gray hover:border-crest-navy hover:text-crest-navy'
                          }`}
                        >
                          {step.index.replace('.', '')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Centerpiece Title with Cursor Parallax */}
                <div
                  ref={titleLayerRef}
                  className="relative z-10 my-auto py-8 will-change-transform"
                >
                  <h3 className="font-serif font-bold text-crest-navy text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight">
                    Enrollment Process
                  </h3>
                  <div
                    className={`h-[3px] bg-pencil-gold mt-4 transition-all duration-300 ${
                      isPanelHovered ? 'w-28' : 'w-14'
                    }`}
                  />
                  <p className="mt-5 text-sm text-slate-ink/85 leading-relaxed max-w-sm">
                    <span className="font-serif font-bold text-crest-navy">
                      {currentStep.title}
                    </span>
                  </p>
                </div>

                {/* Bottom Campus Footer Row */}
                <div className="relative z-10 border-t border-rule-gray pt-4 flex items-center justify-between gap-3 text-[11px] text-muted-slate">
                  <span className="font-serif italic text-crest-navy">
                    &ldquo;{schoolProfile.motto}&rdquo;
                  </span>
                  <span className="uppercase tracking-[0.1em] font-semibold">
                    Namulanda Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols) — Interactive Step Index */}
            <div
              data-aos="fade-left"
              data-aos-once="false"
              data-aos-delay="140"
              className="lg:col-span-7 lg:border-l lg:border-rule-gray lg:pl-10 flex flex-col justify-center"
            >
              <div className="divide-y divide-rule-gray border-t border-b border-rule-gray">
                {enrollmentSteps.map((step, index) => {
                  const isActive = activeStepIndex === index;

                  return (
                    <button
                      key={step.index}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      aria-expanded={isActive}
                      className="group w-full text-left py-6 transition-all cursor-pointer"
                    >
                      {isActive ? (
                        <span className="block border-l-[3px] border-pencil-gold pl-5">
                          <span className="block font-serif font-bold text-crest-navy text-xl sm:text-2xl">
                            {step.title}
                          </span>
                          <span className="block mt-3 text-slate-ink/85 text-sm sm:text-base leading-relaxed">
                            {step.description}
                          </span>
                        </span>
                      ) : (
                        <span className="block border-l-[3px] border-transparent group-hover:border-crest-crimson/40 pl-5 group-hover:pl-6 transition-all">
                          <span className="block font-serif font-bold text-crest-navy/75 group-hover:text-crest-navy text-lg sm:text-xl transition-colors">
                            {step.title}
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Official SchoolPay Payment Guide */}
      <section
        id="schoolpay"
        className="py-16 lg:py-20 bg-paper-ivory border-t border-rule-gray scroll-mt-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-once="false">
            <SectionHeading
              number="02."
              eyebrow="Cashless Tuition Collection"
              title="Official SchoolPay Payment Guide"
              description="Parents can pay securely using School pay without carrying physical cash to the school"
              layout="split"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-delay="60"
            className="pt-8 pb-6 border-b border-rule-gray text-center"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-crest-navy">
              Verified School pay Name:{' '}
              {schoolProfile.schoolPay.registeredEntityName}
            </h3>
          </div>

          {/* 3 Payment Channels — Open 3-Column Ledger */}
          <div className="py-8 border-b border-rule-gray grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-rule-gray">
            {schoolProfile.schoolPay.channels.map((channel, channelIdx) => {
              const colSpacing =
                channelIdx === 0
                  ? 'pb-8 lg:pb-0 lg:pr-8'
                  : channelIdx === 1
                    ? 'py-8 lg:py-0 lg:px-8'
                    : 'pt-8 lg:pt-0 lg:pl-8';

              return (
                <div
                  key={channel.index}
                  data-aos="fade-up"
                  data-aos-once="false"
                  data-aos-delay={channelIdx * 100}
                  className={`flex flex-col ${colSpacing}`}
                >
                  <div className="border-b border-rule-gray pb-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-crest-crimson">
                      Channel {channel.index}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-crest-navy mt-1">
                      {channel.provider}
                    </h3>
                    <p className="text-xs font-semibold text-muted-slate mt-1">
                      {channel.dialOrPortal}
                    </p>
                  </div>

                  <ol className="mt-4 space-y-3 text-sm text-slate-ink">
                    {channel.steps.map((stepText, idx) => (
                      <li key={stepText} className="flex items-baseline gap-2.5">
                        <span className="font-serif text-xs font-bold text-crest-navy shrink-0">
                          0{idx + 1}.
                        </span>
                        <span className="leading-relaxed">{stepText}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>

          {/* Bottom Note Section */}
          <div
            data-aos="fade-up"
            data-aos-once="false"
            data-aos-delay="120"
            className="pt-8"
          >
            <div className="border-l-[3px] border-crest-crimson pl-5 space-y-2 text-sm text-slate-ink max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-crest-crimson">
                Note:
              </p>
              <p className="leading-relaxed">
                Always confirm the merchant prompt displays{' '}
                <strong className="font-semibold text-crest-navy">
                  {schoolProfile.schoolPay.registeredEntityName}
                </strong>{' '}
                and your learner&rsquo;s exact full name before entering your
                PIN.
              </p>
              <p className="leading-relaxed">
                {schoolProfile.schoolPay.supportNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Interactive Online Admission & Campus Tour Form */}
      <section
        id="inquiry-form"
        className="py-16 lg:py-20 bg-pure-white border-t border-rule-gray scroll-mt-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" data-aos-once="false">
            <SectionHeading
              number="03."
              eyebrow="Online Admission Inquiry"
              title="Submit Admission Inquiry"
              description="Complete the form below to schedule a tour of our Namulanda campus or register interest for Baby Class through Primary Seven."
              layout="split"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-stretch">
            <div
              data-aos="fade-up"
              data-aos-once="false"
              data-aos-delay="60"
              className="lg:col-span-8 flex"
            >
              {/* Interactive Admission Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full h-full bg-pure-white border border-rule-gray rounded-[3px] p-6 sm:p-8 flex flex-col gap-6"
              >
                  <div className="border-b border-rule-gray pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                      Parent &amp; Learner Details
                    </p>
                    <p className="text-xs text-muted-slate mt-1">
                      Fields marked with (*) are required.
                    </p>
                  </div>

                  {/* Parent Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="parentFullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Parent / Guardian Full Name *
                      </label>
                      <input
                        id="parentFullName"
                        name="parentFullName"
                        type="text"
                        value={formData.parentFullName}
                        onChange={(e) => {
                          setFormData({ ...formData, parentFullName: e.target.value });
                          if (errors.parentFullName) {
                            setErrors({ ...errors, parentFullName: undefined });
                          }
                        }}
                        placeholder="e.g., Sarah Namukasa"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.parentFullName && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.parentFullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Telephone Number (Uganda) *
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, phoneNumber: e.target.value });
                          if (errors.phoneNumber) {
                            setErrors({ ...errors, phoneNumber: undefined });
                          }
                        }}
                        placeholder="e.g., 0772 123456"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) {
                          setErrors({ ...errors, email: undefined });
                        }
                      }}
                      placeholder="e.g., parent@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Learner Details */}
                  <div className="pt-2 border-t border-rule-gray grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="childFullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Child&rsquo;s Full Name *
                      </label>
                      <input
                        id="childFullName"
                        name="childFullName"
                        type="text"
                        value={formData.childFullName}
                        onChange={(e) => {
                          setFormData({ ...formData, childFullName: e.target.value });
                          if (errors.childFullName) {
                            setErrors({ ...errors, childFullName: undefined });
                          }
                        }}
                        placeholder="e.g., Ethan Kato"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.childFullName && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.childFullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="childDateOfBirth"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Child&rsquo;s Date of Birth *
                      </label>
                      <input
                        id="childDateOfBirth"
                        name="childDateOfBirth"
                        type="date"
                        value={formData.childDateOfBirth}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            childDateOfBirth: e.target.value,
                          });
                          if (errors.childDateOfBirth) {
                            setErrors({ ...errors, childDateOfBirth: undefined });
                          }
                        }}
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.childDateOfBirth && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.childDateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Division Selector & Dynamic Class Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5">
                        School Division *
                      </span>
                      <div
                        role="group"
                        aria-label="Select School Division"
                        className="grid grid-cols-2 gap-2.5"
                      >
                        {(['Kindergarten', 'Junior School'] as const).map(
                          (divisionOption) => {
                            const isSelected = formData.division === divisionOption;
                            const activeAccent =
                              divisionOption === 'Kindergarten'
                                ? 'border-laurel-green bg-laurel-green text-pure-white'
                                : 'border-crest-sky bg-crest-sky text-pure-white';

                            return (
                              <button
                                key={divisionOption}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => handleDivisionChange(divisionOption)}
                                className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border rounded-[3px] transition-colors cursor-pointer ${
                                  isSelected
                                    ? activeAccent
                                    : 'border-rule-gray bg-paper-ivory text-slate-ink hover:border-crest-navy'
                                }`}
                              >
                                {divisionOption}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="classApplyingFor"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Class Applying For *
                      </label>
                      <select
                        id="classApplyingFor"
                        name="classApplyingFor"
                        value={formData.classApplyingFor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            classApplyingFor: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      >
                        {availableClasses.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                      </select>
                      {errors.classApplyingFor && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.classApplyingFor}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Visit Date & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="preferredVisitDate"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Preferred Campus Visit Date *
                      </label>
                      <input
                        id="preferredVisitDate"
                        name="preferredVisitDate"
                        type="date"
                        value={formData.preferredVisitDate}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            preferredVisitDate: e.target.value,
                          });
                          if (errors.preferredVisitDate) {
                            setErrors({
                              ...errors,
                              preferredVisitDate: undefined,
                            });
                          }
                        }}
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.preferredVisitDate && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.preferredVisitDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                    >
                      Additional Questions or Learner Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your child's current class, transport questions, or any specific topics you would like to discuss during your campus tour."
                      className="w-full flex-1 min-h-[120px] px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                    />
                  </div>

                  <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-rule-gray">
                    <p className="text-xs text-muted-slate">
                      Our Admissions Desk responds within one working day.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-crest-crimson text-pure-white text-sm font-semibold px-6 py-3 rounded-[3px] hover:bg-crest-navy transition-colors cursor-pointer"
                    >
                      Submit Admission Inquiry
                    </button>
                  </div>
                </form>
            </div>

            {/* Sidebar — Open Editorial Campus Info & Visit Checklist */}
            <aside className="lg:col-span-4 lg:border-l lg:border-rule-gray lg:pl-10 flex flex-col justify-between gap-10">
              <div
                data-aos="fade-left"
                data-aos-once="false"
                data-aos-delay="100"
                className="flex flex-col"
              >
                <div className="pb-6 border-b border-rule-gray">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                    Campus Tour Hours
                  </p>
                  <h3 className="font-serif text-xl font-bold text-crest-navy mt-2">
                    Visit Us in Namulanda
                  </h3>
                  <p className="mt-4 text-sm text-slate-ink leading-relaxed">
                    {schoolProfile.locationFull}
                  </p>
                </div>

                <dl className="divide-y divide-rule-gray border-b border-rule-gray text-sm">
                  <div className="py-6">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Admissions Telephone
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={schoolProfile.phoneHref}
                        className="font-serif text-lg font-bold text-crest-navy hover:text-crest-crimson transition-colors"
                      >
                        {schoolProfile.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="py-6">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Visiting Schedule
                    </dt>
                    <dd className="mt-3.5 text-sm text-slate-ink space-y-4">
                      <p>{schoolProfile.officeHours.weekdays}</p>
                      <p>{schoolProfile.officeHours.saturday}</p>
                      <p className="text-muted-slate">
                        {schoolProfile.officeHours.sunday}
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>

              <div
                data-aos="fade-up"
                data-aos-once="false"
                data-aos-delay="120"
                className="flex-1 flex flex-col"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-navy pb-4">
                  What to Bring on Your Visit
                </p>
                <ul className="flex-1 flex flex-col divide-y divide-rule-gray border-t border-b border-rule-gray text-sm text-slate-ink">
                  {VISIT_CHECKLIST_ITEMS.map((item, idx) => (
                    <li
                      key={item}
                      className="flex-1 py-4 sm:py-5 flex flex-col justify-center"
                    >
                      <div className="flex items-baseline gap-3 leading-relaxed">
                        <span className="font-serif text-xs font-bold text-crest-crimson shrink-0">
                          0{idx + 1}.
                        </span>
                        <span>{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
