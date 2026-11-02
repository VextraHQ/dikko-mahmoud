export { selectedMatters } from "@/content/matter-copy";
import { approvedRecords, type PublicationStatus } from "@/lib/publication";
import { hasText } from "@/lib/content";

export type SelectedMatter = {
  id: string;
  publicationStatus: PublicationStatus;
  category: string;
  /** Large card headline: a key figure or short theme. */
  headline: string;
  organisation: string;
  topic: string;
  summary: string;
  qualifier: string;
};

// User-approved preview copy, drawn from the screenshots and the firm's
// published experience: https://dikkoandmahmoud.com/experiences/
// Card copy follows the user's selected-matters design (30 Oct 2026).
export const matterRecords: SelectedMatter[] = [
  {
    id: "bureau-public-enterprises",
    publicationStatus: "pending",
    category: "International arbitration",
    headline: "$1.37bn",
    organisation: "Bureau of Public Enterprises",
    topic: "Claim value in a UNCITRAL arbitration",
    summary: "Our role: lead counsel in the arbitration.",
    qualifier: "Claim value · not an award or recovery",
  },
  {
    id: "central-bank-nigeria",
    publicationStatus: "pending",
    category: "Public-sector advisory",
    headline: "Public-sector advisory",
    organisation: "Central Bank of Nigeria",
    topic: "Federal Government revenue",
    summary:
      "Legal advisers on Federal Government revenue under oil-industry Production Sharing Contracts.",
    qualifier: "Representative experience · advisory",
  },
  {
    id: "kano-state-government",
    publicationStatus: "pending",
    category: "Settlement & government advisory",
    headline: "Complex settlements",
    organisation: "Kano State Government",
    topic: "Government advisory and negotiations",
    summary:
      "Counsel in settlement negotiations connected to the Pfizer Trovan clinical trial and electricity-sector privatisation.",
    qualifier: "Representative experience · settlement",
  },
  {
    id: "nnpc-npdc",
    publicationStatus: "pending",
    category: "Energy & commercial contracts",
    headline: "Energy & commercial",
    organisation: "NNPC / NPDC",
    topic: "OML 12 and gas-sector mandates",
    summary:
      "Representation on OML 12 matters and contract novation work involving gas-sector entities.",
    qualifier: "Representative experience · energy",
  },
];

/** A source citation is not publication permission. */
export function publishableMatters(items: readonly SelectedMatter[]) {
  return approvedRecords(items).filter(
    (matter) => hasText(matter.organisation) && hasText(matter.summary),
  );
}
export const visibleMatters = publishableMatters(matterRecords);
