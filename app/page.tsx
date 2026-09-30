export default function Home() {
  return (
    <main className="holding-page relative isolate flex min-h-svh flex-col overflow-hidden px-6 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
      <div
        aria-hidden="true"
        className="border-accent/10 absolute top-1/2 -right-52 size-[32rem] -translate-y-1/2 rounded-full border sm:-right-36 lg:right-10 lg:size-[38rem]"
      />
      <div
        aria-hidden="true"
        className="border-accent/15 absolute top-1/2 -right-36 size-[20rem] -translate-y-1/2 rounded-full border sm:-right-20 lg:right-28 lg:size-[24rem]"
      />

      <header className="border-line relative z-10 flex items-center justify-between border-b pb-5">
        <div className="flex items-center gap-4">
          <span className="text-accent font-serif text-xl font-semibold tracking-[-0.04em]">
            D&amp;M
          </span>
          <span className="bg-line hidden h-4 w-px sm:block" />
          <span className="text-foreground/75 hidden text-xs font-medium tracking-[0.16em] uppercase sm:block">
            Dikko &amp; Mahmoud
          </span>
        </div>

        <p className="text-muted text-[0.65rem] font-medium tracking-[0.22em] uppercase">
          Established 1993
        </p>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center py-20 sm:py-24">
        <div className="max-w-4xl">
          <p className="text-accent mb-7 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] uppercase sm:mb-9">
            <span className="bg-accent h-px w-10" aria-hidden="true" />
            Website in development
          </p>

          <h1 className="max-w-3xl font-serif text-[clamp(3rem,8vw,7.75rem)] leading-[0.92] font-normal tracking-[-0.055em] text-balance">
            A new digital home is taking shape.
          </h1>

          <p className="text-muted mt-8 max-w-xl text-base leading-7 sm:mt-10 sm:text-lg sm:leading-8">
            We are thoughtfully rebuilding the Dikko &amp; Mahmoud website.
            Please check back soon.
          </p>
        </div>
      </section>

      <footer className="border-line text-muted relative z-10 flex items-end justify-between border-t pt-5 text-[0.65rem] font-medium tracking-[0.18em] uppercase">
        <p>Dikko &amp; Mahmoud</p>
        <p>Abuja · Kano</p>
      </footer>
    </main>
  );
}
