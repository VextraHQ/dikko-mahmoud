"use client";
import { useState } from "react";
import { initialRecordIndex } from "@/lib/publication";

/** Selection survives list changes only while its approved record remains present. */
export function useMatterSelection(
  items: readonly { id: string }[],
  preferredId: string,
) {
  const [id, setId] = useState<string | null>(null);
  const requested = id ? items.findIndex((item) => item.id === id) : -1;
  return {
    selected:
      requested >= 0 ? requested : initialRecordIndex(items, preferredId),
    select: (index: number) => setId(items[index]?.id ?? null),
  };
}
