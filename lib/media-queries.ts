// Shared media queries. Keep in step with Tailwind's `lg` (64rem) and `xl`
// (80rem) breakpoints used in component classes.
export const mediaQueries = {
  desktop: "(min-width: 64rem)",
  desktopNavigation: "(min-width: 80rem)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/** One-off read for event handlers; use `useMediaQuery` while rendering. */
export function matchesMedia(query: string) {
  return window.matchMedia(query).matches;
}
