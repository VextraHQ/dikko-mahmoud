# Homepage implementation brief

## Sources

Reviewed on 2026-10-26:

- [Desktop: 1:10662](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-10662)
- [Mobile: 1:11588](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-11588)

The supplied design is the implementation reference. Its provisional content
does not become approved production content simply because it appears in Figma.

## Current implementation rules — audited 2026-10-28

- Use component Tailwind for ordinary states and responsive layout; custom
  keyframes/progressive fallbacks and glass surfaces live in the two focused
  `app/styles/` files imported by `globals.css`. See `architecture.md`.
- Practice areas use the approved explorer rather than the source staggered
  gallery: desktop keeps one open; mobile/tablet can open/close, initially closed.
- Selected matters open on BPE and change only through click/tap or keyboard
  activation. Hover never changes selected content. The current copy says
  “Select a matter to read more”, superseding the screenshot's hover wording.
- Preserve the approved sourced summaries and distinguish matter organisations
  from the advisory client. Keep unavailable routes as preparation notices.
- Hero/header overlay starts at `lg`, with the compact menu until full navigation
  starts at `xl`. The full header shell is hidden at the top at all widths and
  appears only after scrolling. Facts/story keep their `xl` compositions;
  practice/matters use `lg`. See `layout-system.md` for dimensions and rationale.
- Review the earlier hero split before analysing People. The later Claude
  workflow needs its own next scope agreed. Dated notes preserve earlier history;
  use these current rules and the canonical docs when they supersede history.

## Section map

| Order | Section                                | Desktop node |
| ----- | -------------------------------------- | ------------ |
| 1     | Navigation and expertise hero carousel | `1:10663`    |
| 2     | Firm at a glance                       | `1:10664`    |
| 3     | Firm story and leadership introduction | `1:10683`    |
| 4     | Selected clients                       | `1:10713`    |
| 5     | Practice areas / expertise grid        | `1:10733`    |
| 6     | Selected matters                       | `1:10755`    |
| 7     | People                                 | `1:10764`    |
| 8     | Client perspectives                    | `1:10777`    |
| 9     | Perspectives and insights              | `1:10799`    |
| 10    | FAQ                                    | `1:10812`    |
| 11    | Enquiry callout and footer             | `1:10813`    |

The hero's opening message is “Clarity in complexity.” Desktop hero and mobile
hero contexts were fetched separately (`1:10663`, `1:11589`). Fetch focused
design context and screenshots for each remaining section before implementing
it, including relevant component variants and interactive states.

## Build order

1. Establish Newsreader/Manrope, semantic brand colours, layout rhythm, and the
   shadcn baseline. Add only primitives needed by the first working slice.
2. Implement shared navigation and the hero at desktop and mobile widths.
3. Continue remaining homepage sections in the user-agreed checkpoint order;
   People is proposed next, with footer still queued.
4. Retrieve focused source for each section and use approved static content.
5. Connect local interactions and review the full page, accessibility, image
   loading, and responsive behaviour.

Keep `app/(site)/page.tsx` as a thin composition, with shared chrome in
`app/(site)/layout.tsx`. Put shared chrome in
`components/layout/`, homepage sections in `components/home/`, reusable
primitives in `components/ui/`, and copy/collections in `content/`. Create these
files as used rather than scaffolding speculative component trees.

## Content and interaction follow-ups

- Client perspectives explicitly awaits an approved testimonial. Do not
  publish placeholder quote text with the displayed person's/company's name.
- Several people images are labelled “Replace with approved portrait”. Confirm
  the final names, roles, and photos before treating them as production content.
- A firm-story image is labelled generated editorial office imagery. Confirm
  whether it is approved or should be replaced with real firm photography.
- Client logos are labelled profile-sourced. Keep publication approval distinct
  from implementing the layout.
- Hero text records, all five original photographs, and the mobile-menu state
  are retrieved. All four selected-matter preview records are sourced and
  user-approved. Final publication approval and article destinations remain open.
- Figma includes newsletter signup and a Lagos liaison-office entry. Confirm
  final copy and behaviour; a visual signup is not an email-service integration.
- Keep unavailable secondary destinations explicit during development. Do not
  create dummy pages or buttons that pretend to submit successfully.

