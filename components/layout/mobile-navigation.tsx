"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useMediaQueryChange } from "@/hooks/use-media-query-change";
import { mediaQueries } from "@/lib/media-queries";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { Button } from "@/components/ui/button";
import { ArrowButton } from "@/components/ui/arrow-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteNavigation } from "@/components/layout/site-navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  // The sheet has no desktop layout; close it if the window grows past it.
  useMediaQueryChange(mediaQueries.desktopNavigation, (isDesktop) => {
    if (isDesktop) setOpen(false);
  });
  return (
    <div className="xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="glass"
            size="icon"
            aria-label="Open navigation menu"
            className="bg-secondary/80 hover:bg-secondary"
          >
            <Menu className="size-6!" strokeWidth={1.5} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Explore Dikko &amp; Mahmoud. Secondary pages are coming soon.
          </SheetDescription>
          <div className="mb-4 flex h-15 items-center justify-between">
            <BrandLogo onClick={() => setOpen(false)} />
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation menu"
              >
                <X strokeWidth={1.5} />
              </Button>
            </SheetClose>
          </div>
          <SiteNavigation mobile onNavigate={() => setOpen(false)} />
          <PreviewDestination>
            <ArrowButton variant="inverse" size="lg" className="mt-5">
              Make an enquiry
            </ArrowButton>
          </PreviewDestination>
        </SheetContent>
      </Sheet>
    </div>
  );
}
