import type { ComponentProps } from "react";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { practiceCopy as copy } from "@/content/practice-index";
import { contact } from "@/content/contact";
import { enquiryHref } from "@/lib/routes";

/** One label and one destination for every enquiry on a practice page. */
export function EnquiryButton(
  props: Omit<ComponentProps<typeof ArrowButton>, "asChild" | "children">,
) {
  const href = enquiryHref(contact.email);
  return (
    <ArrowButton asChild {...props}>
      {href.startsWith("mailto:") ? (
        <a href={href}>{copy.enquiryAction}</a>
      ) : (
        <SiteLink href={href}>{copy.enquiryAction}</SiteLink>
      )}
    </ArrowButton>
  );
}
