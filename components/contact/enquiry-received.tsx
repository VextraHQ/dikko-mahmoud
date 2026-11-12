import type { Ref } from "react";
import { Check } from "lucide-react";
import { enquiryForm, reasonCopy } from "@/content/contact-page";
import { practiceTitle } from "@/content/practice-index";

const copy = enquiryForm.received;

/**
 * Shown in place of the form after sending. During the preview it says
 * plainly that nothing was sent, repeats what the visitor entered and
 * explains what happens next without promising a response time.
 */
export function EnquiryReceived({
  ref,
  enquiry,
  onStartAgain,
}: {
  ref?: Ref<HTMLDivElement>;
  enquiry: {
    reason: string;
    practice: string;
    topic: string;
    name: string;
    email: string;
    message: string;
  };
  onStartAgain: () => void;
}) {
  const rows = [
    [copy.about, reasonCopy(enquiry.reason).label],
    ...(enquiry.reason === "legal"
      ? [[copy.practice, practiceTitle(enquiry.practice) ?? copy.practiceNone]]
      : []),
    ...(enquiry.reason === "other" ? [[copy.topic, enquiry.topic]] : []),
    [copy.email, enquiry.email],
    [copy.message, enquiry.message],
  ];
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="border-border mt-8 rounded-2xl border bg-white p-6 outline-none sm:p-8"
    >
      <span className="grid size-11 place-items-center rounded-full bg-green-50 text-green-800">
        <Check aria-hidden="true" className="size-5" strokeWidth={2} />
      </span>
      <h3 className="type-subsection mt-4 font-serif">{copy.heading}</h3>
      <p className="mt-3 inline-block rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-0.5 text-xs/5 font-semibold text-amber-900">
        {copy.previewBadge}
      </p>
      <p className="text-muted-foreground mt-3 text-[15px]/6">
        {copy.thanks(enquiry.name.split(" ")[0])}
      </p>
      <dl className="border-border mt-5 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-2 border-t pt-5 text-sm/6">
        {rows.map(([term, detail]) => (
          <div key={term} className="contents">
            <dt className="text-muted-foreground">{term}</dt>
            <dd className="min-w-0 wrap-anywhere whitespace-pre-line">
              {detail}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-secondary mt-5 rounded-xl bg-sky-50 px-4 py-3 text-sm/6">
        <strong>{copy.nextHeading}</strong> {copy.nextText}
      </p>
      <button
        type="button"
        onClick={onStartAgain}
        className="text-primary mt-5 min-h-11 text-sm font-semibold underline underline-offset-4"
      >
        {copy.again}
      </button>
    </div>
  );
}
