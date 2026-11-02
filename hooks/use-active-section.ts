"use client";

import { useEffect, useState } from "react";

/**
 * The id of the section currently being read, for an "On this page" list.
 * A section counts as current once its top passes a line about a third of the
 * way down the viewport; before any does, the first one is current, and at the
 * very bottom the last one is (a short final section may never reach the line).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(" ");

  useEffect(() => {
    const sections = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!sections.length) return;

    const update = () => {
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

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key]);

  return active;
}
