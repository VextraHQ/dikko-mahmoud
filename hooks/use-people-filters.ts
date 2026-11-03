"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  emptyFilters,
  filtersToSearch,
  readFilters,
  type DirectoryFilters,
} from "@/lib/people-directory";
import { routes } from "@/lib/routes";

// Long enough to skip most keystrokes; Safari also rejects more than about
// 100 history updates in 30 seconds.
const urlDelay = 300;

/**
 * Directory filters, kept in the URL so a filtered list can be shared.
 *
 * - The URL is read once, on load. After that the directory owns the filters,
 *   so opening a profile popup (which changes the URL to /people/slug) never
 *   resets the list or its scroll position underneath.
 * - The URL is updated with `replaceState`, after typing pauses: no history
 *   entry per keystroke, and Back still leaves the page in one step.
 * - `resetKey` changes on clear so uncontrolled fields remount with the new values.
 */
export function usePeopleFilters(
  valid: { practices: readonly string[]; roles: readonly string[] },
  searchInputId: string,
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filters, setFilters] = useState<DirectoryFilters>(() =>
    readFilters(searchParams, valid),
  );
  const [resetKey, setResetKey] = useState(0);

  // Returning from a popup can restore an earlier URL before the typing
  // debounce ran. Re-sync it from the preserved directory state on return.
  useEffect(() => {
    const timer = setTimeout(() => {
      // A profile popup is open; leave its URL alone.
      if (window.location.pathname !== routes.people) return;
      const search = filtersToSearch(filters);
      if (window.location.search === search) return;
      window.history.replaceState(null, "", `${routes.people}${search}`);
    }, urlDelay);
    return () => clearTimeout(timer);
  }, [filters, pathname]);

  function reset(next: DirectoryFilters) {
    setFilters(next);
    setResetKey((key) => key + 1);
    // Reset actions can disappear, so return focus to the search field.
    requestAnimationFrame(() =>
      document.getElementById(searchInputId)?.focus(),
    );
  }

  return {
    filters,
    setFilters,
    resetKey,
    clear: () => reset(emptyFilters),
    clearQuery: () => reset({ ...filters, query: "" }),
  };
}
