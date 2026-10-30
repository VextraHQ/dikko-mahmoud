# Testing

Unit tests use [Vitest](https://vitest.dev), set up the same way as the
iproduce-africa project.

```bash
pnpm test        # run once (use this in checks and CI)
pnpm test:watch  # re-run on save while working
```

## What is tested

Tests cover **pure logic** only: code that takes values and returns values,
with no React rendering and no browser.

| Area       | Examples                                                         |
| ---------- | ---------------------------------------------------------------- |
| `lib/`     | `formatIndex`, `initialsFrom`, `hasText`, `playableSource`       |
| `content/` | Visibility rules (`visibleFaqs`) and selections (`homeInsights`) |
| Integrity  | Unique person ids/slugs, valid references, default matter exists |

The integrity tests in `tests/content-integrity.test.ts` catch content edits
that would quietly break a section, such as an advisory group pointing at a
person who was removed, or `defaultId` naming a matter that no longer exists.

## What is not tested (yet)

Components and hooks are checked visually in the browser instead. Rendering
tests (React Testing Library, a DOM environment) add setup and upkeep that
this presentation-stage site doesn't need yet. Revisit when forms submit to a
real service or the Sanity adapter lands; those boundaries are worth testing.

## Conventions

- Tests live in the root `tests/` folder as `<subject>.test.ts`.
- The environment is Node (`vitest.config.mts`); the `@/` alias works.
- Test behaviour, not implementation: inputs and expected outputs.
- When you add a pure helper to `lib/` or a rule to `content/`, add a test.
- Keep tests small and readable; one `describe` per function.
