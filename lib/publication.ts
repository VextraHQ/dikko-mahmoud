export type PublicationStatus = "pending" | "approved" | "withheld";

/** Missing approval always fails closed, including older imported records. */
export function approvedRecords<
  T extends { publicationStatus?: PublicationStatus },
>(items: readonly T[]): T[] {
  return items.filter((item) => item.publicationStatus === "approved");
}

/** Keep a requested opening selection only if it survived publication filtering. */
export function initialRecordIndex(
  items: readonly { id: string }[],
  preferredId: string,
) {
  return Math.max(
    0,
    items.findIndex((item) => item.id === preferredId),
  );
}
