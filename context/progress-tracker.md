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

- [x] **Skaftin hero heading (2026-11-09)**:
  - [x] `components/myskaftin/hero.tsx`: "Bye-bye boring lunchboxes" replaced with "CAV iSKHAFTIN!". "CAV" uses Montserrat (`font-montserrat font-black`) in black (`text-eskort-ink`); "iSKHAFTIN!" sits on the next line in EskortSpazaClean (`font-eskort-spaza`) in Eskort red at `1.35em`, with `normal-case` so the lowercase "i" survives the heading's `uppercase`.
  - [x] Updated `context/ui-context.md` typography table.
  - [x] Removed the hero's three badge pills ("3 quick steps", "Free first-order gift", "Earn Yummy Points") and the now-unused `Clock` / `Gift` / `Star` lucide imports. The BUILD MY KIT CTA now sits directly under the intro paragraph.
- [x] **Homepage button typography (2026-11-05)**:
  - [x] All homepage buttons and link CTAs now explicitly use the existing static `Montserrat CTA Bold` face at weight 700, including Products, Specials, section CTAs, store actions, Search, Subscribe, and product Add/quantity controls.
  - [x] Scoped the typography to `.eskort-homepage` and excluded `#hero-myskaftin-cta`; its CAV/ISKHAFTIN split-font label, sizing, and spacing remain unchanged. Other pages and generated UI primitives are untouched.
  - [x] Updated `context/ui-context.md` to document the homepage button rule.
  - [x] Verification: `npx tsc --noEmit --incremental false`, `npm run build`, and `git diff --check` pass. Browser visual verification was unavailable because the screenshot result was missing.
- [x] **Homepage hero CTA label sizing (2026-11-05)**:
  - [x] "CAV" now uses a dedicated `Montserrat CTA Bold` `@font-face` pointing at `eskort-homepage-new/fonts/Montserrat-Bold.ttf`, so it can't be overridden by the competing variable `Montserrat` face in `app/globals.css`.
  - [x] "ISKHAFTIN" (`.cta-label-spaza`) enlarged to `1.45em` of the button font size (about 23px on desktop, 13px at ≤640px). The label uses `line-height: 1` so the button height is unchanged.
- [x] **Homepage hero CTA font swap (2026-11-05)**:
  - [x] "ISKHAFTIN" in the `#hero-myskaftin-cta` button now uses the existing `Spaza` (EskortSpazaClean) face instead of `Barber` (EskortBarber5). The class was renamed `.cta-label-barber` → `.cta-label-spaza` in `eskort-homepage-new/index.tsx` and `styles.css`. Fallbacks: Caveat → Permanent Marker → cursive.
- [x] **Homepage hero CTA rename (2026-11-05)**:
  - [x] `eskort-homepage-new/index.tsx`: the `#hero-myskaftin-cta` button (still linking to `/skaftin`) now reads "CAV ISKHAFTIN" instead of "mySkaftin".
  - [x] `eskort-homepage-new/styles.css`: new `.cta-split-label`, `.cta-label-montserrat` (Montserrat Bold for "CAV") and `.cta-label-barber` (the existing `Barber` / EskortBarber5 face for "ISKHAFTIN"). Both words sit in one inline-flex span, so the arrow keeps its existing spacing.
  - [x] At ≤640px the button gets `flex-grow: 1.3` in the shared hero button row so the longer label fits.
  - [x] Verification: `npx tsc --noEmit` passes.
- [x] **Skaftin wizard banner and stepper (2026-11-05)**:
  - [x] `experience.tsx`: the rewards banner above the stepper now reads "Oinker Points" instead of "Skaftin Stars".
  - [x] Renamed the loyalty currency from "Skaftin Stars" / "Stars" to "Oinker Points" in all user-facing copy: `app/layout.tsx` metadata, sign-in, sign-up, profile, site header (badge aria-label and mobile menu), rewards panel, loyalty panel, skaftin hero, step-menu, confirmation (toast and balance), plus the `data.ts` doc comment and the context docs. Internal identifiers (`stars` state, `'stars'` notification type, `header-stars-badge` id, `Star` icon) are unchanged so stored data keeps working. "Star"-shaped food names and the Super Shapes theme copy refer to shapes and were left as is.
  - [x] `experience.tsx`: the step progress indicator is centred from `sm` up. Steps size to their content (`sm:flex-initial`) and the connectors have a fixed width (`w-6` / `md:w-16` / `lg:w-24`) instead of stretching, and the row uses `sm:justify-center`. The mobile 3-column grid is unchanged.
