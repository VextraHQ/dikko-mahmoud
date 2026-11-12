"use client";

import { useSitePathname } from "@/hooks/use-site-pathname";
import { headerAction } from "@/content/navigation";
import { routes } from "@/lib/routes";

/** The header button for this page: home from Contact, otherwise enquire. */
export function useHeaderAction() {
  const pathname = useSitePathname();
  return pathname === routes.contact ? headerAction.home : headerAction.enquiry;
}
