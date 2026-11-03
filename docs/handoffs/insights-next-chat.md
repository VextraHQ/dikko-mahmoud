# Insights implementation brief — implemented, retained for review

The user aligned the contract and authorised Codex to implement it. The brief
below is retained for a subsequent Claude/Codex review; do not restart the work.
Read the current diff and latest implementation log first. Sanity remains deferred.

Paste-ready brief:

> Implement the supplied Insights listing/article design in this repository using
> `docs/routes/insights.md` as the contract and `docs/insights-media.md` as the initial
> stock-photo shortlist. Read AGENTS.md, the current roadmap, architecture, layout
> and design-system docs, matching .claude rules and the current diff first.
>
> Keep Sanity/providers/deployment disconnected and previews no-index. Use 27
> isolated coherent demo records and generic sample-contributor labels, with no
> per-card pending-approval banners. Preserve existing Home article destinations,
> profile behaviour, header/autoplay/Journey and consent controls outside Insights.
>
> First implement/test the slim card/full-article DTOs, asynchronous server data
> interface, Portable Text-compatible rich blocks, canonical practices/authors,
> image variants and URL query/pagination rules. Then compose the supplied navy
> feature/listing and light editorial detail pages from those shapes. Nine articles
> per page, server-filtered/paginated, real page links, native GET fallback; never
> ship every article body to the browser. No universal CMS page builder.
>
> Include all documented empty/loading/error/not-found and media failure states.
> Match author/date/read-time metadata across cards/article/SEO. Generate contents
> from the actual body headings, not an independent list. Keep citations, emphasis,
> links, tables and source references intact. Fix the supplied patent/corporate-body
> mismatch rather than reproducing it.
>
> Implement article-only progress ring/back-to-top using one body-scoped source,
> reduced-motion support and accessible focus. Reuse Sonner/copy handling without
> regressing profile copy; share a clean URL on the actual preview origin locally.
> Check long toasts do not overlap the reading control. Share intents use named
> icon links, not third-party SDKs. Sources are links, not fake accordion buttons.
>
> Preserve crop/hotspot/focal metadata and validate card/feature/detail/social
> presets before selecting runtime stock assets. Record source/photographer/licence
> and keep originals; no bulk WebP conversion before image selection. If one image
> cannot serve every context, use the agreed optional hero override.
>
> Work through the spec's batches; report only completed checks. Test query state,
> eligibility, pagination boundaries, heading/citation/author integrity, related
> selection, safe URLs/JSON-LD and demo exclusion at launch. Review 320–1440px,
> keyboard, reduced motion, no-JS/server reading and rich/long content. Run format,
> lint, typecheck, tests and the production build at the finished route checkpoint.
> Update current docs and append factual verification to the implementation log.
> Leave changes reviewable; do not commit, deploy or turn on indexing unless asked.

Codex review should compare actual diff/browser states against the contract and
fixtures; green unit tests alone do not validate crops, keyboard focus or live CMS
editor behaviour. Live-content publishing/cache tests belong to the later Sanity
integration checkpoint, not this layout implementation report.
