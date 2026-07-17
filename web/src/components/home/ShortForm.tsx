"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Short-form — mirrors the reference's phone-mockup section (its "(0N) —
 * SHORT-FORM REELS"): a single CSS-built device sits centre-stage with our own
 * 9:16 film reeling inside a Reels-style chrome, flanked behind by an oversized
 * split display headline (SHORT / FORM). The phone tilts and parallaxes gently
 * on scroll (restrained, prefers-reduced-motion safe). Hover/in-view plays the
 * muted loop over the poster on desktop; touch gets a tap toggle — same pattern
 * as WorkFilm. Meta ruler below (editor · runtime · ratio) echoes the reference.
 */

// Feature a genuinely short-form cut from our own reel.
const FEATURE = films.find((f) => f.slug === "kathakali") ?? films[0];

// Small decorative Reels rail — inline so no assets/deps ship.
function RailIcon({
  d,
  count,
}: {
  d: React.ReactNode;
  count: string;
}) {
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

export default function ShortForm() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
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

  // Restrained scroll parallax: the phone drifts up a touch and tilts a few
  // degrees as it crosses the viewport. Spring-smoothed; disabled when reduced.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [46, -46]);
  const rotRaw = useTransform(scrollYProgress, [0, 1], [4.5, -4.5]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 20, mass: 0.4 });
  const rot = useSpring(rotRaw, { stiffness: 60, damping: 20, mass: 0.4 });

  const phoneStyle = reduce ? undefined : { y, rotateZ: rot };

  return (
    <section
      ref={sectionRef}
      id="short-form"
      aria-labelledby="short-form-heading"
      className="scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <Reveal>
        <SectionRule
          index="05"
          label="Short Form"
          meta="Reels · 9:16"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      {/* Mobile heading (the flanking split type is desktop-only). */}
      <Reveal className="mx-auto max-w-[1600px] px-5 md:hidden">
        <h2
          id="short-form-heading"
          className="mt-10 text-center font-display text-[19vw] font-black uppercase leading-[0.82] tracking-tight"
        >
          <span className="block text-text">Short</span>
          <span className="block text-muted">Form</span>
        </h2>
      </Reveal>

      {/* Stage: oversized split type behind, phone in front. */}
      <div className="relative mt-10 flex items-center justify-center md:mt-16">
        {/* Flanking display type — sits behind, tucked under the phone edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center gap-[min(24vw,300px)] md:flex"
        >
          <span className="font-display font-black uppercase leading-none tracking-tight text-text [font-size:clamp(4rem,15vw,15rem)]">
            Short
          </span>
          <span className="font-display font-black uppercase leading-none tracking-tight text-muted [font-size:clamp(4rem,15vw,15rem)]">
            Form
          </span>
        </div>
        {/* Desktop a11y heading (visually the flanking type above). */}
        <h2
          id="short-form-heading-desktop"
          className="sr-only hidden md:block"
        >
          Short Form
        </h2>

        {/* Phone */}
        <motion.div
          style={phoneStyle}
          className="relative z-10 w-[min(74vw,300px)] [perspective:1200px]"
        >
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
                src={FEATURE.poster}
                alt={`${FEATURE.title} — vertical frame`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <video
                ref={videoRef}
                src={FEATURE.video}
                poster={FEATURE.poster}
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
                  Reels{" "}
                  <span className="font-normal text-white/45">Friends</span>
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
                  count="42.6k"
                  d={
                    <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c1.9 0 3 1 2.6 1.8C9 6 10 5.5 12 5.5s3 .5 3.9 1.8c-.4-.8.7-1.8 2.6-1.8 3 0 4.5 3 3 6C19 15.65 12 20 12 20z" />
                  }
                />
                <RailIcon
                  count="318"
                  d={
                    <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
                  }
                />
                <RailIcon
                  count="1.1k"
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
                <p className="text-[13px] font-semibold text-white">
                  @quickfilms
                </p>
                <p className="mt-1 max-w-[80%] text-[11px] leading-snug text-white/80">
                  {FEATURE.title} — cut tight to the movement.
                </p>
              </div>

              {/* Touch play toggle */}
              {!canHover && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={
                    active
                      ? `Pause ${FEATURE.title} preview`
                      : `Play ${FEATURE.title} preview`
                  }
                  aria-pressed={active}
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-text backdrop-blur-sm transition active:scale-95"
                >
                  <span className="text-base leading-none">
                    {active ? "❚❚" : "►"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Meta ruler under the phone (editor · runtime · ratio). */}
      <Reveal className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <div className="grid grid-cols-1 gap-3 border-t border-white/12 pt-5 text-[11px] uppercase tracking-[0.22em] text-muted sm:grid-cols-3 sm:items-center">
          <span>Editor · Colourist</span>
          <span className="sm:text-center tabular-nums">
            Runtime — {FEATURE.duration}
          </span>
          <span className="sm:text-right">Ratio — 9:16</span>
        </div>
      </Reveal>
    </section>
  );
}
