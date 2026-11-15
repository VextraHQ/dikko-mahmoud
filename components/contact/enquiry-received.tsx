import type { Ref } from "react";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow, eyebrowClass } from "@/components/ui/eyebrow";
import { enquiryForm, reasonCopy } from "@/content/contact-page";
import { practiceTitle } from "@/content/practice-index";
import { cn } from "@/lib/utils";

const copy = enquiryForm.received;

/**
 * Shown in place of the form after sending, in the form's own language:
 * an eyebrow, a serif heading and hairline rows like the fields above it.
 * During the preview it says plainly that nothing was sent, repeats what the
 * visitor entered and explains what happens next without promising a
 * response time.
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
      className="motion-safe:animate-rise-in border-secondary mt-8 border-t-2 pt-8 outline-none"
    >
      {/* One small green tick: the only colour that says "done". */}
      <Eyebrow className="flex items-center gap-2 text-green-700">
        <CircleCheck aria-hidden="true" className="size-4" strokeWidth={2} />
        {copy.eyebrow}
      </Eyebrow>
      <h3 className="type-subsection mt-4 font-serif">
        {copy.heading(enquiry.name.split(" ")[0])}
      </h3>
      <p className="text-muted-foreground mt-4 border-l-2 border-amber-300 pl-4 text-sm/6">
        {copy.previewNote}
      </p>

      <h4 className={cn(eyebrowClass, "text-muted-foreground mt-10")}>
        {copy.summary}
      </h4>
      <dl className="border-border mt-3 border-t text-[15px]/6">
        {rows.map(([term, detail]) => (
          <div
            key={term}
            className="border-border grid gap-1 border-b py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <dt className="text-muted-foreground">{term}</dt>
            <dd className="min-w-0 wrap-anywhere whitespace-pre-line">
              {detail}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
        <h4 className="type-row font-serif">{copy.nextHeading}</h4>
        <p className="text-muted-foreground text-[15px]/6">{copy.nextText}</p>
      </div>

      <ArrowButton
        type="button"
        size="sm"
        icon={ArrowLeft}
        onClick={onStartAgain}
        className="mt-10"
      >
        {copy.again}
      </ArrowButton>
    </div>
  );
}
