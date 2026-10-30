"use client";

import { useState } from "react";

/**
 * Single selection within an ordered list that also remembers which way it
 * moved (1 = forward, -1 = back), so transitions can slide the right way.
 * `animate` stays false until the first user selection.
 */
export function useDirectionalSelection(ids: readonly string[]) {
  const [selection, setSelection] = useState({
    id: ids[0] ?? "",
    direction: 1,
    animate: false,
  });

  function select(id: string) {
    setSelection((previous) => ({
      id,
      direction: ids.indexOf(id) >= ids.indexOf(previous.id) ? 1 : -1,
      animate: true,
    }));
  }

  return { ...selection, select };
}
