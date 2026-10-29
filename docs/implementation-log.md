# Implementation log

## 2026-10-27 — Hero accessibility and Tailwind parser diagnostics

- Reproduced the reported Biome warnings, then replaced the slide and selector
  wrappers with native fieldsets and screen-reader-only legends.
- Enabled Biome's Tailwind v4 parser without adding a dependency or replacing
  ESLint/Prettier. Removed custom `@layer`/`@apply` rules from global CSS, moved
  body defaults to layout utilities, and kept valid `@theme inline` branding.
- Kept the broader hero/layout refactor deferred pending this diagnostic fix.
- Verified the targeted Biome accessibility rules and CSS parser, format, lint,
  typecheck, production build, and native group names in the generated HTML.

## 2026-09-30 — Temporary holding page

- Added a restrained responsive development notice to the root route for use
  before the approved website design is implemented.
- Kept the page dependency-free and free of CMS, forms, navigation, service
  claims, contact details, or business logic.
- Added temporary metadata with `noindex, follow` and documented that the
  visual treatment is not the future design-system direction.
- Stopped tracking Next.js-generated `next-env.d.ts`; type checking now runs
  Next.js type generation before TypeScript.

## 2026-09-30 — Repository foundation

- Created the local Next.js App Router foundation with TypeScript, Tailwind CSS,
  ESLint, Prettier, and the `@/*` root import alias.
- Added minimal ownership folders, a reserved Sanity boundary, environment and
  ignore-file baselines, and the initial documentation system.
- Initialized local Git on `main` without a remote.
- Verified formatting, dependency installation, lint, type checking, production
  build, and a local HTTP response from the root route.
- Left design, content, routes beyond `/`, components, CMS schemas, business
  logic, external services, and deployment intentionally unimplemented.

## 2026-10-26 — Figma audit and homepage implementation brief

- Inspected the new development file's desktop and 390px mobile homepage frames,
  variable definitions, section metadata, and focused hero contexts/screenshots.
- Recorded Newsreader/Manrope, navy/cyan brand roles, Tailwind-first rules,
  shadcn reuse, permitted icon substitutions, responsive structure, build order,
  and content requiring final approval.
- Advanced the documentation from setup-only to the homepage milestone while
  keeping planned foundations distinct from current runtime implementation.
- Added no runtime code, dependencies, asset downloads, or provider connections.

## 2026-10-26 — First homepage visual review checkpoint

- Preserved the existing audit/documentation changes and implemented only
  fonts, brand theme, minimal shadcn-style primitives, responsive navigation and
  hero. Footer and following homepage sections remain pending review.
- Added locally hosted Newsreader/Manrope with OFL licences, semantic navy
  colours, shared CVA/Slot Button and arrow composition, Radix Sheet, and Lucide
  UI icons. Page/layout remain Server Components; interactive boundaries are
  in the header, Sheet/notices and hero. Copy lives in `content/`.
- Compared iProduce's docs, globals and primitives. Reused its ownership and
  semantic theme pattern while keeping Tailwind's scales and Dikko's branding.
- Retrieved focused hero/mobile-menu contexts and screenshots, all five actual
  carousel text records, and Button state metadata. Downloaded the supplied
  logo and opening photograph locally. Figma's Starter MCP limit blocked the
  other four photos; those slides have empty navy image surfaces and the
  preview starts paused. Full carousel visual sign-off remains open.
- Added manual/keyboard slide selection, five-second optional playback,
  pause/resume and motion/focus/hover/visibility safeguards. Secondary actions
  display explicit preparation notices rather than missing routes or fake
  submissions. Metadata stays no-index; no external service was connected.
- Browser-reviewed desktop 1440px, tablet 768px, mobile 390px and all slide copy
  at 320px without horizontal overflow. Checked menu/notices, keyboard controls,
  focus return and playback; corrected the portal arrow-key issue identified
  by an independent read-only review. Final production output was inspected.
- Passed format, lint, TypeScript and standard production build. Initial Google
  Font network failures were removed through local font hosting; a cached
  Turbopack sandbox failure was resolved by moving aside generated cache. A
  webpack fallback build also passed. No deployment was performed.

## 2026-10-26 — Hero photograph export recovery

- Used the native Figma desktop File → Save Local Copy workflow, with the user
  completing the native save dialog after computer-use control stalled.
- Extracted the four missing original image fills from the saved `.fig` ZIP by
  their previously verified Figma hashes. Inspected each source photograph and
  verified all four are unmodified 1248×832 PNGs. Stored only the four needed
  assets under `public/images/hero/`; moved the full export to `/tmp/`.
- Connected corporate, capital-markets, energy and policy photographs in
  `content/home.ts`. Preserved the energy slide's source fill without the black
  overlay, and enabled the specified initial five-second autoplay with existing
  pause, focus/hover, visibility, keyboard and reduced-motion safeguards.
- Browser-reviewed all four added images on desktop and mobile; confirmed image
  loading and no horizontal overflow. Rechecked tablet and narrow layouts.
- Updated current documentation to remove the resolved missing-photo gate while
  retaining the earlier checkpoint history. Format, lint, typecheck and standard
  production build passed. Remained at the first visual review checkpoint.

## 2026-10-27 — Favicons

- Preserved the user-exported 2048×2048 transparent emblem at
  `public/brand/logo-favicon.png`. Generated a multi-size `app/favicon.ico`
  (16/32/48px), `app/icon.png` (512px), and `app/apple-icon.png` (180px), using
  Next.js file conventions as in iProduce Africa. Kept proportions and centred
  padding; the Apple icon has a white background.
