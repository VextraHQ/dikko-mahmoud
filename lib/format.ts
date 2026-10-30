/** Two-digit editorial number: 3 → "03", 12 → "12". */
export function formatCount(count: number) {
  return String(count).padStart(2, "0");
}

/** Position label for a zero-based list index: 0 → "01". */
export function formatIndex(index: number) {
  return formatCount(index + 1);
}

/** Up to two initials from a name: "Ada Lovelace" → "AL". */
export function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}
