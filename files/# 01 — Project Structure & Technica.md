# 01 — Project Structure & Technical Architecture

## 1. Repository Layout
Keep frontend and backend cleanly separated at the root level so Phase 2 (Laravel) drops in cleanly alongside Phase 1 (React + Vite).

```text
j-neric-school/
├── README.md
├── docs/
│   ├── 01-PROJECT-STRUCTURE.md
│   ├── 02-DESIGN-SYSTEM.md
│   └── 03-PAGES-AND-COPY.md
├── frontend/                     # Phase 1: React + Vite + TypeScript + Tailwind
│   ├── public/
│   │   └── images/
│   │       ├── logo.png          # Official J-Neric circular crest ("Nurture with Love")[cite: 1]
│   │       ├── hero/             # Main campus & classroom photography
│   │       ├── campus/           # Kindergarten, Junior School & DEAR Day photos
│   │       └── leadership/       # Director portrait placeholder
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
│   │   └── index.css             # Tailwind CSS v4 + custom theme tokens
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── backend/                      # Phase 2: Laravel + MySQL (Reserved for post-demo)