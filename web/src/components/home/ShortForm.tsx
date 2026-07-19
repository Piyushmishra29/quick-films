"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { films, type Film } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Short-form — a cinematic cluster of CSS-built devices, one per film. The hero
 * (centre, largest, forward) carries a restrained scroll parallax/tilt; the
 * other three fan out around it, slightly smaller, alternately raised/lowered
 * and rotated a few degrees for editorial depth (not a flat grid). An oversized
 * split SHORT / FORM sits behind as a watermark. Each phone shows its poster
 * first and plays a muted loop only on hover (desktop) or tap (mobile) — never
 * four videos at once. On < lg the cluster collapses to a snap-scroll row of
 * upright phones. prefers-reduced-motion pins the tilt/parallax; posters stay.
 */

const byId = (slug: string): Film =>
  films.find((f) => f.slug === slug) ?? films[0];

// Hero cut sits centre-stage; the rest fan around it.
const HERO = byId("kathakali");

// Desktop fan, left → right. `hero` gets the parallax; others are static.
type Slot = {
  film: Film;
  rot: number; // static rotation (deg)
  ty: number; // vertical offset (px) — alternates up/down
  scale: number;
  z: string; // z-index utility
  ml: string; // overlap into the previous phone
  hero?: boolean;
};

const FAN: Slot[] = [
  { film: byId("interview"), rot: -11, ty: 44, scale: 0.78, z: "z-10", ml: "ml-0" },
  { film: byId("niko-theyyam"), rot: -6, ty: 16, scale: 0.88, z: "z-20", ml: "-ml-10" },
  { film: byId("dave-busters"), rot: -3, ty: 0, scale: 0.95, z: "z-30", ml: "-ml-8" },
  { film: HERO, rot: 0, ty: -8, scale: 1.08, z: "z-40", ml: "-ml-6", hero: true },
  { film: byId("project-grain"), rot: 4, ty: 4, scale: 0.93, z: "z-30", ml: "-ml-6" },
  { film: byId("pe"), rot: 9, ty: 40, scale: 0.8, z: "z-10", ml: "-ml-10" },
];

// Mobile row: every vertical film (landscape cuts don't belong in a phone frame).
const VERTICALS = films.filter((f) => f.aspect === "9/16");

// Per-film engagement numbers for the Reels rail — varied so the cluster
// reads like six real posts, not one mock repeated. Deterministic (keyed by
// slug, not random) so SSR and hydration always agree.
const REEL_STATS: Record<
  string,
  { likes: string; comments: string; shares: string }
> = {
  kathakali: { likes: "128k", comments: "1.2k", shares: "8.4k" },
  "dave-busters": { likes: "74.2k", comments: "892", shares: "5.6k" },
  "niko-theyyam": { likes: "56.3k", comments: "487", shares: "2.1k" },
  "project-grain": { likes: "31.7k", comments: "356", shares: "1.8k" },
  interview: { likes: "24.1k", comments: "214", shares: "986" },
  pe: { likes: "18.9k", comments: "163", shares: "742" },
};
const REEL_STATS_FALLBACK = { likes: "12.4k", comments: "98", shares: "312" };

// Small decorative Reels rail — inline so no assets/deps ship.
function RailIcon({ d, count }: { d: React.ReactNode; count: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-none stroke-white/95"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {d}
      </svg>
      <span className="text-[10px] font-medium tabular-nums text-white/85">
        {count}
      </span>
    </div>
  );
}

/**
 * One CSS device: bezel, dynamic island, edge highlight, drop shadow and the
 * Reels chrome. Poster first; muted loop plays on hover (desktop) / tap toggle
 * (mobile). preload="none" so nothing streams until asked — the whole reason
 * only the hovered phone ever plays. Self-contained state, so four instances
 * never autoplay together.
 */
