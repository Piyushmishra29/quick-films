import Link from "next/link";
import Image from "next/image";
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

      {film.clientLogo ? (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-8">
          <Reveal
            as="div"
            delay={0.1}
            className="order-1 mb-6 md:order-2 md:mb-0"
          >
            <Image
              src={film.clientLogo.src}
              alt={film.clientLogo.alt}
              width={288}
              height={360}
              className="h-14 w-auto opacity-90 md:h-[clamp(56px,7vw,96px)]"
            />
          </Reveal>
          <h1 className="order-2 font-display text-[clamp(2.75rem,11vw,8rem)] font-black uppercase leading-[0.85] tracking-tight text-text md:order-1">
            <LineReveal>{film.title}</LineReveal>
          </h1>
        </div>
      ) : (
        <h1 className="font-display text-[clamp(2.75rem,11vw,8rem)] font-black uppercase leading-[0.85] tracking-tight text-text">
          <LineReveal>{film.title}</LineReveal>
        </h1>
      )}

      {film.subtitle && (
        <Reveal as="div" delay={0.08}>
          <p className="mt-4 font-display text-[clamp(1.1rem,3.5vw,1.75rem)] font-medium uppercase tracking-tight text-yellow md:mt-6">
            {film.subtitle}
          </p>
        </Reveal>
      )}

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
