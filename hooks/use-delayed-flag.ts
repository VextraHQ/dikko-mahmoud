"use client";

import { useEffect, useState } from "react";

/**
 * True only once `active` has stayed true for `delay` ms. Quick updates then
 * show no loading state at all, so the page doesn't flicker on every click.
 */
export function useDelayedFlag(active: boolean, delay = 400) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setShown(true), delay);
    return () => {
      clearTimeout(timer);
      setShown(false);
    };
  }, [active, delay]);

  return active && shown;
}
