import { describe, it, expect } from "vitest";
import {
  practiceCatalogue,
  filterPractices,
  getPractice,
  getPracticeFilter,
  getPracticeSections,
} from "@/content/practice-catalogue";
import { getPerson } from "@/content/people";
import { isRouteAvailable, routes } from "@/lib/routes";

describe("practice catalogue", () => {
  it("has nine unique routable records and no fabricated detail collections", () => {
    expect(practiceCatalogue).toHaveLength(9);
    expect(new Set(practiceCatalogue.map((p) => p.slug)).size).toBe(9);
    for (const practice of practiceCatalogue) {
      expect(practice.summary.trim()).not.toBe("");
      expect(isRouteAvailable(routes.practiceArea(practice.slug))).toBe(true);
    }
    expect(getPractice("unknown")).toBeUndefined();
  });
  it("filters by source categories and handles unrecognised URL values", () => {
    expect(filterPractices("Contentious").map((p) => p.slug)).toEqual([
      "litigation-dispute-resolution",
    ]);
    expect(filterPractices("Transactional")).toHaveLength(3);
    expect(filterPractices("Advisory")).toHaveLength(5);
    expect(getPracticeFilter("advisory")).toBe("Advisory");
    expect(getPracticeFilter("invalid")).toBe("All areas");
    expect(getPracticeFilter(undefined)).toBe("All areas");
  });
  it("links only to sections present in each practice", () => {
    const corporate = getPractice("corporate-commercial-advisory")!;
    expect(getPracticeSections(corporate).map((section) => section.id)).toEqual(
      ["needs", "services", "practice-people", "working-together"],
    );
    expect(
      getPracticeSections(getPractice("energy-oil-gas")!).map(
        (section) => section.id,
      ),
    ).toEqual(["needs", "working-together"]);
    const withFaq = {
      ...corporate,
      detail: {
        ...corporate.detail!,
        faqs: {
          heading: ["Questions"],
          description: "Practice questions",
          items: [{ id: "example", question: "Example?", answer: "Answer" }],
        },
      },
    };
    expect(getPracticeSections(withFaq).at(-1)?.id).toBe("faqs");
    expect(
      getPracticeSections({
        ...withFaq,
        detail: {
          ...withFaq.detail,
          faqs: { ...withFaq.detail.faqs, items: [] },
        },
      }).some((section) => section.id === "faqs"),
    ).toBe(false);
  });
  it("keeps Home destinations and supplied contact references valid", () => {
    for (const practice of practiceCatalogue) {
      if (practice.detail?.contactId)
        expect(getPerson(practice.detail.contactId)).toBeDefined();
      for (const id of practice.detail?.peopleIds ?? [])
        expect(getPerson(id)).toBeDefined();
    }
  });
});
