"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Timecode ruler with a sweeping red playhead. `duration` is the real-time
 * seconds the playhead takes to cross the full ruler — match it to the tick
 * labels (e.g. ticks ending at 01:00 → duration 60). Static under
 * prefers-reduced-motion.
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
            className="absolute -top-1 bottom-0 w-px bg-red"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            <span className="absolute -top-[3px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-red" />
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
