# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- **Phase 2 — Feature Build** (Active)

## Current Goal

- Building all feature stores (cart, auth, notifications, rewards), then wiring UI components.

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
- [x] Updated `components/myskaftin/data.ts` — JUNIOR_MENU_ITEMS with 15 items across 5 categories
- [x] Updated `components/myskaftin/step-menu.tsx` — tabbed UI (Weekly Plans + Build Your Own)
- [x] Updated `components/myskaftin/confirmation.tsx` — awards stars + dispatches notification
- [x] Full `components/site-header.tsx` rewrite — auth state, notifications bell, functional cart
- [x] Updated `app/page.tsx` — reads stars from rewards store
- [x] Updated `app/layout.tsx` — mounts ToastQueue globally

## In Progress

- Nothing currently in progress.

## Next Up

- Run `npm run build` to verify zero TypeScript errors
- Manual verification pass (mobile + desktop)
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
