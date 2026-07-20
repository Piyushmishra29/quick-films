"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";
import type { Clip } from "@/lib/films";

/**
 * Clip-gallery section for films that carry a `clips` array (currently only
 * "Postcards"). The single montage stays the page hero (CasePlayer, up top);
 * this takes the montage apart into six printed postcards pinned to a wall.
 *
 * Each postcard is a warm-paper mat around one graded clip, tilted a touch and
 * straightened on hover/focus (CSS, see `.qf-postcard` in globals.css). The
 * clip's video autoplays MUTED + looped only while it is ≥60% in view and
 * pauses + rewinds when it scrolls out, so nothing streams until asked
 * (`preload="none"`) and only the on-screen cards ever play. Under
 * prefers-reduced-motion there is no autoplay — the poster shows with a
 * tap-to-play toggle instead.
 *
 * Desktop layout is a two-column scrapbook: the right column is offset down and
 * the cards drift horizontally, so it reads as a loose wall rather than a grid.
 * Mobile collapses to a single column with the tilt halved. Static-export safe.
 */

// Rest tilt per wall position (desktop). Mobile uses half of each.
const TILT = [-2.2, 1.8, 2.4, -1.6, 1.4, -2.0];
// Accent that rings each postmark — alternating brand red / yellow.
const ACCENT = ["var(--red)", "var(--yellow)"];
// Gentle horizontal drift so the wall never lines up into a grid (desktop).
const DRIFT = ["md:-translate-x-2", "md:translate-x-3"];

function Postmark({ location, accent }: { location: string; accent: string }) {
  return (
    <span
      aria-hidden="true"
      className="qf-postmark absolute -right-3 -top-4 z-20 flex h-[68px] w-[68px] rotate-[-11deg] flex-col items-center justify-center rounded-full"
      style={{ ["--accent" as string]: accent }}
    >
      {/* cancellation bars struck across the stamp */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex -rotate-[24deg] flex-col gap-[3px]">
          <span className="qf-postmark-bar h-[1.5px] w-9 opacity-70" />
          <span className="qf-postmark-bar h-[1.5px] w-9 opacity-70" />
          <span className="qf-postmark-bar h-[1.5px] w-9 opacity-70" />
        </span>
      </span>
      <span className="relative z-10 text-[6px] font-semibold uppercase leading-none tracking-[0.28em] text-[#4a463d]">
        Quick
      </span>
      <span className="relative z-10 mt-[3px] max-w-[52px] text-center text-[8px] font-bold uppercase leading-[1.05] tracking-[0.1em] text-[#201e19]">
        {location}
      </span>
      <span className="relative z-10 mt-[2px] text-[6px] font-semibold uppercase leading-none tracking-[0.28em] text-[#4a463d]">
        Films
      </span>
    </span>
  );
}

function Postcard({ clip, position }: { clip: Clip; position: number }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { amount: 0.6 });
  const [playing, setPlaying] = useState(false);

  const tiltD = TILT[position % TILT.length];
  const tiltM = tiltD / 2;
  const accent = ACCENT[position % ACCENT.length];

  // Autoplay-in-view (motion path only). Play while on screen, pause + rewind
  // when it leaves so out-of-view cards never keep streaming.
  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.muted = true;
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    }
  }, [inView, reduce]);

  // Reduced-motion tap toggle — playback only ever starts from a real gesture.
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.muted = true;
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.div
      className={`${DRIFT[position % DRIFT.length]} w-full`}
      initial={reduce ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min((position % 3) * 0.08, 0.24),
      }}
    >
      <figure
        className="qf-postcard relative rounded-[3px] p-2.5 md:p-3"
        style={
          {
            ["--rot-d" as string]: `${tiltD}deg`,
            ["--rot-m" as string]: `${tiltM}deg`,
          } as React.CSSProperties
        }
      >
        <Postmark location={clip.location} accent={accent} />

        <div
          ref={mediaRef}
          className="relative aspect-video overflow-hidden rounded-[2px] bg-black ring-1 ring-black/40"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={clip.poster}
            alt={`${clip.title} — postcard from ${clip.location}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            ref={videoRef}
            src={clip.video}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Reduced-motion: poster + tap-to-play toggle (no autoplay). */}
          {reduce && (
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? `Pause ${clip.title}` : `Play ${clip.title}`}
              className={`group/btn absolute z-10 flex items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-200 hover:bg-black/70 ${
                playing
                  ? "bottom-2 left-2 h-9 w-9"
                  : "inset-0 m-auto h-14 w-14"
              }`}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}

          {/* Duration chip — same tabular-nums treatment as the site's media. */}
          <span className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] tabular-nums text-white/90 ring-1 ring-white/15 backdrop-blur-sm">
            {clip.duration}
          </span>
        </div>

        <figcaption className="px-1 pb-1 pt-3">
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-[#201e19] md:text-xl">
            {clip.title}
          </h3>
          <p className="mt-1.5 max-w-[42ch] text-[13px] leading-snug text-[#615c51]">
            {clip.note}
          </p>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default function PostcardsGallery({
  clips,
  index,
}: {
  clips: Clip[];
  index: string;
}) {
  // Split into two wall columns; the right one is offset down for the stagger.
  const left = clips.filter((_, i) => i % 2 === 0);
  const right = clips.filter((_, i) => i % 2 === 1);

  return (
    <section className="mb-16 md:mb-24">
      <Reveal>
        <SectionRule
          index={index}
          label="Six Postcards"
          meta={`${clips.length} Clips`}
          headingLevel="h2"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted md:mt-10">
          The full cut, taken apart and pinned to the wall — six frames from the
          road, each graded to feel like the place did. They play as you pass.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-14 sm:gap-16 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24 lg:gap-x-20">
        <div className="flex flex-col gap-14 sm:gap-16 md:gap-24">
          {left.map((clip) => (
            <Postcard
              key={clip.id}
              clip={clip}
              position={clips.indexOf(clip)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-14 sm:gap-16 md:mt-28 md:gap-24">
          {right.map((clip) => (
            <Postcard
              key={clip.id}
              clip={clip}
              position={clips.indexOf(clip)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
