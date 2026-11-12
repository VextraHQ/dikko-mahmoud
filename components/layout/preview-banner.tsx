"use client";

import { X } from "lucide-react";
import { useSessionDismiss } from "@/hooks/use-session-dismiss";
import { previewBanner as copy } from "@/content/site";

/**
 * One quiet notice that the whole site is a preview, in place of a note on
 * every section. Desktop only (phones get a thin line above the header).
 * Floats bottom-left so it never shifts the page layout, and stays hidden
 * for the rest of the visit once closed.
 */
export function PreviewBanner() {
  const { dismissed, dismiss } = useSessionDismiss("dm-preview-banner");
  if (dismissed) return null;

  return (
    <div
      role="note"
      className="bg-navy-deep fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-30 flex max-w-[calc(100%-6rem)] items-center gap-1 rounded-full py-1 pr-1 pl-4 text-xs/5 text-white shadow-sm ring-1 ring-white/10 max-lg:hidden sm:left-6 print:hidden"
    >
      <span className="min-w-0 py-1.5">{copy.message}</span>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.dismiss}
        title={copy.dismiss}
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
