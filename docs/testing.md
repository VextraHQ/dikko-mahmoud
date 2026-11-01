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

## Alignment coverage

alignment.test.ts checks fail-closed publication status, visible-list selection,
the nine-practice projections and future enquiry choices, canonical authors,
isolated biography drafts, and approved legal section/date handling. Runtime
components remain covered by targeted browser review rather than a new React
rendering test framework. Current pending records exercise the empty public
state; approved single/multiple collections use synthetic unit fixtures.

## Lint rules and unused-code check

- `eslint.config.mjs` adds a few rules on top of Next's: no array-index keys,
  key checks (including duplicates), no `console.log` (`error`/`warn` are
  allowed), `===` instead of `==`, and no `!` non-null assertions. Tests may
  use `!`, and `scripts/` may log. Where a rule genuinely doesn't fit, use an
  `eslint-disable-next-line` comment with the reason, as in `marquee.tsx`.
- Biome is not used. Prettier formats and ESLint lints. Turn the Biome editor
  extension off for this workspace so it doesn't show conflicting warnings.
- `pnpm knip` lists unused files, exports and packages. Run it occasionally,
  not as part of every check. `knip.json` skips the prepared form kit
  (`docs/forms.md`) until the Contact/Careers forms use it. Code that is
  hidden on purpose, such as the commented-out practice experience section,
  will show as unused; that's expected.
