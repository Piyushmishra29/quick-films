"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Film } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * A single work row, styled after the reference's per-project block:
 *   ruler label  →  framed media (our 9:16 film)  →  repeating title marquee
 *   →  three-column meta row.
 * Hover plays the muted film over the poster (motion beat 3); the media is the
 * link through to the case page. Touch devices get an explicit play toggle.
 */
export default function WorkFilm({
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
      e.preventDefault();
      e.stopPropagation();
      if (active) stop();
      else play();
    },
    [active, play, stop],
  );

  const num = String(index + 1).padStart(2, "0");
  // Repeating title track — one set, duplicated for a seamless -50% loop.
  const track = Array.from({ length: 4 });

  return (
    <div className="py-16 md:py-24">
      <Reveal>
        <SectionRule
          index={num}
          label="Selected Work"
          meta={film.year}
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      {/* Framed media */}
      <Reveal className="mx-auto mt-12 flex max-w-[1600px] justify-center px-5 md:mt-16 md:px-10">
        <Link
          href={`/work/${film.slug}/`}
          prefetch={false}
          className="group qf-frame block w-[min(78vw,340px)] focus:outline-none"
          onMouseEnter={canHover ? play : undefined}
          onMouseLeave={canHover ? stop : undefined}
        >
          <div className="relative aspect-[9/16] overflow-hidden bg-surface ring-1 ring-white/8 transition duration-500 group-hover:ring-white/15 group-focus-visible:ring-red">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={film.poster}
              alt={`${film.title} — poster frame`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <video
              ref={videoRef}
              src={film.video}
              poster={film.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] tabular-nums text-text backdrop-blur-sm"
            >
              {film.duration}
            </span>
            {!canHover && (
              <button
                type="button"
                onClick={toggle}
                aria-label={
                  active
                    ? `Pause ${film.title} preview`
                    : `Play ${film.title} preview`
                }
                aria-pressed={active}
                className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-text backdrop-blur-sm active:scale-95"
              >
                <span className="text-sm leading-none">{active ? "❚❚" : "►"}</span>
              </button>
            )}
          </div>
        </Link>
      </Reveal>

      {/* Repeating title marquee */}
      <div
        aria-hidden="true"
        className="mt-12 overflow-hidden md:mt-16 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="qf-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {track.map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-8 font-display text-[13vw] font-black uppercase leading-none tracking-tight text-text/85 md:text-[9vw]">
                    {film.title}
                  </span>
                  <span className="qf-plus text-3xl md:text-4xl">+</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Meta row */}
      <Reveal className="mx-auto mt-10 max-w-[1600px] px-5 md:mt-12 md:px-10">
        <div className="grid grid-cols-1 gap-3 text-[11px] uppercase tracking-[0.2em] text-muted sm:grid-cols-3 sm:items-center">
          <span className="text-text">{film.title}</span>
          <span className="sm:text-center">{film.tags.join(" · ")}</span>
          <Link
            href={`/work/${film.slug}/`}
            className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-text sm:justify-self-end"
          >
            View case <span className="text-red">↗</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
