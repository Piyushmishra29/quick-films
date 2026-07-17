import type { Metadata } from "next";
import { films } from "@/lib/films";
import Reveal from "@/components/shared/Reveal";
import WorkRow from "@/components/work/WorkRow";

export const metadata: Metadata = {
  title: "Work — Quick Films",
  description:
    "Selected work from Quick Films — documentary, short-form, colour grade, and motion.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <Reveal as="header" className="mb-16 md:mb-24">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">
          <span className="text-yellow">/</span> Work
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tight md:text-[6vw]">
          Selected work
        </h1>
        <p className="mt-6 max-w-md text-muted">
          Four films, edited and graded end to end at Quick Films —
          documentary, short-form, colour, and motion.
        </p>
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
