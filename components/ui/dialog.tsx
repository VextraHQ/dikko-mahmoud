"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Small shadcn-style wrapper over the installed Radix Dialog. Callers own the
// panel geometry; this keeps the portal and overlay. The open and close
// animations live in app/styles/motion.css, keyed on `data-slot`.
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
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className="bg-navy-deep/60 fixed inset-0 z-60"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn("fixed z-60 outline-none", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
