# Dikko & Mahmoud Website

The local project foundation for the Dikko & Mahmoud website revamp. The root
route now presents the first homepage review checkpoint: brand typography and
theme, shared Button, responsive navigation, expertise hero, firm facts and
firm-story preview, sticky navigation, a selected-clients placeholder rail and
the editorial practice-area explorer, selected matters, curated People grid,
manual client-perspectives carousel and featured-plus-three insights. It remains
no-index. All five hero photographs are now local and connected; the full
homepage and secondary pages remain unfinished. Missing/failed media uses
decorative brand covers, initials or text logos, preserving each allocated crop.
These are intentional fallbacks, not substitute photographs. Approved originals
are still required. Testimonials remain anonymous preview slots; profile/article
destinations and publication content are still pending.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Minimal shadcn-style Button/Sheet, Embla Carousel, and Lucide icons
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
pnpm typecheck  # Generate Next.js types and run TypeScript checks
```

## Project structure

```text
app/          Routes, layouts, metadata, theme entry and focused styles/ files
components/   Shared and route-specific React presentation
content/      Navigation and homepage presentation copy
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

CMS, email, database, rate limiting and deployment remain outside this
presentation milestone. The user-added analytics component is preserved. The supplied Figma frames define the design direction. This is a local visual
review checkpoint, not a publication-ready website. See the homepage brief for
known gaps and review decisions.

See [`docs/README.md`](./docs/README.md) for the documentation reading order.
