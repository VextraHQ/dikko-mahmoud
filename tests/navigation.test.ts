import { describe, expect, it } from "vitest";

import { footer } from "@/content/footer";
import { navigation } from "@/content/navigation";
import { headerTone, isActivePath } from "@/lib/navigation";
import { routes } from "@/lib/routes";

describe("headerTone", () => {
  it("uses the white header on built practice detail pages", () => {
    expect(
      headerTone(routes.practiceArea("corporate-commercial-advisory")),
    ).toBe("light");
  });

  it("uses light chrome for SME and legal reading pages", () => {
    for (const route of [routes.smeRetainer, routes.privacy, routes.terms])
      expect(headerTone(route)).toBe("light");
  });

  it("keeps the navy header on Home, Firm and the hub", () => {
    expect(headerTone(routes.home)).toBe("dark");
    expect(headerTone(routes.firm)).toBe("dark");
    expect(headerTone(routes.practiceAreas)).toBe("dark");
    expect(headerTone(`${routes.practiceAreas}/not-a-practice`)).toBe("dark");
  });
});

describe("isActivePath", () => {
  it("matches a section and its child pages, but not home as a prefix", () => {
    expect(isActivePath(routes.practiceArea("x"), routes.practiceAreas)).toBe(
      true,
    );
    expect(isActivePath(routes.firm, routes.home)).toBe(false);
  });
});

describe("footer links", () => {
  it("use the main navigation's label for the same page", () => {
    // The footer spells out the client's full series name for Insights.
    const exceptions = new Set<string>([routes.insights]);
    const navLabels = new Map(
      navigation.map((item) => [item.href, item.label]),
    );
    for (const group of footer.linkGroups) {
      for (const link of group.links) {
        const navLabel = navLabels.get(link.href);
        if (navLabel && !exceptions.has(link.href))
          expect(link.label, link.href).toBe(navLabel);
      }
    }
  });
});
