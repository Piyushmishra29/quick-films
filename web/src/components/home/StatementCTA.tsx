import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Big statement invitation before the footer — a huge display line in the
 * studio's voice, echoing the reference's oversized closing type. The red pill
 * stays the single strong signal. Entrance uses the shared Reveal (beat 2).
 */
const MAILTO =
  "mailto:hello@quickfilms.in?subject=Start%20a%20project%20with%20Quick%20Films";

export default function StatementCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 md:py-36"
    >
      <Reveal>
        <SectionRule
          index="09"
          label="Start a project"
          meta="Available now"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <h2
            id="cta-heading"
            className="mt-14 max-w-6xl text-balance font-display text-5xl font-black uppercase leading-[0.92] tracking-tight md:mt-20 md:text-8xl"
          >
            <span className="text-text">Let&apos;s cut something</span>{" "}
            <span className="text-muted">worth watching.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:mt-16">
            <a
              href={MAILTO}
              className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Start a project
            </a>
            <span className="text-sm text-muted">
              or write{" "}
              <a
                href={MAILTO}
                className="text-text underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-red"
              >
                hello@quickfilms.in
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
