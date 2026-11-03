"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Small shadcn-style wrapper over the installed Radix Dialog. Callers own the
// panel geometry; this keeps the portal, overlay and short opacity fade.
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-navy-deep/60 fixed inset-0 z-60 opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:starting:opacity-0" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-60 opacity-100 outline-none motion-safe:transition-opacity motion-safe:duration-200 motion-safe:starting:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
