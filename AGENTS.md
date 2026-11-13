# Dikko & Mahmoud Website Agent Guide

The future public website for Dikko & Mahmoud: a no-index local presentation
preview. Home, The Firm, Practice areas, People, Selected matters, SME, Privacy
and Terms are implemented for review. The client still has to approve the
identity, imagery and content, so most content is gated.

## Start here

1. `README.md`, including the "Where things live" map.
2. `docs/roadmap.md` for the active milestone and `docs/client-alignment.md`
   for the current client-approved corrections. Check the relevant items in
   `docs/handover-checklist.md`; `docs/workflow.md` → "Delivery checklist" says
   how to update them.
3. The rule file for the area you are changing:

   | File                          | Covers                                        |
   | ----------------------------- | --------------------------------------------- |
   | `.claude/rules/structure.md`  | Folder ownership, import direction, domains   |
   | `.claude/rules/components.md` | Components, routes, links, styling and motion |
   | `.claude/rules/content.md`    | Content, publication status, never inventing  |
   | `.claude/rules/workflow.md`   | Scope, checks to run, docs and the log        |

   Claude Code loads these automatically; other agents should read the
   matching file before editing.

4. For UI: `docs/design-system.md`, `docs/layout-system.md` and the page spec
   in `docs/routes/`.
5. `git status --short` and the current diff.

## Hard boundaries

- Don't invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics or imagery.
- Keep commercial terms out of the repository: fees, prices, payment
  milestones, contract clauses and support or maintenance terms.
- Don't connect Sanity, Resend, Upstash, databases or deployment services
  during this checkpoint. Vercel Analytics is the one approved exception
  (`app/layout.tsx`).
- Preserve the homepage visual hold and unrelated uncommitted work.
- The supplied Figma frames and the user's screenshots are the design
  reference; resolve missing states without starting a new wireframe phase.

Approval history (which sections and options the user approved, and when) is in
`docs/archive/agents-guide-2026-11-03.md` and `docs/archive/`. The current state
lives in `docs/roadmap.md` and the page specs, not here.

## Verification

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build # at handoffs and route/layout/config/dependency changes
```

Record only checks that actually ran. A successful local build does not prove
deployment or external-provider readiness.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
