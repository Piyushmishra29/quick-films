"use client";

import { useRef, useState, useEffect } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";

/**
 * Stats band under the hero — a thin ruler over four big-number columns,
 * mirroring the reference's measured "index / figure / label" strip. Figures
 * are honest for a one-room studio (no invented client counts). Columns
 * stagger in on first scroll-into-view and each number counts up from 0;
 * static (final values, no stagger) under prefers-reduced-motion.
 */
const STATS = [
  { num: "01", value: "48H", label: "First-cut turnaround" },
  { num: "02", value: "04", label: "Projects completed" },
  { num: "03", value: "04", label: "Delivery formats" },
  { num: "04", value: "100%", label: "One editor throughout" },
  { num: "05", value: "24H", label: "Reply time" },
];

const CLIENTS = ["Drizzl", "Niko Works", "Eshwari Canteen"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const column: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Splits "04" -> { digits: 4, pad: 2, suffix: "" } so the counted number can
// be re-padded to the source string's width while it animates.
function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { digits: 0, pad: 0, suffix: value };
  const [, digits, suffix] = match;
  return { digits: Number(digits), pad: digits.length, suffix };
}

function CountUp({
  value,
  active,
  reduce,
}: {
  value: string;
  active: boolean;
  reduce: boolean | null;
}) {
  const { digits, pad, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(digits);
      return;
    }
    if (!active) return;
    const controls = animate(0, digits, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, digits, reduce]);

  return (
    <span className="tabular-nums">
      {String(display).padStart(pad, "0")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      aria-label="Studio at a glance"
      className="mx-auto w-full max-w-[1600px] px-5 py-20 md:px-10 md:py-28"
    >
      <div ref={ref} className="qf-ticks mb-10 w-full md:mb-12" />
      <motion.dl
        className="grid grid-cols-2 gap-y-12 md:grid-cols-5"
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : inView ? "show" : "hidden"}
        variants={reduce ? undefined : container}
      >
        {STATS.map((s) => (
          <motion.div key={s.num} variants={reduce ? undefined : column}>
            <dt className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted tabular-nums">
              {s.num}
            </dt>
            <dd>
              <span className="block font-display text-5xl font-medium leading-none tracking-tight text-text md:text-7xl">
                <CountUp value={s.value} active={inView} reduce={reduce} />
              </span>
              <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-muted">
                {s.label}
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Client roster — quiet single line under the figures */}
      <p className="mt-12 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.22em] text-muted md:mt-14">
        <span className="text-text">Clients</span>
        {" — "}
        {CLIENTS.join(" · ")}
      </p>
    </section>
  );
}
