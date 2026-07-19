import type { Metadata } from "next";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import LineReveal from "@/components/shared/LineReveal";
import TickerRuler from "@/components/shared/TickerRuler";
import SectionRule from "@/components/home/SectionRule";
import WorkRow from "@/components/work/WorkRow";
import { SITE_URL } from "../layout";

const TITLE =
  "Selected Work — Documentary & Brand Film Editing | Quick Films";
const DESCRIPTION =
  "Eight edited and graded films from Quick Films, Bengaluru — documentary, brand films, short-form reels and colour grade case studies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/work/" },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${SITE_URL}/work/`,
        },
      ],
    },
    {
      "@type": "ItemList",
      itemListElement: films.map((film, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/work/${film.slug}/`,
      })),
    },
  ],
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
