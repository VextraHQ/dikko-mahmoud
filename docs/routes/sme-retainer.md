# SME retainer (`/sme-retainer`)

**Status: built for no-index review. Content is waiting on the firm.**

## What the page is

One page that introduces the firm's retainer for small and medium businesses
and its two tracks, Advisory and Secretarial. It is linked from Practice areas.

## Page, top to bottom

1. **Introduction.** Page trail, eyebrow "SME retainer", title "Support for
   your business.", a one-line description and a "Make an enquiry" button.
2. **Tracks.** "Two tracks of support.": one numbered card each for Advisory
   and Secretarial. A card shows the track's description and services once
   they exist; until then it shows "Service details awaiting confirmation".
3. **Enquiry band and footer.** The shared closing band.

## Content and approval

- Both tracks have no description and no services yet. Nothing is written for
  them in advance: the firm supplies the wording.
- A review note under the introduction says the content is awaiting approval.
  It shows only when `siteConfig.reviewNotes` is on.

## Code map

| Piece | Location                              |
| ----- | ------------------------------------- |
| Route | `app/(site)/sme-retainer/page.tsx`    |
| Page  | `components/sme/retainer-section.tsx` |
| Copy  | `content/sme.ts`                      |

## Before launch

- The firm supplies and approves each track's description and services.
- Decide whether each track gets its own enquiry reason on Contact.
