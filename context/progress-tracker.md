# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- **Phase 2 — Motion** (COMPLETE)
- **Phase 3 — Skaftin Curator Upgrade** (COMPLETE)
- **Phase 3 — Days & week flow** (COMPLETE)
- **Phase 6 — Asset & visual polish** (COMPLETE)

## Current Goal

- Polish remaining UX edge cases; await user QA feedback.

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

- [x] **Phase 6 Asset & visual polish (2026-08-26)**:
  - [x] Create `/assets/skaftin/lunchbox/` and `/assets/skaftin/foods/` structure.
  - [x] Move existing food images and generate SVGs for missing placeholders.
  - [x] Centralised food metadata in `lib/skaftin-data.ts`.
  - [x] Updated `live-skaftin-preview.tsx` to render images with drop-shadows.
  - [x] Added "Air Fryer Ready" and "Chilled & Ready" badges to preview header.
  - [x] Added sparse micro-interaction (bounce & glow) on food entry in `live-skaftin-preview.tsx`.

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
- The homepage still uses some hardcoded hex values in `eskort-homepage.tsx` inline styles — these are in legacy sections and are left as-is per the code standards exception.
