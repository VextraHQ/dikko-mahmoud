"use client";

import type { ComponentProps } from "react";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"a">, "href"> & {
  /** Id of the section on this page. */
  sectionId: string;
  /** Called after a click, e.g. to mark the link active straight away. */
  onNavigate?: (id: string) => void;
};

/** "On this page" link: a real hash link that scrolls smoothly when clicked. */
export function SectionLink({
  sectionId,
  onNavigate,
  onClick,
  className,
  ...props
}: Props) {
  return (
    <a
      {...props}
      href={`#${sectionId}`}
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
        if (!scrollToSection(sectionId)) return;
        event.preventDefault();
        onNavigate?.(sectionId);
      }}
    />
  );
}
