# 01 — Project Structure & Technical Architecture

## 1. Repository Layout
Frontend and backend remain cleanly separated at the root level so Phase 2 (Laravel + MySQL) drops in alongside Phase 1 (React + Vite + TypeScript + Tailwind CSS v4) without restructuring.

```text
J-neric/
├── README.md
├── docs/
│   ├── 01-PROJECT-STRUCTURE.md
│   ├── 02-DESIGN-SYSTEM.md
│   └── 03-PAGES-AND-COPY.md
├── frontend/                     # Phase 1: React + Vite + TypeScript + Tailwind v4
│   ├── public/
│   │   └── images/
│   │       ├── logo.png          # Official J-Neric circular crest ("Nurture with Love")
│   │       ├── hero/             # Main campus & classroom photography
│   │       ├── campus/           # Kindergarten, Junior School & DEAR Day photos
│   │       └── leadership/       # Director portrait
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── TopUtilityBar.tsx
│   │   │   │   ├── MainHeader.tsx
│   │   │   │   └── MainFooter.tsx
│   │   │   └── ui/
│   │   │       ├── PageHeader.tsx
│   │   │       ├── SectionHeading.tsx
│   │   │       └── EditorialCard.tsx
│   │   ├── data/
│   │   │   ├── schoolProfile.ts  # Address, phone, motto, director welcome, SchoolPay steps
│   │   │   ├── academicsData.ts  # Kindergarten & Junior School programs + daily timetable
│   │   │   ├── newsData.ts       # Commissioning ceremony, DEAR Day, term announcements
│   │   │   └── calendarData.ts   # Term I, II, III dates & visitation schedule
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AcademicsPage.tsx
│   │   │   ├── AdmissionsPage.tsx
│   │   │   ├── NewsPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── types/
│   │   │   └── school.ts         # Shared interfaces matching future MySQL/Laravel schemas
│   │   ├── App.tsx               # React Router setup + ScrollToTop behavior
│   │   ├── main.tsx
│   │   └── index.css             # Tailwind CSS v4 + @theme brand tokens
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── backend/                      # Phase 2: Laravel + MySQL (Reserved for post-demo)
```

---

## 2. Application Routing Map
Managed in `frontend/src/App.tsx` via `react-router-dom`:

| Route | Page Component | Purpose |
| --- | --- | --- |
| `/` | `HomePage` | Hero, divisions overview, Director's Welcome, milestones |
| `/about` | `AboutPage` | Founding story, registration, mission/vision/values ledger, leadership |
| `/academics` | `AcademicsPage` | Kindergarten & Primary programs, co-curriculars, daily timetable |
| `/admissions` | `AdmissionsPage` | 4-step enrollment ledger, `#schoolpay` payment guide, inquiry form |
| `/news` | `NewsPage` | Campus milestones, press articles, and Term I–III calendar |
| `/contact` | `ContactPage` | Namulanda address, phone, office hours, inquiry form, map |

---

## 3. Laravel-Ready Data Contracts (`src/types/school.ts`)
All UI components consume interfaces defined in `src/types/school.ts` designed to mirror future Laravel Eloquent models and MySQL tables:

- `NewsArticle` → `news_articles` table (`id`, `slug`, `title`, `category`, `publishedAt`, `summary`, `body`, `featured`, `imagePath`, `imageCaption`)
- `TermDateItem` → `academic_calendar_items` table (`id`, `term`, `academicYear`, `openingDate`, `midtermBreak`, `visitationDay`, `closingDate`, `notes`)
- `AdmissionInquiryPayload` → `admission_inquiries` table (`parentName`, `phone`, `email`, `childName`, `childAge`, `division`, `targetClass`, `preferredVisitDate`, `notes`)
- Supporting profile and academic interfaces (`SchoolProfile`, `SchoolPayMethod`, `AcademicDivision`, `DailyScheduleSlot`, `CoreValueItem`)

In Phase 2, static imports from `src/data/*.ts` will be replaced by service calls to `/api/news`, `/api/calendar`, and `POST /api/admissions` without altering page layouts or component props.
