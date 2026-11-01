import { practiceIndex as practiceCatalogue } from "@/content/practice-index";

// Every internal page address lives here. Components link with `routes.*`,
// never a hand-typed path, so renaming a page is a one-line change.
const practiceAreasPath = "/practice-areas";
export const routes = {
  home: "/",
  firm: "/the-firm",
  practiceAreas: practiceAreasPath,
  practiceFilter: (category: string) =>
    `${practiceAreasPath}?category=${encodeURIComponent(category)}`,
  practiceArea: (slug: string) => `${practiceAreasPath}/${slug}`,
  experience: "/experience",
  matter: (id: string) => `/experience/${id}`,
  people: "/people",
  person: (slug: string) => `/people/${slug}`,
  insights: "/insights",
  insight: (id: string) => `/insights/${id}`,
  careers: "/careers",
  contact: "/contact",
  smeRetainer: "/sme-retainer",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
} as const;

/**
 * Pages that are built and live. Launching a page = adding its path here;
 * every `SiteLink` pointing at it switches from the "being prepared" notice
 * to a real link. Detail pages (a person, an insight) can instead be enabled
 * per record with SiteLink's `available` prop.
 */
export const launchedRoutes: readonly string[] = [
  routes.home,
  routes.firm,
  routes.practiceAreas,
  routes.smeRetainer,
  routes.privacy,
  routes.terms,
  ...practiceCatalogue.map((practice) => routes.practiceArea(practice.slug)),
];

export function isRouteAvailable(href: string) {
  if (href.startsWith("#") || href.startsWith("?")) return true;
  return launchedRoutes.includes(href.split(/[?#]/, 1)[0]);
}

/** Enquiries go to the Contact page once it launches; until then, email. */
export function enquiryHref(email: string) {
  return isRouteAvailable(routes.contact) ? routes.contact : `mailto:${email}`;
}
