# Client feedback alignment

Implementation status: implemented for local review. Verification is recorded in
[the October log archive](archive/implementation-log-2026-10.md); content and consent gates remain.

## Client correction batch · 11 November 2026

From the client's review email; implemented for local review.

- Practice renamed to "Energy, Oil & Gas" in content, tests and docs.
- A.B. Mahmoud, SAN is "Co-founder & Managing Partner" everywhere. The separate
  `founderRole` field is gone; `role` holds the full title and wraps on cards.
- Selected matters and Careers are hidden from the header, mobile menu and
  footer until consent and launch readiness. Selected matters stays built with
  its approval checks unchanged. Careers is not built; its supplied design
  stays in the delivery plan pending the firm's recruitment-process response.
- Home firm-story card: the 1993 / 30+ / presence figures are removed; they
  stay in "The firm at a glance". The branded D&M cover stays until the
  photoshoot supplies the office photograph.
- FAQ "Still have questions?": the stock avatar circles are removed.
- Social icons (Facebook, LinkedIn, Instagram, X) stay visible for design
  review while their URLs await confirmation. Final links and media are checked
  before launch.
- Still open with the client: social URLs, preferred story media (the Legal
  Insights video suggestion), Careers timing, content and photo dates, the
  awards list and images, and the template line left in their email.

## Selected matters visual preview · 3 November 2026

The user approved and requested implementation of the listing/detail wireframe.
`/experience` and its four organisation-led detail pages may show sourced pending
records while no-index, with a publication-approval note. Withheld records remain
hidden and indexable output is approved-only. This does not restore pending Home
matters or change the later practice-carousel hiding decision. See
[routes/selected-matters.md](routes/selected-matters.md) for source and scope.
Replace temporary images before WebP conversion: [media-review.md](media-review.md).

## Practice experience visual-review exception

**Status: hidden again (31 October 2026).** The user asked to hide the carousel
pending client consent. In `components/practices/detail-page.tsx` the
`<ExperienceSection>` block, its imports and `experienceOptions` are commented
out (not deleted), and `getPracticeSections` gets no options, so only approved
experience counts and no "Selected experience" link appears. Uncomment that
block to restore the review preview described below.

On 31 October 2026 the user explicitly requested restoration of the practice
experience carousel for design review. While `siteConfig.indexable` is false,
practice detail pages may show complete pending experience records with a visual
preview note. Sidebar links and slides use that same list. Records remain pending;
withheld records stay hidden. When indexing is enabled, only approved experience
renders. Home clients/matters and testimonials are unaffected by this exception.
This supersedes the practice-experience hiding rule below for the current preview.

## Authority and checkpoint

The user approved this implementation on 31 October 2026. This specification
supersedes conflicting current Home review-hold requirements only for the changes
below. Existing header/mobile navigation, hero autoplay, Firm Journey, identity
and imagery remain within their current review boundaries. All routes stay
no-index. CMS, providers and deployment are separate milestones.

Sources reviewed: the client's website feedback, the agreed project scope, the
firm's profile brochure and the supplied Practice areas screenshots. The brochure
is content evidence, not publication consent or a current roster. The latest
client feedback controls requested corrections. The user approved three scope
additions (nine practices, the SME page and Terms of Use), which await the firm's
written acknowledgement. Commercial terms are kept outside this repository.

## Before and after

- Home's six practice labels and footer abbreviations become projections of the
  same nine-record catalogue used by the hub and menu. Detail URLs remain stable.
  Home retains its selector/mobile accordion. Hero labels resolve from the same
  index; the transaction slide uses "Our expertise" while Capital Markets placement
  is pending. Its headline, photo and autoplay remain unchanged. Future enquiry choices derive from
  the same records, plus a separate "Not sure yet" choice. Capital Markets'
  placement remains for firm confirmation; no tenth practice is invented.
- Testimonials and their placeholders are removed. Client/logo and matter records
  gain `pending`, `approved` and `withheld` publication status. Only approved,
  complete records render. Existing named records start pending. Empty sections
  omit all chrome and spacing; one item has no carousel controls. Selection and
  counts derive from the visible collection, including practice experience.
- Consultation/chat copy becomes "Contact the firm". Enquiry wording remains.
  Office presentation uses "Abuja & Kano offices · Lagos liaison office", without
  numerical office counts. Use "full-service" consistently. Keep the X icon;
  social URLs and the Lagos phone remain unconnected until confirmed.
- The existing People nav item becomes "Our People". Reading copy describes the
  four available partners. Brochure biographies are prepared as isolated review drafts keyed to canonical
  people records; no new role, date, qualification or roster is assumed.
- Insights becomes "Dikko & Mahmoud Legal Insights Series". Article records may
  reference a canonical person as author; resolved bylines appear on cards and
  future detail pages. Unknown authors remain explicit preview gaps.

## New page presentations

`/sme-retainer` is an editorial page, linked from the practice hub and footer.
It has an introduction, Advisory and Secretarial tracks and existing enquiry
controls. Tracks sit side by side on desktop and stack on mobile. Missing service
copy is clearly marked; pricing, service promises and retainer terms are omitted
until supplied. This is an offering alongside the nine practices.

Privacy and Terms use one shared server-rendered layout: readable article on the
left, sticky document links on the right, simple Privacy/Terms link row on mobile.
Links navigate between actual routes, not tab panels. Sections are structured
content; each document owns its approved update date. No date is fabricated and
no policy text is copied from reference apps. Missing firm-approved text is a
visible local preview notice. Print hides navigation/chrome and uses the full
reading width. No oversized enquiry marketing card is placed on legal pages.

Reference patterns: iProduce Africa's legal reading column/right document nav and
Wardwise's compact document links/structured sections, adapted to this site's
serif typography, navy palette and shared chrome. No runtime, CMS or policy data
is copied from those repositories.

