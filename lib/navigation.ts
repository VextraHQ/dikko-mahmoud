import { isRouteAvailable, routes } from "@/lib/routes";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export type HeaderTone = "light" | "dark";

/** Editorial detail, SME and legal pages use the light header. */
export function headerTone(pathname: string): HeaderTone {
  return [routes.smeRetainer, routes.privacy, routes.terms].some(
    (route) => route === pathname,
  ) ||
    (pathname.startsWith(`${routes.practiceAreas}/`) &&
      isRouteAvailable(pathname))
    ? "light"
    : "dark";
}
