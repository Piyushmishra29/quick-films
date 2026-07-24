"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/shared/Reveal";
import SectionRule from "./SectionRule";

/**
 * Selected Frames — a filmstrip texture band echoing the reference's drifting
 * imagery strips. Two full-bleed rows of graded travel clips (the "Postcards"
 * set) drift slowly in opposite directions and auto-play, muted and looping.
 *
 * Playback is driven explicitly (not via the bare `autoplay` attribute) so it
 * survives a cold cache: the clips are `preload="none"` and only start once the
 * band scrolls into view (IntersectionObserver), and a per-video `canplay`
 * retry re-issues play() if the first attempt stalled while buffering — the
 * failure mode that left some tiles frozen until a second refresh. Videos pause
 * when the band leaves the viewport, and prefers-reduced-motion keeps them on
 * their poster frames. Strip-sized (640×360, no audio) encodes keep it light.
 */

type Clip = { src: string; poster: string; label: string };

const CLIPS: Clip[] = [
  { src: "/films/pc-drone-sm.mp4", poster: "/films/pc-drone.jpg", label: "Tea country, Ooty — drone over misty slopes" },
  { src: "/films/pc-yezdi-sm.mp4", poster: "/films/pc-yezdi.jpg", label: "A Yezdi kicked to life on a fog-soaked coast road" },
  { src: "/films/pc-bike-sm.mp4", poster: "/films/pc-bike.jpg", label: "A headlight burning through blue rain-mist" },
  { src: "/films/pc-surabhi-sm.mp4", poster: "/films/pc-surabhi.jpg", label: "A twirl under the old trees, in black and white" },
  { src: "/films/pc-kolkata-sm.mp4", poster: "/films/pc-kolkata.jpg", label: "A Kolkata street mid-crossing" },
  { src: "/films/pc-sunset-sm.mp4", poster: "/films/pc-sunset.jpg", label: "The long walk into a pink Nilgiri sunset" },
];

// Split across the two opposing drift rows.
const ROW_A = [CLIPS[0], CLIPS[2], CLIPS[4]];
const ROW_B = [CLIPS[5], CLIPS[3], CLIPS[1]];

function ClipTile({
  clip,
  decorative,
  register,
}: {
  clip: Clip;
  decorative?: boolean;
  register: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <div
      className="relative aspect-video h-28 shrink-0 overflow-hidden rounded-sm ring-1 ring-white/10 sm:h-36 md:h-44"
      aria-label={decorative ? undefined : clip.label}
      aria-hidden={decorative ? "true" : undefined}
    >
      <video
        ref={register}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function Strip({
  clips,
  reversed = false,
  register,
}: {
  clips: Clip[];
  reversed?: boolean;
  register: (el: HTMLVideoElement | null) => void;
}) {
  // Two copies for a seamless -50% loop.
  const doubled = [...clips, ...clips];
  return (
    <div
      className={`qf-filmstrip ${reversed ? "qf-filmstrip--rev" : ""} gap-3 md:gap-4`}
    >
      {doubled.map((c, i) => (
        <ClipTile
          key={`${c.src}-${i}`}
          clip={c}
          decorative={i >= clips.length}
          register={register}
        />
      ))}
    </div>
  );
}

export default function SelectedFrames() {
  const sectionRef = useRef<HTMLElement>(null);
  const videosRef = useRef<Set<HTMLVideoElement>>(new Set());
  const inViewRef = useRef(false);

  const register = (el: HTMLVideoElement | null) => {
    if (el) videosRef.current.add(el);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Honour reduced-motion: leave every clip on its poster frame.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const videos = videosRef.current;
    const play = (v: HTMLVideoElement) => {
      v.muted = true;
      const p = v.play();
      if (p) p.catch(() => {});
    };

    // Load + play only while the band is on (or near) screen; pause otherwise.
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        videos.forEach((v) => (entry.isIntersecting ? play(v) : v.pause()));
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(section);

    // Cold-load safety net: when a clip finally has enough data, (re)issue
    // play() — this is what fixes tiles that stalled on the first attempt.
    const onCanPlay = (e: Event) => {
      if (inViewRef.current) play(e.currentTarget as HTMLVideoElement);
    };
    videos.forEach((v) => v.addEventListener("canplay", onCanPlay));

    return () => {
      io.disconnect();
      videos.forEach((v) => v.removeEventListener("canplay", onCanPlay));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
          <Strip clips={ROW_A} register={register} />
          <Strip clips={ROW_B} reversed register={register} />
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
                  <ClipTile clip={c} register={register} />
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
