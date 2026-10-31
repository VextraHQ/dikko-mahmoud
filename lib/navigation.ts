import { isRouteAvailable, routes } from "@/lib/routes";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export type HeaderTone = "light" | "dark";

/** Built practice detail pages use the supplied white header; all others are navy. */
export function headerTone(pathname: string): HeaderTone {
  return pathname.startsWith(`${routes.practiceAreas}/`) &&
    isRouteAvailable(pathname)
    ? "light"
    : "dark";
}
