/**
 * Text ready for matching: lower case, accents removed, "A.B." read as "ab",
 * other punctuation (such as "&") read as a space.
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/**
 * True when every word of the search appears somewhere in the text, in any
 * order. "patent nigeria" finds "Patent registration in Nigeria". An empty
 * search matches everything.
 */
export function matchesSearch(text: string, search: string): boolean {
  const words = normalizeText(search).split(" ").filter(Boolean);
  if (!words.length) return true;
  const haystack = normalizeText(text);
  return words.every((word) => haystack.includes(word));
}
