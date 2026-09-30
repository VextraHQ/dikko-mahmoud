# Roadmap

## Current objective

Establish a clean local repository that is ready for later Dikko & Mahmoud
website development without prematurely implementing product, content, design,
CMS, or provider decisions.

## Status

| Milestone                          | Status   | Outcome                                                                         |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------- |
| 1. Repository foundation           | Complete | Local Next.js, TypeScript, Tailwind, ESLint, Prettier, docs, and Git foundation |
| 1a. Temporary holding page         | Complete | Responsive, no-index interim screen pending approved design work                |
| 2. Discovery and content inventory | Planned  | Approved legacy-content audit and stakeholder requirements                      |
| 3. Information architecture        | Planned  | Approved routes, content ownership, and CMS boundary                            |
| 4. Wireframe and design direction  | Planned  | Responsive page structure agreed before implementation                          |
| 5. Website implementation          | Later    | Pages and components built from approved direction                              |
| 6. CMS and service integrations    | Later    | Providers connected only when their scope is approved                           |
| 7. Launch readiness                | Later    | Content, accessibility, SEO, security, and deployment verified                  |

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
- [x] No remote or external service is connected

## Temporary holding page boundary

The root route may present a restrained development notice before design work
begins. It is temporary, contains no CMS or business logic, and must not be used
as the source of truth for the future visual system. It remains `noindex` while
the full website is unfinished.

Future milestones require explicit approval. This roadmap is not authorization
to begin them.