- [x] **Vercel build repair after PR #4 merge (2026-11-03)**:
  - [x] Cause: merging `main` into `live-skaftin-preview` (`8ec41ac`) re-applied the earlier PR #2 revert (`fdc3881`) on top of the newer lunchbox work. That left `live-skaftin-preview.tsx` half-merged (unclosed JSX, undefined `Image`/`LUNCHBOX_IMAGE`/`MainCompartment`/`isMobileExpanded`), deleted `public/assets/skaftin/lunchbox/eskort-lunchbox-design-preview.png`, and removed the Wiggles/Yoghurt options and food-metadata updates.
  - [x] Fix: restored `live-skaftin-preview.tsx`, `data.ts`, `experience.tsx`, `step-build.tsx`, `step-taste.tsx`, `lib/skaftin-data.ts`, this tracker and the lunchbox PNG from `8a6e17b`. Patch IDs confirmed the merge's changes to these files were identical to the old revert, so no `main` work was lost.
  - [x] Verification: `npx tsc --noEmit` and `npx next build` pass; all referenced `/assets/skaftin/*` files exist.
  - [x] Local note: pnpm 12 refuses `pnpm run` because `package.json` still uses the `pnpm.overrides` field (Vercel uses pnpm 10, which is unaffected). See Open Questions.
- [x] **Skaftin wizard UI polish (2026-11-02)**:
  - [x] `step-review.tsx`: new `onBack` prop; a "← Back" button sits beside Place Order and returns to Build My Week (wired in `experience.tsx`).
  - [x] Smaller CTAs: Pack My Week / Review & Order (`experience.tsx`) and Place Order (`step-review.tsx`) now use `py-3`, `text-sm sm:text-base`, `shadow-md`. On desktop the wizard CTA no longer stretches full width.
  - [x] `step-taste.tsx`: 3-day / 5-day buttons are smaller (`px-3 py-2`, `text-lg` heading).
  - [x] Removed the "Half-week helper" / "Full school week" subtitles from the 3-day / 5-day buttons; each button now shows only its `{d}-DAY` heading, and its `aria-label` is simply "`{d}` days".
  - [x] Centered the `{d}-DAY` heading inside the 3-day / 5-day buttons (`text-left` → `text-center` in `step-taste.tsx`).
  - [x] Stopped the lunchbox artwork being cropped at its left and right edges. `SkaftinLunchbox` in `live-skaftin-preview.tsx` used a `1290/952` frame with an oversized (`119%` × `107.5%`), offset artwork layer and `overflow-hidden`, which cut about 35px of the blue lid off each side. The frame now matches the full artwork (`aspect-[3/2]`, artwork `inset-0`, no overflow clipping). Compartment positions are unchanged because they are percentages of the full artwork. Applies to both the Step 1 Sneak Peek and the Step 2 Live preview.
  - [x] Enlarged the lunchbox about 9% without cropping it. The PNG's visible lunchbox spans x 74–1457, y 57–983, so `SkaftinLunchbox` now frames x 64–1472, y 48–992 (`aspect-[1408/944]`, `overflow-hidden`). The full-artwork layer is offset and scaled (`left-[-4.545%] top-[-5.085%] h-[108.475%] w-[109.091%]`), so only transparent margin is trimmed and compartment percentages are unchanged.
  - [x] New `components/myskaftin/multi-select-dropdown.tsx` (no new library; click-outside pattern from `site-header.tsx`). "Yes please" likes and "No thanks / allergies" now use it instead of pill grids. Options keep the `like-{id}` / `dislike-{id}` ids, so the fly-into-box animation and allergy cascade still work. Likes that conflict with an active restriction are hidden from the list.
  - [x] Muncher personality cards replaced with the same dropdown in a new `single` mode. Picking closes the list, and picking the selected item again clears it. Options show the emoji, name and tagline, and the trigger shows the chosen emoji. The description box below still appears once a personality is chosen. Options keep the `personality-{id}` ids. The old `MuncherPersonalityCard` component was removed.
  - [x] Step 1 desktop layout: the "Tell us about the muncher" form and the Sneak Peek now share the width equally (`lg:grid-cols-2` in `experience.tsx`). Step 2 keeps its wider build column (`1.15fr / 0.85fr`).
  - [x] Verification: `npx tsc --noEmit` passes.
- [x] **Skaftin flow clarity (2026-11-02)** — makes it clear lunchboxes are built in Build My Week, not Taste & Prep:
  - [x] `live-skaftin-preview.tsx`: takes a `step` prop. On Step 1 it is titled "Sneak Peek", shows only the liked foods (Day 1 of `buildWeekFromSelection`), says "we'll pack the full week next", and hides the day selector. On Step 2 it keeps "Live Skaftin Preview" with copy explaining the week or the handpicked box.
  - [x] `experience.tsx`: Step 1 CTA renamed "Build My Week" → "Pack My Week"; passes `step` to the preview.
  - [x] `step-build.tsx`: when Build Your Own picks are active, a notice explains they're packed every day and that Shuffle / Curated / Themed will replace them; the generated week is dimmed and labelled "Not in use". BYO intro copy also warns that picking a style clears the picks.
  - [x] `context/project-overview.md`: flow, features, and success criteria updated from the old 4-step wizard to the current 3-step flow.
  - [x] Verification: `npx tsc --noEmit` passes.
