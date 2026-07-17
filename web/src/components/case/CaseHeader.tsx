import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import type { Film } from "@/lib/films";

/**
 * Case page header: back-to-work link, huge title, yellow tags, meta row
 * (year / duration / role) — spec §Case.
 */
export default function CaseHeader({ film }: { film: Film }) {
  const roles = Array.from(new Set(film.credits.map((c) => c.role))).join(
    " · ",
  );

  return (
    <Reveal as="header" className="mb-14 md:mb-20">
      <Link
        href="/work/"
        className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-text"
      >
        <span aria-hidden="true">←</span> Work
      </Link>

      <h1 className="font-display text-[clamp(2.75rem,11vw,8rem)] font-black uppercase leading-[0.85] tracking-tight text-text">
        {film.title}
      </h1>

      <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
        {film.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-yellow/40 px-3 py-1 text-xs uppercase tracking-[0.15em] text-yellow"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-[0.2em] text-muted md:mt-10">
        <span>{film.year}</span>
        <span className="text-yellow" aria-hidden="true">
          /
        </span>
        <span>{film.duration}</span>
        {roles && (
          <>
            <span className="text-yellow" aria-hidden="true">
              /
            </span>
            <span>{roles}</span>
          </>
        )}
      </p>
    </Reveal>
  );
}
