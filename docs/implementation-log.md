# Implementation log

Append-only factual history for the current month. Older entries are in
`docs/archive/` (for example `archive/implementation-log-2026-10.md`).

## 2026-11-13 — Commercial terms removed; checklist rules in one place

- Removed fees, prices, payment milestones and contract clauses from the
  repository so other developers do not see them. Deleted
  `docs/scope-addendum.md`. `LICENSE` now defers ownership and use to the
  services agreement. Edited `NOTICE.md`, `docs/handover-checklist.md`,
  `docs/roadmap.md`, `docs/client-alignment.md`, `docs/README.md`,
  `docs/environment.md`, `docs/integrations/email.md` and `sanity.md`, and
  redacted earlier log entries in this file and the October archive. Scope
  (nine practices, SME page, Terms of Use) is still recorded.
- AGENTS.md and `.claude/rules/workflow.md` now say to keep commercial terms out
  of the repository. Earlier versions remain in git history.
- The checklist update rules live only in `docs/workflow.md`; AGENTS.md and
  `.claude/rules/workflow.md` point to them. The roadmap's "Open reminders"
  keeps only WebP and motion and links to the checklist for everything else.
- Documentation only. `pnpm format:check` and `git diff --check` passed, and a
  repository search finds no fee or payment terms. Runtime checks were not
  repeated.

## 2026-11-13 — Checklist and email-plan corrections

- `docs/integrations/email.md`: email templates, shell and previews are planned
  in `components/email/`, not `lib/email/`, because `lib/` holds only `.ts`.
  Rendering, sending and spam checks stay in `lib/email/`.
- `docs/handover-checklist.md`: six stock photos are unused (three team, three
  testimonial), not three. Found by searching `app`, `components`, `content`,
  `lib` and `docs` for each file in `public/`.
- Documentation only. `pnpm format:check` ran; runtime checks were not repeated.

## 2026-11-13 — Agent checklist workflow

- Added checklist reading/updating to AGENTS.md, Claude's workflow rule and
  the docs reading order. `docs/workflow.md` owns the detailed update rules:
  relevant items only, evidence-backed completion, separate approvals and
  production verification, partial-work notes and preserved whole-site audit
  dates. Unchecked items do not authorise deferred work.
- Recorded the instruction in the delivery checklist. This is agent guidance,
  not automated enforcement or a claim that other delivery items were audited.
- Documentation only. `pnpm format:check`, local checklist/workflow links and
  anchors, and `git diff --check` passed. Runtime checks were not repeated.

## 2026-11-13 — README audience balance

- Kept the branded header and moved technology badges below the website
  overview. Rewrote features for general readers and condensed developer setup
  and tooling details, with the full guides remaining in docs. Retained an
  honest preview/enquiry-delivery note and the compact folder map.
- Documentation only. Formatting, local links/assets, documented package
  commands and whitespace checks passed; runtime checks were not repeated.

## 2026-11-13 — Branded project README

- Refined the README into a stable project introduction using iProduce's
  presentation structure: existing light/dark logos, technology badges,
  overview, implemented features, stack and setup. Detailed delivery status
  stays in the project docs. Local-content and simulated-enquiry notes remain
  explicit; no live CMS, email delivery or launch claim was added.
- Documentation only. Formatting, local README links/assets, package commands
  and `git diff --check` passed. Runtime checks were not repeated.

## 2026-11-13 — README overview refinement

- Shortened the README at the user's request to a project overview: purpose,
  current preview status, main stack, setup, useful commands, a compact folder
  map and documentation/licence links. Removed the detailed route inventory,
  publication rules and contributor handoff material from the overview; those
  remain in the existing project docs.
- Documentation only; no runtime changes. Verification: formatting, README
  links/commands and `git diff --check` passed. Runtime checks were not repeated.

## 2026-11-12 — README onboarding refresh

- Reorganised the README around local setup, available routes, outstanding work,
  preview/publication rules, commands and the current folder map. Updated the
  stale enquiry-form description to reflect the built preview action and made
  the absence of real email delivery/CMS connections explicit.
- Included the codebase cleanup, scoped motion, shared form validation, Git and
  Claude checks, licence split and links to current route/integration/handover
  documentation. Kept Careers deferred and distinguished route availability
  from production approval; no runtime code or dependencies changed.
- Verification: formatting, lint, typecheck and 180 tests passed, along with
  `git diff --check`. Validated all 26 README links and 11 documented pnpm
  commands against local files and `package.json`. Build/browser checks were
  not repeated for this documentation-only change.

## 2026-11-12 — Full-site handover checklist and remaining scope audit

- Created `handover-checklist.md`, separating built preview routes/corrections
  from client approval, remaining visual work, CMS/email integration, migration,
  production QA and handover. Checked against the agreed scope; no client
  acceptance is assumed. Careers remains deferred, not removed from the agreed scope.
- Recorded two remaining proposal requirements: People office filtering and
  optional Insight document downloads. Added them to the route briefs, Sanity
  plan and roadmap rather than treating existing filters/rich text as complete.
