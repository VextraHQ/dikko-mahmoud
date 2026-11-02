"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Route-backed profile dialog. Closing (button, Escape, overlay) goes back
 * through the intercepted history entry, so browser Back closes and Forward
 * reopens. Route dialogs have no co-located trigger, so on unmount focus
 * returns to the origin page's card for this profile when it is still there.
 */
export function useProfileDialog(href?: string) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  // Captured on first render, before Radix moves focus into the dialog. The
  // link that opened it is usually still focused; a page can hold several
  // links to one profile (e.g. practice pages). Safari doesn't focus on click.
  const [opener] = useState(() =>
    typeof document === "undefined" ? null : document.activeElement,
  );

  useEffect(() => {
    closing.current = false;
    if (!href) return;
    // A task (not a frame) so it also runs in background tabs, after Radix's
    // own unmount focus, which onCloseAutoFocus prevents.
    return () => {
      setTimeout(() => {
        const links = document.querySelectorAll<HTMLElement>(
          `#main-content a[href="${CSS.escape(href)}"]`,
        );
        const card =
          [...links].find((link) => link === opener) ??
          [...links].find((link) => link.getClientRects().length > 0);
        card?.focus({ preventScroll: true });
      }, 0);
    };
  }, [href, opener]);

  return {
    contentRef,
    close() {
      if (closing.current) return;
      closing.current = true;
      router.back();
    },
    /** Long dialogs start at their heading rather than the first control. */
    focusHeading(event: Event) {
      const heading = contentRef.current?.querySelector<HTMLElement>(
        "[data-profile-heading]",
      );
      if (!heading) return;
      event.preventDefault();
      heading.focus({ preventScroll: true });
    },
  };
}
