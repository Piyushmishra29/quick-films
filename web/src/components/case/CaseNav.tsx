import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import type { Film } from "@/lib/films";

/**
 * Prev / next film navigation, wraps around the films list circularly.
 * Wrapped in a plain <nav> (Reveal's `as` union has no "nav" option) inside
 * a Reveal div so it still gets the sitewide scroll-reveal treatment.
 */
export default function CaseNav({ prev, next }: { prev: Film; next: Film }) {
  return (
    <Reveal as="div">
      <nav
        aria-label="More films"
        className="grid grid-cols-1 gap-8 border-t border-white/5 pt-10 sm:grid-cols-2 md:pt-14"
      >
        <Link href={`/work/${prev.slug}/`} className="group block">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-muted">
            <span aria-hidden="true">←</span> Previous
          </p>
          <p className="font-display text-2xl font-bold uppercase leading-none text-text transition-colors duration-200 group-hover:text-red md:text-3xl">
            {prev.title}
          </p>
        </Link>

        <Link
          href={`/work/${next.slug}/`}
          className="group block sm:text-right"
        >
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-muted">
            Next <span aria-hidden="true">→</span>
          </p>
          <p className="font-display text-2xl font-bold uppercase leading-none text-text transition-colors duration-200 group-hover:text-red md:text-3xl">
            {next.title}
          </p>
        </Link>
      </nav>
    </Reveal>
  );
}
