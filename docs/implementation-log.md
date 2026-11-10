# Implementation log

Append-only factual history for the current month. Older entries are in
`docs/archive/` (for example `archive/implementation-log-2026-10.md`).

## 2026-11-03 — Shared back link and contents list

- New `BackLink` (`components/shared/back-link.tsx`) replaces the visible
  breadcrumb on Insights articles, practice areas ("All practice areas /
  category", category links to the filtered catalogue), selected matters, SME
  and the legal pages. The duplicate category eyebrow above practice and
  matter titles moved into that line. `components/ui/breadcrumb.tsx` is now
  unused but kept as a primitive.
- New `ContentsList` and `PageContents` (`components/shared/`): the article
  contents and the practice "In this practice" card share one list with a
  left rule and an active-section marker that follows scrolling.
- Passed format:check, lint, typecheck, 153 Vitest tests and production build.

## 2026-11-03 — Insights: practice strip, compact cards, home heading

- Practice area pages show "Latest on <practice>" (`components/practices/insights-section.tsx`)
  with up to three newest tagged articles from `getPracticeInsights`
  (`lib/insights/repository.ts`) and a link to the filtered archive. Hidden
  when a practice has no articles.
- New `CompactArticleCard`; `ArchiveCard` shows it on phones in the archive
  and related list (nine items: ~1,200px instead of ~4,700px), full cards from
  `sm` up.
- Article pages replace the visible breadcrumb with "← All insights / category"
  (category links to the filtered archive). BreadcrumbList structured data is
  unchanged.
- Home insights heading (user-approved change to the held Home): eyebrow
  "Legal Insights Series", heading reuses the Insights hero lines.
- Phone article prose spacing tightened; temporary preview types removed.
- Passed format:check, lint, typecheck, 153 Vitest tests and production build.

## 2026-11-03 — Insights follow-up: featured once, calmer filters

- The featured article now always sits in the Insights hero and is left out of
  the unfiltered archive, so it never shows twice (26 archive items, 3 pages);
  search, type or practice filters can still find it. Removed
  `defaultInsightView`; filters no longer jump the page when the hero changed.
- Finished reveals are marked complete on `animationend`
  (`useRevealOnScroll`), so cards no longer replay their fade-in when a filter
  reorders the list.
- Cards lost the hover shadow and lift (border and image zoom remain). Type
  badges are solid white with a hairline ring for any photo.
- More than five publication types switch the pill row to a dropdown/sheet.
- Fixed `useArticleShare` edits: copy/share buttons pass the URL explicitly,
  and a failed native share falls back to copying again (an always-false
  condition had disabled that).
- ESLint now requires a blank line around functions and exports
  (`padding-line-between-statements`); `eslint --fix` applied 115 fixes.
- Passed format:check, lint, typecheck, 152 Vitest tests and production build.

## 2026-11-03 — Insights UX polish and content model

- Fixed Back losing scroll position site-wide: removed the global smooth
  scroll from `app/layout.tsx`. In-page contents links now use `SectionLink`
  (`lib/scroll.ts`), which scrolls smoothly per click, respects reduced
  motion and replaces rather than pushes the hash. Used on article, practice
  and profile contents. `useActiveSection` now holds a clicked entry until the
  scroll settles; the article hook reuses it. Back to top goes to the page top.
- Added a light, noindex article 404 (`app/(site)/insights/[id]/not-found.tsx`)
  with latest insights, so the light header logo stays legible.
- Toolbar now matches People: underlined search, practice menu/sheet, type
  pills, compact sort, aligned count and Clear filters. New shared
  `FilterSelect` (also used by People) renders menu and sheet together and
  lets CSS choose, removing the refresh flash from the native-first swap.
- Pagination uses a shadcn-style `components/ui/pagination.tsx` via SiteLink.
- Cards: type badge with icon, clamped excerpt, byline/date/read-time row,
  arrow that fills on hover, subtle lift and image zoom, `RevealGroup` entrance.
  Featured badge, author row and share hover states on hero/article.
- Article bodies: `@tailwindcss/typography` prose wrapper; Portable Text
  builders in `lib/insights/blocks.ts`; bodies moved to
  `content/insight-bodies.ts` with hand-written samples for the featured and
  homepage items. Tall body images crop to landscape.
- Practices are optional (0..n). Added a `firm-news` type; cards fall back to
  the type label as category. 18 credited Unsplash images, no repeats per page
  (see `docs/insights-media.md`).
- Passed format:check, lint, typecheck, 152 Vitest tests and production build.
  Production server: 404 for a missing article (noindex), 307 for `?page=99`.
  Back restored 1500px in the dev browser. Smooth-scroll animation could not
  be observed in the background browser pane (animation frames paused).

## 2026-11-01 — Simplified social artwork

- Removed the decorative right-hand globe from the editable social export master
  and regenerated both static PNGs with uninterrupted deep navy on the right.
  Logo, headline, left margin/rule, descriptor, year and crop positions are unchanged.
  Open Graph remains 2400×1260 (174146 bytes); Twitter remains 2400×1200
  (171516 bytes). Updated the current design decision in `docs/social-sharing.md`.
- Visually inspected the finished PNG. Passed format:check, lint, typecheck,
  61 Vitest tests across ten files, production build and git diff --check.
  Both production image artifacts match the source PNG bytes/dimensions and
  retain image/png. Built Home and Firm HTML retain the expected image URLs,
  dimensions and large Twitter card metadata. No metadata or indexing change;
  external share recognition remains at the previously recorded preview gate.

## 2026-11-01 — People/profile and Selected matters source briefs

- Added draft route briefs from six supplied desktop screenshots. People/profile
  behaviour and final main navigation remain explicit pending decisions; the
  supplied Selected matters header conflicts with the written request to add Our
  People. Testimonial/wider-team content in the crops does not supersede the
  alignment corrections.
- Recorded route-backed popup plus standalone profile as the recommendation, not
  an implemented or approved choice. Selected matters listing is separately
  documented; mobile/detail references and its named-content preview treatment
  remain outstanding before an executable Claude handoff.
- Added both briefs to the documentation index. Targeted Prettier checks and
  git diff --check passed. No runtime files changed and no code tests/build run.

## 2026-11-01 — Profile/navigation choices confirmed and Claude handoff

- User confirmed popup plus shareable standalone profiles and both Our People
  and Selected matters in main navigation. Finalised routes/people.md for a
  bounded four-profile/navigation slice and added the paste-ready Claude handoff.
- Spec separates the unprovided directory design and Selected matters routes
  from this slice. Records the responsive profile adaptation, 1440px full-nav
  threshold, shared content, preview/publication gates and modal/history/focus
  acceptance checks. No runtime implementation is claimed.
- Updated the Selected matters draft, client alignment, roadmap and documentation
  index. Targeted formatting, source/path checks and git diff --check passed.
  No runtime files changed and no code tests/build were needed for this handoff.

## 2026-11-01 — People profiles (popup + page) and eight-item navigation

- Implemented docs/routes/people.md for the four partners: route-backed Radix
  popup over Home/Firm/practice pages via `@profile/(.)people/[slug]`, and a
  standalone `/people/[slug]` page for direct/refresh/new-tab/no-JS visits. Both
  render one server `ProfileBody` from `resolveProfile`. Null default/root/
  catch-all slot pages plus a `(site)/[...catchAll]` 404 page.
- Source-backed draft bodies from brochure pp. 27–30 and the Mahmoud screenshot;
  uncertain items moved to internal notes in people-review.ts. One preview note
  renders while no-index; at launch only approved, complete profiles resolve,
  and withheld never do. PersonCard availability now comes from launchedRoutes.
- Navigation: added Selected matters after Our People (both remain preparation
  notices). Full navigation now starts at 90rem; header/sheet visibility and the
  practice-menu reset use `min-[90rem]` and `mediaQueries.desktopNavigation`.
  Overlays keep the origin page's header tone/active item via `useSitePathname`.
- Browser-checked on the running dev server: card open on Home, Firm and a
  practice page; heading focus; close button, Escape, Back, Forward; scroll kept
  (2900px before/open/after); focus returns to the opening card; direct load,
  canonical and noindex metadata; unknown slug 404 (one shell) and client-pushed
  unknown slug dialog; 1366px Sheet with all eight items; 1440px full row fits
  (nav 354–1143px inside the 80–1360px header); practice mega menu opens; mobile
  390px stack, 4:3 portrait and single dialog scroll body.
- Passed format:check, lint, typecheck, 73 Vitest tests across 11 files and a
  production build (eight profile paths prerendered as SSG). Not committed.

## 2026-11-02 — Profile review fixes and popup polish

- Codex review: the intercepted popup now shares the standalone profile's
  metadata (`lib/profile-metadata.ts`) and syncs title/description/canonical on
  soft navigation, restoring the origin page's values on close. The general
  contact fallback uses the shared `EnquiryButton` (moved to
  `components/shared/`), so it switches to Contact when that page launches.
- Added a validated per-person `links[]` model (`lib/profile-links.ts`) with
  icon links for LinkedIn/email/phone/website, rendered only when supplied.
  Popup bar gained a compact name on scroll and a copy-link button.
- Browser-checked: popup title/canonical/description match the page and restore
  on close; heading focus and focus return; compact name after scrolling; copy
  link (clipboard stubbed, since the pane denies clipboard writes) announces and
  resets; Bello's enquiry-only fallback with no icons; 375px popup bar and page
  with no overflow.
- Passed format:check, lint, typecheck, 77 Vitest tests across 12 files and a
  production build (eight profile paths prerendered). Not committed.

## 2026-11-02 — Profile page redesign to the Figma frames

- After a user-approved wireframe, rebuilt `/people/[slug]` to the supplied
  profile frames: pale intro band, sticky "On this page" list with the current
  section marked, Overview/focus/qualifications/working-together sections, "Meet
  more of our people" and the shared enquiry CTA. The popup reuses the intro and
  sections in a single column and gained an "Open full profile page" button.
- Browser-checked at 1440, 1024 and 375px: no horizontal overflow; contents list
  sticks at 112px and tracks the section in view (last section at page end);
  popup has no duplicate ids with its origin page; open-page and related-people
  cards load the standalone page rather than the popup.
- Passed format:check, lint, typecheck, 80 Vitest tests across 12 files and a
  production build (all profile paths prerendered). Not committed.
- Follow-up: the popup body is now two columns from `lg` (biography left;
  focus and qualifications in a side column aligned with the portrait; enquiry
  full width). Checked at 1440px (side column x/width equal to the portrait),
  1024px (522/326px columns, no overflow) and 375px (stacked, dividers kept).
- Codex follow-up: copy-link failures now show a visible, announced message in
  the popup bar for 5s instead of failing silently. Checked the failure path
  (the browser pane denies clipboard writes) at 1440px and 375px (two lines,
  not clipped) and the success path with a stubbed clipboard.

## 2026-11-02 — Sonner toasts

- User-requested, following iproduce-africa: added `sonner` (2.0.8) and a
  themed `components/ui/sonner.tsx` Toaster mounted once in `app/layout.tsx`
  (white surface, slate border, navy text/icons, Manrope, 12px radius, soft navy
  shadow, bottom-right with 24px offset, 16px on phones, no rich colours).
- Copy link now uses toasts for success and failure (one reused toast id), and
  the earlier in-bar failure text was removed. The popup keeps a screen-reader
  status because modal dialogs hide the toast region from assistive technology.
- Browser-checked in the popup: error toast (the pane denies clipboard writes)
  and success toast (stubbed clipboard) above the dialog at 1440px, one toast on
  repeat clicks, full-width toast 16px from the bottom at 375px, no overflow.
- Passed format:check, lint, typecheck, 80 Vitest tests across 12 files and a
  production build. Not committed.

## 2026-11-02 — Dead-code pass

- `tsc --noUnusedLocals --noUnusedParameters` reports nothing; every
  dependency is imported (`react-dom` via Next).
- Deleted the testimonial chain (`components/home/client-perspectives-section.tsx`,
  `components/home/testimonial-carousel.tsx`, `content/testimonials.ts`). An
  earlier entry recorded its removal, but the files were still in the tree and
  nothing imported them. The hero still uses `embla-carousel-fade`.
- `CopyLinkStatus` is no longer exported (used only inside the hook).
- Kept on purpose: unimported form primitives (prepared foundation, see
  forms.md), `profileLinkPlatforms` (future Sanity schema list), and test-only
  content rules for unbuilt pages (`practiceEnquiryOptions`,
  `publishableClients`, `publishableMatters`, `matterRecords`).

## 2026-11-02 — People directory

- Added `/people` (`app/(site)/people/page.tsx`, `components/people/directory-section.tsx`):
  pale introduction, 1/2/4-column PersonCard grid with portrait-only hover, shared
  enquiry CTA and footer. Draft heading/intro copy lives in `peopleDirectory`.
- Added `directoryPeople` to the profile manifest; `relatedProfiles` now reuses
  it, and `/people` joins `launchedRoutes` only when the list is non-empty.
  Header tone treats `/people` as a light page.
- Tests cover roster order, launch approval/withholding, the empty-at-launch
  case, directory launch gating and the related-profiles rule.
- Verified in the browser: 320–1440px without overflow, long-name wrapping,
  keyboard focus/zoom, motion-safe-only transitions, no-JS server HTML,
  popup open/scroll/Escape/Back/Forward/focus return, real directory links,
  sitemap and no-index metadata.

## 2026-11-02 — Scalable People directory

- Added explicit seniority groups and confirmed-only practice IDs to people,
  slim server-built directory records, and pure search/filter/group/URL rules
  with 12 tests (`tests/people-directory.test.ts`, synthetic 60-person fixture).
- Directory now groups by seniority, and from 9 people (configurable) shows
  search, practice and role filters with a live count, Clear and the new
  reusable `EmptyState`. Filters sync to the URL with debounced
  `replaceState`; the page remains statically prerendered via a Suspense
  fallback of the same view.
- Fixed a build-only failure found by `pnpm build`: the toolbar form's event
  handlers needed a client boundary in the server-rendered fallback.
- Measured a temporary 60-person production build (results in
  `docs/routes/people.md`), then restored the real page and rebuilt.

## 2026-11-02 — Directory search visible in preview

- `showDirectoryToolbar` now also shows the toolbar during the no-index
  preview (`allowPreview`), keeping the nine-person launch threshold and the
  active-filter rule. Role/practice controls still need supporting data, and
  search spans the full width when there is no practice dropdown.
- Tests cover launch threshold, active filters, the preview rule and the page
  data's preview flag. Browser-checked at 1440px (search 1280px wide, full
  row) and 375px: search, URL sync, empty state and Clear on four partners.

