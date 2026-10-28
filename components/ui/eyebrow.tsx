import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = Pick<
  ComponentProps<"p">,
  "children" | "className" | "id"
> & {
  as?: "p" | "h2";
};

export function Eyebrow({ as: Tag = "p", className, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "text-primary text-[11px]/4 font-bold tracking-widest uppercase",
        className,
      )}
      {...props}
    />
  );
}
