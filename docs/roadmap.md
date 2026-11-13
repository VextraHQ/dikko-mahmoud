# Roadmap

## Current objective

The client-alignment pass is implemented for local review; see
[client-alignment.md](client-alignment.md) for the authoritative before/after scope.
Use [handover-checklist.md](handover-checklist.md) for the full delivery status
and remaining work, checked against the agreed scope and current implementation on
12 November 2026.
Home and The Firm retain their identity/media review holds except for the approved
corrections. The public practice index now drives nine practices across Home,
hub, navigation, footer and future enquiry options. Testimonials are removed.
Pending clients/logos and named matters are stored but hidden on Home; empty
sections reserve no space. The practice-detail experience carousel is currently
hidden pending consent; the earlier visual preview remains recorded in the
alignment history. Consent stays pending; withheld records and unapproved launch
content remain hidden.

SME retainer, Privacy Policy and Terms of Use previews are implemented. SME tracks
await supplied copy; legal bodies and approved dates are absent and explicitly
marked. These are working route presentations, not publication approval.
Article-author references and brochure biography drafts are prepared; no author or
unconfirmed profile copy is invented. Insights listing/articles are now implemented for no-index review. Contact is
implemented for visual review (preview submission, no delivery). Careers
has a supplied design and remains deferred until the firm confirms its
recruitment process; see [routes/careers.md](routes/careers.md). Nine practices, SME and
Terms are in the agreed scope, awaiting the firm's written acknowledgement.

Capital Markets placement, final practice names, current biographies, media,
permissions, SME/legal text and missing contact details remain firm review gates.
Sanity, other providers, deployment and the later Claude workflow remain outside
this checkpoint. Vercel Analytics, hero autoplay and Firm Journey are preserved.

## People checkpoint history

On 1 November the user confirmed profile popups plus shareable standalone pages,
and both Our People and Selected matters in main navigation. The approved bounded
spec is [routes/people.md](routes/people.md), with the paste-ready Claude prompt
in [archive/handoffs/people-profiles-next-chat.md](archive/handoffs/people-profiles-next-chat.md).
This slice covers the four existing profiles and necessary shared navigation;
Codex prepares the handoff and reviews Claude's eventual implementation. It does
not build the People directory or Selected matters listing/detail pages yet.
Those need their separate references/content decisions. Claude implemented the
profile/navigation slice on 1 November for local review (see the implementation
notes in routes/people.md); Codex review and firm content approval remain open.
On 2 November the user authorized the `/people` directory, now implemented for
local review; the Selected matters listing/detail pages remain separate.
On 3 November the user approved the editorial directory wireframe: compact navy
introduction, one managing-partner feature and the searchable roster. The sample
roster removal is preserved; the four current partners remain the only records.

## Selected matters checkpoint · 3 November

The user approved the organisation-led listing/detail wireframe and authorised
implementation at `/experience` and `/experience/[id]`. See
[routes/selected-matters.md](routes/selected-matters.md). Pending named experience
may render with a review note only while no-index; Home remains approved-only.
The Firm hero is temporarily reused. **Replace temporary images before WebP
conversion** using [media-review.md](media-review.md). No conversion or deployment
is part of this checkpoint.

## Insights checkpoint · 3 November

The user approved layouts plus the content/schema contract and authorised
implementation. `/insights` has server search/filter/sort and nine-card numbered
pages; `/insights/[id]` renders 27 coherent demo articles with Portable Text,
authors, references, contents, sharing and article-scoped reading progress.
Home uses the same records, photos, dates, bylines and detail destinations.
See [the route contract](routes/insights.md) and [stock-photo register](insights-media.md).
Demo records are excluded when indexing is enabled. Live Sanity, final authored
content and final media selection remain later; no WebP conversion was performed.
Careers is the remaining unbuilt primary route checkpoint. Contact delivery
(Resend, React Email, spam checks, rate limiting) waits for visual approval.

## Status

