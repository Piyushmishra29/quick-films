import type { Metadata } from "next";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import LineReveal from "@/components/shared/LineReveal";
import TickerRuler from "@/components/shared/TickerRuler";
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
      <header className="mb-16 md:mb-24">
        <Reveal as="div">
          <SectionRule
            index="00"
            label="Selected Work"
            meta={`${films.length} Films`}
          />
        </Reveal>

        <h1 className="mt-10 max-w-3xl font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight md:mt-12 md:text-[6vw]">
          <LineReveal>Selected work</LineReveal>
        </h1>

        <Reveal as="div" delay={0.1}>
          <p className="mt-6 max-w-md text-muted">
            Eight films, edited and graded end to end at Quick Films —
            documentary, short-form, colour, and motion.
          </p>

          <div className="mt-10 md:mt-14" aria-hidden="true">
            <TickerRuler ticks={TICKS} duration={60} />
          </div>
        </Reveal>
      </header>

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
