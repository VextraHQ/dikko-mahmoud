# Documentation index

This folder is the durable source of truth for the project. It is intentionally
small so a developer or agent can resume work without relying on chat history.

## Reading order

1. `../AGENTS.md` and the matching `../.claude/rules/` file
2. `roadmap.md`
3. `client-alignment.md`, then `architecture.md`
4. `workflow.md`
5. `design-system.md`, `layout-system.md`, and the affected `routes/` brief for UI work
   (`routes/practice-areas.md` for the active Practice areas checkpoint)
6. `forms.md` when composing inputs, validation and field messages
7. `testing.md` when adding helpers, content rules or tests
8. the latest `implementation-log.md` entry (older months are in `archive/`)

## Ownership

| Document                                | Owns                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------- |
| `client-alignment.md`                   | Current client-feedback implementation, source boundaries and acceptance   |
| `scope-addendum.md`                     | Draft nine-practice, SME and Terms inclusions at unchanged fee             |
| `roadmap.md`                            | Current milestone and future work gates                                    |
| `architecture.md`                       | Folder ownership and technical boundaries                                  |
| `workflow.md`                           | Change and verification process                                            |
| `design-system.md`                      | Brand roles, Tailwind/shadcn rules, and primitives                         |
| `layout-system.md`                      | Width, spacing, and responsive composition                                 |
| `routes/home.md`                        | Figma references, section map, content gaps, and build order               |
| `routes/the-firm.md`                    | Firm implementation, interactions, reuse, source gaps and acceptance       |
| `routes/people.md`                      | Editorial directory, profile-popup/page and eight-item navigation spec     |
| `routes/selected-matters.md`            | Approved listing/details, source copy, preview consent and media gate      |
| `routes/insights.md`                    | Implemented listing/articles, CMS contract, reading UX and edge cases      |
| `routes/contact.md`                     | Proposed Contact layout, six-field enquiry form, states and open decisions |
| `insights-media.md`                     | Stock-photo sources, delivery dimensions and image crop review             |
| `routes/practice-areas.md`              | Practice hub/menu/detail implementation, sources and remaining content     |
| `handoffs/people-profiles-next-chat.md` | Executable Claude prompt for the bounded profile/navigation slice          |
| `handoffs/insights-next-chat.md`        | Original Insights implementation brief, retained as a review checklist     |
| `handoffs/the-firm-next-chat.md`        | Historical scoped Firm kickoff prompt                                      |
| `forms.md`                              | Form primitives, accessible composition and validation ownership           |
| `testing.md`                            | Vitest setup, what is and isn't tested, test conventions                   |
| `media-review.md`                       | Replace temporary images before WebP conversion                            |
| `social-sharing.md`                     | Social artwork exports, metadata wiring and share-preview verification     |
| `implementation-log.md`                 | Append-only factual implementation history (current month)                 |
| `archive/`                              | Older log months and the previous long agent guide                         |

Code is the source of truth for implemented behavior. Documentation owns
approved intent and current status. Do not document planned work as complete,
and do not describe local verification as production proof.

For another assistant's handoff, start with the roadmap's current checkpoint,
then the architecture ownership map, workflow and affected route brief. Keep
style ownership in architecture/design-system, responsive rules in layout-system
and dated audit evidence in the implementation log. Do not copy a stale log
entry into a new current rule.
