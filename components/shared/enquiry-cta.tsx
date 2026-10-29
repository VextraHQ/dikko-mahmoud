import { ArrowButton } from "@/components/ui/arrow-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { contact } from "@/content/contact";
import { enquiry } from "@/content/enquiry";
import { cn } from "@/lib/utils";

export function EnquiryCta({
  variant = "pale",
}: {
  variant?: "pale" | "white";
}) {
  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="relative z-10 mx-auto -mb-10 w-full max-w-360 px-4 pt-12 sm:-mb-16 sm:px-8 lg:-mb-28 lg:pt-24 xl:px-20"
    >
      <div
        className={cn(
          "shadow-navy-deep/5 rounded-2xl p-6 shadow-xl sm:p-10 lg:p-16",
          variant === "pale" ? "bg-sky-50" : "bg-white",
        )}
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <Eyebrow>{enquiry.eyebrow}</Eyebrow>
            <h2
              id="enquiry-heading"
              className="mt-6 font-serif text-3xl/9 sm:text-5xl/[1.08] xl:text-6xl/[1.04]"
            >
              {enquiry.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 text-sm/6 sm:text-base/7 lg:mt-10">
              {enquiry.description}
            </p>
          </div>
          <ArrowButton asChild className="justify-self-start">
            <a href={`mailto:${contact.email}`}>{enquiry.action}</a>
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
