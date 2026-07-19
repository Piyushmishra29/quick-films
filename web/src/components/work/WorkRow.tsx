import Image from "next/image";
import Link from "next/link";
import type { Film } from "@/lib/films";

/**
 * One row of the /work index (spec §Work), restyled to the sitewide
 * language established on the home page: yellow bracketed index, meta
 * labels at the 11px/0.22em tracking used throughout, and `.qf-frame`
 * viewfinder brackets on both the mobile poster and the desktop hover
 * thumbnail.
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
  // Small ~300px crop for the tiny poster boxes (mobile card + desktop hover
  // thumb) — the full poster is oversized for these ≤360px slots.
  const thumb = film.poster.replace(/\.jpg$/, "-thumb.jpg");
  const landscape = film.aspect === "16/9";

  return (
    <Link
      href={`/work/${film.slug}/`}
      prefetch={false}
      className="group relative flex items-center gap-5 border-b border-white/10 py-7 transition-colors duration-300 md:gap-8 md:py-9 md:hover:bg-white/[0.03]"
    >
      {/* Mobile poster — always visible; hidden md+ where it instead
          reveals as a floating thumbnail on hover. qf-frame sits on the
          outer box so its corner brackets (inset -8px) aren't clipped by
          the inner overflow-hidden. */}
      <div
        className={`qf-frame shrink-0 md:hidden ${
          landscape ? "w-36 sm:w-44" : "w-24 sm:w-28"
        }`}
      >
        <div
          className={`relative overflow-hidden bg-surface ${
            landscape ? "aspect-video" : "aspect-[9/16]"
          }`}
        >
          <Image
            src={thumb}
            alt={`${film.title} — poster frame`}
            fill
            sizes={landscape ? "176px" : "112px"}
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
        <span className="shrink-0 font-display text-sm tabular-nums text-yellow transition-colors duration-300 md:w-14 md:text-base md:group-hover:text-red">
          ({indexStr})
        </span>

        <h2 className="min-w-0 flex-1 break-words font-display text-[8vw] font-black uppercase leading-[0.95] tracking-tight transition-transform duration-500 ease-out sm:text-[6vw] md:text-[4vw] md:group-hover:translate-x-3 lg:text-[3.2vw]">
          {film.title}
        </h2>

        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-muted md:flex-col md:items-end md:gap-1.5 md:text-right">
          <span>{film.tags.join(" · ")}</span>
          <span className="tabular-nums">
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
        className={`qf-frame pointer-events-none absolute right-14 top-1/2 z-20 hidden -translate-y-1/2 scale-95 opacity-0 shadow-2xl shadow-black/70 transition-all duration-500 ease-out motion-reduce:transition-none md:block md:group-hover:scale-100 md:group-hover:opacity-100 ${
          landscape ? "w-[360px]" : "w-[220px]"
        }`}
      >
        <div
          className={`relative overflow-hidden bg-surface ${
            landscape ? "aspect-video" : "aspect-[9/16]"
          }`}
        >
          <Image
            src={thumb}
            alt=""
            fill
            sizes={landscape ? "360px" : "220px"}
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}
