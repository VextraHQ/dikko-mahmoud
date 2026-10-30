# The Firm implementation spec

Status: `/the-firm` is implemented as a no-index local visual review checkpoint.
Original media, advisory membership and specified editorial gaps remain open.
Decisions recorded on 2026-10-29. This document owns the page scope and acceptance
criteria; architecture/design/layout docs retain ownership of shared rules.

## Agreed boundary

- Leave the homepage's visual design unchanged while the client reviews visual
  identity and supplies imagery/content. This is a review hold, not launch approval.
- Implement `/the-firm` next. Reuse real repeated pieces, with narrow extractions
  that preserve the homepage's current appearance and behaviour.
- Confirmed Journey: **Select a year on desktop + mobile accordion**. The user
  explicitly selected this after exploring the alternatives. The vertical reading
  timeline was explored and is not the chosen direction.
- People: founder introduction followed by visible advisory groups; one canonical
  person collection and shared standard person card. The compact group selector
  was an alternative, not the implementation baseline.
- Hero: reuse/adapt iProduce's optional-video poster pattern. Show a play control
  only when a valid video is supplied; otherwise show the poster/fallback alone.
- Sanity, submission services, other secondary pages, profile routes, deployment
  and the later Claude workflow remain outside this page checkpoint. Preserve
  user-added Analytics and the existing no-index policy.

## Sources and content certainty

The user supplied eleven screenshots, indexed at the end of this document.
Desktop screenshots cover the page. The supplied mobile frame was retrieved
for the full page on 2026-10-29; the agreed compact People grid supersedes its
single-column placeholder cards.

The existing design file key is `cTCfNuHT1z0kcSlUcT9CCM`. Firm references supplied in the implementation chat:
[desktop 1:10924](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-10924)
and [mobile 1:11914](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-11914).
The mobile context and screenshot loaded; the exact desktop request returned
the Starter-plan MCP call-limit error. Supplied desktop screenshots were used
for that reference, without repeated broad requests. Do not infer node IDs. Use the required Figma skill/workflow for
focused context, states and assets before implementation. Previous Starter quota
failures are historical, not proof that tools are currently unavailable. If a
focused request is blocked, use supplied screenshots and document the exact gap;
do not repeatedly request broad context or stop unrelated sections.

The interactive comparison lives locally at
`/Users/nabeelhassan/.codex/visualizations/2026/10/26/01a17937-2ca9-7fe3-ae6a-f26d47f1d1fe/firm-section-choices.html`.
It demonstrates behaviour, not approved biographies, media or group assignments.
Its neutral profile slots are not real people. Do not use screenshot crops or
wireframe graphics as public-site photographs.

## Page order and implementation mapping

1. **Hero:** deep navy, shared navigation, “Built on experience. Guided by
   principles.”, supplied introduction and a wide media poster. Use a single h1.
   New Firm hero section; shared optional video-poster boundary where justified.
2. **Our story:** “A firm built for decisions that matter.” with editorial copy
   in a desktop two-column layout, stacked on mobile. Keep supplied text local;
   review repeated opening wording without inventing biographical claims.
3. **The firm at a glance:** reuse `firmFacts` from `content/firm.ts` and extract
   the existing presentation from `components/home/firm-at-a-glance-section.tsx`
   into a shared section. Home retains white; Firm uses the supplied pale surface.
   Do not duplicate metrics or turn Lagos liaison into a third full office.
4. **Journey:** new Firm-specific explorer, detailed below.
5. **Core values:** “Experience that works for you.” with Transparency,
   Accountability, Efficiency and Professionalism. Use supplied descriptions,
   divider-based rows and the existing ArrowButton. No accordion is needed for
   this short readable list.
6. **Working with us:** “From the first brief to final delivery.” and six source
   steps: Your brief; Gather the facts; Develop the strategy; Discuss the advice;
   Put the plan to work; Close the engagement. Use a semantic ordered list,
   three columns where room permits, then two/one. Keep confidentiality and
   process wording within the supplied copy; do not add service promises.
7. **People behind the practice:** founder feature and three advisory groups,
   detailed below. Reuse the person domain, not a copied homepage section.
8. **Our presence:** introduction, media and Abuja/Kano/Lagos liaison cards.
   Read addresses, phones, email and hours from `content/contact.ts`. Do not
   create a parallel office collection or fabricate a Lagos phone number.
