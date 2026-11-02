# People profiles and shared navigation

## Approved checkpoint

Approved by the user on 1 November 2026: keep both **Our People** and **Selected
matters** in the main navigation; use **popup plus shareable profile page** for
people cards. Codex prepares this spec, the user gives the handoff to Claude,
and Codex reviews the implementation.

**Implementation status (1 November 2026, Claude):** the four-profile slice and
navigation below are implemented for local no-index review, awaiting Codex
review. See "Implementation notes" at the end for files, verification and gaps.

The first implementation slice is the four existing partner profiles and shared
navigation. The `/people` directory, its filters and the Selected matters listing
and detail routes remain separate slices. No directory/mobile directory reference
was supplied. Keep unavailable parent destinations as existing SiteLink preparation
notices until their actual pages are built; do not launch empty index pages.

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

Do not build the People directory, filters, Selected matters routes, CMS,
providers, deployment, new contact form or a new general motion pass. The next
People-directory slice needs its own composition/reference and confirmed office
metadata; the Selected matters source brief has separate outstanding gates.

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
  `profileMetadata` in `lib/profile-metadata.ts`. Next 16 sends intercepted-route
  metadata in the response but does not apply it on soft navigation (it is
  attached to the unchanged `children` segment), so the dialog also syncs the
  same title, description and canonical (`profileDocumentMeta`) with
  `hooks/use-document-metadata.ts` and restores the origin page's values on close.
- **Enquiry destination.** `EnquiryButton` moved to
  `components/shared/enquiry-button.tsx` and uses `enquiryHref(contact.email)`:
  a mailto to the firm until `/contact` joins `launchedRoutes`, then a SiteLink.
  Profiles show it in the header row and as the contact panel fallback when no
  personal email is supplied.
- **Per-person links (Sanity-ready).** `lib/profile-links.ts` defines
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
- "Back to our people" is a SiteLink to `/people`, so it shows the preparation
  notice until the directory launches.
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