function Phone({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const stats = REEL_STATS[film.slug] ?? REEL_STATS_FALLBACK;

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
    // Re-assert muted on the element itself before play() — belt-and-braces
    // for Safari, where an unmuted programmatic play() outside a gesture
    // would be rejected (or worse, blast audio).
    v.muted = true;
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

  return (
    <div
      className="group relative rounded-[2.6rem] p-[3px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      style={{
        background:
          "linear-gradient(150deg,#3a3a38 0%,#141412 32%,#0c0c0b 60%,#2b2b29 100%)",
      }}
      onMouseEnter={canHover ? play : undefined}
      onMouseLeave={canHover ? stop : undefined}
    >
      {/* Edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2.6rem] ring-1 ring-white/10"
      />
      {/* Screen */}
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] bg-black ring-1 ring-black/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={film.poster}
          alt={`${film.title} — vertical frame`}
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

        {/* Legibility scrims for the chrome */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent"
        />

        {/* Dynamic island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-3 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
        />

        {/* Top tabs */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-8 flex items-center justify-between px-4 text-white"
        >
          <span className="text-lg leading-none opacity-90">+</span>
          <span className="text-[13px] font-semibold tracking-tight">
            Reels <span className="font-normal text-white/45">Friends</span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] fill-none stroke-white/90"
            strokeWidth={1.6}
            strokeLinecap="round"
          >
            <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
            <circle cx="15" cy="7" r="2.2" />
            <circle cx="7" cy="17" r="2.2" />
          </svg>
        </div>

        {/* Right interaction rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-24 right-3 flex flex-col items-center gap-4"
        >
          <RailIcon
            count={stats.likes}
            d={
              <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c1.9 0 3 1 2.6 1.8C9 6 10 5.5 12 5.5s3 .5 3.9 1.8c-.4-.8.7-1.8 2.6-1.8 3 0 4.5 3 3 6C19 15.65 12 20 12 20z" />
            }
          />
          <RailIcon
            count={stats.comments}
            d={
              <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
            }
          />
          <RailIcon
            count={stats.shares}
            d={<path d="M22 3 11 14M22 3l-7 18-4-8-8-4 19-6z" />}
          />
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-none stroke-white/95"
            strokeWidth={1.6}
            strokeLinejoin="round"
          >
            <path d="M6 4h12v17l-6-4-6 4z" />
          </svg>
        </div>

        {/* Handle + caption */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
          <p className="text-[13px] font-semibold text-white">@quickfilms</p>
          <p className="mt-1 max-w-[80%] text-[11px] leading-snug text-white/80">
            {film.title}
          </p>
        </div>

        {/* Touch play toggle */}
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
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-text backdrop-blur-sm transition active:scale-95"
          >
            <span className="text-base leading-none">{active ? "❚❚" : "►"}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ShortForm() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Restrained scroll parallax on the hero phone only: it drifts up a touch and
  // tilts a few degrees as it crosses the viewport. Spring-smoothed; off when
  // reduced-motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [38, -54]);
  const rotRaw = useTransform(scrollYProgress, [0, 1], [4.5, -4.5]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 20, mass: 0.4 });
  const rot = useSpring(rotRaw, { stiffness: 60, damping: 20, mass: 0.4 });

  const heroStyle = reduce
    ? { scale: 1.08 }
    : { y, rotateZ: rot, scale: 1.08 };

  return (
    <section
      ref={sectionRef}
      id="short-form"
      aria-labelledby="short-form-heading"
      className="scroll-mt-24 overflow-hidden py-14 md:py-28"
    >
      <Reveal>
        <SectionRule
          index="01"
          label="Mini Films"
          meta="6 Reels · 9:16"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      {/* Mobile / tablet heading (the desktop watermark replaces this on lg+). */}
      <Reveal className="mx-auto max-w-[1600px] px-5 lg:hidden">
        <h2
          id="short-form-heading"
          className="mt-10 text-center font-display text-[18vw] font-black uppercase leading-[0.82] tracking-tight"
        >
          <span className="block text-text">Mini</span>
          <span className="block text-muted">Films</span>
        </h2>
      </Reveal>

      {/* ============================= DESKTOP ============================= */}
      {/* Stage: oversized split watermark behind, staggered phone fan in front. */}
      <div className="relative mx-auto mt-14 hidden max-w-[1600px] px-10 lg:block">
        {/* Watermark type — sits behind, corners peek around the cluster. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <span className="absolute left-0 top-0 font-display font-black uppercase leading-[0.78] tracking-tight text-text/90 [font-size:clamp(5rem,12vw,12rem)]">
            Mini
          </span>
          <span className="absolute bottom-0 right-0 font-display font-black uppercase leading-[0.78] tracking-tight text-muted/70 [font-size:clamp(5rem,12vw,12rem)]">
            Films
          </span>
        </div>
        <h2 id="short-form-heading-desktop" className="sr-only">
          Mini Films
        </h2>

        {/* Phone fan */}
        <div className="relative z-10 flex items-center justify-center py-10 [perspective:1400px]">
          {FAN.map((slot, i) => {
            const width =
              "w-[clamp(140px,14vw,205px)]";
            const inner = slot.hero ? (
              <motion.div style={heroStyle} className={width}>
                <Phone film={slot.film} />
              </motion.div>
            ) : (
              <div
                className={width}
                style={{
                  transform: `translateY(${slot.ty}px) rotate(${slot.rot}deg) scale(${slot.scale})`,
                }}
              >
                <Phone film={slot.film} />
              </div>
            );

            return (
              <Reveal
                key={slot.film.slug}
                delay={i * 0.08}
                className={`relative ${slot.z} ${slot.ml}`}
              >
                {inner}
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ============================== MOBILE ============================== */}
      {/* Snap-scroll row of upright phones — no cramming, no page overflow. */}
      <div className="mt-10 lg:hidden">
        <div className="qf-noscroll flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 [-webkit-overflow-scrolling:touch]">
          {VERTICALS.map((film) => (
            <div
              key={film.slug}
              className="w-[68vw] max-w-[300px] shrink-0 snap-center [perspective:1200px]"
            >
              <Phone film={film} />
            </div>
          ))}
        </div>
        <p className="mt-3 px-5 text-center text-[11px] uppercase tracking-[0.22em] text-muted">
          Swipe · six cuts
        </p>
      </div>

      {/* Meta ruler under the cluster (scope · count · ratio). */}
      <Reveal className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <div className="grid grid-cols-1 gap-3 border-t border-white/12 pt-5 text-[11px] uppercase tracking-[0.22em] text-muted sm:grid-cols-3 sm:items-center">
          <span>Edit · Colour · Quick Films</span>
          <span className="sm:text-center tabular-nums">Six Cuts — 01–06</span>
          <span className="sm:text-right">Ratio — 9:16</span>
        </div>
      </Reveal>

    </section>
  );
}
