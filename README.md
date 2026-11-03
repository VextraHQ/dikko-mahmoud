# Dikko & Mahmoud Website

The site is a no-index local presentation preview. Home, The Firm, the nine
Practice area routes, People directory/profiles, Selected matters listing/details, SME retainer, Privacy Policy and Terms of Use are implemented
for review. The client-feedback corrections are specified in
[client alignment](docs/client-alignment.md); the proposed scope inclusions are in
[the draft addendum](docs/scope-addendum.md). The original proposal is unchanged.

Home retains its hero, firm story, practice selector, People, Insights, FAQ and CTA.
The selector, hub, menus, footer and future enquiry choices share nine practices.
Testimonials are removed. Client/logo and representative-matter collections render
only approved records; all currently stored client/matter records await consent,
so those Home sections and their spacing are omitted. The user restored pending
practice-detail experience for no-index design review with a preview note; its
publication status remains pending and it is excluded when indexing is enabled.

Selected matters now has four sourced organisation-led experience previews. Its
explicit no-index exception shows pending instructions with an approval note;
Home remains approved-only. Replace temporary images before WebP conversion
(see `docs/media-review.md`).

The Firm retains Journey and the agreed preview presentation. SME has Advisory
and Secretarial tracks with explicit missing-copy notices. Legal pages share an
editorial reading layout and actual document links; firm-approved legal text and
update dates have not been supplied and are not invented. People biography drafts
and article-author support are prepared without publishing unconfirmed claims.

Visual identity, approved media, final practice naming/Capital Markets placement,
biographies, article copy, publication permissions and legal/SME text remain review
gates. People directory/profiles are available for local review. Insights routes, Careers and Contact remain
separate implementation checkpoints. Providers and deployment are not connected.
The user-added Analytics and existing hero autoplay remain intact.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Shadcn-style Button/Sheet/Accordion/Avatar/NavigationMenu/Breadcrumb, Embla Carousel, Lucide UI icons
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

## Where things live

```text
app/                    Routes, layouts, metadata, global styles
  (site)/               Every public page; @profile is the profile popup
components/
  <page>/               Sections for one page (home, firm, people, practices…)
  shared/               Pieces used by several pages (PersonCard, EmptyState…)
  layout/               Header, footer, SiteLink
  ui/                   shadcn-style primitives (Button, Select, Sheet…)
content/                Copy, records and ready-to-render lists, by domain
hooks/                  Browser behaviour, one use-*.ts per file
lib/                    Pure rules and helpers
  people/               People rules: roster, profiles, directory, links
  routes.ts, metadata.ts, publication.ts, preview.ts …
tests/                  Vitest tests for lib/ and content/ (fixtures/ for fake data)
public/                 Static assets
sanity/                 Reserved CMS boundary; Sanity is not configured
docs/                   Specs, roadmap and the implementation log
  routes/               One spec per page
  archive/              Older log months and superseded guides
.claude/rules/          Short coding rules by area (read before editing)
```

A request flows one way: a page in `app/` asks `lib/` or `content/` for
ready data, then hands it to `components/`. Components draw; hooks handle
browser behaviour; `lib/` decides; `content/` stores. The `@/*` alias resolves
from the repository root. See `.claude/rules/structure.md` for the import
rules and how to add a page, section, hook or rule.

## Current boundary

CMS, email, database, rate limiting and deployment remain outside this
presentation milestone. The user-added analytics component is preserved. The supplied Figma frames define the design direction. This is a local visual
review checkpoint, not a publication-ready website. See the homepage brief for
known gaps and review decisions.

See [`docs/README.md`](./docs/README.md) for the documentation reading order.