- Corrected current Careers guidance and stale practice-carousel visibility
  statements; linked the checklist from the README, docs index and roadmap.
  Historical implementation-log entries remain unchanged.
- Named the planned server-only `SANITY_REVALIDATE_SECRET` consistently in
  `.env.example`, environment docs and the Sanity plan. It is not wired to code.
- Added backup/restore, rollback, recovery access and operational ownership
  planning to `environment.md`. No provider, backup or monitoring service was
  installed, configured or tested in this documentation pass.
- Verification: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`
  (180 passed), `pnpm knip` and `pnpm build` passed. The build generated 67
  static pages and kept `/contact` static. `git diff --check` and local Markdown
  link checks passed. No fresh browser review or production/provider checks were
  performed; runtime source and dependencies were not changed in this pass.

## 2026-11-12 — Licence wording refinement

- Restored the copyright heading and numbered layout requested by the user.
  Contract details later moved out of the repository (see the 2026-11-13 entry).
- Ran `git diff --check` and the implementation-log formatting check.

## 2026-11-12 — Ownership correction and integration planning alignment

- Corrected LICENSE and README so ownership follows the services agreement,
  and distinguished asset ownership from publication permission. This
  supersedes the blanket code-ownership description in the earlier clean-up
  entry below. Contract details later moved out of the repository (see the
  2026-11-13 entry).
- Expanded the proposed Sanity plan to cover homepage featuring, settings,
  editorial content, staff editing/training and firm-owned production accounts.
  Added a Studio UX review based on iProduce's structure, singleton pages,
  grouped fields, scoped FAQ templates, image guidance and creation options.
- Recorded the user's confirmation that a Careers design exists. Careers
  implementation remains deferred until the client answers the recruitment
  questions, with CMS-managed vacancies and email/external applications kept
  in the agreed scope.
- Reviewed iProduce's email shell, templates, previews, HTML/plain-text render
  helper and contact sender. The email plan now distinguishes firm delivery
  from receipt failure, calls for retry/deduplication planning and uses the
  reference's lib/email template/preview folder pattern.
- These are ownership notices and planning-document changes. Provider and CMS
  implementation remains a subsequent checkpoint. Review the proposed editor
  workflow and both email audiences before settling the technical plan.
- Verification: targeted formatting checks for the changed Markdown files and
  `git diff --check` passed. No runtime source or dependency changes were made
  in this pass.

## 2026-11-12 — Codebase clean-up (repo items, docs, structure, comments, speed)

- Repo: added `LICENSE` (code owned by Vextra; firm materials stay the
  firm's) and `NOTICE.md` (shadcn/ui, fonts, stock photos);
  `package.json` gained `license` and `author`. Security headers in
  `next.config.ts`, with the content policy in report-only mode. Firm
  structured data for search engines (`lib/structured-data.ts`), emitted on
  Home only when the site is indexable. `.env.example` lists the variables
  the code reads and the planned ones. `.githooks/commit-msg` limits the
  commit subject to 72 characters. Rules now allow Vercel Analytics.
  Removed the unreferenced `public/brand/logo-favicon.png` (2.5 MB; it is
  still in git history).
- Plan docs (nothing built): `integrations/sanity.md`,
  `integrations/email.md`, `environment.md` (variables, headers, launch
  checklist).
- Structure: `video-poster` moved to `components/firm/`; `status-page`,
  `error-view`, `not-found-view` and `share-card` moved to the new
  `components/system/`. `jsonLdString` moved from `lib/insights/article.ts` to
  `lib/structured-data.ts`. Hooks stay flat. Left alone after checking:
  `back-link` and `section-link` (helpers of shared components),
  `content/enquiry.ts` (site-wide enquiry band copy), `biome.json`
  (documented editor diagnostics), `types/` (for Sanity).
- Comments: 25 comments that read like conversation notes were rewritten to
  state the fact and its source. No behaviour changed.
- Route docs: `routes/sme-retainer.md`, `routes/legal.md`,
  `routes/system-pages.md`, `routes/careers.md` (not built). `docs/README.md`
  index rewritten; `handoffs/` moved to `archive/handoffs/`; roadmap gained
  status rows and an "Open reminders" list (WebP, motion, privacy line,
  content policy, licence and contract).
- Speed: `/contact` is pre-built (the practice preselection is read in the
  browser by `enquiry-arrival.tsx`). Office maps load on request
  (`office-map.tsx`). `app/icon.png` resized from 512 to 192 px (279 KB to
  53 KB). `lib/share-card.ts` reads fonts from a fixed folder, which removes
  a build warning that the whole project was being bundled into the server.
  Not changed: `/practice-areas` and `/insights` still render per visit
  (their filters are server-side); all 43 browser-side components were
  checked and each needs to be.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (180 passed),
  `knip` (clean), `build` (passed, no warnings; `/contact` static). Browser:
  practice arrival still preselects; a map loads when pressed; the share
  card renders with brand fonts; no content-policy reports on Contact or
  People in development. Not done: a full click-through for the content
  policy on a deployed build, and a speed measurement (waits for motion).

## 2026-11-12 — Removed `components/contact/field-line.ts`

- Outcome: `components/` holds only `.tsx`. The Contact form's underline
  style now uses the shared `underlineFieldClass` from
  `components/shared/filter-select.tsx` directly, which gained the red
  `aria-invalid` line (the Insights filters never set it, so they are
  unchanged). The file-type rule is now written in
  `.claude/rules/structure.md`.
- Files: `components/shared/filter-select.tsx`,
  `components/contact/{choice-tiles,enquiry-form}.tsx`, removed
  `components/contact/field-line.ts`, `.claude/rules/structure.md`.

## 2026-11-12 — Contact review fixes (Codex) and menu focus ring

- Validation: malformed input (null, a missing or null topic) made
  `enquirySchema.safeParse` throw, because the topic refinement runs on bad
  data. It now reads its input defensively; the Server Action returns
  `invalid`. Regression tests cover the schema and `submitEnquiry`.
- Accessibility: the reason choices (`required` radios; `aria-required` on
  the phone dropdown) and the message field (`aria-required`) now expose the
  required state; their asterisks are visual only.
- Copy: the confirmation no longer promises a reply to every enquiry
  ("The team will review your enquiry and get in touch if we can help…"),
  marked draft until the firm confirms its process.
- Docs: `client-alignment.md` records that "Back to homepage" on `/contact`
  supersedes the client's "Make an enquiry" correction (to confirm with the
  client), that Contact is launched, and that preferred office was removed
  by agreement as a scope adjustment (a visitor preference, separate from
  the firm's routing). `routes/contact.md` matches.
- Menu ring: after closing the phone menu by tap, Radix returns focus to the
  menu button and iOS Safari showed the focus ring. New
  `hooks/use-quiet-focus-return.ts` keeps focus there but hides the ring when
  the last input was touch or mouse; a keyboard close keeps it.
- Files: `lib/enquiry.ts`, `tests/enquiry.test.ts`,
  `components/contact/{choice-tiles,enquiry-form}.tsx`,
  `content/contact-page.ts`, `hooks/use-quiet-focus-return.ts`,
  `components/layout/mobile-navigation.tsx`, `docs/client-alignment.md`,
  `docs/routes/contact.md`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (178 passed),
  `knip` (clean). Browser at 375px: tap close leaves focus on the menu button
  without a ring; Enter then Escape shows the ring. Not tested on a real
  iPhone. Build not rerun.

## 2026-11-12 — Contact pickers toned down

- Outcome: the reason band no longer fills navy and the practice list lost
  its left bar. Both show the choice with a light tint, navy number and
  filled check. Fixed the near-black band outline and navy row rule: Tailwind
  4 draws a border without a colour in the text colour, so the borders now
  use `border-border`.
- Files: `components/contact/choice-tiles.tsx`, `docs/routes/contact.md`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (175 passed),
  `knip` (clean). Browser at 1440px; computed border colours checked before
  the fix. Tablet and phone not re-checked by eye.
- Handoff build: `pnpm build` passed after all Contact changes today.

## 2026-11-12 — Contact "Something else" topic, full panel on phones

- Outcome: choosing "Something else" shows a required one-line "What is it
  about?" field (2–120 characters). It is cleared for other reasons, listed in
  the confirmation, and meant as the email subject once delivery is
  connected. Its error shows together with the others. A failed send now
  focuses the first problem in on-screen order (React Hook Form's own order
  followed when fields appeared). The phone panel now shows everything,
  including "Before you send".
- Files: `lib/enquiry.ts`, `hooks/use-enquiry-form.ts`,
  `content/contact-page.ts`, `components/contact/{enquiry-form,enquiry-received,contact-panel}.tsx`,
  `tests/enquiry.test.ts`, `docs/routes/contact.md`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (175 passed),
  `knip` (clean). Build not rerun. Browser at desktop width: topic field
  appears, empty send shows four errors, focus lands on the reason, then on
  the topic once "Something else" is chosen. Phone panel not re-checked by
  eye.

## 2026-11-12 — Contact phone layout: photo hero, form first, dropdowns

- Outcome: on phones the Contact hero photo now runs up behind the header
  (the hero slides under the 86px header, as on desktop), matching the
  designer's 390px frame instead of sitting below a navy band. The form comes
  before the contact panel on phones and in reading order; desktop keeps the
  panel on the left via dense grid flow. The phone panel now shows presence
  and social links too; only "Before you send" stays desktop-only because the
  form shows the same note. Phone pickers are the site's Radix Select (as in
  the Insights filters) with numbered options and notes, replacing native
  selects. "Clear choice" shows on phones too.
- Fixed: the desktop picker grid also showed on phones (its `grid` class
  overrode `hidden`).
- Files: `app/(site)/contact/page.tsx`, `components/contact/{hero-section,contact-panel,choice-tiles,field-line,enquiry-form}.tsx`,
  `components/ui/select.tsx` (optional `description` under an option),
  `docs/routes/contact.md`. `field-line.ts` now builds on the Insights
  `underlineFieldClass` instead of repeating it.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (173 passed),
  `knip` (clean). Build not rerun. Browser at 390px (hero, dropdown open and
  select, practice dropdown appears, panel, no horizontal scroll) and 1440px
  (panel left, form right, hero unchanged).

## 2026-11-12 — Contact pickers restyled, field focus fixed

- Outcome: the reason and area-of-law pickers no longer look like generic
  radio cards. Reasons are a ruled, numbered band; the chosen cell fills navy.
  Practices are a two-column, contents-style list numbered in catalogue
  order. Underlined fields lost the boxy site-wide focus outline; focus is now
  a 2px navy rule. One shared `fieldLine` class serves inputs, the textarea
  and the phone pickers.
- Files: `components/contact/choice-tiles.tsx`, new
  `components/contact/field-line.ts`, `components/contact/enquiry-form.tsx`,
  `docs/routes/contact.md`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (173 passed).
  Build not rerun (no route or dependency change). Browser at 1440 and
  768px; keyboard focus on fields and practice rows (arrow keys move the
  choice, ring shows). Phone pickers not re-checked by eye.

## 2026-11-12 — Contact page and enquiry form (preview submission)

- Outcome: `/contact` is launched for no-index review, built from the approved
  reason-first wireframe. Order: hero, contact panel beside the form
  (`#enquiry`), offices with embedded maps, FAQ. The header button reads
  "Back to homepage" on Contact (desktop and phone menu). The form asks for the
  reason first (legal, partnership, media, other). The area of law appears only
  for legal matters and is optional. Organisation is marked "(recommended)"
  for partnership and media. Phones get native selects instead of tiles.
  Sending validates on the server and shows a confirmation marked "Preview
  only: nothing was sent", plus a toast. Practice pages link to
  `/contact?practice=slug#enquiry`, which preselects that practice and shows
  an arrival note.
