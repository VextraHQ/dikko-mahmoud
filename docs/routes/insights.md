# Insights — layout and content contract

## Remaining proposal requirement · 12 November 2026

The proposal includes optional document attachments/downloads on articles.
Today's `InsightSource` and renderer have no document-download field or control.
Add the file contract, CMS validation and accessible presentation during the
integration pass, showing nothing when an article has no file. The current rich
article layout does not complete this requirement. See
[the handover checklist](../handover-checklist.md).

## Status and scope · 3 November 2026

Implemented for local visual review. The user supplied
10 desktop/mobile screenshots (11:48–11:52), requested an iProduce architecture
review, and confirmed **layouts + content/schema contract first**. Sanity Studio,
provider credentials, migrations, webhooks and deployment remain later. The user
explicitly authorises demo article content and stock photography for this layout
checkpoint, without per-card pending-approval warnings. Do not change existing
client/matter/profile consent rules.

Build `/insights` and `/insights/[id]` using the existing route builders. `[id]`
is the readable article slug; published URLs remain stable. Shared navigation
continues to say Insights; the full series name is **Dikko & Mahmoud Legal Insights
Series**, including the mobile eyebrow (the screenshots differ here).

## Findings from the iProduce reference

Reviewed the actual `iproduce-africa` types, article schema, fetch adapter, GROQ
queries, listing page/body, article renderer, image helper and reading controls.

Keep its separation between data access, normalized presentation data and article
rendering; single featured-article pointer; body-derived reading time; card/hero
image override; structured blocks and intentional media failure states.

Improve these observed reference choices for this project:

- Its listing query projects full documents including bodies and the client
  listing receives the full collection. Here, query/filter/page on the server and
  pass only current-page card metadata. Detail bodies never enter the toolbar bundle.
- Its Portable Text adapter/schema disables inline marks. Legal writing needs
  inline links, emphasis and citations from the first renderer contract.
- Its reading bar and ring measure the whole document independently. Here, use
  one article-scoped progress source, excluding related content and the footer.
- Its `_updatedAt` becomes `updatedAt`. Here, use a deliberate editorial
  `revisedAt`; an administrative CMS edit must not advertise a new legal update.

These are inspected code patterns, not claims that iProduce is broken or has
measured production performance problems. Do not edit that repository.

## Listing presentation and behaviour

1. Preserve the supplied navy introduction and split featured article; stack the
   media above its copy on mobile. Add a compact author byline, as required by
   client feedback. No carousel or autoplay.
2. Use one editor-selected featured reference, with newest eligible article as
   fallback. The feature stays outside archive pagination and counts. The archive
   includes every eligible article, including the feature, so ordering/counts do
   not unexpectedly change when an editor changes the featured reference.
3. Show the feature only on the default first page. Hide it on search, filters,
   non-default sorting and later archive pages to put results first. Keep the
   compact introduction so the page identity does not disappear.
4. Archive: 9 items per page, 3 columns on desktop, 2 on tablet, 1 on small phones.
   Use real Previous/Next/page links, not infinite scroll. Hide pagination for one
   page, derive counts from actual results and show “Showing 1–9 of 27 insights”.
   The feature is outside that numbered range; do not add a phantom tenth result.
5. Server query state: `q`, `type`, `practice`, `sort`, `page`. Default newest first;
   offer oldest first too. No “most popular” without real readership data.
   Normalize whitespace, repeated/invalid values, unknown enums and page numbers.
   Invalid/nonpositive page becomes 1; an out-of-range positive page redirects to
   the final valid page preserving other filters. Zero results has no page controls.
6. Search name/topics via title, excerpt, keywords and derived searchable body
   text (including legal citations). Future CMS requests use parameterized queries,
   never interpolate user text into GROQ. Debounce enhanced typing around 300ms;
   Enter submits immediately. Cancel stale updates and keep the latest draft query
   when a filter changes. Use a native GET form/submit fallback without JavaScript.
7. Search/sort/filter changes reset page 1 and retain other selections. Replace
   history for typing, use navigation history for deliberate filter/page changes.
   Back/Forward restores query, selections and results. Preserve listing URL and
   scroll when opening/returning from an article through normal browser history.
8. Input X clears only search; a separate Clear filters clears search/type/practice
   while retaining the chosen sort. Offer it whenever any filter is active. Announce
   a settled results count politely; do not move focus while typing. Pagination
   moves the reader to the archive heading, beneath the sticky header.
