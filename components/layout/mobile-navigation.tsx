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

const offices = contact.offices;

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
          <div className="mb-6 flex h-15 items-center justify-between">
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
            className="mt-8 mb-10 self-start"
          >
            <SiteLink href={routes.contact} onNavigate={() => setOpen(false)}>
              Make an enquiry
            </SiteLink>
          </ArrowButton>
          {/* Pinned to the bottom of the sheet: offices with a faint monogram. */}
          <footer className="relative mt-auto overflow-hidden border-t border-white/10 pt-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 font-serif text-[4.5rem]/none text-white/[0.03] select-none"
            >
              {firmBrand.initials}
            </span>
            <p className="text-[11px]/4 font-semibold tracking-[0.18em] text-sky-200 uppercase">
              {mobileMenuFooter.eyebrow}
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-serif text-xl/8 text-white/85">
              {offices.map((office, index) => (
                <li key={office.city} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-sky-300/70"
                    />
                  )}
                  {office.city}
                </li>
              ))}
            </ul>
          </footer>
        </SheetContent>
      </Sheet>
    </div>
  );
}
