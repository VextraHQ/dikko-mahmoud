"use client";

import { useEffect } from "react";

type DocumentMeta = { title: string; description: string; canonical: string };

function setAttribute(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector(selector);
  const previous = element?.getAttribute(attribute) ?? null;
  element?.setAttribute(attribute, value);
  return () => {
    if (element && previous !== null) element.setAttribute(attribute, previous);
  };
}

/**
 * Applies a route overlay's title, description and canonical while it is open
 * and restores the page beneath on close. Next 16 sends intercepted-route
 * metadata but doesn't apply it on soft navigation, so the popup's URL and
 * document metadata would otherwise disagree until a refresh.
 */
export function useDocumentMetadata(meta?: DocumentMeta) {
  const title = meta?.title;
  const description = meta?.description;
  const canonical = meta?.canonical;
  useEffect(() => {
    if (!title || !description || !canonical) return;
    const previousTitle = document.title;
    document.title = title;
    const restores = [
      setAttribute('meta[name="description"]', "content", description),
      setAttribute('link[rel="canonical"]', "href", canonical),
    ];
    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
    };
  }, [title, description, canonical]);
}
