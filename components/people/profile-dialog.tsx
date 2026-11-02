"use client";

import { Check, Link2, Maximize2, X } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCopyLink } from "@/hooks/use-copy-link";
import { useDocumentMetadata } from "@/hooks/use-document-metadata";
import { useHeadingOutOfView } from "@/hooks/use-heading-out-of-view";
import { useProfileDialog } from "@/hooks/use-profile-dialog";
import { cn } from "@/lib/utils";

type ProfileDialogLabels = {
  close: string;
  copyLink: string;
  copiedLink: string;
  copyFailed: string;
  copyFailedHint: string;
  openPage: string;
};

/**
 * Client shell for the intercepted profile route. The server passes the
 * already-rendered profile body as children; only the name/role strings for
 * the compact bar title cross this boundary.
 */
export function ProfileDialog({
  href,
  name,
  role,
  metadata,
  labels,
  children,
}: {
  href?: string;
  name?: string;
  role?: string;
  /** Same title/description/canonical as the standalone page. */
  metadata?: { title: string; description: string; canonical: string };
  labels: ProfileDialogLabels;
  children: ReactNode;
}) {
  const { contentRef, close, focusHeading } = useProfileDialog(href);
  const { scrollRef, outOfView } = useHeadingOutOfView<HTMLDivElement>();
  const { status: copyStatus, copy } = useCopyLink({
    copied: labels.copiedLink,
    failed: labels.copyFailed,
    failedHint: labels.copyFailedHint,
  });
  useDocumentMetadata(metadata);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent
        ref={contentRef}
        aria-describedby={undefined}
        onOpenAutoFocus={focusHeading}
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="bg-background inset-x-2 top-[max(0.5rem,env(safe-area-inset-top))] bottom-[max(0.5rem,env(safe-area-inset-bottom))] mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl shadow-2xl sm:inset-x-4 sm:top-[max(1rem,env(safe-area-inset-top))] sm:bottom-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="border-border flex h-15 shrink-0 items-center gap-2 border-b pr-2 pl-5 sm:pr-3 sm:pl-10 lg:pl-12">
          {/* Decorative repeat of the dialog title; the heading names it. */}
          <p
            aria-hidden="true"
            className={cn(
              "min-w-0 flex-1 truncate text-sm/5 transition-opacity duration-200 motion-reduce:transition-none",
              outOfView ? "opacity-100" : "opacity-0",
            )}
          >
            {name && <span className="font-serif text-lg/6">{name}</span>}
            {role && (
              <span className="text-muted-foreground ml-3 hidden sm:inline">
                {role}
              </span>
            )}
          </p>
          {/* Toasts show the copy outcome but sit outside this modal, which
              hides them from assistive technology, so announce it here too. */}
          <span role="status" className="sr-only">
            {copyStatus === "copied"
              ? labels.copiedLink
              : copyStatus === "failed"
                ? `${labels.copyFailed}. ${labels.copyFailedHint}`
                : ""}
          </span>
          {href && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              aria-label={labels.copyLink}
              className="text-primary hover:bg-slate-100 active:bg-slate-200"
            >
              {copyStatus === "copied" ? (
                <Check strokeWidth={1.5} />
              ) : (
                <Link2 strokeWidth={1.5} />
              )}
            </Button>
          )}
          {href && (
            // A full page load: a client navigation to the same URL would
            // stay intercepted and keep the popup.
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-slate-100 active:bg-slate-200"
            >
              <a href={href} aria-label={labels.openPage}>
                <Maximize2 strokeWidth={1.5} />
              </a>
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="muted" size="icon" aria-label={labels.close}>
              <X strokeWidth={1.5} />
            </Button>
          </DialogClose>
        </div>
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Lets the server-rendered profile heading act as the dialog's title. */
export function ProfileDialogTitle({ children }: { children: ReactElement }) {
  return <DialogTitle asChild>{children}</DialogTitle>;
}
