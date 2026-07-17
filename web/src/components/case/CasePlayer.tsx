"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import type { Film } from "@/lib/films";

/**
 * Centered 9:16 case player. Shows poster + play button; on click the
 * native <video> controls take over and playback starts — it never
 * autoplays (with or without sound). Static-export safe: no dynamic APIs.
 */
export default function CasePlayer({ film }: { film: Film }) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Call play() synchronously inside the click handler (same call stack as
  // the user gesture) so browsers — including Safari — allow audio.
  const handlePlay = () => {
    videoRef.current?.play().catch(() => {});
    setStarted(true);
  };

  return (
    <Reveal className="mb-16 md:mb-24">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[380px] overflow-hidden border border-white/10 bg-surface md:max-w-[420px]">
        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${film.title}`}
            className="group absolute inset-0 z-10 flex items-center justify-center"
          >
            <Image
              src={film.poster}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
              priority
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10"
            />
            <span
              aria-hidden="true"
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-yellow text-bg shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        <video
          ref={videoRef}
          src={film.video}
          poster={film.poster}
          controls={started}
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover ${
            started ? "" : "pointer-events-none opacity-0"
          }`}
        >
          Your browser does not support embedded video.
        </video>
      </div>
    </Reveal>
  );
}
