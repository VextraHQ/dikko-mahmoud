import { describe, expect, it } from "vitest";

import { getNextPractice, practiceIndex } from "@/content/practice-index";
import { getPractice, getPracticeSections } from "@/content/practice-catalogue";
import { enquiryHref, routes } from "@/lib/routes";

describe("practice index", () => {
  it("links each practice to the next and wraps at the end", () => {
    const [first, second] = practiceIndex;
    const last = practiceIndex[practiceIndex.length - 1];
    expect(getNextPractice(first.slug)).toEqual({ practice: second, index: 1 });
    expect(getNextPractice(last.slug)).toEqual({ practice: first, index: 0 });
    expect(getNextPractice("unknown")).toBeUndefined();
  });

  it("keeps jump-link labels free of heading punctuation", () => {
    for (const { slug } of practiceIndex) {
      const practice = getPractice(slug);
      if (!practice) continue;
      for (const section of getPracticeSections(practice))
        expect(section.label).not.toMatch(/[.!?]$/);
    }
  });

  it("sends enquiries to email until the Contact page launches", () => {
    expect(enquiryHref("info@example.com")).toBe("mailto:info@example.com");
    expect(routes.contact).toBe("/contact");
  });
});
