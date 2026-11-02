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

export type PreviewOptions = { allowPreview: boolean };

/**
 * Approved records always publish. Pending records render only when the server
 * boundary explicitly allows a no-index preview. Withheld or missing never do.
 */
export function isPublishable(
  status: PublicationStatus | undefined,
  { allowPreview }: PreviewOptions,
) {
  return status === "approved" || (allowPreview && status === "pending");
}
