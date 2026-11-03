"use client";
import { useState } from "react";
import { useCopyLink } from "@/hooks/use-copy-link";
import { useHydrated } from "@/hooks/use-hydrated";
import { cleanArticleShareUrl } from "@/lib/insights/article";
import { insightsCopy as copy } from "@/content/insight-copy";

export function useArticleShare(
  path: string,
  title: string,
  canonical: string,
) {
  const hydrated = useHydrated();
  const url = hydrated
    ? cleanArticleShareUrl(window.location.origin, path)
    : canonical;
  const clipboard = useCopyLink({
    copied: copy.copied,
    failed: copy.copyFailed,
    failedHint: copy.copyFailedHint,
  });
  const [manual, setManual] = useState(false);
  const copyLink = async (url: string): Promise<void> => {
    const success = await clipboard.copy(url);
    setManual(!success);
  };
  const share = async (title: string, url: string): Promise<void> => {
    if (typeof navigator.share !== "function") return copyLink(url);
    try {
      await navigator.share({ title, url });
    } catch (error: unknown) {
      // Closing the share sheet is not a failure; anything else falls back.
      if (!(error instanceof Error && error.name === "AbortError"))
        await copyLink(url);
    }
  };
  return {
    url,
    status: clipboard.status,
    manual,
    copyLink,
    share,
    native: hydrated && typeof navigator.share === "function",
  };
}
