import { getPerson } from "@/content/people";
import {
  isPublishable,
  type PreviewOptions,
  type PublicationStatus,
} from "@/lib/publication";

type ProfileManifestEntry = {
  personId: string;
  publicationStatus: PublicationStatus;
};

// Public: canonical IDs and review status only, safe for the route registry and
// client bundles. Biography bodies live in content/profiles.ts (server only).
// All four are source-backed drafts awaiting firm confirmation.
export const profileManifest: readonly ProfileManifestEntry[] = [
  { personId: "ab-mahmoud", publicationStatus: "pending" },
  { personId: "bello-aminu-abdullahi", publicationStatus: "pending" },
  { personId: "aminu-sadauki", publicationStatus: "pending" },
  { personId: "sefiullahi-oseni", publicationStatus: "pending" },
];

export function profileStatus(
  personId: string,
  manifest: readonly ProfileManifestEntry[] = profileManifest,
) {
  return manifest.find((entry) => entry.personId === personId)
    ?.publicationStatus;
}

/** Slugs whose profile may be linked and routed under the given preview rule. */
export function availableProfileSlugs(
  options: PreviewOptions,
  manifest: readonly ProfileManifestEntry[] = profileManifest,
) {
  return manifest.flatMap((entry) => {
    const person = getPerson(entry.personId);
    return person && isPublishable(entry.publicationStatus, options)
      ? [person.slug]
      : [];
  });
}
