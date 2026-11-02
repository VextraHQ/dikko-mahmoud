import { routes } from "@/lib/routes";
import { hasText } from "@/lib/content";
import type { PublicationStatus } from "@/lib/publication";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};
export type LegalDocument = {
  key: "privacy" | "terms";
  title: string;
  description: string;
  path: string;
  publicationStatus: PublicationStatus;
  approvedUpdatedAt: string | null;
  sections: LegalSection[];
};
export const legalDocuments: LegalDocument[] = [
  {
    key: "privacy",
    title: "Privacy Policy",
    description: "Privacy information for the Dikko & Mahmoud website.",
    path: routes.privacy,
    publicationStatus: "pending",
    approvedUpdatedAt: null,
    sections: [],
  },
  {
    key: "terms",
    title: "Terms of Use",
    description: "Terms for using the Dikko & Mahmoud website.",
    path: routes.terms,
    publicationStatus: "pending",
    approvedUpdatedAt: null,
    sections: [],
  },
];
/** Throws a clear error, rather than crashing later, if a key goes missing. */
export function getLegalDocument(key: LegalDocument["key"]) {
  const document = legalDocuments.find((item) => item.key === key);
  if (!document) throw new Error(`Legal document "${key}" is not defined.`);
  return document;
}
export const legalCopy = {
  eyebrow: "Legal information",
  navHeading: "Legal documents",
  pendingHeading: "Text awaiting firm approval",
  pendingDescription:
    "This page is a presentation preview. The firm’s approved text will appear here once supplied and confirmed.",
  datePending: "Update date awaiting firm approval",
  updatedLabel: "Last updated",
  homeLabel: "Home",
};
/** Draft text and dates never appear merely because they were entered. */
export function legalPresentation(document: LegalDocument) {
  const approved = document.publicationStatus === "approved";
  const date = document.approvedUpdatedAt;
  const validDate =
    date &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(Date.parse(`${date}T00:00:00Z`)) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  return {
    sections: approved
      ? document.sections.filter(
          (section) =>
            hasText(section.title) &&
            (section.paragraphs.some(hasText) ||
              section.bullets?.some(hasText)),
        )
      : [],
    updatedAt: approved && validDate ? date : null,
  };
}
