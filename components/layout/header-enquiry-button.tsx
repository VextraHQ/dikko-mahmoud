"use client";

import { useSitePathname } from "@/hooks/use-site-pathname";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { headerTone } from "@/lib/navigation";
import { routes } from "@/lib/routes";

// Picks a real button variant per header tone, so hover/active colours come
// from the variant instead of being overridden for the white header.
export function HeaderEnquiryButton() {
  const tone = headerTone(useSitePathname());
  return (
    <ArrowButton asChild variant={tone === "light" ? "default" : "inverse"}>
      <SiteLink href={routes.contact}>Make an enquiry</SiteLink>
    </ArrowButton>
  );
}
