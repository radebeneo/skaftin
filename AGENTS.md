## Application Building Context

Read the following files in order before implementing
or making any architectural decision:

1. `context/project-overview.md` — product definition,
   goals, features, and scope (Eskort MySkaftin specific)
2. `context/architecture.md` — system structure,
   boundaries, storage model, and invariants
3. `context/ui-context.md` — Eskort brand tokens, colors,
   typography, radius scale, and component conventions
4. `context/code-standards.md` — TypeScript rules,
   Next.js patterns, and file organization
5. `context/ai-workflow-rules.md` — development workflow,
   scoping rules, protected files, and delivery checklist
6. `context/progress-tracker.md` — current phase,
   completed work, open questions, and next steps

Update `context/progress-tracker.md` after each
meaningful implementation change.

If implementation changes the architecture, scope, or
standards documented in the context files, update the
relevant file before continuing.

## Key Invariants (Quick Reference)

- `components/ui/*` — NEVER modify (shadcn generated)
- No hardcoded hex values in components (use CSS tokens)
- All localStorage access through `lib/` hooks only
- `'use client'` required for state/effects/browser APIs
- Mock auth in `lib/auth.ts` is Clerk-interface-compatible