9. Desktop uses app-themed shadcn Selects with bounded popper positioning below
   the trigger. On mobile use the established labelled Dialog/sheet pattern for
   long practice choices. Touch targets >=44px; visible focus matches People.
   On mobile: full-width search, then Type and Practice controls as space permits;
   result count/sort/clear wrap naturally. Controls work with a keyboard.
   Named dropdowns server-render as labelled native selects, then enhance after
   hydration. Each owns its form name exactly once; the fallback submits actual
   values through the GET form, including the empty “All” value.
10. Type is Article, Case note or Regulatory update. Practice options reference the
    existing nine-practice catalogue, never a second hardcoded practice list.
    Only practices used by eligible articles appear. Keep selected valid filters
    visible even when their current intersection has zero results. One primary
    practice supplies the card label; additional references support filtering.
    Long labels wrap; do not copy inconsistent “Corporate”/“Dispute” labels from
    different screenshots or disguise The Firm as a practice.
11. Reuse the shared FAQ with Insights-specific copy and the shared CTA/footer.
    Optional sections collapse cleanly. No newsletter or subscription integration
    is added from the iProduce reference.

### Pagination scale decision

Compact phone archive cards and practice-page strips retain the author byline.
On 4 November the user authorised the review fixes: bylines on compact cards,
native dropdown fallback, and a feature only in the default first-page view.
The full archive includes all 27 demo articles (9 per page); selection of the
feature never removes an article from pagination. Hiding/restoring the feature
keeps the search toolbar visible without taking input focus.

Use the same asynchronous `getInsightPage(query)` interface with local data now
and a Sanity adapter later: items, total, page, pageSize and available facets.
Fetch a bounded projection of 9 cards plus count/facets; never load all bodies to
paginate in the browser. Sort deterministically by publication date and stable ID.

Numbered pages match the supplied design and are appropriate for this editorial
archive. Bounded offset queries are a deliberate initial tradeoff: deep GROQ
slices get more expensive, and new publications can shift later pages. Do not
promise unlimited constant-time scale. Keep pagination behind the repository;
measure query cost at integration and move to indexed/cursor-backed paging if the
actual archive requires it. No separate search service or cursor-map infrastructure
is built speculatively in the layout checkpoint.

## Article presentation and reading UX

- Light shared header; breadcrumb Home / Insights / actual article title. Article
  type, primary practice, publication date, calculated reading time and author(s)
  belong to the same record as the title/excerpt and image. Show Revised only
  when an explicit editorial revision exists; format dates consistently.
- Match the supplied editorial split hero and left desktop sidebar. Constrain the
  reading column to roughly 65–75 characters; body text 16–18px with generous
  line height. Long titles/URLs, tables, captions and multiple authors must wrap.
- Contents are generated from actual H2/H3 blocks with stable block-key anchors,
  including duplicate headings. Never maintain a separate hand-entered contents
  list. References may join the contents only when references exist. Hide contents
  on short/no-heading articles. Desktop sidebar stays below the header, with
  bounded contents scrolling on short screens; mobile uses a native disclosure
  above the article. Anchor navigation remains readable without JavaScript.
- Active-section highlighting is progressive enhancement; headings have scroll
  offsets and an understandable focus destination. Related practice links are
  resolved from this article's references. No hardcoded Corporate CTA on a patent
  article. Keep sidebar practice promotion compact so contents remain usable.
- The supplied patent screen's body, quote attribution and practice promotion
  belong to a different subject. Do not reproduce this mismatch. Demo articles
  must exercise matching title, practice, headings, body, references and byline.
- Body supports paragraphs, H2/H3, inline emphasis/strong/link/citation marks,
  unordered/ordered lists, quotations, key-takeaway callouts, images/captions and
  accessible comparison tables. No code-editor blocks or arbitrary HTML are needed.
  Tables scroll inside a labelled region; images reserve their aspect ratio.
- References are structured links with publisher/title/URL and optional note.
  Use a normal external-link arrow; a plus/disclosure is only appropriate when
  there is actual expandable information. Deduplicate references and connect
  inline citation anchors. Do not fabricate legal sources or quotations.
- Keep the general-information disclaimer and back-to-insights link. Place sources
  with the article, before its final disclaimer/back link. Default to the existing
  global enquiry callout after related articles; omit the extra in-article sales
  box to avoid repeating three enquiry prompts around a short piece.