## 2026-11-02 — Codex directory UI refinement

- User requested direct UI/UX polish. Shortened the directory introduction and
  brought search/count into a white panel overlapping the intro boundary. Added
  a visible input label, data-aware search hint and in-field clear control using
  the existing filter reset. The count is concise enough for narrow screens.
- Consolidated group rules and removed the repeated count for a single group.
  Matching results retain the same heading space. Directory-only portraits are
  square from 448px, with restrained media-only shadow and keyboard ring; the
  shared Home/Firm/profile cards and filter/history rules are untouched.
- Browser checked at 320, 390, 768, 1024, 1366 and 1440px: no horizontal overflow;
  search match, zero-result state, clear/focus, and profile popup return with
  the filtered URL and opening-card focus retained. Saved desktop/mobile captures
  in /tmp/dm-people-polish. No Safari or JavaScript-disabled browser run.
- Formatting, lint, typecheck and all 100 tests passed. Standard Turbopack build
  hit the environment's local-port permission restriction, including a retry;
  the production build with `pnpm exec next build --webpack` passed and /people
  remains static. No dependency or deployment change and no commit.

## 2026-11-02 — Directory revision after user feedback

- User rejected Codex's floating search panel as too generic. Removed the raised
  panel, pale intro band, picture shadows and decorative group rules. Revised
  to a white editorial page, simple "Our people." title, underlined search and
  plain groups. Kept the in-field clear action, concise count, stable result
  heading and square directory portraits.
