"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether the page has scrolled past a marker element. Returns `null`
 * until the observer is ready, so the no-JS state can stay as the default.
 */
export function useScrolledPast<T extends HTMLElement>() {
  const markerRef = useRef<T>(null);
  const [scrolled, setScrolled] = useState<boolean | null>(null);

  useEffect(() => {
    if (!markerRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(markerRef.current);
    return () => observer.disconnect();
  }, []);

  return { markerRef, scrolled };
}
