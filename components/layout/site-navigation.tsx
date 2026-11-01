"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { SiteLink } from "@/components/layout/site-link";
import { PracticeMenuPanel } from "@/components/layout/practice-menu-panel";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { usePracticeMenu } from "@/hooks/use-practice-menu";
import { navigation } from "@/content/navigation";
import {
  practiceIndex as practiceCatalogue,
  practiceCopy,
} from "@/content/practice-index";
import { isActivePath } from "@/lib/navigation";
import { isRouteAvailable, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { formatIndex } from "@/lib/format";

export function SiteNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const menu = usePracticeMenu(onNavigate);
  const isActive = (href: string) =>
    isRouteAvailable(href) && isActivePath(pathname, href);
  // Hover and the open menu share one tint; the active pill keeps its own
  // colours so an open menu never washes it out on either header tone.
  const itemClass = (href: string) =>
    cn(
      "rounded-full",
      "flex h-11 items-center gap-1.5 px-3 text-sm font-semibold transition-colors motion-reduce:transition-none",
      isActive(href)
        ? "bg-white text-secondary group-data-[tone=light]/site-header:bg-primary group-data-[tone=light]/site-header:text-white"
        : "hover:bg-white/12 data-[state=open]:bg-white/12 group-data-[tone=light]/site-header:hover:bg-slate-100 group-data-[tone=light]/site-header:data-[state=open]:bg-slate-100",
    );
  if (mobile) {
    // Full-width serif rows split by hairlines; the current page is sky-tinted
    // rather than a filled pill so it reads calmly on the navy sheet.
    const rowClass =
      "flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left font-serif text-[28px]/9 short:min-h-12 short:py-2 short:text-2xl/8 text-white/85 transition-colors hover:text-white aria-[current=page]:text-sky-200 data-[active=true]:text-sky-200 motion-reduce:transition-none";
    return (
      <nav aria-label="Mobile navigation">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {navigation.map((item) => (
            <li key={item.href}>
              {item.href === routes.practiceAreas ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value="practices" className="border-0">
                    <AccordionTrigger
                      data-active={isActive(item.href) || undefined}
                      className={cn(rowClass, "rounded-none")}
                      indicator={
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="ease-editorial size-6 shrink-0 transition-transform duration-300 group-data-[state=open]/accordion:rotate-180 motion-reduce:transition-none"
                        />
                      }
                    >
                      <span>{item.mobileLabel ?? item.label}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pb-5">
                        <li>
                          <SiteLink
                            href={routes.practiceAreas}
                            onNavigate={onNavigate}
                            aria-current={
                              pathname === routes.practiceAreas
                                ? "page"
                                : undefined
                            }
                            className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-sm font-semibold text-white transition-colors hover:bg-white/8 aria-[current=page]:bg-white/10"
                          >
                            {practiceCopy.menuAction}
                            <ArrowUpRight
                              aria-hidden="true"
                              strokeWidth={1.5}
                              className="size-4 shrink-0"
                            />
                          </SiteLink>
                        </li>
                        {practiceCatalogue.map((practice, index) => (
                          <li key={practice.slug}>
                            <SiteLink
                              href={routes.practiceArea(practice.slug)}
                              onNavigate={onNavigate}
                              aria-current={
                                pathname === routes.practiceArea(practice.slug)
                                  ? "page"
                                  : undefined
                              }
                              className="group/mobile-practice flex min-h-11 items-start gap-3 rounded-lg px-3 py-2.5 text-[15px]/6 text-white/75 transition-colors hover:bg-white/8 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
                            >
                              <span className="w-5 shrink-0 text-xs/6 text-white/40 tabular-nums group-aria-[current=page]/mobile-practice:text-sky-200">
                                {formatIndex(index)}
                              </span>
                              {practice.title}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <SiteLink
                  href={item.href}
                  onNavigate={onNavigate}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={rowClass}
                >
                  {item.mobileLabel ?? item.label}
                </SiteLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  return (
    <NavigationMenu
      aria-label="Main navigation"
      value={menu.value}
      onValueChange={menu.setValue}
      delayDuration={180}
      className="site-navigation-surface relative isolate rounded-full p-1"
    >
      <NavigationMenuList className="flex items-center gap-1">
        {navigation.map((item) => (
          <NavigationMenuItem
            key={item.href}
            value={item.href === routes.practiceAreas ? "practices" : item.href}
          >
            {item.href === routes.practiceAreas ? (
              <>
                <NavigationMenuTrigger
                  data-practice-menu-trigger
                  className={cn(itemClass(item.href), "group/practice-trigger")}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-data-[state=open]/practice-trigger:rotate-180 motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </NavigationMenuTrigger>
                <noscript>
                  <style>{`[data-practice-menu-trigger] { display: none; }`}</style>
                  <SiteLink
                    href={routes.practiceAreas}
                    className={itemClass(routes.practiceAreas)}
                  >
                    Practice areas
                  </SiteLink>
                </noscript>
                <NavigationMenuContent className="fixed top-26 left-1/2 max-h-[calc(100svh-7rem)] w-[min(80rem,calc(100vw-10rem))] -translate-x-1/2 overflow-y-auto">
                  <PracticeMenuPanel
                    onNavigate={menu.navigate}
                    pathname={pathname}
                  />
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <SiteLink
                  href={item.href}
                  onNavigate={menu.navigate}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={itemClass(item.href)}
                >
                  {item.label}
                </SiteLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