These gaps do not block the font, token, Button, and header/hero foundation.

## Completion criteria

- Each section matches its desktop and mobile reference, with intentional
  tablet behaviour and no narrow-screen overflow.
- Menu, dropdown, FAQ, and carousel controls work with touch and keyboard.
- Autoplay, if enabled, can be paused and respects reduced motion.
- Supplied assets are local, correctly cropped, and have suitable alt text.
- No fabricated people, quotes, metrics, or successful form submissions.
- Format, lint, typecheck, and production build pass; browser evidence is
  recorded separately from those checks.
- CMS, email, analytics, and deployment remain separately scoped work.

## Collaboration

The lead agent owns shared tokens, fonts, dependencies, primitives, composition,
and integration. Once that baseline is stable, delegate bounded section files
or independent asset/accessibility review. Agents must share these documents
and avoid concurrent edits to the same foundation files.

## First visual review checkpoint — 2026-10-26

Implemented only fonts, semantic theme, minimal Button/Sheet foundation,
desktop/mobile navigation, and hero. Footer and all following sections remain
out of this checkpoint. Existing audit documentation has been preserved.

### Source evidence and recovered assets

Focused desktop/mobile hero and mobile-menu design contexts included screenshots.
Read-only inspection of the remote hero component recovered all five records:

| Slide | Practice                     | Headline                    |
| ----- | ---------------------------- | --------------------------- |
| 1     | Dispute resolution           | Clarity in complexity.      |
| 2     | Corporate & secretarial      | Counsel for business.       |
| 3     | Capital markets & commercial | Confidence in transactions. |
| 4     | Energy & natural resources   | Supporting our power        |
| 5     | Policy & government advisory | Insight that shapes policy. |

Descriptions are verbatim in `content/home.ts`. Slide 4's wording is preserved
as supplied and should be reviewed with the designer. The desktop Practice
areas control has a page-navigation reaction, not a dropdown. Button default,
hover, pressed, focus, disabled, and loading metadata was inspected; only
needed runtime states are implemented.

Figma's Starter MCP limit initially blocked four downloads. The native desktop
File → Save Local Copy export subsequently supplied all four original fills.
The images were extracted from the exported ZIP by their previously verified
Figma hashes, inspected visually, and stored under `public/images/hero/`. Each
is an unmodified 1248×832 PNG; no full-section screenshot is used as an asset.
The 18MB exported source file was moved outside the repository to `/tmp/` after
extraction. The white supplied logo and all five photographs are now local.

Source hashes for the four recovered photographs:

- Corporate: `62c71f07edaf6c4349dda69c6a806336499a65c5`
- Capital markets: `cec3a9c4afcf891561a7bd28a6d09769c664bf7d`
- Energy: `6b05f1cf5ab7538faae1c5c61d4b83de2c251d5a`
- Policy: `06e04a13b549771f0e9f80f90c2fe28ec19f16f7`

The corporate, capital-markets, energy, and policy records now reference their
matching filenames in `content/home.ts`. Initial five-second autoplay is
enabled with the existing pause, keyboard, focus/hover, visibility, and reduced
motion safeguards. The energy image keeps its source treatment without the
20% black overlay used by the other four slides.

### Review decisions

- Desktop photo overlay begins at Tailwind `xl` (1280px), when the full pill
  navigation fits. Smaller widths use the stacked composition and mobile menu.
- Both navigation variants include People for consistent destination coverage;
  the supplied mobile-menu frame omits it. Its provisional office-location line
  is omitted pending content approval.
- Secondary destinations and CTAs open a clear preparation notice. They do not
  route to missing pages or pretend to send an enquiry. Home is a real link.
- The previous holding page remains recoverable in Git; its temporary palette
  is replaced by the supplied brand theme. Metadata remains `noindex, follow`.
- iProduce was inspected for alignment: semantic `:root`/`@theme` bridges,
  CVA/Slot Button, `cn()`, content separation, and documentation ownership were
  reused. Its green palette, token catalogue, custom radii, effects, services,
  motion, and carousel packages were not copied.

### Verification evidence

