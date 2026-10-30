// Small, pure rules for deciding which content records are ready to render.
// Content modules use these to export ready-made lists, so section components
// never decide what counts as publishable.

/** True when a string has visible characters. */
export function hasText(value?: string | null): value is string {
  return Boolean(value?.trim());
}

/** Keeps the first record for each `id`, preserving order. */
export function uniqueById<T extends { id: string }>(items: readonly T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
