# Selected matters

## Approved implementation checkpoint · 3 November 2026

The user approved the listing/detail wireframe and asked Codex to implement it.
This supersedes the earlier planning-only Claude handoff boundary for this route.
The desktop/mobile references supplied on 3 November establish the listing; the
approved wireframe resolves the detail pages using the existing editorial system.

## Presentation and routes

- `/experience`: dark shared header, office-image hero on desktop and solid navy
  on mobile. Heading: “Experience where the stakes are high.” The existing Firm
  hero image is deliberately reused for this temporary preview, not approved as
  final media. See [the media replacement gate](../media-review.md).
- White listing: “A closer look at our work.” Four organisation-led cards, two
  columns on desktop and one on mobile. Pale resting surfaces become navy on
  hover and keyboard focus. No permanently selected card, search or pagination.
- “Explore experience” opens `/experience/[id]`, preserving existing canonical
  matter IDs. These are short experience pages, not invented case studies.
- Detail: light header, wrapping breadcrumb, category/title/summary, separate
  numbered instructions, and a compact desktop sidebar with role and suggested
  practice links. Mobile stacks the sidebar after the instructions.
- Reuse enquiry CTA and layout-owned footer. Keep representative-experience
  qualification; avoid the reference's unnecessary blank space.

## Content and approval

Source: supplied `Dikko  Mahmoud Profile.pdf`, PDF pages 18–21 (printed 17–20),
cross-checked when drafting the approved wireframe. BPE opens the listing.

- BPE: Managing Partner as lead counsel in the $1.37bn UNCITRAL claim, and the
  firm's separate Enron Power Project advisory/document review instruction.
- CBN: legal advice on Federal Government revenue under Production Sharing Contracts.
- Kano State Government: separate Pfizer Trovan negotiation/mediation and Kano
  Electricity Distribution Company privatisation instructions.
- NNPC / NPDC: separate OML 12 representation and gas-sector contract novation.

Keep role attribution precise. $1.37bn is a **claim value**, never an award,
recovery or result. No outcomes, dates, team assignments or client logos are added.
Practice mappings are suggested for review and use canonical practice records.

The user authorised named pending records for this no-index listing/detail visual
preview. Show a pending-publication note. Withheld/missing approval always stays
hidden; indexable output remains approved-only. This exception does not restore
pending matters on Home or change the practice-carousel visibility decision.

Publication status and linkable IDs belong to a body-free matter manifest. Home
still consumes its approved-only projection. Detail copy is resolved on the server;
unknown, hidden or incomplete records return 404, including metadata requests.
Register listing/details with the shared route/metadata system and sitemap.

## Acceptance

- All four supplied experiences have working detail/back/breadcrumb/practice links.
- Separate instructions stay distinct; claim qualifier and role attribution remain visible.
- Consent, manifest/body integrity, unknown/incomplete records and route tones are tested.
- Review 320–1440px, keyboard focus, reduced-motion CSS and server HTML reading.
- Format, lint, typecheck, tests and a production build at this route checkpoint.
- No CMS, providers, deployment, indexing or WebP source conversion in this pass.
