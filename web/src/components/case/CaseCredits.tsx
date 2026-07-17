import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";
import type { Film } from "@/lib/films";

export default function CaseCredits({
  credits,
  index = "03",
}: {
  credits: Film["credits"];
  index?: string;
}) {
  return (
    <Reveal as="section" className="mb-20 md:mb-28">
      <SectionRule
        index={index}
        label="Credits"
        meta={`${credits.length} Roles`}
      />
      <ul className="mx-auto mt-10 max-w-2xl divide-y divide-white/5 md:mt-12">
        {credits.map((c) => (
          <li
            key={`${c.role}-${c.name}`}
            className="flex items-center justify-between gap-6 py-4"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              {c.role}
            </span>
            <span className="text-lg text-text md:text-xl">{c.name}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
