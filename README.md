# J-Neric Kindergarten & Junior School — Official Website

## 1. Project Overview
This repository houses the web platform for **J-Neric Kindergarten & Junior School**, a private pre-primary and primary institution located in **Namulanda Ward, Kajjansi Town Council, Wakiso District, Uganda** (along the Entebbe Road corridor).

- **School Motto:** *"Nurture with Love"*
- **Leadership:** Director Jackline Luga
- **Divisions:**
  1. **J-Neric Kindergarten** (Early Years: Baby, Middle, and Top Class)
  2. **J-Neric Junior School** (Primary Section: Primary One to Primary Seven)
- **Fee Collection Partner:** SchoolPay (`J-NERIC KINDERGARTEN LTD`)
- **Primary Contact:** `0772 098405`

---

## 2. Decoupled Development Phases
This platform is architected in two distinct, decoupled phases so stakeholder reviews can happen early without blocking on backend infrastructure:

- **Phase 1 (Current Focus): Standalone Frontend Foundation & Pitch Demo (`/frontend`)**
  - React + Vite + TypeScript + Tailwind CSS v4 application inside `/frontend`.
  - Uses strongly typed local mock data inside `/frontend/src/data/` and shared contracts in `/frontend/src/types/school.ts` so all pages, forms, timetables, and SchoolPay guides work seamlessly during live presentations without requiring a running database.
- **Phase 2 (Post-Approval): Laravel + MySQL Backend (`/backend`)**
  - RESTful API built with Laravel inside `/backend` connected to MySQL (via XAMPP locally).
  - Replaces static imports from `/frontend/src/data/` with live API endpoints (`/api/news`, `/api/admissions`, `/api/calendar`, `/api/gallery`) and introduces a lightweight School Admin Dashboard, requiring zero UI component refactoring.

---

## 3. Strict Engineering & Design Guardrails
All code authored for `/frontend` **MUST** adhere to the following rules:

1. **Human-Crafted Editorial Aesthetic:** Classic, trustworthy independent-school brochure design—never a SaaS startup landing page.
2. **Zero Icon Libraries & UI Frameworks:** Do **NOT** install or import `lucide-react`, `heroicons`, `react-icons`, `font-awesome`, MUI, Chakra, or Shadcn. Use editorial typography, numbered lists (`01.`, `02.`, `03.`), crisp `1px` borders, and real photography instead.
3. **Zero AI Visual Clichés:**
   - **NO** CSS gradients (`bg-gradient-*`).
   - **NO** glassmorphism (`backdrop-blur-*` or translucent frosted cards).
   - **NO** bubbly cards (`rounded-[3px]` maximum; prefer sharp hairline borders).
   - **NO** floating AI chatbots, synthetic sparkle badges, or Lorem Ipsum copy.
4. **Laravel-Ready Data Layer:** Keep all content arrays, form payloads, and TypeScript interfaces isolated in `/frontend/src/data/` and `/frontend/src/types/` so Phase 2 API integration is a clean swap.

---

## 4. Local Development (Phase 1)
```bash
cd frontend
npm install
npm run dev
```

---

## 5. Documentation Index
Review the specifications in `/docs` before building or modifying any page:
- [docs/01-PROJECT-STRUCTURE.md](docs/01-PROJECT-STRUCTURE.md) — Folder layout, routing map, and TypeScript contracts.
- [docs/02-DESIGN-SYSTEM.md](docs/02-DESIGN-SYSTEM.md) — Official crest color tokens, typography, spacing, and visual guardrails.
- [docs/03-PAGES-AND-COPY.md](docs/03-PAGES-AND-COPY.md) — Section-by-section wireframe and verified copy for all 6 pages.
