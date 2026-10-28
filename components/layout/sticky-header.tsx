"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function StickyHeader({ children }: { children: ReactNode }) {
  const marker = useRef<HTMLDivElement>(null);
  // Keep a readable shell until scroll enhancement is ready (also the no-JS fallback).
  const [scrolled, setScrolled] = useState<boolean | null>(null);
  useEffect(() => {
    if (!marker.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div
        aria-hidden="true"
        className="bg-primary pointer-events-none absolute inset-x-0 top-0 h-22 lg:hidden"
      />
      <div
        ref={marker}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 h-px w-px"
      />
      <header
        data-site-header
        data-scrolled={scrolled ?? undefined}
        className="sticky top-0 z-40 text-white lg:h-0"
      >
        <div className="mx-auto w-full max-w-360 px-4 pt-3 sm:px-8 xl:px-20 xl:pt-5">
          <div className="site-header-surface relative isolate rounded-full">
            {children}
          </div>
        </div>
      </header>
    </>
  );
}
