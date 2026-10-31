import { ArrowUpRight } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { SiteLink } from "@/components/layout/site-link";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  practiceCatalogue,
  practiceCopy as copy,
} from "@/content/practice-catalogue";
import { routes } from "@/lib/routes";
import { formatIndex } from "@/lib/format";

export function PracticeMenuPanel({
  onNavigate,
  pathname,
}: {
  onNavigate: () => void;
  /** Highlights the practice page the visitor is already on. */
  pathname: string;
}) {
  return (
    <div className="grid gap-10 p-8 lg:grid-cols-[.8fr_2fr] lg:gap-12">
      <div className="flex flex-col items-start">
        <Eyebrow>{copy.menuEyebrow}</Eyebrow>
        <p className="mt-6 font-serif text-4xl/10">
          {copy.menuHeading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="text-muted-foreground mt-6 text-base/7">
          {copy.menuDescription}
        </p>
        <NavigationMenuLink asChild>
          <ArrowButton asChild className="mt-8 lg:mt-auto">
            <SiteLink href={routes.practiceAreas} onNavigate={onNavigate}>
              {copy.menuAction}
            </SiteLink>
          </ArrowButton>
        </NavigationMenuLink>
      </div>
      <ul className="grid grid-flow-col grid-rows-5 gap-x-6 gap-y-2">
        {practiceCatalogue.map((practice, index) => (
          <li key={practice.slug} className="min-w-0">
            {/* `active` makes Radix set aria-current="page" on the link. */}
            <NavigationMenuLink
              asChild
              active={pathname === routes.practiceArea(practice.slug)}
            >
              <SiteLink
                href={routes.practiceArea(practice.slug)}
                onNavigate={onNavigate}
                // Border and tint fade in together; the current page keeps them.
                className="group/practice-link ease-editorial focus-visible:border-primary aria-[current=page]:border-primary/40 flex h-full min-h-16 items-center gap-3 rounded-xl border border-transparent px-4 py-4 text-base/6 transition-[background-color,border-color] duration-300 hover:border-sky-200 hover:bg-sky-50/70 focus-visible:bg-sky-50 aria-[current=page]:bg-sky-50 motion-reduce:transition-none"
              >
                <span className="text-muted-foreground group-aria-[current=page]/practice-link:text-primary shrink-0 text-xs/6">
                  {formatIndex(index)}
                </span>
                <span className="min-w-0 flex-1">{practice.title}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-primary size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/practice-link:translate-x-0.5 motion-safe:group-hover/practice-link:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </SiteLink>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
