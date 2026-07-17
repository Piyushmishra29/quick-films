import Link from "next/link";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import WorkFilm from "./WorkFilm";

/**
 * Work reel — each film is a full-width row: a ruler label, the framed 9:16
 * film (hover-plays, motion beat 3), a slow repeating-title marquee, and a
 * three-column meta line. Row entrances use the shared Reveal (beat 2).
 */
export default function WorkReel() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <Reveal className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="flex items-end justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-yellow">/</span> Selected work
            </p>
            <h2
              id="work-heading"
              className="font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Work
            </h2>
          </div>
          <Link
            href="/work/"
            className="hidden shrink-0 pb-2 text-sm uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-text sm:inline-flex"
          >
            All work ↗
          </Link>
        </header>
      </Reveal>

      <div className="mt-8 md:mt-12">
        {films.map((film, i) => (
          <WorkFilm key={film.slug} film={film} index={i + 1} />
        ))}
      </div>

      <Reveal className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Link
          href="/work/"
          className="inline-flex text-sm uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-text sm:hidden"
        >
          All work ↗
        </Link>
      </Reveal>
    </section>
  );
}
