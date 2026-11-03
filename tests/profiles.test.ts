import { describe, expect, it } from "vitest";

import { navigation } from "@/content/navigation";
import { getPerson, people } from "@/content/people";
import {
  availableProfileSlugs,
  directoryPeople,
  profileManifest,
} from "@/content/profile-manifest";
import {
  isCompleteProfile,
  profileBodies,
  profileSectionIds,
  profileSectionLinks,
  profileSlugs,
  relatedProfiles,
  resolveProfile,
} from "@/content/profiles";
import { headerTone } from "@/lib/navigation";
import { previewOptions } from "@/lib/preview";
import { isPublishable } from "@/lib/publication";
import { isRouteAvailable, launchedRoutes, routes } from "@/lib/routes";

const preview = { allowPreview: true };
const launch = { allowPreview: false };

describe("isPublishable", () => {
  it("publishes approved records, previews pending ones and never withheld", () => {
    expect(isPublishable("approved", launch)).toBe(true);
    expect(isPublishable("pending", launch)).toBe(false);
    expect(isPublishable("pending", preview)).toBe(true);
    expect(isPublishable("withheld", preview)).toBe(false);
    expect(isPublishable(undefined, preview)).toBe(false);
  });
});

describe("profile records", () => {
  it("keys manifest entries and bodies to canonical people once each", () => {
    const manifestIds = profileManifest.map((entry) => entry.personId);
    const bodyIds = profileBodies.map((body) => body.personId);
    expect(new Set(manifestIds).size).toBe(manifestIds.length);
    expect(new Set(bodyIds).size).toBe(bodyIds.length);
    for (const id of [...manifestIds, ...bodyIds])
      expect(getPerson(id)).toBeDefined();
    for (const id of bodyIds) expect(manifestIds).toContain(id);
  });

  it("gives every previewable manifest slug a complete body", () => {
    for (const slug of availableProfileSlugs(preview)) {
      const person = people.find((item) => item.slug === slug);
      const body = profileBodies.find((item) => item.personId === person?.id);
      expect(isCompleteProfile(body)).toBe(true);
      expect(resolveProfile(slug, preview)).not.toBeNull();
    }
  });

  it("covers only the four partners in this slice", () => {
    expect(profileSlugs(preview)).toEqual([
      "ab-mahmoud",
      "bello-aminu-abdullahi",
      "aminu-sadauki",
      "sefiullahi-oseni",
    ]);
  });
});

describe("resolveProfile", () => {
  it("returns the same selection to popup and page, flagged as a preview", () => {
    const resolved = resolveProfile("ab-mahmoud", preview);
    expect(resolved?.preview).toBe(true);
    expect(resolved?.title).toBe("Co-founder & Managing Partner");
    expect(resolved?.personalEmail).toBe("abmahmoud@dikkoandmahmoud.com");
    expect(resolveProfile("ab-mahmoud", preview)).toEqual(resolved);
  });

  it("has no personal links when none were supplied, so the firm enquiry shows", () => {
    const resolved = resolveProfile("bello-aminu-abdullahi", preview);
    expect(resolved?.personalEmail).toBeUndefined();
    expect(resolved?.links).toEqual([]);
  });

  it("addresses people by their short name, falling back to the full name", () => {
    expect(resolveProfile("bello-aminu-abdullahi", preview)?.shortName).toBe(
      "Bello",
    );
    const records = {
      profiles: [
        { personId: "ab-mahmoud", fullName: "A.B.", biography: ["Text."] },
      ],
      manifest: [
        { personId: "ab-mahmoud", publicationStatus: "approved" as const },
      ],
    };
    expect(resolveProfile("ab-mahmoud", launch, records)?.shortName).toBe(
      "A.B.",
    );
  });

  it("hides pending drafts at launch and unknown slugs always", () => {
    expect(resolveProfile("ab-mahmoud", launch)).toBeNull();
    expect(profileSlugs(launch)).toEqual([]);
    expect(resolveProfile("not-a-person", preview)).toBeNull();
  });

  it("publishes approved bodies at launch and never withheld ones", () => {
    const records = {
      profiles: profileBodies,
      manifest: [
        { personId: "ab-mahmoud", publicationStatus: "approved" as const },
        {
          personId: "bello-aminu-abdullahi",
          publicationStatus: "withheld" as const,
        },
      ],
    };
    const approved = resolveProfile("ab-mahmoud", launch, records);
    expect(approved?.preview).toBe(false);
    expect(
      resolveProfile("bello-aminu-abdullahi", preview, records),
    ).toBeNull();
    expect(resolveProfile("aminu-sadauki", preview, records)).toBeNull();
    expect(availableProfileSlugs(launch, records.manifest)).toEqual([
      "ab-mahmoud",
    ]);
  });

  it("rejects an incomplete body even when approved", () => {
    const records = {
      profiles: [{ personId: "ab-mahmoud", fullName: "A.B.", biography: [] }],
      manifest: [
        { personId: "ab-mahmoud", publicationStatus: "approved" as const },
      ],
    };
    expect(resolveProfile("ab-mahmoud", launch, records)).toBeNull();
  });
});