- Inspected generated artwork and checked the ICO entries and PNG dimensions.
  Confirmed all three icon links in production HTML. The fine emblem details
  soften at the smallest favicon size. No package or layout changes were needed.
- Passed format, lint, typecheck, and production build. Preserved existing work.

## 2026-10-27 — Shared layout and responsive hero refactor

- Bound local Cursor settings to `biome.json`, which restarted its Biome server.
  Disk logs subsequently reported zero diagnostics for `app/globals.css` after
  document changes. Kept valid Tailwind v4 `@theme inline`; no custom `@layer`
  or `@apply` rules, global editor changes, or Biome dependency were introduced.
- Moved the homepage to `app/(site)/page.tsx`; its shared layout now owns the
  header, skip link and main landmark. Split the server-rendered SiteHeader
  from its interactive MobileNavigation Sheet. Existing content, icons, assets
  and preparation notices were preserved.
- Replaced custom slideshow playback state with the horizontal shadcn/Embla
  composition. Added only `embla-carousel-react` as a direct dependency, with
  native fieldset/legend groups, inactive-slide `inert`, swipe, looping,
  keyboard navigation, desktop segments and manual-change announcements.
- Hero markup is server-rendered and HeroControls owns selection presentation.
  Autoplay, reveal animation and their timer/browser subscriptions are deferred
  until layouts are approved. Only the first hero image is preloaded.
- Replaced fixed hero offsets with a capped shared width, equal-height slide
  columns, viewport-aware desktop height and fluid CTA spacing. Mobile uses
  the reference counter and two arrows; image height remains 300px on mobile
  and 384px on tablet. Fixed keyboard shortcuts so slide CTA/dialog focus cannot
  be stranded by selecting a different, newly inert slide.
- Verified the production build in isolated headless Chromium at 1920×1080,
  1440×935, 1280×720, 1024×768, 768×1024, 390×844 and 320×700. All five slides
  passed overflow, heading bounds, stable-height and active-slide isolation
  checks at every width. Checked wraparound, arrow keys, root/CTA focus,
  portal isolation, menu Escape/focus return, pointer swipe and the single hero
  image preload. No runtime page errors were recorded. Saved responsive PNGs
  in the task visualization directory; no user-screen observation was used.
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, targeted Biome
  accessibility/CSS checks and `git diff --check` passed. Footer and remaining
  sections are still next; the full homepage is not marked complete.

## 2026-10-27 — Hero motion and image-delivery polish

- Added the matching Embla Fade 8.6 plugin for manual photograph crossfades.
  Browser frame sampling reached 99% opacity in about 582ms with duration 40;
  this is observed physics-based timing, not an exact millisecond API value.
- Separated the persistent navy panel, single expertise CTA and controls from
  the photo track. Stacked copy records reserve height and enter with a scoped
  8px/500ms CSS animation and 60/120ms stagger. Added a restrained CTA arrow
  hover movement. Hero copy/content mapping remains server-rendered.
- Added image decoding before button, segment and keyboard selection, adjacent
  image warming, and stale-request cancellation on newer selection, pointer
  drag, reInit and unmount. A preparation failure retains the current slide.
  Fixed pointer-event layering so the shared copy wrapper cannot block desktop
  photograph drags. Reduced motion disables the copy entrance/drag fade and
  makes control-driven selection immediate. Autoplay remains deferred.
- Compared actual Next Image WebP responses at qualities 75 and 85 for all five
  source photographs. Quality 85 reduced compression error and improved the
  inspected crop, adding about 12–58KiB per photograph at source resolution.
  The opening photo changed from 39.3KiB to 59.0KiB. Hero photos use 85; other
  images retain 75. Original image files are unchanged at 1248×832 and still
  require higher-resolution replacements for sharper large/Retina displays.
- Corrected the narrow-screen `sizes` hint to allow 450 CSS pixels for the
  300px-tall, 3:2 cover crop. Real DPR2 browser contexts at 320px and 390px both
  selected the 1080px variant. Confirmed a real touch-event swipe and retained
  the current slide after a simulated image decode failure.
- Production headless Chromium review passed all five slides at 1920×1080,
  1440×935, 1280×720, 1024×768, 768×1024, 390×844 and 320×700. Checked actual
  crossfade/stagger frames, stationary CTA and section height, no horizontal
  overflow, accessible active copy, wraparound, keys, swipe, menu/dialog focus,
  delayed-image request cancellation after dragging/resizing, and reduced
  motion including a live preference change. No runtime page errors occurred.
  Saved responsive review PNGs in the task visualization directory. No live
  observation of the user's screen was used.
- Format, ESLint, typecheck, production build, targeted Biome accessibility/CSS
  checks and `git diff --check` passed. Preserved parallel root-layout,
  dependency and placeholder-file edits. Footer and remaining homepage sections
  remain outside this focused hero polish pass.

## 2026-10-27 — Next homepage slice and ownership plan

- Reviewed the supplied desktop/mobile facts and firm-story screenshots and
  iProduce's section naming, content ownership, global CSS and motion guidance.
- Recorded the next-slice sequence in `docs/routes/home.md`: align hero file/CSS
  ownership, recover focused source context/assets, build facts/story, add
  restrained entry motion, review responsive behaviour, then move to footer.
