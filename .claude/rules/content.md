---
paths:
  - "content/**/*.ts"
  - "lib/**/*.ts"
  - "tests/**/*.ts"
---

# Content and publication rules

- Never invent client claims, people, practice areas, contact details,
  testimonials, awards, metrics or imagery. Missing content gets an explicit
  slot or note, not filler.
- Clients, matters and profiles carry a publication status. Only `approved`
  records render once the site is indexable. While no-index, pending records
  may render with a preview note through `previewOptions.allowPreview`;
  withheld records stay hidden. Use `isPublishable` (`lib/publication.ts`).
- Unapproved content stays labelled for review and never borrows a real
  client's attribution.
- Shared firm facts live once, in the firm domain (`content/firm.ts`), not
  copied between pages.
- FAQ starter copy stays in the local collection until Sanity is connected.
- Synthetic people, clients or matters exist only in `tests/fixtures/`.
- Every new pure rule or content rule gets a test in `tests/`
  (see `docs/testing.md`).
