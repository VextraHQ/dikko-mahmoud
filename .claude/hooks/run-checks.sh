#!/usr/bin/env bash
# When Claude finishes a turn with uncommitted changes:
#   1. archive last month's log entries
#   2. run format:check, lint, typecheck and test
#   3. report unused code from knip (never removes it)
#   4. remind Claude once to add an implementation-log entry
# Exit 2 sends the message back to Claude, which then continues the turn.
input=$(cat)
cd "$CLAUDE_PROJECT_DIR" || exit 0

# Nothing changed (e.g. Claude only answered a question): skip.
[ -z "$(git status --porcelain)" ] && exit 0

# Already sent back once this turn: don't loop forever.
[ "$(echo "$input" | jq -r '.stop_hook_active // false')" = "true" ] && exit 0

# Remembers what this session has already been told.
session=$(echo "$input" | jq -r '.session_id // "unknown"')
memo="${TMPDIR:-/tmp}/claude-hooks-$session"
mkdir -p "$memo"

send_back() {
  echo "$1" >&2
  exit 2
}

# 1. Keep only the current month in the implementation log.
node scripts/archive-log.mjs | grep -v "nothing to archive" >&2

# 2. Project checks, stopping at the first failure.
for check in format:check lint typecheck test; do
  if ! out=$(pnpm "$check" 2>&1); then
    send_back "pnpm $check failed:
$(echo "$out" | tail -n 40)"
  fi
done

# 3. Unused code. Report new findings once; the user decides what happens.
if ! knip_out=$(pnpm --silent knip 2>&1); then
  knip_hash=$(echo "$knip_out" | shasum | cut -c1-12)

  if [ ! -f "$memo/knip-$knip_hash" ]; then
    touch "$memo/knip-$knip_hash"
    send_back "knip reports unused code. Do NOT remove or change anything.
List these for the user and ask, per item, whether to remove it or keep it
(keep = add it to the ignore lists in knip.json):
$knip_out"
  fi
fi

# 4. Code changed but the log didn't: remind once per session.
code_changed=$(git status --porcelain | grep -vE ' docs/| \.claude/')
log_changed=$(git status --porcelain docs/implementation-log.md)

if [ -n "$code_changed" ] && [ -z "$log_changed" ] && [ ! -f "$memo/log-reminded" ]; then
  touch "$memo/log-reminded"
  send_back "Files changed but docs/implementation-log.md did not. If this is
meaningful work, add a dated entry (outcome, files changed, checks run,
remaining gates). If it is a small or unfinished change, say so and skip it."
fi

exit 0
