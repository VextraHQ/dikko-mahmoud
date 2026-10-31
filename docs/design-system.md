# Design system

## Sources and status

Desktop and mobile frames were inspected through Figma on 2026-10-26. These
rules define the implementation direction. The first checkpoint now implements
local Newsreader/Manrope, a lean semantic theme, Button/Sheet, Lucide icons,
responsive navigation, and the hero. All five original photographs are local.

- [Desktop homepage](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-10662)
- [Mobile homepage](https://www.figma.com/design/cTCfNuHT1z0kcSlUcT9CCM/Dikko---Mahmoud-Dev?node-id=1-11588)

## Implementation principle

Use Tailwind v4 as the baseline. Add custom values only for meaningful brand
differences or repeated design needs. Do not reproduce the Figma variable
catalogue in CSS or create a parallel TypeScript token system.

- Keep Tailwind's spacing, type sizing, shadows, radius, and breakpoint scales.
- Bridge brand colours and font families through `app/globals.css` and Tailwind
  theme utilities.
- Use shadcn as the starting point for reusable interactive primitives. Add
  components individually for approved uses. The user also approved a bounded
  form foundation before the enquiry page; see `forms.md`.
- Keep component variants in the component that owns them.
- Prefer composition over a generic, configurable section or card engine.
- The burgundy, cream, and Georgia holding-page treatment is temporary and is
  not the source of the new brand system.

### Style ownership

- Put layout, ordinary presentation, responsive changes and data/ARIA states
  in Tailwind beside the component. Use `cn()` for readable base/state groups.
- `app/globals.css` is the entry for theme bridges, global defaults and imports.
  `app/styles/motion.css` owns custom keyframes and progressive reveal/marquee
  fallbacks; `app/styles/surfaces.css` owns complex glass/browser fallbacks.
- Keep those custom selectors scoped. Do not add a stylesheet per section,
  CSS modules to component folders, a parallel token scale or `@apply` layers.
- Prefer `motion-safe:` for adding a utility animation. Check a live preference
  change as well as a reduced-motion page load; specificity can otherwise let
  an active/group animation override a generic `motion-reduce:animate-none`.
  If a breakpoint overrides a transition property, supply its corresponding
  reduced-motion override too and verify the generated desktop CSS in-browser.
- Add Motion only for an approved choreography/presence requirement. Simple
  interaction feedback remains CSS/Tailwind and does not require a package.

## Brand roles observed in Figma

| Role           | Reference                       | Implementation direction                  |
| -------------- | ------------------------------- | ----------------------------------------- |
| Deep navy      | `#061a2e`                       | Dark surfaces and strong display text     |
| Primary navy   | `#133964`                       | Main actions, hero panel, brand surfaces  |
| Secondary navy | `#00264d`                       | Inverse actions and stronger contrast     |
| Link blue      | `#00447b`                       | Links and section eyebrows                |
| Pale cyan      | `#effaff`                       | Enquiry callout and selected surfaces     |
| Cyan accents   | `#b2e6fa`, `#d8f3fd`, `#39bfef` | Add only where a real component uses them |
| Primary text   | `#101820`                       | Shared foreground role                    |
| Muted text     | `#475569`                       | Existing Tailwind slate-600 value         |
| Canvas         | `#f8fafc`                       | Existing Tailwind slate-50 value          |
| Subtle border  | `#e2e8f0`                       | Existing Tailwind slate-200 value         |
| Muted surface  | `#f1f5f9`                       | Existing Tailwind slate-100 value         |

Use familiar semantic roles such as `background`, `foreground`, `primary`,
`primary-foreground`, `muted`, `muted-foreground`, `border`, and `ring` when
configuring shadcn. Preserve Tailwind's existing palettes. White and translucent
white cover the light text and glass navigation treatments on navy surfaces.

## Typography

- Newsreader owns headings and editorial display text; the hero uses bold.
- Manrope owns body text, navigation, controls, labels, and metadata.
- The desktop hero reference uses 72px text with 80px leading; mobile uses
  44px with 50px leading. Treat these as visual targets, not fixed page sizes.
- Common body treatments map to `text-base/6`, `text-lg/7`, and `text-sm` with
  suitable leading. Use standard utilities where they match.
- Keep custom font-family bridges only; do not mirror every Figma type style
  into a custom CSS variable. One-off display sizes may use a local utility.
- Local Latin variable font files cover weights 400–700, with Newsreader optical
  sizing. `next/font/local` hosts them without build-time Google Fonts requests.
  OFL licence files are retained alongside them.

## Surfaces and controls

- 4px, 8px, 12px, and 16px reference radii map to `rounded-sm`, `rounded-lg`,
  `rounded-xl`, and `rounded-2xl`. Pills and circular actions use `rounded-full`.
- There is no inherited iProduce radius cap. Choose the existing Tailwind
  radius that matches this design.
- Try standard Tailwind shadows first. Do not build a new elevation scale for
  the single enquiry-callout shadow.
- The distinctive CTA combines a pill label and a circular trailing arrow.
  Use `ArrowButton`, a thin composition of the shared Button, rather than
  assembling the circle or coordinating colour/size flags at each callsite.
- Button references use 48px and 52px heights with 40px and 44px arrow circles.
  Carousel arrows are 44px controls. Keep visible keyboard focus and disabled
  states, and implement links as links and state changes as buttons.

### Arrow buttons

`components/ui/button.tsx` owns the CVA/Slot primitive for ordinary buttons and
icon controls. `components/ui/arrow-button.tsx` owns the pill CTA composition:

| Variant   | Pill                          | Arrow circle               |
| --------- | ----------------------------- | -------------------------- |
| `default` | Primary navy, white text      | White, navy icon           |
| `inverse` | White, navy text              | Secondary navy, white icon |
| `glass`   | Translucent white, white text | White, navy icon           |

Sizes are `sm` (40px button/32px circle), `default` (48px/40px), and `lg`
(52px/44px). Circle styling follows these props; callers no longer coordinate
`inverse`, `large`, `trailingArrow`, or separate arrow markup. `icon` optionally
accepts another Lucide icon; the default is `ArrowUpRight`. Decorative icons
are hidden from accessibility. Hover movement respects reduced motion; focus
and disabled styles come from Button. Keyboard focus mirrors the CTA arrow
feedback, and pointer press adds a restrained 0.98 scale under normal motion.

```tsx
<ArrowButton variant="inverse">Make an enquiry</ArrowButton>
<ArrowButton variant="glass">Explore our expertise</ArrowButton>
<ArrowButton>Discover our story</ArrowButton>
<ArrowButton size="sm" icon={ArrowRight}>Get in touch</ArrowButton>
<ArrowButton asChild><Link href="/">Home</Link></ArrowButton>
```

Radix `Slottable` keeps `asChild` links as one anchor containing the label and
circle. Button props, handlers and React 19 refs pass through, including when
used as a dialog trigger. Section spacing stays at the callsite.

### Eyebrows

`components/ui/eyebrow.tsx` shares the existing small, bold, tracked uppercase
brand label. It renders a paragraph by default; use `as="h2"` only when the
label itself is the section heading. Props are limited to `children`, `as`,
`id`, and `className`; no variant catalogue or layout abstraction is needed.

```tsx
<Eyebrow>Our firm’s story</Eyebrow>
<Eyebrow as="h2" id="firm-facts-heading" className="text-navy-deep text-xs/4">
  The firm at a glance
</Eyebrow>
```

Sections retain content, alignment and margins. Existing hero responsive sizes
and white text are preserved through `className`; facts keep their heading
semantics, 12px size and deep-navy colour.

## Icons and assets

Use Lucide for UI arrows, chevrons, menu and close controls. The user approved
React Icons for social brands, matching iProduce. SocialIcon maps typed platforms
to named imports from `react-icons/fa6`; SVGs are decorative inside labelled
links/buttons. Keep their existing sizes, circular targets and focus styles.

Preserve the supplied firm logo, its emblem/tagline, photographs, and client
artwork. Download needed Figma assets into `public/` during implementation;
temporary MCP URLs must not become runtime dependencies. Never use a screenshot
of a complete design section as an implementation asset.

Missing images use intentional fallbacks: decorative navy editorial covers,
portrait initials, text client names or a neutral anonymous mark. Remove visible
“photograph/image/portrait pending” labels from these visual surfaces. Covers
must not imply a real photograph or endorsement; keep content approval notes
separate and explicit in this no-index preview. Decorative fallbacks are hidden
from accessibility when adjacent text already supplies the information.

Use the shared `ImageWithFallback` for image network errors as well as absent
URLs. Owners preserve crop dimensions and normal Next Image loading/sizing;
do not show permanent loading skeletons for assets that do not exist. Approved
media replaces the fallback without redesigning the card. See architecture for
the narrow client boundary and missing-content selection rules.

## Interaction boundaries

Button and the mobile Sheet are implemented with the minimal shadcn pattern:
CVA/Slot, `cn()`, and Radix Dialog focus management. `components.json` records the
registry aliases. The custom pill and arrow compose the Button. Shared Radix
Accordion and Avatar wrappers follow the same shadcn composition, keeping the
brand plus/minus cues and initials fallbacks. The user-authorized form foundation
now includes Input/Textarea, Label/Field, Checkbox/NativeSelect, Separator and the
React Hook Form adapter; `forms.md` owns their composition. The desktop Practice areas
reference navigates to a page; no open dropdown variant was found, so no
Navigation Menu package or invented dropdown was added.

The hero uses the matching Embla Fade plugin for manual photograph crossfades
at approximately 600ms,
with a short CSS copy entrance (8px rise, 500ms easing, 60/120ms stagger).
The navy panel, CTA, navigation and controls are outside the changing slides.
Stacked copy fieldsets reserve the tallest record's space so controls do not
jump. Only the current copy is exposed to assistive technology and focus.

For the hero, reduced motion removes copy animation and makes
button/keyboard changes immediate; drag fading is disabled in that preference,
with previous/next buttons still available.

Hero autoplay (approved 2026-10-30, following the designer's autoplay intent)
advances every 7 seconds (`heroAutoplayDelay` in `content/home.ts`); the Figma
file's five-second cycle was lengthened so each headline can be read. Rules:

- A pause/play button is always available (WCAG 2.2.2). Desktop: a round
  button before the arrows, with the slide lines as the countdown. Mobile
  (approved option 1): a light pause icon, then "01 ── 05" with one filling
  line, grouped left; the arrows stay right.
- Hovering the controls (slide lines, pause, arrows, the CTA) or scrolling the hero
  out of view holds the countdown: the line freezes where it is and continues
  with the remaining time afterwards. A cursor resting elsewhere on the hero
  does not pause it, since the hero fills most of the first screen. A
  hidden browser tab pauses and restarts that slide's countdown.
- The pause button, previous/next, a slide line, keyboard arrows, a drag, the
  CTA or keyboard focus entering the hero stop it until play is pressed.
- Reduced motion never autoplays and hides the toggle.
- The active slide line fills over the countdown (`animate-slide-progress`),
  pauses with the countdown, and shows solid white once autoplay is stopped.
  The counting line skips the hover brightening so its frozen fill stays
  readable.
- The live region is silent while rotating so screen readers aren't
  interrupted.

Button, segment and keyboard navigation keep the current photo visible while
a requested replacement is fetched and decoded. Adjacent photographs are
warmed after the current image is ready.
A later selection, drag or carousel reinitialization cancels stale pending
navigation. Preparation failure retains the current slide. Only the opening
hero image has an explicit preload; other images begin with native lazy loading.
Hero photographs use quality 85; other images retain the default quality 75.
Their `sizes` hint accounts for the 450px-wide source area needed by the
300px-tall, 3:2 mobile cover crop, rather than under-requesting on narrow phones.
The original 1248×832 source limit still affects large/Retina displays and needs
higher-resolution originals to resolve. Re-exporting the same raster at a
larger size does not add source detail.

Use CSS for simple hover/focus transitions. Add a motion package only when an
approved interaction requires it.

## FAQ and footer actions

FAQ rows use Newsreader questions, fine slate rules and persistent plus/minus
disclosure cues. The first answer is open; shared Accordion rows support click,
Enter/Space and arrow/Home/End focus movement. A native disclosure fallback
keeps every answer accessible without JavaScript. Hover/focus and open-state colour changes
are restrained and respect reduced motion. Content uses 260ms opening and
200ms closing keyframes with the Radix content-height variable; reduced motion
switches immediately. There are no JavaScript measurements or Motion dependency.
The user-authorized FAQ starter copy
renders without editorial-status badges. The support card uses supplied team records with initials
fallbacks; it does not introduce stock portraits or a live-chat claim.

The reusable enquiry card has two approved surfaces: `pale` uses Tailwind
`sky-50`, while `white` uses white. Both reuse the primary ArrowButton and the
existing section typography, radius and shadow scales; no new token is needed.
The footer uses the existing deep navy and white/translucent-white hierarchy.
Social controls use Facebook, LinkedIn, Instagram and X brand icons from React
Icons. Missing profile URLs still open the preparation notice. Typography,
44px targets and layout are unchanged; no profile URL is inferred from an icon.

## Section entry motion

Custom entrance CSS is kept in `app/styles/motion.css`, imported once through
`globals.css`. Ordinary visibility/interaction states stay in component Tailwind
classes; the hero has no CSS module. `RevealGroup` enhances facts/story and the
approved People/insights slice using
IntersectionObserver: offscreen items fade/rise once, then stop being observed.
Content starts visible without JavaScript and stays visible under reduced
motion. A live reduced-motion change completes pending reveals. Keyboard focus
completes the containing reveal immediately so a focused CTA cannot stay hidden.
The founding year and practice figures remain literal, without count-up effects.
No new animation dependency was added for these sections.

## Sticky surface and client rail

The enhanced top-of-page state retains the source composition: logo, glass
navigation pill and white enquiry CTA, without a full-width header material.
After the fixed 64px marker leaves view, a floating navy glass shell fades in
and the nav pill's own material fades out. Controls do not move or resize.
Both surfaces use fine highlights/borders and a quiet shadow, following the
functional-layer principle in [Apple's material guidance](https://developer.apple.com/design/human-interface-guidelines/materials).

Only surface opacity transitions over 400ms. Each backdrop filter is static
(16px on the nav pill, 24px on the full shell), avoiding animated blur or
layout properties. Missing JavaScript/IntersectionObserver retains the readable
full shell rather than leaving white controls over light content. Unsupported
blur, increased-contrast and reduced-transparency preferences use solid navy
on the active surface; reduced motion makes the surface change immediate.
The white logo and shared inverse CTA stay consistent in both states.

The hero split now starts at `lg` while full navigation still requires `xl`.
Between those widths, the compact menu overlays the photograph with its own
contrasting control background. The full shell stays hidden at the top and
fades in only after scrolling, consistently at every width. Below `lg`, the
header reserves its normal space above stacked hero content. There is no
breakpoint exception to the scroll material state.

The selected-clients rail uses anonymous outlined slots while assets are under
review. It now reuses iProduce's single-row Marquee primitive, four repeats and
40-second CSS loop, with a persistent pause/play button and hover/focus suspension. Motion is progressively enabled;
reduced-motion/no-JavaScript keep a static, readable grid. Duplicated animation
content is excluded from accessibility. No generic marquee/section framework
or new dependency was introduced.

## Practice explorer motion

The approved practice-area interaction is manual, without autoplay or scroll
capture. A fine active rule and brighter label identify the selection. Desktop
panels crossfade over 450ms; mobile panels expand/collapse over 400ms with a
short opacity transition. Reduced motion removes all explorer transitions.
Controls use `aria-expanded`; only the expanded desktop control is marked
`aria-disabled`, because desktop keeps one panel open. Mobile/tablet start
collapsed and allow the open row to close, with at most one expanded panel.
Native buttons support Tab, Enter and Space; inactive regions
are hidden from accessibility and inert immediately. No animation package or
generic accordion primitive is needed for this homepage-specific composition.

Practice selectors have visible circular arrow controls before interaction.
Pressing an inactive row gives a small 160ms scale response. The selected
circle fills white and rotates toward the panel (right on desktop, down on
mobile), keeping the selection clear after the pointer leaves. The incoming
caption fades/rises 6px over 400ms. These are local CSS enhancements; reduced
motion removes the press movement, rotations' transitions and caption animation
while retaining the final selection cue.

Selected matters use a restrained 240ms card crossfade with a persistent pale
blue selected row. Only click/tap or keyboard activation changes the feature;
hover is a control-colour affordance. Reduced motion removes the fade and mobile
smooth scrolling. Card visibility/transitions are component Tailwind classes.

## Registry selection — 2026-10-29

Registries distribute source we own and adapt; they are not a visual theme to
apply wholesale. The review covered [shadcn registries](https://ui.shadcn.com/docs/registry),
[UIAble buttons](https://uiable.com/components/button) and
[accordions](https://uiable.com/components/accordion), and
[Animate UI's Radix accordion](https://animate-ui.com/docs/primitives/radix-ui/accordion).
UIAble's current components use Base UI; our existing interactive system stays
on Radix. Animate UI's current accordion requires @animate-ui/react and Motion.
For the approved small polish, retain our primitives and adapt the useful
height/press-feedback patterns using CSS. No UIAble/Animate UI package, block,
registry credentials, theme reset or animation runtime was installed.

Form primitives were adapted from the official new-york-v4 registry, with local
imports and existing semantic colours, 44px text/select controls, 16px text to
avoid mobile input zoom, reduced-motion states and native grouping semantics.
The destructive role bridges Tailwind red-700 for errors, not a new colour scale.
The shadcn MIT notice is retained in `licenses/shadcn-ui.txt`. Future registry
items should be reviewed for fit, imports, dependencies and preference/focus
behaviour before changing shared primitives. Do not run bulk replacement tools
over the current homepage.

## Firm reuse

Home delegates facts, FAQ and person-card presentation to shared components,
retaining its defaults. Firm selects the pale facts surface and its explicit FAQ
intro/items. VideoPoster uses the existing ImageWithFallback, EditorialCover and
Button; no media source means no play control. Journey composes the shared
Accordion and small Button arrows. All new layout/state classes stay beside
components. No new stylesheet or token set is needed; Motion is now scoped to
Journey’s approved content swaps.
Unapproved concept imagery and replacement portraits remain covers/initials;
missing historical/FAQ copy and team assignments stay explicit review slots.

The approved Firm refinement adds restrained CSS hover/focus feedback to static
rows, people media, location cards and Journey controls/content. Static content
keeps ordinary semantics/cursors; keyboard feedback follows actual controls.
Hover movement is `motion-safe`, with immediate colour feedback under reduced
motion. PersonCard accepts `portraitClassName` for Firm’s square crop and
`imageHoverOnly` for picture-local interaction; EditorialCover accepts
`markClassName` for compact square numbers. Defaults preserve Home. The later
general Motion choreography remains separate from the approved Journey swap.

## Firm timing and Journey Motion — 2026-10-29

Following review of iProduce Africa’s MotionFade, card zoom and keyed-content
patterns, the user approved a slower, calmer Firm pass. CSS picture zoom/shadow
feedback uses 550ms with `cubic-bezier(0.22,1,0.36,1)`. Frames stay stationary;
hovering names/captions cannot move or zoom their pictures. Static text has no
translation; colour/rule/surface feedback uses about 500ms. Location cards keep
soft shadows without vertical movement.

Journey alone uses Motion (12.x), with LazyMotion/domAnimation and keyed
AnimatePresence panels: a 650ms 16px directional entrance, a 250ms 10px exit and
550ms short copy entrance. Radix height timing is local to Journey at every width:
550ms opening/400ms closing; shared FAQ timing is unchanged. This resolves a
content-presence need rather than replacing simple CSS. Reduced motion renders
static panels immediately, including during an in-flight transition; SSR and
no-JS history remain readable. No new scroll observer or autoplay is introduced.
