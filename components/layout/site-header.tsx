import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { StickyHeader } from "@/components/layout/sticky-header";
import { ArrowButton } from "@/components/ui/arrow-button";

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="flex h-18 items-center justify-between gap-3 xl:gap-6">
        <BrandLogo className="h-15 w-45 xl:h-18 xl:w-48" />
        <div className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          <SiteNavigation />
          <PreviewDestination>
            <ArrowButton variant="inverse">Make an enquiry</ArrowButton>
          </PreviewDestination>
        </div>
        <MobileNavigation />
      </div>
    </StickyHeader>
  );
}
