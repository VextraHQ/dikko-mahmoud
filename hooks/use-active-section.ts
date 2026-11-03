"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The id of the section currently being read, for an "On this page" list.
 * A section counts as current once its top passes a line about a third of the
 * way down the viewport; before any does, the first one is current, and at the
 * very bottom the last one is (a short final section may never reach the line).
 *
 * `select(id)` marks a clicked link active at once and holds it until the
 * smooth scroll settles, so the highlight does not flicker through every
 * section on the way.
 */
export function useActiveSection(ids: readonly string[]): {
  active: string;
  select: (id: string) => void;
} {
  const [active, setActive] = useState(ids[0] ?? "");
  const held = useRef(false);
  const release = useRef<ReturnType<typeof setTimeout>>(undefined);
  const key = ids.join(" ");

  useEffect(() => {
    const sections = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!sections.length) return;

    const update = (): void => {
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }
      setActive((atBottom ? sections[sections.length - 1] : current).id);
    };
    const onScroll = (): void => {
      if (!held.current) return update();
      // Still scrolling towards a clicked section: wait until it stops.
      clearTimeout(release.current);
      release.current = setTimeout(() => {
        held.current = false;
      }, 150);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return (): void => {
      clearTimeout(release.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [key]);

  function select(id: string): void {
    held.current = true;
    clearTimeout(release.current);
    // Released by the scroll handler; this covers a click that needs no scroll.
    release.current = setTimeout(() => {
      held.current = false;
    }, 1000);
    setActive(id);
  }

  return { active, select };
}
