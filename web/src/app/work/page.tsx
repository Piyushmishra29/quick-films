import type { Metadata } from "next";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";
import WorkRow from "@/components/work/WorkRow";

const TITLE = "Work — Quick Films";
const DESCRIPTION =
  "Selected work from Quick Films — documentary, short-form, colour grade, and motion.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Quick Films",
    title: TITLE,
    description: DESCRIPTION,
    url: "/work/",
    images: [{ url: "/hero-desktop.jpg", width: 1600, height: 900, alt: "Quick Films" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-desktop.jpg"],
  },
};

// Decorative timecode ruler under the header — matches the ticks used
// sitewide (Hero / Stats / Footer). Not tied to a specific film's runtime.
const TICKS = ["00:00", "00:15", "00:30", "00:45", "01:00"];

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <Reveal as="header" className="mb-16 md:mb-24">
        <SectionRule
          index="00"
          label="Selected Work"
          meta={`${films.length} Films`}
        />

        <h1 className="mt-10 max-w-3xl font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight md:mt-12 md:text-[6vw]">
          Selected work
        </h1>
        <p className="mt-6 max-w-md text-muted">
          Four films, edited and graded end to end at Quick Films —
          documentary, short-form, colour, and motion.
        </p>

        <div className="mt-10 md:mt-14" aria-hidden="true">
          <div className="qf-ticks w-full" />
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums">
            {TICKS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <ul className="border-t border-white/10">
        {films.map((film, i) => (
          <Reveal key={film.slug} as="li" delay={Math.min(i * 0.05, 0.2)}>
            <WorkRow film={film} index={i} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
