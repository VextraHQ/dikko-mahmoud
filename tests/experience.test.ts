import { describe, expect, it } from "vitest";
import { availableMatterIds, matterManifest } from "@/content/matter-manifest";
import {
  experienceRecords,
  getExperiences,
  isCompleteExperience,
  resolveExperience,
} from "@/content/experience";
import { matterRecords, visibleMatters } from "@/content/matters";
import { practiceIndex } from "@/content/practice-index";
import { headerTone } from "@/lib/navigation";
import { previewOptions } from "@/lib/preview";
import { isRouteAvailable, routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/metadata";

const preview = { allowPreview: true };
const launch = { allowPreview: false };

describe("experience publication and integrity", () => {
  it("keeps one complete body per canonical manifest and Home matter", () => {
    const ids = matterManifest.map((record) => record.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(experienceRecords.map((record) => record.matterId)).toEqual(ids);
    expect(matterRecords.map((record) => record.id)).toEqual(ids);
    for (const record of experienceRecords) {
      expect(isCompleteExperience(record)).toBe(true);
      expect(record.practiceSlugs.length).toBeGreaterThan(0);
      for (const slug of record.practiceSlugs)
        expect(practiceIndex.some((practice) => practice.slug === slug)).toBe(
          true,
        );
    }
  });

  it("previews the four pending records without restoring pending Home matters", () => {
    expect(getExperiences(preview)).toHaveLength(4);
    expect(getExperiences(launch)).toEqual([]);
    expect(visibleMatters).toEqual([]);
    expect(getExperiences(preview).every((record) => record.preview)).toBe(
      true,
    );
  });

  it("never resolves withheld, unknown or missing approval, and allows approved output", () => {
    const id = matterManifest[0].id;
    expect(resolveExperience("unknown", preview)).toBeNull();
    expect(resolveExperience(id, preview, experienceRecords, [])).toBeNull();
    expect(
      resolveExperience(id, preview, experienceRecords, [
        { id, publicationStatus: "withheld" },
      ]),
    ).toBeNull();
    const manifest = [{ id, publicationStatus: "approved" as const }];
    expect(
      resolveExperience(id, launch, experienceRecords, manifest)?.preview,
    ).toBe(false);
    expect(availableMatterIds(launch, manifest)).toEqual([id]);
    expect(
      availableMatterIds(preview, [{ id, publicationStatus: "withheld" }]),
    ).toEqual([]);
  });

  it("rejects missing or incomplete bodies before rendering or metadata", () => {
    const body = experienceRecords[0];
    expect(resolveExperience(body.matterId, preview, [])).toBeNull();
    for (const incomplete of [
      { ...body, summary: " " },
      { ...body, instructions: [] },
      { ...body, instructions: [{ ...body.instructions[0], role: "" }] },
    ]) {
      expect(
        resolveExperience(body.matterId, preview, [incomplete]),
      ).toBeNull();
    }
  });

  it("keeps separate instructions and precise claim/role attribution", () => {
    const bpe = resolveExperience("bureau-public-enterprises", preview);
    expect(bpe?.instructions).toHaveLength(2);
    expect(bpe?.instructions[0].role).toBe("Managing Partner · lead counsel");
    expect(bpe?.claim?.qualification).toBe(
      "Claim value, not an award or recovery.",
    );
    expect(bpe?.claim?.value).toBe("$1.37bn");
    expect(
      resolveExperience("kano-state-government", preview)?.instructions,
    ).toHaveLength(2);
    expect(resolveExperience("nnpc-npdc", preview)?.instructions).toHaveLength(
      2,
    );
    expect(
      resolveExperience("central-bank-nigeria", preview)?.instructions,
    ).toHaveLength(1);
  });

  it("registers only eligible IDs and assigns listing/detail header tones", () => {
    const ids = availableMatterIds(previewOptions);
    expect(isRouteAvailable(routes.experience)).toBe(ids.length > 0);
    for (const id of matterManifest.map((record) => record.id)) {
      expect(isRouteAvailable(routes.matter(id))).toBe(ids.includes(id));
      expect(headerTone(routes.matter(id))).toBe(
        ids.includes(id) ? "light" : "dark",
      );
    }
    expect(headerTone(routes.experience)).toBe("dark");
    expect(isRouteAvailable(routes.matter("unknown"))).toBe(false);
    expect(headerTone(routes.matter("unknown"))).toBe("dark");
  });

  it("builds metadata with the same canonical destination and summary", () => {
    for (const experience of getExperiences(preview)) {
      const path = routes.matter(experience.matterId);
      const metadata = createPageMetadata({
        title: experience.organisation,
        description: experience.summary,
        path,
      });
      expect(metadata.alternates?.canonical).toBe(path);
      expect(metadata.description).toBe(experience.summary);
      expect(metadata.openGraph?.url).toBe(path);
    }
  });
});
