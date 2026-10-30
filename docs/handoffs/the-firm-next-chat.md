# New-chat prompt: The Firm

Historical kickoff prompt. The route is now implemented for visual review;
read the current status and remaining gates in `../routes/the-firm.md` before
using this prompt. Do not rebuild the route from scratch.

Copy the prompt below into a new chat attached to this repository, then add the
Firm desktop/mobile Figma links. The route spec contains the local screenshots
and agreed behaviour; there is no need to paste the previous conversation.

```text
Continue Dikko & Mahmoud in /Users/nabeelhassan/Desktop/dikko-mahmoud.

Implement /the-firm from the Firm Figma references I supply with this prompt.
The approved scope is docs/routes/the-firm.md. The homepage is on visual review
hold pending client identity/content/imagery approval: preserve its appearance.
Mechanical reuse extractions and activating its real Firm links are permitted.

Start with README.md, AGENTS.md, docs/README.md, docs/roadmap.md,
docs/architecture.md, docs/design-system.md, docs/layout-system.md and
docs/routes/the-firm.md. Inspect git status/diff and preserve unrelated work.
Read relevant installed Next.js guides before framework edits. Read only the
homepage brief portions needed for shared pieces and the latest log entries
when checking earlier verification; do not reread the entire chat/log history.

Retrieve focused desktop/mobile design context, states, copy and assets with
the Figma skill. Exact Firm node links are supplied here, not inferred from Home.
Local screenshot paths are indexed in the spec. If a focused tool request is
blocked, use those references, record the gap once, and continue independent work.
Never inspect my live screen/apps. Do not invent historical facts, people/group
assignments, biographies, contact details, imagery or provider/video URLs.

Confirmed decisions:
- Journey: Select a year on desktop + mobile accordion; 1993 initially selected.
  Desktop keeps one selection; mobile can close it. Year rows/arrows share state,
  arrows stop at the ends. No autoplay, hover selection or scroll-driven timeline.
- People: founder feature + visible advisory groups; shared PersonCard and one
  canonical people collection. Groups reference IDs; repeated screenshot faces
  are placeholders, not actual assignments. Use compact two-column mobile cards.
  Prepare profile slugs, but do not build /people/[slug] in this checkpoint.
- Hero: adapt iProduce's VideoPoster behaviour. No video means no play button;
  a supplied video is loaded only on activation. Keep intentional media fallbacks.
- Reuse facts with a pale Firm surface, FAQ with Firm-specific intro/items,
  existing page-owned EnquiryCta and the single layout-owned footer.
- When /the-firm exists, enable its desktop/mobile nav, footer and Home story
  links; preserve active state/menu closing. Keep notices for other unbuilt pages.

Keep sections/content separate, Server Components by default, Tailwind beside
components, shadcn primitives and Lucide UI icons; React Icons stays for socials.
No new registry/theme research, generic section engine, CSS modules, speculative
packages, CMS/email/database/deployment integration or unrelated homepage polish.
The form primitives are already prepared; this task does not add an enquiry form.
Preserve user-added Analytics and no-index metadata.

Work in the spec's short implementation slices and batch independent reads.
Use the dev server and targeted formatting; batch lint/typecheck at completed
slices and build once at the route/shared-component handoff. Review 1440,
1280/1024, 768, 390 and 320px plus keyboard, reduced motion, no-JS and fallbacks.
Regression-check Home after shared extractions. Reuse existing dependencies.
Ask only for genuinely missing decisions; do not reopen the confirmed options.
Keep progress updates concise. Stop at the completed Firm visual checkpoint,
update the canonical docs/log and report only checks actually run.

Figma desktop: [paste exact Firm frame link]
Figma mobile: [paste exact Firm frame link]
```
