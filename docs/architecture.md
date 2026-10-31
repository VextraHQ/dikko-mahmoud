# Architecture

## Current boundary

A single-package Next.js 16 App Router application, React 19, TypeScript strict
mode and Tailwind CSS 4. There is no `src/` directory or monorepo. The `@/*`
alias resolves from the repository root. The current homepage contains shared
navigation, hero, firm facts/story, clients, practice areas, selected matters,
People, client perspectives, insights, FAQ and an enquiry CTA, followed by the
shared footer.
It remains a no-index local presentation preview; see `roadmap.md` for the next
approved scope and `routes/home.md` for source/content gates.

## Firm review boundary

The homepage remains on client visual review hold. `/the-firm` is implemented
as a thin Server Component using `components/firm/*-section.tsx`; the route brief
owns content gaps and review status. Home's facts/FAQ wrappers delegate to shared
presentation, its people grid uses PersonCard, and its story CTA is a real Firm
link. No other route or service is included.

## Ownership

| Location                       | Responsibility                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| `app/layout.tsx`               | Local fonts, global stylesheet, root metadata, user-added analytics                     |
| `app/(site)/layout.tsx`        | Renders `SiteShell` (header, skip link, main landmark, footer)                          |
| `app/(site)/the-firm/page.tsx` | Thin Firm route composition and metadata; inherited no-index                            |
| `app/(site)/page.tsx`          | Thin Server Component composing homepage sections                                       |
| `app/globals.css`              | Tailwind import, semantic theme/animation bridges, global defaults                      |
| `app/styles/motion.css`        | Custom entrance keyframes, reveal and marquee progressive fallbacks                     |
| `app/styles/surfaces.css`      | Header material pseudo-elements and browser/preference fallbacks                        |
| `components/layout/`           | Shared chrome and unavailable-destination notice                                        |
| `components/home/`             | Homepage section entries and their local interactive presentation                       |
| `components/firm/`             | Firm section entries, responsive Journey and founder/advisory presentation              |
| `components/shared/`           | Facts/FAQ sections, PersonCard, VideoPoster, RevealGroup, media fallback and EnquiryCta |
| `components/ui/`               | Shared controls, form primitives, Accordion/Avatar, Carousel and Marquee                |
| `content/`                     | Code-owned navigation, firm editorial collections, canonical people and contacts        |
| `lib/routes.ts`                | Route registry (`routes.*`) and `launchedRoutes`, the list of live pages                |
| `lib/metadata.ts`              | Shared site/page metadata builders and site URL resolution                              |
| `content/site.ts`              | Site name, description, fallback URL, locale and the `indexable` launch switch          |
| `content/system-pages.ts`      | Copy for the 404 and error pages                                                        |
| `app/robots.ts`, `sitemap.ts`  | Robots rules from `indexable`; sitemap from `launchedRoutes`                            |
| `app/not-found.tsx`            | Branded 404 inside `SiteShell`, no-index                                                |
| `app/**/error.tsx`, global     | Error boundaries rendering the shared `ErrorView`                                       |
| `hooks/`                       | Reusable client hooks: browser APIs, observers, media queries, selection state          |
| `lib/`                         | Pure helpers (format, content rules, video), media queries, future service boundaries   |
| `tests/`                       | Vitest unit tests for `lib/` and `content/` (see `testing.md`)                          |
| `types/`                       | Shared contracts only when multiple domains need them                                   |
| `public/`, `app/fonts/`        | Local approved assets; variable fonts and their licences                                |
| `sanity/`                      | Reserved boundary; no active CMS integration                                            |
| `docs/`                        | Durable decisions, status, source references and dated implementation history           |

Keep full section entry files named `*-section.tsx`; supporting components keep
descriptive names. Contracts used by one content module stay in that module.
Do not introduce a generic Section/card configuration framework or create
folders for speculative future features.

## Components, hooks and helpers

Components are for markup. A `.tsx` component should read as layout and
content: props in, JSX out, plus at most a line or two of glue (`useState` for
a simple toggle, an event handler that calls a hook). Anything a reader has to
stop and work through belongs elsewhere:

