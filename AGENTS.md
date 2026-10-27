# Dikko & Mahmoud Website Agent Guide

This repository is the future public website for Dikko & Mahmoud. The current
milestone is design-system foundations and homepage development from the
supplied desktop/mobile Figma references. The first runtime checkpoint covers
fonts, theme, Button, navigation, hero, firm facts and story; consult the roadmap
for review status
and remaining content gates. Shared site chrome now belongs to `app/(site)/`.

## Start here

1. Read `README.md`.
2. Read `docs/README.md`.
3. Read `docs/roadmap.md` and confirm the active milestone.
4. Read `docs/architecture.md` before changing structure or ownership.

   For UI, also read `docs/design-system.md`, `docs/layout-system.md`, and
   `docs/routes/home.md`.

5. Inspect `git status --short` and the current diff before editing.

## Current boundaries

- Prioritize the design foundations and homepage from navigation to footer.
  Secondary pages follow this milestone.
- Use Tailwind defaults where they fit and shadcn for reusable interactive
  primitives. Add custom tokens only for meaningful brand differences. UI icon
  packages are permitted; preserve supplied brand assets.
- Preserve the temporary root holding page as a replaceable interim surface;
  do not treat its visual choices as the approved design system.
- Do not connect Sanity, Resend, Upstash, analytics, databases, or deployment
  services during the homepage presentation milestone.
- Do not invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics, or imagery.
- The supplied Figma frames establish the design reference; resolve missing
  states and content without restarting a separate wireframe phase.
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

For homepage work, name full section entry files `*-section.tsx`; supporting
components keep descriptive `.tsx` names. Keep copy and collections in
`content/*.ts`, with shared firm facts owned by the firm domain rather than
duplicated between previews. Keep custom CSS and keyframes in clearly scoped
blocks in `app/globals.css`; do not add CSS modules to `components/home/`.
The hero now uses `hero-section.tsx` and scoped global animation rules.

## Verification

For configuration or code changes, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build # (not always)
```

Record only checks that actually ran. A successful local build does not prove
deployment or external-provider readiness.

Use the development server and targeted formatting during visual iteration.
Batch lint/typecheck at a completed section slice. Run production builds at
the meaningful handoff or route/layout/config/dependency checkpoint, rather
than after every spacing, copy or styling adjustment.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
