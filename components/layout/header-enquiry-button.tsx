"use client";

import { useHeaderAction } from "@/hooks/use-header-action";
import { useHeaderTone } from "@/hooks/use-header-tone";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";

// Picks a real button variant from the header's live tone, so hover/active
// colours come from the variant and the button stays filled on both tones.
export function HeaderEnquiryButton() {
  const tone = useHeaderTone();
  const action = useHeaderAction();
  return (
    <ArrowButton
      asChild
      variant={tone === "light" ? "default" : "inverse"}
      className="duration-400 **:data-[slot=button-arrow]:transition-colors **:data-[slot=button-arrow]:duration-400"
    >
      <SiteLink href={action.href}>{action.label}</SiteLink>
    </ArrowButton>
  );
}
