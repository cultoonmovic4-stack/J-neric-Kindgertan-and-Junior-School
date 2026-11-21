# J-Neric Kindergarten & Junior School — Official Website

## 1. Project Overview
This repository houses the web platform for **J-Neric Kindergarten & Junior School**, a private pre-primary and primary institution located in **Namulanda Ward, Kajjansi Town Council, Wakiso District, Uganda** (along the Entebbe Road corridor).

- **School Motto:** *"Nurture with Love"*[cite: 1]
- **Leadership:** Director Jackline Luga
- **Divisions:**
  1. **J-Neric Kindergarten** (Early Years: Baby, Middle, and Top Class)
  2. **J-Neric Junior School** (Primary Section: Primary One to Primary Seven)
- **Fee Collection Partner:** SchoolPay (`J-NERIC KINDERGARTEN LTD`)
- **Primary Contact:** `0772 098405`

---

## 2. Development Phases
We are building this system in two distinct, decoupled phases:

- **Phase 1 (Current Focus): Frontend Foundation & Pitch Demo**
  - Standalone React + Vite + TypeScript + Tailwind CSS application inside `/frontend`.
  - Uses strongly typed local mock data inside `/frontend/src/data/` so all pages, forms, schedules, and SchoolPay guides work seamlessly during live stakeholder presentations without requiring a running database.
- **Phase 2 (Post-Approval): Laravel + MySQL Backend**
  - RESTful API built with Laravel inside `/backend` connected to MySQL (via XAMPP locally).
  - Will replace `/frontend/src/data/` static imports with live API endpoints (`/api/news`, `/api/admissions`, `/api/calendar`, `/api/gallery`) and provide a lightweight School Admin Dashboard.

---

## 3. Strict Engineering & Design Guardrails for AI Agents
Any code generated for `/frontend` **MUST** adhere to the following rules:

1. **Human-Crafted Editorial Aesthetic:** Build a classic, trustworthy educational institution website—never a SaaS startup landing page.
2. **Zero Icon Libraries:** Do **NOT** install or import `lucide-react`, `heroicons`, `react-icons`, or `font-awesome`. Use editorial typography, numbered lists (`01.`, `02.`, `03.`), crisp `1px` borders, and real photography instead.
3. **Zero AI Visual Clichés:**
   - **NO** CSS gradients (`bg-gradient-to-*`).
   - **NO** glassmorphism (`backdrop-blur-*` or translucent frosted cards).
   - **NO** floating AI chatbots or synthetic sparkle badges.
   - **NO** generic "Lorem Ipsum" placeholder copy—use the verified school facts and copy defined in `docs/`.
4. **Laravel-Ready Data Layer:** Keep all content arrays, form payloads, and TypeScript interfaces isolated in `/frontend/src/data/` and `/frontend/src/types/` so Phase 2 API integration requires zero UI refactoring.

---

## 4. Documentation Index
Before scaffolding or modifying components, review the specifications in `/docs`:
- `docs/01-PROJECT-STRUCTURE.md` — Folder layout, routing map, and TypeScript contracts.
- `docs/02-DESIGN-SYSTEM.md` — Official logo color tokens, typography, spacing, and component rules.
- `docs/03-PAGES-AND-COPY.md` — Section-by-section wireframe and authentic copy for all 6 pages.