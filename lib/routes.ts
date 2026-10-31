// Every internal page address lives here. Components link with `routes.*`,
// never a hand-typed path, so renaming a page is a one-line change.
export const routes = {
  home: "/",
  firm: "/the-firm",
  practiceAreas: "/practice-areas",
  practiceArea: (slug: string) => `/practice-areas/${slug}`,
  experience: "/experience",
  matter: (id: string) => `/experience/${id}`,
  people: "/people",
  person: (slug: string) => `/people/${slug}`,
  insights: "/insights",
  insight: (id: string) => `/insights/${id}`,
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
} as const;

/**
 * Pages that are built and live. Launching a page = adding its path here;
 * every `SiteLink` pointing at it switches from the "being prepared" notice
 * to a real link. Detail pages (a person, an insight) can instead be enabled
 * per record with SiteLink's `available` prop.
 */
export const launchedRoutes: readonly string[] = [routes.home, routes.firm];

export function isRouteAvailable(href: string) {
  return launchedRoutes.includes(href);
}
