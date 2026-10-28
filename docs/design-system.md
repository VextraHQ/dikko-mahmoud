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
  components individually when the homepage requires them.
- Keep component variants in the component that owns them.
- Prefer composition over a generic, configurable section or card engine.
- The burgundy, cream, and Georgia holding-page treatment is temporary and is
  not the source of the new brand system.

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
and disabled styles come from Button.

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

The user explicitly permits icon-library substitutions. Start with Lucide for
UI arrows, chevrons, menu, and close controls. Use another package only for a
specific missing icon or brand mark; keep stroke weight and size consistent.

Preserve the supplied firm logo, its emblem/tagline, photographs, and client
artwork. Download needed Figma assets into `public/` during implementation;
temporary MCP URLs must not become runtime dependencies. Never use a screenshot
of a complete design section as an implementation asset.

## Interaction boundaries

Button and the mobile Sheet are implemented with the minimal shadcn pattern:
CVA/Slot, `cn()`, and Radix Dialog focus management. `components.json` records the
registry aliases. The custom pill and arrow compose the Button. FAQ Accordion
and other primitives are deferred until used. The desktop Practice areas
reference navigates to a page; no open dropdown variant was found, so no
Navigation Menu package or invented dropdown was added.

The hero uses the matching Embla Fade plugin for manual photograph crossfades
at approximately 600ms,
with a short CSS copy entrance (8px rise, 500ms easing, 60/120ms stagger).
The navy panel, CTA, navigation and controls are outside the changing slides.
Stacked copy fieldsets reserve the tallest record's space so controls do not
jump. Only the current copy is exposed to assistive technology and focus.

Motion is limited to the hero. Reduced motion removes copy animation and makes
button/keyboard changes immediate; drag fading is disabled in that preference,
with previous/next buttons still available. Autoplay remains deferred. When
revisited, it requires pause/resume, hover/focus and hidden-tab suspension, and
reduced-motion support. The Figma specification's original five-second cycle
is retained as a future reference, not current behaviour.

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

## Section entry motion

Custom CSS is kept in scoped blocks in `app/globals.css`. The hero no longer
uses a CSS module. `RevealGroup` progressively enhances the facts/story using
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

The selected-clients rail uses anonymous outlined slots while assets are under
review. It now reuses iProduce's single-row Marquee primitive, four repeats and
40-second CSS loop, with a persistent pause/play button and hover/focus suspension. Motion is progressively enabled;
reduced-motion/no-JavaScript keep a static, readable grid. Duplicated animation
content is excluded from accessibility. No generic marquee/section framework
or new dependency was introduced.
