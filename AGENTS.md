# Dikko & Mahmoud Website Agent Guide

This repository is the future public website for Dikko & Mahmoud. The homepage
presentation is implemented from navigation through footer and is on visual
review hold while the client approves identity and supplies imagery/content.
The Firm (`/the-firm`) is implemented for local visual review, specified in
`docs/routes/the-firm.md`; the paste-ready prompt is
`docs/handoffs/the-firm-next-chat.md` (historical kickoff). Original media, advisory
assignments and missing editorial copy remain approval gates.
Shared site chrome belongs to `app/(site)/`.

## Start here

1. Read `README.md`.
2. Read `docs/README.md`.
3. Read `docs/roadmap.md` and confirm the active milestone.
4. Read `docs/architecture.md` before changing structure or ownership.

   For UI, also read `docs/design-system.md`, `docs/layout-system.md`, and
   the affected route brief. For The Firm, use `docs/routes/the-firm.md`; read the
   homepage brief only where shared pieces are affected.

5. Inspect `git status --short` and the current diff before editing.

## Current boundaries

- Preserve the homepage visual hold. Keep The Firm within its agreed review
  spec. Mechanical shared extractions and real Firm link activation are allowed
  while preserving Home’s appearance. Other secondary pages follow separately.
- Use Tailwind defaults where they fit and shadcn for reusable interactive
  primitives. Add custom tokens only for meaningful brand differences. UI icon
  packages are permitted; preserve supplied brand assets.
- The former holding page has been replaced by the no-index homepage preview;
  do not restore its unrelated visual choices as the design system.
- Do not connect Sanity, Resend, Upstash, analytics, databases, or deployment
  services during this presentation checkpoint.
- Do not invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics, or imagery.
- The supplied Figma frames establish the design reference; resolve missing
  states and content without restarting a separate wireframe phase.
- Preserve unrelated work and keep changes scoped to the active milestone.
- The user approved the editorial practice-area explorer after reviewing
  desktop/mobile options. Use decorative brand covers until approved photographs
  are supplied. The user has approved moving on to selected matters and supplied
  desktop/mobile screenshots. The user approved the sourced matter summaries
  and BPE as the opening selection. The maintainability audit is implemented.
  Hero/header scroll refinements are implemented. The user approved the compact
  People grid, manual client perspectives and featured-plus-three insights;
  these are now implemented for review with explicit missing-content slots.
  The user approved fallback polish across the whole homepage: missing/failed
  media uses intentional typography/covers; unapproved content stays labelled
  for review and never inherits a real client's attribution.
  FAQ, the pale/white enquiry CTA and shared footer are implemented for review
  from the user's screenshots. The user authorized practical FAQ starter copy;
  keep it in the local collection until the later Sanity integration. Social
  profile URLs and secondary destinations remain unconnected. Shared shadcn-style
  Accordion/Avatar primitives and React Icons social brands preserve the current
  design. The user also authorized the bounded Input/Textarea, Label/Field,
  Checkbox/NativeSelect and React Hook Form foundation before secondary pages;
  see `docs/forms.md`. FAQ height motion and button press/focus feedback are
  CSS-only. No UIAble/Animate UI package or theme reset was installed.
  Final homepage/client visual and content approval remain on hold. The Firm’s
  desktop year selector + mobile accordion is confirmed, with visible advisory
  groups, canonical people, shared cards and a conditional video poster. Read its
  spec for source/content gaps, reuse boundaries and verification. The later
  Claude workflow remains separate.

## File ownership

- `app/` owns routes, layouts, metadata, and global styles.
- `components/` owns reusable and route-specific presentation.
- `content/` owns presentation copy and collections.
- `hooks/` owns reusable client hooks (`use-*.ts`, one per file): effects,
  observers, media queries and stateful rules.
- `lib/` owns pure helpers (`format.ts`, `content.ts`, `video.ts`), shared media
  queries and future service boundaries.
- `tests/` owns Vitest unit tests for `lib/` and `content/`; see `docs/testing.md`.
- `types/` owns contracts shared across domains, only when needed.
- `public/` will own approved static assets.
- `sanity/` reserves the future CMS boundary; it is not an active integration.
- `docs/` owns durable project decisions, status, and workflow.

Components are for markup: props in, JSX out, minimal glue. Move effects,
observers, `matchMedia`, listeners, timers and stateful rules into a hook in
`hooks/`, and pure functions into `lib/`. Reuse existing hooks (for example
`useMediaQuery(mediaQueries.desktop)`) instead of re-writing browser logic.
Content modules export ready-to-render lists (`visibleMatters`, `homePeople`);
sections must not filter records themselves. Use `formatIndex`/`formatCount`
for "01"-style numbers and the `ease-editorial` class for the site's easing
curve. When adding a pure helper or content rule, add a test in `tests/`.
See `docs/architecture.md` → "Components, hooks and helpers".

Keep pages and layouts as Server Components unless interactivity requires a
client boundary. Add abstractions only when an approved, repeated need makes
ownership clearer.

For route sections, name full section entry files `*-section.tsx`; supporting
components keep descriptive `.tsx` names. Keep copy and collections in
`content/*.ts`, with shared firm facts owned by the firm domain rather than
duplicated between previews. Put ordinary presentation, responsive states and
simple transitions in component Tailwind classes. `app/globals.css` owns the
theme/global defaults and imports `app/styles/motion.css` and `surfaces.css`
for custom keyframes/progressive fallbacks and complex header materials.
Do not add CSS modules to component folders or a new stylesheet per section.
Shared motion helpers must not own section layout/content. Motion is now approved
only for Firm Journey content swaps; the broader choreography pass remains later.
Keep hover feedback in CSS rather than expanding the runtime to other sections.
Selected matters change only on click/tap or keyboard activation, never hover.

## Verification

For configuration or code changes, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
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
