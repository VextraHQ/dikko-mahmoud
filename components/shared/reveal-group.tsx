"use client";

import type { ComponentProps } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

// Content is visible without JavaScript; only offscreen items are enhanced.
export function RevealGroup({ children, ...props }: ComponentProps<"div">) {
  const { rootRef, onFocusCapture } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={rootRef}
      data-reveal-group
      {...props}
      onFocusCapture={onFocusCapture}
    >
      {children}
    </div>
  );
}
