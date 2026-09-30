# Implementation log

## 2026-09-30 — Temporary holding page

- Added a restrained responsive development notice to the root route for use
  before the approved website design is implemented.
- Kept the page dependency-free and free of CMS, forms, navigation, service
  claims, contact details, or business logic.
- Added temporary metadata with `noindex, follow` and documented that the
  visual treatment is not the future design-system direction.
- Stopped tracking Next.js-generated `next-env.d.ts`; type checking now runs
  Next.js type generation before TypeScript.

## 2026-09-30 — Repository foundation

- Created the local Next.js App Router foundation with TypeScript, Tailwind CSS,
  ESLint, Prettier, and the `@/*` root import alias.
- Added minimal ownership folders, a reserved Sanity boundary, environment and
  ignore-file baselines, and the initial documentation system.
- Initialized local Git on `main` without a remote.
- Verified formatting, dependency installation, lint, type checking, production
  build, and a local HTTP response from the root route.
- Left design, content, routes beyond `/`, components, CMS schemas, business
  logic, external services, and deployment intentionally unimplemented.
