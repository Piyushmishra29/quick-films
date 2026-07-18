import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";

/**
 * Case-page frame strip. Renders a small row of frame grabs (from the film's
 * `stills`), each framed with the sitewide `.qf-frame` viewfinder brackets.
 * Fixed-height tiles keep their natural aspect, so mixed landscape/portrait
 * grabs sit together like a real filmstrip. Only rendered when the film has
 * stills, so pages without any skip the section (and its index) entirely.
 */
export default function CaseFrames({
  stills,
  index,
}: {
  stills: string[];
  index: string;
}) {
  return (
    <section className="mb-16 md:mb-24">
      <Reveal>
        <SectionRule index={index} label="Frames" meta={`${stills.length} Stills`} />
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-6 md:mt-12 md:gap-10">
        {stills.map((src, i) => {
          // niko-fire.jpg is large for this ≤h-64 tile — swap in the ~500px crop.
          const small =
            src === "/stills/niko-fire.jpg" ? "/stills/niko-fire-sm.jpg" : src;
          return (
            <Reveal key={src} delay={Math.min(i * 0.06, 0.3)}>
              <div className="qf-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={small}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-52 w-auto max-w-full object-cover ring-1 ring-white/8 transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none md:h-64"
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
