"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useMediaQueryChange } from "@/hooks/use-media-query-change";
import { mediaQueries } from "@/lib/media-queries";
import { BrandLogo } from "@/components/layout/brand-logo";
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
import { SiteLink } from "@/components/layout/site-link";
import { routes } from "@/lib/routes";
import { contact } from "@/content/contact";
import { firmBrand } from "@/content/firm";
import { mobileMenuFooter } from "@/content/navigation";

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
        <SheetContent className="flex flex-col">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Explore Dikko &amp; Mahmoud. Secondary pages are coming soon.
          </SheetDescription>
          <div className="short:mb-3 mb-6 flex h-15 items-center justify-between">
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
          <ArrowButton
            asChild
            variant="inverse"
            size="lg"
            className="short:my-6 mt-8 mb-8 self-start"
          >
            <SiteLink href={routes.contact} onNavigate={() => setOpen(false)}>
              Make an enquiry
            </SiteLink>
          </ArrowButton>
          {/* Sticks to the bottom of the sheet so the offices stay visible on
              short phones; links scroll above it. Negative offsets cancel the
              sheet's padding so it sits flush. */}
          <footer className="bg-navy-deep sticky -bottom-6 -mx-4 mt-auto shrink-0 overflow-hidden border-t border-white/10 px-4 pt-5 pb-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 font-serif text-[4.5rem]/none text-white/[0.03] select-none"
            >
              {firmBrand.initials}
            </span>
            <p className="text-[11px]/4 font-semibold tracking-[0.18em] text-sky-200 uppercase">
              {mobileMenuFooter.eyebrow}
            </p>
            <p className="short:mt-2 short:text-lg/7 mt-3 max-w-sm font-serif text-xl/8 text-white/85">
              {contact.officeSummary}
            </p>
          </footer>
        </SheetContent>
      </Sheet>
    </div>
  );
}
