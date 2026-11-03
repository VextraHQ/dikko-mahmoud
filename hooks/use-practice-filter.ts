"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMediaQueryChange } from "@/hooks/use-media-query-change";
import { mediaQueries } from "@/lib/media-queries";

/** One selection rule for the desktop menu and the mobile sheet. */
export function usePracticeFilter(onChange?: (practice: string) => void) {
  const desktop = useMediaQuery(mediaQueries.desktop);
  const [open, setOpen] = useState(false);
  useMediaQueryChange(mediaQueries.desktop, () => setOpen(false));

  function select(practice: string) {
    setOpen(false);
    onChange?.(practice);
  }

  return { desktop, open, setOpen, select };
}
