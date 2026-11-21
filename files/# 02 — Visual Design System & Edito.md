# 02 — Visual Design System & Editorial Standards

## 1. Brand Color Tokens (Extracted from Official Crest)
Define these exact tokens in `frontend/src/index.css` using Tailwind v4 `@theme`:

- **Primary Brand (`--color-crest-navy`: `#1E2B7B`)**: Header navigation, footer background, primary headings, and structural borders.
- **Primary Accent (`--color-crest-crimson`: `#D93829`)**: Primary CTA buttons (`Apply for Admission`), active navigation underline, category eyebrows, and key callout borders.
- **Secondary Accent (`--color-pencil-gold`: `#F2C21A`)**: Thin accent rules (`3px`), SchoolPay highlight strip border, and important calendar markers.
- **Division Accents**:
  - **Kindergarten (`--color-laurel-green`: `#1F7A3E`)**: Used strictly as a `3px` top border on Early Years cards.
  - **Junior School (`--color-crest-sky`: `#1D9BF0`)**: Used strictly as a `3px` top border on Primary section cards.
- **Surfaces & Text**:
  - **Canvas (`--color-paper-ivory`: `#F8F7F4`)**: Primary warm editorial page background.
  - **Card Surface (`--color-pure-white`: `#FFFFFF`)**: Crisp white cards and table containers.
  - **Body Ink (`--color-slate-ink`: `#1A1D29`)**: High-contrast, readable body copy.
  - **Muted Ink (`--color-muted-slate`: `#525866`)**: Captions, dates, and metadata.
  - **Hairline Border (`--color-rule-gray`: `#DEDCD6`)**: `1px` structural dividers.

---

## 2. Typography
Load two classic Google Fonts in `frontend/index.html`:
1. **Headings (`--font-serif`: `'Merriweather', Georgia, serif`)**: Authoritative, warm institutional serif for `h1`–`h3` and pull-quotes.
2. **Body & UI (`--font-sans`: `'Plus Jakarta Sans', system-ui, sans-serif`)**: Clean humanist sans-serif for paragraphs, navigation, forms, and timetables.

---

## 3. Strict Anti-AI & Human-Crafted Rules
- **NO Icons:** Zero icon libraries (`lucide-react`, `heroicons`, etc.) and zero decorative SVG icons inside feature cards. Use editorial numbering (`01.`, `02.`, `03.`), clean `1px` borders, and photography.
- **NO Gradients or Blur:** Every background must be a flat, solid color (`#F8F7F4`, `#FFFFFF`, `#1E2B7B`). Never use `bg-gradient-*`, `backdrop-blur-*`, or translucent glass cards.
- **Classic Sharp Geometry:** Use `rounded-[3px]` or `rounded-none` with `1px solid #DEDCD6` borders rather than bubbly `rounded-2xl` cards.
- **Real Logo Usage:** Render `/images/logo.png` cleanly on a white background container in the header and footer so the full circular crest and *"Nurture with Love"* motto remain crisp and legible.