| Logic                                                              | Home             |
| ------------------------------------------------------------------ | ---------------- |
| Effects, observers, `matchMedia`, event listeners, timers, `rAF`   | `hooks/use-*.ts` |
| State with rules (direction, derived defaults, multi-step updates) | `hooks/use-*.ts` |
| Pure functions with no React (URL checks, formatting, constants)   | `lib/*.ts`       |
| Copy, collections, labels                                          | `content/*.ts`   |
| Which records are ready to show (filters, caps, fallbacks)         | `content/*.ts`   |

Hook conventions follow the iproduce-africa project: a flat root `hooks/`
folder, one hook per kebab-case `use-*.ts` file, a short doc comment saying
what it does and why, and a small returned object (`{ ref, scrolled }`) rather
than positional tuples. Mark hook files `"use client"`. Hooks own behaviour,
never markup or copy. Reuse an existing hook before writing a new one; read
media queries through `useMediaQuery(mediaQueries.*)` from
`lib/media-queries.ts`, never a hand-written `matchMedia` subscription.

Sections read ready-made lists from content (`visiblePracticeAreas`,
`visibleMatters`, `homePeople`, `visibleTestimonials`, `visibleClients`,
`homeInsights`, `visibleFaqs()`), built with `hasText`/`uniqueById` from
`lib/content.ts`. A component may still check an optional field before
showing it (a role line, for example); deciding whether a whole record is
publishable belongs to content. This is also where a future Sanity adapter
plugs in. Use `formatIndex`/`formatCount` from `lib/format.ts` for "01"-style
labels and `initialsFrom` for avatar initials.

Current hooks: `useMediaQuery`, `useMediaQueryChange`, `useScrolledPast`,
`useRevealOnScroll`, `useBringIntoView`, `useDirectionalSelection` and
`usePreloadAdjacentSlides`. shadcn primitives in `components/ui/` (such as
Carousel) keep their own internal state, as generated.

## Routes, metadata and system pages

- `lib/routes.ts` is the only place paths are written. Detail pages use
  builders (`routes.person(slug)`). `launchedRoutes` lists live pages.
- `SiteLink` is server-compatible: live routes render `next/link`; others render
  a button that opens the `PreviewDestination` notice with a "(coming soon)"
  screen-reader suffix. Style it through `asChild` buttons. `available`
  overrides the registry per record (e.g. `person.profileAvailable`).
- Launching a page = build it, export `createPageMetadata`, add its path to
  `launchedRoutes`. Links and the sitemap update automatically.
- `createSiteMetadata()` (root layout) sets `metadataBase`, the title template,
  canonical, Open Graph/Twitter defaults and robots. `createPageMetadata()`
  rebuilds `openGraph` per page because Next.js replaces, not merges, a child's
  `openGraph` object. Site URL: `NEXT_PUBLIC_SITE_URL`, then Vercel URLs, then
  `siteConfig.url`.
- `siteConfig.indexable = false` keeps every page no-index and robots.txt
  disallowing all until launch.
- System pages: `app/not-found.tsx` (404 status, inside `SiteShell`),
  `app/(site)/error.tsx` (keeps chrome), `app/error.tsx` (shell failure) and
  `app/global-error.tsx` (root layout failure; brings its own html, fonts and
  globals.css). All render `StatusPage`: a centred message and actions on the
  navy band with a faint serif watermark ("404", or the firm initials); errors go through the client
  `ErrorView`, which calls Next 16's `retry()` and reports via `useReportError`.
- Gaps: no Open Graph share image yet; `/experience` and `/insights/:id` paths
  are provisional until those routes are specified.

## Styling ownership

The site's signature ease-out curve is the theme token `--ease-editorial`
(`cubic-bezier(0.22, 1, 0.36, 1)`), used as the `ease-editorial` class. Do not
paste the raw curve into class names. Multi-value transitions
(`ease-[curve,ease,ease]`) and CSS-file keyframes may keep the literal value.

