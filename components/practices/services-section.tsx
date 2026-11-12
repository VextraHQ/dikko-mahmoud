import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  practiceCopy as copy,
  type PracticeDetail,
} from "@/content/practice-catalogue";
import { formatIndex } from "@/lib/format";

export function ServicesSection({
  services,
}: {
  services: PracticeDetail["services"];
}) {
  if (!services.length) return null;
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-border border-t py-12 lg:py-16"
    >
      <Eyebrow>{copy.servicesEyebrow}</Eyebrow>
      <h2 id="services-heading" className="type-section mt-6 font-serif">
        {copy.servicesHeading}
      </h2>
      <p className="text-muted-foreground mt-6 text-sm/6 sm:text-base/7">
        {copy.servicesDescription}
      </p>
      <div className="mt-6" data-practice-services>
        <Accordion type="multiple" defaultValue={["0", "1"]}>
          {services.map((service, index) => (
            // No line under the last item: the next section starts with its own.
            <AccordionItem
              key={service.title}
              value={String(index)}
              className="last:border-b-0"
            >
              <AccordionTrigger>
                <span className="text-primary type-card flex-1 font-serif">
                  {service.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground pb-6 text-sm/6 sm:text-base/7">
                  {service.description ?? copy.servicePending}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <noscript>
        <style>{`[data-practice-services] { display:none; }`}</style>
        {services.map((service, index) => (
          <details
            key={service.title}
            open={index < 2}
            className="border-border border-b last:border-b-0"
          >
            <summary className="text-primary type-row cursor-pointer py-5 font-serif">
              {formatIndex(index)} · {service.title}
            </summary>
            <p className="text-muted-foreground pb-6 text-sm/6">
              {service.description ?? copy.servicePending}
            </p>
          </details>
        ))}
      </noscript>
    </section>
  );
}
