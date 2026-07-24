import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Selected Frames — a filmstrip texture band echoing the reference's drifting
 * imagery strips. Two full-bleed rows of graded travel clips (the "Postcards"
 * set) drift slowly in opposite directions and auto-play, muted and looping —
 * ambient motion in the same family as the title marquee (see .qf-filmstrip in
 * globals.css). Each row holds two identical copies of its clip list so a -50%
 * translate loops seamlessly; prefers-reduced-motion pins the drift still.
 * Posters paint instantly while the muted loops warm up.
 */

type Clip = { src: string; poster: string; label: string };

const CLIPS: Clip[] = [
  { src: "/films/pc-drone.mp4", poster: "/films/pc-drone.jpg", label: "Tea country, Ooty — drone over misty slopes" },
  { src: "/films/pc-yezdi.mp4", poster: "/films/pc-yezdi.jpg", label: "A Yezdi kicked to life on a fog-soaked coast road" },
  { src: "/films/pc-bike.mp4", poster: "/films/pc-bike.jpg", label: "A headlight burning through blue rain-mist" },
  { src: "/films/pc-surabhi.mp4", poster: "/films/pc-surabhi.jpg", label: "A twirl under the old trees, in black and white" },
  { src: "/films/pc-kolkata.mp4", poster: "/films/pc-kolkata.jpg", label: "A Kolkata street mid-crossing" },
  { src: "/films/pc-sunset.mp4", poster: "/films/pc-sunset.jpg", label: "The long walk into a pink Nilgiri sunset" },
];

// Split across the two opposing drift rows.
const ROW_A = [CLIPS[0], CLIPS[2], CLIPS[4]];
const ROW_B = [CLIPS[5], CLIPS[3], CLIPS[1]];

function ClipTile({ clip, decorative }: { clip: Clip; decorative?: boolean }) {
  return (
    <div
      className="relative aspect-video h-28 shrink-0 overflow-hidden rounded-sm ring-1 ring-white/10 sm:h-36 md:h-44"
      aria-label={decorative ? undefined : clip.label}
      aria-hidden={decorative ? "true" : undefined}
    >
      <video
        src={clip.src}
        poster={clip.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function Strip({ clips, reversed = false }: { clips: Clip[]; reversed?: boolean }) {
  // Two copies for a seamless -50% loop.
  const doubled = [...clips, ...clips];
  return (
    <div
      className={`qf-filmstrip ${reversed ? "qf-filmstrip--rev" : ""} gap-3 md:gap-4`}
    >
      {doubled.map((c, i) => (
        <ClipTile key={`${c.src}-${i}`} clip={c} decorative={i >= clips.length} />
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

      {/* Full-bleed drifting rows, with soft edge fades so clips don't hard-cut
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
          <Strip clips={ROW_A} />
          <Strip clips={ROW_B} reversed />
        </div>

        {/* Mobile: two finger-swipeable snap rows (the slow drift reads as
            frozen on a phone, and a transform-animated track can't be
            touch-scrolled anyway). */}
        <div className="space-y-3 md:hidden">
          {[ROW_A, ROW_B].map((row, r) => (
            <div
              key={r}
              className="qf-noscroll flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5 [-webkit-overflow-scrolling:touch]"
            >
              {row.map((c) => (
                <div key={c.src} className="shrink-0 snap-start">
                  <ClipTile clip={c} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mx-auto mt-12 max-w-[1600px] px-5 md:mt-16 md:px-10">
        <p className="border-t border-white/12 pt-5 text-[11px] uppercase tracking-[0.22em] text-muted">
          Graded travel clips from the cutting room — shot &amp; coloured by Quick Films
        </p>
      </Reveal>
    </section>
  );
}
