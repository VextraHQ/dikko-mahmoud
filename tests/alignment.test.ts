import { describe, expect, it } from "vitest";
import { approvedRecords, initialRecordIndex } from "@/lib/publication";
import { routes } from "@/lib/routes";
import {
  publishableMatters,
  matterRecords,
  visibleMatters,
} from "@/content/matters";
import {
  publishableClients,
  selectedClients,
  visibleClients,
} from "@/content/clients";
import {
  practiceIndex,
  practiceEnquiryOptions,
} from "@/content/practice-index";
import { practiceAreas } from "@/content/practice-areas";
import { footer } from "@/content/footer";
import { getInsightAuthor } from "@/content/insights";
import { profileSourceNotes } from "@/content/people-review";
import { heroSlides } from "@/content/home";
import { people, getPerson } from "@/content/people";
import {
  getLegalDocument,
  legalDocuments,
  legalPresentation,
  type LegalDocument,
} from "@/content/legal";
import {
  getPractice,
  getPracticeExperience,
  getPracticeSections,
} from "@/content/practice-catalogue";

describe("publication approval", () => {
  it("fails closed for missing, pending and withheld status without mutating records", () => {
    const records = [
      { id: "old" },
      { id: "pending", publicationStatus: "pending" as const },
      { id: "withheld", publicationStatus: "withheld" as const },
      { id: "ok", publicationStatus: "approved" as const },
    ];
    expect(approvedRecords(records).map((r) => r.id)).toEqual(["ok"]);
    expect(records).toHaveLength(4);
    expect(approvedRecords([])).toEqual([]);
  });
  it("starts existing clients/matters hidden and supports partial publication", () => {
    expect(visibleMatters).toEqual([]);
    expect(visibleClients).toEqual([]);
    const one = { ...matterRecords[1], publicationStatus: "approved" as const };
    expect(publishableMatters([matterRecords[0], one])).toEqual([one]);
    expect(publishableMatters([{ ...one, summary: " " }])).toEqual([]);
    expect(
      publishableMatters([
        one,
        { ...matterRecords[2], publicationStatus: "approved" },
      ]),
    ).toHaveLength(2);
    const client = {
      ...selectedClients.slots[0],
      name: "Approved organisation",
      publicationStatus: "approved" as const,
    };
    expect(publishableClients([client])).toEqual([client]);
    expect(publishableClients([{ ...client, name: null }])).toEqual([]);
  });
  it("falls back to an available opening record after the preferred record is hidden", () => {
    expect(initialRecordIndex([{ id: "other" }], "hidden")).toBe(0);
    expect(
      initialRecordIndex([{ id: "other" }, { id: "preferred" }], "preferred"),
    ).toBe(1);
    expect(initialRecordIndex([], "missing")).toBe(0);
  });
  it("uses approved experience for both slides and sidebar links", () => {
    const corporate = getPractice("corporate-commercial-advisory")!;
    expect(getPracticeExperience(corporate)).toEqual([]);
    expect(
      getPracticeSections(corporate).some((s) => s.id === "experience"),
    ).toBe(false);
    const approved = {
      ...corporate,
      detail: {
        ...corporate.detail!,
        experience: corporate.detail!.experience!.map((e) => ({
          ...e,
          publicationStatus: "approved" as const,
        })),
      },
    };
    expect(getPracticeExperience(approved)).toHaveLength(2);
    expect(
      getPracticeSections(approved).some((s) => s.id === "experience"),
    ).toBe(true);
  });
  it("restores pending experience for explicit design previews without approving or exposing withheld records", () => {
    const corporate = getPractice("corporate-commercial-advisory")!;
    const options = { includePending: true };
    expect(getPracticeExperience(corporate, options)).toHaveLength(2);
    expect(
      getPracticeSections(corporate, options).some(
        (section) => section.id === "experience",
      ),
    ).toBe(true);
    expect(
      corporate.detail!.experience!.every(
        (item) => item.publicationStatus === "pending",
      ),
    ).toBe(true);
    const withheld = {
      ...corporate,
      detail: {
        ...corporate.detail!,
        experience: corporate.detail!.experience!.map((item) => ({
          ...item,
          publicationStatus: "withheld" as const,
        })),
      },
    };
    expect(getPracticeExperience(withheld, options)).toEqual([]);
    expect(
      getPracticeSections(withheld, options).some(
        (section) => section.id === "experience",
      ),
    ).toBe(false);
    expect(getPracticeExperience(corporate, { includePending: false })).toEqual(
      [],
    );
  });
});
describe("shared content", () => {
  it("keeps internal source notes keyed to real people and outside public records", () => {
    expect(profileSourceNotes).toHaveLength(4);
    for (const entry of profileSourceNotes) {
      expect(getPerson(entry.personId)).toBeDefined();
      expect(entry.notes.length).toBeGreaterThan(0);
    }
    expect(people.some((person) => "biographyDraft" in person)).toBe(false);
  });
  it("keeps all nine titles, order and destinations aligned without a tenth practice", () => {
    const titles = practiceIndex.map((p) => p.title);
    expect(practiceAreas.map((p) => p.title)).toEqual(titles);
    expect(practiceAreas.map((p) => p.id)).toEqual(
      practiceIndex.map((p) => p.slug),
    );
    expect(
      footer.linkGroups
        .find((g) => g.title === "Practice areas")!
        .links.map((l) => l.label),
    ).toEqual(titles);
    expect(practiceEnquiryOptions.map((p) => p.label)).toEqual(titles);
    expect(practiceIndex).toHaveLength(9);
    for (const slide of heroSlides) {
      if (slide.practiceSlug)
        expect(slide.practice).toBe(
          practiceIndex.find((practice) => practice.slug === slide.practiceSlug)
            ?.title,
        );
      else expect(slide.practice).toBe("Our expertise");
    }
    expect(practiceIndex.some((p) => "detail" in p)).toBe(false);
  });
  it("resolves only canonical authors and never substitutes an unrelated person", () => {
    expect(getInsightAuthor({})).toBeUndefined();
    expect(getInsightAuthor({ authorId: "unknown" })).toBeUndefined();
    expect(getInsightAuthor({ authorId: people[0].id })).toBe(people[0]);
  });
});
describe("legal preview gates", () => {
  it("finds each legal document by key and fails clearly for a missing one", () => {
    expect(getLegalDocument("privacy").path).toBe(routes.privacy);
    expect(getLegalDocument("terms").path).toBe(routes.terms);
    expect(() => getLegalDocument("missing" as LegalDocument["key"])).toThrow(
      'Legal document "missing" is not defined.',
    );
  });
  it("suppresses unapproved body text and dates", () => {
    const draft = {
      ...legalDocuments[0],
      approvedUpdatedAt: "2026-10-31",
      sections: [
        { id: "intro", title: "Introduction", paragraphs: ["Draft text"] },
      ],
    };
    expect(legalPresentation(draft)).toEqual({ sections: [], updatedAt: null });
    expect(
      legalPresentation({ ...draft, publicationStatus: "withheld" }),
    ).toEqual({ sections: [], updatedAt: null });
  });
  it("renders approved sections, omits blank ones and rejects fabricated or invalid dates", () => {
    const document = {
      ...legalDocuments[0],
      publicationStatus: "approved" as const,
      approvedUpdatedAt: "2026-10-31",
      sections: [
        { id: "good", title: "Heading", paragraphs: ["Approved text"] },
        { id: "blank", title: "Blank", paragraphs: [] },
      ],
    };
    expect(legalPresentation(document).sections.map((s) => s.id)).toEqual([
      "good",
    ]);
    expect(legalPresentation(document).updatedAt).toBe("2026-10-31");
    for (const approvedUpdatedAt of [null, "pending", "2026-02-31"])
      expect(
        legalPresentation({ ...document, approvedUpdatedAt }).updatedAt,
      ).toBeNull();
  });
});
