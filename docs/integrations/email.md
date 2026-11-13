# Enquiry email plan

**Status: planned. Nothing is sent today.** The Contact form validates an
enquiry and shows a confirmation marked "Preview only: nothing was sent".
Delivery waits for visual approval of the Contact page (`docs/routes/contact.md`).

## What gets built

One change point: `submitEnquiry` in `app/(site)/contact/actions.ts`. The form,
its fields and its checks (`lib/enquiry.ts`) do not change.

When someone sends an enquiry, the server:

1. Checks it with the same rules as the form (`enquirySchema`). Already built.
2. Checks it is a person: the hidden honeypot field (already built), then
   Cloudflare Turnstile.
3. Checks the sender is not flooding the form (rate limit by IP address).
4. Sends two emails through Resend:
   - **To the firm:** the enquiry, with reply-to set to the sender.
   - **To the sender:** a receipt saying the enquiry arrived.
5. Treats delivery of the firm notification as the submission outcome.
   A visitor-receipt failure is tracked separately and must not ask the visitor
   to resend an enquiry already accepted by the provider for the firm.
6. Uses a stable submission ID and deduplication/idempotency design for retries.
   Define timeout and partial-failure behaviour before delivery is implemented.

## The two emails

Both are React Email templates, so they are written like components and can be
previewed in the browser before anything is sent.

| Email        | To         | Subject                                              | Contains                                                                                  |
| ------------ | ---------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Notification | The firm   | Reason, then the area of law or topic, then the name | Every field the sender filled in, and when it arrived                                     |
| Receipt      | The sender | "We received your enquiry"                           | Acknowledgement, approved next steps and relationship notice; message repetition to agree |

- "Something else" enquiries use the sender's topic as the subject.
- The receipt repeats the form's notice: sending an enquiry does not create a
  lawyer–client relationship. The firm approves this wording.
- Neither email promises a reply time until the firm confirms one.

## Where the code goes

| Piece               | Location                                                                              |
| ------------------- | ------------------------------------------------------------------------------------- |
| Shell and templates | `components/email/email-shell.tsx`, `enquiry-notification.tsx`, `enquiry-receipt.tsx` |
| Preview             | `components/email/previews/`, development-only React Email preview server             |
| Rendering           | `lib/email/render.ts` (HTML and plain text, server only)                              |
| Sending             | `lib/email/send-enquiry.ts` (server only)                                             |
| Spam and rate limit | `lib/email/guard.ts` (server only)                                                    |

This follows iProduce's split (shell, templates, previews, render, send) but
not its folders: iProduce keeps `.tsx` templates under `lib/email/`, and this
repository keeps `lib/` to `.ts` only (`.claude/rules/structure.md`). Templates
are markup, so they live in `components/email/`. Point the preview server at
`components/email/previews` and confirm its flags against the installed React
Email version during implementation.

## Decisions to make before starting

1. Which address receives enquiries, and whether each reason goes to a
   different address.
2. The sending domain. Resend needs DNS records on it, so someone with access
   to the firm's domain must add them.
3. Whether enquiries are also stored anywhere. Today's plan stores nothing:
   the email is the record.
4. The receipt wording, approved by the firm.

## Variables it will need

`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `TURNSTILE_SECRET_KEY`,
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `UPSTASH_REDIS_REST_URL`,
`UPSTASH_REDIS_REST_TOKEN`. See `docs/environment.md`.

When Turnstile is added, its script and frame hosts must be added to the
content policy in `next.config.ts`.

## Done means

- A real enquiry reaches the firm's inbox and the sender gets a receipt.
- A failed send shows the form's failure message with entries kept.
- A bot filling the hidden field, or a flood from one address, sends nothing.
- Tests cover the action's three results: received, invalid, failed.
- The "Preview only" badge and toast wording are removed.

## Email experience to agree before implementation

Inspected the iProduce reference under `lib/email/`: `contact.ts`,
`render.ts`, `components/email-shell.tsx`, `templates/contact-notification.tsx`
and `previews/contact-notification.tsx`.

- Separate templates for the firm's notification and the visitor's receipt.
  The firm sees a readable field summary and can reply to the sender. The
  visitor sees acknowledgement and approved next-step wording.
- A shared branded shell with Dikko & Mahmoud colours, logo and suitable font
  fallbacks. Adapt the reference structure rather than its copy or branding.
- Render HTML and plain text from the same template source. Use local sample
  fixtures and a separate preview for each audience.
- Review long names, long messages, absent optional fields, all enquiry reasons,
  mobile email widths, images disabled and light/dark email-client behaviour.
- Agree how much submitted information belongs in the visitor receipt. Start
  the design review with a minimal acknowledgement; settle any full-message
  repetition with the firm before implementing it.
- iProduce's contact sender treats the visitor receipt as best-effort after the
  firm notification succeeds. Preserve that distinction and add a deliberate
  retry/deduplication design for this project.

## Account ownership

Use the firm's Resend account and sending domain, with delegated Vextra access.
Confirm who can change DNS and who monitors failures. Paid service activation
and recurring costs require the firm's approval.
