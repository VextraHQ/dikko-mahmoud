"use client";

import { useEffect, useRef, useState } from "react";

/**
 * When a menu closes, Radix returns focus to the button that opened it, which
 * is right for keyboard and screen-reader users. iOS Safari then shows the
 * focus ring even after a tap. This keeps focus on the button but marks it
 * `data-quiet-focus` when the last input was touch or mouse, so the button
 * can hide the ring. Leaving the button clears the mark, and a keyboard close
 * (Escape) keeps the ring.
 */
export function useQuietFocusReturn() {
  const usedPointer = useRef(false);
  const [quiet, setQuiet] = useState(false);

  // Window capture listeners run before Radix's own Escape handling.
  useEffect(() => {
    const pointer = () => (usedPointer.current = true);
    const key = () => (usedPointer.current = false);
    window.addEventListener("pointerdown", pointer, true);
    window.addEventListener("keydown", key, true);
    return () => {
      window.removeEventListener("pointerdown", pointer, true);
      window.removeEventListener("keydown", key, true);
    };
  }, []);

  return {
    contentProps: {
      onCloseAutoFocus: () => setQuiet(usedPointer.current),
    },
    triggerProps: {
      "data-quiet-focus": quiet || undefined,
      onBlur: () => setQuiet(false),
    },
  };
}
