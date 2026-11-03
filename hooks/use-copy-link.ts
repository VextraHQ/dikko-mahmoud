"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type CopyLinkStatus = "idle" | "copied" | "failed";

/**
 * Copies the current page URL and confirms the outcome with a toast, so the
 * button never seems dead. A failure (no Clipboard API, an insecure context or
 * a denied permission) gets an error toast that says where to copy from
 * instead. `status` stays set briefly for an icon swap and a `role="status"`
 * announcement inside dialogs, where the toast region is hidden from assistive
 * technology.
 */
export function useCopyLink(
  messages: { copied: string; failed: string; failedHint?: string },
  { copiedFor = 2500, failedFor = 5000 } = {},
): {
  status: CopyLinkStatus;
  copy: (url?: string) => Promise<boolean>;
} {
  const [status, setStatus] = useState<CopyLinkStatus>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(
      () => setStatus("idle"),
      status === "copied" ? copiedFor : failedFor,
    );
    return () => clearTimeout(timer);
  }, [status, copiedFor, failedFor]);

  return {
    status,
    async copy(url?: string): Promise<boolean> {
      try {
        await navigator.clipboard.writeText(url ?? window.location.href);
        setStatus("copied");
        toast.success(messages.copied, {
          id: "copy-link",
          duration: copiedFor,
        });
        return true;
      } catch {
        setStatus("failed");
        toast.error(messages.failed, {
          id: "copy-link",
          description: messages.failedHint,
          duration: failedFor,
        });
        return false;
      }
    },
  };
}
