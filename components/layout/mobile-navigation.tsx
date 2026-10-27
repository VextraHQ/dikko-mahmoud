"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation } from "@/content/navigation";

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
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  {item.href === "/" ? (
                    <SheetClose asChild>
                      <Link
                        href="/"
                        aria-current="page"
                        className="text-secondary block rounded-full bg-white px-3 py-2 font-serif text-[28px]/9"
                      >
                        Home
                      </Link>
                    </SheetClose>
                  ) : (
                    <PreviewDestination>
                      <button
                        type="button"
                        aria-label={`${item.label} (coming soon)`}
                        className="w-full rounded-full px-3 py-2 text-left font-serif text-[28px]/9 hover:bg-white/10"
                      >
                        {item.label === "Contact" ? "Contact us" : item.label}
                      </button>
                    </PreviewDestination>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <PreviewDestination>
            <Button variant="inverse" size="lg" trailingArrow className="mt-5">
              Make an enquiry <ButtonArrow inverse large />
            </Button>
          </PreviewDestination>
        </SheetContent>
      </Sheet>
    </div>
  );
}
