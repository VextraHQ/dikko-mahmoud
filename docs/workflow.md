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
- Agree substantial UI direction with a wireframe before coding it.
- Add dependencies only when an approved requirement needs them.
- Update the canonical document when a durable boundary or decision changes.

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

Use `pnpm format` for an intentional repository-wide formatting pass. When a
worktree contains unrelated changes, format only the files in the active task.

## Implementation log

After meaningful completed work, append a dated entry to
`implementation-log.md` containing the outcome, files or area changed,
verification actually performed, and remaining gates. Do not log exploration
or describe unverified work as complete.
