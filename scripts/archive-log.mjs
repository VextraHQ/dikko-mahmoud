// Moves implementation-log entries from earlier months into
// docs/archive/implementation-log-YYYY-MM.md, so the main log keeps only the
// current month (see .claude/rules/workflow.md). Safe to run any time.
//
//   pnpm log:archive

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const logPath = "docs/implementation-log.md";
const archivePath = (month) => `docs/archive/implementation-log-${month}.md`;
const currentMonth = new Date().toISOString().slice(0, 7); // "2026-11"

// Splits a log file into its intro text and its "## YYYY-MM-DD — …" entries.
function splitEntries(text) {
  const [intro, ...entries] = text.split(/^(?=## \d{4}-\d{2}-\d{2})/m);

  return { intro, entries };
}

function monthOf(entry) {
  return entry.slice(3, 10);
}

function monthName(month) {
  return new Date(`${month}-01T00:00:00Z`).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function newArchiveIntro(month) {
  return `# Implementation log — ${monthName(month)}

Archived from \`docs/implementation-log.md\`. Entries are historical: a later
entry or the current docs may supersede them.

`;
}

const log = splitEntries(readFileSync(logPath, "utf8"));
const keep = log.entries.filter((entry) => monthOf(entry) >= currentMonth);
const old = log.entries.filter((entry) => monthOf(entry) < currentMonth);

if (old.length === 0) {
  console.log("Implementation log: nothing to archive.");
  process.exit(0);
}

const months = [...new Set(old.map(monthOf))];

for (const month of months) {
  const path = archivePath(month);
  const archive = existsSync(path)
    ? splitEntries(readFileSync(path, "utf8"))
    : { intro: newArchiveIntro(month), entries: [] };
  const moved = old.filter((entry) => monthOf(entry) === month);
  const entries = [...moved, ...archive.entries].map((entry) =>
    entry.trimEnd(),
  );

  writeFileSync(path, `${archive.intro}${entries.join("\n\n")}\n`);
  console.log(`Implementation log: moved ${moved.length} entries to ${path}.`);
}

const kept = keep.map((entry) => entry.trimEnd());

writeFileSync(logPath, `${log.intro}${kept.join("\n\n")}\n`);
