"use client";

import { Check, Copy } from "lucide-react";
import { useCopyLink } from "@/hooks/use-copy-link";
import { contactPanel as copy } from "@/content/contact-page";

/** Copies the firm's email, for visitors who write from webmail. */
export function CopyEmailButton({ email }: { email: string }) {
  const { status, copy: copyText } = useCopyLink({
    copied: copy.copied,
    failed: copy.copyFailed,
    failedHint: copy.copyFailedHint,
  });
  const Icon = status === "copied" ? Check : Copy;
  return (
    <button
      type="button"
      onClick={() => copyText(email)}
      className="text-primary border-border inline-flex min-h-8 items-center gap-1.5 rounded-full border bg-white px-3 text-xs/5 font-semibold transition-colors hover:bg-slate-50"
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
      {copy.copy}
    </button>
  );
}
