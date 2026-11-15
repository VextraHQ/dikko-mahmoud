import { Slottable } from "@radix-ui/react-slot";
import { ArrowUpRight, LoaderCircle, type LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ArrowButtonProps = Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  variant?: "default" | "inverse" | "glass";
  size?: "sm" | "default" | "lg";
  icon?: LucideIcon;
  /** While an action runs, the arrow becomes a turning loader. */
  busy?: boolean;
};

export function ArrowButton({
  children,
  variant = "default",
  size = "default",
  icon: Icon = ArrowUpRight,
  busy = false,
  className,
  ...props
}: ArrowButtonProps) {
  const Shown = busy ? LoaderCircle : Icon;
  return (
    <Button
      {...props}
      aria-busy={busy || undefined}
      variant={variant}
      size={size}
      className={cn(
        "py-1 pr-1 pl-4.5",
        size === "sm" && "gap-2 pl-4",
        className,
      )}
    >
      <Slottable>{children}</Slottable>
      <span
        aria-hidden="true"
        data-slot="button-arrow"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full",
          size === "sm" ? "size-8" : size === "lg" ? "size-11" : "size-10",
          variant === "inverse"
            ? "bg-secondary text-white"
            : "text-secondary bg-white",
        )}
      >
        <Shown
          strokeWidth={1.5}
          className={cn(
            "size-5",
            busy
              ? "motion-safe:animate-spin"
              : "motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/button:translate-x-0.5 motion-safe:group-focus-visible/button:translate-x-0.5",
            Shown === ArrowUpRight &&
              "motion-safe:group-hover/button:-translate-y-0.5 motion-safe:group-focus-visible/button:-translate-y-0.5",
          )}
        />
      </span>
    </Button>
  );
}
