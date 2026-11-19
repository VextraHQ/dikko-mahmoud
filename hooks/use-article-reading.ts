"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { readingProgress } from "@/lib/insights/article";
import { scrollToPageTop } from "@/lib/scroll";

// The ring's path length is 1, so the part still to read is 1 - progress.
function paintRing(ring: SVGCircleElement | null, progress: number): void {
  ring?.style.setProperty("stroke-dashoffset", String(1 - progress));
}

/** Reading progress, back-to-top visibility and the active contents entry.
 * Progress is written straight onto the ring (`ringRef`), so scrolling never
 * re-renders the prose; ResizeObserver keeps it right as fonts and images
 * load. */
export function useArticleReading(ids: readonly string[]): {
  bodyRef: React.RefObject<HTMLElement | null>;
  ringRef: (ring: SVGCircleElement | null) => void;
  visible: boolean;
  active: string;
  select: (id: string) => void;
  returnToTop: () => void;
} {
  const bodyRef = useRef<HTMLElement | null>(null);
  const progress = useRef(0);
  const ring = useRef<SVGCircleElement | null>(null);
  // The ring only exists while the button shows, so paint it as it appears.
  const ringRef = useCallback((node: SVGCircleElement | null) => {
    ring.current = node;
    paintRing(node, progress.current);
  }, []);
  const [visible, setVisible] = useState(false);
  const { active, select } = useActiveSection(ids);
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const rect = body.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      progress.current = readingProgress(
        window.scrollY,
        start,
        start + rect.height,
        window.innerHeight,
      );
      paintRing(ring.current, progress.current);
      setVisible(
        window.scrollY > 350 &&
          document.documentElement.scrollHeight > window.innerHeight * 1.3,
      );
    };
    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return (): void => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  const returnToTop = (): void => scrollToPageTop("article-heading");
  return { bodyRef, ringRef, visible, active, select, returnToTop };
}
