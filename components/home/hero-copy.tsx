"use client";

import type { ComponentProps } from "react";
import { useCarousel } from "@/components/ui/carousel";

export function HeroCopy({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: ComponentProps<"fieldset">["children"];
}) {
  const { selectedIndex } = useCarousel();
  const active = selectedIndex === index;
  return (
    <fieldset
      className="pointer-events-auto col-start-1 row-start-1 min-w-0"
      data-hero-copy
      data-active={active}
      aria-roledescription="slide"
      aria-hidden={!active}
      inert={!active}
    >
      <legend className="sr-only">{label}</legend>
      {children}
    </fieldset>
  );
}
