// Copy for the 404 and error pages. Plain, calm and reassuring: no jargon,
// no blame, always a clear way forward.
export const systemPages = {
  notFound: {
    mark: "404",
    eyebrow: "Error 404 · Page not found",
    title: "We couldn’t find that page.",
    description:
      "The page you’re looking for may have moved, or the link may be out of date. Head back home or explore our practice areas to find your way.",
    homeAction: "Return home",
    practiceAreasAction: "Explore practice areas",
    metaTitle: "Page not found",
  },
  error: {
    eyebrow: "Something went wrong",
    title: "This page didn’t load as expected.",
    description:
      "A temporary problem stopped this page from loading. Please try again, or return to the homepage.",
    retryAction: "Try again",
    homeAction: "Return home",
  },
} as const;
