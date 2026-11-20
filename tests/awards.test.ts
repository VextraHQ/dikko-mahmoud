import { describe, expect, it } from "vitest";
import { availableAwardIds, awardRecords } from "@/content/awards";
import { awardList, newestAwards } from "@/lib/awards";
import { makeAward } from "./fixtures/awards";

const preview = { allowPreview: true };
const launch = { allowPreview: false };

describe("newestAwards", () => {
  it("shows approved awards always, pending only in preview, withheld never", () => {
    const records = [
      makeAward("approved", 2024),
      makeAward("pending", 2023, "pending"),
      makeAward("withheld", 2022, "withheld"),
    ];
    expect(newestAwards(launch, records).map((a) => a.id)).toEqual([
      "approved",
    ]);
    const previewed = newestAwards(preview, records);
    expect(previewed.map((a) => a.id)).toEqual(["approved", "pending"]);
    expect(previewed.map((a) => a.pending)).toEqual([false, true]);
    expect(availableAwardIds(launch, records)).toEqual(["approved"]);
  });

  it("puts the newest first and keeps record order within a year", () => {
    const records = [
      makeAward("old", 2019),
      makeAward("first-2024", 2024),
      makeAward("newest", 2025),
      makeAward("second-2024", 2024),
    ];
    expect(newestAwards(launch, records).map((a) => a.id)).toEqual([
      "newest",
      "first-2024",
      "second-2024",
      "old",
    ]);
  });

  it("names the firm as recipient", () => {
    const [award] = newestAwards(launch, [makeAward("firm", 2024)]);
    expect(award.recipient).toBe("The firm");
    expect(award.year).toBe("2024");
    expect(award.recipientSlug).toBeUndefined();
  });

  it("links a person only while their profile may be shown", () => {
    const records = [
      makeAward("person", 2024, "approved", {
        type: "person",
        personId: "ab-mahmoud",
      }),
    ];
    expect(newestAwards(preview, records)[0].recipientSlug).toBe("ab-mahmoud");
    const [atLaunch] = newestAwards(launch, records);
    expect(atLaunch.recipient).toBe("A.B. Mahmoud, SAN");
    expect(atLaunch.recipientSlug).toBeUndefined();
  });

  it("leaves out an award for someone missing from the roster", () => {
    const records = [
      makeAward("missing", 2024, "approved", {
        type: "person",
        personId: "not-on-roster",
      }),
    ];
    expect(newestAwards(preview, records)).toEqual([]);
  });
});

describe("awardList", () => {
  const records = [2025, 2024, 2023, 2022].map((year) =>
    makeAward(`award-${year}`, year),
  );

  it("limits the list when asked and shows every award otherwise", () => {
    expect(awardList(launch, { limit: 3, slots: 3 }, records)).toHaveLength(3);
    expect(awardList(launch, { slots: 6 }, records)).toHaveLength(4);
  });

  it("fills only the preview with labelled slots while no award can show", () => {
    const slots = awardList(preview, { limit: 3, slots: 3 }, []);
    expect(slots.map((slot) => slot.year)).toEqual(["Year", "Year", "Year"]);
    expect(slots[0].recipient).toBeUndefined();
    expect(awardList(launch, { slots: 3 }, [])).toEqual([]);
  });
});

describe("awardRecords", () => {
  it("stays empty until the firm supplies its awards", () => {
    expect(awardRecords).toEqual([]);
  });
});
