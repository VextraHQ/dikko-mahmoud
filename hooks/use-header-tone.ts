"use client";

import { createContext, useContext } from "react";

/**
 * The header's live tone. `StickyHeader` provides it as the header changes
 * over dark and light sections, so controls inside it (the enquiry button)
 * pick matching colours instead of guessing from the page.
 */
export const HeaderToneContext = createContext<"light" | "dark">("dark");

export function useHeaderTone() {
  return useContext(HeaderToneContext);
}