- This supersedes the visual treatment in the preceding entry; the filtering
  model, existing profile behaviour and shared card defaults are unchanged.

## 2026-11-02 — Directory search focus

- Replaced the search field's large rectangular focus outline with a navy inset
  underline and matching search icon. Kept an outline in forced-colours mode
  and the clear button's own keyboard focus. Browser verified the field focus;
  this is a local styling change with no filter/history changes.

## 2026-11-02 — Compact People empty state

- Applied the user-approved quieter empty state: reduced padding/icon, shorter
  copy, primary Clear search and secondary Contact the firm text link. Combined
  filters retain Clear filters wording. Zero results omit the duplicate heading.
- Browser checked at 1440px and 320px: no horizontal overflow; clearing restores
  all four cards and focuses search. The enquiry link uses enquiryHref so Contact
  activation still applies. Lint, typecheck and 100 tests passed. No new build
  needed for this small presentation change; no commit or deployment.

## 2026-11-02 — Restore supplied directory introduction

- Restored the user's supplied Our People eyebrow, "People you can move forward
  with." headline and supporting paragraph on the pale introduction. These were
  inadvertently replaced during Codex's simplification pass. Retained the revised
  search, focus and empty-state treatments with spacing below the introduction.
- Footer now says Our People, matching the main navigation. No other destinations
  or content records changed.