- Related content: up to 3 unique articles, current article excluded, eligible
  explicit references first, then shared practices, then newest. One/two render
  naturally; zero hides the whole section. No dummy carousel controls.

### Reading progress and back to top — explicitly authorised here

One narrowly scoped reading hook supplies the indicator and return-to-top control
on article routes only. Measure the article body/references reading region: 0%
before it starts, 100% when its end has entered the readable viewport. Exclude
header, hero, promotions, related articles and footer. Clamp values; handle short
articles, image loads, viewport resize and deep-linked headings. Recalculate bounds
when content dimensions change; do not set React page state on every scroll frame.

Use a quiet navy progress ring around the arrow; avoid a second redundant animated
bar across the floating site header. Show the >=44px control after meaningful
scroll, with safe-area spacing and accessible name “Back to article top”. It is
not a live region announcing every percent. Activation returns to the article
heading and manages keyboard focus there. No-JS gets a normal top anchor.

Subtle Motion is authorised for this reading feedback only; keep it out of prose
entrances. Reduced motion keeps the useful progress indication but removes spring
lag, smooth scrolling and entrance/hover movement. Respect the existing Sonner
position: copying success/failure must not cover the control or obscure reading;
verify placement at narrow widths and with long error messages.

### Sharing

Reuse the existing `useCopyLink` + Sonner, extending it with an optional explicit
URL without changing current profile behaviour. Article shares copy a canonical,
clean article URL (no search state, tracking or heading fragment), with honest
success/error text and one reusable toast ID. Failure offers selectable text for
manual copying. In local/no-index previews, retain the actual preview origin with
the clean article path; do not copy a nonexistent production URL from fallback
metadata. Live publishing uses the configured public canonical origin. Do not
claim success when clipboard access failed.

LinkedIn, X and WhatsApp share intents are normal external links built from the
canonical URL/title; no social SDK or share-count tracking. Native Share is an
optional enhancement where supported; user cancellation is silent and other
failures fall back to copying. Keep copy/share available near the article heading
on mobile and in the desktop sidebar. Named icon buttons, keyboard focus, no
hover-only instructions and no surprise share actions while scrolling.

## Content/schema contract (decide before layout code)

Separate `InsightCard` from `InsightArticle`. The first is a slim listing projection;
the second adds body, references and SEO. Layout components receive these stable
shapes from a server-owned repository, independent of local or Sanity storage.
Keep the four existing Home preview destinations resolving through the catalogue
(`corporate-decisions`, `dispute-strategy`, `energy-projects`, `technology-ip`);
do not redesign Home or independently maintain conflicting article metadata.

- Identity: stable ID, unique slug, title, excerpt, type, keywords, optional
  practice references (0..n; the first names the card, otherwise the type label
  does, so firm news can stand alone) and author references. Multiple authors
  may render in one compact byline; never duplicate person biographies in articles.
- Dates: publishedAt (ISO/timezone), optional editorial revisedAt. CMS `_updatedAt`
  is operational metadata, not the visible revision date. Future scheduled records
  stay out until eligible; do not assume a future timestamp schedules a CMS publish.
- Media: original source/asset identity, dimensions, alt, optional caption, credit,
  source URL, crop and hotspot/focal position. Main image serves cards/feature;
  optional hero override handles a genuinely unsuitable crop. Body images are separate.
- Body: Portable Text-compatible keyed blocks/inline marks from the start. Prefer
  a tested standard Portable Text renderer with custom firm components rather than
  an intermediate plain-string block format that strips links. Local fixture shape
  must exercise the same marks, lists, images and tables the later schema allows.
- References: stable key, title, publisher, URL and optional note. Inline citations
  point to these keys. No manually copied TOC or read-time fields. Estimate reading
  time from visible article text/callouts/lists/captions/tables, minimum 1 minute;
  optional editorial override may exist, but bad/zero values cannot leak into UI.
- SEO: optional title/description/social image override, with visible-content
  defaults. Optional explicit related references. Featured selection belongs to one
  Insights settings record, not competing booleans on individual articles.
- Types: Article, Case note, Regulatory update, Firm news. Local bodies are
  written with `lib/insights/blocks.ts` builders in `content/insight-bodies.ts`
  and rendered inside a `@tailwindcss/typography` prose wrapper, so editor text
  needs no classes; custom blocks (takeaways, table, figure) opt out with
  `not-prose`.
- Future Studio schema validates required title/slug/excerpt/type/author/body/date,
  real references and media alt. Editor options match renderer support exactly.
  Unknown block types must surface diagnostics, not silently lose legal prose.

