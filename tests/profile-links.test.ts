import { describe, expect, it } from "vitest";

import { contact } from "@/content/contact";
import {
  isValidProfileLink,
  normalizeProfileLinks,
  profileLinkHref,
  profileLinkLabel,
} from "@/lib/people/profile-links";
import { enquiryHref, isRouteAvailable, routes } from "@/lib/routes";

describe("profile links", () => {
  it("accepts only well-formed values per platform", () => {
    expect(
      isValidProfileLink({
        platform: "linkedin",
        value: "https://www.linkedin.com/in/someone",
      }),
    ).toBe(true);
    // A bare domain would otherwise become a same-site path.
    expect(
      isValidProfileLink({ platform: "linkedin", value: "linkedin.com/in/x" }),
    ).toBe(false);
    expect(
      isValidProfileLink({ platform: "website", value: "javascript:alert(1)" }),
    ).toBe(false);
    expect(isValidProfileLink({ platform: "email", value: "a@b.com" })).toBe(
      true,
    );
    expect(isValidProfileLink({ platform: "email", value: "nope" })).toBe(
      false,
    );
    expect(
      isValidProfileLink({ platform: "phone", value: "+234 701 129 9994" }),
    ).toBe(true);
    expect(
      isValidProfileLink({ platform: "facebook", value: "https://fb.com/x" }),
    ).toBe(false);
  });

  it("drops invalid and duplicate links and orders by platform", () => {
    const links = normalizeProfileLinks([
      { platform: "email", value: "a@b.com" },
      { platform: "phone", value: "123" },
      { platform: "linkedin", value: "https://linkedin.com/in/a" },
      { platform: "email", value: "A@B.com" },
    ]);
    expect(links.map((link) => link.platform)).toEqual(["linkedin", "email"]);
  });

  it("builds hrefs and descriptive labels", () => {
    expect(profileLinkHref({ platform: "email", value: " a@b.com " })).toBe(
      "mailto:a@b.com",
    );
    expect(
      profileLinkHref({ platform: "phone", value: "+234 (701) 129-9994" }),
    ).toBe("tel:+2347011299994");
    expect(
      profileLinkLabel(
        { platform: "linkedin", value: "https://linkedin.com/in/a" },
        "A. Person",
      ),
    ).toContain("LinkedIn");
    expect(
      profileLinkLabel(
        { platform: "email", value: "x@y.com", label: "Mail" },
        "A",
      ),
    ).toBe("Mail");
  });
});

describe("enquiry destination", () => {
  it("emails the firm until Contact launches, then uses the page", () => {
    expect(enquiryHref(contact.email)).toBe(
      isRouteAvailable(routes.contact)
        ? `${routes.contact}#enquiry`
        : `mailto:${contact.email}`,
    );
  });
});
