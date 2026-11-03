import { isRouteAvailable, routes } from "@/lib/routes";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

type HeaderTone = "light" | "dark";

// Pages on a pale or white background, which need the light header.
const lightPages = [routes.smeRetainer, routes.privacy, routes.terms] as const;

/**
 * Editorial detail pages (practice areas, profiles), SME
 * and legal pages use the light header. Only live pages count, so an unbuilt
 * path keeps the dark 404 chrome. The People directory has a navy introduction.
 */
export function headerTone(pathname: string): HeaderTone {
  if (!isRouteAvailable(pathname)) return "dark";
  const lightDetail = [
    routes.practiceAreas,
    routes.people,
    routes.experience,
  ].some((parent) => pathname.startsWith(`${parent}/`));
  return lightDetail || lightPages.some((page) => page === pathname)
    ? "light"
    : "dark";
}