- Files: `app/(site)/contact/{page,actions}.ts(x)`, `components/contact/*`,
  `components/layout/social-links.tsx` (shared with the footer),
  `hooks/use-enquiry-form.ts`, `hooks/use-header-action.ts`, `lib/enquiry.ts`,
  `content/contact-page.ts`, plus edits to `content/{faqs,navigation,practice-index}.ts`,
  `lib/{maps,routes}.ts`, header/mobile navigation, footer, enquiry button,
  practice detail page. Added `zod` and `@hookform/resolvers`. Docs:
  `routes/contact.md` (approved spec), `architecture.md`, `forms.md`,
  `roadmap.md`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (173 passed),
  `knip` (no unused files or exports; two config hints, below), `build`
  (passed; `/contact` is dynamic because it reads `?practice=`). Browser at
  1024px and 375px: empty submit focuses the reason question and shows four
  errors; partnership changes the message label; a full submit shows the
  confirmation with focus and toast; practice arrival preselects Litigation;
  no horizontal scroll on phone; three map iframes render.
- Remaining gates: firm approval of the notice, confirmation and FAQ wording;
  confirmed map pins; Contact photo. Delivery (Resend, React Email templates
  and previews, Turnstile, rate limiting) waits for visual approval.
- Follow-up (user approved): `react-hook-form` and `@radix-ui/react-label`
  removed from knip's `ignoreDependencies` now that the form imports them;
  both stay installed. `pnpm knip` is clean.

