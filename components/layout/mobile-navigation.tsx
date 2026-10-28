"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 80rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <div className="xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation menu">
            <Menu className="size-6!" strokeWidth={1.5} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Explore Dikko &amp; Mahmoud. Secondary pages are coming soon.
          </SheetDescription>
          <div className="mb-4 flex h-15 items-center justify-between">
            <BrandLogo />
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
