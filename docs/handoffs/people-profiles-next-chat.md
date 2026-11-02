# Claude handoff People profiles and navigation

Implementation handoff approved in scope on 1 November 2026. Use this prompt in
a Claude chat attached to the repository. Codex will review the actual diff and
browser behaviour afterward. The canonical owner is `../routes/people.md`.

```text
Continue Dikko & Mahmoud in /Users/nabeelhassan/Desktop/dikko-mahmoud.

Implement the bounded profile-and-navigation slice in docs/routes/people.md.
Read AGENTS.md, README.md, docs/README.md, roadmap, architecture, design/layout
rules, docs/client-alignment.md and the current git status/diff first. Preserve
unrelated and uncommitted work. This repo's installed Next version has breaking
changes: read its intercepting/parallel-route and page/metadata guides before code.

Confirmed choices:
- Keep both Our People and Selected matters in main navigation. Order: Home,
  The firm, Practice areas, Our People, Selected matters, Insights, Careers,
  Contact. Keep existing routes.people and routes.experience; no route rename.
- Full navigation begins at 90rem/1440px to fit all eight items. Below that,
  keep the current Sheet. Synchronise desktopNavigation and visibility/reset
  rules; preserve the separate lg hero/profile layout threshold.
- People cards open a route-backed profile popup over Home, Firm or practice
  content. Each canonical /people/[slug] URL also works as a standalone full
  profile on direct load, refresh, new tab and no-JS visits. Popup and page
  share the exact same server-owned profile body and selected person's data.
- Use Next intercepting/parallel routes and installed Radix Dialog. Include null
  default/root/catch-all slot routes to prevent stale overlays. Use a small
  client modal/hook boundary; keep content and metadata on the server. Standalone
  profiles use light chrome; overlays retain the origin page's header tone and
  active state rather than recolouring the background from the profile URL.
- Back closes; Forward reopens. Close button, Escape and overlay dismiss back
  to the originating context. Preserve scroll and return focus to the card.
  Focus the long dialog's heading initially and keep the close control reachable.
- Desktop follows the supplied two-column profile screenshot. Mobile is an
  explicit responsive adaptation: near-fullscreen modal, one scroll body, close
  bar, stacked identity/compact 4:3 portrait/biography/qualifications/focus/contact.
  Preserve existing card crops and fallback initials.

Use the screenshot paths and brochure references in the spec. Do not rely on
Figma MCP availability or crop screenshots into portrait assets. Only the four
existing partners are in this slice. Prepare source-backed full biography data;
internal review notes are not biography text. Omit missing credentials/contact
fields and flag firm confirmation. One visible source-review note is sufficient
for no-index profile previews. Approved-only publication must still be enforced
when indexable is enabled; withheld profiles remain unavailable. Keep preview
selection explicit at the server boundary to avoid a siteConfig/firm/people cycle.

PersonCard links must use the same profile-availability resolver as route pages,
not its current hard-coded false fallback or a blanket true override. Register
only available profile slugs through a public ID/status manifest; never import
private profile bodies into the route registry/client bundles. /people directory and /experience index remain
preparation notices until their actual index pages are built. SiteLink may gain
an optional scroll prop for real profile links; do not forward it to notice buttons.

Do not build a People directory, office/position filters, Selected matters pages,
provider/CMS integrations, deployment or a new animation framework in this slice.
Do not restore removed testimonials, old wider-team copy, Home named matters,
client logos or the currently hidden practice carousel. The supplied navbar
screenshot does not supersede the user's decision to keep both destinations.

Implement and check in coherent slices. Run targeted formatting while iterating,
then format:check, lint, typecheck, test and production build at handoff. Review
320, 390, 768, 1024, 1280, 1366 and 1440px; all four profiles, overlay scrolling,
close/focus return, Back/Forward, refresh/direct URLs, no-JS, unknown slugs,
withheld/preview availability, light/dark header regressions and the practice
mega menu. Record only checks actually run and update the spec/log with any
remaining content/media limitations. No final client publication approval exists.

Return a concise summary of changed areas, verification and remaining gaps so
Codex can review the actual implementation against docs/routes/people.md.
```
