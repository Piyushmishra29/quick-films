import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import LineReveal from "@/components/shared/LineReveal";
import TickerRuler from "@/components/shared/TickerRuler";
import SectionRule from "@/components/home/SectionRule";
import type { Film } from "@/lib/films";

// Decorative timecode ruler — matches the ticks used sitewide (Hero /
// Stats / Footer / work index). Not tied to a specific film's runtime.
const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];

/**
 * Case page header: SectionRule-style meta ruler, back-to-work link, huge
 * title, meta row (tags / duration / roles) in the sitewide label style,
 * and a timecode ruler — the same furniture established on the home page.
 * The title gets its own LineReveal rise (hero-wordmark move) rather than
 * riding the surrounding Reveal fade, so it isn't animated twice.
 */
export default function CaseHeader({ film }: { film: Film }) {
  const roles = Array.from(new Set(film.credits.map((c) => c.role))).join(
    " · ",
  );

  return (
    <header className="mb-14 md:mb-20">
      <Reveal as="div">
        <SectionRule index="01" label="Case Study" meta={film.year} />

        <Link
          href="/work/"
          className="mb-8 mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-text"
        >
          <span aria-hidden="true">←</span> Work
        </Link>
      </Reveal>

      <h1 className="font-display text-[clamp(2.75rem,11vw,8rem)] font-black uppercase leading-[0.85] tracking-tight text-text">
        <LineReveal>{film.title}</LineReveal>
      </h1>

      <Reveal as="div" delay={0.1}>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-muted md:mt-8">
          <span className="text-text">{film.tags.join(" · ")}</span>
          <span className="text-yellow" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums">{film.duration}</span>
          {roles && (
            <>
              <span className="text-yellow" aria-hidden="true">
                /
              </span>
              <span>{roles}</span>
            </>
          )}
        </p>

        <div className="mt-10 md:mt-14" aria-hidden="true">
          <TickerRuler ticks={TICKS} duration={60} />
        </div>
      </Reveal>
    </header>
  );
}
