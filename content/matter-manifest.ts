import {
  isPublishable,
  type PreviewOptions,
  type PublicationStatus,
} from "@/lib/publication";

export type MatterManifestEntry = {
  id: string;
  publicationStatus: PublicationStatus;
};

// IDs and approval only: safe for shared navigation/route client bundles.
// Source-backed names and instruction bodies stay in server content modules.
export const matterManifest: readonly MatterManifestEntry[] = [
  { id: "bureau-public-enterprises", publicationStatus: "pending" },
  { id: "central-bank-nigeria", publicationStatus: "pending" },
  { id: "kano-state-government", publicationStatus: "pending" },
  { id: "nnpc-npdc", publicationStatus: "pending" },
];

export function matterStatus(id: string, manifest = matterManifest) {
  return manifest.find((entry) => entry.id === id)?.publicationStatus;
}

export function availableMatterIds(
  options: PreviewOptions,
  manifest = matterManifest,
) {
  return manifest
    .filter((entry) => isPublishable(entry.publicationStatus, options))
    .map((entry) => entry.id);
}