- Browser review measured 1440px desktop, 768px tablet, 390px mobile and 320px
  narrow layouts inside same-origin review frames, because the browser's own
  viewport override did not change its actual 550px viewport. Frame `clientWidth`
  and `scrollWidth` matched at every tested width; all five records were checked
  at 320px. The temporary review HTML was removed afterwards.
- Confirmed the supplied logo and opening photo load with nonzero natural
  dimensions; the mobile image is 390×300 and the same image fills the desktop
  canvas. One responsive image element serves both compositions.
- Checked mobile Sheet opening/closing, nested preparation notices, Escape,
  focus return, carousel previous/next and wraparound, arrow-key selection,
  playback advancement and pause. Fixed an independently reviewed portal-event
  issue so arrow keys inside the hero notice cannot change slides or close it.
- Reduced-motion handling, hover/focus and hidden-tab suspension were reviewed
  in code; no OS preference change was made for testing.
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, and the standard
  `pnpm build` passed. An earlier sandbox run cached a Turbopack worker-port
  failure; moving the generated cache aside allowed the standard build to pass.
  A webpack fallback build also passed. No build-script change was needed.
- These checks cover the local checkpoint. They do not approve provisional
  content, or establish deployment readiness.

### Photograph recovery verification

All four added photographs were reviewed at 1440px and 390px in the production
build, with nonzero natural image sizes and matching source identity. Tablet
768px and narrow 320px layouts were also checked. The source PNGs remain
unmodified; responsive cropping and overlays belong to the hero component.
Autoplay was observed advancing the fully illustrated carousel and manual
selection paused it. No production browser warnings or errors were recorded.
The missing-photograph gate is resolved; this remains a visual review checkpoint
before footer and remaining homepage development.

## Responsive and ownership refactor — 2026-10-27

The user approved the broader refactor after reporting parser and accessibility
diagnostics. The original checkpoint evidence above records its earlier state;
current interaction behaviour is manual. `components/ui/carousel.tsx` now owns
Embla wiring, native slide groups and inactive-slide focus isolation. Hero
markup and copy mapping are server-rendered; HeroControls owns selection UI.
Autoplay/reveal effects are deferred until the layout and UI are ready.

The shared route-group layout now owns the header, skip link and main landmark.
SiteHeader is server-rendered and MobileNavigation owns the Sheet state. Footer
and subsequent sections still require their focused design context, assets and
content review before implementation. Existing photographs, slide copy,
preparation notices and no-index metadata are preserved.

## Hero polish — 2026-10-27

The user approved a focused motion pass before continuing beyond the hero.
Photographs now crossfade through Embla Fade 8.6; copy enters with a small,
staggered CSS fade/rise. The panel, navigation, single expertise CTA and controls
stay stationary. Reduced motion switches immediately through the controls and
disables drag fading. Autoplay remains a later decision.

All five source images are still the original 1248×832 raster fills. A local
comparison of actual Next Image WebP responses at qualities 75 and 85 found
less compression error at 85, with approximately 12–58KiB additional data per
photograph at the maximum source resolution. The opening photo increased from
39.3KiB to 59.0KiB. Hero photos now use 85; logo and other images keep 75.
The mobile `sizes` hint also requests at least 450 CSS pixels for the 3:2
photograph inside its 300px-tall crop, avoiding undersized source selection on
narrow Retina phones. These changes do not replace higher-resolution
originals, which remain required for sharper large/Retina presentation.

## Next slice plan — firm facts and story, 2026-10-27

Status: implemented for review after the user approved the plan and explicitly
authorized placeholders for missing material. The five supplied screenshots
define desktop/mobile composition; no new wireframe was needed. Figma remains the source for precise measurements,
states and original image fills. The previous local-copy export is available
in `/tmp/` and may supply the office/portrait without another manual export.

### Sequence

1. Align ownership: rename the entry `hero-section.tsx` and move its existing
   CSS module into a scoped hero-animation block in `app/globals.css`, preserving
   transitions and reduced-motion behaviour.
2. Focused source retrieval remains blocked by the Figma Starter MCP limit
   (confirmed again for story `1:10683`). Implemented against the supplied
   desktop/mobile screenshots under the user's placeholder authorization.
   Office and portrait originals remain replacement tasks; section screenshots
   are not used as runtime imagery.
