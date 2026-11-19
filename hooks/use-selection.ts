"use client";

import { useState } from "react";

/**
 * Single selection within a list that also remembers the item chosen before,
 * so a new picture can fade in over the previous one. `changed` stays false
 * until the visitor first picks something, so nothing animates on page load.
 */
export function useSelection(firstId: string) {
  const [selection, setSelection] = useState({
    id: firstId,
    previousId: "",
    changed: false,
  });

  function select(id: string) {
    setSelection((current) => ({
      id,
      previousId: current.id,
      changed: true,
    }));
  }

  return { ...selection, select };
}
