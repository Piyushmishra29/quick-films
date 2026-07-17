"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

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
  "Long-form Edits",
  "Short-form Reels",
  "Colour Grade",
  "Motion & Titles",
];

const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];

export default function Hero() {
  const reduce = useReducedMotion();
  const mv = (v: Variants) => (reduce ? undefined : v);

  return (
    <motion.section
      aria-label="Quick Films"
      className="relative flex min-h-svh w-full flex-col overflow-hidden"
      variants={mv(container)}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {/* Full-bleed cinematic frame from our own footage */}
      <picture>
        <source srcSet="/hero@2x.jpg" media="(min-width: 900px)" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="A Kathakali performer in full costume at golden hour — a frame from Quick Films footage"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>
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
        <div className="qf-ticks w-full" />
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums">
          {TICKS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pb-6 md:px-10 md:pb-8">
        {/* REC chip */}
        <motion.div
          variants={mv(fade)}
          className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted md:mt-8"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-red" />
          <span className="tabular-nums">REC 00:00:03:12</span>
        </motion.div>

        {/* Services (left) + intro (right) */}
        <div className="mt-auto grid grid-cols-1 items-end gap-10 pb-8 sm:grid-cols-2 md:pb-10">
          <motion.div variants={mv(fade)}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-muted/70">(01)</span> — Services
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

        {/* Giant bottom-anchored wordmark */}
        <h1 className="font-display font-black uppercase leading-[0.8] tracking-[-0.04em] text-text">
          <span className="block overflow-hidden">
            <motion.span
              variants={mv(line)}
              className="block whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 13.5vw, 15rem)" }}
            >
              Quick Films
            </motion.span>
          </span>
        </h1>
      </div>
    </motion.section>
  );
}
