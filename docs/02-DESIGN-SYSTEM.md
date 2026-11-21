# 02 — Visual Design System & Editorial Standards

## 1. Brand Color Tokens (Extracted from Official Crest)
Defined in `frontend/src/index.css` using Tailwind CSS v4 `@theme`:

| Token | Hex | Intended Usage |
| --- | --- | --- |
| `--color-crest-navy` | `#1E2B7B` | Top utility bar, footer background, primary headings, structural accents |
| `--color-crest-crimson` | `#D93829` | Primary CTA buttons (`Apply Now`, `Book a Campus Visit`), active nav underlines, category eyebrows |
| `--color-pencil-gold` | `#F2C21A` | Thin accent rules (`3px`), SchoolPay highlight strip borders, important calendar markers |
| `--color-laurel-green` | `#1F7A3E` | Kindergarten division accent (`3px` top border on Early Years cards) |
| `--color-crest-sky` | `#1D9BF0` | Junior School division accent (`3px` top border on Primary section cards) |
| `--color-paper-ivory` | `#F8F7F4` | Primary warm editorial page background canvas |
| `--color-pure-white` | `#FFFFFF` | Header, cards, and table surfaces |
| `--color-slate-ink` | `#1A1D29` | High-contrast primary body copy |
| `--color-muted-slate` | `#525866` | Captions, dates, breadcrumbs, and secondary metadata |
| `--color-rule-gray` | `#DEDCD6` | Crisp `1px` hairline borders and table dividers |

---

## 2. Typography
Loaded via Google Fonts in `frontend/index.html`:

1. **Headings (`--font-serif`: `'Merriweather', Georgia, serif`)**
   - Authoritative, warm institutional serif for `h1`–`h3`, editorial pull-quotes, and formal school title lockups.
2. **Body & UI (`--font-sans`: `'Plus Jakarta Sans', system-ui, sans-serif`)**
   - Clean humanist sans-serif for paragraphs, navigation links, forms, badges, and tabular timetables.

---

## 3. Strict Anti-AI & Human-Crafted Rules
- **Zero Icon Libraries:** Do not install `lucide-react`, `heroicons`, `react-icons`, or `font-awesome`, and avoid decorative SVG icon boxes inside feature cards. Communicate structure via editorial numbering (`01.`, `02.`, `03.`), clean `1px` borders, and photography.
- **Zero Gradients or Blur:** Every surface uses flat, solid colors (`#F8F7F4`, `#FFFFFF`, `#1E2B7B`). Never use `bg-gradient-*`, `backdrop-blur-*`, or frosted/translucent glass cards.
- **Classic Sharp Geometry:** Limit border radii to `rounded-[3px]` or `rounded-none` paired with `1px solid #DEDCD6` borders—never bubbly `rounded-2xl` SaaS cards.
- **Official Crest Treatment:** Render `/images/logo.png` cleanly on a crisp white container in both the header and footer so the circular crest and *"Nurture with Love"* motto remain sharp and legible. Include a dignified typographic fallback frame if the asset is unavailable.
