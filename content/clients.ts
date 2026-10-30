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
    logo: null as string | null,
  })),
};

/** Clients with an approved name. */
export const namedClients = selectedClients.slots.filter((client) =>
  hasText(client.name),
);

/** Anonymous samples remain only while the whole collection is under review. */
export const visibleClients = namedClients.length
  ? namedClients
  : selectedClients.slots;
