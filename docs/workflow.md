# Workflow

## Before work

1. Read `AGENTS.md`, `docs/README.md`, and `docs/roadmap.md`.
2. Confirm the requested work belongs to the active milestone.
3. Inspect `git status --short` and the current diff.
4. Read the canonical document for the affected concern.
5. Preserve unrelated changes.

## Working rules

- Keep each change focused on one approved outcome.
- Prefer the smallest file set that completes the request.
- Do not invent client content, claims, imagery, or integrations.
- Use supplied approved designs where available. Clarify missing states and
  content before inventing behaviour; use wireframes for genuinely new scope.
- Add dependencies only when an approved requirement needs them.
- Update the canonical document when a durable boundary or decision changes.
- Read the relevant guide in `node_modules/next/dist/docs/` before framework
  changes; use installed behaviour rather than assumptions from older Next.js.
- Keep ordinary states in Tailwind beside their component. Read the styling
  ownership in `architecture.md` before adding global CSS, tokens or helpers.

## Verification matrix

| Change                               | Minimum verification                                                  |
| ------------------------------------ | --------------------------------------------------------------------- |
| Documentation only                   | `pnpm format:check`, link/path review, and content consistency review |
| TypeScript content or helper         | `pnpm format:check`, `pnpm lint`, and `pnpm typecheck`                |
| Route, layout, config, or dependency | `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`  |
| Visual interface                     | Code checks plus browser review at agreed responsive widths           |
| External integration                 | Local checks plus separately identified provider/environment evidence |

Local checks do not confirm deployment, DNS, CMS access, message delivery, or
analytics collection.

`biome.json` enables Tailwind v4 parsing for optional Biome editor diagnostics.
Biome formatting and assists are disabled; ESLint and Prettier remain the
project's linting and formatting tools. Do not suppress accessibility rules to
hide markup errors. Local Cursor workspace settings explicitly bind
`biome.configurationPath` to `biome.json`; changing that setting restarts its
language server. This cleared a cached Tailwind diagnostic in an already-open
CSS file after the parser configuration had loaded. Editor settings remain
local under the existing `.vscode/` ignore rule.

Use `pnpm format` for an intentional repository-wide formatting pass. When a
worktree contains unrelated changes, format only the files in the active task.

For section work, iterate in `pnpm dev` with targeted formatting and browser
review. Batch lint/typecheck once the section slice is ready. A production
build belongs at the completed runtime handoff or a route/layout/configuration/
dependency checkpoint; do not repeat it for each visual adjustment. Planning
and documentation-only changes need formatting/path review, not a build.

Use an isolated local browser for responsive/interaction checks; do not inspect
the user's open apps or screen. Review 1440, 1280/1024, 768, 390 and 320px as
relevant, plus keyboard, reduced motion and no-JS fallbacks when affected.
Use the configured local dev origin (`http://localhost:3000` by default) and
wait for client readiness before testing interactive controls. Test an imported
CSS reorganisation in a production build as well as development.

## Audit and handoff discipline

Keep one canonical owner for each concern using `docs/README.md`. Update that
document when behaviour changes; append dated verification to the implementation
log rather than leaving conflicting current rules in several places. Historical
entries describe their original checkpoint, not current requirements.

At a checkpoint, record the exact next scope in the roadmap and its design,
copy, missing assets and interaction decisions in the route brief. A bounded
handoff should identify allowed files, shared files with one owner, acceptance
criteria and checks actually run. Another assistant must read those sources
and the current diff before editing. Do not establish the later Claude workflow
or begin People until that next scope is agreed.

## Implementation log

After meaningful completed work, append a dated entry to
`implementation-log.md` containing the outcome, files or area changed,
verification actually performed, and remaining gates. Do not log exploration
or describe unverified work as complete.
