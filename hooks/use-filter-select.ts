"use client";

import { useState } from "react";
import { useMediaQueryChange } from "@/hooks/use-media-query-change";
import { mediaQueries } from "@/lib/media-queries";

/**
 * Open state for a filter shown as a menu on desktop and a sheet on phones.
 * Both are rendered and CSS picks one, so the page never swaps controls after
 * loading. They keep separate open states so opening one never opens the
 * hidden other; crossing the breakpoint closes both.
 */
export function useFilterSelect(onChange?: (value: string) => void): {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  select: (value: string) => void;
} {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  useMediaQueryChange(mediaQueries.desktop, () => {
    setMenuOpen(false);
    setSheetOpen(false);
  });

  function select(value: string): void {
    setMenuOpen(false);
    setSheetOpen(false);
    onChange?.(value);
  }

  return { menuOpen, setMenuOpen, sheetOpen, setSheetOpen, select };
}