## Implementation batches and gates

1. Create this spec before runtime changes; update current
   docs without rewriting historical logs.
2. Apply catalogue consistency, removals, consent filtering and copy corrections.
3. Add SME and legal route previews, metadata and registry entries.
4. Keep People directory/profiles, Insights listing/detail, Careers and Contact
   as separately checked route milestones. Author presentation is prepared now;
   no dummy article route is activated.

The firm must confirm Capital Markets' placement/final naming, current biographies
and qualifications, item-by-item client/matter permissions, SME content, approved
legal text/update dates, social URLs and missing contact details. The full gas
company name is sourced from brochure PDF page 20: Nigerian Gas Production &
Transportation Company Ltd; its matter remains hidden pending consent.

## Acceptance and verification

- All nine practice titles, ordering and destinations match across the enabled
  surfaces. No old label list or testimonial placeholder remains rendered.
- Pending/withheld identities never leak through cards, sidebar links, no-JS
  fallbacks or serialized interactive props. Approved empty/single/multiple
  collections render with correct controls and selection.
- Biographies remain review drafts; authors are never invented. Legal pages have
  distinct metadata/current-document links and no invented policy or update date.
- SME is discoverable without being counted as a tenth practice. All new pages
  preserve the site's no-index switch, canonical metadata and single site shell.
- Unit tests cover content projections, approval filtering, fallback selection,
  author resolution and legal date/section rules. Browser checks cover 320, 390,
  768, 1024, 1280 and 1440px; keyboard navigation, reduced motion, no-JS reading,
  legal printing, header regressions and empty/single-item layouts.
- Documentation: formatting, path and consistency review. Code: format:check,
  lint, typecheck and tests. Production build at the completed route checkpoint.
  Record actual results in the implementation log; local checks are not launch
  approval.

## Route-specific requirements and remaining approvals

Recorded from `Website Feedback.docx` and later agreed checkpoints. People,
Insights and Contact now have implemented previews; Careers remains deferred.
Retain the no-index switch, `createPageMetadata`, `SiteLink`/`routes.*` and the
`launchedRoutes` step. Client acceptance and supplied content remain separate
from implementation. The complete delivery list is in
[handover-checklist.md](handover-checklist.md).

### People (`/people`, `/people/[slug]`)

- The menu item is "Our People"; keep that label. On 1 November the user also
  confirmed Selected matters as a separate main-menu entry, not a replacement.
  The approved profile popup/shareable-page slice and Claude handoff are in
  `routes/people.md` and `archive/handoffs/people-profiles-next-chat.md`; the directory
  was authorized on 2 November and is implemented for review (see the
  "People directory" section of `routes/people.md`).
- Show only the four partners until the firm supplies counsel and associate
  profiles. Do not reintroduce "senior counsel and a wider team" copy.
- A profile page and its pop-up/card must use the same, fuller content. The
  feedback found Sefiullahi Oseni's page almost empty while his pop-up was
  complete. Render both from one record; drafts live in `content/people-review.ts`.
- Bios, qualifications, memberships and dates await firm confirmation. Bello
  Aminu Abdullahi's membership is written two ways ("Member, Chartered Institute
  of Arbitrators" and "ACIArb (UK)"); use one confirmed form everywhere.

### Insights (`/insights`, `/insights/[id]`)

On 3 November the user authorised isolated demo articles and stock images for the
layout checkpoint, with no repeated pending-approval UI. The live CMS is deferred.
The implemented layout/content contract is `routes/insights.md`; demo contributor labels do not
attribute fabricated articles to real partners, and demo records cannot publish
when indexing is enabled. The existing firm/client/matter approval rules stand.

- Section name: "Dikko & Mahmoud Legal Insights Series".
- Every listing card and article shows its resolved authors (`authorIds` →
  the server repository, rendered with `InsightByline`). Home uses the same records. Counsel will contribute,
  so authors may be people outside the four partners once supplied. Never
  invent an author.
- The sample "Patent Registration in Nigeria" article had a body, contents
  list and category from a different article. Treat it as placeholder: title,
  body, "In this article" list and category must come from the same record.

### Careers (`/careers`)

- A design has been supplied. Implementation waits for the firm's response on
  its recruitment process; Careers remains in the proposal's scope.
- Hidden from the header, mobile menu and footer until ready. The route is
  reserved, not implemented. See [the Careers brief](routes/careers.md) for
  the CMS vacancy and email/external-application requirements.

### Contact (`/contact`)

- Header button: superseded on 2026-11-12. The earlier correction asked for
  "Make an enquiry" here, as on other pages. The user approved the
  designer's "Back to homepage" on `/contact` instead, because "Make an
  enquiry" would link to the page the visitor is already on. Confirm with
  the client at the next review, since this reverses their correction.
- Preferred office: in the proposal, removed by agreement on 2026-11-12 (a
  scope adjustment) to keep the form short. Visitors who prefer an office
  can say so in their message. That preference is separate from routing:
  the firm still decides who handles each enquiry.
- No chat wording ("chat to our friendly team"); the site has no chat. Use
  neutral wording such as "Contact the firm".
- Offices: "Abuja & Kano offices · Lagos liaison office" (`contact.officeSummary`).
  The Lagos phone stays off until the firm supplies one.
- Launched on 2026-11-12 for no-index review: practice-page enquiry buttons
  now open `/contact?practice=<slug>#enquiry` via `enquiryHref`.

### Site-wide, still open

- Social icons use the X logo; profile URLs stay unconnected until confirmed.
- Use "full-service" (hyphenated) in all new copy.
- Capital Markets placement is unconfirmed; do not add a tenth practice.
