import Link from "next/link";

/**
 * Quick Films wordmark: "quick" set light + italic (script-ish),
 * "FILMS" heavy uppercase. Sized by the parent via font-size on the root.
 * Used at nav scale and oversized in the footer.
 */
export default function Wordmark({
  className = "",
  href = "/",
  style,
}: {
  className?: string;
  href?: string | null;
  style?: React.CSSProperties;
}) {
  const content = (
    <span
      className={`inline-flex items-baseline gap-[0.15em] font-display leading-none ${className}`}
      style={style}
      aria-label="Quick Films"
    >
      <span className="font-light italic tracking-tight text-text">quick</span>
      <span className="font-black uppercase tracking-tight text-text">
        FILMS
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} className="inline-block" aria-label="Quick Films — home">
      {content}
    </Link>
  );
}