- Documented the user's preference for `*-section.tsx` entries, `.ts` content
  modules and scoped custom CSS in `app/globals.css`. Existing hero CSS-module
  migration is planned, not completed in this planning-only turn.
- Flagged the repeated `2 + 1` versus `3 offices` wording for reconciliation.
  No new wireframe or additional screenshot request is needed for this slice.
- Documented targeted formatting/dev-server iteration, batched lint/typecheck
  and a production build at the completed runtime checkpoint. Updated roadmap,
  architecture and agent guidance. No runtime UI files were changed this turn.
- Verified documentation formatting and `git diff --check`; no build was run
  because this turn changed planning and documentation only.

## 2026-10-27 — Firm-at-a-glance and story implementation

- Implemented the approved next slice from supplied desktop/mobile references.
  A focused Figma story request confirmed the Starter MCP limit remains active;
  the user's explicit placeholder authorization allowed implementation without
  waiting for original media. No section screenshot became a runtime asset.
- Added server-rendered facts/story sections and shared `content/firm.ts`.
  Facts use four/two/one columns; story uses three desktop columns, an image
  above two tablet columns, and the supplied stacked mobile order. Reused the
  brand fonts, neutral Tailwind surfaces and existing Button/notice. Repeated
  office figures consistently say `2 + 1 / Offices & liaison`.
- Office and portrait slots are clearly labelled Lucide placeholders. Nullable
  media paths and alt text live in firm content, ready for supplied originals.
  Preserved the source-supplied name/caption without generating a fake portrait.
- Renamed the hero entry to `hero-section.tsx` and moved its module rules into
  scoped global CSS. `components/home/` now contains TSX presentation only.
- Added a small shared IntersectionObserver reveal helper with no dependency.
  Only offscreen content is enhanced; reveals run once, reduced motion and
  no-JavaScript keep content visible, and focus completes a reveal immediately.
  Kept years and figures literal. Preserved existing hero interaction and
  parallel layout/analytics/dependency edits.
- Browser review passed at 1440px, 768px, 390px, 320px and 1920px: expected fact
  rows, no horizontal overflow, explicit placeholders, CTA dialog/focus return,
  hero CSS/selection, live reduced motion and no-JavaScript visibility. Reviewed
  saved desktop/mobile screenshots and refined the long sector value and
  story-heading line breaks. No runtime page errors were recorded. Browser
  checks used DOM/application readiness instead of waiting for all network
  activity to stop. No live user-screen observation was used.
- Formatting, ESLint, typecheck, production build, targeted Biome CSS/a11y and
  `git diff --check` passed. Builds were limited to preview/final refinements;
  section iteration used targeted formatting. The footer is the next slice.

## 2026-10-27 — Sticky header and selected-clients checkpoint

- Kept RevealGroup limited to one-time motion for facts/story; section content
  and layout remain in their own server-rendered sections. No generic section
  or card engine was introduced.
- Added an observer-driven sticky header with the original desktop hero overlay
  at the top and a condensed navy surface after scrolling. Mobile retains its
  flow space. The default remains readable without JavaScript/IntersectionObserver,
  and anchor padding accounts for the bar. Shared desktop/mobile navigation now
  derives active state from pathname, including slash-delimited nested routes.
  Route availability remains explicit; no unbuilt pages or broken links added.
- Added the selected-clients section from the supplied screenshot with twelve
  anonymous logo slots and a visible review note. Copy/slots are owned by
  `content/clients.ts`; approved names and local logos can replace null fields.
- Added two slow opposing CSS loops, soft edge masks, pause/play and hover/focus
  suspension. Motion is progressively enabled; reduced motion/no-JavaScript
  show the static grid. Duplicate visual groups are hidden/inert for assistive
  technology. No packages were installed and no client relationship was invented.
- Browser verification passed at 1440, 1280, 768, 390, 320 and 1920px: sticky
  position/contrast, stable hero position, desktop spacing, active Home, mobile
  menu/nested notice/focus, marquee movement and pause, equal loop-group widths,
  twelve accessible slots, no horizontal overflow, reduced-motion and no-JS
  fallbacks. No runtime page errors were recorded. Saved desktop/mobile PNGs
  in the task visualization directory; no live user-screen observation used.
- Verified active-path matching against exact, root, nested and prefix-boundary
  cases. Format, ESLint, typecheck, production build, targeted Biome CSS/a11y
  and `git diff --check` passed. Preserved prior work and parallel edits.
- Stopped at the requested checkpoint. Practice areas and their animation brief,
  footer and other remaining sections were not implemented in this slice.

## 2026-10-27 — Align client marquee with iProduce

- Reused iProduce's actual `components/ui/marquee.tsx` primitive and its
  single-row partners layout: four repeat groups, 16px spacing, bordered cards
  at 180×64px/mobile and 240×80px/from-sm, and gradient edge overlays.
- Moved the shared animation definitions into Tailwind's theme, retaining the
  original repeat, reverse, vertical and pause-on-hover API. Added hidden/inert
  duplicate groups and kept Dikko's pause/readiness wrapper and static reduced-
  motion/no-JavaScript grid. Removed the custom opposing-row/50% loop styles.
- Preserved Dikko's copy, palette and anonymous logo slots. Preserved the
  40-second duration currently set in the working tree rather than overwriting
  that parallel adjustment with the iProduce partners callsite's 20 seconds.
- Browser verification passed at 1440, 768, 390 and 320px: source card sizes,
  one rail/four repeats, twelve accessible originals, movement, exact group-gap
  seam, pause/play and hover pause, static reduced-motion/no-JavaScript output,
  and no horizontal overflow or runtime page errors. Reviewed saved PNGs.
