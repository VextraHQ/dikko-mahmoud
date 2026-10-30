# Dikko & Mahmoud Website

The local project foundation for the Dikko & Mahmoud website revamp. The root
route now presents the homepage review checkpoint: brand typography and
theme, shared Button, responsive navigation, expertise hero, firm facts and
firm-story preview, sticky navigation, a selected-clients placeholder rail and
the editorial practice-area explorer, selected matters, curated People grid,
manual client-perspectives carousel, featured-plus-three insights, FAQ, overlapping
enquiry CTA and shared footer. It remains
no-index. All five hero photographs are now local and connected. The homepage
presentation runs from navigation through footer; whole-page review, final
content and secondary pages remain unfinished. Missing/failed media uses
decorative brand covers, initials or text logos, preserving each allocated crop.
These are intentional fallbacks, not substitute photographs. Approved originals
are still required. Testimonials remain anonymous preview slots; profile/article
destinations and publication content are still pending.
The FAQ uses user-authorized starter copy, ready for later editorial replacement.
Footer contact details
follow the supplied reference; real social profiles and booking/secondary pages
still need their approved destinations. Email and phone links are available.

The homepage is on visual review hold pending client identity/media approval.
The Firm (`/the-firm`) is implemented as a no-index presentation preview. It includes
the agreed Journey, founder/advisory previews, process, presence and shared facts/FAQ/CTA.
Original media, group assignments and some editorial copy remain approval gates. Use the
[page spec](docs/routes/the-firm.md) and
[new-chat prompt](docs/handoffs/the-firm-next-chat.md) for the current checkpoint. Preserve Home's
appearance while extracting shared pieces and enabling real Firm links.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Shadcn-style Button/Sheet/Accordion/Avatar, Embla Carousel, Lucide UI icons
  and React Icons for social brands; shared form controls and React Hook Form
  adapter prepared for the later enquiry page; Motion is scoped to Firm Journey
  content transitions
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
pnpm test       # Run Vitest unit tests (pnpm test:watch while working)
```

## Project structure

```text
app/          Routes, layouts, metadata, theme entry and focused styles/ files
components/   Shared and route-specific React presentation
content/      Navigation and homepage presentation copy
hooks/        Reusable client hooks (use-*.ts): browser APIs and stateful rules
lib/          Framework-independent helpers and future service boundaries
tests/        Vitest unit tests for lib/ and content/ (see docs/testing.md)
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