Use Tailwind beside the component for layout, ordinary presentation, responsive
changes, hover/focus/press feedback and data/ARIA-driven visibility. `cn()` may
separate base, responsive and state classes; CVA belongs in primitives with real
variants. Do not replace readable CSS with excessive arbitrary selector chains.

`globals.css` is the single stylesheet entry, imported by the root layout. It
imports the two focused CSS files above. Custom CSS is reserved for keyframes,
coordinated descendant entrance rules, progressive/no-JS fallbacks and complex
surface/browser-preference rules. Scope selectors with component classes or
`data-*` attributes. Do not add CSS modules or stylesheets to component folders.
Use Tailwind v4 `@theme` bridges; no parallel token catalogue or `@apply` layer.

Motion is CSS-first. The FAQ uses Radix height-variable CSS keyframes; button
press and focus feedback stay in Tailwind. The user has now approved Motion
for Firm Journey content transitions, using LazyMotion/domAnimation and keyed
AnimatePresence media panels. The homepage hero alone uses
`embla-carousel-autoplay` (see design-system.md → hero). Broader Motion
choreography remains later; do not move simple hover feedback into JavaScript. Sections
continue to own their layout and content when wrapped by a motion helper.

## Server and client boundaries

Pages, layouts and section entries remain Server Components. Only state,
framework client hooks, browser APIs or event handlers justify a client boundary.
Server-rendered children may pass through a narrow client wrapper.

| Client owner                         | State and side effects                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `StickyHeader`                       | `useScrolledPast` (one IntersectionObserver, nullable state) and pathname-scoped mobile backing; fixed geometry           |
| `SiteNavigation`                     | `usePathname` and exact/slash-boundary route matching                                                                     |
| `MobileNavigation`                   | Controlled Sheet; closes on available-route/logo activation and, via `useMediaQueryChange`, on desktop resize             |
| `PreviewDestination`, Sheet          | Radix Dialog focus management for unavailable routes/menu                                                                 |
| Carousel, HeroCarousel/Copy/Controls | Embla fade/autoplay; `usePreloadAdjacentSlides` decodes neighbours; `useCarouselAutoplay` owns pause/stop rules           |
| `RevealGroup`                        | Markup only; `useRevealOnScroll` owns the observer, focus/reduced-motion completion and cleanup                           |
| `ClientLogoMarquee`                  | Readiness and explicit pause state; CSS animation and static fallbacks                                                    |
| `PracticeAreaExplorer`               | Nullable selected index plus `useMediaQuery(mediaQueries.desktop)`                                                        |
| `MatterExplorer`                     | One selected index, initially BPE; click/keyboard only; `useBringIntoView` focuses/scrolls the preview on mobile          |
| `JourneyExplorer`                    | `useDirectionalSelection` plus desktop/reduced-motion `useMediaQuery`; controlled Accordion, end-bounded arrows           |
| `VideoPoster`                        | Click-to-mount iframe/native video; player focus and close-to-trigger focus return; no provider request before activation |
| `TestimonialCarousel`                | Existing Embla/Fade composition; manual controls/counter; reduced-motion duration; no autoplay or drag                    |

The hero keeps its panel, CTA and controls outside changing slides. Only its
opening image is explicitly preloaded; adjacent images are warmed after the
current one is ready. Image failures retain the current slide. Embla Fade owns
photo crossfades; custom CSS owns copy entrances. Preserve the native image
resolution limits documented in the homepage brief.

Hero composition/header overlay begin at `lg` (64rem), independently of the
full navigation's `xl` (80rem) threshold. The full header shell is hidden at the
top at every width and appears only after the scroll marker leaves view. The
compact menu control has its own small contrasting background over the photo.
Hero content, image, panel and slide
controls share the `lg` switch; no additional browser state is needed.

The practice explorer uses one responsive DOM: desktop always displays a
selection; mobile/tablet start collapsed and allow the open row to close. The
64rem media query matches Tailwind `lg`. Its SSR snapshot is stable and starts
collapsed; the browser derives the desktop default. Keep state logic and its
responsive styles aligned when changing this threshold.

