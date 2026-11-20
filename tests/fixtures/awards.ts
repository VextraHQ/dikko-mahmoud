import type { Award } from "@/content/awards";
import type { PublicationStatus } from "@/lib/publication";

export function makeAward(
  id: string,
  year: number,
  publicationStatus: PublicationStatus = "approved",
  recipient: Award["recipient"] = { type: "firm" },
): Award {
  return {
    id,
    title: `Example award ${id}`,
    year,
    awardingBody: "Example awarding body",
    recipient,
    publicationStatus,
  };
}
