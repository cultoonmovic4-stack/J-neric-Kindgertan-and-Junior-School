import type {
  AcademicDivision,
  CoCurricularProgram,
  DailyScheduleSlot,
} from '../types/school';

export const academicDivisions: AcademicDivision[] = [
  {
    id: 'kindergarten',
    index: '01.',
    name: 'J-Neric Kindergarten',
    subtitle: 'Early Years Foundation • Baby, Middle & Top Class',
    accentToken: 'laurel-green',
    summary:
      'A warm, unhurried early childhood environment where young children develop spoken confidence, early phonics, number sense, fine motor coordination, and joyful social habits through guided play and loving routines.',
    curriculumFocus: [
      'Jolly Phonics, storytelling, and early English communication',
      'Hands-on numeracy, pattern recognition, and sensory discovery',
      'Creative arts, music, outdoor movement, and social grace',
      'Safe nap and nutrition routines tailored to young learners',
    ],
    classes: [
      {
        name: 'Baby Class',
        ageRange: '3 – 4 Years',
        focus: 'Gentle school settling, speech confidence, songs, color & shape discovery, and sharing.',
        image: '/images/campus/baby-class.jpg',
        imageAlt: 'J-Neric Baby Class learner smiling with crayons and colors during early discovery',
      },
      {
        name: 'Middle Class',
        ageRange: '4 – 5 Years',
        focus: 'Letter-sound mastery, pre-writing grip, counting foundations, and cooperative play.',
        image: '/images/campus/middle-class.jpg',
        imageAlt: 'J-Neric Middle Class learners engaged in hands-on pre-writing and cooperative play',
      },
      {
        name: 'Top Class',
        ageRange: '5 – 6 Years',
        focus: 'Independent reading readiness, sentence building, early arithmetic, and smooth Primary One transition.',
        image: '/images/campus/top-class.jpg',
        imageAlt: 'J-Neric Top Class teacher guiding learners with a number chart and wooden abacus',
      },
    ],
  },
  {
    id: 'junior-school',
    index: '02.',
    name: 'J-Neric Junior School',
    subtitle: 'Primary Section • Primary One (P.1) to Primary Seven (P.7)',
    accentToken: 'crest-sky',
    summary:
      'A structured, high-expectation primary program delivering the Uganda National Primary Curriculum with strong emphasis on reading comprehension, analytical mathematics, practical science, social studies, and disciplined study habits.',
    curriculumFocus: [
      'Core mastery in English, Mathematics, Integrated Science, and Social Studies',
      'Structured reading culture reinforced through daily comprehension and DEAR Day',
      'Continuous weekly assessment and close parent progress feedback',
      'Christian Religious Education, leadership, and Primary Leaving Examination (PLE) readiness',
    ],
    classes: [
      {
        name: 'Lower Primary (P.1 – P.3)',
        ageRange: '6 – 8 Years',
        focus: 'Thematic curriculum, fluent reading, neat handwriting, mental arithmetic, and classroom independence.',
        image: '/images/campus/lower-primary.jpg',
        imageAlt: 'J-Neric Lower Primary learner writing neatly in an exercise book during class',
      },
      {
        name: 'Transition & Middle Primary (P.4 – P.5)',
        ageRange: '9 – 10 Years',
        focus: 'Subject-based inquiry in English, Mathematics, Science, and SST alongside structured homework discipline.',
        image: '/images/campus/middle-primary.jpg',
        imageAlt: 'J-Neric Middle Primary learners engaged in classroom study and writing',
      },
      {
        name: 'Upper Primary (P.6 – P.7)',
        ageRange: '11 – 13 Years',
        focus: 'Analytical problem solving, examination technique, leadership mentorship, and thorough PLE preparation.',
        image: '/images/campus/upper-primary.jpg',
        imageAlt: 'J-Neric Upper Primary learners reading and collaborating together in the library',
      },
    ],
  },
];

export const coCurricularPrograms: CoCurricularProgram[] = [
  {
    index: '01.',
    title: 'Reading Culture & DEAR Day',
    summary:
      'We champion joyful literacy through classroom reading corners, storytelling circles, and whole-school participation in enjuba’s Drop Everything And Read (DEAR) Day, involving 150+ learners and 13+ teachers.',
  },
  {
    index: '02.',
    title: 'Music, Dance & Drama',
    summary:
      'Learners build stage poise, rhythm, and expressive confidence through choral singing, poetry recitation, and termly cultural performances for parents.',
  },
  {
    index: '03.',
    title: 'Physical Education & Outdoor Play',
    summary:
      'Structured games, coordination drills, and supervised outdoor play nurture physical stamina, teamwork, and sportsmanship across both divisions.',
  },
  {
    index: '04.',
    title: 'Christian Moral Formation & Devotion',
    summary:
      'Daily morning devotion, scripture memory, and guided character conversations reinforce honesty, gratitude, kindness, and respect for community.',
  },
];

export const dailyTimetable: DailyScheduleSlot[] = [
  {
    time: '7:30 AM – 8:00 AM',
    activity: 'Arrival, Welcome & Morning Devotion',
    appliesTo: 'All Learners',
    notes: 'Teachers receive learners at the gate; assembly, prayers, and school motto reflection.',
  },
  {
    time: '8:00 AM – 10:00 AM',
    activity: 'Core Morning Lessons (Block I)',
    appliesTo: 'All Learners',
    notes: 'Phonics and early numeracy in Kindergarten; English and Mathematics in Junior School.',
  },
  {
    time: '10:00 AM – 10:30 AM',
    activity: 'Morning Break & Nutritious Porridge',
    appliesTo: 'All Learners',
    notes: 'Supervised refreshment and outdoor social break.',
  },
  {
    time: '10:30 AM – 12:40 PM',
    activity: 'Core Lessons & Guided Practice (Block II)',
    appliesTo: 'All Learners',
    notes: 'Integrated Science, Social Studies, Literacy reading sessions, and sensory activities.',
  },
  {
    time: '12:40 PM – 1:40 PM',
    activity: 'Lunch & Midday Rest',
    appliesTo: 'All Learners',
    notes: 'Warm school lunch followed by Kindergarten rest time and quiet reading for Primary classes.',
  },
  {
    time: '1:40 PM – 2:30 PM',
    activity: 'Kindergarten Afternoon Enrichment & Dismissal',
    appliesTo: 'Kindergarten',
    notes: 'Storytelling, art, and orderly parent pick-up for Baby, Middle, and Top Class learners.',
  },
  {
    time: '1:40 PM – 3:45 PM',
    activity: 'Afternoon Primary Lessons & Guided Revision',
    appliesTo: 'Junior School',
    notes: 'Subject consolidation, writing workshops, and individual teacher support.',
  },
  {
    time: '3:45 PM – 4:30 PM',
    activity: 'Co-Curricular Clubs, Sports & Junior School Dismissal',
    appliesTo: 'Junior School',
    notes: 'Games, reading clubs, choir practice, closing prayer, and supervised departure at 4:30 PM.',
  },
];
