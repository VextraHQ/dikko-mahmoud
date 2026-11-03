import type { PublicationStatus } from "@/lib/publication";

export type ProfileManifestEntry = {
  personId: string;
  publicationStatus: PublicationStatus;
};

// Public: canonical IDs and review status only, safe for the route registry and
// client bundles. Biography bodies live in content/profiles.ts (server only);
// the rules that read this list live in lib/people/roster.ts.
// All four are source-backed drafts awaiting firm confirmation.
export const profileManifest: readonly ProfileManifestEntry[] = [
  { personId: "ab-mahmoud", publicationStatus: "pending" },
  { personId: "bello-aminu-abdullahi", publicationStatus: "pending" },
  { personId: "aminu-sadauki", publicationStatus: "pending" },
  { personId: "sefiullahi-oseni", publicationStatus: "pending" },
];
