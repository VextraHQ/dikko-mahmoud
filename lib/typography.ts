const nbsp = " ";

/**
 * Small typesetting fixes for names, addresses and citations, applied when
 * text is rendered (the stored copy stays plain, so search still matches):
 *
 * - initials stay with the surname: "A.B. Mahmoud"
 * - post-nominals stay with the name: "Mahmoud, SAN"
 * - "No. 10" and "s. 1(1)" never split
 * - year ranges use an en dash: "1993–2026"
 */
export function keepTogether(text: string): string {
  return text
    .replace(/\b((?:[A-Z]\.){1,3}) (?=[A-Z])/g, `$1${nbsp}`)
    .replace(/, (?=[A-Z]{2,}[A-Za-z]*\b)/g, `,${nbsp}`)
    .replace(/\b(No|s)\. (?=\d)/g, `$1.${nbsp}`)
    .replace(/\b(\d{4}) ?- ?(\d{4})\b/g, "$1–$2");
}