- Format, lint, typecheck, production build, Biome CSS/a11y and diff whitespace
  checks passed. No package added. Sticky header and practice areas unchanged.

## 2026-10-27 — Arrow-button and eyebrow primitives

- Added the approved `ArrowButton` composition over the existing CVA/Slot
  Button: three brand variants, sm/default/lg sizes, automatic matching circle,
  optional Lucide icon, shared reduced-motion-aware hover and decorative icon
  semantics. Added the small Button size; removed duplicated arrow assembly
  and the old ButtonArrow/trailingArrow API after migrating all current uses.
- Used Radix Slottable to retain a single anchor for asChild composition and
  preserve prop/ref forwarding through existing dialog triggers. Updated
  desktop/mobile enquiry, expertise and firm-story actions.
- Added the small Eyebrow primitive and migrated hero, facts, story and selected
  clients. Preserved facts as h2, paragraph semantics elsewhere, responsive
  typography, colours, content and section-owned spacing/layout.
- Documented the APIs and examples in the design system. No packages, route
  changes or service integrations were introduced. Preserved the main thread's
  sticky-header, client-marquee and other unrelated edits.
- Format, lint, typecheck and diff whitespace checks passed. Focused React SSR
  checks passed nine arrow-button variant/size combinations, asChild anchor
  structure, custom icon, disabled/submit attributes, ordinary icon buttons,
  and eyebrow heading/class overrides. Tailwind compiled the isolated examples.
- Browser verification was attempted but Chromium launch was blocked by the
  sandbox's macOS process permissions. No broader permissions were requested.
  No production build was run in this side conversation, to avoid changing
  the main thread's shared build output. Browser review remains outstanding.

## 2026-10-27 — Stable glass navbar polish

- Replaced the changing full-width/header-plus-nav backgrounds with one
  floating capsule. The content row stays 72px high with constant top/gutter
  spacing; the logo no longer moves or resizes in response to scrolling.
- Kept one IntersectionObserver with a fixed 64px marker. Scroll changes only
  an internal navy tint over 400ms, without animating padding, height, blur or
  position. Started from the readable top-state tint rather than briefly
  rendering the condensed/scrolled state during initial enhancement.
- Added a static 24px blur/saturation material, subtle border/highlight and
  shadow. Preserved the mobile hero's backing with a non-sticky navy layer.
  Main navigation now sits directly on the shell with 44px targets; mobile
  Sheet, route-aware navigation and shared ArrowButton behaviour are retained.
- Added solid fallbacks for unsupported blur, reduced transparency and increased
  contrast, and an immediate tint update for reduced motion. No package added.
- Updated layout, design-system and architecture docs. Format, lint, typecheck,
  targeted Biome CSS/a11y, Tailwind compilation and diff checks passed. Focused
  source checks confirmed scroll-state rules only alter opacity. The brightest
  modeled glass background retained approximately 5.08:1 white-text contrast;
  this is a calculation, not a browser screenshot contrast measurement.
- Automatic approval review rejected the isolated browser preview because the
  user's earlier instruction stopped screen observation. No workaround was
  attempted; visual/scroll verification awaits explicit permission. No
  production build was run, preserving the main thread's shared build output.

## 2026-10-27 — Restore default glass-pill navigation

- Adjusted the approved glass navbar to retain the original enhanced top-state
  composition: logo, glass navigation pill and white enquiry CTA. The full
  glass shell appears only after scrolling beyond the existing 64px marker;
  the inner nav material fades out as the outer shell fades in.
- Kept the fixed row height, gutters, logo dimensions and top inset unchanged
  between states. Only pseudo-element opacity transitions; backdrop filters
  remain static. The mobile Sheet is unaffected.
- Used an unset initial scroll state for a readable full-shell fallback when
  JavaScript/IntersectionObserver is unavailable, then enhanced to top/scrolled
  surfaces. Retained solid contrast/transparency and reduced-motion fallbacks.
- Updated design, layout and architecture documentation. Format, lint,
  typecheck, Tailwind/CSS compilation, Biome CSS and diff checks passed.
  Browser observation remained off following the user's response; no build,
  browser action, package or unrelated section work was introduced.

## 2026-10-28 — Editorial practice-area explorer

- Implemented the user-approved explorer after the desktop/mobile options
  review. Preserved all six supplied practice labels and introductory copy.
  Desktop has a numbered index and one stable visual panel; mobile/tablet
  opens the selected panel inline, keeping one area expanded at a time.
- Kept the section introduction server-rendered and used one local state for
  selection. CSS owns the active rule, 450ms desktop fade and 400ms mobile
  expansion. Reduced motion removes these transitions. No effects, timers,
  scroll listeners, animation package or generic section abstraction added.
- Used native buttons and named sections, with expanded/disabled semantics
  for the mandatory-open selection. Inactive panels are inert and hidden from
  assistive technology. Reused ArrowButton, Eyebrow and preparation notices.
- Added nullable image records in `content/practice-areas.ts` and explicit
  numbered photo placeholders. No source hero photos were passed off as the
  different practice-card images; no additional service claims were written.
- Updated the active milestone, section ownership, responsive layout and
  motion documentation. Preserved the user's committed header/client changes.
