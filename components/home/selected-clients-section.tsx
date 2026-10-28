import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { ClientLogoMarquee } from "@/components/home/client-logo-marquee";
import { selectedClients as content } from "@/content/clients";
import { Eyebrow } from "@/components/ui/eyebrow";

type Client = (typeof content.slots)[number];

function LogoSlot({ client, index }: { client: Client; index: number }) {
  return (
    <li className="border-border/60 bg-background flex h-16 w-45 shrink-0 items-center justify-center rounded-xl border px-6 sm:h-20 sm:w-60 sm:px-8">
      {client.logo && client.name ? (
        <Image
          src={client.logo}
          alt={client.name}
          width={176}
          height={64}
          className="h-12 w-full object-contain"
        />
      ) : (
        <span className="text-muted-foreground text-center text-xs/5 font-semibold tracking-wider uppercase">
          {content.placeholderLabel}
          <span className="mt-1 block font-serif text-2xl/7 font-normal tracking-normal">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
      )}
    </li>
  );
}

export function SelectedClientsSection() {
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
        <ClientLogoMarquee note={content.reviewNote}>
          <Marquee
            pauseOnHover
            repeat={4}
            className="[--duration:40s] [--gap:1rem]"
          >
            <ul
              data-client-logos
              className="grid grid-cols-2 gap-(--gap) sm:grid-cols-3 xl:grid-cols-6"
            >
              {content.slots.map((client, index) => (
                <LogoSlot key={client.id} client={client} index={index} />
              ))}
            </ul>
          </Marquee>
        </ClientLogoMarquee>
      </div>
    </section>
  );
}