3. Build `firm-at-a-glance-section.tsx` and `firm-story-section.tsx` as Server
   Components. Use source copy from `content/firm.ts`, including a small
   `firmHomePreview` export reusable by the future firm page. Keep existing
   hero copy in `content/home.ts`; do not scaffold unused firm-page content.
4. Apply restrained entry motion after responsive layout: one-time fade/rise,
   small facts/card stagger, and reduced-motion support. Keep years/numbers
   literal. Introduce one shared reveal helper only if both sections need it;
   no general motion framework or new package is currently planned.
5. Review the joined hero/facts/story slice at desktop, tablet, 390px and 320px.
   Format changed files while iterating. Batch lint/typecheck and one final
   production build for the completed runtime slice.
6. Build the enquiry callout/footer next from its focused reference. The actual
   firm destination page follows separately.

### Responsive composition

| Section          | Desktop                                                                   | Tablet                                                               | Mobile                                                               |
| ---------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Firm at a glance | Four columns with fine vertical rules                                     | Two-by-two grid                                                      | Four stacked facts with left rules                                   |
| Firm story       | Centered introduction; office image, editorial card, portrait/CTA columns | Full-width image, then text and portrait columns where space permits | Introduction, office image/stat chips, editorial card, portrait, CTA |

Reuse Dikko's width cap, typography, navy, neutral surfaces, spacing and shared
Button/arrow. Depth comes from image overlays, fine borders and quiet card
surfaces. Keep the story CTA separate from the portrait caption.

### Ownership and review notes

- `components/home/` contains `.tsx` presentation. Full sections use the
  `*-section.tsx` suffix; helper components retain their descriptive role names.
- `content/firm.ts` owns shared firm facts and the source-supplied Home preview.
  `app/(site)/page.tsx` stays a thin section composition.
- Styling follows the current ownership rules above. Layout uses
  Tailwind utilities. No homepage CSS module is planned after the migration.
- Missing media use labelled Lucide placeholders. Set `firmHomePreview.media`
  source paths and accurate alt text when originals are available, storing
  files in `public/images/firm/`. No placeholder photograph or fictional person
  image was generated.
- The supplied facts are `1993`, `30+`, `2 + 1`, and `Public + Private`; do not
  recalculate the practice-year figure. The photo instead repeats `3 / Offices
in Nigeria`. Reconcile the office/liaison wording before repeating it; do not
  silently turn the Lagos liaison into a third full office. The implemented
  chip now consistently uses `2 + 1 / Offices & liaison`.
- Existing audit labels the office image generated editorial imagery. Verify
  the portrait/caption against its source, and retain the distinction between
  source-supplied preview assets and final publication approval.
- `Discover our story` uses the existing explicit preparation notice until
  `/the-firm` exists, then becomes a real link. Do not create missing-page links.

## Sticky navigation and selected clients — 2026-10-27

The user requested this bounded slice and explicitly asked to stop before
practice areas. The supplied selected-clients screenshot establishes the
heading, introduction and two-row logo grouping. Client names/logos remain
under review, so twelve anonymous, visibly labelled logo slots preserve the
section. No pictured organisation is asserted as an approved runtime client.
Populate each slot's approved `name` and local `logo` path in
`content/clients.ts` when available; keep the review note current.

Following the user's iProduce alignment request, the rail now uses its actual
`components/ui/marquee.tsx` pattern: one horizontal row, four repeated groups,
a 40-second loop, 16px gaps, compact bordered cards and edge-gradient overlays. A visible pause/play control persists user
choice; pointer hover and focus within the rail suspend motion. Duplicated
visual groups are `aria-hidden`/inert. Reduced motion and no-JavaScript show a
static two/three/six-column grid with each unique slot once.

The header is now sticky at all widths. Desktop keeps the opening hero overlay
and condenses to a navy/blurred surface after leaving a 24px top marker. Mobile
retains its normal header space. A solid default keeps navigation readable
without JavaScript; observer enhancement restores top-of-page transparency.
Anchor scroll padding accounts for the sticky bar. Route-aware desktop/mobile
navigation shares the same source and marks only exact or slash-delimited
nested routes active. Home matches only `/`. Unbuilt pages keep the existing
preparation notice; enable their `available` flags when routes are built.

