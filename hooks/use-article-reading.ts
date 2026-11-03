"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValue } from "motion/react";
import { useActiveSection } from "@/hooks/use-active-section";
import { readingProgress } from "@/lib/insights/article";
import { scrollToPageTop } from "@/lib/scroll";

/** Reading progress, back-to-top visibility and the active contents entry.
 * The progress MotionValue updates the ring without re-rendering the prose;
 * ResizeObserver keeps it right as fonts and images load. */
export function useArticleReading(ids: readonly string[]): {
  bodyRef: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  visible: boolean;
  active: string;
  select: (id: string) => void;
  returnToTop: () => void;
} {
  const bodyRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);
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
      progress.set(
        readingProgress(
          window.scrollY,
          start,
          start + rect.height,
          window.innerHeight,
        ),
      );
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
  }, [progress]);
  const returnToTop = (): void => scrollToPageTop("article-heading");
  return { bodyRef, progress, visible, active, select, returnToTop };
}
