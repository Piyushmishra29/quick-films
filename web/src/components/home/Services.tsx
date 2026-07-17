import Reveal from "@/components/shared/Reveal";

/**
 * Services — numbered big-type list. Hover: the row fills, the index number
 * flips red and the label shifts. Pure CSS interaction (not one of the three
 * scripted motion beats); section entrance uses the shared Reveal (beat 2).
 */
const SERVICES = [
  {
    num: "01",
    title: "Long-form Edit",
    note: "Documentary, interview and narrative cuts built for pace and clarity.",
  },
  {
    num: "02",
    title: "Short-form & Reels",
    note: "Vertical 9:16 edits shaped for retention and rhythm.",
  },
  {
    num: "03",
    title: "Colour Grade",
    note: "Filmic, consistent grades from raw to delivery.",
  },
  {
    num: "04",
    title: "Motion & Titles",
    note: "Type, titles and motion that carry the frame.",
  },
];

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40"
    >
      <Reveal>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-yellow">/</span> What we do
        </p>
        <h2
          id="services-heading"
          className="mb-12 font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:mb-16 md:text-7xl lg:text-8xl"
        >
          Services
        </h2>
      </Reveal>

      <Reveal>
        <ul className="border-t border-white/10">
          {SERVICES.map((s) => (
            <li key={s.num}>
              <div className="group relative flex items-center gap-5 border-b border-white/10 px-2 py-7 transition-colors duration-300 hover:bg-surface md:gap-10 md:px-6 md:py-9">
                <span className="w-10 shrink-0 font-display text-base font-semibold tabular-nums text-muted transition-colors duration-300 group-hover:text-red md:w-14 md:text-lg">
                  {s.num}
                </span>
                <h3 className="flex-1 font-display text-3xl font-black uppercase leading-none tracking-tight text-text transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl md:text-6xl">
                  {s.title}
                </h3>
                <p className="hidden max-w-xs text-sm leading-relaxed text-muted md:block">
                  {s.note}
                </p>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
