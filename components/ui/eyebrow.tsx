import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = Pick<
  ComponentProps<"p">,
  "children" | "className" | "id"
> & {
  as?: "p" | "h2" | "h3";
};

/**
 * The one small-caps label style. Use `Eyebrow` for a plain label; reuse this
 * class string when the label must be another element (`dt`, `legend`,
 * `span`). Pass a colour class such as `text-muted-foreground` to quieten it.
 */
export const eyebrowClass =
  "text-primary text-[11px]/4 font-bold tracking-widest uppercase";

export function Eyebrow({ as: Tag = "p", className, ...props }: EyebrowProps) {
  return <Tag className={cn(eyebrowClass, className)} {...props} />;
}