## 2026-11-02 — Temporary multi-group roster preview

- User requested sample cards to see the directory at scale before asking for
  deletion. Added an isolated no-index-only preview module: 28 sample cards plus
  four real partners, four seniority groups, and sample coverage of nine practice
  filters. Each synthetic name starts with Sample; a page note labels the mock
  assignments. Actual people, biographies and practice assignments are unchanged.
- Temporary switch: peopleDesignPreviewEnabled in content/people-design-preview.ts.
  Samples do not create profile routes or sitemap entries. Added tests for preview
  gating, switch-off, record isolation, categories and unavailable sample routes.

## 2026-11-02 — Themed directory Select

- User requested the application-themed shadcn dropdown instead of the browser
  native menu, matching the search focus. Added @radix-ui/react-select 2.4.1 and
  the small local Select wrapper; viewport-constrained options wrap, selected
  rows show a checkmark and sky tint, and the trigger uses the navy underline.
- Practice selection has an explicit callback and stays in FormData while
  changing search/role. Fixed horizontal overflow from the role pills' hidden
  radio inputs by giving each label its own positioned containing block.
- Browser checked option selection, combined search, Clear, keyboard End/Enter,
  Escape/focus return and the wrapping menu at 320px. Temporary sample roster
  remains enabled; actual partner assignments and profile routes are unchanged.

## 2026-11-02 — Responsive practice filter presentation

- Replaced the oversized directory menu on phones with a bottom sheet using the
  existing Radix Dialog: Practice area title, 44px close button, wrapping options,
  selected checkmark, internal scrolling and safe-area padding. Selection applies
  immediately and closes; Escape restores focus without changing the selection.
- Desktop retains Radix Select, anchored below the field and capped at 18rem or
  the available viewport space. Both use the same value callback and navy field
  underline. Responsive/open rules live in usePracticeFilter; changing across
  64rem closes the picker. No additional dependency or canonical data changes.
- Browser checked 1440×1000 and 1440×600 desktop placement, keyboard End/Enter,
  390×844 and 320×568 sheets, the last option on the short screen, body scroll
  locking, Escape/focus return, combined search/role/practice values, Clear, and
  breakpoint dismissal. No horizontal overflow or browser warnings/errors seen.
- Lint, typecheck, all 104 tests and the Webpack production build passed; /people
  remains static. The Webpack fallback follows the earlier sandbox restriction
  on Turbopack's local port binding. Sample roster remains active for the user's
  visual review. No commit or deployment.

## 2026-11-02 — Separate search and directory reset actions

- Search × now appears only when text is entered and clears only that text,
  preserving the selected practice and role. A visible Clear filters action by
  the result count appears for practice/role selections and resets all fields.
  Reset actions return focus to search. The count row reserves touch-target
  height so showing the action does not move the fields.
