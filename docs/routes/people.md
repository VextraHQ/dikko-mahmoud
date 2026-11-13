# People profiles and shared navigation

## Remaining proposal requirement · 12 November 2026

The directory currently filters by role and practice, with search. The proposal
also includes filtering by office. Confirm office assignments with the firm's
final roster, then add office references and filtering during the CMS pass.
Do not infer an office from biography text or change the approved presentation
before that data is available. See [the handover checklist](../handover-checklist.md).

## Approved editorial directory update (3 November 2026)

The user approved Codex's desktop/mobile wireframe after reviewing the designer's
new People screens. Implemented for local review: a compact navy introduction (without the large
boardroom image), a featured managing partner and the existing searchable
directory. The featured person appears once in the unfiltered layout; an active
search, role or practice filter hides that feature and searches the full eligible
roster. Clearing restores the opening layout. Current portraits remain intentional
fallbacks until approved assets arrive.

Keep shared header geometry, route-backed popups/standalone pages, URL filters,
separate search/global resets, mobile practice sheet and publication gates.
The directory gets dark header chrome; standalone profile pages stay light.
The four current partners are the only live roster: the user removed the sample
roster in the later review changes, which must be preserved. Pending featured
biography/milestones render only under the existing no-index preview rule; they
do not become approved by appearing in this design.

New source references: CleanShot screenshots supplied on 3 November at 1:05:46,
1:05:51 and 1:06:00 (hero, leadership/partners, repeated practice groups/CTA).
The approved combination keeps the leadership feature and directory filtering;
it does not repeat the same partners in separate practice groups. No office
photograph was approved for this compact hero.

## Approved checkpoint

Approved by the user on 1 November 2026: keep both **Our People** and **Selected
matters** in the main navigation; use **popup plus shareable profile page** for
people cards. Codex prepares this spec, the user gives the handoff to Claude,
and Codex reviews the implementation.

**Implementation status (1 November 2026, Claude):** the four-profile slice and
navigation below are implemented for local no-index review, awaiting Codex
review. See "Implementation notes" at the end for files, verification and gaps.

The first implementation slice is the four existing partner profiles and shared
navigation. On 2 November the user authorized the `/people` directory as the
next slice (see "People directory" below); it is implemented for local review.
Filters, search, pagination, office assignments and further team members stay
out of scope until confirmed data exists. The Selected matters listing and
detail routes remain a separate slice. Keep unavailable parent destinations as
SiteLink preparation notices; do not launch empty index pages.

## Source reference and precedence

Use the three desktop CleanShot references:

- `/Users/nabeelhassan/Library/Application Support/CleanShot/media/media_CRBxvUI9Sx/CleanShot 2026-11-01 at 2 .34.48@2x.png` — Home partner cards.
- `/Users/nabeelhassan/Library/Application Support/CleanShot/media/media_YhmiUcItgb/CleanShot 2026-11-01 at 2 .34.52@2x.png` — profile overlay top and two-column composition.
- `/Users/nabeelhassan/Library/Application Support/CleanShot/media/media_VFyNmJ44eE/CleanShot 2026-11-01 at 2 .35.01@2x.png` — biography, qualifications, focus and contact panel.

`Website Feedback.docx` requests Our People in the menu and the same fuller
content in profile pages and popups. The screenshot navbar's Selected matters
item is now an addition, not a replacement for People. The Home crop still shows
removed testimonials and unconfirmed wider-team wording; do not reinstate them.
The black arrows at the screenshot bottom are Figma prototype controls, not website
previous/next lawyer controls.

The source brochure is `/Users/nabeelhassan/Documents/Dikko & Mahmoud Docs/Dikko  Mahmoud Profile.pdf`.
Use its PDF pages 27–30 for the four partners, together with the supplied Mahmoud
profile screenshot. `content/people-review.ts` contains internal source notes,
not ready-to-publish biography paragraphs. Verify the original source rather
than rendering editorial review notes as a person's biography.

## Profile behaviour and routing

- Existing Home, Firm and practice PersonCards remain real SiteLinks to the
  canonical `/people/[slug]` URL. No separate popup URL, URL hash or copied
  quick-view biography is introduced.
