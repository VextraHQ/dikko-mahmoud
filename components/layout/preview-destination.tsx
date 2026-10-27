"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { previewNotice } from "@/content/navigation";

// Secondary routes are outside this checkpoint. Keep actions explicit.
export function PreviewDestination({ children }: { children: ReactElement }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-black/50" />
        <Dialog.Content className="bg-background fixed top-1/2 left-1/2 z-60 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8 shadow-xl">
          <Dialog.Title className="text-primary pr-6 font-serif text-3xl/9">
            {previewNotice.title}
          </Dialog.Title>
          <Dialog.Description className="text-muted-foreground mt-4 text-base/6">
            {previewNotice.description}
          </Dialog.Description>
          <Dialog.Close asChild>
            <Button
              variant="muted"
              size="icon"
              aria-label="Close message"
              className="absolute top-3 right-3"
            >
              <X />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
