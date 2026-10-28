# Layout system

## Reference dimensions

- Desktop: 1440px frame, generally 80px side gutters and 1280px usable content.
- Mobile: 390px frame, generally 16px side gutters and 358px usable content.
- Reference section padding is commonly 96px on desktop and 48px on mobile.

These map to existing Tailwind sizes (`max-w-7xl`, `px-20`, `px-4`, `py-24`,
`py-12`). Combine content limits and gutters deliberately: applying padding
inside a 1280px wrapper reduces its usable content width.

Use fluid grid and flex layouts between the references. Derive breakpoint
changes from available room, particularly the wide desktop navigation. Avoid
copying Figma's fixed widths, fixed text heights, or absolute section positions.

## Ownership

- Pages and section wrappers own content width and outer spacing.
- Reusable cards and buttons inherit available width; they do not own the page
  container.
- Keep each section's desktop and mobile behaviour together.
- Shared navigation and footer belong in `components/layout/`.
- Homepage-only compositions belong in `components/home/`.

## Specific responsive decisions

- Hero: desktop overlays the copy panel and glass navigation on photography;
  mobile stacks navigation, copy, photograph, and carousel controls.
- Firm facts stack on mobile. Content determines their height.
- The staggered expertise grid is deliberate on desktop. Mobile removes empty
  spacer cells and stacks the six practice cards in reading order.
- Selected matters stack the feature above its selector on mobile. Selection
  must work with touch and keyboard rather than relying on hover alone.
- People are four columns on desktop and four stacked profiles in the supplied
  mobile reference. Any future horizontal rail is a design change to discuss.
- Insights reorder the introduction above the feature and supporting list on
  mobile. Match DOM reading order to the mobile composition.
- The enquiry callout stacks its copy and action on mobile. Footer groups
  reflow with usable text and touch targets.

## Review points

Compare against the 1440px and 390px references, and inspect an intermediate
tablet width plus a narrow 320px viewport for overflow. Check text wrapping,
image crops, menu focus, long labels, section rhythm, and full-page continuity.

The mobile frame is approximately 14,847px tall, versus 10,387px for desktop.
Review the long stacked page in-browser before proposing changes to density.
Several compact insight text layers exceed their named parent widths in Figma;
use flexible wrapping and inspect the rendered result instead of copying them.

## First checkpoint implementation

The shared header, hero content and controls use a 1440px outer width cap
(`max-w-[90rem]`), with 80px desktop gutters leaving 1280px usable at the
reference width. This keeps alignment consistent on larger screens. The hero
uses a viewport-aware desktop minimum height clamped between 704px and 935px,
with natural expansion when content needs more room. Copy aligns towards the
bottom with fluid CTA spacing; it no longer depends on fixed 358px top or
134px CTA offsets.

The 390px composition uses 16px gutters, natural copy height and a 300px photo;
tablet uses 32px gutters and a 384px photo. Tailwind's `xl` breakpoint switches
to the desktop overlay and full navigation. Stacked copy records reserve the largest content height, keeping
the single CTA and image stationary without fixing text heights. The photograph
track crossfades independently beneath a persistent desktop panel.
Mobile keeps the slide count on the left and two arrows on the right, matching
the supplied crop. The existing 43% navy desktop panel is retained.

## Facts and firm story

The facts use four columns at `xl`, two at `sm`, and a single mobile column,
with fine left rules and natural text wrapping. Story uses the shared 1440px
outer cap and mobile/desktop gutters. Its mobile order is introduction, office
image/stat chips, editorial card, portrait, then CTA. At `md` the image spans
both columns above text/portrait; at `xl` the reference's three-column grouping
uses a wide image and narrower text/portrait columns. Source dimensions are
reserved even while the office/portrait use labelled placeholders.

## Sticky header and selected-clients rail

The header stays at the viewport top with two enhanced surface states: the
original logo/glass-nav-pill/CTA composition at the top, and a full floating
capsule after scrolling. Its content
row stays 72px high (74px including the surface border) at every scroll
position. Mobile/tablet use a constant 12px top inset and 16/32px gutters;
desktop uses 20px at the top and the existing 80px gutters. Desktop still
reserves zero flow height for the hero overlay; smaller widths reserve their
86px header space. A non-sticky navy backing preserves the mobile hero's top
surface and scrolls away with the page. Anchor scroll padding remains 112px.

Only the outer header wrapper owns horizontal page gutters. The inner row has
no additional horizontal padding, keeping its contents aligned with sections.
The full glass shell's paint layer extends 12px beyond its existing border on
each side, giving the CTA breathing room without moving the content row.
The logo has vertical padding only and left-aligned image fitting, avoiding
an extra inset between its artwork and the page gutter. Its source asset,
rendered size and reserved link dimensions are preserved.

Scroll changes neither height, padding, position nor logo scale. One fixed
marker at 64px controls an opacity-only surface crossfade. The nav pill
material fades away as the full shell appears, keeping the controls in exactly
the same positions with 44px item targets. Without enhancement, the full shell
remains visible for readability while scrolling.
The mobile Sheet remains a separate solid, focus-managed surface.

Selected clients use the shared content cap/gutters, a left-aligned heading and
one moving row using the iProduce partners pattern. Four repeated groups use
`translateX(calc(-100% - var(--gap)))` for the seamless loop. Cards are 180×64px
on mobile and 240×80px from `sm`, with 16px gaps and gradient edge overlays.
Rail overflow is contained.
Static fallback uses two columns on mobile, three at `sm`, and six at `xl`.
