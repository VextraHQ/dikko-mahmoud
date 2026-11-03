import { approvedRecords, type PublicationStatus } from "@/lib/publication";
import { hasText } from "@/lib/content";

// Anonymous slots only: replace with approved client names and local logo assets.
export const selectedClients = {
  eyebrow: "Organisations we have worked with",
  heading: "Selected clients.",
  description:
    "Experience across businesses and institutions, from ongoing legal advice to litigation.",
  reviewNote: "Client list and logos under review.",
  placeholderLabel: "Preview",
  slots: Array.from({ length: 12 }, (_, index) => ({
    id: `client-${index + 1}`,
    name: null as string | null,
    publicationStatus: "pending" as PublicationStatus,
    logo: null as string | null,
  })),
};

/** Only named, approved clients render; preview slots never substitute for consent. */
export function publishableClients(
  items: readonly (typeof selectedClients.slots)[number][],
) {
  return approvedRecords(items).filter((client) => hasText(client.name));
}

export const visibleClients = publishableClients(selectedClients.slots);
