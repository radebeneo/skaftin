# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- **Phase 2 — Motion** (COMPLETE)
- **Phase 3 — Skaftin Curator Upgrade** (COMPLETE)
- **Phase 3 — Days & week flow** (COMPLETE)
- **Phase 6 — Asset & visual polish** (COMPLETE)
- **Phase 7 — Header + Hero Redesign** (COMPLETE)

## Current Goal

- User QA pass on new header and hero carousel. "Browse Your Favourites" section redesign pending (separate scope).

## Completed

- [x] Six-File Context System written for this project (`context/` folder at project root)
- [x] `AGENTS.md` entry point updated
- [x] Project scaffolding: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui
- [x] Homepage (`/`) — hero, categories, specials, occasions quiz, feature cards
- [x] Skaftin wizard (`/skaftin`) — 4-step flow, taste profile, menu picker, checkout, confirmation
- [x] Site header — logo, store selector, nav, cart count, stars badge
- [x] Site footer
- [x] Skaftin plan component, loyalty panel stub, skaftin hero
- [x] `lib/cart-store.ts` — localStorage cart with add/remove/quantity/total
- [x] `lib/auth.ts` — localStorage mock auth (Clerk-interface-compatible)
- [x] `lib/notifications-store.ts` — localStorage notifications with add/markRead/clearAll
- [x] `lib/rewards-store.ts` — localStorage Skaftin Stars with tiers and history
- [x] `components/cart-drawer.tsx` — slide-in drawer, item list, quantity stepper, order summary
- [x] `components/notifications-bell.tsx` — bell icon, unread count, dropdown panel
- [x] `components/toast-queue.tsx` — global slide-in toast queue
- [x] `components/rewards-panel.tsx` — star balance, tier badge, progress bar, earn history
- [x] `app/sign-in` and `app/sign-up` — branded two-panel auth pages
- [x] `app/profile` — 4-tab profile page (account, plans, preferences, addresses)
- [x] **Phase 3 Days & Week Flow (2026-08-26)**:
  - [x] Show `LiveSkaftinPreview` on Step 2 (Build My Week).
  - [x] Dynamic day thumbnails based on 3-day or 5-day plan selection.
  - [x] Framer Motion loading animation for week generation transition.
  - [x] Map generated week and BYO mode custom items back to live preview.
- [x] **Phase 3 Curator Upgrade (2026-08-26)**:
  - [x] Redesigned `components/myskaftin/data.ts` — Muncher Personalities, allergen IDs, favourite affinities, Themed Weeks, Sticker Themes, DailyLunchbox/GeneratedWeek model, SNACK_OPTIONS
  - [x] New `lib/recommendation-engine.ts` — deterministic meal ranking, week generation, per-day remix, variety analysis, come-home-empty score
  - [x] Rewrote `components/myskaftin/experience.tsx` — 3-step wizard (Taste → Build → Order), persistent rewards strip, back-navigation
  - [x] Rewrote `components/myskaftin/step-taste.tsx` — 6 Muncher Personality cards, personalised copy, emoji food chips, allergy positive-confirmation toast, improved prep cards
  - [x] New `components/myskaftin/step-build.tsx` — Build It For Me, Day Cards with Remix, Variety Meter, Come-Home-Empty Score, Budget tiles, Curated/Themed/BYO tabs
  - [x] New `components/myskaftin/step-review.tsx` — week preview payoff, sticker theme selector, first-order gift, cart summary, rewards strip, unified delivery form
  - [x] Rewrote `components/myskaftin/confirmation.tsx` — week strip, share API, WhatsApp, quick prep guides, Thursday nudge
  - [x] Updated `app/skaftin/page.tsx` — fixed "3 taps" → accurate "3 steps"
  - [x] Extended `app/globals.css` — 4 keyframes + prefers-reduced-motion block
- [x] **Phase 2 Motion (2026-08-26)**:
  - [x] Added `framer-motion` dependency
  - [x] Built `SkaftinMotionProvider` context for global cross-screen animations
  - [x] Added fly-into-box animation on Taste & Prep item selection
  - [x] Added popLayout enter/exit animations to `LiveSkaftinPreview`
  - [x] Added ARIA-live screen reader announcements for food added/removed
  - [x] Added popLayout crossfade animation to Remix action in `StepBuild`

- [x] **Phase 4 Dietary Safety (2026-08-26)**:
  - [x] Cascading restriction filter: toggle a dislike removes conflicting likes
  - [x] Conflicting custom items removed from Build Your Own list
  - [x] Incompatible Generated Week meals are automatically replaced via `remixDay`
  - [x] Screen-reader announcement for restriction-triggered food removals
  - [x] Incompatible likes are hidden from the selection pool
  - [x] Incompatible Build Your Own meals are filtered out natively

