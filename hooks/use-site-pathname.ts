"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * The page the visitor is on for header purposes. While an intercepted profile
 * overlay is open the URL is `/people/[slug]`, but the page beneath (and so its
 * header tone and active item) is still the origin, which the site layout's
 * `children` segments keep. A direct profile visit has matching segments.
 * Must be called inside the (site) layout tree.
 */
export function useSitePathname() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  if (!pathname.startsWith(`${routes.people}/`)) return pathname;
  const visible = segments.filter(
    (segment) => !segment.startsWith("(") && !segment.startsWith("__"),
  );
  return `/${visible.join("/")}`;
}
