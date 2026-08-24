# Code Standards

## General

- Keep modules small and single-purpose. A component that does more than one thing should be split.
- Fix root causes — do not add workarounds or conditional hacks around broken logic.
- Do not mix UI rendering with data persistence in the same component. Reads and writes go through lib hooks.
- Prefer explicit over implicit. Name things clearly; avoid abbreviations except for universally understood ones (e.g., `id`, `url`, `px`).
- Every interactive element must have a unique `id` attribute and an `aria-label` or visible text label.

## TypeScript

- Strict mode is enabled (`tsconfig.json`). All code must pass with zero TypeScript errors.
- Avoid `any`. Use explicit interfaces, `unknown` with type narrowing, or generics.
- Define types for all props, function signatures, store states, and localStorage schemas.
- Export types from the file that owns the data (e.g., `CartItem` is exported from `lib/cart-store.ts`).
- Validate and narrow unknown data read from localStorage before using it (use try/catch + type guard).

## Next.js (App Router)

- Default to **server components**. Add `'use client'` only when browser interactivity, React state, or effects are required.
- Page files (`page.tsx`) should be thin shells — no inline business logic. Compose from components.
- Route groups (`(auth)`) are used for auth pages to isolate them from the main layout.
- Never import server-only code into client components. Keep the boundary clear.
- Use `next/link` for all internal navigation. Do not use `<a href>` for internal links.
- Images from the Eskort CDN use `<img>` with `// eslint-disable-next-line @next/next/no-img-element` comment (external CDN, not Next.js Image-optimised).
- Local images in `/public` use `next/image` with explicit `width` and `height`.

## Styling

- Use Tailwind token classes only — never hardcode hex values in JSX (e.g., use `text-eskort-red`, not `text-[#e63329]`).
- Exception: legacy sections of `eskort-homepage.tsx` that pre-date this rule may retain inline hex values — do not touch those sections unless explicitly asked.
- Follow the border radius scale from `ui-context.md`. Do not invent new radius values.
- Responsive classes follow mobile-first: base (mobile) → `sm:` (640px) → `md:` (768px) → `lg:` (1024px) → `xl:` (1280px).
- Animations use `tw-animate-css` utilities or Tailwind `transition` + `duration-*` classes. Do not write custom CSS animations unless adding to `globals.css`.

## Custom Hooks (lib/ stores)

- Each store hook follows this pattern:
  ```ts
  // Read from localStorage on init, write on every change
  export function useCartStore() {
    const [state, setState] = useState<CartState>(loadFromStorage)
    // ...mutations that call setState + saveToStorage
    return { ...state, addItem, removeItem, updateQuantity, clearCart }
  }
  ```
- localStorage keys are namespaced: `eskort-cart`, `eskort-auth`, `eskort-notifications`, `eskort-rewards`, `eskort-profile`, `eskort-plans`.
- Always wrap localStorage access in try/catch — SSR and private browsing can throw.
- Load function signature: `function loadFromStorage(): T` — returns a safe default if nothing is stored.

## API Routes

- No API routes in this phase (localStorage only). If an API route is needed in future, it must:
  - Validate and parse request input before any logic runs.
  - Return consistent shapes: `{ data: T }` on success, `{ error: string }` on failure.
  - Use HTTP status codes correctly (200, 201, 400, 401, 404, 500).

## File Organization

- `app/` — Route pages and layouts only. No standalone component files here.
- `components/` — All React components. Feature subdirectories: `myskaftin/`, `profile/`, `ui/`.
- `lib/` — Pure TypeScript stores, utilities, and type exports. No JSX.
- `public/` — Static assets. Subdirectory `public/images/` for local images.
- `context/` — Six-File Context System docs. Not imported by any code.
- Component filenames: kebab-case (e.g., `cart-drawer.tsx`, `notifications-bell.tsx`).
- Hook filenames: kebab-case with `-store` suffix (e.g., `cart-store.ts`).
- Types exported from the store/lib file that owns the data.
