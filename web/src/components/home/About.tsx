import Reveal from "@/components/shared/Reveal";

/**
 * About — short studio statement + stat chips. Anchored #about (nav target).
 * Section entrance uses the shared Reveal (motion beat 2). Accents stay small:
 * a yellow slash label and yellow stat values.
 */
const STATS = [
  { value: "48h", label: "Typical short-form turnaround" },
  { value: "9:16 · 1:1 · 16:9", label: "Formats delivered" },
  { value: "Resolve · Premiere · After Effects", label: "Cut, graded and finished in" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-24 md:px-10 md:py-40"
    >
      <Reveal>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-yellow">/</span> Studio
        </p>
      </Reveal>

      <Reveal>
        <h2
          id="about-heading"
          className="max-w-5xl text-balance font-display text-3xl font-medium leading-[1.05] tracking-tight text-text sm:text-4xl md:text-6xl"
        >
          Quick Films is a small edit room that treats the timeline like
          writing — <span className="text-muted">every cut, every frame and
          every grade earns its place.</span>
        </h2>
      </Reveal>

      <Reveal>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          We work with documentary and short-form footage, shaping raw material
          into pieces that move — edited for rhythm, graded for mood, finished
          with type and motion. No noise, no filler; just the picture, cut well.
        </p>
      </Reveal>

      <Reveal>
        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-3 md:mt-20">
          {STATS.map((s) => (
            <div key={s.label} className="bg-bg p-6 md:p-8">
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                {s.label}
              </dt>
              <dd className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-text md:text-2xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
