import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { isRouteAvailable } from "@/lib/routes";

/**
 * An underline that draws in from the left on hover or keyboard focus, for
 * navigation-style links (footer, contact actions). Put `group/underline` on
 * the link and this class on a span around its text, so the line sits under
 * the words rather than at the bottom of the tap area. Links inside running
 * text keep an ordinary, always-visible underline.
 */
export const drawnUnderlineClass =
  "box-decoration-clone bg-linear-to-r from-current to-current bg-no-repeat bg-position-[0_100%] bg-size-[0%_1px] group-hover/underline:bg-size-[100%_1px] group-focus-visible/underline:bg-size-[100%_1px] motion-safe:transition-[background-size] motion-safe:duration-300 motion-safe:ease-editorial";

type SiteLinkProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  href: string;
  children: ReactNode;
  /** Overrides the route registry; prefer adding the page to `launchedRoutes`. */
  available?: boolean;
  /** Next.js scroll behaviour for real links only (e.g. profile overlays). */
  scroll?: boolean;
  /**
   * Load the page as a full document instead of a client navigation, so an
   * intercepting route (the profile popup) is skipped. Use sparingly.
   */
  fullPageLoad?: boolean;
  /** Runs only when a real page link is followed (e.g. close a menu). */
  onNavigate?: () => void;
  "aria-current"?: "page";
};

/**
 * Internal link that knows whether its page is live. Live pages render a
 * Next.js `Link`; unbuilt pages render a button that opens the "page being
 * prepared" notice. Wrap it in a button component with `asChild` to style it,
 * e.g. `<ArrowButton asChild><SiteLink href={routes.people}>…</SiteLink></ArrowButton>`.
 */
export function SiteLink({
  href,
  available = isRouteAvailable(href),
  onNavigate,
  scroll,
  fullPageLoad = false,
  children,
  ...props
}: SiteLinkProps) {
  if (available && fullPageLoad) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  if (available) {
    return (
      <Link href={href} onNavigate={onNavigate} scroll={scroll} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <PreviewDestination>
      <button type="button" {...props} aria-current={undefined}>
        {children}
        <span className="sr-only"> (coming soon)</span>
      </button>
    </PreviewDestination>
  );
}
