# Architecture

## Current boundary

The project is a single-package Next.js App Router application with no `src/`
directory. It is intentionally limited to the framework foundation.

```text
app/          Routes, layouts, metadata, and global styles
components/   Presentation grouped by stable shared or route ownership
lib/          Shared helpers and future service boundaries
types/        Shared TypeScript contracts
public/       Approved static assets
sanity/       Reserved future CMS boundary
docs/         Durable decisions, workflow, status, and history
```

The `@/*` import alias resolves from the repository root. TypeScript strict mode
is enabled. Tailwind CSS is loaded through PostCSS and `app/globals.css`.
ESLint owns code-quality rules; Prettier owns formatting and Tailwind utility
ordering.

## Ownership rules

- Keep App Router pages and layouts thin and server-rendered by default.
- Introduce client components only at the narrowest interactive boundary.
- Group components by stable page or shared responsibility after those routes
  are approved; do not pre-create speculative feature trees.
- Put shared compile-time contracts in `types/`. Future runtime validation
  should have a separate boundary rather than being mixed into presentation.
- Keep secrets and provider clients out of browser bundles when integrations
  are eventually approved.
- Keep code-owned presentation content separate from CMS-managed editorial
  content once the content model is agreed.

## Deferred decisions

The following are deliberately undecided and unimplemented:

- final route and information architecture
- design system, tokens, typography, and component primitives
- Sanity schemas, Studio, preview, and data fetching
- contact form delivery and abuse protection
- analytics, consent, hosting, and deployment
- automated test layers beyond lint, type checking, and production build

These decisions should be made from an approved content inventory, wireframe,
and delivery scope rather than inferred from the legacy website.
