"use client";

import { useEffect, useRef, useState } from "react";

/**
 * When a menu closes, focus returns to the button that opened it, which is
 * right for keyboard and screen-reader users. Radix's own return scrolls the
 * page to the sticky button on every close, so this returns focus without
 * scrolling. iOS Safari then shows the focus ring even after a tap, so the
 * button is marked `data-quiet-focus` when the last input was touch or mouse
 * and can hide the ring. Leaving the button clears the mark, and a keyboard
 * close (Escape) keeps the ring.
 */
export function useQuietFocusReturn() {
  const triggerRef = useRef<HTMLButtonElement>(null);
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
      onCloseAutoFocus: (event: Event) => {
        event.preventDefault();
        triggerRef.current?.focus({ preventScroll: true });
        setQuiet(usedPointer.current);
      },
    },
    triggerProps: {
      ref: triggerRef,
      "data-quiet-focus": quiet || undefined,
      onBlur: () => setQuiet(false),
    },
  };
}
