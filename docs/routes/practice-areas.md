# Practice areas

## Current checkpoint

The user authorized the Practice areas hub, supplied mega menu and individual
practice pages on 31 October 2026. These are local no-index previews. Home and
The Firm retain their review hold; this is not publication approval.

The user has approved using the nine-practice catalogue consistently across the
site. `content/practice-index.ts` is the public source for titles/categories,
ordering, summaries, Home and future enquiry options. `content/practice-catalogue.ts`
adds server-owned detail and consent-sensitive experience. Navigation and route
registry consume only the public index. All detail URLs remain unchanged. Capital
Markets placement still needs firm confirmation; SME is a separate offering.

## Reference

The Figma MCP quota was exhausted, and the user confirmed no further links were
available. Use the eleven supplied CleanShot references from 30 October 2026:

- 7.32.26: hub hero and introduction.
- 7.32.31 and 7.32.34: nine practice cards, categories and service disclosures.
- 7.32.37: hub FAQ and support card.
- 7.32.40: shared CTA and footer.
- 7.43.37: dark-header mega menu, numbered 1–5 / 6–9 columns.
- 7.49.46: Corporate hero, breadcrumb and light header.
- 7.50.16: sticky sidebar/contact, needs and services.
- 7.50.45: manual selected-experience carousel.
- 7.50.52: shared six-stage working process.
- 7.51.40: light-header mega menu with hover/focus surfaces.

These are screenshots, not source assets. Do not crop them into website images.
No mobile design reference was supplied; responsive behaviour follows the existing
site conventions and is locally checked rather than Figma-verified.

## Implemented behaviour

- `/practice-areas`: navy editorial hero, source introduction, shareable category
  query links, nine cards, native service previews, hub-specific FAQ and shared CTA.
- Shared desktop Navigation Menu: viewport-bounded wide panel with introduction,
  all-practices CTA and nine numbered destinations. Rows fade in a sky border
  and tint on hover; the practice being viewed keeps a navy outline and
  `aria-current="page"`. Radix handles keyboard entry,
  arrow navigation, Escape and focus return. Mobile uses the existing Sheet and
  an Accordion listing the hub and all nine pages.
- `/practice-areas/[slug]`: nine generated readable URLs. Unknown slugs return
  404; metadata and launched routes derive from the catalogue. All stay no-index.
- Shared detail presentation: light header, native breadcrumb, hero, sidebar
  links derived only from existing sections, sticky contact card from `lg` and
  normal-flow navigation on smaller screens.
- Corporate & Commercial Advisory: three supplied needs, three services,
  two stored experience records, currently hidden (carousel commented out pending client consent; see client-alignment.md), previously visible for design review while no-index and the screenshot's Bello Aminu Abdullahi
  contact. Reuses canonical people records and the existing working process.
- Services reuse the shared accordion; experience reuses a manual Embla carousel
  with touch/keyboard controls and no autoplay: one line per case on the left
  (navy when current, clickable) and arrows on the right; services list as bullets. Optional page-specific FAQs reuse
  FaqSection with independent copy; no unprovided Corporate FAQ is invented.
- Native no-JS navigation, disclosures and static case list preserve access.
  Reduced motion disables the menu fade and carousel movement. Static cards have
  restrained border/shadow feedback without moving reading text.

## Ownership and link review

`content/practice-index.ts` owns public records and future enquiry choices.
`content/practice-catalogue.ts` owns per-page detail data, category normalization,
approved experience selection and sidebar section selection.
`content/practice-faqs.ts` owns hub FAQ data. Each practice's `detail.faqs` can
supply its own heading, description and FAQ items, independently of the shared UI.
The public index has no domain imports, keeping route-registry imports acyclic
and withholding pending experience from navigation client bundles. Page modules own metadata/parameters; components
own presentation and `usePracticeMenu` owns menu state/breakpoint reset.

The existing SiteLink/route registry architecture is retained. Its availability
check now ignores query/hash suffixes on built paths and accepts local fragment
and query navigation. Unknown/unbuilt pages still show the existing preparation
notice. SiteLink passes its callback to Next Link's native `onNavigate`, so a
Radix/Slot `onClick` cannot overwrite menu-close behaviour and prevented clicks
retain their expected semantics.

The only dependency added is `@radix-ui/react-navigation-menu`, with a minimal
local shadcn-style wrapper consistent with the existing Radix components.
Breadcrumb uses native markup and the existing Slot. No registry theme reset,
CMS, submission service or deployment configuration was added.

## Remaining review gates

- Original hub and detail photographs are absent. Intentional brand covers occupy
  those crops. The light header now uses the supplied navy logo
  (`public/brand/navy-logo.png`, 352×116; a 2× file would sharpen it).
- The other eight practice pages have complete source titles/categories/summaries
  but no supplied detail copy, services, people, experience or FAQ collections.
  They show explicit preparation notes rather than borrowing Corporate claims.
- Corporate's third need was supplied on 31 October 2026. The second case's
  organisation heading is still cropped ("Nigerian Gas Production & Transpo…")
  and was later resolved from brochure PDF page 20 as Nigerian Gas Production &
  Transportation Company Ltd. The record remains pending consent and may appear only in the current no-index
  design preview, with a visible preview note. The third case
  is not supplied. Contract Drafting & Reviewing has no supplied description and
  stays an explicit editorial slot. No outcomes or additional team assignments
  are inferred.
- Only the first hub FAQ answer is supplied. The other four answers are explicit
  editorial slots. Legal text, matter naming and source copy need client approval.
- Global publication/content approval, other secondary pages and provider work
  remain separate. The existing user-added homepage autoplay/Analytics is preserved.

## Verification

Use the required format, lint, typecheck, test and production build commands.
Catalogue tests cover unique routable records, category counts/normalization,
valid contact/Home references and section links matching optional data. Route
checks cover query/hash handling and unknown destinations.

Browser review should cover 320, 390, 768, 1024, 1280 and 1440px; no horizontal
overflow; desktop and mobile menu navigation; keyboard Escape/focus return;
service disclosure; manual experience next/end controls; filtering; unknown slug;
no-JS content; and Home/Firm shared-header regression checks. Record actual results
in the implementation log. A local build does not confirm deployment readiness.

## Polish review · 12 November 2026

- Listing: both intro paragraphs stay beside "Find the support you need."
  (P2 was built, then reverted at the user's request on 12 Nov). The hero
  cover no longer repeats "Our expertise" (G2).
- Detail: no category label above the title; the trail names it (G2). The
  button under "Working together" is removed; the hero button, the "Your
  contact" card and the closing band stay (G3).
- SME: the Advisory and Secretarial cards have no buttons; the hero button
  and the closing band stay (G3).
- Practice card numbering (01–12) stays as designed (P1 held).
