"use client";
import { Check, Copy, Share2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useArticleShare } from "@/hooks/use-article-share";
import { insightsCopy as copy } from "@/content/insight-copy";

export function ArticleShareControls({
  path,
  title,
  canonical,
}: {
  path: string;
  title: string;
  canonical: string;
}) {
  const share = useArticleShare(path, title, canonical);
  const iconClass =
    "text-primary flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white transition-colors hover:border-primary hover:bg-primary hover:text-white motion-reduce:transition-none";
  return (
    <div>
      <p className="text-primary text-[10px]/5 font-bold tracking-widest uppercase">
        {copy.share}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => share.copyLink(share.url)}
          className={iconClass}
          aria-label={copy.copy}
          title={copy.copy}
        >
          {share.status === "copied" ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(share.url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Share article on LinkedIn"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn aria-hidden="true" className="size-4" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(share.url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Share article on X"
          title="Share on X"
        >
          <FaXTwitter aria-hidden="true" className="size-4" />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${share.url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClass}
          aria-label="Share article on WhatsApp"
          title="Share on WhatsApp"
        >
          <FaWhatsapp aria-hidden="true" className="size-4" />
        </a>
        {share.native && (
          <button
            type="button"
            onClick={() => share.share(title, share.url)}
            className={iconClass}
            aria-label={copy.nativeShare}
            title={copy.nativeShare}
          >
            <Share2 aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
      {share.manual && (
        <label className="text-muted-foreground mt-3 block text-xs/6">
          {copy.manualCopy}
          <input
            readOnly
            value={share.url}
            onFocus={(event) => event.currentTarget.select()}
            className="border-border text-foreground mt-1 w-full min-w-0 rounded-md border bg-white p-2 text-xs/5"
          />
        </label>
      )}
    </div>
  );
}
