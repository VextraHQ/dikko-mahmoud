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
