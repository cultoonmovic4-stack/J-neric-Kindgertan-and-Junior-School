import type { NewsArticle } from '../types/school';
import commissioningImg from '../assets/images/8.jpg';
import dearDayImg from '../assets/images/5.jpg';
import schoolPayImg from '../assets/images/1.jpg';
import admissionsImg from '../assets/images/3.jpg';

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: 'official-school-commissioning-august-2026',
    title: 'Official School Commissioning Presided Over by Bishop Henry Katumba Tamale',
    category: 'Milestone',
    publishedAt: '2026-08-18',
    displayDate: 'August 2026',
    summary:
      'Parents, community leaders, teachers, and learners gathered at our Namulanda campus for the historic Official School Commissioning ceremony presided over by Bishop Henry Katumba Tamale.',
    body: [
      'August 2026 marked a defining milestone in the life of J-Neric Kindergarten & Junior School as the school community gathered in Namulanda Ward, Kajjansi Town Council for our Official School Commissioning ceremony.',
      'Presided over by Bishop Henry Katumba Tamale, the dedication service celebrated the school’s steadfast growth across both the Kindergarten and Junior School divisions and committed our classrooms, learners, and staff to God’s guidance.',
      'Addressing parents and guests, Director Jackline Luga reaffirmed J-Neric’s founding commitment to "Nurture with Love"—pairing disciplined academic instruction with safe spaces, moral grounding, and transparent partnership with every family.',
      'Learners from Baby Class through Upper Primary delighted guests with scripture recitations, choral music, and poems reflecting gratitude for their teachers and parents.',
    ],
    featured: true,
    imagePath: commissioningImg,
    imageCaption:
      'Community celebration during the Official School Commissioning at Namulanda Campus, August 2026.',
    author: 'Office of the Director',
  },
  {
    id: 2,
    slug: 'enjuba-dear-day-literacy-celebration',
    title: '150+ Learners and 13+ Teachers Join enjuba’s DEAR Day Literacy Celebration',
    category: 'Academics',
    publishedAt: '2026-03-15',
    displayDate: 'March 2026',
    summary:
      'J-Neric Kindergarten & Junior School proudly participated in enjuba’s Drop Everything And Read (DEAR) Day, uniting over 150 learners and 13+ teachers in a campus-wide celebration of joyful reading.',
    body: [
      'Books took center stage across every classroom and shaded courtyard at J-Neric as more than 150 learners and over 13 teachers paused routine schedules to celebrate enjuba’s Drop Everything And Read (DEAR) Day.',
      'In the Kindergarten wing, teachers led expressive picture-book storytelling circles designed to build vocabulary, listening skills, and curiosity among Baby, Middle, and Top Class learners.',
      'Across the Junior School division, Primary learners read independently and in paired reading groups before sharing favorite stories and lessons with their peers.',
      'Reading is the cornerstone of every subject we teach. Initiatives like DEAR Day strengthen our year-round literacy program and remind children that reading is not just an exam requirement, but a lifelong source of wonder.',
    ],
    featured: true,
    imagePath: dearDayImg,
    imageCaption:
      'Learners and teachers immersed in storybooks during enjuba’s Drop Everything And Read (DEAR) Day.',
    author: 'Academics & Literacy Desk',
  },
  {
    id: 3,
    slug: 'schoolpay-digital-fee-collection-guide',
    title: 'Convenient, Cashless Fee Payments Now Streamlined via SchoolPay',
    category: 'Admissions',
    publishedAt: '2026-01-22',
    displayDate: 'January 2026',
    summary:
      'Parents and guardians can conveniently settle school fees anytime under J-NERIC KINDERGARTEN LTD through MTN Mobile Money, Airtel Money, and SchoolPay partner banks.',
    body: [
      'To make tuition payments faster, safer, and easier to track for busy families along Entebbe Road and beyond, J-Neric Kindergarten & Junior School operates digital fee collection on SchoolPay under the registered merchant name J-NERIC KINDERGARTEN LTD.',
      'Every admitted learner is issued a personal 10-digit Student Payment Code. Parents can pay directly from MTN MoMo (*165#), Airtel Money (*185#), or at authorized partner commercial banks and banking agents.',
      'Payments reflect immediately in school bursar records, eliminating long queues at the start of term and providing automatic SMS confirmation receipts for every transaction.',
      'Parents who need assistance retrieving a Student Payment Code may reach the school office directly on 0772 098405.',
    ],
    featured: true,
    imagePath: schoolPayImg,
    imageCaption:
      'Parents enjoy instant digital receipts and seamless reconciliation through SchoolPay (J-NERIC KINDERGARTEN LTD).',
    author: 'Bursar & Administration',
  },
  {
    id: 4,
    slug: 'admissions-open-kindergarten-and-junior-school',
    title: 'Admissions Open for Kindergarten & Primary (P.1 – P.7) Classes',
    category: 'Admissions',
    publishedAt: '2026-09-04',
    displayDate: 'September 2026',
    summary:
      'Applications and campus tour bookings are open for prospective families seeking Baby, Middle, Top Class, and Primary One through Primary Seven placements in Namulanda, Kajjansi.',
    body: [
      'We welcome prospective parents and guardians to visit J-Neric Kindergarten & Junior School in Namulanda Ward, Kajjansi Town Council to explore available spaces for the upcoming term.',
      'Guided campus tours run Monday through Friday from 8:00 AM to 4:30 PM and Saturdays from 8:30 AM to 1:00 PM. Families can meet class teachers, review daily timetables, and learn about our phonics, literacy, and primary curriculum pathways.',
      'To book a campus tour or arrange a learner readiness interaction, submit an inquiry through our Admissions page or call 0772 098405.',
    ],
    featured: false,
    imagePath: admissionsImg,
    imageCaption:
      'Prospective families are welcome to tour classrooms at our Namulanda campus off Entebbe Road.',
    author: 'Admissions Office',
  },
];
