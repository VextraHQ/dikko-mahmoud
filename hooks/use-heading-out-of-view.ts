"use client";

import { useEffect, useState } from "react";

/**
 * Whether the `[data-profile-heading]` inside a scroll container has scrolled
 * above its top edge. Lets a dialog's bar show a compact title only once the
 * real heading is out of view. Uses a callback ref because portalled dialog
 * content mounts a commit after its owner.
 */
export function useHeadingOutOfView<T extends HTMLElement>() {
  const [root, setRoot] = useState<T | null>(null);
  const [outOfView, setOutOfView] = useState(false);

  useEffect(() => {
    const heading = root?.querySelector("[data-profile-heading]");
    if (!root || !heading || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setOutOfView(
          !entry.isIntersecting &&
            entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0),
        ),
      { root },
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, [root]);

  return { scrollRef: setRoot, outOfView };
}