- Toolbar form changes now read only search/radio inputs. Practice already has
  its own callback; Radix's hidden native select must not feed stale form values
  back into the directory state.
- Browser checked combined text/practice/role filtering, clearing only text,
  practice-only reset with empty search, keyboard global reset, retained URL
  parameters and focus return at 320px and desktop. Temporary roster retained.
- Formatting, lint, typecheck and all 104 tests passed. No production build
  repeated for this focused interaction fix; no commit or deployment.

## 2026-11-03 — People directory review fixes

- Removed the temporary sample roster at the user's request
  (`content/people-design-preview.ts`, its test and the page's preview note).
  `/people` lists only the four partners again; synthetic people remain only
  in `tests/fixtures/directory-people.ts`.
- Intro description is partner-only again ("Meet the partners behind our
  advice…"), keeping the designer's heading; draft for firm confirmation.
- Added `EnquiryLink` beside `EnquiryButton` so the empty state's "Contact the
  firm" text link shares the one mailto/contact rule instead of repeating it.

## 2026-11-03 — Approved editorial People directory

- Implemented the approved wireframe: compact navy title/copy introduction,
  managing-partner feature and three-column row for the remaining partners.
  Mobile pairs a small portrait/identity above the feature text; desktop pairs
  media with biography and milestone rules. Existing initials remain until
  approved photographs arrive. The sample-roster removal is preserved.
- Feature selection stays on the server, checks the eligible directory and
  resolveProfile, and passes rendered content through the browser directory as
  a React-node slot. Pending source details retain a small preview label and
  stay excluded at launch. Full biography bodies do not join card data.
- directoryPresentation keeps the featured person out of the unfiltered grid
  only while their feature renders. Any active search/role/practice filter
  searches the full eligible roster; Clear restores the feature. Added seven
  tests for selection/publication gates, deduplication, full-roster search,
  combined filtering, unavailable/lone features and whitespace/clear states.
- Directory header tone is dark with matching mobile backing; direct profile
  pages remain light and intercepted profiles preserve origin tone. Search URL
  syncing resumes after popup return, including a popup opened before the
  typing debounce completed. Separate text/global reset actions are retained.
- Browser checked 320, 390, 768, 1024 and 1440px layouts with no horizontal
  overflow; three-column desktop and one/two-column mobile/tablet grids; search
  for Mahmoud, clearing, identity/CTA popup links, keyboard activation/Escape,
  focus return, retained query URL and direct light profile page. No warnings
  or errors were reported. New hover motion uses motion-safe CSS utilities.
- Format, lint, typecheck, all 107 tests and the Webpack production build passed.
  /people remains static. Static HTML inspection confirmed all four names and
  the feature outside scripts, with no-index metadata; a browser with JavaScript
  disabled was not tested. Existing form/filter rules cover the larger roster;
  no synthetic roster was reintroduced for this pass. No commit or deployment.

## 2026-11-03 — Tablet touch, practice divider and footer labels

- Hero: swipe is off from `lg` (64rem), where the photograph fills the whole
  hero and caught diagonal page scrolls on iPad, fading the photo instead of
  scrolling. Arrows, progress and autoplay are unchanged; phones keep swipe on
  the short photo band. The edge shadow is now a gradient instead of a
  `blur-xl` filter layer (same look, cheaper to repaint on tablets).
- Practice detail: the last service item no longer draws a bottom border, so
  the hidden experience carousel no longer leaves an empty band between two
  lines before Our people.
- Footer: "About us" became "The firm" and "Selected matters" was added, to
  match the main navigation. "Legal Insights Series" stays as the client's full
  series name. A test keeps footer and header labels aligned.
- Not verified on a real iPad: the in-app browser can't emulate touch. The
  practice-explorer lag was not reproduced; the fixed glass header's
  backdrop blur is the remaining suspect if it persists on a production build.

## 3 November 2026 — Selected matters listing and experience details

User-approved wireframe implemented at `/experience` and four canonical
`/experience/[id]` routes. Desktop uses the current Firm hero image behind a navy
overlay; mobile uses solid navy. Cards share pale resting and navy hover/keyboard
focus states. Organisation-led details separate sourced instructions, identify
the firm's/Managing Partner's role, qualify BPE's claim value and show canonical
suggested practice links for review. Shared breadcrumb, enquiry CTA and footer
are reused. Both main-menu destinations remain available.

The body-free matter manifest owns IDs/status for route registration. The same
server resolver gates listing/detail/metadata; pending records render only in the
explicit no-index preview, withheld/missing status never does, and launch is
approved-only. Home's matter projection stays approved-only. The practice-carousel
visibility and unrelated committed hero/footer/service changes were preserved.
Source copy follows the supplied brochure and approved wireframe; no outcomes,
publication permissions, new imagery or provider connections were invented.

Updated route brief, alignment, roadmap, architecture and docs index. Added
`docs/media-review.md`: **replace temporary images before converting final sources
to WebP**, specifically the office image shared by Firm and Selected matters.
No source conversion or timed reminder was created.

Verification: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`
(115 tests across 14 files) and `pnpm exec next build --webpack` passed. Webpack
was used for the known local Turbopack sandbox constraint; the default build
command was not rerun. Build output pre-renders the listing and all four details.
Browser review covered 320, 390, 768 and 1440px with no horizontal overflow in
checked views, keyboard card focus/activation, all four detail links, back links,
a related-practice link, light/dark chrome and unknown-record 404 presentation.
No-index/canonical metadata and script-free server HTML content were checked.
Reduced-motion variants were inspected in CSS; browser motion emulation was not
available. A direct shell HTTP status check could not reach the local server;
404 was verified in the browser rather than claimed as a measured HTTP status.
No deployment, external readiness or client publication approval is implied.

## 2026-11-03 — Codebase map, rule files and People rules in lib/people

- Moved September/October log entries to
  `docs/archive/implementation-log-2026-10.md`; this log now keeps the current
  month (rule recorded in `docs/workflow.md`).
- Shortened `AGENTS.md` to start-here, hard boundaries and checks. The previous
  guide, with its approval history, is kept at
  `docs/archive/agents-guide-2026-11-03.md`. Current rules are split into
  `.claude/rules/{structure,components,content,workflow}.md`.
- Replaced the README project list with a "Where things live" map.
- People rules moved out of `content/` into `lib/people/`: `roster.ts`
  (from `content/profile-manifest.ts`), `profiles.ts` (from
  `content/profiles.ts`), `directory.ts` (was `lib/people-directory.ts`),
  `directory-data.ts` (was `content/people-directory.ts`), `profile-links.ts`
  and `profile-metadata.ts`. `content/` keeps the records, manifest and copy.
  No behaviour change.
- Checks: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`
  (115 passed) and `pnpm build` passed. A biography sentence appears in
  `.next/server` output only, not in `.next/static`.

## 2026-11-03 — Experience rules in lib/experience.ts

- Moved `isCompleteExperience`, `resolveExperience`, `getExperiences` and the
  `Experience` type from `content/experience.ts` to `lib/experience.ts`.
  `content/experience.ts` keeps the copy and server-only instruction records.
- Matter lookups that read only their own file (`matterStatus`,
  `availableMatterIds`, `visibleMatters`) stay in `content/`; the rule is now
  written in `.claude/rules/structure.md`. Practice lookups also stay.
- No behaviour change.

## 2026-11-03 — Insights review fixes (Claude)

- Search now matches every word in any order and ignores accents
  ("patent nigeria" finds "Patent registration in Nigeria"). People and
  Insights share `normalizeText`/`matchesSearch` in `lib/search.ts`.
- Removed `app/(site)/insights/loading.tsx`. It streamed both Insights pages
  before `notFound()`/`redirect()` ran, so a missing article returned 200 and
  an out-of-range page a 200 script redirect. Production now returns 404 and 307. Filter changes keep the toolbar's "Updating insights…" feedback.
- `getInsight` is wrapped in React `cache`, so metadata and page share one read.
- Citations read "Reference [1]" instead of announcing the record key.
- Related-article items are rounded to match their cards (no white corners).
- The live region announces only the settled count, not "Updating…" on each
  typing pause. Count, "Showing x–y of z" and updating text moved to
  `content/insight-copy.ts`.
- Bylines with three or more authors read "A, B & C" (`formatNames`).
- Fallback excerpts end at a word boundary with an ellipsis (`shortenText`).
- `isRouteAvailable` uses `routes.insights` rather than a hand-typed path.
- Checks: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`
  (151 passed) and `pnpm build` passed. `next start` checked 404/307 statuses
  and that article body text is absent from `.next/static`.

## 2026-11-03 — Responsive page trail (breadcrumb on desktop, back link on phone)

- Outcome: added `components/shared/page-trail.tsx`. From `md` up it shows a
  breadcrumb: a home icon, light chevrons, and the current page muted and
  truncated. On phones it shows a back link to the section plus the group in
  between. It is used on practice area, Insights article, selected matter,
  SME and legal pages. The `components/ui/breadcrumb.tsx` styling is lighter.
  Removed unused copy keys `backLabel`, `backShort`, `allInsightsShort` and
  `articleNav`.
- Files: `components/shared/page-trail.tsx`, `components/ui/breadcrumb.tsx`,
  `components/{practices,experience,insights}/detail-page.tsx`,
  `components/sme/retainer-section.tsx`,
  `components/legal/legal-page-layout.tsx`, `content/insight-copy.ts`,
  `content/practice-index.ts`, `content/experience.ts`.
- Checks: format:check, lint, typecheck, test (153) and build passed. The
  browser was checked at an 800px pane width and at 375px. The selected-matter
  detail page was not opened, because no matter is linked from the hub.

## 2026-11-03 — Tidier "Latest on {practice}" strip

- Outcome: `CompactArticleCard` takes a `brief` option that drops the category
  label and reading time (`ArticleMeta` gained `showReadTime`). The practice
  strip uses it, so the category no longer repeats the heading, the meta never
  wraps and the three cards line up.
- Files: `components/insights/article-card.tsx`,
  `components/practices/insights-section.tsx`.
- Checks: lint, typecheck, format:check and test passed. Checked at 1440px in the browser.

## 2026-11-03 — Practice hero spacing and scrolling tabs on phones

- Outcome: the practice detail hero has less padding and smaller gaps below
  `sm`, so the title, intro and enquiry button sit closer under the page
  trail. Tablet and desktop spacing is unchanged. The category tabs on the
  Practice areas hub scroll sideways on phones instead of wrapping, using the
  same pattern as the Insights type pills.
- Files: `components/practices/detail-page.tsx`,
  `components/practices/catalogue-section.tsx`.
- Checks: lint, typecheck, format:check and test passed. Checked at 375px in the
  browser; no page overflow.

## 2026-11-03 — Folded practice contents and tighter detail heroes on phones

- Outcome: `PageContents` now takes a `label` and renders its own navigation.
  On desktop it shows the list under a heading. Below `lg` it folds into a
  tap-to-open row, matching the Insights article contents. The practice
  sidebar is a slate card at every size. The heroes on selected-matter and
  Insights article pages now use the same tighter phone spacing as practice
  pages; `sm` and up is unchanged.
- Files: `components/shared/page-contents.tsx`,
  `components/practices/detail-page.tsx`,
  `components/experience/detail-page.tsx`,
  `components/insights/detail-page.tsx`.
- Checks: lint, typecheck, format:check and test passed. Checked at 375px in the browser.

## 2026-11-03 — Larger founder portrait on phones (People page)

- Outcome: the People leadership feature no longer shrinks the portrait to a
  112–144px thumbnail beside the name below `lg`. It now shows full width
  (4:3) with the name and role underneath. It is capped at `max-w-sm` from
  `sm` to `lg`, and desktop is unchanged.
- Files: `components/people/directory-leadership-section.tsx`.
- Checks: lint, typecheck, format:check and test passed. Checked at 375px in the browser.

## 2026-11-03 — Phone white-space review before Careers and Contact

- Outcome: measured the vertical gaps on every launched page at 375px (Home,
  The Firm, Practice areas and a practice, People and a profile, Selected
  matters and a matter, Insights and an article, SME, Privacy, Terms). The
  remaining gaps are the standard 48px + 48px rhythm between sections, padding
  inside coloured bands, or initials portraits standing in for photos. No new
  outliers after today's hero, contents and portrait fixes. Visual spot checks
  covered The Firm, profile, SME and legal on phones, and the matter and SME
  trail at 1440px.
- Checks: format:check, lint, typecheck, test (153) and build (66 static
  pages) passed.
- Gate: Home stays on visual hold and was measured but not changed.

## 2026-11-04 — Insights review follow-up

- Added the shared author byline to `CompactArticleCard`, including phone
  archive rows and brief practice-page strips. Names can wrap naturally.
- Named `FilterSelect` fields now server-render labelled native selects with
  real option values. Hydration enhances them to the existing shadcn desktop
  menu/mobile sheet. The component owns its single named hidden value after
  hydration; removed duplicate field ownership from the Insights toolbar.
  People keeps its existing unnamed control and separately owned form field.
- Featured content appears only in the default newest-first, unfiltered first
  page. The archive always includes every eligible article (27 demo records,
  three pages of nine), so changing the feature cannot change membership/counts.
  Feature visibility changes keep the toolbar in view and retain input focus;
  pagination still focuses the archive heading.
- Updated the route contract and shared-control architecture. Added regression
  checks for the native server field, brief/full compact bylines and feature /
  pagination rules.
- Verification: format:check, lint, typecheck, test (157 tests across 17 files),
  `git diff --check` and `pnpm exec next build --webpack` passed (66 static
  pages). Browser checks covered 320/390/1440px, compact attribution, practice
  strip attribution, themed practice selection and sorting, feature hide/restore,
  retained search focus and page-two heading focus. Checked narrow views had no
  horizontal page overflow. Raw server HTML and the SSR regression test confirm
  selected native practice/sort values and one named field each; a browser with
  JavaScript disabled was not separately exercised. No CMS/provider/deployment
  changes; previews remain no-index.

## 2026-11-09 — Firm hero image loading

- Set The Firm hero poster to `loading="eager"` through the shared
  `VideoPoster` component. Confirmed the attribute on the poster image in
  the built `/the-firm` HTML.
- Formatting, lint, type checking, all 157 tests and the webpack production
  build passed.

## 2026-11-10 — Practice detail hero spacing on tablet and desktop

- Tablet: the breadcrumb sits 24px under the header (was 40px), and the title
  24px under the breadcrumb (was 40px).
- Desktop: the hero text is top-aligned with the image instead of centred, so
  the title and image both start 32px under the breadcrumb (the title was
  103px down). Phones unchanged.
- File: `components/practices/detail-page.tsx`.
- Checks: browser measurements at 768px and 1440px; format check, lint,
  typecheck.

## 2026-11-10 — Firm-grade polish round (no new client content)

- Outcome:
  - **One preview banner:** a floating, dismissible notice
    (`components/layout/preview-banner.tsx`, `hooks/use-session-dismiss.ts`)
    shows while the site is not indexable. Per-section "awaiting confirmation"
    notes now go through `ReviewNote` and stay hidden unless
    `siteConfig.reviewNotes` is on. Content placeholders such as FAQ answers
    and legal text are unchanged.
  - **Portraits:** a shared `PortraitFallback` for cards, profiles and the
    People feature. The practice people grid uses the standard 4:5 crop.
  - **Typesetting:** `keepTogether` (`lib/typography.ts`) handles initials,
    post-nominals, "No. 10", "s. 1(1)" and year ranges. Headings balance,
    paragraphs wrap without orphans, figures use lining numerals.
    Post-nominals on profiles are in small caps. Three straight apostrophes
    in article bodies are now curly.
  - **Credentials:** the existing career milestones show as chips on
    profiles. Firm and People already show them.
  - **Insights:** the byline adds the author's firm role for real authors.
    The disclaimer and revised date already existed. Articles gain a Print
    button.
  - **Footer:** each office has a Directions link (Google Maps search, new
    tab) beside call. No RC number.
  - **People copy:** the leadership block is now "Leadership / Meet our
    co-founder and managing partner." so it no longer repeats The Firm. This
    is a draft for firm confirmation.
  - **Printing:** site chrome, actions, trail, contents, related and the
    enquiry card are hidden. External links print their address.
  - **Share cards:** branded 1200×630 cards for articles (used only when no
    wide editor image exists) and practice areas, through `share-card.png`
    routes and `shareCardImage`. Profiles deliberately keep the generic firm
    card; there is no profile card, vCard or profile print control.
  - **Hover:** shadows removed from Firm and Practice cards. The link, arrow
    and hover rule is recorded in `docs/design-system.md`.
- Gates:
  - Share cards: static TTFs of Newsreader 400 and Manrope 600 were
    downloaded from Google Fonts (SIL Open Font License) into
    `app/fonts/share/`, with the user's approval, so the cards use the brand
    fonts.
  - Home: the banner overlays it, and the global wrap and numeral rules
    apply. Home layout and markup are unchanged.
- Checks: format:check, lint, typecheck, test (162) and build passed. Both
  share cards were fetched from a production build. The profile, People and
  footer were checked at 1440px.

## 2026-11-10 — Home practice areas fit one desktop screen (user-approved)

- Approved from a wireframe as a change to the held homepage section.
  Desktop only; phones and tablets unchanged.
- Rows are 53px (were 73px), the list sits closer to the button, and the intro
  gaps are 4px tighter. On short screens (`short:`, under 760px tall) rows are
  49px and the heading is 48px (was 60px).
- Measured: the explorer is 815px at 1440×900 (was 1,027px), so with the
  floating header the heading, all nine rows and the full card fit on screen.
  At 1440×740 it is 700px; the heading's top edge sits just under the header.
- Files: `components/home/practice-area-explorer.tsx`,
  `components/home/practice-areas-section.tsx`.
- Checks: browser measurements and a screenshot at 1440×900; format check (own
  files), lint, typecheck, tests.

## 2026-11-10 — Print preview label and real directions

- Outcome:
  - **Print label:** while the site is not indexable, a print-only line
    ("Presentation preview · content pending firm approval") heads every
    printed page or PDF, because the floating banner is hidden on paper
    (`components/layout/site-shell.tsx`). It shows even after a visitor
    closes the on-screen notice.
  - **Directions:** footer Directions links now open Google Maps
    turn-by-turn directions (`/maps/dir/?api=1&destination=`) instead of an
    address search. Offices take an optional `pin` (latitude/longitude) in
    `content/contact.ts`; when set, directions use it.
- Gate: the office pins are to be confirmed with the firm during the Contact
  page work. Until then directions route to the address, and coordinates are
  never guessed.
- Checks: format:check, lint, test and build passed. The label is present
  and hidden on screen, with its print rule in the CSS. Footer links were
  checked in the browser. Print output was not opened in a print dialog.
- Follow-up: Print moved out of the article share icons to a text action
  ("Print article") under them. The circles are now 40px with no wrapping,
  so up to five share icons fit on one line in the 18rem sidebar. Checked at
  1024px. Lint, typecheck, format and test passed.

## 2026-11-10 — A+ detail hero (user-approved)

- Outcome: the article and practice heroes now use one split hero
  (`DetailHero`). The title starts level with the photo top and the byline
  or enquiry rule sits on its bottom edge. The photo runs to the page edge
  on desktop and comes first, full width, on phones. The eyebrow shows the
  type and category, and the meta line is plain text. Article share moved
  from the sidebar into the byline as copy link, LinkedIn and a "More"
  popover (X, WhatsApp, other apps, print). Matter pages gained the
  category eyebrow. `initialsFrom` now always returns capitals.
- Files: `components/shared/detail-hero.tsx` (new),
  `components/insights/detail-page.tsx`, `share-controls.tsx`,
  `reading-experience.tsx`, `article-card.tsx` (exports `typeLabel`),
  `components/practices/detail-page.tsx`,
  `components/experience/detail-page.tsx`, `content/insight-copy.ts`,
  `lib/format.ts`, `tests/format.test.ts`, `docs/design-system.md`.
- Checks: format:check, lint, typecheck, test (164) and build. Checked in
  the browser at 1440px and on a 375px phone (article, practice, matter).
  The More menu opened under its button at 1440px.
