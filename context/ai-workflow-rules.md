# AI Workflow Rules

## Approach

Build this project incrementally using a spec-driven workflow. The six context files define what to build, how to build it, and the current state of progress. Always implement against these specs — do not infer or invent behaviour that is not defined here. When something is undefined, add it as an open question in `context/progress-tracker.md` before continuing.

## Scoping Rules

- Work on one feature unit at a time. Do not combine cart + auth + profile in a single implementation step.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine changes across different system boundaries (UI, stores, pages) unless they are tightly coupled by nature (e.g., wiring a store hook into a component it directly owns).
- Do not install new packages without checking `package.json` first. The current stack (Next.js, Tailwind, shadcn, lucide-react) covers all requirements for this phase.

## When to Split Work

Split an implementation step if it combines:
- UI changes and store/lib changes (separate into "build the store" then "wire the UI")
- Multiple unrelated features (cart and auth are separate units)
- Any behaviour not clearly defined in the context files

If a change cannot be verified end-to-end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behaviour not defined in the context files.
- If a requirement is ambiguous, resolve it in the relevant context file before implementing.
- If a requirement is missing, add it as an open question in `context/progress-tracker.md` before continuing.
- For junior menu items: use placeholder divs (styled, emoji + name). Do not generate or fetch images.

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui primitives. Add new ones via the shadcn CLI only.
- `app/globals.css` — only modify to add new CSS custom property tokens. Do not remove existing tokens.
- `tsconfig.json` — do not change compiler options.
- `next.config.mjs` — do not add new config without explicit instruction.
- `context/*.md` — update these when implementation changes architecture, scope, or standards.

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:
- System architecture or boundaries → `architecture.md`
- Storage model decisions → `architecture.md`
- New color tokens or layout patterns → `ui-context.md`
- Code conventions or file organization → `code-standards.md`
- Feature scope additions or removals → `project-overview.md`
- Any change → update `progress-tracker.md`

## Before Moving to the Next Unit

1. The current unit works end-to-end within its defined scope (add to cart → see in drawer → persists on refresh).
2. No invariant defined in `architecture.md` was violated (no hardcoded hex, no direct localStorage in components, etc.).
3. `context/progress-tracker.md` reflects the completed work and any new open questions.
4. `npm run build` passes with zero TypeScript errors (run after every major unit).
5. The feature is responsive and visually correct at both 375px (mobile) and 1280px (desktop).
