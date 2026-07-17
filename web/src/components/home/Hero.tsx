"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Kinetic type hero — motion beat 1 (spec §Motion): the stacked "QUICK FILMS"
 * wordmark rises in with a staggered translateY + fade, once on load.
 * No video here. Typography and spacing do the work; red/yellow stay as
 * small signals only. prefers-reduced-motion renders everything static.
 */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

// Masked line reveal for the giant wordmark (translateY + fade).
const line: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

// Smaller supporting bits fade up gently.
const fade: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const GIANT: React.CSSProperties = {
  fontSize: "clamp(3.75rem, 21vw, 20rem)",
  lineHeight: 0.82,
  letterSpacing: "-0.04em",
};

export default function Hero() {
  const reduce = useReducedMotion();

  const Word = ({ children }: { children: string }) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        variants={reduce ? undefined : line}
        style={GIANT}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <motion.section
      aria-label="Quick Films"
      className="mx-auto flex min-h-svh max-w-[1600px] flex-col justify-between px-5 pb-14 pt-32 md:px-10 md:pb-16 md:pt-40"
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      {/* Top metadata row */}
      <motion.div
        variants={reduce ? undefined : fade}
        className="flex items-start justify-between text-xs uppercase tracking-[0.22em] text-muted"
      >
        <span>
          <span className="text-yellow">©</span> 2026 — Quick Films
        </span>
        <span className="hidden sm:block">Bengaluru · Remote</span>
      </motion.div>

      {/* Giant stacked wordmark */}
      <div className="py-10 md:py-0">
        <motion.p
          variants={reduce ? undefined : fade}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-muted md:mb-8 md:text-sm"
        >
          <span className="text-yellow">/</span> Edit · Grade · Motion
        </motion.p>

        <h1 className="font-display font-black uppercase text-text">
          <Word>Quick</Word>
          <Word>Films</Word>
        </h1>
      </div>

      {/* Bottom positioning row */}
      <motion.div
        variants={reduce ? undefined : fade}
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <p className="max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg">
          An independent edit, colour and motion studio. We cut documentary and
          short-form work with rhythm and restraint — from a raw timeline to the
          final, graded frame.
        </p>
        <span className="hidden shrink-0 text-xs uppercase tracking-[0.22em] text-muted sm:block">
          Scroll ↓
        </span>
      </motion.div>
    </motion.section>
  );
}
