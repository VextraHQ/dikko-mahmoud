"use client";

import * as Primitive from "@radix-ui/react-navigation-menu";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Minimal shadcn-style composition; local brand/layout lives at the callsite.
export function NavigationMenu(props: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root data-slot="navigation-menu" {...props} />;
}
export function NavigationMenuList(
  props: ComponentProps<typeof Primitive.List>,
) {
  return <Primitive.List data-slot="navigation-menu-list" {...props} />;
}
export function NavigationMenuItem(
  props: ComponentProps<typeof Primitive.Item>,
) {
  return <Primitive.Item data-slot="navigation-menu-item" {...props} />;
}
export function NavigationMenuTrigger(
  props: ComponentProps<typeof Primitive.Trigger>,
) {
  return <Primitive.Trigger data-slot="navigation-menu-trigger" {...props} />;
}
export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "bg-background text-foreground border-border rounded-2xl border shadow-xl",
        className,
      )}
      {...props}
    />
  );
}
export function NavigationMenuLink(
  props: ComponentProps<typeof Primitive.Link>,
) {
  return <Primitive.Link data-slot="navigation-menu-link" {...props} />;
}
