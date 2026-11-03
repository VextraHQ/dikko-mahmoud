import { describe, expect, it } from "vitest";

import { people, seniorityGroups } from "@/content/people";
import {
  peopleDirectoryData,
  peopleDirectoryLeadership,
  toDirectoryPerson,
} from "@/lib/people/directory-data";
import {
  emptyFilters,
  directoryPresentation,
  filterPeople,
  filtersToSearch,
  groupPeople,
  hasActiveFilters,
  normalizeText,
  readFilters,
  showDirectoryToolbar,
} from "@/lib/people/directory";
import { makeDirectoryPeople } from "./fixtures/directory-people";

const preview = { allowPreview: true };
const team = makeDirectoryPeople(60);
const valid = {
  practices: ["energy-oil-gas", "litigation-dispute-resolution"],
  roles: ["partner", "associate"],
};

describe("directory records", () => {
  it("sends card fields only, never biographies or milestones", () => {
    const record = toDirectoryPerson(people[0]);
    expect(Object.keys(record).sort()).toEqual(
      [
        "id",
        "initials",
        "name",
        "portrait",
        "practices",
        "role",
        "seniority",
        "slug",
      ].sort(),
    );
  });

  it("drops practice IDs that are not in the practice index", () => {
    const record = toDirectoryPerson({
      ...people[0],
      practiceIds: ["energy-oil-gas", "not-a-practice"],
    });
    expect(record.practices).toEqual([
      { id: "energy-oil-gas", title: "Energy & Oil & Gas" },
    ]);
  });

  it("puts every current partner in the Partners group", () => {
    expect(people.every((person) => person.seniority === "partner")).toBe(true);
  });
});

describe("filter options", () => {
  it("offers only roles and practices someone actually holds", () => {
    const current = peopleDirectoryData(preview);
    expect(current.roles.map((role) => role.id)).toEqual(["partner"]);
    expect(current.practices).toEqual([]);

    const large = peopleDirectoryData(preview, team);
    expect(large.roles.map((role) => role.id)).toEqual(
      seniorityGroups.map((group) => group.id),
    );
    expect(large.practices).toHaveLength(9);
  });
});

describe("directory leadership", () => {
  const listed = peopleDirectoryData(preview).people;

  it("selects only the configured, eligible profile for the server feature", () => {
    const feature = peopleDirectoryLeadership(preview, listed);
    expect(feature?.person.id).toBe("ab-mahmoud");
    expect(feature?.preview).toBe(true);
    expect(feature?.person.biography).toBeTruthy();
  });

  it("does not expose a pending feature when indexing or when absent from the roster", () => {
    expect(
      peopleDirectoryLeadership({ allowPreview: false }, listed),
    ).toBeNull();
    expect(peopleDirectoryLeadership(preview, listed.slice(1))).toBeNull();
    expect(peopleDirectoryLeadership(preview, [])).toBeNull();
  });
});

describe("directoryPresentation", () => {
  const listed = people.map(toDirectoryPerson);
  const founderId = listed[0].id;

  it("features a person once and preserves the remaining roster order", () => {
    const presentation = directoryPresentation(listed, emptyFilters, founderId);
    expect(presentation.showFeatured).toBe(true);
    expect(presentation.active).toBe(false);
    expect(presentation.results).toEqual(listed.slice(1));
    expect(listed).toHaveLength(4);
  });

  it("searches the full roster and returns the featured person in the grid", () => {
    const presentation = directoryPresentation(
      listed,
      { ...emptyFilters, query: "mahmoud" },
      founderId,
    );
    expect(presentation.showFeatured).toBe(false);
    expect(presentation.results.map((person) => person.id)).toEqual([
      founderId,
    ]);
  });

  it("restores all partners for a role filter and respects practice matches", () => {
    const partners = directoryPresentation(
      listed,
      { ...emptyFilters, role: "partner" },
      founderId,
    );
    expect(partners.showFeatured).toBe(false);
    expect(partners.results).toEqual(listed);
    const practice = directoryPresentation(
      team,
      { ...emptyFilters, practice: "energy-oil-gas" },
      team[0].id,
    );
    expect(practice.showFeatured).toBe(false);
    expect(practice.results).toEqual(
      filterPeople(team, { ...emptyFilters, practice: "energy-oil-gas" }),
    );
  });

  it("keeps every card if the feature is unavailable and handles a lone feature", () => {
    expect(directoryPresentation(listed, emptyFilters).results).toEqual(listed);
    expect(
      directoryPresentation(listed, emptyFilters, "unavailable").showFeatured,
    ).toBe(false);
    expect(
      directoryPresentation(listed.slice(0, 1), emptyFilters, founderId),
    ).toEqual({ active: false, showFeatured: true, results: [] });
  });

  it("restores the feature on clear and treats whitespace as an empty search", () => {
    expect(
      directoryPresentation(
        listed,
        { ...emptyFilters, query: "   " },
        founderId,
      ).showFeatured,
    ).toBe(true);
    expect(
      directoryPresentation(listed, emptyFilters, founderId).showFeatured,
    ).toBe(true);
  });
});