9. **FAQ:** reuse the existing Accordion/support-card presentation with Firm
   content: “Get to know the firm.” and the five source questions. The current
   FaqSection accepts items but hardcodes the homepage intro; extract a shared
   section with explicit intro/items props and keep Home's defaults unchanged.
10. **Enquiry CTA:** page-owned `EnquiryCta`, using the pale variant in this
    reference; retain white as an existing option. Preserve mobile overlap.
11. **Footer:** the existing SiteFooter is already mounted by the site layout;
    do not mount another footer in the page.

## Journey interaction contract

- Ordered source milestones: 1993, 2001, 2016, 2021, Today. Source titles are
  “Our story begins.”, “A mark of distinction.”, “Leadership beyond the firm.”,
  “The next generation of leadership.” and “Built on experience. Looking ahead.”
- Desktop from `lg`: year/title index with selected description on the left;
  corresponding media/caption and small previous/next controls on the right.
  Start at 1993 and keep one selection. Clicking the selected year leaves it open.
- Mobile/tablet: a single-open, collapsible Accordion. Start at 1993; its text,
  media and caption sit directly under the selected year. The current item can
  close. Keep the years visible and omit redundant desktop paging controls.
- Rows and arrows update one selection. Disable arrows at chronological ends.
  No looping, autoplay, hover selection, scroll hijacking or parallel carousel.
- Use the shared shadcn/Radix Accordion where its composition fits. Preserve
  keyboard activation/focus, expanded/controls relationships and reduced motion.
  Prefer one responsive DOM when readable; never force elaborate CSS to avoid
  a small presentational duplication. Maintain one content collection/state.
- The user now approved Motion for restrained Journey content swaps, informed
  by iProduce’s short-distance easing. Keep hover feedback in CSS. No hand-written
  measurement effect or new scroll observer is required; scroll-driven history
  remains a reference only.
- Each milestone owns optional media/caption. Missing media uses the existing
  brand/initials fallback; do not pretend to have a distinct archival photograph.
  Keep an active preview stable during image loading/failure.
- Source first-milestone copy is visible. The founder feature supplies the 2001
  and 2016 facts, but exact collapsed Journey wording, 2021 and Today bodies,
  media/captions need focused retrieval/editorial confirmation. Do not invent
  history or derive milestones from the wireframe's illustrative wording.
- Without JavaScript, the historical text must remain readable through a simple
  static/disclosure fallback. No empty timeline shell or offscreen focus targets.

## People records, cards and future profiles

`content/people.ts` currently owns four supplied homepage preview records. Evolve
that domain into canonical people with stable IDs and readable profile slugs;
retain compatible exports for the homepage and FAQ avatars where useful.

- Homepage feature selections and Firm advisory groups reference person IDs.
  Keep names, roles, portraits/crops and eventual biography data on the person,
  rather than repeating objects across page collections.
- Extract a shared `PersonCard` from the homepage's portrait/name/role treatment.
  The page owns headings and grid columns. Allow actual crop/size differences
  through a small prop or className, not a general card/section configuration API.
- The founder feature uses the same person's record with its own editorial
  composition; do not force its biography/milestones into the ordinary card.
- Source group labels: Corporate & Commercial Advisory; Government & Policy
  Advisory; Energy & Oil & Gas. Each group intends three distinct curated people.
  The same three screenshot portraits are design placeholders, not assignments.
  Confirm actual membership; keep neutral missing-assignment slots separate from
  canonical person records. Do not invent nine lawyers or repeat the existing
  three people just to fill the groups. A real person may later legitimately
  belong to multiple areas when confirmed.
- Baseline: three cards per group on desktop, compact two-column cards on mobile
  with natural wrapping for the third card. Keep every group heading readable.
  This curated preview does not grow automatically to the full 25-plus directory.
- Future cards lead to `/people/[slug]` with one profile per person. This checkpoint
  prepares the contract/card; it does not build dummy profile pages. Keep a clear
  preparation notice until the real profile destination exists. Use a real Link
  when enabled, and preserve one accessible name/target per card.

## Shared ownership and permitted files

- New route: `app/(site)/the-firm/page.tsx`, a thin Server Component with route
  metadata that retains inherited no-index behaviour.
