# Dikko & Mahmoud Website Agent Guide

This repository is the future public website for Dikko & Mahmoud. The current
milestone is the verified foundation plus a temporary holding page.

## Start here

1. Read `README.md`.
2. Read `docs/README.md`.
3. Read `docs/roadmap.md` and confirm the active milestone.
4. Read `docs/architecture.md` before changing structure or ownership.
5. Inspect `git status --short` and the current diff before editing.

## Current boundaries

- Do not implement website design, production pages, components, copy, CMS
  schemas, or business logic until that work is explicitly approved.
- Preserve the temporary root holding page as a replaceable interim surface;
  do not treat its visual choices as the approved design system.
- Do not connect Sanity, Resend, Upstash, analytics, databases, or deployment
  services during the setup milestone.
- Do not invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics, or imagery.
- For substantial interface work, agree the wireframe and content ownership
  before implementation.
- Preserve unrelated work and keep changes scoped to the active milestone.

## File ownership

- `app/` owns routes, layouts, metadata, and global styles.
- `components/` will own reusable and route-specific presentation.
- `lib/` will own shared helpers and future service boundaries.
- `types/` will own shared TypeScript contracts.
- `public/` will own approved static assets.
- `sanity/` reserves the future CMS boundary; it is not an active integration.
- `docs/` owns durable project decisions, status, and workflow.

Keep pages and layouts as Server Components unless interactivity requires a
client boundary. Add abstractions only when an approved, repeated need makes
ownership clearer.

## Verification

For configuration or code changes, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Record only checks that actually ran. A successful local build does not prove
deployment or external-provider readiness.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
