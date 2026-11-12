# Contact and enquiry form

Status — proposed for layout review, 12 November 2026. The HTML wireframe is a
standalone prototype. The application route and submission service are not built
by this planning pass.

## Basis

- The supplied Contact screenshots establish the hero, direct-contact panel,
  enquiry form, three office cards and FAQ section.
- The 16 September proposal includes a general enquiry form with optional
  practice area and preferred office selection. Preferred office is restored
  here after being missed in the earlier five-field recommendation.
- Latest client corrections apply to this preview. Use “Energy, Oil & Gas”,
  keep Careers and Selected matters out of navigation, and omit FAQ avatars.
- This proposal omits Organisation. Add it only if the firm needs it for the
  first response. Six fields remain, with three required.

## Page and layout

1. Shared header with Contact active. “Make an enquiry” jumps to the form on
   this page. Keep Home and the logo as the usual route back to Home.
2. Short dark hero with “Contact the firm.” and an office shortcut. The
   wireframe temporarily reuses The Firm image, pending the photoshoot.
3. Desktop form beside a compact email and office-contact panel. Mobile
   stacks a compact direct-contact block above the form. Mobile fields use
   at least 16px text and all controls have at least 44px targets.
4. Office cards for Abuja, Kano and Lagos liaison office. Use canonical
   addresses and confirmed phone numbers from `content/contact.ts`. Lagos
   has no phone until supplied. Directions use `lib/maps.ts` and verified
   destinations. Office maps remain part of the proposal. Exact pins and the
   map presentation need confirmation before implementation.
5. Contact-specific FAQs and the shared footer. Social icons stay visible for
   design review while destinations await confirmation. Keep the shared footer
   in production rather than copying the prototype's abbreviated footer.

## Form fields

- Full name — required, one field.
- Email address — required, with email validation and autocomplete.
- Phone number — optional, accepts international formatting.
- Enquiry topic — optional. General enquiry, Not sure yet, then the nine
  canonical practices. General enquiry is for questions about the firm. Not
  sure yet is for legal assistance where the relevant practice is unclear.
- Preferred office — optional. No preference, Abuja, Kano or Lagos liaison
  office. This expresses a preference and promises no particular assignment.
- Your message — required, a short overview. Put the instruction about
  confidential details and documents beside the message field.

Required fields are visibly and programmatically marked. Keep labels above
fields, useful autocomplete, restrained navy focus styling and inline errors.
The privacy link and relationship notice use firm-approved wording at launch.
The wireframe's FAQ and notice copy remain drafts for review.

## Selection and arrivals

- Use the app's themed controls. Prototype pickers open a bounded chooser,
  with long practice names wrapping. Mobile uses a bottom sheet. Implementation
  can reuse the existing shadcn Select and Sheet primitives with proper keyboard
  and focus handling.
- A generic enquiry starts without a chosen topic or preferred office.
- A practice CTA can preselect its canonical practice ID. Office CTAs may
  preselect a canonical office ID. Both choices remain editable.
- Route this through the existing enquiry-link helper when Contact is built.
  Validate URL values against the catalogue. Ignore invalid values, and keep
  visitor names, email addresses and messages out of query parameters.
- General enquiry and Not sure yet remain outside the practice catalogue.
- Recruitment links follow Careers availability and the firm's confirmed
  recruitment process. No new recruitment inbox is invented here.

## Submission states

- Initial form, validation errors, sending, confirmation and delivery failure.
- Invalid submission focuses the first invalid field. Editing clears that
  field's error. Preserve entries after failures and block duplicate sends.
- Confirmation follows a successful delivery response in the eventual service.
  An error offers retry and the existing direct email contact.
- Provide persistent inline feedback, with appropriate status announcements.
  Sonner may supplement it. A toast alone is insufficient for form outcomes.
- No file-upload field, newsletter opt-in or response-time promise is proposed.
- The wireframe simulates success and failure locally and sends no messages.
  Live delivery, server validation, anti-spam and operational handling belong
  to the later provider integration checkpoint.

## Implementation sequence after layout agreement

1. Build the page from shared header, footer, FAQ and form components. Keep
   content separate from markup and reuse canonical practices and offices.
2. Add form interaction, contextual preselection and clearly identified preview
   states. Use the existing route and metadata system, keeping previews no-index.
3. Confirm content, inbox ownership, office pins and live submission behaviour
   with the firm before the integration checkpoint.

## Verification

- Review at 320, 390, 768 and 1440px, including long selected labels.
- Check keyboard selection, Escape, dismissal and returned focus. Ensure the
  mobile chooser stays inside the viewport and respects available height.
- Check generic and practice arrivals, editable preferences, invalid incoming
  values, optional fields left blank, errors, preserved entries and retry.
- Check no-JavaScript reading of office contacts and FAQs, direct email access,
  reduced motion, labels and status announcements.
- Check links, canonical office labels, nine practices, no-index metadata,
  provider-disabled behaviour and the shared footer.
- Run the repository's format, lint, typecheck and test checks for implementation,
  plus a production build when adding the route or changing dependencies.

## Decisions still needed

Agree the layout and field order, then confirm who reads and assigns enquiries,
the map presentation, exact office pins and approved privacy/FAQ copy. No
automatic office routing or response turnaround is promised by this draft.
