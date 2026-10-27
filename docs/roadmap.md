# Roadmap

## Current objective

Translate the supplied desktop/mobile design into a lean Tailwind/shadcn
foundation, then develop the homepage from navigation and hero through footer.
The first runtime checkpoint includes all five original hero photographs.
The approved follow-up refactor now separates shared site chrome, simplifies
the manual carousel and improves responsive sizing. Continue with the footer
and remaining homepage sections after reviewing each focused Figma source.
The approved hero polish now adds restrained crossfades and text motion while
keeping autoplay deferred. Secondary pages follow the homepage.

The user has selected firm-at-a-glance and firm-story as the next slice, with
the enquiry callout/footer following it. The next-slice plan is recorded in
`routes/home.md`. Facts and story are now implemented for review with explicit
image placeholders; the user will supply missing originals.

## Status

| Milestone                                 | Status   | Outcome                                                                         |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| 1. Repository foundation                  | Complete | Local Next.js, TypeScript, Tailwind, ESLint, Prettier, docs, and Git foundation |
| 1a. Temporary holding page                | Complete | Responsive, no-index interim screen pending approved design work                |
| 2. Figma audit and homepage brief         | Complete | Frames, brand direction, section map, and provisional content identified        |
| 2a. Fonts, tokens, and shadcn foundations | Complete | Lean reusable system derived from the supplied design                           |
| 2b. Navigation and hero                   | Review   | Responsive checkpoint with manual fades, text motion and image preparation      |
| 2b.1 Firm facts and story                 | Review   | Responsive sections, shared firm content, placeholders and one-time reveals     |
| 2c. Footer, remaining homepage and QA     | Next     | Next homepage slice; retrieve focused Figma context first                       |
| 2d. Final publication content             | Open     | Approved portraits, testimonial, imagery, and destinations                      |
| 3. Information architecture               | Planned  | Approved routes, content ownership, and CMS boundary                            |
| 4. Desktop and mobile design references   | Supplied | User-provided Figma frames; missing states resolved during audit                |
| 5. Secondary-page implementation          | Later    | Reuse the homepage system after the main milestone                              |
| 6. CMS and service integrations           | Later    | Providers connected only when their scope is approved                           |
| 7. Launch readiness                       | Later    | Content, accessibility, SEO, security, and deployment verified                  |

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

Homepage presentation work is now in scope. CMS, provider connections,
deployment, and secondary-page development remain separate milestones.
