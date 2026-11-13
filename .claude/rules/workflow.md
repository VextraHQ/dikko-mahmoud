# Workflow

- Check `git status --short` and the current diff before editing. Preserve
  unrelated work and keep changes scoped to the active milestone in
  `docs/roadmap.md`.
- Check and update the relevant `docs/handover-checklist.md` items; the rules
  are in `docs/workflow.md` → "Delivery checklist".
- Keep fees, prices, payment and contract terms out of the repository.
- Do not connect Sanity, Resend, Upstash, databases or deployment services
  during the presentation checkpoint. Vercel Analytics is the one approved
  exception (`app/layout.tsx`).
- Commit subjects are 72 characters or fewer (`.githooks/commit-msg` checks);
  details go in the body after a blank line.
- The homepage is on visual review hold: shared extractions are fine only if
  Home looks the same.

## Checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build   # at handoffs and route/layout/config/dependency changes
```

Use the dev server and targeted formatting while iterating visually. Record
only checks that ran; a local build does not prove deployment readiness.

Automated (see `.claude/settings.json`, `.githooks/`): edited files
are formatted and linted, a finished turn with changes runs the four checks
above, and commits check staged files. ESLint enforces the import direction in
`structure.md`.

- `pnpm knip` (unused files and exports): never remove or keep anything on your
  own. List the findings and ask the user per item. Keep = add it to the
  ignore lists in `knip.json`.
- `pnpm log:archive` moves earlier months out of the log; the checks hook runs
  it automatically.

## Docs

- After meaningful work, add a dated entry to `docs/implementation-log.md`:
  outcome, files changed, checks run, remaining gates.
- The log keeps the current month. Move older months to
  `docs/archive/implementation-log-YYYY-MM.md`.
- Update the affected `docs/routes/*.md` spec and `docs/architecture.md` when
  ownership changes. Don't copy an old log entry into a current rule.
