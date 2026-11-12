"use client";
import type React from "react";
import { useId } from "react";
import { Check, Link2, Printer, Share2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useArticleShare } from "@/hooks/use-article-share";
import { insightsCopy as copy } from "@/content/insight-copy";

const iconButton =
  "text-primary flex size-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 motion-reduce:transition-none";

// Phones show the Share button as an icon, like its neighbours, so the row
// fits beside the author; the word stays for screen readers.
const shareButton =
  "text-primary inline-flex min-h-10 items-center justify-center gap-2 rounded-full text-sm/6 font-medium transition-colors hover:bg-slate-100 max-sm:size-10 sm:px-3 motion-reduce:transition-none";

const menuItem =
  "text-foreground flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm/6 hover:bg-slate-50";

/** Picking any menu item closes the menu. */
function closeMenu(event: React.MouseEvent<HTMLElement>) {
  if ((event.target as HTMLElement).closest("a, button"))
    event.currentTarget.hidePopover();
}

/**
 * Quiet share row for an article, the same on every device: copy link and
 * LinkedIn as icons, then a "Share" menu for WhatsApp, X, the device's own
 * share sheet (only where one exists) and print. Native share sheets differ
 * by device (a Mac offers little more than Copy), so they are an extra, never
 * the only way to share. The menu is the browser's popover, so it
 * closes on Escape or an outside click. Each row gets its own menu id, so
 * the byline and the end of the article can both have one.
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
  const id = useId();
  const menuId = `share-menu-${id}`;
  const anchor = `--share-${id.replace(/[^a-zA-Z0-9-]/g, "")}`;

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
          className={shareButton}
          style={{ anchorName: anchor } as React.CSSProperties}
        >
          <Share2 aria-hidden="true" className="size-4.5" strokeWidth={1.5} />
          <span className="max-sm:sr-only">{copy.shareButton}</span>
        </button>
      </div>
      <div
        id={menuId}
        popover="auto"
        onClick={closeMenu}
        style={{ positionAnchor: anchor } as React.CSSProperties}
        // Without anchor positioning the browser shows the menu centred.
        className="border-border w-56 rounded-xl border bg-white p-1.5 shadow-lg [position-area:bottom_span-left] [position-try-fallbacks:flip-inline,flip-block,flip-block_flip-inline] supports-[position-area:bottom]:[inset:auto] supports-[position-area:bottom]:m-0 supports-[position-area:bottom]:mt-2"
      >
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${share.url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={menuItem}
        >
          <FaWhatsapp aria-hidden="true" className="text-primary size-4" />
          {copy.shareWhatsApp}
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className={menuItem}
        >
          <FaXTwitter aria-hidden="true" className="text-primary size-4" />
          {copy.shareX}
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
