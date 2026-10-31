"use client";

import { usePathname } from "next/navigation";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { headerTone } from "@/lib/navigation";
import { routes } from "@/lib/routes";

// Picks a real button variant per header tone, so hover/active colours come
// from the variant instead of being overridden for the white header.
export function HeaderEnquiryButton() {
  const tone = headerTone(usePathname());
  return (
    <ArrowButton asChild variant={tone === "light" ? "default" : "inverse"}>
      <SiteLink href={routes.contact}>Make an enquiry</SiteLink>
    </ArrowButton>
  );
}
