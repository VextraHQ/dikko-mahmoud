# Sanity content plan

**Status: planned. Sanity is not installed or connected.** This is the plan to
approve before any schema or client code is written. `sanity/README.md`
reserves the folder; `types/` holds the content types Sanity will fill.

## The one rule

Website presentation components never talk directly to Sanity. The Studio
and its schemas will use Sanity APIs. Each kind of content has one
server-side file that returns the same shapes the site uses today. Swapping
local files for Sanity changes that file and nothing above it.

Insights already works this way: `lib/insights/repository.ts` reads local
records today and returns the types in `types/insights.ts`. Every other kind of
content follows the same pattern when it moves.

## What moves and what stays

| Content             | Today                                                | In Sanity                       | Read through                       |
| ------------------- | ---------------------------------------------------- | ------------------------------- | ---------------------------------- |
| Insights articles   | `content/insight-articles.ts`, `insight-bodies.ts`   | `insight` document              | `lib/insights/repository.ts`       |
| People              | `content/people.ts`                                  | `person` document               | `lib/people/roster.ts`             |
| Profiles            | `content/profiles.ts`                                | Fields on `person`              | `lib/people/profiles.ts`           |
| Selected matters    | `content/matters.ts`, `matter-manifest.ts`           | `matter` document               | `lib/experience.ts`                |
| Selected clients    | `content/clients.ts`                                 | `client` document               | New file when it moves             |
| Practice areas      | `content/practice-index.ts`, `practice-catalogue.ts` | `practice` document             | New `lib/practices/` when it moves |
| FAQs                | `content/faqs.ts`, `practice-faqs.ts`                | `faq` document, grouped by page | New file when it moves             |
| Privacy and Terms   | `content/legal.ts`                                   | `legalDocument` document        | New file when it moves             |
| Offices and contact | `content/contact.ts`                                 | `siteSettings` (one document)   | New file when it moves             |

The full integration scope also includes:

- A Home singleton for featured people, Insights and practices, using ordered
  references rather than copied text. Include approved page media and editorial
  sections in named groups after the field inventory.
- Site settings for contact details, footer content and social destinations.
  Office data is part of this singleton.
- Confirmed office references on people, alongside position and practice
  references. The proposal includes office and position filtering; today's
  directory has role/practice filters but no office filter or confirmed office
  assignments. Finish that contract item when the roster is supplied.
- Optional document attachments on Insights, as included in the proposal.
  Today's article types and renderer do not expose downloads. Add the file
  contract and accessible download presentation during this integration, with
  no empty download control on articles without a file.
- Careers introduction and CMS-managed vacancies, including closing a role and
  its application email or external link. Implementation is deferred until the
  client answers the recruitment questions; the user confirms a design exists.
- SME retainer content and Terms, with the firm's scope acknowledgement
  tracked separately. Include approved firm-page copy/media
  and the requested Awards records once their fields/content are agreed.

Stays in code, on purpose:

- Component layout, control behaviour and stable interface labels. Inventory
  editorial headings and body copy separately; footer content and social links
  promised to editors belong in site settings. Final legal/form notices need
  firm approval and controlled editing.
- Routes, the launch list and navigation (`lib/routes.ts`).
- Every rule: who may be listed, what may publish, search and filters (`lib/`).

## Fields

Start from the TypeScript types that exist; they are the contract.

