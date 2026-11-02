# Selected matters

## Draft source checkpoint

Planning only — 1 November 2026. The user supplied desktop CleanShot references
at 2.39.44, 2.39.48 and 2.39.53 while discussing the People navigation change.
These establish a Selected matters listing page, not a People directory and not
the individual matter detail pages. Claude implementation is not started.

## Supplied listing composition

- Shared dark/glass header over a wide office-image hero with navy overlay.
- Eyebrow "Selected matters", headline "Experience where the stakes are high."
  and the supplied introduction about disputes/advisory instructions and the
  firm's role. Approved original imagery remains required; use the existing
  intentional cover if none is supplied rather than cropping the screenshot.
- White listing section headed "A closer look at our work." with four cards,
  two columns on desktop: BPE, CBN, Kano State Government and NNPC/NPDC. Each
  uses category, organisation, supplied summary/topic and "Read matter" action.
- The CBN card is navy in the screenshot. Confirm whether this is hover/focus
  or a fixed design variant before assigning meaning or hard-coding card two.
  Any approved dark state must maintain readable colours and keyboard parity.
- Below the cards, retain the source's representative-experience qualification,
  then reuse the shared enquiry CTA and single layout-owned footer. Do not copy
  the screenshot's large blank gaps or duplicate site chrome.
- The "four selected matters" eyebrow must be derived from the displayed records
  or use a count-neutral label if consent/filtering changes their number.

## Existing implementation boundaries

`routes.experience` currently points to `/experience`; `routes.matter(id)` points
to `/experience/[id]`. These are registered addresses, but the routes are not yet
launched. A nav label can read "Selected matters" without changing People routes.
Reuse canonical matter IDs and sourced copy; a new slug or route rename needs a
single registry decision rather than independent paths in cards and navigation.

The current alignment keeps Home named matters hidden pending consent. The
practice-carousel preview exception does not automatically apply to this listing
or to individual matter pages. Clarify the authorised visual-review treatment and
retain pending/approved/withheld status; screenshots are not publication consent.
Do not invent legal outcomes, awards/recoveries, additional clients or approval.

## Missing references and decisions

- Main navigation is resolved: on 1 November the user selected both Our People
  and Selected matters. The profile/navigation handoff handles that addition;
  this listing remains a separate checkpoint.
- No mobile listing or individual matter detail screens were supplied. A "Read
  matter" button alone is not enough to define a detail template or final copy.
- No live publication consent is recorded for these four matters. An explicit
  preview decision is needed before showing pending named cards on this route.
- Confirm the dark-card interaction/variant and the intended route naming before
  a decision-complete Claude implementation handoff.

Keep this source brief separate from the People/profile specification. The agreed
workflow is Codex drafts the bounded spec, the user gives it to Claude, then Codex
reviews the actual implementation against the spec and supplied designs.
