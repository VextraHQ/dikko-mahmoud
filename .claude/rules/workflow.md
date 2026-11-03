# Workflow

- Check `git status --short` and the current diff before editing. Preserve
  unrelated work and keep changes scoped to the active milestone in
  `docs/roadmap.md`.
- Do not connect Sanity, Resend, Upstash, analytics, databases or deployment
  services during the presentation checkpoint.
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

## Docs

- After meaningful work, add a dated entry to `docs/implementation-log.md`:
  outcome, files changed, checks run, remaining gates.
- The log keeps the current month. Move older months to
  `docs/archive/implementation-log-YYYY-MM.md`.
- Update the affected `docs/routes/*.md` spec and `docs/architecture.md` when
  ownership changes. Don't copy an old log entry into a current rule.
