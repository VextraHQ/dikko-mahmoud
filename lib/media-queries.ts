// Shared media queries. `desktop` matches Tailwind's `lg` (64rem). The full
// eight-item navigation needs 90rem; component classes use the matching
// `min-[90rem]:` variant (no global breakpoint) for header visibility/resets.
export const mediaQueries = {
  desktop: "(min-width: 64rem)",
  desktopNavigation: "(min-width: 90rem)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/** One-off read for event handlers; use `useMediaQuery` while rendering. */
export function matchesMedia(query: string) {
  return window.matchMedia(query).matches;
}