- New full sections: `components/firm/*-section.tsx`; small interactive children
  own Journey/video behaviour. Other sections remain Server Components.
- Shared repeated presentation: `components/shared/` for PersonCard, reusable
  facts/FAQ sections and optional VideoPoster. Keep thin homepage wrappers/defaults
  if that preserves imports and reduces churn.
- Content: extend `content/firm.ts` for Firm editorial collections and milestones;
  keep people in `content/people.ts`, contacts in `content/contact.ts`, and Firm
  FAQ copy in the FAQ/firm content domain. No speculative CMS schema/query layer.
- Existing shared layout/footer/header, `content/navigation.ts`, relevant Home
  wrappers and CTA links may change only for reuse and the new real destination.
  Existing design/layout/styles rules apply; do not add per-section stylesheets.
- iProduce reference: `/Users/nabeelhassan/Desktop/iproduce-africa/components/shared/video-poster.tsx`.
  Adapt its poster-only/click-to-load behaviour to this project's ImageWithFallback
  and Button rather than copying its unrelated types, tokens or services. No
  provider iframe/script/request before activation; no play control without video.
- Check the dark Firm hero with the existing mobile header backing, sticky
  geometry and top/scrolled states. Make a small scoped surface adaptation only
  if required; do not restructure route groups or change Home's header treatment.

## Navigation activation

Only after `/the-firm` exists, set its navigation record available and replace
its preparation triggers with real links in desktop/mobile navigation, footer
About us and the homepage “Discover our story” CTA. Preserve active-page styling,
`aria-current`, mobile-menu closing and keyboard focus. Route activation and
mechanical extraction are the explicit exceptions to the homepage visual hold.

Other unbuilt destinations keep their existing notices. The mobile navigation
Sheet remains the menu; do not remove it while removing placeholder dialogs for
The Firm. Do not remove PreviewDestination globally or enable 404 links. Contact,
booking, profile and article availability belong to their own route milestones.

## Efficient build order and review gates

1. Read canonical docs/current diff once; inspect only affected components.
   Retrieve focused Firm context and actual copy, then list remaining gaps once.
2. Extract the minimum repeated pieces and create the thin route/content skeleton.
   Verify Home still looks the same. Do not restart wireframing or registry research.
3. Implement static story/facts/values/process/presence and shared FAQ/CTA. Missing
   media or team assignments must not block these independent sections.
4. Implement the agreed Journey and conditional video boundary; compose founder/
   group previews from canonical records. Keep unfinished content explicit.
5. Activate The Firm links, review both routes and update the factual log/status.
   Stop at the Firm visual checkpoint; do not start other pages automatically.

These are implementation slices, not promises of elapsed time. Use one review at
an assembled page checkpoint rather than requesting approval for every section.
Work directly after the design/source check; surface genuine content decisions
without repeatedly asking about already agreed choices. No subagent is required;
if the user explicitly requests one, use a bounded source inspection/review with
shared foundation edits under one owner.

Use the dev server and targeted formatting while iterating. Batch lint/typecheck
at meaningful completed slices, and run one production build for the route/shared
component handoff, repeating only for actual changes/failures that justify it.
Do not build after every copy or spacing adjustment. Inspect 1440, 1280/1024, 768,
390 and 320px; use an isolated browser, never the user's live apps/screen.

## Acceptance checklist

- [x] Supplied section order/content mapped; missing approvals recorded once.
- [x] `/the-firm` renders with one h1/main/header/footer and correct active nav.
- [x] Homepage visuals/interactions preserved after extraction/link activation.
- [x] Facts, people and contacts have one canonical owner; no copied identities.
- [x] Journey state, arrows, mobile collapse, keyboard and reduced motion work.
- [x] Poster-only, missing/failed-poster and supplied-video states are verified;
      use an isolated fixture if a real video is unavailable, with no fake URL.
- [x] Responsive wrapping/crops/CTA overlap, focus return, menu closing and image
      fallbacks pass; no horizontal overflow or hidden focusable content.
- [x] No-JS historical content and normal page reading remain usable.
- [x] Format, lint, typecheck, production build and whitespace checks pass.
- [x] Docs/log distinguish local review readiness from content/launch approval.

## Approved visual refinement — 2026-10-29