## 2026-11-12 — Site-wide type scale

- Outcome: serif headings now come from seven role classes defined once in
  `app/globals.css` (`type-title`, `type-title-detail`, `type-statement`,
  `type-section`, `type-subsection`, `type-card`, `type-row`) instead of
  about 30 hand-picked sizes. Measured headings per page at 375px and 1440px
  now sit only on scale steps (for example The Firm: 72, 60, 48, 30, 24 on
  desktop; 40, 36, 32, 24, 20 on phones). Before, The Firm alone had 44, 42,
  36, 32 and 30 px section-level sizes.
- Changes: the People title is 72 on desktop like other landing pages;
  the People co-founder heading, "Explore related articles", "Latest on…" and
  SME tracks are section size (48); "Partners", "References" and legal
  headings are subsection size; article body h2 is 24/30 (was 30/36), h3 is
  20/24. The closing band is 36 on phones (was 30, smaller than sections).
  The FAQ heading is the statement size everywhere; its per-page override
  prop (`headingClassName`) was removed. 10px labels in the practice
  catalogue and photo credit are now 11px.
- Home unchanged: computed sizes checked on `/` (closing band 30/36 on phone,
  FAQ 36/38.9, both 60 on desktop). The editorial cover label stays 10px
  because Home uses it.
- Files: `app/globals.css`, `app/(site)/page.tsx`,
  `app/(site)/people/[slug]/page.tsx`, `app/(site)/insights/[id]/not-found.tsx`,
  `app/(site)/practice-areas/page.tsx`, `app/(site)/the-firm/page.tsx`, and
  heading classes across `components/{experience,firm,insights,legal,people,practices,shared,sme}`.
  Docs: `design-system.md` (type scale table).
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed),
  `knip` (clean). Build not run. Not reviewed by eye in the browser; sizes
  were checked by computed style.

