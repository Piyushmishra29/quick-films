"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Full-width, 2px scroll-progress scrubber pinned to the very top of the
 * viewport — above the nav border and stacked over the nav (z-[60]), purely
 * decorative (aria-hidden, pointer-events-none).
 *
 * The brand-red fill is a scaleX-transformed bar (transform-origin left) so it
 * stays compositor-only — no per-frame layout. A tiny red playhead dot rides
 * the leading edge (like TickerRuler's), and a barely-visible white hairline
 * sits behind as the track.
 *
 * Under prefers-reduced-motion we still render the bar — it's a position
 * indicator, not an animation — but drop the spring and track raw
 * scrollYProgress directly.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = reduce ? scrollYProgress : smoothed;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      {/* Track — barely-visible hairline behind the fill */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Fill — scaleX from 0→1, origin left, compositor-only */}
      <motion.div
        className="absolute inset-0 origin-left bg-red"
        style={{ scaleX }}
      >
        {/* Playhead dot at the leading edge of the fill */}
        <span className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red" />
      </motion.div>
    </div>
  );
}
