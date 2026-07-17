"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Film } from "@/lib/films";

/**
 * Work reel card — motion beat 3 (spec §Motion): a muted looping video fades
 * in over the poster with a subtle 1.02 scale and the title shifts on hover.
 * Desktop (hover-capable pointers) plays on hover; touch devices get an
 * explicit tap-to-play toggle so the card itself stays a navigation link.
 */
export default function WorkCard({
  film,
  index,
}: {
  film: Film;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setCanHover(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setActive(true)).catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setActive(false);
  }, []);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      // Touch affordance: don't navigate, just play/pause the preview.
      e.preventDefault();
      e.stopPropagation();
      if (active) stop();
      else play();
    },
    [active, play, stop],
  );

  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${film.slug}/`}
      className="group flex flex-col gap-4 focus:outline-none"
      onMouseEnter={canHover ? play : undefined}
      onMouseLeave={canHover ? stop : undefined}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-surface ring-1 ring-white/5 transition-shadow duration-300 group-hover:ring-white/10 group-focus-visible:ring-red">
        {/* Poster */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={film.poster}
          alt={`${film.title} — poster frame`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Hover video (beat 3) */}
        <video
          ref={videoRef}
          src={film.video}
          poster={film.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out ${
            active ? "scale-[1.02] opacity-100" : "scale-100 opacity-0"
          }`}
        />

        {/* Index number — small yellow signal. A subtle dark text-shadow keeps
            the yellow legible over bright/warm poster regions (Theyyam orange,
            etc.) without the muddy inversion mix-blend-difference caused. */}
        <span
          className="absolute left-3 top-3 font-display text-sm font-semibold tabular-nums text-yellow"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
        >
          {num}
        </span>

        {/* Duration chip */}
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] tabular-nums text-text backdrop-blur-sm">
          {film.duration}
        </span>

        {/* Touch-only play toggle */}
        {!canHover && (
          <button
            type="button"
            onClick={toggle}
            aria-label={active ? `Pause ${film.title} preview` : `Play ${film.title} preview`}
            aria-pressed={active}
            className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-text backdrop-blur-sm active:scale-95"
          >
            <span className="text-sm leading-none">{active ? "❚❚" : "►"}</span>
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold uppercase leading-none tracking-tight text-text transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
            {film.title}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted">
            {film.tags.join(" · ")}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-red"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
