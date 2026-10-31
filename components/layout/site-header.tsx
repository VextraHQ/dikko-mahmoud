import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { StickyHeader } from "@/components/layout/sticky-header";
import { ArrowButton } from "@/components/ui/arrow-button";
import { SiteLink } from "@/components/layout/site-link";
import { routes } from "@/lib/routes";

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="flex h-18 items-center justify-between gap-3 xl:gap-6">
        <BrandLogo className="h-15 w-45 xl:h-18 xl:w-48" />
        <div className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          <SiteNavigation />
          <ArrowButton asChild variant="inverse">
            <SiteLink href={routes.contact}>Make an enquiry</SiteLink>
          </ArrowButton>
        </div>
        <MobileNavigation />
      </div>
    </StickyHeader>
  );
}
