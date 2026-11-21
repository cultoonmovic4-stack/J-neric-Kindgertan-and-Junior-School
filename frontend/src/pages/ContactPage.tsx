import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { schoolProfile } from '../data/schoolProfile';
import type { GeneralInquiryPayload } from '../types/school';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';

const INITIAL_CONTACT_FORM: GeneralInquiryPayload = {
  fullName: '',
  phone: '',
  email: '',
  subject: 'Admissions & Campus Visit',
  message: '',
};

const INQUIRY_SUBJECTS = [
  'Admissions & Campus Visit',
  'SchoolPay & Fee Structure Inquiry',
  'Kindergarten Program Question',
  'Junior School (P.1 – P.7) Question',
  'General Administration & Feedback',
];

type ContactErrors = Partial<Record<keyof GeneralInquiryPayload, string>>;

function isValidUgandanPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s()-]/g, '');
  return /^(?:\+?256|0)(?:7\d{8}|3\d{8}|2\d{8})$/.test(cleaned);
}

export function ContactPage() {
  const [formData, setFormData] =
    useState<GeneralInquiryPayload>(INITIAL_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    timestamp: string;
    payload: GeneralInquiryPayload;
  } | null>(null);

  function validate(values: GeneralInquiryPayload): ContactErrors {
    const nextErrors: ContactErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Please provide a contact phone number.';
    } else if (!isValidUgandanPhone(values.phone)) {
      nextErrors.phone =
        'Enter a valid Ugandan phone number (e.g., 0772 098405 or +256 772 098405).';
    }

    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      nextErrors.email = 'Please enter a valid email address or leave blank.';
    }

    if (!values.subject.trim()) {
      nextErrors.subject = 'Please select an inquiry subject.';
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message =
        'Please write a brief message (at least 10 characters) so our office can assist you.';
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

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setConfirmation({
      reference: `JNR-MSG-2026-${randomDigits}`,
      timestamp: new Date().toLocaleString('en-UG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      payload: { ...formData },
    });
  }

  function handleReset() {
    setFormData(INITIAL_CONTACT_FORM);
    setErrors({});
    setConfirmation(null);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact & Campus Location"
        lead="We welcome phone calls, written inquiries, and in-person visits to our Namulanda campus off Entebbe Road in Kajjansi Town Council."
        metaLabel="Direct Telephone"
        metaValue={`${schoolProfile.phoneDisplay} • Wakiso District`}
      />

      {/* 01. Two-Column Contact & General Inquiry Layout */}
      <section className="py-14 sm:py-16 bg-paper-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="01."
            eyebrow="Campus Office & Inquiries"
            title="Reach Our Admissions & Administration Desk"
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official Campus Details */}
            <div data-aos="fade-up" className="lg:col-span-5 space-y-6">
              <div className="bg-pure-white border border-rule-gray border-t-[3px] border-t-crest-navy rounded-[3px] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                  Official Campus Directory
                </p>
                <h3 className="font-serif text-xl font-bold text-crest-navy mt-1.5">
                  {schoolProfile.name}
                </h3>

                <dl className="mt-5 divide-y divide-rule-gray border-t border-b border-rule-gray text-sm">
                  <div className="py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Physical Campus Address
                    </dt>
                    <dd className="mt-1 text-slate-ink font-medium leading-relaxed">
                      {schoolProfile.locationFull}
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Direct Admissions Telephone
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={schoolProfile.phoneHref}
                        className="font-serif text-lg font-bold text-crest-navy hover:text-crest-crimson transition-colors"
                      >
                        {schoolProfile.phoneDisplay}
                      </a>
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      Office Visiting Hours
                    </dt>
                    <dd className="mt-1 text-slate-ink space-y-1">
                      <p>{schoolProfile.officeHours.weekdays}</p>
                      <p>{schoolProfile.officeHours.saturday}</p>
                      <p className="text-xs text-muted-slate">
                        {schoolProfile.officeHours.sunday}
                      </p>
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      SchoolPay Merchant Name
                    </dt>
                    <dd className="mt-1">
                      <p className="font-semibold text-crest-navy">
                        {schoolProfile.schoolPay.registeredEntityName}
                      </p>
                      <Link
                        to="/admissions#schoolpay"
                        className="inline-block mt-1 text-xs font-semibold text-crest-crimson underline underline-offset-4 hover:text-crest-navy"
                      >
                        Open SchoolPay Payment Guide
                      </Link>
                    </dd>
                  </div>

                  <div className="py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-slate">
                      School Leadership
                    </dt>
                    <dd className="mt-1 text-slate-ink">
                      Director {schoolProfile.director.name}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right Column: General Inquiry Form */}
            <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-7">
              {confirmation ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-pure-white border border-rule-gray border-t-[3px] border-t-laurel-green rounded-[3px] p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-rule-gray pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-laurel-green">
                        Message Confirmation Receipt
                      </p>
                      <h3 className="font-serif text-2xl font-bold text-crest-navy mt-1">
                        Thank You for Reaching Out
                      </h3>
                    </div>
                    <div className="bg-paper-ivory border border-rule-gray rounded-[3px] px-4 py-2 text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-slate font-semibold">
                        Inquiry Reference
                      </p>
                      <p className="font-mono text-sm font-bold text-crest-navy">
                        {confirmation.reference}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-slate-ink leading-relaxed">
                    Your inquiry regarding{' '}
                    <strong className="font-semibold text-crest-navy">
                      {confirmation.payload.subject}
                    </strong>{' '}
                    has been logged for our school office. For urgent matters,
                    please call{' '}
                    <a
                      href={schoolProfile.phoneHref}
                      className="font-semibold text-crest-navy underline underline-offset-2"
                    >
                      {schoolProfile.phoneDisplay}
                    </a>{' '}
                    and quote your reference number.
                  </p>

                  <dl className="mt-6 border border-rule-gray rounded-[3px] divide-y divide-rule-gray text-sm">
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-paper-ivory">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Received
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink">
                        {confirmation.timestamp}
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Sender
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink font-medium">
                        {confirmation.payload.fullName} &middot;{' '}
                        {confirmation.payload.phone}
                        {confirmation.payload.email
                          ? ` · ${confirmation.payload.email}`
                          : ''}
                      </dd>
                    </div>
                    <div className="p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-paper-ivory">
                      <dt className="text-xs uppercase tracking-wider text-muted-slate font-semibold">
                        Message
                      </dt>
                      <dd className="sm:col-span-2 text-slate-ink leading-relaxed">
                        {confirmation.payload.message}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-muted-slate">
                      Demo Preview Mode: Ready for Phase 2 Laravel{' '}
                      <code className="font-mono text-crest-navy">
                        POST /api/inquiries
                      </code>{' '}
                      integration.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center bg-crest-navy text-pure-white text-sm font-semibold px-5 py-2.5 rounded-[3px] hover:bg-crest-crimson transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-pure-white border border-rule-gray rounded-[3px] p-6 sm:p-8 space-y-5"
                >
                  <div className="border-b border-rule-gray pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-crest-crimson">
                      General Inquiry Form
                    </p>
                    <p className="text-xs text-muted-slate mt-1">
                      Write to our administration office with questions on fees,
                      programs, or campus visits.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Your Full Name *
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) {
                            setErrors({ ...errors, fullName: undefined });
                          }
                        }}
                        placeholder="e.g., David Mukasa"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Telephone Number *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) {
                            setErrors({ ...errors, phone: undefined });
                          }
                        }}
                        placeholder="e.g., 0772 098405"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) {
                            setErrors({ ...errors, email: undefined });
                          }
                        }}
                        placeholder="e.g., family@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                      >
                        Inquiry Subject *
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                      >
                        {INQUIRY_SUBJECTS.map((subjectOption) => (
                          <option key={subjectOption} value={subjectOption}>
                            {subjectOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-crest-navy mb-1.5"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) {
                          setErrors({ ...errors, message: undefined });
                        }
                      }}
                      placeholder="How can our school office assist your family today?"
                      className="w-full px-3.5 py-2.5 text-sm bg-paper-ivory border border-rule-gray rounded-[3px] text-slate-ink focus:outline-none focus:border-crest-navy"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-crest-crimson font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-rule-gray flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-muted-slate">
                      Prefer to speak directly? Call{' '}
                      <a
                        href={schoolProfile.phoneHref}
                        className="font-semibold text-crest-navy hover:text-crest-crimson"
                      >
                        {schoolProfile.phoneDisplay}
                      </a>
                      .
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-crest-crimson text-pure-white text-sm font-semibold px-6 py-3 rounded-[3px] hover:bg-crest-navy transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 02. Campus Map Frame */}
      <section className="py-14 sm:py-16 bg-paper-ivory border-t border-rule-gray">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02."
            eyebrow="Campus Location Map"
            title="Finding J-Neric in Namulanda, Kajjansi"
            description="Conveniently located in Namulanda Ward, Kajjansi Town Council, Wakiso District — easily accessible off the Kampala–Entebbe Road corridor."
          />

          <div
            data-aos="fade-up"
            className="mt-8 bg-pure-white border border-rule-gray rounded-[3px] p-2"
          >
            <div className="relative w-full h-[380px] sm:h-[420px] bg-paper-ivory border border-rule-gray rounded-[2px] overflow-hidden">
              <iframe
                title="J-Neric Kindergarten & Junior School — Namulanda, Kajjansi Map"
                src="https://www.google.com/maps?q=Namulanda,+Kajjansi,+Wakiso,+Uganda&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>

            <div className="px-3 py-3.5 mt-2 border-t border-rule-gray flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-slate">
              <div>
                <span className="font-semibold uppercase tracking-wider text-crest-navy mr-2">
                  Offline Directions Note:
                </span>
                If the live map preview is unavailable offline, turn off Entebbe
                Road at Namulanda (Kajjansi Town Council, Wakiso District) and
                call{' '}
                <a
                  href={schoolProfile.phoneHref}
                  className="font-semibold text-crest-navy underline underline-offset-2"
                >
                  {schoolProfile.phoneDisplay}
                </a>{' '}
                for gate guidance.
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Namulanda+Kajjansi+Wakiso+Uganda"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-crest-crimson hover:text-crest-navy transition-colors shrink-0"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