For this preview, use 27 unique demo records to exercise 3 real pages, all clickable
and coherent, with varied title/body lengths and supplied content types. Keep demo
records isolated from real firm content and disabled when indexing is enabled.
Use clearly generic sample-contributor identities, never imply a partner wrote
fabricated legal advice. No repeated pending-approval banners on cards/articles.
Do not invent statutes, case outcomes, references or attributed quotations to fill
the layout. Include prose-only and rich-block fixtures, without pretending they
are commissioned firm publications. Real articles later reference canonical People
records; unresolved authors are an editorial/data error, not a fabricated firm byline.

## Media and cropping contract

Reference candidates and credits are in [insights-media.md](../insights-media.md).
Use real topic-appropriate stock images, never imply a stock office/person is the
firm or a client. Avoid choosing unrelated skylines for every legal subject.

Implemented layout presets: card **16:10**, featured and split detail hero **4:3**,
social **1.91:1**. Reserve frames before loading and test the same source at all
presets and 320/390/768/1024/1440px. Inline diagrams/document illustrations use
natural proportions, not a forced photography crop. Long copy must expand naturally
without distorting images or hiding essential text.

Preserve the source image's crop/hotspot metadata through normalization. At Sanity
integration, request explicit target dimensions from the full image field through
its image URL builder; merely flattening it to a URL and using centre `object-cover`
is insufficient. A hero override is available when one image cannot serve both.

With local fixtures, use the same image component/presets and focal-position field.
Lazy-load below-fold card/body media; prioritize only the actual above-fold feature
or detail hero. Correct `sizes`, intrinsic dimensions, safe remote-host configuration
and branded failure cover prevent layout jumps/broken icons. Record photographer,
source and licence separately from alt; alt describes the image, not a guessed
legal event. Replace/select sources before any bulk WebP conversion. At CMS time,
retain upload originals and use the CMS transformation pipeline for delivery.

## Failure and edge-case acceptance

- Zero articles: successful listing with introduction, quiet “Insights will appear
  here” state and useful practice/contact routes. Hide feature, filters, counts and
  pagination. FAQ/CTA can remain if their content exists. This is not a 404.
- Zero matches: retain selections, show no-results message and Clear filters;
  preserve query context and focus. Missing feature is not an empty catalogue.
- One article: feature/card can both represent it, but no pagination; hide facets
  with no useful alternatives. Invalid featured reference falls back to newest.
- Missing/deleted/unpublished slug: true not-found route. CMS failure: error/retry
  presentation, not a fake empty archive or substituted demo articles. Last known
  good cached content is acceptable when explicitly available.
- Missing/failed image: same reserved frame with the firm's editorial fallback.
  Missing excerpt: derive a bounded plain-text excerpt; never show undefined.
- Broken person/practice reference, invalid date or empty article body: fail closed
  for public article eligibility and report diagnostics; do not crash the entire
  listing. Missing optional references/related blocks simply collapse.
- Duplicate/very long headings, paragraphs, URLs and names; no headings; short
  articles; very long articles; image captions; long footnotes; nested lists;
  overflow tables; unknown blocks/unsafe link schemes; missing image metadata.
- Search debounce races, browser Back/Forward, refreshed filtered URLs, cleared
  controls, page reset after filtering, page deletion between requests, equal dates,
  stale featured pointers, clipboard denied/unavailable and cancelled native share.
- Slow transitions show scoped loading feedback with stable card geometry. Keep
  last visible results while loading if appropriate; never hide errors behind an
  indefinite skeleton or announce the entire page on each keystroke.

## SEO, routing and future integration

Progress feedback is a reading aid, not a ranking signal. Server-readable article
content, truthful authors/dates, stable URLs, useful internal links and accurate
metadata are the SEO foundation. Use createPageMetadata and the site's no-index
switch. All preview/demo content remains no-index.

At launch, render Article/BlogPosting and BreadcrumbList JSON-LD from the same
eligible real record as the visible article; escape script-sensitive characters.
Do not invent author credentials, freshness or legal-review claims. Don't emit
public structured-data claims for demo contributors. Use article-specific social
metadata with the shared branded image fallback. Schema eligibility never promises
search features or rankings.

