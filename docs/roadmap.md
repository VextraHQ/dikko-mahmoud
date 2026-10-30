# Roadmap

## Current objective

The homepage is implemented from navigation through footer as a no-index visual
preview. It is now on a client review hold pending visual-identity approval and
approved imagery/content. Preserve its appearance; this is not launch approval.
Prior technical checks and microinteraction/fallback work remain recorded in the
implementation log, with homepage-specific behaviour in `routes/home.md`.

**The Firm (`/the-firm`) is implemented for local visual review.** See
[routes/the-firm.md](routes/the-firm.md) for its current state and remaining gates.
Its desktop year selector and mobile accordion share state; founder/advisory
previews use canonical people, with neutral slots for unconfirmed memberships.
Facts, PersonCard and FAQ are shared while Home retains its visual treatment.
Firm navigation, footer About us and Home story links are active.

The route uses intentional covers/initials pending approved media. The 2021/Today
Journey bodies, milestone media/captions, four FAQ answers, advisory assignments,
source story wording and publication content still require editorial review.
The mobile Figma frame loaded; desktop MCP context hit the Starter-plan limit,
so the supplied desktop screenshots were used. This is not final visual or
publication approval. Stop here for review; other routes/profile pages need a
separately agreed scope. Sanity, providers, deployment and the later Claude
workflow remain outside this checkpoint. User-added Analytics is preserved.

## Status

| Milestone                                   | Status   | Outcome                                                                            |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| 1. Repository foundation                    | Complete | Local Next.js, TypeScript, Tailwind, ESLint, Prettier, docs, and Git foundation    |
| 1a. Temporary holding page                  | Complete | Responsive, no-index interim screen pending approved design work                   |
| 2. Figma audit and homepage brief           | Complete | Frames, brand direction, section map, and provisional content identified           |
| 2a. Fonts, tokens, and shadcn foundations   | Complete | Lean reusable system derived from the supplied design                              |
| 2b. Navigation and hero                     | Review   | Responsive checkpoint with manual fades, text motion and image preparation         |
| 2b.1 Firm facts and story                   | Review   | Responsive sections, shared firm content, placeholders and one-time reveals        |
| 2b.2 Sticky navigation and selected clients | Review   | Route-aware header and accessible placeholder marquee                              |
| 2b.3 Practice-area explorer                 | Review   | Six source areas, desktop index, mobile accordion, photo placeholders              |
| 2b.4 Selected matters                       | Review   | Responsive feature/selector, four sourced summaries, BPE opening selection         |
| 2b.5 Maintainability audit                  | Review   | Style ownership, click-only matters, accessibility fixes and aligned docs          |
| 2b.6 People, client perspectives, insights  | Review   | Compact four-person preview, manual testimonials and one-plus-three articles       |
| 2c. FAQ, enquiry CTA and footer             | Review   | Shared Accordion/Avatar, two CTA surfaces, mobile/desktop overlap and footer       |
| 2c.1 Whole-page presentation QA             | Hold     | Homepage visuals held for client identity/content/imagery review                   |
| 2d. Final publication content               | Waiting  | Approved portraits, testimonial, imagery, and destinations                         |
| 3. Information architecture                 | Scoped   | Firm route, shared ownership and destination activation mapped; other routes later |
| 4. Desktop and mobile design references     | Supplied | User-provided Figma frames; missing states resolved during audit                   |
| 5. Secondary-page implementation            | Review   | The Firm preview implemented; other routes remain separate                         |
| 5a. The Firm                                | Review   | Route, shared reuse and interactions implemented; content/media gates remain       |
| 6. CMS and service integrations             | Later    | Providers connected only when their scope is approved                              |
| 7. Launch readiness                         | Later    | Content, accessibility, SEO, security, and deployment verified                     |

## Foundation completion gate

- [x] App Router scaffold exists without starter marketing UI
- [x] TypeScript strict mode and `@/*` alias are configured
- [x] Tailwind CSS and ESLint are configured
- [x] Prettier and Tailwind utility sorting are configured
- [x] Minimal scalable folders and documentation exist
- [x] Environment and ignore-file baselines exist
- [x] Local Git repository uses the `main` branch
- [x] Dependencies install successfully
- [x] Lint, type checking, and production build pass
- [x] GitHub remote configured; no CMS or application service is connected

## Temporary holding page boundary

The root route may present a restrained development notice before design work
begins. It is temporary, contains no CMS or business logic, and must not be used
as the source of truth for the future visual system. It remains `noindex` while
the full website is unfinished.

The homepage is now on visual review hold. The Firm presentation is implemented for review within its
approved scope. Other routes, CMS, provider connections and
deployment remain separate milestones.
