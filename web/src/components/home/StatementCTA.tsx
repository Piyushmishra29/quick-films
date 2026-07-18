import Reveal from "@/components/shared/Reveal";
import LineReveal from "@/components/shared/LineReveal";
import SectionRule from "./SectionRule";

/**
 * Big statement invitation before the footer — a huge display line in the
 * studio's voice, echoing the reference's oversized closing type. The red pill
 * stays the single strong signal. Entrance uses the shared Reveal (beat 2).
 */
const MAILTO =
  "mailto:hello@quickfilms.co?subject=Start%20a%20project%20with%20Quick%20Films";

export default function StatementCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 md:py-36"
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
        <h2
          id="cta-heading"
          className="mt-14 max-w-6xl text-balance font-display text-5xl font-black uppercase leading-[0.92] tracking-tight md:mt-20 md:text-8xl"
        >
          <LineReveal>
            <span className="text-text">Let&apos;s cut something</span>{" "}
            <span className="text-muted">worth watching.</span>
          </LineReveal>
        </h2>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:mt-16">
            <a
              href={MAILTO}
              className="inline-flex items-center gap-2 rounded-full bg-red-cta px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-cta-hover"
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
                hello@quickfilms.co
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
