# UI Context

## Theme

Light only. No dark mode. The design language is bold, warm, and energetic — reflecting Eskort's South African heritage and family-focused brand. Backgrounds are white and soft blue-grey (`#E6EEF4`). Surfaces layer onto white. Interactive elements use the Eskort red or black ink. Yellow (`#FFAD00`) is the hero/highlight colour. The type scale is large and confident — uppercase headings, heavy weights, condensed display fonts for heroes.

## Colors

All components must use these CSS custom property tokens. No hardcoded hex values in component files.

| Role | CSS Variable | Value | Tailwind Class |
|---|---|---|---|
| Page background | `--background` | `oklch(1 0 0)` (white) | `bg-background` |
| Surface / panel | `--panel` | `#e9eef3` | `bg-panel` |
| Eskort cloud (light blue-grey) | `--eskort-cloud` | `#eef3f8` | `bg-eskort-cloud` |
| Primary text / ink | `--ink` | `#17140f` | `text-ink` / `bg-ink` |
| Muted text | `--muted-foreground` | `oklch(0.5 0.01 60)` | `text-muted-foreground` |
| Eskort Red (primary action) | `--eskort-red` | `#e63329` | `bg-eskort-red` / `text-eskort-red` |
| Brand Red (slightly brighter) | `--brand-red` | `#e8443b` | `bg-brand-red` |
| Hero CTA Red | `--cta-red` | `#DC2626` | Homepage `.button-red` |
| Eskort Yellow (hero) | `--eskort-yellow` | `#fdb913` | `bg-eskort-yellow` |
| Brand Yellow (CTA) | `--brand-yellow` | `#f6a700` | `bg-brand-yellow` |
| Brand Yellow Soft | `--brand-yellow-soft` | `#ffd64d` | `bg-brand-yellow-soft` |
| Eskort Blue (info) | `--eskort-blue` | `#075188` | `bg-eskort-blue` |
| Eskort Blue Light (Skaftin hero) | `--eskort-blue-light` | `#d6eeff` | `bg-eskort-blue-light` |
| Skaftin Cream (builder background) | `--skaftin-cream` | `#fcf9f1` | `bg-skaftin-cream` |
| Eskort Green (Skaftin hero heading) | `--eskort-green` | `#006e43` | `text-eskort-green` |
| Eskort Gold (Skaftin hero accent) | `--eskort-gold` | `#a18418` | `text-eskort-gold` |
| Brand Blue | `--brand-blue` | `#5e94c4` | `bg-brand-blue` |
| Brand Green | `--brand-green` | `#4c9a2a` | `bg-brand-green` |
| Border default | `--border` | `oklch(0.9 0.005 250)` | `border-border` |
| Error / destructive | `--destructive` | `oklch(0.62 0.21 27)` | `text-destructive` |

New components must not use direct hex values in inline styles.

## Typography

| Role | Font | Variable / Class |
|---|---|---|
| Body / UI text | Gilroy → PP Neue Montreal → Poppins → system-ui | `font-sans` |
| Hero display headings | GT Super Display → Gilroy → Anton → Poppins | `font-display` |
| Condensed Skaftin hero heading | Gobold Bold → Impact | `font-gobold` |
| Condensed hero text (SHOP / ONLINE NOW) | League Gothic → Antonio → Teko → Anton → Impact | `.hero-impact-text` |
| Skaftin accent script | EskortSpazaClean → Caveat → Permanent Marker | `font-eskort-spaza` |
| Code / mono | System mono | Not used |

Font weights in use: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black).

**Rule**: Headings on marketing sections use `font-display font-black uppercase tracking-tight`. Body copy uses `font-sans font-medium`. Button labels use `font-extrabold`.

## Border Radius

| Context | Value | Tailwind Class |
|---|---|---|
| Inline / pill badges | 9999px | `rounded-full` |
| Buttons (primary) | 9999px | `rounded-full` |
| Buttons (secondary/ghost) | 16px | `rounded-2xl` |
| Cards / panels | 24px | `rounded-[24px]` |
| Feature cards / large panels | 32px | `rounded-[32px]` |
| Modal overlays | 24px | `rounded-[24px]` |
| Input fields | 12px | `rounded-xl` |
| Small chips / tags | 8px | `rounded-lg` |

## Component Library

shadcn/ui on top of Tailwind CSS v4. Components live in `components/ui/`. Use the shadcn CLI (`npx shadcn add <component>`) to add new primitives — never write them from scratch. Custom Eskort components live directly in `components/` (not in `ui/`).

## Layout Patterns

- **Max-width**: `max-w-7xl mx-auto` with `px-4 sm:px-6 lg:px-8` gutters. All page sections use this.
- **Header**: Sticky top, `h-16 sm:h-20`, white background, `border-b border-border shadow-xs`. Three zones: left (logo + store selector), center (nav), right (search + auth + notifications + cart).
- **Cart Drawer**: Fixed right-side overlay, `w-[380px]` on desktop, full-width on mobile. Semi-transparent backdrop. Slides in from the right with `translate-x` transition.
- **Notifications Dropdown**: Attached to bell icon, `w-[360px]`, `max-h-[480px]`, scrollable. Opens below the bell with a subtle shadow.
- **Auth Pages**: Two-panel on desktop (`grid-cols-2`): left panel is an Eskort brand image/colour block, right panel is the form. Full-screen form on mobile.
- **Profile Page**: Full-width page with sticky left-side tab list on desktop (`w-64`), tabs stacked vertically on mobile.
- **Modals**: Centered overlay with `backdrop-blur-sm bg-black/40`. Card `max-w-md rounded-[24px]`.
- **Skaftin Wizard**: Full-page shell with progress bar at top, step content centered `max-w-3xl`, navigation arrows bottom.
- **Toast**: Bottom-right, `fixed bottom-6 right-6 z-[100]`. Stacks vertically. Each toast auto-dismisses after 3.5s.

## Icons

lucide-react. Stroke-based only. Sizes:
- `h-4 w-4` — inline text icons, small badges
- `h-5 w-5` — header icon buttons (search, bell, cart)
- `h-6 w-6` — larger UI elements, empty states
- `h-8 w-8` — feature card icons, step icons in wizard

strokeWidth: default `2`. Do not change stroke width unless a specific design requires it.

## Placeholder Images (Junior Menu)

Junior menu items that have no product photography use a **styled placeholder div**:
- Background: a soft pastel colour derived from the category (shaped=blue, alphabets=yellow, animals=green, lunchables=red, classic=grey)
- Centred emoji representing the item (e.g. ⭐ for star-shaped, 🦕 for dinosaur nuggets)
- Item name in `font-sans font-bold text-sm` below the emoji
- Aspect ratio 1:1, `rounded-2xl`
- Class pattern: `flex flex-col items-center justify-center bg-[colour] rounded-2xl aspect-square`