Selected matters use explicit activation only. Hover may highlight a control
but never changes the feature or selection. All four records have organisation,
topic, summary and qualifier fields. An organisation named in a matter is not
necessarily the advisory client. Feature cards reserve one stable grid cell;
inactive content is inert and hidden from accessibility. Stacked-layout
activation focuses the named preview and scrolls it clear of the sticky header.

People and Insights are Server Component sections with small preparation-notice
triggers for unavailable destinations. People caps the ordered preview at four;
it is not the full directory. Testimonial body/identity markup is server-rendered
through the existing carousel items; the local client wrapper owns only Embla
options and persistent controls/status. Inactive slides are inert/hidden, slide
heights stretch to the tallest record, and fewer than two items hide controls.
Slides establish their own positioning context so offscreen sr-only legends
remain inside the clipped viewport before hydration and without JavaScript.
An empty testimonial collection omits the section. Missing media uses explicit
slots; approved names without testimonial images use derived initials.

`content/people.ts` owns canonical IDs, slugs, names, roles, optional portraits,
founder biography/milestones and ID-based Home/advisory selections. Neutral group
slots stay separate from real records. PersonCard shows a preparation notice
until `profileAvailable` enables the real `/people/[slug]` link. Firm uses a small
crop/role override for its founder composition. `testimonials.ts` and `insights.ts`
own their editorial preview records. Insights excludes the feature ID and duplicate support IDs, capped at
three. Future Sanity selection/publication filtering belongs in a normalization
adapter rather than presentation components; no CMS client or speculative fetch
layer has been introduced.

## FAQ, enquiry CTA and footer

`FaqSection` remains a Server Component composing the shared shadcn-style Radix
Accordion. Its first item opens initially, at most one stays open, and every item
can close. Radix owns state, ARIA relationships and arrow/Home/End keyboard
navigation; there is no section-level accordion state or height measurement.
A `noscript` native disclosure list reuses the same server-rendered answers.
The office thumbnail keeps ImageWithFallback; small identity circles in FAQ and
client perspectives use the shared Radix Avatar/Image/Fallback primitives.
Starter copy and the `Faq` record shape live
in `content/faqs.ts`. The shared section accepts explicit `intro` and ordered `items`; its narrow
heading class override matches the Firm mobile reference. Home retains a thin
wrapper with its original local defaults. An empty/blank collection omits the
section. Firm-specific questions and explicit missing-answer slots live beside
Home records in `content/faqs.ts`. No CMS query or integration is active yet.

`EnquiryCta` is a separate Server Component in `components/shared/`, placed by
the page so each future route can choose `variant="pale"` or `variant="white"`.
`SiteFooter` is a Server Component mounted once by the site layout, outside
`main`. CTA negative margins and footer top padding are a coordinated overlap
contract; see the layout system. No pathname logic chooses CTA colours.

`content/contact.ts` owns screenshot-supplied addresses, email, telephone values
and hours; `content/enquiry.ts` owns CTA copy and `content/footer.ts` owns footer
groups/social slots. Email/phone anchors use `mailto:`/`tel:` without a provider
integration. Booking, unavailable routes and social profiles without approved
URLs reuse PreviewDestination. Primary footer destinations follow navigation
availability; footer-only practice/legal records have explicit availability
flags so they can be enabled independently when those pages exist.

## Media and missing content

`ImageWithFallback` is the shared narrow client boundary around Next Image.
Sections supply server-rendered fallback children and continue to own their
layout/crop, content, alt text, loading priority and sizes. Missing/blank URLs
render the fallback immediately; image errors replace only the failed image.
A changed URL gets another attempt. Its only state is a failed source URL;
there are no effects, timers or retry loops. The decorative EditorialCover
shares brand typography/rules; it is not a section/card configuration engine.
BrandLogo, hero, story, practice, client logos, People and Insights reuse this
boundary. Small identity circles use the shared Avatar boundary described above. No service, new package or global stylesheet is involved.

