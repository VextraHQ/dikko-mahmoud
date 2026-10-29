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

## Ownership

| Location                  | Responsibility                                                                |
| ------------------------- | ----------------------------------------------------------------------------- |
| `app/layout.tsx`          | Local fonts, global stylesheet, root metadata, user-added analytics           |
| `app/(site)/layout.tsx`   | Shared header, skip link, main landmark and footer                            |
| `app/(site)/page.tsx`     | Thin Server Component composing homepage sections                             |
| `app/globals.css`         | Tailwind import, semantic theme/animation bridges, global defaults            |
| `app/styles/motion.css`   | Custom entrance keyframes, reveal and marquee progressive fallbacks           |
| `app/styles/surfaces.css` | Header material pseudo-elements and browser/preference fallbacks              |
| `components/layout/`      | Shared chrome and unavailable-destination notice                              |
| `components/home/`        | Homepage section entries and their local interactive presentation             |
| `components/shared/`      | RevealGroup, ImageWithFallback, EditorialCover and reusable EnquiryCta        |
| `components/ui/`          | Button/ArrowButton, Accordion, Avatar, Eyebrow, Sheet, Carousel and Marquee   |
| `content/`                | Code-owned navigation, firm facts and homepage editorial collections          |
| `lib/`                    | Framework-independent helpers and future service boundaries                   |
| `types/`                  | Shared contracts only when multiple domains need them                         |
| `public/`, `app/fonts/`   | Local approved assets; variable fonts and their licences                      |
| `sanity/`                 | Reserved boundary; no active CMS integration                                  |
| `docs/`                   | Durable decisions, status, source references and dated implementation history |

Keep full section entry files named `*-section.tsx`; supporting components keep
descriptive names. Contracts used by one content module stay in that module.
Do not introduce a generic Section/card configuration framework or create
folders for speculative future features.

## Styling ownership

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

Motion is CSS-first. No general animation library or autoplay plugin is
installed. A future Motion pass must address an approved choreography/presence
need rather than move existing simple CSS feedback into JavaScript. Sections
continue to own their layout and content when wrapped by a motion helper.

## Server and client boundaries

Pages, layouts and section entries remain Server Components. Only state,
framework client hooks, browser APIs or event handlers justify a client boundary.
Server-rendered children may pass through a narrow client wrapper.

| Client owner                         | State and side effects                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `StickyHeader`                       | One IntersectionObserver and nullable scroll state; fixed header geometry, surface-opacity changes only        |
| `SiteNavigation`                     | `usePathname` and exact/slash-boundary route matching                                                          |
| `MobileNavigation`                   | Controlled Sheet; closes on Home/logo activation and desktop resize; media listener cleaned up                 |
| `PreviewDestination`, Sheet          | Radix Dialog focus management for unavailable routes/menu                                                      |
| Carousel, HeroCarousel/Copy/Controls | Embla manual selection/fade; stale image-decode requests cancelled; subscriptions cleaned up                   |
| `RevealGroup`                        | One observer for eligible offscreen children; focus/reduced-motion completion; observer/listener cleanup       |
| `ClientLogoMarquee`                  | Readiness and explicit pause state; CSS animation and static fallbacks                                         |
| `PracticeAreaExplorer`               | Nullable selected index plus one `matchMedia` subscription through `useSyncExternalStore`                      |
| `MatterExplorer`                     | One selected index, initially BPE; click/keyboard only; one-frame mobile preview focus/scroll after activation |
| `TestimonialCarousel`                | Existing Embla/Fade composition; manual controls/counter; reduced-motion duration; no autoplay or drag         |

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
An empty testimonial collection omits the section. Missing media uses explicit
slots; approved names without testimonial images use derived initials.

Local `content/people.ts`, `testimonials.ts` and `insights.ts` own these preview
records. Insights excludes the feature ID and duplicate support IDs, capped at
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
in `content/faqs.ts`. The section accepts an optional ordered `items` collection;
the page can pass normalized Sanity results later without changing its markup.
Omitted props use the current local records; an empty/blank collection omits the
section. No CMS query or integration is active yet.

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
Add shadcn primitives when a real control needs them; inputs/fields belong to the
later enquiry form. Portrait cards retain Next Image rather than adopting Avatar.
The responsive practice explorer remains a dedicated master/detail composition,
with its approved desktop/mobile selection contract.
ESLint owns linting and Prettier owns formatting/class ordering. Biome is an
optional editor diagnostic with Tailwind parsing, not a second formatting stack.

Preserve the user-added Analytics component. New CMS, email, database,
rate-limiting, analytics, deployment and consent work require their own approved
scope. No provider credentials or service clients belong in presentation
components. Secondary pages, remaining homepage sections and the later motion
and Claude collaboration passes remain separately scoped.