Clean archive pages use self-canonicals, including `?page=2` (not all page 1).
Search, filter and alternative-sort combinations remain no-index when the wider
site launches. Normalize query URLs and give crawlers ordinary pagination links.
Future published article sitemap entries come from a narrow server repository
projection. Do not bundle the whole growing CMS slug inventory into client nav just
to activate article links; register the route family and resolve eligibility on the
server. Unknown records still 404. Coordinate this with the existing route registry
rather than hardcoding page URLs in cards.

Future Sanity adapter: bounded listing/detail/feature/related/sitemap queries,
explicit published perspective and scheduling eligibility; authenticated editor
preview separated from public reads. Query/cache keys include normalized filters
and page. The integration checkpoint must validate publish/edit/unpublish, author
and practice reference changes, image changes, featured pointers, slug redirects,
metadata/sitemap and cache invalidation. No hidden switch to demo data on CMS error.
This defines the contract now; it does not claim webhooks or caching are connected.

## Implementation batches and verification

1. User aligns this spec, crop presets and placeholder strategy. Add local DTOs,
   repository and fixtures; test normalization, eligibility, search/sort/paging,
   date/read-time/heading/citation/related rules before composing the pages.
2. Build listing/feature/cards/filters/pagination, stock media variants and zero /
   one / many / zero-match states. Check URL state and no-JS GET navigation.
3. Build article renderer/sidebar/contents/bylines/references/related cards and
   reading/share controls. Review short and rich/long articles, all crop presets,
   keyboard, clipboard failures, reduced motion and narrow/mobile sharing.
4. Verify metadata, server HTML, JSON-LD sanitization, sitemap eligibility, true
   not-found and loading/error separation. Run formatting/lint/typecheck/tests and
   production build at the route checkpoint. Record actual results only.
5. Sanity integration is later, using this contract; run real-data/editor acceptance
   before removing fixtures. Careers follows its own model, not a generic page builder.

The user authorised Codex implementation after aligning the contract. The original
Claude brief remains a review checklist. Current runtime ownership:

- `content/insight-articles.ts`: 27 isolated demo metadata/body records, sample
  contributors, one feature pointer and four Home selections.
- `types/insights.ts`: slim cards, full articles, Portable Text/custom block types,
  references, media and paged repository responses.
- `lib/insights/`: server selection/eligibility/diagnostics, query rules,
  text/heading/media helpers and metadata/schema. No provider is connected.
- `components/insights/`: server-rendered cards, feature, prose and references;
  narrow client toolbar and reading/share controls. Server prose passes through
  the reader as children; the toolbar never receives body documents.
- `hooks/use-insight-filters.ts`: debounced navigation, draft preservation,
  history and archive focus. `use-article-reading.ts` supplies one MotionValue
  progress source. `use-article-share.ts` reuses the shared copy hook/Sonner.

The current adapter processes local records in memory on the server. The API is
bounded, but this is not a measured Sanity query implementation. Future integration
must implement the bounded projections and invalidation described above.

The progress arrow yields its corner while a Sonner toast is present. Sources
outside a suitable wide aspect ratio use the existing branded social artwork,
not an automatic destructive crop; see the media register. Every fixture is
excluded when indexing is enabled, including Home, detail parameters and sitemap.
Verification evidence and remaining limits are in the implementation log.

## Technical sources checked

- [Next.js search/pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)
- [Sanity pagination and tie-breakers](https://www.sanity.io/docs/developer-guides/paginating-with-groq)
- [Sanity image field crop/hotspot](https://www.sanity.io/docs/studio/image-type)
- [Portable Text editor support](https://www.sanity.io/docs/studio/portable-text-editor-configuration)
- [Google pagination/canonicals](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)

Local reference paths (read only): iProduce `types/blog.ts`,
`sanity/schemaTypes/documents/academy-article.ts`, `lib/sanity/fetch/articles.ts`,
`lib/sanity/queries.ts`, `lib/sanity/image.ts`, `components/academy/blog/`,
`components/shared/reading-progress.tsx` and `scroll-to-top.tsx`.

## Polish review · 12 November 2026

- Cards, the featured badge and the key-takeaways box have no decorative
  icons; card meta reads "date · reading time" (G4).
- Article label shows the type only; the trail names the category (G1, G2).
- Share: a labelled "Share" button in the byline, plus "Share this article"
  above "Back to all insights" (A1, A2).
- Phones: search plus one "Filters" button. The bottom sheet
  (`components/insights/filter-sheet.tsx`) holds practice area, type and sort
  as plain choices that apply at once. Before hydration and on desktop the
  inline filters stay (I1).
