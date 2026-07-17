/**
 * Section furniture — a hairline divider carrying a small uppercase index
 * label on the left, a registration "+" at centre, and meta text on the right.
 * Mirrors the reference's "(0N) — LABEL ........ META" rulers used sitewide.
 */
export default function SectionRule({
  index,
  label,
  meta,
  className = "",
}: {
  index: string;
  label: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative border-t border-white/12">
        <span
          aria-hidden="true"
          className="qf-plus absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-sm"
        >
          +
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-muted">
        <span>
          <span className="text-muted">({index})</span>{" "}
          <span className="mx-1">—</span> {label}
        </span>
        {meta && <span className="tabular-nums">{meta}</span>}
      </div>
    </div>
  );
}
