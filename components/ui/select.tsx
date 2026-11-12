"use client";

import * as Primitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Small shadcn-style composition over Radix; local field styling stays at usage.
export const Select = Primitive.Root;

export const SelectValue = Primitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group/select border-border bg-background flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-md border px-3 text-left text-base disabled:cursor-not-allowed disabled:opacity-50 [&>span:first-child]:min-w-0 [&>span:first-child]:truncate",
        className,
      )}
      {...props}
    >
      {children}
      <Primitive.Icon asChild>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/select:rotate-180 motion-reduce:transition-none"
        />
      </Primitive.Icon>
    </Primitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        position="popper"
        sideOffset={8}
        collisionPadding={16}
        data-slot="select-content"
        className={cn(
          "bg-background text-foreground border-border shadow-primary/10 z-60 max-h-[min(24rem,var(--radix-select-content-available-height))] w-(--radix-select-trigger-width) max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-lg",
          className,
        )}
        {...props}
      >
        <Primitive.ScrollUpButton className="text-primary bg-background flex h-7 items-center justify-center">
          <ChevronUp aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </Primitive.ScrollUpButton>
        <Primitive.Viewport className="p-1.5">{children}</Primitive.Viewport>
        <Primitive.ScrollDownButton className="text-primary bg-background flex h-7 items-center justify-center">
          <ChevronDown
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.5}
          />
        </Primitive.ScrollDownButton>
      </Primitive.Content>
    </Primitive.Portal>
  );
}

/** A menu option. `description` shows under it in the menu only, not in the trigger. */
export function SelectItem({
  className,
  children,
  description,
  ...props
}: ComponentProps<typeof Primitive.Item> & { description?: ReactNode }) {
  return (
    <Primitive.Item
      data-slot="select-item"
      className={cn(
        "group/item data-[state=checked]:text-primary relative flex min-h-11 w-full min-w-0 cursor-default items-center rounded-lg py-3 pr-10 pl-3 text-sm/5 transition-colors duration-150 outline-none! select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-slate-100 data-[state=checked]:bg-sky-50 data-[state=checked]:font-medium motion-reduce:transition-none forced-colors:data-highlighted:outline-2!",
        className,
      )}
      {...props}
    >
      <span className="min-w-0">
        <Primitive.ItemText>{children}</Primitive.ItemText>
        {description && (
          <span className="text-muted-foreground block text-[13px]/5 font-normal">
            {description}
          </span>
        )}
      </span>
      <Primitive.ItemIndicator className="text-primary absolute right-3 flex size-4 items-center justify-center">
        <Check aria-hidden="true" className="size-4" strokeWidth={1.5} />
      </Primitive.ItemIndicator>
    </Primitive.Item>
  );
}
