"use client";

import { useState } from "react";
import { useMediaQueryChange } from "@/hooks/use-media-query-change";
import { mediaQueries } from "@/lib/media-queries";

/** Keeps the desktop menu controlled and clears it when navigation mode changes. */
export function usePracticeMenu(onNavigate?: () => void) {
  const [value, setValue] = useState("");
  const navigate = () => {
    setValue("");
    onNavigate?.();
  };
  useMediaQueryChange(mediaQueries.desktopNavigation, () => setValue(""));
  return { value, setValue, navigate };
}
