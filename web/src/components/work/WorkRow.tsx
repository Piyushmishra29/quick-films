import Image from "next/image";
import Link from "next/link";
import type { Film } from "@/lib/films";

/**
 * One row of the /work index (spec §Work).
 * Desktop: full-width typographic row — the poster only reveals as a
 * floating thumbnail on row hover (CSS group-hover, no cursor tracking —
 * keeps to the "no cursor effects" motion restraint).
 * Mobile: stacked card with the poster always visible.
 */
export default function WorkRow({
  film,
  index,
}: {
  film: Film;
  index: number;
}) {
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${film.slug}/`}
      className="group relative flex items-center gap-5 border-b border-white/10 py-7 transition-colors duration-300 md:gap-8 md:py-9 md:hover:bg-white/[0.03]"
    >
      {/* Mobile poster — always visible; hidden md+ where it instead
          reveals as a floating thumbnail on hover. */}
      <div className="relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-sm bg-surface sm:w-28 md:hidden">
        <Image
          src={film.poster}
          alt=""
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span className="shrink-0 font-display text-sm tabular-nums text-yellow transition-colors duration-300 md:w-12 md:text-base md:group-hover:text-red">
          {indexStr}
        </span>

        <h2 className="min-w-0 flex-1 break-words font-display text-[8vw] font-black uppercase leading-[0.95] tracking-tight transition-transform duration-500 ease-out sm:text-[6vw] md:text-[4vw] md:group-hover:translate-x-3 lg:text-[3.2vw]">
          {film.title}
        </h2>

        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted md:flex-col md:items-end md:gap-1 md:text-right">
          <span>{film.tags.join(" · ")}</span>
          <span>
            {film.year} · {film.duration}
          </span>
        </div>
      </div>

      <span
        aria-hidden
        className="hidden shrink-0 text-lg text-red opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100"
      >
        →
      </span>

      {/* Desktop hover-reveal poster thumbnail — floats over the row,
          doesn't affect row layout/height. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-14 top-1/2 z-20 hidden w-[220px] -translate-y-1/2 scale-95 opacity-0 shadow-2xl shadow-black/70 transition-all duration-500 ease-out motion-reduce:transition-none md:block md:group-hover:scale-100 md:group-hover:opacity-100"
      >
        <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-surface">
          <Image
            src={film.poster}
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
