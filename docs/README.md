# Documentation index

This folder is the durable source of truth for the project. It is intentionally
small so a developer or agent can resume work without relying on chat history.

## Reading order

1. `../AGENTS.md` and the matching `../.claude/rules/` file
2. `roadmap.md` and the relevant `handover-checklist.md` items
3. `client-alignment.md`, then `architecture.md`
4. `workflow.md`
5. `design-system.md`, `layout-system.md`, and the affected `routes/` spec for UI work
6. `forms.md` when composing inputs, validation and field messages
7. `testing.md` when adding helpers, content rules or tests
8. `integrations/` and `environment.md` before connecting any outside service
9. the latest `implementation-log.md` entry (older months are in `archive/`)

## Ownership

| Document                     | Owns                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `roadmap.md`                 | Current milestone, status of each page, open reminders                               |
| `handover-checklist.md`      | Full delivery checklist: built previews, approvals, integration, launch and handover |
| `client-alignment.md`        | Client feedback as implemented, source boundaries and acceptance                     |
| `architecture.md`            | Folder ownership and technical boundaries                                            |
| `workflow.md`                | Change and verification process                                                      |
| `design-system.md`           | Brand roles, type scale, Tailwind/shadcn rules and primitives                        |
| `layout-system.md`           | Width, spacing and responsive composition                                            |
| `forms.md`                   | Form primitives, accessible composition and validation ownership                     |
| `testing.md`                 | Vitest setup, what is and isn't tested, test conventions                             |
| `environment.md`             | Variables, security headers, publication switch, backup/recovery and launch          |
| `integrations/sanity.md`     | Plan: which content moves to Sanity, fields, order of work (not built)               |
| `integrations/email.md`      | Plan: enquiry email delivery, templates, spam checks (not built)                     |
| `routes/home.md`             | Home: Figma references, section map, content gaps                                    |
| `routes/the-firm.md`         | The Firm: implementation, interactions, source gaps and acceptance                   |
| `routes/practice-areas.md`   | Practice hub, menu and detail pages; sources and remaining content                   |
| `routes/people.md`           | People directory, profile popup and page                                             |
| `routes/selected-matters.md` | Matters listing and details, source copy, consent and media gate                     |
| `routes/insights.md`         | Insights listing and articles, CMS contract, reading experience                      |
| `routes/contact.md`          | Contact page and enquiry form: approved spec, states, preview submission             |
| `routes/sme-retainer.md`     | SME retainer page and its two tracks                                                 |
| `routes/legal.md`            | Privacy Policy and Terms of Use: approval rules                                      |
| `routes/system-pages.md`     | 404 and error pages: where each one appears                                          |
| `routes/careers.md`          | Careers: not built; what is needed first                                             |
| `insights-media.md`          | Stock-photo sources, delivery dimensions and image crop review                       |
| `media-review.md`            | Temporary images to replace before WebP conversion                                   |
| `social-sharing.md`          | Social artwork exports, metadata wiring and share-preview checks                     |
| `implementation-log.md`      | Append-only factual implementation history (current month)                           |
| `archive/`                   | Older log months, the previous long agent guide and old kickoff prompts              |

Ownership and licences for the repository itself are in `../LICENSE` and
`../NOTICE.md`.

Code is the source of truth for implemented behavior. Documentation owns
approved intent and current status. Do not document planned work as complete,
and do not describe local verification as production proof.

For another assistant's handoff, start with the roadmap's current checkpoint,
then the architecture ownership map, workflow and affected route brief. Keep
style ownership in architecture/design-system, responsive rules in layout-system
and dated audit evidence in the implementation log. Do not copy a stale log
entry into a new current rule.
