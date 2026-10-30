import { describe, expect, it } from "vitest";

import { selectedMatters, visibleMatters } from "@/content/matters";
import {
  advisoryGroups,
  getPerson,
  homePeople,
  people,
  requirePerson,
} from "@/content/people";
import { visiblePracticeAreas } from "@/content/practice-areas";
import { homeInsights } from "@/content/insights";

// Guards against content edits that would silently break a section.
describe("content integrity", () => {
  it("has unique person ids and slugs", () => {
    const ids = people.map((person) => person.id);
    const slugs = people.map((person) => person.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references only real people in advisory groups", () => {
    for (const group of advisoryGroups) {
      for (const id of group.personIds) expect(getPerson(id)).toBeDefined();
    }
  });

  it("throws a clear error for a missing required person", () => {
    expect(() => requirePerson("nobody")).toThrow(
      "Missing person record: nobody",
    );
  });

  it("caps the homepage People preview at four", () => {
    expect(homePeople.length).toBeLessThanOrEqual(4);
  });

  it("opens selected matters on a matter that exists", () => {
    expect(
      visibleMatters.some((matter) => matter.id === selectedMatters.defaultId),
    ).toBe(true);
  });

  it("gives every practice area a summary", () => {
    for (const area of visiblePracticeAreas)
      expect(area.summary.trim()).not.toBe("");
  });

  it("never repeats the featured insight or exceeds three supporting", () => {
    if (!homeInsights) return;
    const ids = homeInsights.supporting.map((item) => item.id);
    expect(ids).not.toContain(homeInsights.feature.id);
    expect(ids.length).toBeLessThanOrEqual(3);
  });
});
