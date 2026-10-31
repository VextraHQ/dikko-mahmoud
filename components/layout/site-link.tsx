import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { isRouteAvailable } from "@/lib/routes";

type SiteLinkProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  href: string;
  children: ReactNode;
  /** Overrides the route registry, e.g. a person whose profile is ready. */
  available?: boolean;
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
  children,
  ...props
}: SiteLinkProps) {
  if (available) {
    return (
      <Link href={href} onClick={onNavigate} {...props}>
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
