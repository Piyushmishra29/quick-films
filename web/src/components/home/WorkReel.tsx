import Link from "next/link";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import WorkCard from "./WorkCard";

/**
 * Work reel — the four films as vertical 9:16 cards.
 * Horizontal scrolling row on desktop overflow; stacks 1-up/2-up on mobile.
 * Section entrance uses the shared Reveal (motion beat 2). Card hover video
 * is beat 3, handled inside WorkCard.
 */
export default function WorkReel() {
  return (
    <section
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40"
    >
      <Reveal
        as="header"
        className="mb-10 flex items-end justify-between md:mb-14"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
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
      </Reveal>

      <Reveal>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:flex md:snap-x md:snap-mandatory md:gap-6 md:overflow-x-auto md:pb-4 [scrollbar-width:thin]">
          {films.map((film, i) => (
            <li
              key={film.slug}
              className="md:w-[min(72vw,340px)] md:shrink-0 md:snap-start"
            >
              <WorkCard film={film} index={i} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Link
        href="/work/"
        className="mt-10 inline-flex text-sm uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-text sm:hidden"
      >
        All work ↗
      </Link>
    </section>
  );
}
