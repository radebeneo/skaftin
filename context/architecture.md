# Architecture Context

## Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript 5.7 | Full-stack React framework, routing, SSR/SSG |
| UI | Tailwind CSS v4 + shadcn/ui | Utility styling + accessible component primitives |
| Icons | lucide-react v1.16 | Stroke-based icon set |
| Fonts | Gilroy (CDN), Anton, Poppins (Google Fonts), local Gobold and Montserrat | Brand typography |
| Auth | localStorage mock (Clerk-interface-compatible) | User sessions, sign-in/sign-up flow |
| State | React useState + custom hooks + localStorage | Cart, notifications, rewards, profile persistence |
| Analytics | @vercel/analytics | Page view tracking (production only) |
| Hosting | Vercel (target) | Edge deployment, automatic builds from Git |

## System Boundaries

- `app/` — Next.js App Router pages and layouts. Each route owns its page-level layout and data loading. No business logic here — delegates to components and lib hooks.
- `app/(auth)/` — Sign-in and sign-up pages. Isolated from the main layout shell (no header/footer on auth pages).
- `app/profile/` — Protected profile page. Reads from localStorage stores via hooks. Redirects to `/sign-in` if no session.
- `app/skaftin/` — The multi-step Skaftin wizard page. Thin page shell; all wizard logic lives in `components/myskaftin/`.
- `components/` — All UI components. Subdivided by feature:
  - `components/myskaftin/` — Skaftin wizard steps, data, and confirmation
  - `components/profile/` — Profile page tabs
  - `components/ui/` — shadcn/ui primitives (do not modify)
- `lib/` — State stores (cart, notifications, rewards, auth). Pure TypeScript hooks with no JSX. This is the only layer allowed to read/write localStorage.
- `public/` — Static assets (logo, images). No logic here.
- `context/` — Six-File Context System documentation. Not imported by any code — read by AI agents at session start.

## Storage Model

- **localStorage `eskort-cart`**: Cart items array `{ id, name, price, quantity, image? }[]`. Owned by `lib/cart-store.ts`.
- **localStorage `eskort-auth`**: Auth session `{ userId, displayName, email, avatarUrl, signedInAt }`. Owned by `lib/auth.ts`.
- **localStorage `eskort-notifications`**: Notifications array `{ id, type, title, body, read, timestamp }[]`. Owned by `lib/notifications-store.ts`.
- **localStorage `eskort-rewards`**: Rewards state `{ stars, tier, history[] }`. Owned by `lib/rewards-store.ts`.
- **localStorage `eskort-profile`**: Profile data `{ displayName, email, preferences, addresses[] }`. Owned by `lib/auth.ts` / profile components.
- **localStorage `eskort-plans`**: Past skaftin plan history `Plan[]`. Written by `components/myskaftin/confirmation.tsx`.
- **No server-side database in this phase.**

## Auth and Access Model

- Every user signs in via the mock auth system (`lib/auth.ts`), which stores a session in localStorage under `eskort-auth`.
- Auth state is read client-side only (`'use client'`). No server-side auth middleware in this phase.
- The profile page (`/profile`) checks for a session on mount and redirects to `/sign-in` if absent.
- Skaftin Stars are tied to the localStorage session; stars persist per device.
- The mock auth interface matches the Clerk `useUser()` shape: `{ isSignedIn, user: { id, fullName, emailAddresses, imageUrl } }` — making real Clerk integration a drop-in replacement.

## Invariants

1. **`components/ui/` must never be modified.** These are generated shadcn/ui primitives. To add a new primitive, run the shadcn CLI.
2. **All localStorage reads and writes must live in `lib/`.** No component may access `window.localStorage` directly — it must go through a store hook.
3. **Auth checks on protected pages happen client-side via `useAuthStore()`, not middleware.** Do not add `middleware.ts` until real Clerk keys are available.
4. **No hardcoded hex colors in components.** All colors must reference CSS custom property tokens defined in `globals.css` or use the Tailwind token classes (e.g., `text-eskort-red`, `bg-brand-yellow`).
5. **`'use client'` is required for any component that uses React state, effects, or browser APIs.** Default to server components for pure display components; only add the directive when interactivity requires it.
6. **The Skaftin wizard state is local to the wizard component.** It is not shared via a global store — it resets on navigation away. Only the completed plan summary is persisted (to `eskort-plans` in localStorage on confirmation).