- Format, ESLint, TypeScript, production build, targeted Biome CSS/a11y and
  diff whitespace checks passed. An isolated headless browser passed all six
  selections at 1440, 1024, 768, 390 and 320px, keyboard selection, selection
  retention across resize, reduced motion, notice/focus return, server-rendered
  readability without JavaScript, and zero page errors/horizontal overflow.
  Desktop/tablet/mobile screenshots were inspected. No open user apps or native
  screen were observed. The local production preview is on port 3006.
- Practice assets and detail destinations remain publication gates. Remaining
  homepage sections are still queued; this entry does not claim completion of
  the whole homepage or deployment.
- Final 320px inspection exposed placeholder text overlapping the longest
  caption. Moved the mobile placeholder to a compact top row, rebuilt, and
  rechecked all six captions at 320, 390 and 768px with no overlap. Format,
  ESLint and TypeScript passed again after the correction.

## 2026-10-28 — Practice selection feedback

- Added visible circular selector arrows, a small press response, and a
  persistent white selected circle. Its arrow turns right toward the desktop
  panel or down toward the inline mobile panel. The incoming caption fades
  and rises 6px; all added movement respects reduced motion.
- Kept the existing state, layout and content ownership. Added no package,
  effect, timer or event listener. Updated the motion documentation.
- Format, lint, typecheck, Biome CSS and diff checks passed. Isolated browser
  checks against the existing `http://localhost:3000` dev server passed press
  feedback, persistent selection, directional rotation and caption animation
  at 1440, 768, 390 and 320px, plus keyboard/reduced-motion checks and no page
  errors or horizontal overflow. No additional production build was run for
  this scoped CSS/selector polish.

## 2026-10-28 — Mobile practice open/close policy

- Applied the agreed mobile/tablet behaviour: initially collapsed, tap to
  open/close, and at most one open area. Desktop still keeps a visual selected.
- Used a nullable index and one responsive `matchMedia` subscription through
  `useSyncExternalStore`, with a stable server snapshot. No scroll listener,
  package or duplicate responsive component tree was added. ARIA disabled
  semantics now apply only to the non-collapsible active desktop control.
- Format, lint, typecheck and targeted Biome checks passed. Isolated browser
  checks passed open/close, one-panel limit, keyboard and overflow at 320, 390
  and 768px; mandatory-open desktop behaviour at 1024 and 1440px; and selection
  and collapsed-state behaviour across resize, with no page errors.

## 2026-10-28 — Selected matters

- Used the user's two supplied screenshots after the focused Figma request was
  blocked by its Starter allowance. Matched the introductory heading/CTA,
  desktop navy feature and selector, and stacked mobile composition.
- Added the four screenshot-supplied organisations/categories to
  `content/matters.ts`. Default selection is Central Bank of Nigeria, retaining
  the supplied Federal Government revenue topic, Production Sharing Contracts
  summary and representative-experience qualifier. Three missing summaries
  display an explicit pending label rather than fabricated case details.
- Kept the introduction server-rendered; one local index drives manual hover,
  click and keyboard selection. Overlapping inert/inactive cards reserve a
  stable feature height and fade over 240ms. Explicit mobile selection focuses
  and scrolls the named preview into view; reduced motion removes the fade and
  uses instant scrolling. The shared CTA still opens the preparation notice.
- Independent static review found no meaningful defects. Isolated browser
  review passed all four selections, default copy, stable height, keyboard,
  preview focus/scroll and no overflow at 1440, 1024, 768, 390 and 320px; reduced
  motion, server-rendered default readability and zero page errors also passed.
  Desktop/tablet/mobile screenshots were inspected against the supplied design.
- Format, ESLint, TypeScript, targeted Biome CSS/a11y, production build and
  whitespace checks passed. No package, service integration, matter detail
  route or new image asset was introduced. User changes were preserved.
- This completes the selected-matters review slice. Three summaries and final
  publication approval remain open; people and later homepage sections follow.

## 2026-10-28 — Complete selected-matters preview copy and stop

