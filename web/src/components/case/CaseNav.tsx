import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";
import type { Film } from "@/lib/films";

/**
 * Prev / next film navigation, wraps around the films list circularly.
 * Each link is dot-prefixed and pill-adjacent — a small rounded chip
 * carrying a red registration dot + "Previous"/"Next", sitting above the
 * big display-font title (mirrors the red "small signal" accents used for
 * pills/hovers sitewide).
 * Wrapped in a plain <nav> (Reveal's `as` union has no "nav" option) inside
 * a Reveal div so it still gets the sitewide scroll-reveal treatment.
 */
export default function CaseNav({
  prev,
  next,
  index = "04",
}: {
  prev: Film;
  next: Film;
  index?: string;
}) {
  return (
    <Reveal as="div">
      <SectionRule index={index} label="More Films" headingLevel="h2" />
      <nav
        aria-label="More films"
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14"
      >
        <Link href={`/work/${prev.slug}/`} className="group block">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 group-hover:border-red/40 group-hover:text-text">
            <span
              className="h-1.5 w-1.5 rounded-full bg-red group-hover:animate-pulse"
              aria-hidden="true"
            />
            Previous
          </span>
          <p className="font-display text-2xl font-bold uppercase leading-none text-text transition-colors duration-200 group-hover:text-red md:text-3xl">
            {prev.title}
          </p>
        </Link>

        <Link
          href={`/work/${next.slug}/`}
          className="group block sm:text-right"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-200 group-hover:border-red/40 group-hover:text-text">
            <span
              className="h-1.5 w-1.5 rounded-full bg-red group-hover:animate-pulse"
              aria-hidden="true"
            />
            Next
          </span>
          <p className="font-display text-2xl font-bold uppercase leading-none text-text transition-colors duration-200 group-hover:text-red md:text-3xl">
            {next.title}
          </p>
        </Link>
      </nav>
    </Reveal>
  );
}
