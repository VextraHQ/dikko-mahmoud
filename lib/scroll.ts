import { matchesMedia, mediaQueries } from "@/lib/media-queries";

/**
 * Scroll to an in-page section and move focus there without a second jump.
 * Smooth only for this click (never globally: a global smooth scroll breaks
 * the browser's own scroll restoration on Back). The hash is replaced, not
 * pushed, so Back still leaves the page instead of stepping through sections.
 */
export function scrollToSection(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  const smooth = !matchesMedia(mediaQueries.reducedMotion);
  target.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  history.replaceState(history.state, "", `#${id}`);
  return true;
}

/** Back to the very top of the page, focusing the main heading for keyboards. */
export function scrollToPageTop(headingId: string): void {
  const smooth = !matchesMedia(mediaQueries.reducedMotion);
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
  document.getElementById(headingId)?.focus({ preventScroll: true });
  history.replaceState(history.state, "", location.pathname + location.search);
}