- Applied the user-approved summaries drafted from the firm's published
  [experience page](https://dikkoandmahmoud.com/experiences/). BPE now opens
  first, following list order. CBN's supplied summary remains unchanged.
- Added consistent topics and representative-experience qualifiers for BPE,
  Kano and NNPC/NPDC. Attributed BPE counsel work to the managing partner and
  identified CBN as the advisory client in the NNPC/NPDC interest transfer.
  Renamed that category to energy-sector advisory to match the sourced role.
- Replaced the misleading `client` data field with `organisation`. All four
  records now require topic, summary and qualifier text; removed the unused
  pending-summary fallback and conditional empty slots. No outcome claims added.
- Format, ESLint, TypeScript, focused Biome a11y and diff checks passed. Isolated
  browser checks passed BPE's client/server-rendered default, all four summaries,
  stable card height, text containment, ARIA references, keyboard activation
  and no horizontal overflow at 1440, 768, 390 and 320px, with no page errors.
  Desktop and narrow-mobile screenshots were inspected. No additional production
  build was run for this copy/data-contract update.
- Updated the content brief, ownership notes and roadmap. Preserved unrelated
  edits, including the user's carousel change. Stopped here at the user's
  request; discuss the next approach before starting further homepage sections.

## 2026-10-28 — Maintainability audit and styling ownership

- Audited the current presentation code, content/contracts, dependencies/config,
  client boundaries, effects/subscriptions, semantics, route handling and docs.
  Independent read-only review confirmed cleanup/cancellation in the hero and
  observers, explicit unavailable routes, and no unjustified new packages.
- Moved practice states, marker/icon feedback, responsive positioning and card
  visibility/transitions into component Tailwind classes. Hero copy visibility
  also uses its data-state utility. Kept custom entrance/progressive fallbacks
  in `app/styles/motion.css` and glass materials/browser fallbacks in
  `app/styles/surfaces.css`, imported once through the root stylesheet.
- Reduced `globals.css` from 382 to 75 lines. The two focused stylesheets total
  196 lines, leaving 271 handwritten CSS lines overall rather than just moving
  the original file wholesale. This is an ownership/maintenance measure, not a
  claim about compiled bundle size or measured runtime speed.
- Removed matter pointer-enter selection and its hover instruction. Selection
  now requires click/tap or keyboard activation; hover only styles the control.
  Preserved BPE as the default and the four approved summaries.
- Fixed two audit findings: root smooth scrolling now respects reduced motion;
  the mobile Sheet's Home logo forwards its click handler and closes the menu.
  Added no service, dependency, generic section engine or new page section.
- Regression checks exposed active-group and desktop-breakpoint specificity
  conflicts during the CSS migration. Gated caption animation with `motion-safe`
  and added the desktop reduced-transition override; verified emitted production
  CSS behaviour in the browser rather than relying on source class order.
- Reconciled AGENTS, README/index, architecture, workflow, design/layout rules,
  roadmap and the homepage brief. Documented current ownership and scoped handoff
  requirements, and distinguished current rules from dated checkpoint history.
  Kept existing breakpoint compositions, documenting the measured header fit.
- Format, ESLint, TypeScript, targeted Biome CSS/a11y, production build and diff
  whitespace checks passed. Final isolated production-browser checks passed at
  1440, 1280, 1024, 768, 390 and 320px: rendered states/keyframes, all practice
  selections/collapse, click-only matters including non-selecting hover/focus,
  keyboard activation and no horizontal overflow. Desktop/mobile screenshots
  were inspected. Mobile logo close/focus return, marquee pause/play/hover,
  scrolled header, reduced-motion scroll/caption/panel behaviour at mobile and
  desktop widths, server/no-JS fallbacks and zero page errors also passed.
- Preserved unrelated user changes, including the carousel focus adjustment.
  Stopped at the audit review. People and the later Claude workflow remain
  separate next scopes to agree; no workflow/automation was created.

## 2026-10-28 — Hero split at lg

- Applied the user-requested split hero from `lg` (1024px), independently of
  full navigation's `xl` threshold. Photograph, navy panel, content and desktop
  slide controls switch together. Kept the stacked composition below `lg`.
- Added compact split-layout spacing/type rules between `lg` and `xl`, retained
  the wider layout's existing type/spacing, and removed reserved header flow
  height from `lg`. The compact menu uses its full glass surface over the photo
  so controls remain readable. No navigation links were squeezed into 1024px.
- Retained the two focused CSS files for shared keyframes/progressive fallbacks
  and material rules; ordinary hero layout stays in Tailwind. No package,
  component abstraction, carousel state or source image was changed.
- Format, lint, typecheck, Biome surface-CSS and diff checks passed; production
  build passed. Isolated production-browser checks passed all five slides at
  320, 390, 768, 1023, 1024, 1152, 1279, 1280, 1440 and 1920px: heading line fit,
  stable hero height, header/copy clearance, split/stack mode, control visibility,
  correct full-nav/menu breakpoint and no horizontal overflow. A 1024×600
  viewport, menu opening/desktop-resize dismissal and zero page errors passed.
  Representative lg/xl/mobile screenshots were inspected.
- A prior browser attempt was blocked by automatic approval-review usage limits;
  it ran through the normal approval path after the user resumed work. Development
  checks then isolated a stalled WebP request in the long-running local dev
  process: the same image returned normally in production. Verified its PID/cwd,
  restarted only that repository dev server, and rechecked all five slides and
  the compact menu successfully on `http://localhost:3000`.
- Updated canonical breakpoint/layout/source notes and preserved the generated
  Next.js agent-rule block once when restarting dev regenerated it. Existing
  unrelated edits remain. People analysis is next; no People section or Claude
  workflow was implemented in this slice.

## 2026-10-28 — Consistent header scroll material

- Removed the `lg`-to-`xl` exception that forced the full glass capsule to stay
  visible at the top. Enhanced top/scrolled/return-to-top states now follow the
  same 64px observer marker at every width. Kept fixed geometry, the `lg` hero
  split, `xl` full navigation and readable no-JS fallback.
- Gave the compact menu control a small contrasting background so removing the
  full top capsule does not leave its white icon directly over a bright photo.
  Reused existing Button variants/utilities; added no CSS rule or state.
- Updated architecture, design/layout rules and the homepage brief to supersede
  the previous compact-header exception. Preserved unrelated changes.
- Format, lint, typecheck, Biome surface-CSS and diff checks passed. Isolated
  browser checks at 320, 390, 768, 1023, 1024, 1152, 1279, 1280, 1440 and 1920px
  passed hidden top/shallow-scroll states, visible scrolled state, return to top,
  fixed header dimensions/position and no overflow. Normal opacity animation,
  reduced-motion behaviour, compact menu and no-JS material fallback passed,
  with no page errors. The lg top-state screenshot was inspected. No additional
  production build was run for this scoped CSS/control-style correction.

## 2026-10-28 — People, client perspectives and insights proposal

- Reviewed the five supplied desktop/mobile screenshots and iProduce's actual
  homepage article adapter, featured selection, testimonials and team fetch
  boundaries. Recorded the proposed four-profile cap, mobile grid/paged
  tradeoff, anonymous testimonial placeholders and one-plus-three article rules
  in the homepage brief. All remain proposals awaiting design review.
- Created an isolated seven-layout response wireframe: compact and paged mobile
  People options, desktop People, desktop/mobile client perspectives and
  desktop/mobile insights. Used labelled portrait/image slots and pending
  attribution rather than inventing photographs, endorsements or articles.
- Isolated browser checks passed at 736px and 320px across all seven layouts,
  including overflow, two-column profile cards, paging, testimonial state
  changes and local detail previews. No script errors were reported; embedded
  fonts loaded. Representative mobile People and desktop insights screenshots
  were inspected. Documentation formatting and diff whitespace checks passed.
- No live homepage code, dependency or service integration changed. Runtime
  lint, typecheck and build were not repeated for this planning-only change.

## 2026-10-28 — People, client perspectives and insights implementation

- Implemented the user-approved three-section slice after selected matters.
  People is capped at four supplied preview identities: four columns from `lg`,
  compact two-by-two below, 4:5 portrait slots and preparation-notice actions.
  It remains separate from the future full team directory.
- Added two anonymous testimonial preview slots with a neutral image fallback,
  explicit pending attribution, a persistent counter and manual previous/next
  controls using the existing Embla/Fade primitives. Identity and quote move
  together; inactive slides are inert/hidden and track height stays stable.
  Approved names without images derive initials. No autoplay or new package.
- Added the featured-plus-three insights composition: mobile introduction first,
  tablet feature/list beneath the introduction, desktop feature/intro/list.
  Titles and categories follow the supplied reference; images and article bodies
  remain explicit placeholders. Supporting IDs exclude the feature/duplicates.
  Profile/article actions reuse the preparation notice instead of missing routes.
- Content lives in three domain `content/` modules. Section entries remain Server
  Components; only testimonial carousel options/controls need a new client owner.
  Ordinary styling stays in Tailwind; no stylesheet/global CSS changes, CMS
  integration or generic section framework. Updated canonical status, ownership,
  responsive rules and handoff notes while preserving the earlier proposal work.
- Format, lint, typecheck, production build and diff whitespace checks passed.
  Independent source review found no blocking issue; its placeholder-label polish
  was applied. Isolated development and final production browser checks passed at
  1440, 1280, 1024, 768, 390 and 320px: People grid/actions/focus return, manual
  testimonial click/keyboard/wrap, active-slide isolation and stable height,
  insight ordering/actions, and no horizontal overflow or page errors. Normal
  motion, live reduced-motion changes and no-JS opening content passed. The
  production test waits for Radix's focus-return lifecycle before asserting focus.
  Desktop, tablet and mobile screenshots were inspected.
- Stopped for review. FAQ, enquiry/footer and whole-page QA are next. Approved
  portraits, testimonial identities/quotes, article content/images and real
  profile/article routes remain later gates; Sanity and Claude workflow are not
  connected.

## 2026-10-28 — Homepage-wide media and missing-content polish

- Applied the user-approved fallback treatment from the header/hero through
  Insights. Missing/failed images retain their reserved geometry and use actual
  firm-name text, portrait initials, decorative navy covers, editorial icons or
  supplied client names. Removed image/portrait/photograph-pending labels from
  visual surfaces; unapproved content review notes remain separate and explicit.
- Added one narrow ImageWithFallback client boundary around Next Image's error
  handling, plus a decorative EditorialCover. Existing section owners retain
  their markup/copy, dimensions, image sizes, preload and lazy loading. No new
  package, service integration, section engine or global CSS was added.
- Hero decode errors now allow selection into the matching slide's fallback;
  the existing request guard prevents delayed older failures overriding newer
  selections. Healthy photos, copy, fade/controls and breakpoints are preserved.
- Named client records replace anonymous samples, use text without a logo and
  remain static when there is only one. Supplied quotes replace sample slots;
  missing/blank quotes suppress all real attribution/photo fields. Preserved
  the user's third anonymous testimonial slot. One quote hides controls; empty
  sections are guarded. Untitled insights are skipped, a missing feature can
  promote a support record, and duplicate IDs remain excluded.
- Independent review identified whitespace-only testimonial names and long
  client-name wrapping; both were corrected. Isolated SSR fixtures passed those
  cases plus empty/blank lists, anonymous identity safety, single quote/initials,
  named clients without logos and feature promotion/deduplication, without
  changing repository content records for the tests.
- Format, lint (no warnings), typecheck, production build and diff whitespace
  checks passed. Development and final production browser checks passed at
  1440, 1024, 768, 390 and 320px: all five healthy hero slides, stable dimensions,
  practice selections, three manual testimonial slots, insight cards and no
  horizontal overflow/page errors. Blocking all image requests passed desktop
  and mobile logo/hero fallback navigation with normal/reduced motion. A delayed
  failed photo did not override a newer selection; a long text-logo fixture fit
  its 64px mobile card with the full accessible name. No-JS absent-media/server
  fallbacks passed; network-error replacement remains JavaScript-dependent.
  Representative desktop/mobile fallback screenshots were inspected.
- Updated canonical media/empty-content policy and current handoff status.
  Stopped before FAQ and enquiry/footer. Approved photographs, article bodies,
  testimonial approval and actual secondary destinations remain later gates.

## 2026-10-28 — FAQ, enquiry CTA and shared footer

- Implemented the user's seven supplied desktop/mobile references. A focused
  Figma FAQ request was blocked by the Starter tool limit, so the screenshots
  establish this slice's source. The five questions and first answer are supplied;
  four hidden answers use visibly labelled draft copy pending final wording.
- Added a Server Component FAQ using native named disclosures: first open,
  at most one open, current row can close, plus/minus feedback and keyboard/no-JS
  behaviour. Reused the office media record and team initials/image fallbacks.
  The support action uses the supplied email, without a live-chat integration.
- Added separate reusable EnquiryCta (`pale`/`white`) and SiteFooter components.
  The page selects its CTA; the layout mounts the footer once outside main.
  Negative margins create 40/64/112px overlaps at mobile/sm/lg, with matched
  footer padding leaving 56/64/80px clearance. Mobile overlap intentionally
  follows the user's instruction beyond the supplied non-overlapping reference.
- Added domain-owned contact, enquiry, FAQ and footer content. Screenshot office
  addresses, two phones, email and hours were cross-checked independently; Lagos
  remains a liaison office. Mailto/tel links are native, not provider connections.
  Unbuilt route/booking/social actions use the preparation notice. Footer-only
  availability flags keep future legal/practice routes independent of main nav.
- Inspected iProduce's actual CTA/footer/social implementations. Reused its
  component separation/negative-margin approach, without its service/motion/icon
  dependencies. Social text marks preserve source platforms while approved
  artwork/URLs are absent; no profile URLs or booking capability were invented.
- Format, lint, typecheck, production build and diff whitespace checks passed.
  Isolated development/final production browser checks passed at 1440, 1280,
  1024, 768, 390 and 320px: native FAQ controls/default/close-all, disclosure
  accessibility semantics, overlap/clearance, contact hrefs, preparation dialogs,
  focus return and no overflow/page errors. White CTA rendering, no-JS FAQ and
  contact links, normal feedback and a live reduced-motion preference passed.
  SSR fixtures passed draft labels, empty FAQ omission and footer-only route
  activation. Desktop/narrow-mobile screenshots were visually inspected.
- Updated canonical ownership, design/layout rules, source/content gates and
  roadmap. No package or stylesheet was added. The homepage presentation now
  reaches the footer; whole-page presentation review and publication content/
  destination approval remain next. CMS, services and deployment are unconnected.

## 2026-10-29 — FAQ starter copy and editorial handoff

- The user authorized useful starter answers instead of waiting for collapsed
  Figma text. Retained the supplied first answer and refined enquiry details,
  practice-area selection, fee questions and organisational-client answers.
  Removed visible draft badges and the unused status field. No fee figures,
  response times or engagement policies were asserted.
- Kept copy in `content/faqs.ts`. FaqSection accepts an optional ordered `items`
  collection with the same record shape, allowing a later Sanity query to supply
  records without changing presentation. Explicit empty results omit the section;
  omitted props retain local starter copy. No schema, query or provider added.
- Updated current docs/status while preserving earlier implementation history.
  Format, lint, typecheck, diff whitespace and isolated SSR checks passed. Browser
  checks passed five answers, badge removal, native disclosure behaviour and
  FAQ containment at 1440, 768, 390 and 320px; 390/320px no-JS FAQ checks passed.
  An unrelated page-level horizontal overflow without JavaScript was observed
  outside the contained FAQ and remains for whole-page QA. Hydrated page widths
  passed. No production build was repeated for this content/presentation change.

## 2026-10-29 — Shared primitives and social brand icons

- At the user's request, added shared shadcn-style Radix Accordion and Avatar
  wrappers, retaining existing styling rather than importing a new visual theme.
  FAQ remains server-composed with the same local/future-CMS records and empty
  collection guard. Accordion owns single/collapsible state, expanded/controls
  relationships and arrow/Home/End focus navigation; a noscript native disclosure
  list shares the same answer renderer. No section-level state or height effect.
- FAQ support circles and client-perspective identities now share Avatar image/
  fallback handling. Initials/anonymous marks remain present with absent media,
  including server rendering. Large People and editorial images keep Next Image.
  The specialized responsive practice explorer keeps its approved composition.
  Input/Field primitives wait for a real enquiry form rather than unused scaffolding.
- Installed react-icons and used iProduce's typed platform-to-brand-icon pattern
  for Facebook, LinkedIn, Instagram and X. Named fa6 imports render within the
  same labelled 44px controls; icons are decorative and missing URLs still open
  preparation notices. Lucide remains the ordinary UI icon library. Existing
  documentation/FAQ/footer work was preserved. No service or stylesheet added.
- Format, lint, typecheck, production build and diff whitespace checks passed.
  Development and compiled-production browser checks passed at 1440, 1280, 1024,
  768, 390 and 320px: single-open/collapse, Enter/Space and arrow/Home/End focus,
  avatar initials, labelled social SVGs, notice/focus return and hydrated-page
  containment. No-JS FAQ/native fallback and initials passed at 1440/390/320px;
  whole-page no-JS overflow remains the separately logged QA item. Normal feedback
  and a live reduced-motion change passed. Desktop/mobile FAQ and footer captures
  were visually reviewed. One production assertion was corrected to await the
  dialog-close focus effect before checking focus return; no app change needed.
- Current canonical docs now describe these owners/dependencies. Whole-page QA,
  approved media/content/destinations and the later CMS/form workflow remain next.