Hero image decode rejection is allowed to complete selection into that slide's
own fallback. The existing carousel request counter still rejects stale results.
One filtered hero collection drives the copy, photographs and control counts.
Empty/untitled People, practice, matters and insight collections do not render
empty section shells. Insights can promote a valid supporting record when the
feature is absent, then excludes duplicate IDs. Named client rows and supplied
testimonial quotes replace anonymous sample rows when available; one client is
static and one testimonial hides controls. A missing quote forces anonymous
identity and ignores any attached photo, role or organisation.

Review notes for unapproved article/quote/client content remain separate from
media fallbacks. The no-JS page renders absent-media fallbacks on the server;
replacing an image after a network error requires the client error callback.

## Accessibility and progressive enhancement

- Use native controls/landmarks, visible focus and accurate ARIA relationships.
- Root smooth scrolling and every animation respect reduced motion. Reveal
  content becomes visible immediately when focused or reduced motion changes.
- Facts/story start visible without JavaScript; the client rail falls back to
  a static unique grid, the header retains a readable solid/material shell,
  and the hero/matters retain server-rendered opening content.
- Unavailable destinations open an explicit preparation notice. Enable a
  navigation record only when its real route exists; do not create dummy pages.
- Keep placeholder assets visibly labelled and publication approval separate
  from local UI completion. Never infer unpublished people or matter outcomes.

## Dependencies and deferred work

CVA/Radix Slot support the shared Button; Radix Dialog supports Sheet/notices;
Embla and its Fade plugin support the hero; Radix Accordion/Avatar support shared
disclosures and identity circles. Lucide supplies ordinary UI icons; React Icons
Font Awesome 6 supplies social brands through the server-rendered SocialIcon map.
The user authorized preparation of Input, Textarea, Label, Field, Checkbox,
NativeSelect, Separator and the React Hook Form adapter before secondary pages.
These are local primitives, not an active enquiry form or submission service.
`docs/forms.md` owns composition, ARIA wiring and validation ownership. Native
controls/Field remain server-compatible; Radix and React Hook Form own narrow
client boundaries. No schema/resolver package was added.
Portrait cards retain Next Image rather than adopting Avatar.
The responsive practice explorer remains a dedicated master/detail composition,
with its approved desktop/mobile selection contract.
ESLint owns linting and Prettier owns formatting/class ordering. Biome is an
optional editor diagnostic with Tailwind parsing, not a second formatting stack.

Preserve the user-added Analytics component. New CMS, email, database,
rate-limiting, analytics, deployment and consent work require their own approved
scope. No provider credentials or service clients belong in presentation
components. Secondary pages, remaining homepage sections and the later motion
and Claude collaboration passes remain separately scoped.

## Firm Journey and video

Journey retains one responsive Accordion index/content DOM and one selected
record. At `lg`, the selected media is presented separately in a persistent
right-hand grid, allowing old/new keyed media to overlap during a directional
Motion slide/fade. Exiting media is immediately aria-hidden/inert. Controls stay
mounted outside the changing panels. Below `lg`, a small media presentation
duplication keeps the figure inside its disclosure row; that row can close. Empty mobile
selection derives 1993 on desktop; explicit selections survive resizing. A
server-rendered native-details noscript list keeps all five stories accessible.
A hydration-safe, live reduced-motion query renders static content during SSR
and cancels the animated subtree immediately when reduction is enabled. No
hover/autoplay/scroll selection or measurement effect is used. The server
section resolves person milestones/media from canonical people before passing
prepared items to the interactive explorer.

VideoPoster accepts an optional explicit file/embed source and rejects blank or
invalid URLs. It renders ImageWithFallback alone without video. A valid video
adds one play control; iframe/native video mounts only on activation and is
removed on close, returning focus. Firm currently supplies neither approved
poster nor video, so it shows an intentional decorative cover. No provider or
video URL is invented. VideoPoster itself needs no provider dependency.
