import {
  isPublishable,
  type PreviewOptions,
  type PublicationStatus,
} from "@/lib/publication";

type AwardRecipient = { type: "firm" } | { type: "person"; personId: string };

/** One award. The fields match the future Sanity `award` document. */
export type Award = {
  id: string;
  title: string;
  year: number;
  awardingBody: string;
  recipient: AwardRecipient;
  /** A photo with a recorded source and rights; the branded cover shows without one. */
  image?: { src: string; alt: string };
  category?: string;
  link?: string;
  publicationStatus: PublicationStatus;
};

// Empty until the firm supplies its awards. Never add an award, name, date or
// awarding body that the firm hasn't confirmed.
export const awardRecords: readonly Award[] = [];

export function availableAwardIds(
  options: PreviewOptions,
  records: readonly Award[] = awardRecords,
) {
  return records
    .filter((award) => isPublishable(award.publicationStatus, options))
    .map((award) => award.id);
}

export const firmAwards = {
  eyebrow: "Awards and recognition",
  heading: ["Celebrating the achievements of our", "people and our firm."],
  listEyebrow: "Milestones of recognition",
  listHeading: "Honours through the years.",
  introduction: "Awards recognising our people and our practice.",
  note: {
    heading: "About these awards",
    text: "Each award identifies the recipient, year and awarding organisation.",
  },
  firmRecipient: "The firm",
  awardedBy: "Awarded by",
  selectHint: "Select an award to view its photograph.",
  moreAction: "Show more awards",
  pendingNote: "Some awards are awaiting the firm's approval.",
  /** Labels for the no-index preview while there are no records. */
  slot: {
    year: "Year",
    title: "Award title",
    awardingBody: "[Awarding body]",
  },
  limit: 3,
};

export const awardsArchive = {
  title: "Awards",
  home: "Home",
  firm: "The Firm",
  eyebrow: "Awards and recognition",
  heading: "Honours through the years.",
  introduction: "Awards recognising our people and our practice, newest first.",
  slotCount: 6,
};
