import { Slottable } from "@radix-ui/react-slot";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
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
};

export function ArrowButton({
  children,
  variant = "default",
  size = "default",
  icon: Icon = ArrowUpRight,
  className,
  ...props
}: ArrowButtonProps) {
  return (
    <Button
      {...props}
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
        <Icon
          strokeWidth={1.5}
          className={cn(
            "size-5 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/button:translate-x-0.5",
            Icon === ArrowUpRight &&
              "motion-safe:group-hover/button:-translate-y-0.5",
          )}
        />
      </span>
    </Button>
  );
}
