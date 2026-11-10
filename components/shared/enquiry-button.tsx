import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { contact } from "@/content/contact";
import { enquiry } from "@/content/enquiry";
import { enquiryHref } from "@/lib/routes";

/**
 * The firm's general enquiry destination as a plain link. Emails the firm
 * today and switches to the Contact page automatically once that route is in
 * `launchedRoutes`. Style it with `className` for a text link, or use
 * `EnquiryButton` for the arrow button.
 */
export function EnquiryLink({
  children = enquiry.action,
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "children" | "aria-current"> & {
  children?: ReactNode;
}) {
  const href = enquiryHref(contact.email);
  return href.startsWith("mailto:") ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <SiteLink href={href} {...props}>
      {children}
    </SiteLink>
  );
}

/** The enquiry action as the site's arrow button. */
export function EnquiryButton({
  children = enquiry.action,
  className,
  ...props
}: Omit<ComponentProps<typeof ArrowButton>, "asChild">) {
  // Actions mean nothing on paper.
  return (
    <ArrowButton asChild className={cn("print:hidden", className)} {...props}>
      <EnquiryLink>{children}</EnquiryLink>
    </ArrowButton>
  );
}
