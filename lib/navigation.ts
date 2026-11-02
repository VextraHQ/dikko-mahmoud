import { isRouteAvailable, routes } from "@/lib/routes";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export type HeaderTone = "light" | "dark";

/** Editorial detail, profile, SME and legal pages use the light header. */
export function headerTone(pathname: string): HeaderTone {
  const lightDetail = [routes.practiceAreas, routes.people].some(
    (parent) => pathname.startsWith(`${parent}/`) && isRouteAvailable(pathname),
  );
  return lightDetail ||
    [routes.smeRetainer, routes.privacy, routes.terms].some(
      (route) => route === pathname,
    )
    ? "light"
    : "dark";
}
