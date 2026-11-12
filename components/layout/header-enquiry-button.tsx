"use client";

import { useHeaderTone } from "@/hooks/use-header-tone";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { routes } from "@/lib/routes";

// Picks a real button variant from the header's live tone, so hover/active
// colours come from the variant and the button stays filled on both tones.
export function HeaderEnquiryButton() {
  const tone = useHeaderTone();
  return (
    <ArrowButton
      asChild
      variant={tone === "light" ? "default" : "inverse"}
      className="duration-400 [&_[data-slot=button-arrow]]:transition-colors [&_[data-slot=button-arrow]]:duration-400"
    >
      <SiteLink href={routes.contact}>Make an enquiry</SiteLink>
    </ArrowButton>
  );
}