| Document        | Fields (from today's types)                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `insight`       | `InsightSource` in `types/insights.ts`, plus the body blocks and references                            |
| `person`        | `Person` (`content/people.ts`) and `PersonProfile` (`content/profiles.ts`), including `links[]`        |
| `matter`        | `SelectedMatter` (`content/matters.ts`)                                                                |
| `practice`      | `PracticeSummary` (`content/practice-index.ts`) and `PracticeDetail` (`content/practice-catalogue.ts`) |
| `faq`           | `Faq` (`content/faqs.ts`) plus the page it belongs to                                                  |
| `legalDocument` | `LegalDocument` (`content/legal.ts`)                                                                   |

Rules for every schema:

- **Publication status is its own field** (`pending`, `approved`, `withheld`),
  not Sanity's draft/published state. The firm approves content; publishing a
  document in the Studio must not make it public by itself. `lib/publication.ts`
  keeps deciding what renders.
- **References, not copied text.** An article's authors and practices are
  references to `person` and `practice`, as `authorIds` and `practiceIds` are
  today.
- **Images carry alt text, credit, crop and hotspot.** Alt text is required in
  the Studio. `InsightImage` already has these fields.
- **Slugs are permanent** once a page is public. Changing one needs a redirect.

## Order of work

1. Insights. The contract, types and tests exist (`docs/routes/insights.md`).
2. People and profiles.
3. Matters and clients.
4. Practice areas.
5. FAQs, legal documents, offices, homepage featuring and site settings.
6. The agreed SME/firm-page content and Awards once the supplied records are
   approved. Careers stays deferred pending the client response.

Each step: inventory the fields, review the editing workflow, write the schema
and adapter, then check the existing public behaviour with fixtures and approved
firm content. Verify references, URL stability and approval filtering before
retiring local records. Never treat demo articles as approved migration content.

## How fresh content reaches the site

- Preserve static pages and existing server-filtered archives according to
  their current behaviour. Define cache tags and webhook revalidation during
  the technical plan; filtered archives do not become static automatically.
- Editors use authenticated preview/draft mode. Draft reads and privileged
  tokens stay server-side; the public site reads approved published content.
- If Sanity cannot be reached, the page shows the error state. It never falls
  back to demo records.

## Decisions to make before starting

1. Which designated firm staff edit and approve content, and what roles they
   need. Firm editing access, one training session and an editing guide are
   included in the proposal.
2. Where the Studio lives: inside this site at `/studio`, or a separate address.
3. Which plan and dataset names (`production`, plus one for review).
4. Whether the demo Insights articles are deleted or replaced one for one.

## Variables it will need

`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
`SANITY_API_READ_TOKEN`, and `SANITY_REVALIDATE_SECRET` (server only).
These names are planned, not connected. See `docs/environment.md`.

## Done means

- Public presentation components use the content adapters. Sanity imports stay
  in the server integration and Studio boundaries.
- Existing tests pass against the Sanity adapter with fixture data.
- Unapproved content cannot render on an indexable site.
- An editor can add an article, preview it and publish it without a developer.

## Studio experience to agree before implementation

Inspected reference files in `/Users/nabeelhassan/Desktop/iproduce-africa`:
`sanity/structure.ts`, `sanity.config.ts`, `sanity/templates.ts`,
`sanity/schemaTypes/documents/home-page.ts` and
`sanity/schemaTypes/objects/image-with-alt.ts`.

Carry forward these patterns, adapted to the firm:

- A task-oriented navigation tree with Pages, Insights, People, Practices,
  Matters/Clients, FAQs and Settings. Reserve Careers as deferred work.
- One document per fixed page/settings entry. Avoid duplicate Home or settings
  documents and hide generic creation options for those types.
- Group page fields by the visible sections. Show editor-facing titles,
  descriptions and previews instead of internal schema names.
- Scope FAQs by page and offer creation templates with that page prefilled.
- Use references for authors, practices and Home features. Explain why pending
  or withheld records will not show publicly, and validate missing references.
- Show image crop guidance beside the field. Retain originals, alt text, credits
  and hotspot/crop values; preview the important desktop/mobile crops.
- Keep layout and interaction fixed in code. Editors change the agreed content
  slots, without an unrestricted page builder.
- Review an editor walkthrough before expanding the schema: add an article,
  assign its author/practice, preview it, approve it, feature it on Home and
  update its image. Also exercise empty lists and missing optional content.

These are proposed editing patterns. The formal technical plan will settle
schema boundaries, permissions, preview and revalidation details.

## Accounts and handover

Hosting, Sanity and other production service accounts belong to the firm, with
Vextra added as a technical collaborator. Confirm plan costs before activating a
paid service. Include account ownership, purpose and billing responsibility in
handover, alongside editor training and the written content-editing guide.

Agree dataset/asset backup ownership and retention, then test an isolated
restore before launch. See the backup and recovery plan in
[`environment.md`](../environment.md).