The user requested shorter image cards and a more responsive feel throughout
The Firm. Founder and advisory cards use square media, while the wide hero,
Journey and presence slots retain their existing proportions. Home portraits
keep their original crop. Neutral square-cover numbers stay centred on mobile.

Static story/value/process/fact rows keep quiet hover colour, surface or rule
feedback, with stationary text and ordinary semantics. Picture feedback is now
a stationary-frame 550ms zoom/shadow, triggered by the picture area itself rather
than names/captions. Contact cards keep soft shadows without vertical movement.
Hero/presence media retain a fine hover edge. Journey rows/arrows have hover and
keyboard-focus feedback; selected copy/media now use the user-approved scoped
Motion slide/fade (650ms incoming media, 250ms exit, 550ms copy). Desktop media
lives in a persistent grid while mobile media stays in the active disclosure.
Selection remains activation-only. CSS movement is motion-safe; a live Motion
preference query cancels transitions immediately under reduced motion. FAQ/CTA
feedback and Home defaults remain. No registry or theme reset was installed.
The broader choreography pass remains separately scoped.

## Implemented checkpoint and remaining approvals

All eleven source sections are mapped; the single shared footer remains in the
layout. Home facts/FAQ/cards use shared presentation, and Firm links are enabled
in desktop/mobile navigation, footer About us and Home’s story CTA. Canonical
people have stable IDs/slugs and future-profile availability; advisory groups
reference IDs and currently reserve three neutral assignment slots each.
No person profile or other secondary route has been added.

Publication gates remain explicit:

- Original office, founder, milestone, presence and advisory media. Figma labels
  include concept imagery/replacement portraits; no screenshot crop or substitute
  photo was installed. Canonical portraits remain null, preserving Home’s hold.
- Confirm three curated memberships per advisory group. Repeated screenshot
  faces are not treated as assignments.
- 2021 and Today Journey bodies/media/captions. 2001/2016 currently use the
  founder’s supplied milestone facts; exact extended Journey wording remains open.
- Four collapsed Firm FAQ answers: source questions are present, with explicit
  editorial-confirmation notices rather than invented answers. The supplied first
  answer is retained.
- Story’s repeated opening and unanchored “Their experience” wording need client
  editorial review; supplied text is retained rather than rewritten into claims.
- No video source is supplied; the page correctly has no play control. Valid
  embed/native video, poster failure and focus are covered by isolated local
  fixtures outside the repo, with no public test route/provider URL.

This is a completed implementation checkpoint with content gates, not final
client visual/content or launch approval. The historical kickoff prompt remains
in `../handoffs/the-firm-next-chat.md`; follow the current source here for review.

## Local screenshot index

These paths were verified on this machine. They are reference material, not
portable production assets; the exact Figma links are recorded above.

- [Hero / optional video](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_DqiaoF1ZPF/CleanShot 2026-10-29 at 5 .02.52@2x.png>).

- [Story and facts](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_M4zzVXFk13/CleanShot 2026-10-29 at 5 .02.58@2x.png>).

- [Journey desktop](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_6T9rL2t1Nk/CleanShot 2026-10-29 at 5 .03.09@2x.png>).

- [Journey mobile](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_PMymdKJ9fS/CleanShot 2026-10-29 at 5 .06.04@2x.png>).

- [Core values](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_amaVdAu9bv/CleanShot 2026-10-29 at 5 .03.15@2x.png>).

- [Working with us](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_baMmex9sv3/CleanShot 2026-10-29 at 5 .03.21@2x.png>).

- [Founder and first advisory group](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_zTZWepOj3Y/CleanShot 2026-10-29 at 5 .03.32@2x.png>).

- [Remaining advisory groups](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_QgzCX4ZL6L/CleanShot 2026-10-29 at 5 .03.41@2x.png>).

- [Presence and contact cards](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_oYZUz0sydo/CleanShot 2026-10-29 at 5 .04.27@2x.png>).

- [Firm FAQ](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_AxSXbIXH8z/CleanShot 2026-10-29 at 5 .04.35@2x.png>).

- [CTA and shared footer](</Users/nabeelhassan/Library/Application Support/CleanShot/media/media_dllPu4JGis/CleanShot 2026-10-29 at 5 .04.41@2x.png>).
