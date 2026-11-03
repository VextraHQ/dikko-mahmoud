---
paths:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# Components and routes

- Components are markup: props in, JSX out. Move effects, observers,
  `matchMedia`, listeners and timers into `hooks/`, and pure functions into
  `lib/`.
- Keep pages and layouts as Server Components. Add `"use client"` only where
  interactivity needs it, as low in the tree as possible.
- Name full section entry files `*-section.tsx`; supporting components keep
  descriptive names.
- Internal links use `routes.*` and render through `SiteLink`
  (`components/layout/site-link.tsx`). Never hand-type paths or wrap a page
  link in `PreviewDestination`. External profiles (social icons) keep
  `PreviewDestination`.
- Every page exports `createPageMetadata({ title, description, path })`.
  `siteConfig.indexable` (`content/site.ts`) is the single no-index switch.
- Use `formatIndex`/`formatCount` for "01"-style numbers.
- Reuse shared pieces before adding new ones: `PersonCard`, `EmptyState`,
  `EnquiryLink`/`EnquiryButton`, `ArrowButton`, `Eyebrow`, the `components/ui`
  primitives (shadcn-style), and the form foundation in `docs/forms.md`.

# Styling and motion

- Tailwind classes in the component for layout, responsive states and simple
  transitions. Tailwind defaults first; custom tokens only for brand needs.
- `app/globals.css` owns theme and global defaults and imports
  `app/styles/motion.css` and `surfaces.css`. No CSS modules or per-section
  stylesheets.
- Hover feedback stays in CSS. Use the `ease-editorial` class for the site
  easing curve.
- Runtime motion is approved only for Firm Journey content swaps and the
  homepage hero autoplay (`useCarouselAutoplay`; keep its pause rules).
- Selected matters change on click, tap or keyboard only, never on hover.
- Missing or failed media falls back to intentional typography or brand
  covers, never a stock image or someone else's photo.
