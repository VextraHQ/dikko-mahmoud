# Dikko & Mahmoud Website

The local project foundation for the Dikko & Mahmoud website revamp. This
repository currently contains setup and documentation only; website design,
content, routes, components, CMS schemas, and integrations have not started.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- ESLint 9 with the Next.js Core Web Vitals and TypeScript rules
- Prettier with Tailwind class sorting
- pnpm

## Getting started

Requirements:

- Node.js 20.9 or newer
- pnpm 10

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required during the setup phase. Copy
`.env.example` to `.env.local` only when approved integrations introduce local
configuration.

## Useful commands

```bash
pnpm dev        # Start the local development server
pnpm build      # Create a production build
pnpm start      # Run the production build
pnpm format     # Format the repository
pnpm format:check # Check formatting without writing
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript without emitting files
```

## Project structure

```text
app/          App Router entry points, layouts, metadata, and global styles
components/   Shared and route-specific React components when approved
lib/          Framework-independent helpers and future service boundaries
types/        Shared TypeScript contracts
public/       Static assets
sanity/       Reserved CMS boundary; Sanity is not configured
docs/         Architecture, workflow, roadmap, and implementation history
```

The `@/*` alias resolves from the repository root. Keep routes thin, prefer
Server Components by default, and add folders only when an approved feature
needs a clear owner.

## Current boundary

This repository is local only. It has no Git remote, CMS connection, email,
database, rate limiting, analytics, or deployment configuration. The eventual
repository location is expected to be `VextraHQ/dikko-mahmoud-website`, but no
remote has been created or connected.

See [`docs/README.md`](./docs/README.md) for the documentation reading order.