describe("profile routes and navigation", () => {
  it("launches only profiles the preview rule allows", () => {
    const allowed = availableProfileSlugs(previewOptions);
    for (const person of people) {
      expect(isRouteAvailable(routes.person(person.slug))).toBe(
        allowed.includes(person.slug),
      );
    }
    expect(launchedRoutes).not.toContain(routes.experience);
  });

  it("launches the directory exactly when it has someone to list", () => {
    expect(isRouteAvailable(routes.people)).toBe(
      directoryPeople(previewOptions).length > 0,
    );
  });

  it("uses light profile chrome and a dark directory introduction", () => {
    const [slug] = availableProfileSlugs(previewOptions);
    if (slug) expect(headerTone(routes.person(slug))).toBe("light");
    if (isRouteAvailable(routes.people))
      expect(headerTone(routes.people)).toBe("dark");
    expect(headerTone(routes.person("not-a-person"))).toBe("dark");
  });

  it("keeps Our People and Selected matters in the agreed order", () => {
    expect(navigation.map((item) => item.label)).toEqual([
      "Home",
      "The firm",
      "Practice areas",
      "Our People",
      "Selected matters",
      "Insights",
      "Careers",
      "Contact",
    ]);
  });
});

describe("profile page sections", () => {
  it("lists only the sections a profile renders, ending with the enquiry", () => {
    const full = resolveProfile("bello-aminu-abdullahi", preview);
    expect(full && profileSectionLinks(full)).toEqual([
      { id: profileSectionIds.overview, label: "Overview" },
      { id: profileSectionIds.focus, label: "Areas of focus" },
      { id: profileSectionIds.qualifications, label: "Qualifications" },
      { id: profileSectionIds.contact, label: "Working with Bello" },
    ]);
    if (!full) return;
    const bare = {
      ...full,
      profile: { ...full.profile, focus: [], qualifications: undefined },
    };
    expect(profileSectionLinks(bare).map((link) => link.id)).toEqual([
      profileSectionIds.overview,
      profileSectionIds.contact,
    ]);
  });

  it("suggests every other available profile, never the current one", () => {
    expect(
      relatedProfiles("bello-aminu-abdullahi", preview).map((p) => p.slug),
    ).toEqual(["ab-mahmoud", "aminu-sadauki", "sefiullahi-oseni"]);
    expect(relatedProfiles("ab-mahmoud", launch)).toEqual([]);
  });
});

describe("people directory", () => {
  const manifestWith = (
    statuses: Record<string, "approved" | "pending" | "withheld">,
  ) =>
    Object.entries(statuses).map(([personId, publicationStatus]) => ({
      personId,
      publicationStatus,
    }));

  it("lists every previewable partner in roster order", () => {
    expect(directoryPeople(preview).map((person) => person.slug)).toEqual(
      people.map((person) => person.slug),
    );
  });

  it("lists only approved people at launch and never withheld ones", () => {
    const manifest = manifestWith({
      "sefiullahi-oseni": "approved",
      "ab-mahmoud": "approved",
      "aminu-sadauki": "withheld",
      "bello-aminu-abdullahi": "pending",
    });
    // Roster order, not manifest order.
    expect(
      directoryPeople(launch, manifest).map((person) => person.slug),
    ).toEqual(["ab-mahmoud", "sefiullahi-oseni"]);
    expect(
      directoryPeople(preview, manifest).map((person) => person.slug),
    ).not.toContain("aminu-sadauki");
  });

  it("is empty at launch while every profile is still pending", () => {
    expect(directoryPeople(launch)).toEqual([]);
  });

  it("feeds 'Meet more of our people' without the current person", () => {
    const listed = directoryPeople(preview).map((person) => person.slug);
    expect(
      relatedProfiles("aminu-sadauki", preview).map((person) => person.slug),
    ).toEqual(listed.filter((slug) => slug !== "aminu-sadauki"));
  });
});
