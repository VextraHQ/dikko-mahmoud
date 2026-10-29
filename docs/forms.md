# Form foundation

The user authorized preparing these primitives before secondary-page work.
They are ready to compose; no public enquiry form or submission service is active.

## Available pieces

- `Input` and `Textarea`: native controls, React 19 refs, disabled/invalid states,
  existing border/background/ring roles and 16px text. Input is 44px high;
  Textarea grows from a 112px minimum.
- `Label`: Radix label, associated with its control through `htmlFor`/`id`.
- `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldContent` and
  `FieldTitle`: the current shadcn field composition, with vertical/horizontal/
  responsive layouts. Field is a plain layout wrapper; use native `FieldSet` and
  `FieldLegend` for semantic groups. `FieldGroup` stacks fields; `FieldSeparator`
  separates groups when useful.
- `Checkbox`: Radix checked/indeterminate state and native form participation.
  Pair it with a label and give the combined row at least a 44px touch target.
- `NativeSelect`, `NativeSelectOption`, `NativeSelectOptGroup`: native keyboard
  and mobile selection, 44px default height. Use for short enquiry categories;
  a searchable/custom Select can follow if actual content requires it.
- `Separator`: Radix decorative by default; opt into semantics when needed.
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`,
  `FormMessage`, `useFormField`: the familiar React Hook Form adapter, matching
  iProduce's composition. Form is a provider, **not** an HTML form element.

Prefer the current Field family for new forms. The FormField adapter is also
available for the explicitly requested iProduce-style API. Use one composition
per field rather than nesting both. A plain native `<form>` needs no form-state
library. React Hook Form is installed for field state/validation when needed;
Zod/resolvers, providers and submission handling are not installed or invented.

## Native/server-compatible composition

```tsx
<form>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="enquiry-email">Email</FieldLabel>
      <Input
        id="enquiry-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        aria-describedby="enquiry-email-help"
      />
      <FieldDescription id="enquiry-email-help">
        Your preferred contact email.
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="enquiry-message">Your enquiry</FieldLabel>
      <Textarea id="enquiry-message" name="message" required />
    </Field>
  </FieldGroup>
</form>
```

This is a composition example, not a shipping form or a submission contract.
When displaying an error, set `data-invalid` on Field, `aria-invalid` on the
control, give FieldError an ID and include that ID in the control's
`aria-describedby`. Keep helper text IDs there too. FieldError omits empty
messages, deduplicates supplied error strings and uses an alert for new errors.

## React Hook Form adapter

In the route's client form, call `useForm` with explicit default values and
validation rules. Wrap the native form in Form, pass `form.control` to FormField,
and place the actual control in FormControl. Example field inside that form:

```tsx
<FormField
  control={form.control}
  name="email"
  rules={{ required: "Enter an email address." }}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" autoComplete="email" {...field} />
      </FormControl>
      <FormDescription>Your preferred contact email.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

The adapter supplies control/label IDs, invalid state and helper/error references;
keep FormDescription present for the default helper reference. If composing a
field without helper text, explicitly supply the control's `aria-describedby`
for the nodes that actually render. React Hook Form owns validation state and
focuses invalid controls; a real server boundary must validate again when the
submission milestone is approved. Do not place credentials, service calls or
validation schemas in primitives. Keep route copy and option collections in
`content/` as with the homepage.

All styling remains local Tailwind. The destructive semantic role maps to
Tailwind red-700; reduced motion disables control transitions. Native controls,
Field markup and help/error content can render on the server. Radix and React
Hook Form provide the client boundaries where behaviour needs them.

## Sources and verification

Adapted from the official [new-york-v4 registry](https://ui.shadcn.com/r/styles/new-york-v4/field.json),
[current Field guidance](https://ui.shadcn.com/docs/components/radix/field) and
[React Hook Form examples](https://ui.shadcn.com/docs/forms/react-hook-form).
The shadcn MIT notice is retained in `licenses/shadcn-ui.txt`.

The isolated browser fixture exercises label click/focus, required/invalid email
errors, successful correction, described-by targets, textarea entry, native
selection, Space/label checkbox toggling, disabled controls, error deduplication
and responsive containment. It sends no data and adds no public test route.
