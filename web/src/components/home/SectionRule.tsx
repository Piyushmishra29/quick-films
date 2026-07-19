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
  headingLevel,
}: {
  index: string;
  label: string;
  meta?: string;
  className?: string;
  /** Render the label as a real heading (case pages need an h2 under the
   * film-title h1). Same classes either way — visuals never change. */
  headingLevel?: "h2";
}) {
  const LabelTag = headingLevel ?? "span";

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
        <LabelTag className={headingLevel ? "m-0 inline" : undefined}>
          <span className="text-muted">({index})</span>{" "}
          <span className="mx-1">—</span> {label}
        </LabelTag>
        {meta && <span className="tabular-nums">{meta}</span>}
      </div>
    </div>
  );
}
