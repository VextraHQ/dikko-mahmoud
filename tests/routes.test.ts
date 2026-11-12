import { describe, expect, it } from "vitest";

import { navigation } from "@/content/navigation";
import { isRouteAvailable, launchedRoutes, routes } from "@/lib/routes";

describe("routes", () => {
  it("builds detail paths from slugs", () => {
    expect(routes.person("ab-mahmoud")).toBe("/people/ab-mahmoud");
    expect(routes.practiceArea("dispute-resolution")).toBe(
      "/practice-areas/dispute-resolution",
    );
  });

  it("treats only launched pages as available", () => {
    expect(isRouteAvailable(routes.home)).toBe(true);
    expect(isRouteAvailable(routes.firm)).toBe(true);
    expect(isRouteAvailable(routes.contact)).toBe(true);
    expect(isRouteAvailable(routes.careers)).toBe(false);
  });

  it("launches only real, static route paths", () => {
    for (const path of launchedRoutes) expect(path).toMatch(/^\//);
    expect(new Set(launchedRoutes).size).toBe(launchedRoutes.length);
  });

  it("keeps every navigation item on a known route", () => {
    const known = Object.values(routes).filter(
      (value) => typeof value === "string",
    );
    for (const item of navigation) expect(known).toContain(item.href);
  });
});

describe("practice route availability", () => {
  it("resolves query and section URLs against the built page", () => {
    expect(isRouteAvailable(`${routes.practiceAreas}?category=advisory`)).toBe(
      true,
    );
    expect(
      isRouteAvailable(
        `${routes.practiceArea("corporate-commercial-advisory")}#services`,
      ),
    ).toBe(true);
    expect(isRouteAvailable(`${routes.contact}#enquiry`)).toBe(true);
    expect(isRouteAvailable(`${routes.careers}#roles`)).toBe(false);
    expect(isRouteAvailable("#services")).toBe(true);
    expect(isRouteAvailable("https://example.com/practice-areas")).toBe(false);
  });
  it("keeps unknown practice slugs unavailable", () => {
    expect(isRouteAvailable(routes.practiceArea("unknown"))).toBe(false);
  });
});
