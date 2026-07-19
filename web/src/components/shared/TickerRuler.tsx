"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Timecode ruler with a sweeping red playhead. `duration` is the real-time
 * seconds the playhead takes to cross the full ruler — match it to the tick
 * labels (e.g. ticks ending at 01:00 → duration 60). Static under
 * prefers-reduced-motion.
 *
 * The playhead animates transform, not `left`: a full-width wrapper slides
 * x −100% → 0 (its own width == the ruler width), with the 1px line pinned
 * to the wrapper's right edge. Compositor-only, no per-frame layout.
 */
export default function TickerRuler({
  ticks,
  duration,
}: {
  ticks: string[];
  duration: number;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="relative">
        <div className="qf-ticks w-full" />
        {!reduce && (
          <motion.span
            className="pointer-events-none absolute -top-1 bottom-0 left-0 block w-full"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            <span className="absolute inset-y-0 right-0 w-px bg-red">
              <span className="absolute -top-[3px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-red" />
            </span>
          </motion.span>
        )}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </>
  );
}
