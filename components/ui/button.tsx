import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-3 rounded-full border border-transparent text-base/6 font-semibold whitespace-nowrap transition-colors duration-180 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-secondary active:bg-navy-deep",
        inverse:
          "bg-white text-secondary hover:bg-slate-50 active:bg-slate-100",
        glass:
          "border-white/18 bg-white/12 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/22 active:bg-white/28",
        ghost: "text-inherit hover:bg-white/12 active:bg-white/20",
        muted:
          "bg-slate-100 text-secondary hover:bg-slate-200 active:bg-slate-300",
      },
      size: {
        default: "h-12 px-5",
        lg: "h-13 px-5",
        icon: "size-11 p-0 [&_svg]:size-5",
      },
      trailingArrow: { true: "py-1 pr-1 pl-[18px]" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  trailingArrow = false,
  type,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      type={asChild ? undefined : (type ?? "button")}
      className={cn(
        buttonVariants({ variant, size, trailingArrow }),
        className,
      )}
      {...props}
    />
  );
}

export function ButtonArrow({
  inverse = false,
  large = false,
}: {
  inverse?: boolean;
  large?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        large ? "size-11" : "size-10",
        inverse ? "bg-secondary text-white" : "text-secondary bg-white",
      )}
    >
      <ArrowUpRight className="size-5" strokeWidth={1.5} />
    </span>
  );
}