- [x] **Skaftin build and order flow streamlining (2026-11-02, `live-skaftin-preview` branch)**:
  - [x] Removed the static 3-step indicator from `app/skaftin/page.tsx`, which always showed step 1 as active. The wizard's live step indicator is now the only one.
  - [x] Entering Build My Week now generates a week from the Taste answers automatically, so Build never opens empty. The week is only rebuilt when the Taste answers change, so remixes survive back-navigation. "Build it for me" is now "Shuffle my week".
  - [x] Curated Weeks and Themed Drops now produce a real week (curated picks apply their prep style; themes feed `themeId` into `generateWeek`). Previously they were dead-end selections that left Review empty.
  - [x] Build Your Own picks now carry through to Review and Confirmation through the new shared `components/myskaftin/plan-summary.tsx` (`PlanSummary`, `hasPlan`, `isCustomPlan`, `planLines`). Sharing text covers custom plans too.
  - [x] Review: removed the duplicate rewards strip (the wizard's top rewards bar already shows it) and the duplicate order-total strip. The total now appears on the "Place Order" button. The parent's name is no longer pre-filled with the child's name.
  - [x] Continue (step 2) and Place Order are disabled until a plan exists.
  - [x] Verification: `npx tsc --noEmit` passes. `npm run lint` cannot run because ESLint is not installed and there is no `eslint.config.*` (see Open Questions).
- [x] **Skaftin live lunchbox preview (2026-10-06)**:
  - [x] Replaced the preview surface with the provided open-box artwork and positioned the selected foods inside its compartments.
  - [x] Kept the lunchbox at a fixed square size as items are added; compartment contents stay bounded and scroll internally when needed.
  - [x] Removed the scroll-triggered mobile collapse/expand control so the preview remains visible.
  - [x] Routed sandwich fillings, proteins, crackers/Wiggles, fruit, yoghurt and custom junior-menu picks into appropriate compartments.
  - [x] Added Wiggles and yoghurt to taste choices, with yoghurt removed when dairy-free is selected.
  - [x] Replaced the tall junior-menu category pills with a compact expandable food browser and category dropdown.
  - [x] Removed the inactive "Build Your Own" preview control, corrected selected-day copy, and fitted day controls to narrow screens.
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
- [x] `lib/rewards-store.ts` — localStorage Oinker Points (formerly Skaftin Stars) with tiers and history
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
- [x] **Skaftin responsive layout (2026-09-21)**:
  - [x] Expanded the hero and interactive builder to the shared `max-w-7xl` desktop canvas with fluid page gutters.
  - [x] Kept review and confirmation content at readable widths while giving the active builder and live preview more room on large screens.
  - [x] Reworked compact progress, tabs, preview controls, card grids, rewards, and navigation to avoid compression and overlap from 320px through 1440px+.

- [x] **Live preview photo lunchbox (2026-10-06)**:
  - [x] Overlay the lunchbox artwork at a fixed aspect ratio in `live-skaftin-preview.tsx`; added foods are constrained to their designated compartments.
  - [x] Food photos (`public/assets/skaftin/foods/*.png`) and emoji fallbacks continue to render inside the fixed compartment areas.

## In Progress

- Nothing currently in progress.

## Next Up

- User QA pass for remaining pages and flows
- Swap mock auth for real Clerk when API keys are available

## Open Questions

- **Clerk API keys**: When will these be available? The mock auth interface is Clerk-compatible. To upgrade: install `@clerk/nextjs`, wrap `<ClerkProvider>` in layout, replace `useAuthStore()` with `useUser()` from Clerk.
- **Database**: When the product goes live, `eskort-cart`, `eskort-plans`, and `eskort-profile` should move from localStorage to a real backend (Supabase or Prisma). No changes to component interfaces required — just replace the store implementations.
- **Junior menu images**: Placeholder divs are in place. Real product photography can replace placeholders by updating the `image` field in `JUNIOR_MENU_ITEMS` in `data.ts` and rendering `<img>` instead of the placeholder div in `step-menu.tsx`.
- **Linting**: `package.json` defines `"lint": "eslint ."`, but ESLint is not a dependency and there is no `eslint.config.*`, so `npm run lint` fails. Add `eslint` and `eslint-config-next` with a flat config to enable it. Pre-existing unused imports and locals remain in `step-build.tsx` and `step-review.tsx`.
- **Sneak Peek vs generated week**: The Step 1 Sneak Peek uses `buildWeekFromSelection` (`lib/skaftin-data.ts`) while Step 2 uses `generateWeek` (`lib/recommendation-engine.ts`), so the box contents change between steps. The copy now sets that expectation; unifying the two engines is a possible follow-up.
- **pnpm overrides location**: `package.json` defines `pnpm.overrides` (the `hono` override). pnpm 11+ no longer reads that field and blocks `pnpm run` locally until it moves to `pnpm-workspace.yaml`. Vercel currently builds with pnpm 10, so deploys are unaffected, but moving it (and regenerating the lockfile) will be needed before upgrading pnpm.
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

- Live preview: lunchbox image now cropped/zoomed (~19%) in a 3:2-based frame; compartment overlays realigned to the image's actual compartments (components/myskaftin/live-skaftin-preview.tsx).
