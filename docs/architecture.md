# Architecture

## Current boundary

The project is a single-package Next.js App Router application with no `src/`
directory. The runtime contains brand/navigation/hero, firm-at-a-glance and
firm-story and selected-clients presentation.
The homepage milestone and remaining content gates are described in
`design-system.md`, `layout-system.md`, and `routes/home.md`.

```text
app/          Routes, layouts, metadata, and global styles
components/   Presentation grouped by stable shared or route ownership
lib/          Shared helpers and future service boundaries
types/        Shared TypeScript contracts
content/      Code-owned navigation and homepage presentation copy
public/       Supplied static assets used by the preview
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
- remaining component states and final publication content
- Sanity schemas, Studio, preview, and data fetching
- contact form delivery and abuse protection
- analytics, consent, hosting, and deployment
- automated test layers beyond lint, type checking, and production build

Shared chrome lives in `components/layout/`, Home sections in `components/home/`,
primitives in `components/ui/`, and source-supplied preview copy/collections in
`content/`. These boundaries now exist. Button uses CVA and Radix Slot; Sheet
uses Radix Dialog. The horizontal Carousel follows shadcn composition with
Embla for swiping, looping and selection. Its matching Fade plugin owns the
hero photograph transition; scoped global CSS owns text motion. Lucide supplies
ordinary UI icons. No autoplay plugin or general animation framework is installed.

`app/fonts/` holds local Latin variable Newsreader/Manrope files and their OFL
licences. The root layout owns fonts and metadata. `app/(site)/layout.tsx` owns
the shared header, skip link and main landmark; its homepage is a thin Server
Component. The footer will join this layout when its source section is built.
Header and hero presentation remain Server Components; StickyHeader,
SiteNavigation, MobileNavigation,
Sheet/notices, Carousel, HeroCarousel/Copy and HeroControls own their local
client interactions. Hero remains the server-rendered composition and source
copy mapping; the CTA is a single persistent element.
Secondary destinations display an explicit preparation notice until those
routes exist.

Section entry files follow `*-section.tsx`; supporting presentation components
retain descriptive `.tsx` names. Plain `.ts` content belongs in `content/`,
and custom CSS/keyframes belong in scoped blocks in `app/globals.css`.
The hero entry is `hero-section.tsx`, with its motion migrated into global
CSS. `content/firm.ts` owns shared facts and the firm preview, available to the
future firm page without duplicating copy in homepage JSX. The facts and story
remain Server Components; `components/shared/reveal-group.tsx` adds one-time
IntersectionObserver enhancement to server-rendered children. Missing office
and portrait media use explicitly labelled slots in `firm-image.tsx`; their
nullable source/alt fields live in the firm content module.

Use the supplied Figma design and explicit delivery scope for remaining
decisions; the temporary page and legacy website are not design-system sources.

The reveal helper is deliberately motion-only: sections own their markup,
content and layout. It is not a generic Section/card configuration layer and
currently serves only facts/story. New sections stay direct compositions.

`StickyHeader` owns one IntersectionObserver and one nullable scroll state, without
per-scroll listeners. Its 72px row and outer spacing remain constant on scroll;
only material pseudo-elements crossfade opacity. The enhanced top state
shows the glass nav pill; the scrolled state shows the full shell. An unset
initial state keeps the full shell as the readable enhancement/no-JS fallback. Desktop preserves the zero-height
hero overlay, while mobile reserves header space. Scoped CSS in `globals.css`
owns both surface states and solid contrast/transparency fallbacks.
No additional animation or glass-rendering dependency is installed. `SiteNavigation` shares desktop/mobile item rendering and
uses `usePathname` plus boundary-aware matching from `lib/navigation.ts`.
Set a navigation record's `available` flag only when its route exists. Pending
routes remain explicit notices; no dummy destination pages were added.

`content/clients.ts` owns the selected-clients copy and anonymous logo slots.
The section is server-rendered; its local `ClientLogoMarquee` owns only pause
state and enhancement readiness. `components/ui/marquee.tsx` is adapted directly from iProduce and retains its
repeat/direction/hover API; Tailwind animation tokens drive continuous motion.
Duplicate groups
are hidden from assistive technology and inert. Reduced motion/no-JavaScript
use a static grid. No carousel or animation dependency was added for this rail.
