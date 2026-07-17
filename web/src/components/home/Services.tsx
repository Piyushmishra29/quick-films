import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Services — alternating rows carrying a big ghost index number, a landscape
 * thumbnail pulled from our own footage, a title and a short note. Mirrors the
 * reference's service ladder; sides alternate on desktop. Section entrance uses
 * the shared Reveal (motion beat 2).
 */
const SERVICES = [
  {
    num: "01",
    title: "Long-form Edit",
    note: "Documentary, interview and narrative cuts built for pace and clarity — structured so every beat earns the next.",
    thumb: "/stills/svc-01-school.jpg",
  },
  {
    num: "02",
    title: "Short-form & Reels",
    note: "Vertical 9:16 edits shaped for retention — a hook in the first second, paced for completion, turned around fast.",
    thumb: "/stills/svc-02-night.jpg",
  },
  {
    num: "03",
    title: "Colour Grade",
    note: "Filmic, consistent grades from raw to delivery — holding warmth in the light without giving up the shadows.",
    thumb: "/stills/svc-03-fiat.jpg",
  },
  {
    num: "04",
    title: "Motion & Titles",
    note: "Type, titles and motion that carry the frame — considered, restrained, cut to the picture.",
    thumb: "/stills/svc-04-carvaan.jpg",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 py-14 md:py-28"
    >
      <Reveal>
        <SectionRule
          index="07"
          label="Services"
          meta="What we do"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      <Reveal className="mx-auto max-w-[1600px] px-5 md:px-10">
        <h2
          id="services-heading"
          className="mt-10 font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Services
        </h2>
      </Reveal>

      <ul className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-10">
        {SERVICES.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <li
              key={s.num}
              className="border-t border-white/10 py-10 last:border-b md:py-14"
            >
              <Reveal>
                <div
                  className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 ${
                    reversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <span className="shrink-0 font-display text-6xl font-medium leading-none tracking-tight text-white/12 md:text-8xl">
                    {s.num}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.thumb}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-40 w-full max-w-[280px] shrink-0 rounded-md object-cover ring-1 ring-white/10 md:h-36"
                  />
                  <div
                    className={`flex-1 ${reversed ? "md:text-right" : ""}`}
                  >
                    <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text sm:text-4xl md:text-5xl">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base ${
                        reversed ? "md:ml-auto" : ""
                      }`}
                    >
                      {s.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