`RevealGroup` remains a small motion enhancer for facts/story, rather than a
section-layout abstraction. It was not expanded into a section engine for this
slice. No new packages were installed. Practice areas are intentionally absent
pending the user's next animation/design discussion.

The iProduce primitive API (`pauseOnHover`, `repeat`, `reverse`, `vertical`) is
preserved, with duplicate groups hidden/inert for accessibility. Dikko keeps
its own heading, copy, palette, review note and anonymous slots. The local
pause/readiness wrapper still provides explicit pause and static no-JS support.
Mobile cards match iProduce at 180×64px; from `sm`, they are 240×80px. Reduced
motion/no-JavaScript expose the twelve originals in the responsive static grid.

## Practice-area explorer — 2026-10-28

After discussing the source staggered gallery (`1:10733`) and reviewing desktop
and mobile wireframe options, the user approved an editorial explorer. This
supersedes the earlier instruction to stop before practice areas. The six
source labels, heading, introduction and main CTA are preserved. Desktop uses
a numbered index beside one large visual; mobile/tablet uses the same markup
as an accordion, initially collapsed with at most one panel open. The open
mobile/tablet row can close; desktop keeps a selected panel. No autoplay or scroll pinning.

Approved practice photography is still unavailable; each nullable `image`
record in `content/practice-areas.ts` uses an explicit numbered placeholder.
Populate `src` and meaningful `alt` together when photographs are supplied.
Hero photography was not substituted for the different practice-card assets.
Practice routes remain preparation notices until their pages exist. No service
descriptions or additional claims were invented. The Figma tool allowance was
already exhausted; this slice follows the supplied screenshots and the user's
approved wireframe direction rather than claiming fresh Figma retrieval.

The introduction remains server-owned. A local client component owns only the
selected index and control/panel composition. Scoped global CSS handles the
desktop fade, mobile grid expansion, active rule and reduced-motion fallback.
No dependency or generic section engine was added. People, perspectives,
insights, FAQ and footer remain queued for their own source review.

## Selected matters — 2026-10-28

The user supplied desktop/mobile screenshots (CleanShot 05:06:36 and 05:06:44)
after a focused `1:10755` Figma request was blocked by the Starter tool limit.
Those screenshots establish the implementation reference for this slice.
The heading is “Experience where the stakes are high.” and the CTA is “Explore
our experience”. Four source records are retained:

| Organisation                 | Category                         | Summary status |
| ---------------------------- | -------------------------------- | -------------- |
| Bureau of Public Enterprises | International arbitration        | User-approved  |
| Central Bank of Nigeria      | Public-sector advisory           | Supplied       |
| Kano State Government        | Settlement & government advisory | User-approved  |
| NNPC / NPDC                  | Energy-sector advisory           | User-approved  |

The screenshot opens on Central Bank of Nigeria; the user subsequently approved
BPE (item 01) as the runtime default. CBN retains “Federal Government revenue”,
the Production Sharing Contracts summary, and “Representative experience ·
advisory”. The other summaries were drafted from the firm's
[published experience](https://dikkoandmahmoud.com/experiences/) and approved
by the user for this preview on 2026-10-28. No outcome claims were added.

BPE's summary attributes lead counsel work to the managing partner. Kano's
summary covers negotiation/mediation concerning Trovan clinical-trial
settlements. The NNPC/NPDC matter explicitly identifies CBN as the advisory
client for the interest transfer; its category is energy-sector advisory.
The data uses `organisation`, rather than treating every matter label as the
client. All four records now have a topic, summary and representative-experience
qualifier. Final publication approval remains separate from this local preview.

Desktop pairs the feature with a four-item selector. Mobile stacks the feature
above the selector. Click/tap and keyboard activation work at every width;
hover does not select a matter. Explicit mobile/tablet selection brings the
preview into view and focuses its named region. The shared scroll padding
clears the sticky header; reduced motion removes the card fade and smooth scroll.
The CTA retains the existing preparation notice until the experience route
exists. No images or new packages are needed for this text-based source section.