## 2026-11-12 — Contact planning and revised HTML wireframe

- Added `routes/contact.md` as a proposed review brief, linked from the docs
  index. No Contact application route or delivery provider was implemented.
- Prepared standalone `contact-plan-preview-v2.html` in the chat's visualization
  folder. Removed Organisation and restored preferred office, which the original
  proposal includes. Six fields remain; name, email and message are required.
- Topic includes General enquiry, Not sure yet and the nine canonical practices.
  Practice-page arrival preselects an editable topic. The preview reflects the
  revised energy label and hidden Careers/Selected matters navigation links.
- Added themed picker dialogs, mobile/desktop views, validation, sending,
  simulated confirmation and a retryable delivery failure retaining entries.
- Checks run for this planning artifact: JavaScript syntax check and Chrome
  interaction checks for six fields, three required fields, preselection,
  editable topic, validation focus, duplicate-send prevention, retained values
  after failure and successful simulated retry. Captured desktop/mobile images.
  Verified page width at 320, 390, 768 and 1440px and a mobile chooser within
  viewport bounds. Formatting checks for the three changed Markdown files and
  `git diff --check` passed.
- Remaining decisions include inbox ownership, map presentation and exact pins,
  approved FAQ/privacy copy and final imagery. The hero photo is temporary and
  the wireframe footer is abbreviated. Repository runtime checks belong to the
  later route implementation checkpoint.

## 2026-11-12 — Phone archive rows: two text styles

- Outcome: the phone archive rows stacked four text styles (uppercase
  practice, serif title, grey author, navy type and date) in about 90px, the
  practice names were cut off, and images centred against text of different
  heights sat unevenly. Flat rows now show only the title (up to two lines,
  filling each line before wrapping) and one "Type · date" line. The image is
  96px and aligned to the top of the row. The practice and author stay on the
  article page; the practice filter sits at the top of the list.
- Files: `insights/article-card.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser at 375px: first five rows with images loaded.
- Reverted: the user restored the files to the earlier version (category,
  author, "Type · date" and an 80px image). The code no longer matches this
  entry.

## 2026-11-12 — Insights archive rows on phones

- Outcome: kept compact rows for the phone archive (agreed after review: the
  page is for finding one of many articles, so titles should scan quickly).
  Two refinements:
  - The type ("Article", "Case note", "Regulatory update") now leads each
    row's meta line in navy. Full cards show it as an image badge, which the
    rows had dropped even though it is a filter.
  - Rows sit in one list split by thin dividers instead of 27 bordered boxes
    (`CompactArticleCard flat`). Flat rows leave out the reading time so type
    and date stay on one line.
    The practice page's short insight list (`brief`) keeps its boxed rows.
- Files: `insights/article-card.tsx`, `insights/listing-section.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser at 375px: first four rows, each meta line on one
  line.

## 2026-11-12 — Legal pages: no breadcrumb

- Outcome: Privacy and Terms are standalone pages linked from the footer, so
  "Home › Privacy Policy" (or "← Home" on phones) only repeated the logo. The
  trail is removed; the pages open on their title, and the "Legal documents"
  card handles switching. Removed the now-unused `legalCopy.homeLabel`.
- Files: `components/legal/legal-page-layout.tsx`, `content/legal.ts`, docs.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser: Terms of Use at 375px.

## 2026-11-12 — Legal pages: document list on phones

- Outcome: on phones the Privacy and Terms pages opened with a filled navy
  "tab" row above "← Home", so two navigation blocks came before the title,
  in a style used nowhere else. The page now opens with the back link and the
  title. The document list is one component on both sizes, styled like the
  "On this page" cards (slate card, rail, navy marker on the current page). It
  sits after the text on phones and in the sticky sidebar from `lg`. The
  phone-only copy of the list is gone.
- Files: `components/legal/legal-page-layout.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser: Privacy Policy at 375px and 1440px.

## 2026-11-12 — Article share: same options on every device

- Outcome: the user found the phone's own share sheet unreliable as the only
  option (it differs by device; a Mac shows little more than Copy). Phones
  now get the desktop row: copy link and LinkedIn icons, then a Share menu
  with WhatsApp, X, "Share via another app" (where supported) and print.
  Phones show "Share" as an icon (its name stays for screen readers), so the
  row sits beside the author on one line. An earlier attempt that put the row
  under the author looked detached and was dropped. The menu now flips
  sideways near a screen edge instead of touching it.
- Files: `insights/share-controls.tsx`, `insights/detail-page.tsx`, docs.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser at 375px: byline row, end row, and both menus
  measured inside the screen (143–367px of 375).

## 2026-11-12 — Logo size regression fixed

- Outcome: the logo crossfade (header tone fixes, earlier today) stacked the
  two logo files in a CSS grid. The grid row ignored the link's vertical
  padding, so the logo grew from 48px to 60px tall on phones (60 to 72px on
  desktop). `grid-rows-1` pins the row to the padded height, and the logo is
  back to its original size: 180×48 at 375px, 192×60 at 1440px.
- Files: `components/layout/brand-logo.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed).
  Measured in the browser at both widths.

