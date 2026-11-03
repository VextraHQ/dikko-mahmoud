# Roadmap

## Current objective

The client-alignment pass is implemented for local review; see
[client-alignment.md](client-alignment.md) for the authoritative before/after scope.
Home and The Firm retain their identity/media review holds except for the approved
corrections. The public practice index now drives nine practices across Home,
hub, navigation, footer and future enquiry options. Testimonials are removed.
Pending clients/logos and named matters are stored but hidden on Home; empty sections reserve no space. The user has
restored practice-detail experience for no-index visual review with a preview
note. Consent stays pending; withheld records and unapproved launch content
remain hidden.

SME retainer, Privacy Policy and Terms of Use previews are implemented. SME tracks
await supplied copy; legal bodies and approved dates are absent and explicitly
marked. These are working route presentations, not publication approval.
Article-author references and brochure biography drafts are prepared; no author or
unconfirmed profile copy is invented. People, Insights, Careers and Contact routes
remain separate milestones; their client requirements are listed in
`client-alignment.md` → "Requirements for pages not yet built". The scope addendum includes nine practices, SME and
Terms at the existing fee, but remains a draft awaiting client acknowledgement.

Capital Markets placement, final practice names, current biographies, media,
permissions, SME/legal text and missing contact details remain firm review gates.
Sanity, other providers, deployment and the later Claude workflow remain outside
this checkpoint. User-added Analytics, hero autoplay and Firm Journey are preserved.

## Next delegated implementation slice

On 1 November the user confirmed profile popups plus shareable standalone pages,
and both Our People and Selected matters in main navigation. The approved bounded
spec is [routes/people.md](routes/people.md), with the paste-ready Claude prompt
in [handoffs/people-profiles-next-chat.md](handoffs/people-profiles-next-chat.md).
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

## Status

| Milestone                                   | Status   | Outcome                                                                            |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| 1. Repository foundation                    | Complete | Local Next.js, TypeScript, Tailwind, ESLint, Prettier, docs, and Git foundation    |
| 1a. Temporary holding page                  | Complete | Responsive, no-index interim screen pending approved design work                   |
| 2. Figma audit and homepage brief           | Complete | Frames, brand direction, section map, and provisional content identified           |
| 2a. Fonts, tokens, and shadcn foundations   | Complete | Lean reusable system derived from the supplied design                              |
| 2b. Navigation and hero                     | Review   | Responsive checkpoint with manual fades, text motion and image preparation         |
| 2b.1 Firm facts and story                   | Review   | Responsive sections, shared firm content, placeholders and one-time reveals        |
| 2b.2 Sticky navigation and selected clients | Review   | Route-aware header and accessible placeholder marquee                              |
| 2b.3 Practice-area explorer                 | Review   | Nine shared practices, desktop index, mobile accordion, photo placeholders         |
| 2b.4 Selected matters                       | Review   | Consent-gated records; pending matters hidden; approved selection fallback         |
| 2b.5 Maintainability audit                  | Review   | Style ownership, click-only matters, accessibility fixes and aligned docs          |
| 2b.6 People, client perspectives, insights  | Review   | Four-person preview, testimonials removed, article-author support                  |
| 2c. FAQ, enquiry CTA and footer             | Review   | Shared Accordion/Avatar, two CTA surfaces, mobile/desktop overlap and footer       |
| 2c.1 Whole-page presentation QA             | Hold     | Homepage visuals held for client identity/content/imagery review                   |
| 2d. Final publication content               | Waiting  | Approved portraits, imagery, publication consent and destinations                  |
| 3. Information architecture                 | Scoped   | Firm route, shared ownership and destination activation mapped; other routes later |
| 4. Desktop and mobile design references     | Supplied | User-provided Figma frames; missing states resolved during audit                   |
| 5. Secondary-page implementation            | Review   | Firm and Practice areas previews; other routes remain separate                     |
| 5a. The Firm                                | Review   | Route, shared reuse and interactions implemented; content/media gates remain       |
| 5b. Practice areas                          | Review   | Hub/menu and nine detail previews; full detail content supplied only for Corporate |
| 5c. Client alignment and SME/legal previews | Review   | Shared catalogue, consent controls, copy corrections and three route previews      |
| 5d. People directory and profiles           | Review   | Editorial directory, four profiles, shared popup/page and data-driven filters      |
| 6. CMS and service integrations             | Later    | Providers connected only when their scope is approved                              |
| 7. Launch readiness                         | Later    | Content, accessibility, SEO, security, and deployment verified                     |

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
