import Reveal from "@/components/shared/Reveal";

/**
 * Stats band under the hero — a thin ruler over four big-number columns,
 * mirroring the reference's measured "index / figure / label" strip. Figures
 * are honest for a one-room studio (no invented client counts).
 */
const STATS = [
  { num: "01", value: "48H", label: "First-cut turnaround" },
  { num: "02", value: "04", label: "Delivery formats" },
  { num: "03", value: "100%", label: "One editor throughout" },
  { num: "04", value: "24H", label: "Reply time" },
];

export default function Stats() {
  return (
    <section
      aria-label="Studio at a glance"
      className="mx-auto w-full max-w-[1600px] px-5 py-20 md:px-10 md:py-28"
    >
      <Reveal>
        <div className="qf-ticks mb-10 w-full md:mb-12" />
        <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.num}>
              <dt className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted tabular-nums">
                {s.num}
              </dt>
              <dd>
                <span className="block font-display text-5xl font-medium leading-none tracking-tight text-text md:text-7xl">
                  {s.value}
                </span>
                <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
