"use client";

import { useEffect, useRef, type ComponentProps } from "react";

// Content is visible without JavaScript; only offscreen items are enhanced.
export function RevealGroup({ children, ...props }: ComponentProps<"div">) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const items = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const item = entry.target as HTMLElement;
          if (item.dataset.revealState !== "complete")
            item.dataset.revealState = "visible";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    for (const item of items) {
      if (item.getBoundingClientRect().top < window.innerHeight) continue;
      item.dataset.revealState = "pending";
      observer.observe(item);
    }
    const finish = () => {
      if (!motion.matches) return;
      observer.disconnect();
      for (const item of items) item.dataset.revealState = "complete";
    };
    motion.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", finish);
      for (const item of items) delete item.dataset.revealState;
    };
  }, []);
  return (
    <div
      ref={root}
      data-reveal-group
      {...props}
      onFocusCapture={(event) => {
        const item = (event.target as Element).closest<HTMLElement>(
          "[data-reveal]",
        );
        if (item && root.current?.contains(item))
          item.dataset.revealState = "complete";
      }}
    >
      {children}
    </div>
  );
}
