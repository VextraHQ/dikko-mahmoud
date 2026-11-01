import { describe, expect, it } from "vitest";

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