- [x] **Phase 7 — Header + Hero Redesign (2026-09-01)**:
  - [x] `globals.css`: Added `@font-face` for `EskortBarber5` and `EskortSpazaClean`; added `--font-eskort-barber` and `--font-eskort-spaza` tokens to `@theme inline`
  - [x] `globals.css`: Defined all 10 new CSS classes: `.btn-arrow-light`, `.btn-play`, `.btn-pause`, `.video-play`, `.deco-sticky-left`, `.deco-sticky-right`, `.deco-carousel-porky`, `.deco-title-squiggle`, `.bg-grunge-black`, `.bg-grunge-black-after`
  - [x] `globals.css`: Added `@keyframes hero-progress` + `.animate-hero-progress` utility
  - [x] `site-header.tsx`: Full redesign — dark background (`var(--ink)`), scroll-triggered shadow upgrade, new nav (Recipes/Quality/About/Specials/What's New), search expand-on-click, cart with yellow ring + count badge, wishlist stub, account icon; mobile hamburger drawer with dark theme
  - [x] `eskort-homepage.tsx`: Replaced `SECTION 1` (yellow SHOP ONLINE hero) with full-bleed `HeroCarousel` component: two video slides (`ogilvy-home-banner.mp4` + `eskort-bongi-banner.mp4`), 3.5s auto-advance, 400ms crossfade, dark left-to-right scrim, social-proof pill with avatar cluster, EskortBarber5 display heading, EskortSpazaClean yellow script, squiggle deco, body copy, SHOP PRODUCTS + VIEW SPECIALS CTAs, progress bar + pig-nose marker, play/pause toggle, stickers, grunge edge; `prefers-reduced-motion` disables autoplay
- [x] **Standalone homepage TSX conversion (2026-09-07)**:
  - [x] Added the React homepage component at `eskort-homepage-new/index.tsx` and wired `app/page.tsx` to import it.
  - [x] Converted the standalone behavior script to strict, DOM-typed `script.ts`; browser-ready JavaScript remains compiled alongside it.
- [x] **Legacy homepage cleanup (2026-09-07)**:
  - [x] Removed `components/eskort-homepage.tsx`; its sections were internal to the monolithic component, so no separate component dependencies required deletion.
  - [x] Preserved shared app-shell, cart, notification, rewards, and Skaftin route components.
- [x] **Standalone homepage styling (2026-09-07)**:
  - [x] Imported `eskort-homepage-new/styles.css` from the active `eskort-homepage-new/index.tsx` component.
- [x] **Standalone homepage parity (2026-09-07)**:
  - [x] Restored the standalone header, search panel, mobile navigation, skip link, main landmark, footer, newsletter, and social links in `eskort-homepage-new/index.tsx`.
  - [x] Added homepage-specific title, description, and favicon metadata in `app/page.tsx`.
  - [x] Updated the document language to `en-ZA` in `app/layout.tsx`.
- [x] **Standalone homepage asset paths (2026-09-08)**:
  - [x] Corrected sticker, specials, rib-rack, and favourites URLs to match their deployed location under `public/images1/images1/`.
  - [x] Included the responsive mobile rib-rack artwork in the path correction.
- [x] **Homepage specials card width (2026-09-08)**:
  - [x] Removed the desktop specials container cap so all three equal-width product cards expand through the available space to the right, while preserving existing tablet and mobile sizing.
  - [x] Increased desktop `.special-card` sizing to `min-width: calc((100% - 18px) / 3)`; existing tablet and mobile overrides remain unchanged.
  - [x] Expanded the desktop specials carousel grid from `calc(100% - 48px)` to the full container width.
- [x] **Homepage specials layout emphasis (2026-09-08)**:
  - [x] Shifted the desktop specials composition toward the right with a responsive left inset and right-aligned container.
  - [x] Increased desktop specials card width, height, padding, product imagery, and product typography while preserving tablet and mobile overrides.
  - [x] Reduced the emphasized desktop card width slightly after visual review while retaining the increased height and internal scale.
  - [x] Changed the specials cards from charcoal to the homepage black color token.
  - [x] Scoped the black card and transparent image backgrounds to the specials section so later global product-card styles cannot override them.
- [x] **Homepage favourites card sizing (2026-09-08)**:
  - [x] Matched favourites card width, desktop height, and desktop padding to the specials cards while preserving favourites-specific artwork and styling.
  - [x] Added explicit responsive flex bases so the favourites carousel cannot compress cards below their intended widths.
- [x] **Homepage mySkaftin CTA (2026-09-08)**:
  - [x] Added a third hero CTA labelled `mySkaftin`, displayed inline with both existing hero CTAs and routing internally to `/skaftin`.
  - [x] Applied the requested `#DC2626` background through the homepage `--cta-red` CSS token.
  - [x] Replaced the development-only localhost URL with a deployment-safe `next/link` route.
- [x] **Vercel pnpm lockfile repair (2026-09-08)**:
  - [x] Synchronized `pnpm-lock.yaml` with the configured `hono` override using pnpm `10.34.5`.
  - [x] Verified a CI-mode frozen install and production build.
- [x] **Skaftin homepage header parity (2026-09-08)**:
  - [x] Extracted the active standalone homepage header into a shared `HomepageHeader` component.
  - [x] Replaced the legacy `/skaftin` header and removed the "Back to Eskort Shop Online" row.
- [x] **Skaftin homepage footer parity (2026-09-08)**:
  - [x] Extracted the active standalone homepage footer into the shared `SiteFooter` component.
  - [x] Replaced the legacy `/skaftin` footer while preserving the homepage footer markup, responsive styling, assets, and newsletter feedback.
  - [x] Added the deployed `bg-grundge-black-before.svg` artwork as a native-height blended top edge on both shared footer instances.
- [x] **Skaftin hero visual refresh (2026-09-08)**:
  - [x] Changed the hero to the tokenized `#D6EEFF` light-blue background with accessible dark foreground text.
  - [x] Replaced the text-based Lunchbox Legend pill with the supplied SVG badge.
  - [x] Added the supplied light-blue grunge artwork to the bottom hero edge.
  - [x] Enlarged the lunchbox artwork and removed its frame, border, and shadow.
  - [x] Applied Gobold Bold to the hero heading and EskortSpazaClean to the highlighted word.
  - [x] Kept the grunge edge at its native 26px depth and increased the visual emphasis of the EskortSpazaClean \"boring\" accent.

  - [x] Applied the requested green heading, gold hero accents, and black BUILD MY KIT CTA through named brand tokens.

  - [x] Enforced the Skaftin hero CTA's black background and white label against higher-specificity homepage link styles.

  - [x] Added the supplied light arrow icon to the BUILD MY KIT CTA.
  - [x] Added the supplied light arrow icon to the BUILD MY WEEK and REVIEW & ORDER wizard CTAs.

- [x] **Skaftin builder background (2026-09-08)**:
  - [x] Added the tokenized `#FCF9F1` cream background to the full section between the Skaftin hero and shared footer.
  - [x] Extended the cream background behind the hero's 26px light-blue grunge edge.
- [x] **Skaftin builder typography (2026-09-21)**:
  - [x] Added the local Montserrat variable font as the `font-montserrat` Tailwind token.
  - [x] Scoped Montserrat body/UI copy and Gobold display text to the cream `/skaftin` builder section without changing the hero or shared site chrome.

## In Progress

- Nothing currently in progress.

## Next Up

- User QA pass: mobile (375px), tablet (768px), desktop (1280px)
- Swap mock auth for real Clerk when API keys are available

## Open Questions

- **Clerk API keys**: When will these be available? The mock auth interface is Clerk-compatible. To upgrade: install `@clerk/nextjs`, wrap `<ClerkProvider>` in layout, replace `useAuthStore()` with `useUser()` from Clerk.
- **Database**: When the product goes live, `eskort-cart`, `eskort-plans`, and `eskort-profile` should move from localStorage to a real backend (Supabase or Prisma). No changes to component interfaces required — just replace the store implementations.
- **Junior menu images**: Placeholder divs are in place. Real product photography can replace placeholders by updating the `image` field in `JUNIOR_MENU_ITEMS` in `data.ts` and rendering `<img>` instead of the placeholder div in `step-menu.tsx`.
- **Payment processing**: The checkout step currently has a "Place Order" button that simulates an order. Real payment (PayFast / Stripe) integration is out of scope for this phase.

## Architecture Decisions

- **localStorage for all persistence** (2026-08-24): No backend database in this phase. All user data (cart, auth session, notifications, rewards, profile, plan history) is stored in namespaced localStorage keys. This enables a fully deployment-ready demo with zero infrastructure. Keys are prefixed `eskort-` to avoid collisions.
- **Mock auth over Clerk** (2026-08-24): No Clerk API keys are available. Mock auth stores a session object in `eskort-auth` localStorage and exposes the same interface as Clerk's `useUser()` hook so the swap is a drop-in replacement.
- **Junior menu placeholders** (2026-08-24): All new junior menu items use styled placeholder divs (emoji + name, category-coloured background) instead of generated or fetched images. This keeps the build reproducible and avoids image dependencies.
- **Toast queue in layout** (2026-08-24): The previous inline toast in `eskort-homepage.tsx` was replaced by a global `<ToastQueue>` mounted in `app/layout.tsx`. Any component can trigger a toast by calling `useNotificationsStore().addNotification()`.

## Session Notes

- Project uses Tailwind v4 with CSS `@theme` block in `globals.css` — token syntax is `--color-*` mapped from CSS custom properties, not a `tailwind.config.js` file.
- `pnpm` is the package manager (`pnpm-lock.yaml` exists). Use `pnpm add` not `npm install` if adding packages.
- Dev server runs on `0.0.0.0` (`next dev -H 0.0.0.0`) — accessible on local network.
- The active homepage is implemented in `eskort-homepage-new/index.tsx`.
