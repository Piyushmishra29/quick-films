import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * About — a two-line studio statement (bright line over muted line, echoing the
 * reference), a film-credits list crediting everything to Quick Films, and a
 * short paragraph. Anchored #about (nav target). Entrances use Reveal (beat 2).
 */
const CREDITS = [
  { role: "Edit", name: "Quick Films" },
  { role: "Colour", name: "Quick Films" },
  { role: "Subtitles", name: "Quick Films" },
  { role: "Motion & Titles", name: "Quick Films" },
  { role: "Coffee", name: "Still Us" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <Reveal>
        <SectionRule
          index="07"
          label="Studio"
          meta="Est. 2026"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <h2
            id="about-heading"
            className="mt-12 max-w-5xl text-balance font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl md:mt-16 md:text-7xl"
          >
            <span className="text-text">Every cut, every frame</span>
            <br />
            <span className="text-muted">handled in one room.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="qf-frame mb-10 w-full max-w-[260px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stills/about-craft.jpg"
                alt="A chef at work in a low-lit kitchen — a graded frame from Quick Films footage"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover ring-1 ring-white/8"
              />
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Quick Films is a small edit room that treats the timeline like
              writing — documentary and short-form footage shaped into pieces
              that move. Edited for rhythm, graded for mood, finished with type
              and motion. No noise, no filler; just the picture, cut well.
            </p>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
              Same hands on every credit — from the first assembly to the final,
              graded frame.
            </p>
          </Reveal>

          <Reveal>
            <dl className="border-t border-white/10">
              {CREDITS.map((c) => (
                <div
                  key={c.role}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 py-5"
                >
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-muted">
                    {c.role}
                  </dt>
                  <dd className="font-display text-xl font-medium tracking-tight text-text md:text-2xl">
                    {c.name}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
