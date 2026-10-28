# Dikko & Mahmoud Website Agent Guide

This repository is the future public website for Dikko & Mahmoud. The current
milestone is design-system foundations and homepage development from the
supplied desktop/mobile Figma references. The first runtime checkpoint covers
fonts, theme, Button, sticky navigation, hero, firm facts/story, selected
clients, practice areas and selected matters; consult the roadmap for review status
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
- The former holding page has been replaced by the no-index homepage preview;
  do not restore its unrelated visual choices as the design system.
- Do not connect Sanity, Resend, Upstash, analytics, databases, or deployment
  services during the homepage presentation milestone.
- Do not invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics, or imagery.
- The supplied Figma frames establish the design reference; resolve missing
  states and content without restarting a separate wireframe phase.
- Preserve unrelated work and keep changes scoped to the active milestone.
- The user approved the editorial practice-area explorer after reviewing
  desktop/mobile options. Keep its photographs as explicit placeholders until
  supplied. The user has approved moving on to selected matters and supplied
  desktop/mobile screenshots. The user approved the sourced matter summaries
  and BPE as the opening selection. The maintainability audit is implemented.
  The current follow-up moves the hero split to `lg` while full navigation stays
  at `xl`; verify the compact overlay header between them. Review this change
  before analysing People or establishing the later Claude workflow.

## File ownership

- `app/` owns routes, layouts, metadata, and global styles.
- `components/` owns reusable and route-specific presentation.
- `content/` owns presentation copy and collections.
- `lib/` owns shared helpers and future service boundaries.
- `types/` owns contracts shared across domains, only when needed.
- `public/` will own approved static assets.
- `sanity/` reserves the future CMS boundary; it is not an active integration.
- `docs/` owns durable project decisions, status, and workflow.

Keep pages and layouts as Server Components unless interactivity requires a
client boundary. Add abstractions only when an approved, repeated need makes
ownership clearer.

For homepage work, name full section entry files `*-section.tsx`; supporting
components keep descriptive `.tsx` names. Keep copy and collections in
`content/*.ts`, with shared firm facts owned by the firm domain rather than
duplicated between previews. Put ordinary presentation, responsive states and
simple transitions in component Tailwind classes. `app/globals.css` owns the
theme/global defaults and imports `app/styles/motion.css` and `surfaces.css`
for custom keyframes/progressive fallbacks and complex header materials.
Do not add CSS modules to component folders or a new stylesheet per section.
Shared motion helpers must not own section layout/content. Motion remains a
later, explicitly scoped pass; do not install a library to replace simple CSS.
Selected matters change only on click/tap or keyboard activation, never hover.

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