describe("normalizeText", () => {
  it("ignores case, accents and initials punctuation", () => {
    expect(normalizeText("A.B. Mahmoud, SAN")).toBe("ab mahmoud san");
    expect(normalizeText("Sèfiullahi  Ọseni")).toBe("sefiullahi oseni");
    expect(normalizeText("Energy & Oil & Gas")).toBe("energy oil gas");
  });
});

describe("filterPeople", () => {
  const partners = people.map(toDirectoryPerson);

  it("returns everyone when no filter is active", () => {
    expect(filterPeople(team, emptyFilters)).toHaveLength(60);
  });

  it("matches every search word anywhere in name, role or practice", () => {
    const hits = (query: string) =>
      filterPeople(partners, { ...emptyFilters, query }).map((p) => p.slug);
    expect(hits("ab mahmoud")).toEqual(["ab-mahmoud"]);
    expect(hits("MAHMOUD  a.b.")).toEqual(["ab-mahmoud"]);
    expect(hits("senior partner")).toEqual(["bello-aminu-abdullahi"]);
    expect(hits("aminu")).toEqual(["bello-aminu-abdullahi", "aminu-sadauki"]);
    expect(hits("nobody here")).toEqual([]);
  });

  it("combines role, practice and search", () => {
    const result = filterPeople(team, {
      query: "test",
      role: "partner",
      practice: "energy-oil-gas",
    });
    expect(result.length).toBeGreaterThan(0);
    for (const person of result) {
      expect(person.seniority).toBe("partner");
      expect(person.practices.map((p) => p.id)).toContain("energy-oil-gas");
    }
  });
});

describe("groupPeople", () => {
  it("keeps group order and roster order, and drops empty groups", () => {
    const groups = groupPeople(team, seniorityGroups);
    expect(groups.map((group) => group.id)).toEqual([
      "partner",
      "counsel",
      "senior-associate",
      "associate",
    ]);
    expect(groups.reduce((sum, group) => sum + group.people.length, 0)).toBe(
      60,
    );
    expect(groupPeople(people.map(toDirectoryPerson), seniorityGroups)).toEqual(
      [expect.objectContaining({ id: "partner" })],
    );
  });
});

describe("URL filters", () => {
  it("reads known values and ignores unknown ones", () => {
    const params = new URLSearchParams(
      "q=ab&practice=energy-oil-gas&role=chairman",
    );
    expect(readFilters(params, valid)).toEqual({
      query: "ab",
      practice: "energy-oil-gas",
      role: "",
    });
  });

  it("round-trips through the URL and stays empty when nothing is set", () => {
    const filters = {
      query: " ab mahmoud ",
      practice: "litigation-dispute-resolution",
      role: "partner",
    };
    const search = filtersToSearch(filters);
    expect(search).toBe(
      "?q=ab+mahmoud&practice=litigation-dispute-resolution&role=partner",
    );
    expect(readFilters(new URLSearchParams(search), valid)).toEqual({
      ...filters,
      query: "ab mahmoud",
    });
    expect(filtersToSearch(emptyFilters)).toBe("");
  });
});

describe("showDirectoryToolbar", () => {
  const launch = { minPeople: 9, filters: emptyFilters, preview: false };

  it("at launch, uses the full list size against the threshold", () => {
    expect(showDirectoryToolbar({ ...launch, total: 4 })).toBe(false);
    expect(showDirectoryToolbar({ ...launch, total: 9 })).toBe(true);
  });

  it("stays visible while a filter is active, even below the threshold", () => {
    const filters = { ...emptyFilters, query: "x" };
    expect(hasActiveFilters(filters)).toBe(true);
    expect(showDirectoryToolbar({ ...launch, total: 4, filters })).toBe(true);
  });

  it("always shows during the no-index preview", () => {
    expect(showDirectoryToolbar({ ...launch, total: 4, preview: true })).toBe(
      true,
    );
  });

  it("passes the preview switch through from the page data", () => {
    expect(peopleDirectoryData({ allowPreview: true }).preview).toBe(true);
    expect(peopleDirectoryData({ allowPreview: false }).preview).toBe(false);
  });
});
