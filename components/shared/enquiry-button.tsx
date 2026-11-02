import type { ComponentProps } from "react";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { contact } from "@/content/contact";
import { enquiry } from "@/content/enquiry";
import { enquiryHref } from "@/lib/routes";

/**
 * The firm's general enquiry action. Emails the firm today and switches to the
 * Contact page automatically once that route is in `launchedRoutes`.
 */
export function EnquiryButton({
  children = enquiry.action,
  ...props
}: Omit<ComponentProps<typeof ArrowButton>, "asChild">) {
  const href = enquiryHref(contact.email);
  return (
    <ArrowButton asChild {...props}>
      {href.startsWith("mailto:") ? (
        <a href={href}>{children}</a>
      ) : (
        <SiteLink href={href}>{children}</SiteLink>
      )}
    </ArrowButton>
  );
}
