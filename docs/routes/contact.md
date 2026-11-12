# Contact and enquiry form

Status: layout approved by the user on 12 November 2026 from the interactive
wireframe (designer's look, Codex's behaviour, reason-first topic picker). The
page and form are built for the no-index preview. Nothing is sent: email
delivery, templates, spam protection and rate limiting are a later checkpoint
(see "Later: delivery").

Approved wireframe: https://claude.ai/artifact/7pDBPikTonXoHnRH4uBF3B

## Sources

- Designer's Contact frames: hero, contact panel, form with topic pills and
  underlined fields, "Find us" map cards, FAQ with image.
- Codex's v2 wireframe: six fields, preferred office, picker dialogs, preview
  submission states and failure retry.
- Client corrections: "Energy, Oil & Gas"; no Careers or Selected matters in
  the menu; no FAQ avatars.

## Page, top to bottom

1. **Header.** On `/contact` the header button reads "Back to homepage" and
   links Home, on desktop and in the phone menu. "Make an enquiry" would link
   to the page the visitor is on. This supersedes the earlier client
   correction in `client-alignment.md`; confirm with the client. The menu
   keeps today's items.
2. **Hero.** Dark, short, with the temporary Firm photo until the photoshoot.
   Eyebrow "Contact Dikko & Mahmoud", title "Let's make law work. / Start with
   a conversation." (`type-title`), one lead line. No buttons: the form
   starts directly below.
3. **Contact panel and form.** Desktop: panel left (sticky), form right.
   Phones: the form comes first, then the full panel.
   - Panel: "Contact our team" (`type-subsection`); general enquiries email
     with a Copy button; Abuja and Kano phone numbers as tap-to-call links;
     office hours; our presence; social icons (pending notice until links are
     confirmed); "Before you send" note. Presence, socials and the note are
     desktop only.
   - Form heading "Need legal expertise? Let's talk." (`type-section`).
4. **Find us. Let's talk.** (`type-section`) Three office cards: an
   embedded Google map (loads lazily, searched by address until pins are
   confirmed), eyebrow Office or Liaison office, city (`type-card`),
   address, phone link where one exists (Lagos has none yet) and "Get
   directions" through `directionsUrl`.
5. **FAQ.** The shared FAQ section with Contact questions ("Before you get in
   touch."). Answers are drafts for the firm.
6. **No closing enquiry band** (it would link back to this page), then the
   shared footer.

## The form

Order and rules:

| Field                  | Required | Notes                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| What brings you to us? | Yes      | A legal matter · A partnership or referral · Media or speaking · Something else. One tap.          |
| Which area of law?     | No       | Only after "A legal matter". The nine canonical practices. Blank means "let the team decide".      |
| What is it about?      | Yes*     | *Only after "Something else". 2–120 characters; becomes the email subject at delivery.             |
| Full name              | Yes      | 2–120 characters, `autocomplete="name"`.                                                           |
| Email address          | Yes      | Valid email, `autocomplete="email"`.                                                               |
| Phone number           | No       | Digits, spaces, `+`, `()` and `-`; at least 7 digits. Hint: include your country code.             |
| Organisation           | No       | "Recommended" for partnerships and media. Kept because firms run conflict checks on organisations. |
| Message                | Yes      | 20–2000 characters with a counter. Label and placeholder follow the reason.                        |

- Both pickers use the site's numbered editorial style (serif "01" like the
  practice catalogue) and stay quiet: grey hairline rules, and the chosen
  option gets a light tint, a navy number and a filled check (no navy fill,
  no side bar). Reasons are a ruled band of four cells (2 × 2 on tablet);
  practices are a two-column contents-style list in catalogue order, with a
  "Clear choice" link.
  Phones use a numbered dropdown for both (the site's Radix Select, as in the
  Insights filters). Same field either way.
- Removed on purpose: "General enquiry" and "Not sure yet" (covered by the
  reason and a blank practice), Careers and "existing client" reasons.
- Preferred office was in the proposal and was removed by agreement on
  2026-11-12 (scope adjustment, recorded in `client-alignment.md`) to keep
  the form short. A visitor can name an office in the message; that is a
  preference, separate from the firm deciding who handles the enquiry.
- Labels sit above underlined fields, 16px text, at least 44px targets, red
  line and message for errors. Focus is a 2px navy rule under the field, not
  the site-wide outline box; choices keep the light-blue ring inside the
  cell or row.
- Privacy and relationship notice above the send button: "By sending, you
  acknowledge our privacy policy. Sending an enquiry does not create a
  lawyer–client relationship." Wording to be approved by the firm.

### Arriving from a practice page

`enquiryHref(email, { practice })` links to `/contact?practice=<slug>#enquiry`.
The page checks the slug against the practice catalogue and, when it is
valid, preselects "A legal matter" and that practice, with a line saying it
was picked and can be changed. Unknown values are ignored. Names, emails and
messages never go in the URL.

### States

- **Errors:** checked when a field is left, then as the visitor types. On
  send, focus moves to the first problem.
- **Sending:** the button shows "Sending…" and ignores further clicks.
- **Received (preview):** the form is replaced by a confirmation that says
  plainly nothing was sent, repeats what the visitor entered, explains what
  happens next without promising a response time, and offers "Send another
  enquiry". A toast backs it up; the result never lives only in the toast.
- **Failed:** an inline alert keeps every entry and offers "Try again" or the
  firm's email.

### Preview submission

A Server Action validates the enquiry with the same Zod schema the form uses
and returns `{ status: "received", preview: true }` without sending anything.
A hidden honeypot field rejects simple bots. Later the delivery code replaces
the body of that action; the form does not change.

## Code map

- `content/contact-page.ts`: hero, panel, form copy, reasons, confirmation.
- `content/contact.ts`: email, hours, offices (existing).
- `content/faqs.ts`: `contactFaqIntro`, `contactFaqs`.
- `lib/enquiry.ts`: Zod schema, default values, `practiceFromQuery`.
- `lib/maps.ts`: `mapEmbedUrl` beside `directionsUrl`.
- `app/(site)/contact/page.tsx` and `actions.ts`.
- `components/contact/*`: hero, panel, form, offices sections.

## Needs the firm

- The four reasons (fold "Media or speaking" into "Something else" if nobody
  handles media) and whether to keep the heading "Need legal expertise?".
- Who reads enquiries and the delivery inbox.
- Office pins, the Kano number and a Lagos number.
- Privacy notice, FAQ answers and social links.
- The hero photo.

## Later: delivery

After visual approval, following the iProduce Africa setup: Resend delivery
from the Server Action, React Email templates (firm notification and visitor
receipt) with preview routes, Turnstile and Upstash rate limiting, and
server-side duplicate protection.

## Verification

- 320, 390, 768 and 1440px, long practice names, keyboard use of tiles and
  pickers, focus on errors, reduced motion.
- Generic and practice arrivals, invalid arrival values, each reason's label
  changes, optional fields left blank, preview confirmation and send again.
- Format, lint, typecheck, tests and a production build.
