"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live media-query match. `serverValue` is used for server rendering and the
 * first hydration paint, so pick the value that is safest without JavaScript.
 */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
