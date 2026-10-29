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
- Practice areas now use the user-approved editorial explorer instead of the
  original staggered gallery: a desktop index beside one large visual, and a
  compact mobile accordion in source reading order.
- Selected matters stack the feature above its selector on mobile. Selection
  requires click/tap or keyboard activation; hover never changes the preview.
- People use the approved four-column grid from `lg` and compact two-by-two
  grid below it, superseding the source mobile stack. Homepage stays capped
  at four, independently of the future full directory's size.
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
tablet below 1024px uses 32px gutters and a 384px photo. The hero switches to its
split overlay at `lg` (1024px); full navigation remains at `xl` (1280px).
Stacked copy records reserve the largest content height, keeping
the single CTA and image stationary without fixing text heights. The photograph
track crossfades independently beneath a persistent desktop panel.
Mobile keeps the slide count on the left and two arrows on the right, matching
the supplied crop. The existing 43% navy desktop panel is retained.

Between `lg` and `xl`, copy uses 32px gutters, a 144px top allowance, 16px body
copy and a more compact fluid CTA gap. The title scales from 56px using the
same clamp as the wider layout. Photograph, panel, arrows and slide indicators
all switch together at `lg`; the header must not overlap the copy.

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
position. Below `xl`, the header uses a constant 12px top inset and 16/32px
gutters; `xl` uses 20px and the existing 80px gutters. From `lg`, it reserves
zero flow height for the hero overlay; smaller widths reserve their 86px
header space. The full shell is hidden at the top at all widths, fading in only
after the 64px scroll marker leaves view. The compact menu control has a small
contrasting background over the photograph. At `xl`, the
source logo/nav-pill/CTA top state remains. A non-sticky navy backing below
`lg` preserves the mobile hero's top
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

## Breakpoint policy

Choose a breakpoint for the room a composition needs, rather than changing
every section at the same width. Hero and header overlay begin at `lg` (1024px).
Full navigation begins at `xl` (1280px); facts become four columns there and
story uses its three-column grouping there. Practice/matters use `lg`;
their 64rem browser queries match that rule.

The audit measured the full desktop header at about 1056px including logo,
seven links, enquiry action and gaps, against only 960px usable at a 1024px
viewport with 32px gutters. Keep `xl` unless a separate compact-header design
changes those dimensions. The earlier hero split is an independent visual
decision, not a reason to replace every `xl:` prefix with `lg:`.

## Practice-area explorer

At `lg` (1024px), the introduction and numbered index occupy 46% of the shared
content width; a stable image panel fills the right 48%. All six labels remain
visible and controls have natural height for long names. Below `lg`, each panel
opens directly under its own index row. Mobile/tablet start collapsed and allow
the open row to close; opening another closes the previous row. Desktop keeps
one panel selected. Selection never changes the desktop section height.

The same buttons and panels serve every width; resizing preserves an explicit
selection. When no area is selected, desktop shows the first panel while
mobile/tablet remain collapsed.
Copy and content determine height, without viewport scroll pinning. Missing
photographs use clearly labelled, numbered navy slots with reserved dimensions.
The later approved media polish replaces photograph-pending text with numbered
decorative navy covers; dimensions and interaction remain the same.

## Selected matters

At `lg`, the section pairs a navy feature card with a slightly wider selector
column, matching the supplied screenshots. The introduction is a two-column
heading/copy-and-CTA grouping. Below `lg`, order is heading, description/CTA,
feature, then the four selectors. Card copy wraps naturally and inactive cards
reserve the largest record's height. The selected selector has a pale blue fill
and blue leading rule. Mobile selection brings the feature back into view,
accounting for the shared sticky-header scroll padding, and moves focus to it.

## People, client perspectives and insights

People keeps the shared section gutters and natural card copy. Portraits reserve
a 4:5 crop, two columns below `lg` and four above. Names wrap without truncation;
roles align at the bottom of each row. No horizontal rail, pagination or autoplay.

Client perspectives stack a circular portrait/initials slot above the copy below
`lg`; desktop puts a 16rem identity column beside the quote with a fine divider.
Manual controls/counter sit outside the changing slides. Each slide includes its
own identity and quote so they change together; the track reserves the tallest
slide's height. No autoheight plugin, scroll capture or fixed quote truncation.

Insights keeps DOM order introduction, feature, supporting list. Below `md` these
stack; tablet places the feature/list side by side beneath the introduction.
At `xl`, the visual order is feature left, introduction middle and list right.
Supporting cards wrap titles/categories; image slots reserve square crops and
the feature reserves a taller editorial crop. Media is lazy-loaded when supplied.

Fallbacks preserve those same crops when images are absent or fail. Portraits
use centered initials, editorial images use brand typography and client cards
use supplied organisation names when logos are missing. Text logos use compact,
at-most-three-line visual wrapping inside the existing 64/80px cards while
retaining the full name as accessible text. Missing content does not create
empty cards; anonymous development collections remain visibly under review.

## FAQ and enquiry/footer overlap

FAQ has a two-column introduction from `lg`, then full-width disclosure rows.
The source first answer pairs copy with a 240px-wide office thumbnail on desktop;
below `lg`, the thumbnail follows its answer. Other answers use natural text
height. The support card sits below the list with small overlapping team circles.

The enquiry card stacks copy/action below `lg` and pairs them on desktop.
It uses the shared cap/gutters, rounded-2xl surface and natural content height.
The page owns the CTA, while the shared site layout owns the footer. Coordinate
their spacing: CTA bottom margins are -40px below `sm`, -64px from `sm`, -112px
from `lg`; footer top padding is respectively 96px, 128px, 192px. This produces
the requested mobile overlap and leaves 56/64/80px clearance after the card.
No transforms, absolute card placement or browser height measurements are needed.

Footer brand/offices stack above navigation on mobile. Navigation has two columns
below `lg` and three on desktop; the main desktop grid pairs office information
with navigation/social/contact groups. Email can wrap at narrow widths. Mobile
links/social controls reserve 44px targets, and the copyright/location row stacks
on mobile. A white CTA uses the same geometry as the pale-blue homepage card.