## 2026-11-12 — Consistency pass before the contact form

- Outcome: a page-by-page pass (code scan plus browser at 1440px and 375px:
  profile, practice detail, The Firm, Insights) looking at labels, borders,
  spacing and phone layouts.
  - Small uppercase labels were hand-written in about ten places with four
    sizes (10, 11, 12px), two weights and two letter-spacings. They now share
    one style: `eyebrowClass` from `components/ui/eyebrow.tsx` (11px, bold,
    widest), used by `Eyebrow` and by `dt`/`legend`/`span` labels. No more
    10px labels.
  - The practice detail cover no longer repeats the practice name that is
    already the heading (same reasoning as G2).
  - Borders: `border-slate-200` and `border-border` are the same colour; the
    `slate-300` lines are the underlined inputs (intentional). No change.
  - Phone layouts had no breakage. Header screenshots that looked
    see-through were mid-fade; the live state read white and scrolled.
- Files: `ui/eyebrow.tsx`, `insights/article-body.tsx`,
  `insights/article-card.tsx`, `insights/filter-sheet.tsx`,
  `firm/process-section.tsx`, `practices/detail-page.tsx`,
  `practices/experience-section.tsx`, `legal/legal-page-layout.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Build not run.

## 2026-11-12 — Insight card dividers

- Outcome: the featured insight's divider above the byline was only as wide
  as the byline (the column uses `items-start`), so it read as a stray short
  underline. It now spans the column (`self-stretch`). Article cards used
  `slate-100` for the same rule, which almost vanished on white, so they now
  use the shared `border-border` (slate-200), like the card edge. The filter
  sheet's dividers match. A layout sweep of the main routes at 1440px found
  no other dividers cut short (the rest are deliberate column rules; Home is
  on hold).
- Files: `insights/hero-section.tsx`, `insights/article-card.tsx`,
  `insights/filter-sheet.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser at 1440px: Insights featured card and grid.

## 2026-11-12 — Profile contents card and focus list restyle

- Outcome: the profile "On this page" sidebar now uses the shared
  `PageContents` in the same bordered slate card as practice pages and
  articles. `components/people/profile-contents.tsx` is deleted (replaced).
  The hero's focus fallback drops the tags for the site's editorial list
  (eyebrow, serif lines split by hairlines), matching the focus list below.
- Files: `people/profile-body.tsx`, `people/profile-hero.tsx`,
  `people/profile-contents.tsx` (deleted).
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Browser at 1440px: Bello's profile, hero and contents card.

## 2026-11-12 — Full breadcrumb back; profile focus fallback

- Outcome: G1 reversed at the user's request (the designer's trails start at
  Home). From `md` up the trail is the full path again, e.g. "Home › Our
  People › Bello Aminu Abdullahi", with `BreadcrumbPage` restored for the
  current page (`aria-current="page"`, truncates). Phones keep the back link.
  Profile pages without milestones show their areas of focus as tags in the
  hero (`focusInHero` in `lib/people/profiles.ts`). Those areas then leave the
  page body and the "On this page" list. The popup is unchanged.
- Files: `components/ui/breadcrumb.tsx`, `shared/page-trail.tsx`,
  `people/profile-hero.tsx`, `people/profile-sections.tsx`,
  `lib/people/profiles.ts`, `tests/profiles.test.ts`. Reverted the G1
  spacing change in `legal/legal-page-layout.tsx`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Build not run. Browser at 1440px: Bello's profile (full
  trail and focus tags in the hero).

## 2026-11-12 — Breadcrumb, meta line and profile hero refinements

- Outcome: breadcrumb links are darker (slate-700, medium) with a hover
  underline, and the chevrons are darker and slightly larger. Article meta
  lines use darker text, bolder slate dots and a navy type label. Profile:
  career milestones are a short timeline (rule, navy dot, year above line)
  and sit inside the page hero, filling the empty space under the summary.
  The contact icons sit beside the enquiry button on the page and in the
  popup. Headings focused by script (`tabindex="-1"`) no longer show a focus
  ring, so the name in the popup has no box.
