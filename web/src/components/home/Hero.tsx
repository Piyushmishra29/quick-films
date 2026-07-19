"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import TickerRuler from "@/components/shared/TickerRuler";

/**
 * Cinematic hero — motion beat 1 (spec §Motion). A full-bleed frame from our
 * own footage sits behind everything; the giant "QUICK FILMS" wordmark is
 * anchored at the bottom of the viewport and rises in on load. Section
 * furniture (timecode ruler, REC chip, services list, right-aligned intro)
 * frames it. Brand accents stay small: red REC dot, yellow index marks.
 * prefers-reduced-motion renders everything static.
 */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

// Masked line reveal for the giant wordmark.
const line: Variants = {
  hidden: { y: "108%" },
  show: {
    y: "0%",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

// Supporting bits fade up gently.
const fade: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const SERVICES = [
  "Narrative Films",
  "Brand Films",
  "Short-form Content",
  "Digital Ads",
];

const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];

// Running camera timecode (HH:MM:SS:FF at 24fps), isolated so its 24Hz
// re-renders never touch the rest of the hero. Static under reduced motion.
const TC_FPS = 24;
const TC_START_FRAMES = 3 * TC_FPS + 12; // matches the static "00:00:03:12"

function formatTimecode(totalFrames: number) {
  const ff = totalFrames % TC_FPS;
  const totalSeconds = Math.floor(totalFrames / TC_FPS);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600) % 24;
  return [hh, mm, ss, ff].map((n) => String(n).padStart(2, "0")).join(":");
}

function RecTimecode({ reduce }: { reduce: boolean }) {
  const [frames, setFrames] = useState(TC_START_FRAMES);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const f = TC_START_FRAMES + Math.floor(((now - start) / 1000) * TC_FPS);
      setFrames((prev) => (prev === f ? prev : f));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return <span className="tabular-nums">REC {formatTimecode(frames)}</span>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const mv = (v: Variants) => (reduce ? undefined : v);

  return (
    <motion.section
      aria-label="Quick Films"
      className="qf-minh-screen relative flex w-full flex-col overflow-hidden"
      variants={mv(container)}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {/* Full-bleed cinematic frames from our own footage.
          Desktop (>=768px): three vertical film-strips side by side.
          Mobile: a single tall composite. Both drift in a very slow Ken
          Burns (scaled up, easing vertically back and forth over ~40s) —
          ambient texture only, skipped entirely under reduced motion. */}
      <motion.div
        className="absolute inset-0 hidden grid-cols-3 md:grid"
        aria-hidden="true"
        style={reduce ? undefined : { scale: 1.06 }}
        animate={reduce ? undefined : { y: ["-2.5%", "2.5%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 40, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }
      >
        {[1, 2, 3].map((n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={n}
            src={`/hero-strip-${n}.jpg`}
            srcSet={`/hero-strip-${n}.jpg 1x, /hero-strip-${n}@2x.jpg 2x`}
            alt=""
            className="h-full w-full object-cover object-top"
            fetchPriority="high"
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute inset-0 md:hidden"
        style={reduce ? undefined : { scale: 1.06 }}
        animate={reduce ? undefined : { y: ["-2.5%", "2.5%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 40, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-mobile-2.jpg"
          srcSet="/hero-mobile-2.jpg 1x, /hero-mobile-2@2x.jpg 2x"
          alt="A helmeted rider silhouetted against a sunset sky"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>
      {/* Scrims: darken top for nav/ruler, bottom for the wordmark, and a
          global tint so the bright bokeh never fights the type. */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/70 to-transparent"
        aria-hidden="true"
      />

      {/* Timecode ruler across the top (below the nav) */}
      <motion.div
        variants={mv(fade)}
        aria-hidden="true"
        className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-24 md:px-10 md:pt-28"
      >
        <TickerRuler ticks={TICKS} duration={60} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pb-6 md:px-10 md:pb-8">
        {/* REC chip */}
        <motion.div
          variants={mv(fade)}
          className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted md:mt-8"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
            <RecTimecode reduce={!!reduce} />
          </span>
          <Link
            href="/work/reel/"
            className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-text"
          >
            <span
              aria-hidden="true"
              className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-yellow"
            />
            Play reel
          </Link>
        </motion.div>

        {/* Services (left) + intro (right) */}
        <div className="mt-auto grid grid-cols-1 items-end gap-10 pb-8 sm:grid-cols-2 md:pb-10">
          <motion.div variants={mv(fade)}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              — Services
            </p>
            <ul className="space-y-1.5">
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="font-display text-lg font-medium leading-tight text-text md:text-xl"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              (Est. 2026 — QF Reel v1)
            </p>
          </motion.div>

          <motion.div variants={mv(fade)} className="sm:text-right">
            <p className="ml-auto max-w-md text-balance text-base leading-relaxed text-muted md:text-lg">
              <span className="text-text">Cinematic editing</span> for documentary
              and short-form work —{" "}
              <span className="text-text">cut for rhythm</span> and graded so it{" "}
              <span className="text-text">feels like film</span>.
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              Editor · Colourist — Bengaluru
            </p>
          </motion.div>
        </div>

        {/* Giant bottom-anchored wordmark — sized via .qf-hero-wordmark
            (container-query width, vw fallback); the h1 is the container. */}
        <h1
          className="font-display font-black uppercase leading-[0.8] tracking-[-0.04em] text-text"
          style={{ containerType: "inline-size" }}
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={mv(line)}
              className="qf-hero-wordmark block whitespace-nowrap"
            >
              Quick Films
            </motion.span>
          </span>
          <span className="sr-only">
            {" "}
            — Narrative Films, Brand Films &amp; Video Editing Studio, Bengaluru
          </span>
        </h1>
      </div>
    </motion.section>
  );
}
