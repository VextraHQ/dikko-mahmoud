import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Marquee } from "@/components/ui/marquee";
import { ClientLogoMarquee } from "@/components/home/client-logo-marquee";
import {
  namedClients,
  selectedClients as content,
  visibleClients as clients,
} from "@/content/clients";
import { Eyebrow } from "@/components/ui/eyebrow";
import { formatIndex } from "@/lib/format";

type Client = (typeof content.slots)[number];

function LogoSlot({ client, index }: { client: Client; index: number }) {
  return (
    <li className="border-border/60 bg-background flex h-16 w-45 shrink-0 items-center justify-center rounded-xl border px-6 sm:h-20 sm:w-60 sm:px-8">
      {client.name?.trim() ? (
        <ImageWithFallback
          src={client.logo}
          alt={client.name}
          width={176}
          height={64}
          className="h-12 w-full object-contain"
          fallback={
            <span
              title={client.name}
              className="text-primary line-clamp-3 text-center font-serif text-sm/5 wrap-break-word sm:text-base/5"
            >
              {client.name}
            </span>
          }
        />
      ) : (
        <span className="text-muted-foreground text-center text-xs/5 font-semibold tracking-wider uppercase">
          {content.placeholderLabel}
          <span className="mt-1 block font-serif text-2xl/7 font-normal tracking-normal">
            {formatIndex(index)}
          </span>
        </span>
      )}
    </li>
  );
}

export function SelectedClientsSection() {
  if (!clients.length) return null;
  return (
    <section
      id="selected-clients"
      aria-labelledby="selected-clients-heading"
      className="bg-background py-12 xl:py-24"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-8 xl:px-20">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2
          id="selected-clients-heading"
          className="mt-3 font-serif text-[40px]/11 sm:text-5xl/13 xl:text-[64px]/[1.08]"
        >
          {content.heading}
        </h2>
        <p className="text-muted-foreground mt-6 max-w-3xl text-base/6">
          {content.description}
        </p>
        <ClientLogoMarquee
          note={namedClients.length ? undefined : content.reviewNote}
          animate={clients.length > 1}
        >
          <Marquee
            pauseOnHover
            repeat={clients.length > 1 ? 4 : 1}
            className="[--duration:40s] [--gap:1rem]"
          >
            <ul
              data-client-logos
              className="grid grid-cols-2 gap-(--gap) sm:grid-cols-3 xl:grid-cols-6"
            >
              {clients.map((client, index) => (
                <LogoSlot key={client.id} client={client} index={index} />
              ))}
            </ul>
          </Marquee>
        </ClientLogoMarquee>
      </div>
    </section>
  );
}