- Files: `components/ui/breadcrumb.tsx`, `insights/article-card.tsx`,
  `insights/detail-page.tsx`, `people/milestone-list.tsx`,
  `people/profile-hero.tsx`, `people/profile-intro.tsx`,
  `people/profile-body.tsx`, `shared/detail-hero.tsx` (optional `details`),
  `app/globals.css`.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` and `knip`, as
  recorded below. Browser at 1440px: profile page hero (timeline dots on the
  rule, button and icon on one row). The popup was not opened in the browser.

## 2026-11-12 — Header tone fixes and review follow-ups

- Outcome: "Make an enquiry" now follows the header's live tone, so it is
  navy on the white header instead of white-on-white. Tone changes fade over
  400ms instead of snapping (shell colour, border, shadow, text, nav pill,
  button, logo crossfade). Reverted H2: the current page uses the designer's
  filled pill again. Reverted P2: the Practice areas second paragraph is back.
  Share menu order is WhatsApp, X, "Share via another app" (was "More apps"),
  then print.
- Files: `hooks/use-header-tone.ts` (new context), `sticky-header.tsx`,
  `header-enquiry-button.tsx`, `brand-logo.tsx`, `site-navigation.tsx`,
  `app/styles/surfaces.css`, `share-controls.tsx`, `content/insight-copy.ts`,
  `content/practice-index.ts`, `practices/catalogue-section.tsx`, docs.
- Checks: `pnpm format:check`, `lint`, `typecheck`, `test` (164 passed) and
  `knip` (clean). Build not run. Browser at 1440px on Practice areas: white
  header with navy pill, navy enquiry button and navy logo; second intro
  paragraph back; 400ms transitions confirmed in computed styles.

## 2026-11-12 — Polish review batches 2–5 and G2/G3 (user-approved)

- Outcome: the user asked to build everything left in one pass and review
  after. Done: G2 (6 repeated labels), G3 (5 extra enquiry buttons), A1/A2
  (labelled Share button; share row at the end of articles), G5 (phone
  preview line), I1 (phone filters sheet), PR1/PR2 (profile page on the shared
  hero; milestone list on page and popup), H1–H3 (header follows dark
  sections, current page underlined, no "Home" in the desktop menu) and PE1
  (no arrow circle on person cards, Home included). P1 held; P3 superseded.
- New files: `hooks/use-header-over-dark.ts`,
  `components/insights/filter-sheet.tsx`, `components/people/profile-hero.tsx`,
  `components/people/milestone-list.tsx`.
- Changed: `components/shared/detail-hero.tsx` (optional label, subtitle,
  optional lead), share controls (per-row popover ids), toolbar, site shell,
  preview banner, sticky header, site navigation, person card, profile body
  and intro, profile page route, the dark heroes and footer
  (`data-header-dark`), firm values and process sections, SME and practice
  detail, experience listing and detail, practices hero, and content in
  `insight-copy.ts`, `profiles.ts`, `firm.ts`. Removed the unused
  `coreValues.action`, `workingWithUs.action`, `moreShare` and
  `backToPeople` copy.
- Checks run: format:check, lint, typecheck, test (19 files, 164 tests), knip
  (clean) and `pnpm build` pass. Browser: The firm at 1440px (menu, underline,
  header turning white past the hero), article share menus at 1440px, profile
  at 1440px and 375px, Insights filters sheet and preview line at 375px.
  Home was checked at 800px only; the 1440px Home pass is left to the user's
  review.
- Correction: the full desktop menu shows from 1440px, not 1024px, so H3's
  "room at 1024–1280px" reason in the review was wrong. Below 1440px the menu
  is the phone sheet.
- Remaining: the user's review of all batches; nothing committed.

## 2026-11-12 — Polish review batch 1 (G1, G4, P2; user-approved)

- Outcome: first batch from the Polish Review decisions. The desktop
  breadcrumb lists parent pages only (G1). Insight cards, the featured badge
  and the key-takeaways box lose their decorative icons; card meta reads
  "date · reading time"; all icons outside Home use a 1.5 line (G4). The
  Practice areas listing keeps one intro paragraph; "Our practice areas
  support…" is removed (P2).
- Files: `components/shared/page-trail.tsx`, `components/ui/breadcrumb.tsx`,
  `components/legal/legal-page-layout.tsx`, `components/insights/article-card.tsx`,
  `components/insights/hero-section.tsx`, `components/insights/article-body.tsx`,
  `components/practices/catalogue-section.tsx`, `content/practice-index.ts`,
  `docs/design-system.md`.
- Review page: G2 and G3 now have spot-by-spot wireframes. After checking the
  code, G2 is 6 spots, not 9 (profile labels, "SME retainer" and "Our story"
  are not repeats). Both wait for the user's decision.
- Checks run: format:check, lint, typecheck, test (19 files, 164 tests) pass.
  knip reported `BreadcrumbPage` (`components/ui/breadcrumb.tsx`) as unused;
  the user chose to remove it. Browser: Insights listing and an
  article at 1024px, Practice areas at 1024px, Privacy at 1024px and 375px.
  Build not run.
- Remaining: G2/G3 decisions; batches 2–5 (share, phone screens, profiles,
  header and person cards).

## 2026-11-11 — Client correction batch

- Outcome: the client's review corrections are in for local review. See
  `docs/client-alignment.md` (11 November) for the full list and open questions.
- Files: `content/practice-index.ts`, `content/people.ts`, `content/firm.ts`,
  `content/navigation.ts`, `content/footer.ts`, `content/faqs.ts`,
  `components/home/firm-story-section.tsx`, `components/shared/faq-section.tsx`,
  `components/firm/people-section.tsx`, `components/firm/journey-section.tsx`,
  `components/people/directory-leadership-section.tsx`, `lib/people/profiles.ts`,
  tests (`people-directory`, `search`, `insights-presentation`, `profiles`),
  `docs/routes/the-firm.md`, `docs/routes/home.md`.
- Removed the unused `founderRole` and `shortLabel` fields; `role` and `label`
  now carry those values.
- Checks run: format:check, lint, typecheck, test (19 files, 164 tests) pass.
  knip then reported `components/ui/avatar.tsx` and `@radix-ui/react-avatar` as
  unused; the user chose to remove both. Architecture, design-system and README
  no longer list Avatar. The three stock FAQ photos in `public/images/stock/`
  (`team-01..03.jpg`) are unreferenced and kept pending the user's decision.
- Remaining gates: client consent for Selected matters, Careers readiness,
  social URLs, photoshoot images, awards content.

## 2026-11-11 — Install no longer depends on a .git folder

- `prepare` is now `git config core.hooksPath .githooks || true`. Without
  `|| true`, an install with no `.git` folder (as on Vercel) failed with
  `fatal: not in a git directory`; the same fix was made in wardwise.
- Verified: outside a git repo the script exits 0; inside the repo it still
  sets `core.hooksPath` to `.githooks`.
- `.gitignore` now ignores `/.claude/worktrees/`. A Claude Code session's
  worktree (a full copy of the repo) was untracked there, so `git add .` would
  have committed it, and knip reported its 261 files as unused. ESLint already
  ignores the folder in `eslint.config.mjs`. knip, format:check and lint pass.

## 2026-11-11 — Import rules, pre-commit check, knip report, log archive

- Before: the import direction in `.claude/rules/structure.md`, unused-code
  checks, commit checks and moving old log months were all manual. After:
  each is automated, and unused code is reported but never removed without
  the user's approval.
- `eslint.config.mjs`: a small project rule fails lint when a `"use client"`
  file imports a server-only module (`content/profiles`, `lib/people/profiles`,
  `lib/people/directory-data`, `lib/experience`); type-only imports are
  allowed. `no-restricted-imports` enforces app → components → hooks → lib →
  content. Allowed exceptions that already existed: hooks may use
  `components/ui/*` context hooks (`useCarousel`), and `content/` may use
  `lib/content`, `lib/publication`, `lib/routes` and `lib/insights/blocks`.
- `.githooks/pre-commit`: checks staged files with Prettier and ESLint, never
  changes them. `pnpm install` registers it via the new `prepare` script
  (`git config core.hooksPath .githooks`); no new dependency.
- `scripts/archive-log.mjs` (`pnpm log:archive`): moves earlier months'
  entries into `docs/archive/implementation-log-YYYY-MM.md`.
- `.claude/hooks/run-checks.sh` now also runs the archive, reports new knip
  findings once per session for the user to decide on, and reminds Claude
  once per session when code changed without a log entry. The knip rule is in
  `.claude/rules/workflow.md`.
- Verified: lint passes on the codebase; test files breaking each import rule
  were caught and deleted; the pre-commit hook rejected a badly formatted
  staged file; the archive script moved fake September/October entries on a
  scratch copy and does nothing on the real log; the checks hook passed and
  reported knip once, then stayed quiet for the same findings.
- knip findings, decided by the user: kept
  `components/practices/experience-{carousel,section}.tsx` (the client asked
  to remove the practice-page experience section for now; it is expected
  back), added to `knip.json` ignore. Dropped the unused `export` on
  `InsightTypeBadge`, `ArticleCard`, `shareCardSize`, `articleBlockText` and
  `profileLinkPlatforms` (still used inside their own files). knip is clean.
- Passed format:check, lint, typecheck, 164 Vitest tests and knip.

## 2026-11-10 — Claude Code hooks run the project checks

- Before: formatting, lint, typecheck and tests ran only when someone
  remembered to run them. After: they run automatically in Claude Code
  sessions on this repo.
- `.claude/settings.json` adds two hooks. After every file Claude writes or
  edits, `.claude/hooks/format-file.sh` runs Prettier on that file and
  `eslint --fix` on JS/TS files, and sends any remaining lint errors back to
  Claude. When Claude finishes a turn with uncommitted changes,
  `.claude/hooks/run-checks.sh` runs `pnpm format:check`, `lint`, `typecheck`
  and `test`, stopping at the first failure and sending Claude back once to
  fix it. A turn with a clean working tree skips the checks.
- `pnpm build` is not in the hooks; it stays a manual check at handoffs.
- Verified: both scripts pass when run directly (the full check run took
  about 8s), and an Edit with a formatting error in `lib/content.ts` was
  reformatted automatically, leaving no diff. Disable or review with `/hooks`.

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

## 2026-11-11 — Above-the-fold image loading audit

- Added eager loading to practice-detail hero media, profile portraits and the
  People directory leadership portrait. These slots currently use fallback
  covers/initials, and will request supplied photographs immediately.
- Confirmed existing eager/preload handling for Home, Firm, Selected matters,
  Insights featured media, article heroes and brand logos. Browser checks at
  the current desktop viewport covered those five page types and filtered
  Insights. No LCP image-loading warnings appeared during those checks. Filtered
  archive images were below the viewport and retained their lazy loading.
- Passed format:check, lint, typecheck, 164 tests across 19 files, webpack
  production build (66 generated pages) and git diff --check.
