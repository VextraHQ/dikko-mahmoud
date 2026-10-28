import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  children: ReactNode;
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      {...props}
      className={cn(
        "group/marquee flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:2rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <We need a key for the Marquee component>
          key={i}
          data-marquee-track
          data-marquee-copy={i > 0 ? "true" : undefined}
          aria-hidden={i > 0 ? true : undefined}
          inert={i > 0}
          className={cn("flex shrink-0 justify-around gap-(--gap)", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]":
              pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