| Milestone                                   | Status   | Outcome                                                                                    |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| 1. Repository foundation                    | Complete | Local Next.js, TypeScript, Tailwind, ESLint, Prettier, docs, and Git foundation            |
| 1a. Temporary holding page                  | Complete | Responsive, no-index interim screen pending approved design work                           |
| 2. Figma audit and homepage brief           | Complete | Frames, brand direction, section map, and provisional content identified                   |
| 2a. Fonts, tokens, and shadcn foundations   | Complete | Lean reusable system derived from the supplied design                                      |
| 2b. Navigation and hero                     | Review   | Responsive checkpoint with manual fades, text motion and image preparation                 |
| 2b.1 Firm facts and story                   | Review   | Responsive sections, shared firm content, placeholders and one-time reveals                |
| 2b.2 Sticky navigation and selected clients | Review   | Route-aware header and accessible placeholder marquee                                      |
| 2b.3 Practice-area explorer                 | Review   | Nine shared practices, desktop index, mobile accordion, photo placeholders                 |
| 2b.4 Selected matters                       | Review   | Consent-gated records; pending matters hidden; approved selection fallback                 |
| 2b.5 Maintainability audit                  | Review   | Style ownership, click-only matters, accessibility fixes and aligned docs                  |
| 2b.6 People, client perspectives, insights  | Review   | Four-person preview, testimonials removed, article-author support                          |
| 2c. FAQ, enquiry CTA and footer             | Review   | Shared Accordion, two CTA surfaces and footer; stock avatars removed                       |
| 2c.1 Whole-page presentation QA             | Hold     | Homepage visuals held for client identity/content/imagery review                           |
| 2d. Final publication content               | Waiting  | Approved portraits, imagery, publication consent and destinations                          |
| 3. Information architecture                 | Scoped   | Firm route, shared ownership and destination activation mapped; other routes later         |
| 4. Desktop and mobile design references     | Supplied | User-provided Figma frames; missing states resolved during audit                           |
| 5. Secondary-page implementation            | Review   | Primary route previews built except Careers; approved content and integrations remain      |
| 5a. The Firm                                | Review   | Route, shared reuse and interactions implemented; content/media gates remain               |
| 5b. Practice areas                          | Review   | Hub/menu and nine detail previews; full detail content supplied only for Corporate         |
| 5c. Client alignment and SME/legal previews | Review   | Shared catalogue, consent controls, copy corrections and three route previews              |
| 5d. People directory and profiles           | Review   | Editorial directory, four profiles, shared popup/page and data-driven filters              |
| 5e. Selected matters listing and details    | Review   | Four sourced experiences, separate instructions, consent-gated static routes               |
| 5f. Insights listing and articles           | Review   | Shared Home catalogue, server pagination, rich reading/share UX and demo-only data         |
| 5g. Contact page and enquiry form           | Review   | Reason-first form, preview submission, offices and maps; no email delivery yet             |
| 5h. Codebase clean-up                       | Review   | Licence, security headers, plan docs, folder tidy, comment pass, quick speed wins          |
| 5i. Careers                                 | Waiting  | Design supplied; build waits for the firm's recruitment requirements (`routes/careers.md`) |
| 5j. Motion                                  | Later    | Site animations in the style of the iProduce Africa site; its own milestone                |
| 6. CMS and service integrations             | Later    | Plans in `integrations/`; providers connected only when their scope is approved            |
| 7. Launch readiness                         | Later    | Content, accessibility, SEO, security, and deployment verified                             |

## Open reminders

Everything else still to do is tracked in
[handover-checklist.md](handover-checklist.md). These two are Hassan's own
reminders:

- **Photos to WebP.** Convert the photographs in `public/images/` to WebP
  after the temporary images are replaced (`media-review.md`). The site already
  resizes and converts photos for visitors, so this mainly makes the repository
  and builds lighter.
- **Motion.** Add animations in the style of the iProduce Africa site. This is
  design work with its own milestone (5j): today the rules allow moving parts
  only in the Firm Journey and the Home hero, Home is on visual hold, and every
  animation needs a reduced-motion path. Measure site speed after it lands.

## Foundation completion gate

- [x] App Router scaffold exists without starter marketing UI
- [x] TypeScript strict mode and `@/*` alias are configured
- [x] Tailwind CSS and ESLint are configured
- [x] Prettier and Tailwind utility sorting are configured
- [x] Minimal scalable folders and documentation exist
- [x] Environment and ignore-file baselines exist
- [x] Local Git repository uses the `main` branch
- [x] Dependencies install successfully
- [x] Lint, type checking, and production build pass
- [x] GitHub remote configured; no CMS or application service is connected

## Temporary holding page boundary

The root route may present a restrained development notice before design work
begins. It is temporary, contains no CMS or business logic, and must not be used
as the source of truth for the future visual system. It remains `noindex` while
the full website is unfinished.

The homepage is now on visual review hold. The Firm presentation is implemented for review within its
approved scope. Practice areas is implemented within its screenshot-based scope.
SME and legal previews are implemented under the alignment spec. Other routes,
CMS, provider connections and deployment remain separate milestones.
