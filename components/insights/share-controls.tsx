"use client";
import type React from "react";
import { Check, Ellipsis, Link2, Printer, Share2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useArticleShare } from "@/hooks/use-article-share";
import { insightsCopy as copy } from "@/content/insight-copy";

// The page has one share row, so a fixed id and anchor name are safe.
const menuId = "article-share-menu";

const iconButton =
  "text-primary flex size-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 motion-reduce:transition-none";

const menuItem =
  "text-foreground flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm/6 hover:bg-slate-50";

/** Picking any menu item closes the menu. */
function closeMenu(event: React.MouseEvent<HTMLElement>) {
  if ((event.target as HTMLElement).closest("a, button"))
    event.currentTarget.hidePopover();
}

/**
 * Quiet share row for the article byline: copy link and LinkedIn up front,
 * the rest (X, WhatsApp, other apps, print) in a small "More" menu. The menu
 * uses the browser's popover, so it closes on Escape or an outside click.
 */
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
  const url = encodeURIComponent(share.url);

  return (
    <div className="relative">
      <div role="group" aria-label={copy.share} className="flex items-center">
        <button
          type="button"
          onClick={() => share.copyLink(share.url)}
          className={iconButton}
          aria-label={copy.copy}
          title={copy.copy}
        >
          {share.status === "copied" ? (
            <Check aria-hidden="true" className="size-4.5" strokeWidth={1.5} />
          ) : (
            <Link2 aria-hidden="true" className="size-4.5" strokeWidth={1.5} />
          )}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButton}
          aria-label={copy.shareLinkedIn}
          title={copy.shareLinkedIn}
        >
          <FaLinkedinIn aria-hidden="true" className="size-4" />
        </a>
        <button
          type="button"
          popoverTarget={menuId}
          className={`${iconButton} [anchor-name:--article-share]`}
          aria-label={copy.moreShare}
          title={copy.moreShare}
        >
          <Ellipsis aria-hidden="true" className="size-4.5" strokeWidth={1.5} />
        </button>
      </div>
      <div
        id={menuId}
        popover="auto"
        onClick={closeMenu}
        // Without anchor positioning the browser shows the menu centred.
        className="border-border w-56 rounded-xl border bg-white p-1.5 shadow-lg [position-anchor:--article-share] [position-area:bottom_span-left] [position-try-fallbacks:flip-block] supports-[position-area:bottom]:[inset:auto] supports-[position-area:bottom]:m-0 supports-[position-area:bottom]:mt-2"
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className={menuItem}
        >
          <FaXTwitter aria-hidden="true" className="text-primary size-4" />
          {copy.shareX}
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${share.url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={menuItem}
        >
          <FaWhatsapp aria-hidden="true" className="text-primary size-4" />
          {copy.shareWhatsApp}
        </a>
        {share.native && (
          <button
            type="button"
            onClick={() => share.share(title, share.url)}
            className={menuItem}
          >
            <Share2
              aria-hidden="true"
              className="text-primary size-4"
              strokeWidth={1.5}
            />
            {copy.nativeShare}
          </button>
        )}
        <div className="border-border my-1 border-t" />
        <button
          type="button"
          onClick={() => window.print()}
          className={menuItem}
        >
          <Printer
            aria-hidden="true"
            className="text-primary size-4"
            strokeWidth={1.5}
          />
          {copy.print}
        </button>
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
