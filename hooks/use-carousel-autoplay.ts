"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCarousel } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mediaQueries } from "@/lib/media-queries";

/**
 * Drives Embla's Autoplay plugin with accessible pause rules (WCAG 2.2.2):
 * - hovering the controls (marked `data-autoplay-hold`) or scrolling out of
 *   view holds the countdown where it is and continues with the remaining
 *   time afterwards; resting the cursor elsewhere on the hero does not
 * - a hidden browser tab pauses and restarts the slide (plugin built-in)
 * - the pause button, any manual navigation, a drag or keyboard focus
 *   entering the carousel stops it until the visitor presses play
 * - reduced motion never autoplays
 * Must run inside <Carousel> created with the Autoplay plugin.
 */
export function useCarouselAutoplay() {
  const { api } = useCarousel();
  const reducedMotion = useMediaQuery(mediaQueries.reducedMotion, true);
  const [stoppedByVisitor, setStoppedByVisitor] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  // Changes each time a fresh countdown starts, to restart the progress fill.
  const [cycle, setCycle] = useState(0);
  // Time left on a held countdown, so it can continue rather than restart.
  const remaining = useRef<number | null>(null);

  const enabled = !reducedMotion && !stoppedByVisitor;
  const running = enabled && !hovered && inView;
  const autoplay = api?.plugins().autoplay;
  const delay =
    typeof autoplay?.options.delay === "number" ? autoplay.options.delay : 0;

  useEffect(() => {
    if (!api) return;
    const onTimer = () => setCycle((value) => value + 1);
    const onDrag = () => setStoppedByVisitor(true);
    api.on("autoplay:timerset", onTimer).on("pointerDown", onDrag);
    return () => {
      api.off("autoplay:timerset", onTimer).off("pointerDown", onDrag);
    };
  }, [api]);

  // Control hover, keyboard focus, manual controls and visibility.
  useEffect(() => {
    const root = api?.rootNode().closest<HTMLElement>('[data-slot="carousel"]');
    if (!root) return;
    const isHold = (node: EventTarget | null) =>
      node instanceof Element && node.closest("[data-autoplay-hold]") !== null;
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setHovered(isHold(event.target));
    };
    const onOut = (event: PointerEvent) => {
      if (!isHold(event.relatedTarget)) setHovered(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if ((event.target as Element).matches(":focus-visible"))
        setStoppedByVisitor(true);
    };
    const onClick = (event: MouseEvent) => {
      const control = (event.target as Element).closest("button, a");
      if (control && !control.hasAttribute("data-autoplay-toggle"))
        setStoppedByVisitor(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        setStoppedByVisitor(true);
    };
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(root);
    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerout", onOut);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKeyDown);
    return () => {
      observer.disconnect();
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerout", onOut);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeyDown);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !autoplay) return;
    if (!running) {
      // Hold: keep the time left. A visitor stop discards it.
      if (autoplay.isPlaying()) remaining.current = autoplay.timeUntilNext();
      autoplay.stop();
      if (!enabled) remaining.current = null;
      return;
    }
    const left = remaining.current;
    remaining.current = null;
    if (left === null) {
      autoplay.play();
      return;
    }
    // Finish the held countdown, then hand back to the plugin's timer.
    const startedAt = Date.now();
    const timer = window.setTimeout(() => {
      api.scrollNext();
      autoplay.play();
    }, left);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, left - (Date.now() - startedAt));
    };
  }, [api, autoplay, enabled, running]);

  const toggle = useCallback(() => {
    // Pressing play is explicit: start now even though the mouse is over it.
    if (stoppedByVisitor) setHovered(false);
    setStoppedByVisitor(!stoppedByVisitor);
  }, [stoppedByVisitor]);

  return {
    /** False when reduced motion is on; hide the toggle then. */
    available: !reducedMotion && Boolean(autoplay),
    /** The visitor's choice: true unless paused or taken over. */
    enabled,
    /** Counting down now; false while held by control hover or off-screen. */
    running,
    cycle,
    delay,
    toggle,
  };
}
