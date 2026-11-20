import { awardRecords, firmAwards, type Award } from "@/content/awards";
import { getPerson } from "@/content/people";
import { availableProfileSlugs } from "@/lib/people/roster";
import { isPublishable, type PreviewOptions } from "@/lib/publication";

export type AwardEntry = {
  id: string;
  /** The year, or the "Year" label on a preview slot. */
  year: string;
  title: string;
  awardingBody: string;
  recipient?: string;
  /** Set only while the recipient's profile may be linked. */
  recipientSlug?: string;
  image?: { src: string; alt: string };
  pending: boolean;
};

/**
 * Publishable awards, newest year first; awards from the same year keep their
 * record order. An award for a person missing from the roster is left out
 * rather than shown without a recipient.
 */
export function newestAwards(
  options: PreviewOptions,
  records: readonly Award[] = awardRecords,
): AwardEntry[] {
  const linkable = new Set(availableProfileSlugs(options));
  return records
    .filter((award) => isPublishable(award.publicationStatus, options))
    .toSorted((a, b) => b.year - a.year)
    .flatMap((award) => {
      const base = {
        id: award.id,
        year: String(award.year),
        title: award.title,
        awardingBody: award.awardingBody,
        image: award.image,
        pending: award.publicationStatus !== "approved",
      };
      if (award.recipient.type === "firm")
        return [{ ...base, recipient: firmAwards.firmRecipient }];
      const person = getPerson(award.recipient.personId);
      if (!person) return [];
      return [
        {
          ...base,
          recipient: person.name,
          recipientSlug: linkable.has(person.slug) ? person.slug : undefined,
        },
      ];
    });
}

/**
 * What an awards list shows: up to `limit` awards, or, in the no-index preview
 * while no award can show, `slots` labelled placeholders. Empty on the public
 * site until the firm's awards are approved.
 */
export function awardList(
  options: PreviewOptions,
  { limit = Infinity, slots }: { limit?: number; slots: number },
  records: readonly Award[] = awardRecords,
): AwardEntry[] {
  const awards = newestAwards(options, records);
  if (awards.length) return awards.slice(0, limit);
  if (!options.allowPreview) return [];
  return Array.from({ length: slots }, (_, index) => ({
    id: `slot-${index + 1}`,
    year: firmAwards.slot.year,
    title: firmAwards.slot.title,
    awardingBody: firmAwards.slot.awardingBody,
    pending: false,
  }));
}
