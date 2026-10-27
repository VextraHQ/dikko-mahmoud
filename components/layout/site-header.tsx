import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { PreviewDestination } from "@/components/layout/preview-destination";
import { Button, ButtonArrow } from "@/components/ui/button";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="bg-primary relative z-20 py-2 text-white xl:absolute xl:inset-x-0 xl:top-10 xl:bg-transparent xl:py-0">
      <div className="mx-auto flex h-20 w-full max-w-360 items-center justify-between gap-6 px-4 sm:px-8 xl:px-20">
        <BrandLogo />
        <div className="hidden items-center gap-6 xl:flex 2xl:gap-12">
          <nav
            aria-label="Main navigation"
            className="rounded-full border border-white/18 bg-white/12 p-1 shadow-lg backdrop-blur-md"
          >
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  {item.href === "/" ? (
                    <Link
                      href="/"
                      aria-current="page"
                      className="text-secondary flex h-10 items-center rounded-full bg-white px-3 text-sm font-semibold"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <PreviewDestination>
                      <button
                        type="button"
                        aria-label={`${item.label} (coming soon)`}
                        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors hover:bg-white/12"
                      >
                        {item.label}
                        {item.label === "Practice areas" && (
                          <ChevronDown
                            aria-hidden="true"
                            className="size-5"
                            strokeWidth={1.5}
                          />
                        )}
                      </button>
                    </PreviewDestination>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <PreviewDestination>
            <Button variant="inverse" trailingArrow>
              Make an enquiry <ButtonArrow inverse />
            </Button>
          </PreviewDestination>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}
