import { useState, type FormEvent } from 'react';
import { schoolProfile } from '../data/schoolProfile';
import type {
  AdmissionDivisionLabel,
  AdmissionInquiryPayload,
} from '../types/school';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';

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

function generateReferenceCode(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `JNR-2026-${randomDigits}`;
}

export function AdmissionsPage() {
  const [formData, setFormData] =
    useState<AdmissionInquiryPayload>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceCode: string;
    submittedAt: string;
    payload: AdmissionInquiryPayload;
  } | null>(null);

  const availableClasses = CLASSES_BY_DIVISION[formData.division];

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

    const formattedTimestamp = new Date().toLocaleString('en-UG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    setSubmittedReceipt({
      referenceCode: generateReferenceCode(),
      submittedAt: formattedTimestamp,
      payload: { ...formData },
    });
  }

  function handleReset() {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setSubmittedReceipt(null);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admissions & Enrollment"
        title="Admissions & Fee Payment"
        lead="Joining J-Neric Kindergarten & Junior School is clear, personal, and welcoming. Review our four-step enrollment pathway, SchoolPay tuition instructions, and book your campus visit below."
        metaLabel="Admissions Office Telephone"
        metaValue={`${schoolProfile.phoneDisplay} • Namulanda Campus`}
      />

      {/* 01. Four-Step Enrollment Process */}
      <section className="py-14 sm:py-16 bg-paper-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01."
            eyebrow="How to Enroll"
            title="Four-Step Enrollment Process"
            description="Every admission begins with a warm conversation and campus tour so families feel fully confident in their child's learning home."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolProfile.enrollmentSteps.map((step, index) => (
              <article
                key={step.index}
                data-aos="fade-up"
                data-aos-delay={index * 75}
                className="bg-pure-white border border-rule-gray rounded-[3px] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-serif text-2xl font-bold text-crest-crimson border-b border-rule-gray pb-3">
                    {step.index}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-crest-navy mt-4 leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-ink leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02. Official SchoolPay Payment Guide */}
      <section
        id="schoolpay"
        className="py-14 sm:py-16 bg-paper-ivory border-t border-rule-gray scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02."
            eyebrow="Cashless Tuition Collection"
            title="Official SchoolPay Payment Guide"
            description="Safe, traceable, and instant school fee clearance without handling cash on campus."
          />

          <div
            data-aos="fade-up"
            className="mt-8 bg-pure-white border border-rule-gray border-l-4 border-l-pencil-gold rounded-[3px] p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-rule-gray">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crest-crimson">
                  Verified SchoolPay Merchant Name
                </p>
                <p className="font-serif text-2xl font-bold text-crest-navy mt-1">
                  {schoolProfile.schoolPay.registeredEntityName}
                </p>
              </div>
              <div className="bg-paper-ivory border border-rule-gray rounded-[3px] px-4 py-3 text-xs text-slate-ink max-w-sm">
                Always confirm the merchant prompt displays{' '}
                <strong className="font-semibold text-crest-navy">
                  {schoolProfile.schoolPay.registeredEntityName}
                </strong>{' '}
                and your learner&rsquo;s exact full name before entering your
                PIN.
              </div>
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-ink leading-relaxed max-w-3xl">
              {schoolProfile.schoolPay.summary}
            </p>

            {/* 3 Payment Channels */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {schoolProfile.schoolPay.channels.map((channel) => (
                <div
                  key={channel.index}
                  className="bg-paper-ivory border border-rule-gray rounded-[3px] p-5 flex flex-col"
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
              ))}
            </div>

            <div className="mt-7 pt-5 border-t border-rule-gray flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <p className="text-slate-ink">
                {schoolProfile.schoolPay.supportNote}
              </p>
              <a
                href={schoolProfile.phoneHref}
                className="font-serif font-bold text-crest-navy hover:text-crest-crimson transition-colors shrink-0"
              >
                Call {schoolProfile.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Interactive Online Admission & Campus Tour Form */}
      <section
        id="inquiry-form"
        className="py-14 sm:py-16 bg-paper-ivory border-t border-rule-gray scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="03."
            eyebrow="Online Admission Inquiry"
            title="Book a Campus Visit & Submit Admission Inquiry"
            description="Complete the form below to schedule a tour of our Namulanda campus or register interest for Baby Class through Primary Seven."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div data-aos="fade-up" className="lg:col-span-8">
              {submittedReceipt ? (
                /* Official Inquiry Reference Receipt */
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-pure-white border border-rule-gray border-t-[3px] border-t-laurel-green rounded-[3px] p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-rule-gray pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-laurel-green">
                        Official Inquiry Reference Receipt
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-crest-navy mt-1">
                        Admission Inquiry Recorded
                      </h3>
                    </div>
                    <div className="bg-paper-ivory border border-rule-gray rounded-[3px] px-4 py-2.5 text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-slate font-semibold">
                        Reference Number
                      </p>
                      <p className="font-mono text-base font-bold text-crest-navy">
                        {submittedReceipt.referenceCode}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-slate-ink leading-relaxed">
                    Thank you,{' '}
                    <strong className="font-semibold text-crest-navy">
                      {submittedReceipt.payload.parentFullName}
                    </strong>
                    . Your campus visit and admission inquiry for{' '}
                    <strong className="font-semibold text-crest-navy">
                      {submittedReceipt.payload.childFullName}
                    </strong>{' '}
                    has been prepared for our Admissions Office. Please retain
                    your reference number above when visiting or calling{' '}
                    <a
                      href={schoolProfile.phoneHref}
                      className="font-semibold text-crest-navy underline underline-offset-2"
                    >
                      {schoolProfile.phoneDisplay}
                    </a>
                    .
                  </p>

                  <dl className="mt-6 border border-rule-gray rounded-[3px] divide-y divide-rule-gray text-sm">
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-paper-ivory">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Submitted On
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink font-medium">
                        {submittedReceipt.submittedAt}
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Parent / Guardian
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink font-medium">
                        {submittedReceipt.payload.parentFullName} &middot;{' '}
                        {submittedReceipt.payload.phoneNumber}
                        {submittedReceipt.payload.email
                          ? ` · ${submittedReceipt.payload.email}`
                          : ''}
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-paper-ivory">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Prospective Learner
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink font-medium">
                        {submittedReceipt.payload.childFullName} (DOB:{' '}
                        {submittedReceipt.payload.childDateOfBirth})
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Division &amp; Class
                      </dt>
                      <dd className="sm:col-span-2 text-crest-navy font-semibold">
                        {submittedReceipt.payload.division} &mdash;{' '}
                        {submittedReceipt.payload.classApplyingFor}
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-paper-ivory">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Preferred Visit Date
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink font-medium">
                        {submittedReceipt.payload.preferredVisitDate}
                      </dd>
                    </div>
                    {submittedReceipt.payload.message.trim() && (
                      <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                        <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                          Additional Notes
                        </dt>
                        <dd className="sm:col-span-2 text-slate-ink">
                          {submittedReceipt.payload.message}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-muted-slate">
                      Demo Preview Mode: Ready for Phase 2 Laravel{' '}
                      <code className="font-mono text-crest-navy">
                        POST /api/admissions
                      </code>{' '}
                      integration.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center bg-crest-navy text-pure-white text-sm font-semibold px-5 py-2.5 rounded-[3px] hover:bg-crest-crimson transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Admission Form */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-pure-white border border-rule-gray rounded-[3px] p-6 sm:p-8 space-y-6"
                >
                  <div className="border-b border-rule-gray pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                      Parent &amp; Learner Details
                    </p>
                    <p className="text-xs text-muted-slate mt-1">
                      Fields marked with an asterisk (*) are required.
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

                  <div>
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
                      className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-rule-gray">
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
              )}
            </div>

            {/* Sidebar — Direct Admissions Support Card */}
            <aside
              data-aos="fade-up"
              data-aos-delay="100"
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-pure-white border border-rule-gray border-t-[3px] border-t-crest-navy rounded-[3px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                  Campus Tour Hours
                </p>
                <h3 className="font-serif text-lg font-bold text-crest-navy mt-1.5">
                  Visit Us in Namulanda
                </h3>
                <p className="mt-3 text-sm text-slate-ink leading-relaxed">
                  {schoolProfile.locationFull}
                </p>

                <dl className="mt-5 pt-4 border-t border-rule-gray space-y-3 text-sm">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Admissions Telephone
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={schoolProfile.phoneHref}
                        className="font-serif text-base font-bold text-crest-navy hover:text-crest-crimson transition-colors"
                      >
                        {schoolProfile.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Visiting Schedule
                    </dt>
                    <dd className="mt-1 text-xs text-slate-ink space-y-1">
                      <p>{schoolProfile.officeHours.weekdays}</p>
                      <p>{schoolProfile.officeHours.saturday}</p>
                      <p className="text-muted-slate">
                        {schoolProfile.officeHours.sunday}
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-pure-white border border-rule-gray rounded-[3px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-navy">
                  What to Bring on Your Visit
                </p>
                <ul className="mt-3 divide-y divide-rule-gray border-t border-b border-rule-gray text-sm text-slate-ink">
                  <li className="py-2.5 flex items-baseline gap-2.5">
                    <span className="font-serif text-xs font-bold text-crest-crimson">
                      01.
                    </span>
                    <span>Copy of the child&rsquo;s immunization card or birth certificate</span>
                  </li>
                  <li className="py-2.5 flex items-baseline gap-2.5">
                    <span className="font-serif text-xs font-bold text-crest-crimson">
                      02.
                    </span>
                    <span>Most recent school report (for Primary transfers P.1 – P.7)</span>
                  </li>
                  <li className="py-2.5 flex items-baseline gap-2.5">
                    <span className="font-serif text-xs font-bold text-crest-crimson">
                      03.
                    </span>
                    <span>Two recent passport-size photographs of the learner</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
