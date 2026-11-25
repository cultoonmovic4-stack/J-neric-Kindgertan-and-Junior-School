import type { SchoolProfile } from '../types/school';

export const schoolProfile: SchoolProfile = {
  name: 'J-Neric Kindergarten & Junior School',
  shortName: 'J-Neric School',
  motto: 'Nurture with Love',
  eyebrowLocation: 'NAMULANDA, KAJJANSI • ENTEBBE ROAD',
  locationFull:
    'Namulanda Ward, Kajjansi Town Council, Wakiso District, Uganda (Off Entebbe Road)',
  locationShort: 'Namulanda Ward, Kajjansi Town Council — Off Entebbe Road',
  phoneDisplay: '0772 098405',
  phoneHref: 'tel:+256772098405',
  officeHours: {
    weekdays: 'Monday – Friday: 7:30 AM – 5:00 PM',
    saturday: 'Saturday: 8:30 AM – 1:00 PM',
    sunday: 'Sunday & Public Holidays: Closed',
  },
  director: {
    name: 'Jackline Luga',
    title: 'School Director',
    welcomeHeading: 'A Warm Welcome from Our Director',
    welcomeParagraphs: [
      'At J-Neric Kindergarten & Junior School, every child who walks through our gates in Namulanda is known by name, listened to with patience, and guided with steady encouragement. Our motto, "Nurture with Love," is not simply printed on our crest—it shapes how our teachers greet learners each morning, how classrooms are ordered, and how we partner with families.',
      'From a toddler taking first steps in Baby Class to an upper-primary candidate preparing for national assessments in Primary Seven, we balance strong academic foundations in literacy, numeracy, and science with character formation, child safety, and spiritual grounding.',
      'We believe the best education happens when school and home walk together in open trust. I warmly invite you to visit our campus off Entebbe Road, meet our teaching staff, and experience the calm, joyful learning culture we are building for the children of Kajjansi and Wakiso.',
    ],
    closingQuote:
      'When a child feels safe, loved, and purposefully challenged, confidence and excellence follow naturally.',
  },
  foundingOverview: [
    'Established in Namulanda Ward, Kajjansi Town Council, Wakiso District, J-Neric Kindergarten & Junior School was founded to give families along the Entebbe Road corridor a disciplined, nurturing learning home spanning both Early Childhood Development and full Primary education.',
    'Operating two integrated divisions—J-Neric Kindergarten (Baby, Middle, and Top Class) and J-Neric Junior School (Primary One through Primary Seven)—the institution combines Uganda’s national curriculum standards with structured reading culture, pastoral care, and attentive class sizes.',
  ],
  pillarsLedger: [
    {
      index: '01',
      label: 'Our Motto',
      title: 'Nurture with Love',
      description:
        'Every lesson, correction, and daily interaction is anchored in warmth, patience, and genuine care for each learner’s dignity and potential.',
    },
    {
      index: '02',
      label: 'Our Vision',
      title: 'Confident, Grounded Lifelong Learners',
      description:
        'To raise morally upright, articulate, and academically capable young citizens prepared to thrive in secondary school and serve their communities with integrity.',
    },
    {
      index: '03',
      label: 'Our Mission',
      title: 'Holistic Pre-Primary & Primary Formation',
      description:
        'To provide a safe, structured, and joyful school environment in Namulanda that builds foundational literacy, numeracy, curiosity, discipline, and Christian moral character.',
    },
    {
      index: '04',
      label: 'Core Values',
      title: 'Love, Discipline, Diligence & Partnership',
      description:
        'We uphold child-centered kindness, personal responsibility, a thriving reading culture, respect for God and neighbor, and transparent communication with parents.',
    },
  ],
  enrollmentSteps: [
    {
      index: '01.',
      title: 'Campus Visit & Inquiry',
      description:
        'Parents and guardians tour our Namulanda campus off Entebbe Road, inspect classrooms and play areas, and speak with the admissions office or call 0772 098405.',
    },
    {
      index: '02.',
      title: 'Learner Readiness Interaction',
      description:
        'Prospective Kindergarten learners enjoy an informal, welcoming interaction, while Junior School entrants (P.1 – P.7) complete a gentle placement assessment to identify strengths and support needs.',
    },
    {
      index: '03.',
      title: 'Admission Offer & Registration',
      description:
        'Families receive an official admission letter outlining uniform specifications, scholastic requirements, and the learner’s personal SchoolPay Payment Code.',
    },
    {
      index: '04.',
      title: 'SchoolPay Clearance & Reporting',
      description:
        'Tuition is settled seamlessly through SchoolPay under J-NERIC KINDERGARTEN LTD via MTN MoMo, Airtel Money, or partner banks, and the learner reports ready for orientation.',
    },
  ],
  schoolPay: {
    registeredEntityName: 'J-NERIC KINDERGARTEN LTD',
    summary:   '',
    channels: [
      {
        index: '01.',
        provider: 'MTN Mobile Money (MoMo)',
        dialOrPortal: 'Dial *165*4*3*2# or use the MoMo App',
        steps: [
          'Dial *165# and select Payments, then School Fees, then SchoolPay.',
          'Enter your child’s unique 10-digit Student Payment Code issued by the school.',
          'Confirm the displayed school name reads J-NERIC KINDERGARTEN LTD and verify the learner’s full name.',
          'Enter the fee amount and authorize with your MTN MoMo PIN to receive an SMS receipt.',
        ],
      },
      {
        index: '02.',
        provider: 'Airtel Money',
        dialOrPortal: 'Dial *185*6*2# or use MyAirtel App',
        steps: [
          'Dial *185# and select School Fees, then choose SchoolPay.',
          'Select Pay Fees and enter your child’s 10-digit Student Payment Code.',
          'Verify that the confirmation prompt displays J-NERIC KINDERGARTEN LTD and your learner’s name.',
          'Enter the amount and your Airtel Money PIN; retain the confirmation SMS for your records.',
        ],
      },
      {
        index: '03.',
        provider: 'Partner Commercial Banks & Banking Agents',
        dialOrPortal: 'Stanbic, Centenary, DFCU, Equity & SchoolPay Bank Agents',
        steps: [
          'Visit any SchoolPay-enabled bank branch or authorized banking agent.',
          'Present your child’s Student Payment Code and request a SchoolPay deposit for J-NERIC KINDERGARTEN LTD.',
          'Verify the learner’s details on the teller screen before confirming payment.',
          'Keep the stamped bank deposit slip or agent receipt for term clearance verification.',
        ],
      },
    ],
    supportNote:
      'Need your child’s Student Payment Code or fee structure? Contact the Bursar & Admissions Desk on 0772 098405 during office hours.',
  },
};
