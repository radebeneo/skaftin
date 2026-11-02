# Eskort MySkaftin — Project Overview

## Overview

MySkaftin is a consumer-facing Next.js web application for Eskort, South Africa's most loved meat brand (est. 1917). It serves two audiences: shoppers browsing and purchasing Eskort products online, and parents building personalised weekly lunchbox ("skaftin") plans for their children using Eskort products. Users earn Skaftin Stars (loyalty rewards) for every completed plan, redeemable against future orders. The app is a marketing and e-commerce hybrid: it drives product discovery, builds brand loyalty through the rewards system, and converts browsers into repeat buyers.

## Goals

1. Enable a parent to browse Eskort products, build a 5-day lunchbox plan in under 3 minutes, and check out — all in one flow.
2. Drive brand loyalty by awarding Skaftin Stars for every completed plan and displaying a tiered rewards status.
3. Expand junior menu variety so children can choose from shaped foods, animal bites, alphabet snacks, and lunchables-style packs.
4. Provide full account management: sign in, sign up, profile settings, saved addresses, and dietary preferences.
5. Surface contextual notifications (order confirmations, star awards, weekly specials) without leaving the page.
6. Be deployment-ready: zero broken builds, fully typed, accessible, and responsive from 320px to 1440px+.

## Core User Flow

### Shopper Flow
1. User arrives at the homepage (`/`).
2. Browses product categories and "Latest Specials" carousel.
3. Taps **+ Add** on a product → item appears in cart, toast fires, notification logged.
4. Opens cart drawer → reviews items, adjusts quantities.
5. Proceeds to checkout → enters delivery details → places order.
6. Confirmation screen shows order summary and stars earned.

### Skaftin Builder Flow
1. User clicks **Skaftin** in the nav → navigated to `/skaftin`.
2. **Step 1 — Taste & Prep** (answers only, no lunchboxes yet): child's name, 3 or 5 days, muncher personality, likes, allergies/dislikes, and prep style (Grab & Go or Air Fryer). The side preview is a **Sneak Peek** of the liked foods only.
3. **Pack My Week** button → moves to Step 2 and automatically generates a full week (one lunchbox per day) from the Step 1 answers.
4. **Step 2 — Build My Week** (where lunchboxes are built): set the daily budget/price tier, Remix single days, Shuffle the whole week, or start from a Curated Week, Themed Drop, or Build Your Own picks. The **Live Skaftin Preview** shows each day's box.
5. **Step 3 — Review & Order**: plan summary, free sticker theme, order total, contact details, delivery address and slot, then **Place Order**.
6. **Confirmation**: animated confetti, stars awarded, notification dispatched.

### Auth Flow
1. Unauthenticated user clicks **Sign In** → `/sign-in`.
2. Completes sign-in or signs up → redirected back to previous page.
3. Signed-in users see their avatar, star count, and notification bell in the header.
4. Profile page at `/profile` exposes account, plan history, preferences, and addresses.

## Features

### Authentication
- Sign in / sign up pages with Eskort brand layout (mock auth using localStorage; Clerk-ready)
- Persistent session via localStorage token
- Protected profile page (redirects to sign-in if unauthenticated)
- Sign out clears session

### Shopping
- Homepage hero with promotional carousel
- Category filter bar (Bacon, Biltong, Cold Meats, Ready Made Meals, Fresh & Smoked, Value Packs, Polony & Spreads, Viennas & Sausages, Kids)
- Latest Specials card carousel with real prices
- Occasions quiz (product recommendation helper)
- Values & recipes feature cards

### Cart
- Slide-in cart drawer (right side)
- Add/remove items, quantity stepper (+/−)
- Subtotal + delivery estimate
- localStorage persistence (survives page refresh)
- Item count badge on header cart button

### Skaftin Builder
- 3-step wizard (Taste & Prep → Build My Week → Review & Order) with progress indicator
- Step 1: Taste & Prep — name, days, muncher personality, likes (including fruit, crackers, Wiggles, yoghurt), allergies/dislikes, prep style. Collects answers only; no plan exists yet.
- Step 2: Build My Week — week auto-generated on entry; budget tiles (sets price tier), per-day Remix, Shuffle my week, and Curated Weeks / Themed Drops / Build Your Own tabs. Build Your Own picks replace the generated week (same box every day) until a style is chosen again; a notice warns about this.
- Lunchbox preview beside Steps 1–2: "Sneak Peek" on Step 1 (liked foods, no day selector); "Live Skaftin Preview" on Step 2 (real per-day boxes with a day selector, or the handpicked box)
- Step 3: Review & Order — plan summary, sticker theme, total, contact + delivery details, delivery slot, Place Order
- Confirmation with stars award animation

### Junior Menu Items (Build Your Own)
- **Shaped Foods**: star-shaped sarmies, dinosaur nuggets, heart ham bites, rocket crackers
- **Alphabets**: alphabet vienna spaghetti, letter cookies
- **Animal-Shaped**: animal biscuits, bunny ham rolls, bear-face sarmies
- **Lunchables-Style**: mini vienna + cracker combo, ham + cheese + cracker, salami + cream cheese
- **Classic Junior**: cocktail viennas, polony roll-ups, cheese twists
- All use styled placeholder images (no generated assets)

### Notifications
- In-app bell icon with unread count badge in header
- Dropdown panel with recent notifications (read/unread state, timestamps)
- "Mark all read" action
- Global toast queue (slide-in from bottom-right)
- Triggered by: cart adds, star awards, order confirmations

### Profile Settings
- `/profile` with 4 tabs: My Account, My Skaftin Plans, Preferences, Addresses
- Account: display name, email (from mock auth), avatar placeholder
- Plans: history of past skaftin plans from localStorage
- Preferences: dietary restrictions, favourite Eskort products
- Addresses: saved delivery addresses with add/edit/delete

### Rewards (Skaftin Stars)
- Star balance displayed in header (signed-in only)
- 3 tiers: Bronze (0–199 ⭐), Silver (200–499 🌟), Gold (500+ 🏆)
- Animated progress bar to next tier
- Earn history (last 5 events)
- Stars awarded on: plan completion (varies by tier), first sign-up (50 bonus)
- Rewards panel component on homepage

## Scope

### In Scope
- Next.js app at `/`, `/skaftin`, `/sign-in`, `/sign-up`, `/profile`
- localStorage mock auth (Clerk-compatible interface)
- localStorage cart, notifications, rewards, profile persistence
- Fully responsive (mobile-first, 320px → 1440px+)
- TypeScript strict mode throughout
- Eskort brand design system (tokens from globals.css)
- Accessible: semantic HTML, keyboard navigation, ARIA labels

### Out of Scope
- Real payment processing (Stripe, PayFast, etc.)
- Server-side database (no Prisma, no Supabase in this phase)
- Real Clerk API integration (interface ready, keys not required)
- Push notifications / email notifications
- Admin dashboard
- Real delivery tracking
- Multi-language support (English/Zulu/Afrikaans)
- PWA / offline mode

## Success Criteria

1. A signed-in user can add an Eskort product to the cart, open the cart drawer, adjust quantity, and see the correct total — all persisting after page refresh.
2. A parent can complete the full 3-step Skaftin wizard, see the junior menu "Build Your Own" tab with all categories, and receive stars on confirmation.
3. The notification bell shows new notifications when cart items are added or stars are awarded, and unread count clears on "Mark all read."
4. The profile page at `/profile` saves and restores display name, preferences, and a saved address across page refreshes.
5. `npm run build` passes with zero TypeScript errors and zero broken imports.
6. All pages are fully responsive and visually correct at 375px (mobile) and 1280px (desktop).
