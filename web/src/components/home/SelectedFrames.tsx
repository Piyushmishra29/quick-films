import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Selected Frames — a filmstrip texture band echoing the reference's drifting
 * imagery strips. Two full-bleed rows of frame grabs (mixed disciplines) drift
 * slowly in opposite directions. This is ambient texture in the same family as
 * the title marquee (see .qf-filmstrip in globals.css) — not a new reveal beat.
 * Each row holds two identical copies of its frame list so a -50% translate
 * loops seamlessly; prefers-reduced-motion pins it still. Images lazy-load.
 */

const ROW_A = [
  { src: "/stills/frame-pool.jpg", alt: "Rippling pool water" },
  { src: "/stills/frame-court.jpg", alt: "A running track at sunset" },
  { src: "/stills/frame-golf.jpg", alt: "A golfer mid-swing on the course" },
  { src: "/stills/frame-grandmother.jpg", alt: "A grandmother at a sunlit table" },
  { src: "/stills/frame-moon.jpg", alt: "A crescent moon in a deep blue sky" },
];

const ROW_B = [
  { src: "/stills/frame-fiat.jpg", alt: "A woman beside a vintage blue car" },
  { src: "/stills/frame-brooch.jpg", alt: "A crystal brooch, macro detail" },
  { src: "/stills/frame-cafe.jpg", alt: "A woman on the phone in a garden cafe" },
  { src: "/stills/frame-saree.jpg", alt: "A woman in a saree backlit at golden hour" },
];

// Mobile re-cut of the same pool: three swipeable rows instead of two drifting
// ones — the 90s drift reads as frozen on a phone, and a transform-animated
// track can't be touch-scrolled anyway.
const MOBILE_ROWS = [
  ROW_A.slice(0, 4),
  [ROW_A[4], ...ROW_B.slice(0, 2)],
  ROW_B.slice(2),
];

function Strip({
  frames,
  reversed = false,
}: {
  frames: { src: string; alt: string }[];
  reversed?: boolean;
}) {
  // Two copies for a seamless -50% loop.
  const doubled = [...frames, ...frames];
  return (
    <div
      className={`qf-filmstrip ${reversed ? "qf-filmstrip--rev" : ""} gap-3 md:gap-4`}
    >
      {doubled.map((f, i) => (
        <div
          key={`${f.src}-${i}`}
          className="relative h-28 shrink-0 overflow-hidden rounded-sm ring-1 ring-white/10 sm:h-36 md:h-44"
          aria-hidden={i >= frames.length ? "true" : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.src}
            alt={i < frames.length ? f.alt : ""}
            loading="lazy"
            className="h-full w-auto max-w-none object-cover transition-transform duration-500 ease-out hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ))}
    </div>
  );
}

export default function SelectedFrames() {
  return (
    <section
      aria-labelledby="frames-heading"
      className="overflow-hidden py-14 md:py-28"
    >
      <Reveal>
        <SectionRule
          index="02"
          label="Selected Frames"
          meta="2024–2026"
          className="mx-auto max-w-[1600px] px-5 md:px-10"
        />
      </Reveal>

      <h2 id="frames-heading" className="sr-only">
        Selected Frames
      </h2>

      {/* Full-bleed drifting rows, with soft edge fades so frames don't hard-cut
          at the viewport edges. */}
      <div className="relative mt-10 md:mt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-32"
        />
        {/* Desktop: ambient drifting strips */}
        <div className="hidden space-y-4 md:block">
          <Strip frames={ROW_A} />
          <Strip frames={ROW_B} reversed />
        </div>

        {/* Mobile: three finger-swipeable snap rows (fills more of the
            viewport and makes every frame reachable) */}
        <div className="space-y-3 md:hidden">
          {MOBILE_ROWS.map((row, r) => (
            <div
              key={r}
              className="qf-noscroll flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5 [-webkit-overflow-scrolling:touch]"
            >
              {row.map((f) => (
                <div
                  key={f.src}
                  className="relative h-32 shrink-0 snap-start overflow-hidden rounded-sm ring-1 ring-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-auto max-w-none object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <p className="border-t border-white/12 pt-5 text-[11px] uppercase tracking-[0.22em] text-muted">
          Frames from the cutting room — documentary, brand & short-form
        </p>
      </Reveal>
    </section>
  );
}