- Client-side card navigation opens the profile over the originating page in a
  modal, updates the URL and preserves underlying scroll/selection state. Direct
  visits, refreshes, new tabs and no-JS visits render a standalone full profile.
- Back closes the modal and returns to the originating page. Forward reopens it.
  Close button, Escape and clicking the overlay dismiss via the intercepted
  history entry. No hover opening, autoplay or profile-to-profile paging.
- The full page has an ordinary Return home link, not a modal-style close button
  that might navigate away from the site. Add a directory action only once the
  actual directory route is available.
- Popup and full page render the same server-owned profile body. A profile must
  not have less biography/qualification content in one presentation than another.

Use installed Next intercepting/parallel routes. Read the installed guides before
writing code. Put a `@profile` slot under `app/(site)`, intercept
`(.)people/[slug]`, and render the overlay slot alongside the existing SiteShell
from the site layout. Provide null `default.tsx`, root `page.tsx` and catch-all
fallbacks so an inactive or unrelated route cannot retain a stale overlay.
The real `people/[slug]/page.tsx` owns the standalone view. Use Promise params,
static params for the four available slugs and notFound guards for unknown ones.
Do not duplicate the site header/footer/main inside the dialog body. Standalone
profiles use the existing light header. An intercepted overlay preserves the
origin page's header tone and active navigation; use the active base-layout route
context rather than restyling the background solely from the profile URL.

Reuse the installed Radix Dialog package with a small local shadcn-style wrapper;
keep routing, focus and browser state in a narrow client hook/shell. Route pages,
profile content, metadata and missing-content decisions stay on the server. Add
no modal/animation library. Extend SiteLink with a typed optional `scroll` prop
for real Next links if necessary; profile card links use `scroll={false}` and
unavailable notice buttons must not receive that anchor-only prop.

## Layout and accessibility

Desktop (`lg` and above): retain the white rounded editorial profile panel,
dimmed background and roughly one-third portrait/qualifications column beside
two-thirds identity, biography, focus and contact content. Reserve horizontal
space for long names and postnominals. Use the shared cap, brand typography and
existing rules/surfaces. Do not add a generic dashboard/card system.

The dialog is viewport-bounded, with one scrollable content body and a persistent
close control in its own reachable top bar. Use a 2rem total outer clearance on
desktop and safe-area-aware inset spacing. Keep the control within the dialog's
interaction region rather than copying the off-panel screenshot position.

Below `lg`, use a near-fullscreen modal with the same close bar and one scroll
region. Stack identity, portrait, biography, qualifications, focus and contact;
use a compact 4:3 portrait, not a tall full-height photo before the biography.
The standalone profile follows the same stack with the ordinary site header.
These are explicit responsive adaptations to the supplied desktop composition;
no mobile Figma match is claimed. Retain Home/Firm card crop overrides unchanged.

