import Reveal from "@/components/shared/Reveal";
import type { Film } from "@/lib/films";

export default function CaseCredits({
  credits,
}: {
  credits: Film["credits"];
}) {
  return (
    <Reveal as="section" className="mx-auto mb-20 max-w-2xl md:mb-28">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">
        <span className="text-yellow" aria-hidden="true">
          /
        </span>{" "}
        Credits
      </p>
      <ul className="divide-y divide-white/5 border-t border-white/5">
        {credits.map((c) => (
          <li
            key={`${c.role}-${c.name}`}
            className="flex items-center justify-between gap-6 py-4"
          >
            <span className="text-sm uppercase tracking-[0.15em] text-muted">
              {c.role}
            </span>
            <span className="text-lg text-text md:text-xl">{c.name}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
