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