Focus the visible profile heading (`tabIndex=-1`) when opening the long dialog.
Trap Tab/Shift+Tab inside; lock background scrolling; support Escape and return
focus to the originating card on close. Use an accessible dialog title and omit
one giant aria-describedby spanning the biography. Explicitly test focus return
because route-backed dialogs do not automatically have a co-located DialogTrigger.
Use a labelled close button with a 44px target. Reduced motion is immediate;
otherwise use a short CSS opacity transition, without route-layout translation.
These requirements follow the [WAI modal-dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

## Canonical data and preview approval

Retain existing person IDs/slugs/names/card roles/portraits in `content/people.ts`.
A server-owned profile collection references those person IDs and contains only
profile-specific data: full display name, supplied postnominals, biography
paragraphs, qualifications/memberships, focus items and contact links. Keep review status in a small public availability
manifest keyed to canonical person IDs; do not duplicate status in two records. Do not create a second team roster or duplicate names/roles unnecessarily.
Use optional fields and omit missing secondary sections rather than inventing them.

Populate fuller source-backed draft biographies for all four partners. Use the
Mahmoud screenshot and brochure as evidence, including the fuller Sefiullahi
content. Keep uncertain qualifications, current appointments, dates and Bello's
membership wording flagged in source notes; do not choose an unconfirmed version
merely to fill the UI. Contact may use a supplied personal email; omit the personal
contact panel where absent and offer the firm's confirmed general enquiry action.
No inferred office/group assignments, stock lawyer substitutions or new people.

This is a local no-index visual checkpoint. Source-backed draft profile text may
render with one clear review note while `siteConfig.indexable` is false. Publication
still requires firm confirmation. The profile resolver accepts an explicit
`allowPreview` option from the server presentation boundary and returns only an
approved profile, or a complete source-backed preview when that option is true.
Withheld records remain unavailable. Do not import siteConfig into people.ts:
siteConfig → firm → people already exists and would create a circular dependency.
Do not import all draft profiles into navigation or client components. Pass only
the selected profile's presentation data/children through the modal boundary.

A PersonCard's available state must derive from that same resolver; do not leave
it hard-coded false or bypass it with available=true for every person. Add only
available profile paths to launchedRoutes using that small public manifest and
shared availability rules, never by importing private biography bodies into
lib/routes.ts or a client bundle. Tests must ensure every manifested available
slug has a complete profile body. Leave `/people` and `/experience`
unlaunched until their own index pages exist. Direct/unknown profile metadata
uses the existing metadata builder and no-index switch. Treat a missing profile
as a real not-found state with one site shell, including inside intercepted routes.

## Shared main navigation

Order: Home · The firm · Practice areas · Our People · Selected matters · Insights
· Careers · Contact. Use existing routes.people and routes.experience. No route
rename to `/selected-matters`, no removal of the People destination. Keep real
links/notices, active treatment, keyboard navigation, Sheet close behaviour and
the practice mega menu's controlled state.

Eight items need more width. Set the full-navigation breakpoint to **90rem
(1440px)**; below it use the existing compact Sheet, rather than squeezing labels
or hiding a destination. Update the shared desktopNavigation media query and
all matching full-nav/compact-nav visibility and breakpoint-reset classes together.
Do not change the `lg` hero or profile layout breakpoint, or use a new global
Tailwind breakpoint. Check 1280/1366px uses the Sheet and 1440px fits the full row.
The two new/current unbuilt parent entries remain preparation notices until
launched; full-profile identity is clear in the page heading. Keep the existing
availability-aware active-navigation semantics in this slice.

## Implementation boundaries and handoff

The authorised slice is profile content/route handling, real profile-card links,
shared navigation additions and the necessary breakpoint alignment. Preserve the
working diff, hero autoplay, Firm Journey, consent controls, legal/SME pages,
metadata/share-image work and unrelated refinements. Do not uncomment practice
experience or restore Home clients/matters as part of this profile task.

Do not build directory filters, Selected matters routes, CMS, providers,
deployment, a new contact form or a new general motion pass. The directory
itself was authorized on 2 November (below); office metadata still awaits
confirmation. The Selected matters source brief has separate outstanding gates.

## Acceptance

- The same full content appears in popup and direct page for all four slugs;
  missing data remains intentionally absent or explicitly pending.
- Home/Firm/practice card activation, direct URL, reload, new tab, no-JS, Back,
  Forward, overlay/close/Escape dismissal and navigation away behave as above.
- Underlying scroll/selection and focus return survive modal open/close. Long
  text and close controls fit at 320/390/768/1024/1280/1366/1440px, keyboard zoom
  and reduced motion. Do not introduce nested reading scroll areas.
- Both nav entries remain present; 1366px uses the Sheet and 1440px has no clipping.
  Existing practice submenu, light/dark headers and unavailable notices still work.
- Four profile paths have correct canonical/no-index metadata; unavailable and
  unknown slugs do not leak draft data or duplicate chrome. Unbuilt parent paths
  remain notices. Withheld profiles never render, including no-JS/refresh paths.
- Unit tests cover ID/slug references, source-ready preview/approved/withheld
  availability and shared presentation selection. Browser review covers the
  history/focus/scroll behaviour above and existing card regressions.
- Run format:check, lint, typecheck, test and a production route/layout build.
  Record actual results, known gaps and changed files in the implementation log.
  Hand back to Codex for review; local checks do not equal client publication
  approval.

## Implementation notes (Claude, 1 November 2026)

Files: `content/profile-manifest.ts` (public IDs/status), `content/profiles.ts`
(server-only bodies, copy and `resolveProfile`), `lib/preview.ts` (the single
`allowPreview` switch), `isPublishable` in `lib/publication.ts`,
`components/people/profile-body.tsx` (shared server body),
`components/people/profile-dialog.tsx` + `hooks/use-profile-dialog.ts` (client
shell), `components/ui/dialog.tsx`, `hooks/use-site-pathname.ts` (origin page
under an overlay), `app/(site)/@profile/**`, `app/(site)/people/[slug]/page.tsx`
and `app/(site)/[...catchAll]/page.tsx`. `content/people-review.ts` now holds
internal source notes only.

Decisions made during implementation:

- `useSelectedLayoutSegment("profile")` drops the `(.)people` segment (Next
  treats leading-paren names as groups), so overlay detection compares the
  site layout's `children` segments with the URL on `/people/*` paths only.
- The `@profile` null catch-all makes every URL match the (site) layout; without
  a matching `children` catch-all, unknown URLs rendered an empty page. The
  `(site)/[...catchAll]` page calls `notFound()` (page and metadata), so unknown
  paths keep the 404 title and render once inside the site shell.
- A client-navigated unknown profile shows a small "profile isn't available"
  dialog over the origin page (segment `not-found.tsx`); direct loads 404.
- Focus return captures the opening link on first render (Radix moves focus to
  the heading before parent effects run) and falls back to the first visible
  link to that profile; it uses a task rather than a frame so it also runs in
  background tabs.
- Bello's postnominals, Aminu's years of practice and Mahmoud's current boards
  are omitted pending confirmation (see people-review.ts). Bello's memberships
  use the brochure's "member of" wording; grades are unconfirmed.
- No portraits are in the repository; every profile uses the initials fallback.
- The footer logo keeps its `xl` size; only header/sheet visibility and logo
  sizing moved to `min-[90rem]`. The sheet's logo stays compact at 80–90rem.

Remaining gaps: firm confirmation of all four profiles (all `pending`), approved
portraits, whether Mahmoud's personal email is public, People directory and
Selected matters routes (still preparation notices), and a no-JS check of the
popup (cards are plain links, so no-JS visits load the standalone page).

### Review fixes and popup polish (Claude, 2 November 2026)

- **Popup metadata.** Both profile routes export `generateMetadata` through
  `profileMetadata` in `lib/people/profile-metadata.ts`. Next 16 sends intercepted-route
  metadata in the response but does not apply it on soft navigation (it is
  attached to the unchanged `children` segment), so the dialog also syncs the
  same title, description and canonical (`profileDocumentMeta`) with
  `hooks/use-document-metadata.ts` and restores the origin page's values on close.
- **Enquiry destination.** `EnquiryButton` moved to
  `components/shared/enquiry-button.tsx` and uses `enquiryHref(contact.email)`:
  a mailto to the firm until `/contact` joins `launchedRoutes`, then a SiteLink.
  Profiles show it in the header row and as the contact panel fallback when no
  personal email is supplied.
- **Per-person links (Sanity-ready).** `lib/people/profile-links.ts` defines
  `links: { platform, value, label? }[]` with one platform list (`linkedin`,
  `email`, `phone`, `website`) for the future schema `options.list` and for
  defensive filtering of fetched data. Values are validated (http(s) URLs only,
  so a bare domain never becomes a site path), deduplicated and ordered. Icons
  render only for supplied links; firm social accounts stay in the footer.
- **Popup bar.** The name (and role from `sm`) fades into the bar once the
  heading scrolls out of view; a copy-link button copies the canonical URL and
  announces "Link copied". Both are decorative/additive; the heading still
  names the dialog.

Still to supply: LinkedIn URLs and direct lines for each partner, and the Sanity
`links[]` field when the CMS checkpoint starts.

### Page redesign to the Figma profile frames (Claude, 2 November 2026)

User-approved after a wireframe review. Popup and page keep identical content;
only the layout differs.

- **Standalone page** (`People / 02 · Profile` frames): full-bleed pale intro
  band (Back to our people, role, name, postnominals, one-line summary,
  "Enquire about {shortName}", supplied link icons, preview note; portrait on
  the right, above the name on phones). Below it, a sticky "On this page" list
  (desktop only, `lg:top-28` like the practice sidebar, current section marked
  by `hooks/use-active-section.ts`) beside Overview, Areas of focus,
  Qualifications and the "Start with a conversation" panel. Then "Meet more of
  our people" (other available partners via `relatedProfiles`) and the shared
  EnquiryCta.
- **Popup**: the same intro band and sections; no contents list or related
  people. From `lg` the biography takes the left column and Areas of focus and
  Qualifications move into a side column aligned under the portrait (same
  `1.6fr/1fr` grid and gap as the intro); the enquiry panel spans both. This
  removed the empty right-hand strip of the single 768px column and roughly
  halves the scroll. Phones stack in the page's order. The bar adds "Open full
  profile page".
- "Back to our people" is a SiteLink to `/people`; it became a real link when
  the directory launched (2 November).
- Related-people cards and the popup's open-page button use a full page load
  (`SiteLink fullPageLoad`), because a client navigation to `/people/*` is
  always intercepted into the popup.
- Content additions: `shortName` per profile (Bello, Aminu, Sefiullahi,
  A.B. Mahmoud: for firm confirmation), shared Overview heading from Figma,
  `profileSectionLinks` and prefixed `profileSectionIds` (no clashes with an
  origin page's ids). The info@ address under the intro button was dropped as
  redundant; a personal email, once approved, appears as an icon and in the
  closing panel.

Codex review follow-up, then Sonner: copy link no longer fails silently.
`useCopyLink` shows a success toast ("Link copied", 2.5s, check icon on the
button) or an error toast ("Couldn’t copy the link" with "Copy it from your
browser’s address bar instead.", 5s) when there is no Clipboard API, the
context is insecure or permission is denied. Both reuse one toast id, so
repeated clicks never stack. Because the modal hides the toast region from
assistive technology, the dialog's `role="status"` text announces the same
outcome.

## People directory (Claude, 2 November 2026)

Authorized by the user on 2 November. No separate directory screenshot exists,
so the page adapts the supplied People-card references and the profile styling.

- **Composition (updated 3 November)**: compact navy introduction (Eyebrow
  "Our People", two-line serif h1, one short paragraph), a server-rendered
  managing-partner feature and a portrait grid of the canonical `PersonCard`s,
  then the shared `EnquiryCta` and footer. Grouped and filterable since the
  scalable pass below; no pagination or infinite scroll.
- **Responsive adaptation**: one column below 28rem (448px) with 4:3 portraits
  so a phone shows a name without a full-screen image; two columns from 28rem
  with square portraits; four columns from `lg` (1024px), or three when the
  remaining/current result group has three people. Names wrap rather than
  truncate. Checked at 320, 390, 480, 768, 1024 and 1440px with no horizontal
  overflow.
- **Hover**: `PersonCard imageHoverOnly` zooms only the portrait (scale 1.02,
  550ms `ease-editorial`) on portrait hover or card keyboard focus, under
  `motion-safe` only. Hovering the name underlines it and never moves the image.
- **Who is listed**: `directoryPeople(previewOptions)` in
  `content/profile-manifest.ts`: named people whose profile is linkable under
  the preview rule, in roster order. At launch only approved profiles show and
  withheld ones never do. `/people` joins `launchedRoutes` only when that list
  is non-empty, so the page is never empty; the page also 404s if it is.
  `relatedProfiles` reuses the same rule ("directory minus the current person").
- **Behaviour**: cards are soft links, so the `@profile` interceptor opens the
  existing popup over the directory (Back/Forward, focus return to the card,
  scroll position, copy-link toasts and "Open full profile page" all
  unchanged). Direct visits keep the standalone page. The header uses dark
  chrome on `/people` and light chrome on standalone profiles. "Our People",
  Home's "Meet our lawyers", the footer
  link and "Back to our people" are now real links.
- **Draft copy for firm confirmation**: heading "Experienced minds. A personal
  commitment." and the introduction paragraph in `peopleDirectory`
  (`content/people.ts`).
- **Open**: office assignments, counsel/associate profiles, approved portraits
  (initials fallback until then). The footer label is "Our People", matching the main navigation.

### Scalable directory: groups, search and filters (Claude, 2 November 2026)

Approved by the user, with Codex's conditions, for a roster of 25–60+ people
once Sanity supplies it. The designer's screenshot was the starting point; the
duplicate role dropdown/links, the Search button and "View profile" lines were
dropped (results update as you type, and the whole card is the link).

- **Data**: `Person.seniority` is explicit (`seniorityGroups` in
  `content/people.ts`: Partners, Counsel, Senior associates, Associates; names
  beyond Partners await the firm's roster). `Person.practiceIds` holds
  confirmed practice slugs only; none are confirmed yet, so no card shows a
  practice and the practice filter is omitted.
  `lib/people/directory-data.ts` builds the page data on the server: slim
  `DirectoryPerson` records (card fields plus practice titles, never
  biographies) and only the role/practice options someone actually holds.
- **Rules** (`lib/people/directory.ts`, tested in
  `tests/people-directory.test.ts`): accent/case/punctuation-insensitive search
  where every word must match name, role or practice; role and practice
  filters; seniority grouping in group then roster order; URL read/write with
  unknown values ignored; and the toolbar rule.
- **Toolbar threshold**: `peopleDirectory.toolbarMinPeople` (9) applies at
  launch. It counts the full eligible list, never filtered results, and the
  toolbar also shows whenever a URL filter is active so it can be cleared.
  During the no-index preview the toolbar always shows (user decision, 2
  November) so the firm can review it with four partners: today that is the
  search box alone, full width, because role pills need two or more roles and
  the practice dropdown needs confirmed practices. The search box only shares
  its row when the dropdown exists.
- **Views (updated 3 November)**: no filters → one eligible leadership feature
  plus remaining people under seniority headings; the total includes the feature.
  Filters → hide the feature and search the full roster in one flat grid with a
  `role="status"` count ("3 of 27 people"), or the shared `EmptyState` with reset
  and Contact the firm actions.
  Clearing returns focus to the search box. Role pills are native radios
  (arrow keys work) and scroll sideways on phones.
- **URL and popup**: `usePeopleFilters` reads `?q=&practice=&role=` once on
  load, then owns the filters, so opening a profile (URL `/people/slug`) never
  resets or reflows the list. It writes with `history.replaceState` 300ms
  after typing pauses: no history entry per keystroke, and it never writes
  while a popup is open.
- **Static page**: `/people` stays prerendered (○). The live directory sits in
  Suspense because it reads the URL; the fallback is the same `DirectoryView`
  with no filters, so the static HTML lists everyone in groups. A
  `<noscript>` style hides the toolbar when JavaScript is off, since it can't
  filter there.
- **Reusable empty state**: `components/shared/empty-state.tsx` (icon badge,
  serif title, description, actions; pale sky panel), modelled on
  iproduce-africa's `CatalogueEmptyState`. Insights search should reuse it.

**Measured with 60 people** (4 real partners plus 56 obviously fake records
from `tests/fixtures/directory-people.ts`, temporarily wired into the page and
given one sample portrait, then reverted; production build on localhost):

| Measure                    | 4 people (real)       | 60 people (test)         |
| -------------------------- | --------------------- | ------------------------ |
| `/people` HTML, raw / gzip | 130 KB / 17.8 KB      | 475 KB / 26.5 KB         |
| Rendering                  | Static (○), cache HIT | Static (○), cache HIT    |
| Biography text in HTML     | none                  | none                     |
| Portrait `<img>` tags      | 0 (initials)          | 56, all `loading="lazy"` |

- Page JS was 18 files, 222 KB transferred, the same shared site bundles as
  other pages (the directory adds no dependency).
- One optimised portrait at the grid's 2x size (w=640, WebP) was 19 KB
  (8.6 KB at w=384). That is for the sample image; real photos will differ.
- At 1440×900, 8 portraits sit within 1,250px of the first screen and 16
  within 2,500px (Chrome's lazy-load distances), out of 56. Actual loading
  wasn't observed: the in-app browser pane was hidden, which defers lazy
  images.
- Search to updated count took 1–66 ms per keystroke in that hidden
  (throttled) pane. The slowest cases switch between grouped and flat views,
  which re-renders every card. Filtering itself is a few string checks per
  person.
- In dev only, the Next overlay showed one React profiling error ("cannot have
  a negative time stamp" in `performance.measure`). It is inside React's
  dev-only timing code; the production build and server logged no errors.

Verified: 4-person static HTML (all four profile links, "Partners" heading, no
toolbar); 60-person toolbar, search, role pills, empty state, Clear (focus to
search), a shared filtered link (unknown `role` value dropped and the URL
tidied), popup over a filtered and scrolled list (heading focused, scroll and
filter kept, Escape returns to `/people?role=partner` with focus on the card),
375px with no horizontal overflow. Home and Firm cards are unchanged
(`PersonCard` only gained an optional `detail` line).

### Directory UX refinement (Codex, 2 November 2026)

The user rejected the initial floating search panel and decorative shadow treatment.
The revised direction is for visual review: the supplied pale editorial introduction
with "Our People" eyebrow, "People you can move forward with." headline and
its original supporting copy; a plain full-width search field with a bottom rule; a quiet live
count and unboxed seniority groups. Keep portrait shadows and decorative group
rules off this directory. Portraits remain square from 448px and 4:3 below it;
shared PersonCard hover/focus defaults are retained.

The visible search label and count share a row. The hint mentions practice only
when confirmed practice options exist. A labelled 44px clear control resets all
filters through the existing handler; matching results retain their heading space.
Home/Firm/profile-card defaults, preview/launch visibility, filter/history rules and
no-JS reading remain intact. This supersedes the rejected overlapping-panel proposal.

### Empty-state refinement (2 November 2026)

The directory's zero-result state uses the compact shared pale panel: smaller
icon, reduced padding and "No matching profiles" as its h2. The redundant
"Matching people" heading is hidden for zero results. "Clear search" is the
primary recovery action for text-only searches; combined role/practice filters
use "Clear filters" and filter-aware guidance. "Contact the firm" is a secondary
text link using the shared enquiry destination rule. Clear restores focus to
search. Other grouped and matching-result states are unchanged.

### Practice select and temporary scale preview verification

The practice filter uses a responsive presentation, with the same navy underline
as search while focused/open. From 64rem, a themed Radix/shadcn-style Select opens
below the field with a maximum height of 18rem, further constrained by the remaining
viewport space. Options scroll instead of expanding over the introduction. Long
selected titles truncate within the field; option labels wrap.

Below 64rem, the existing Radix Dialog presents a bottom sheet titled "Practice
area", with a 44px close button, selected checkmark and safe-area padding. Its list
scrolls within a maximum 85svh panel while the background stays locked. Choosing an
option applies immediately, closes the sheet and returns focus to the trigger.
There is no Apply step or drag handle. Escape/backdrop/close dismiss without changing
the selection. Switching across the breakpoint closes an open picker.

`PracticeFilter` owns presentation and `usePracticeFilter` owns responsive/open
state. Both presentations use the same value callback and hidden form field, so
practice selection combines with search/roles and resets through Clear filters.
The search field's × appears only for entered text and clears that text alone,
preserving practice and role. When either of those filters is selected, a visible
"Clear filters" action beside the result count resets the entire form and URL.
Both reset actions return focus to search; the picker still offers All practice
areas for clearing only that selection.
Role pill labels are positioned containers for their hidden radios, fixing the
mobile overflow exposed by the sample roster. The sample roster was removed on 3
November at the user's request; synthetic people now exist only in
`tests/fixtures/directory-people.ts`.

## Polish review · 12 November 2026

- The standalone profile uses the shared detail hero (`ProfileHero`): "Our
  People" trail, role as the label, postnominals under the name, portrait in
  the photo frame, enquiry button and links on the bottom rule. The sky band
  and the separate back link are gone; phones get the trail's back link (PR1).
- Career milestones are a year and description list (`MilestoneList`),
  below the hero on the page and after the links in the popup (PR2).
- Person cards have no arrow circle, on every page including Home (PE1).
