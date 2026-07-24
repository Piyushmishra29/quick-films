"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import type { Film } from "@/lib/films";

/**
 * Centered case player, framed with the sitewide `.qf-frame` viewfinder
 * brackets. Portrait films (9:16) render a narrow phone-frame player;
 * landscape films (16:9) render a wide program-monitor player that fills
 * the content column. Shows poster + play button; on click the native
 * <video> controls take over and playback starts — it never autoplays
 * (with or without sound). Static-export safe: no dynamic APIs.
 */
export default function CasePlayer({ film }: { film: Film }) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const landscape = film.aspect === "16/9";

  // Call play() synchronously inside the click handler (same call stack as
  // the user gesture) so browsers — including Safari — allow audio.
  const handlePlay = () => {
    videoRef.current?.play().catch(() => {});
    setStarted(true);
  };

  return (
    <Reveal className="mb-16 md:mb-24">
      <div
        className={`qf-frame mx-auto w-full ${
          landscape ? "max-w-4xl" : "max-w-[380px] md:max-w-[420px]"
        }`}
      >
        <div
          className={`relative w-full overflow-hidden bg-surface ring-1 ring-white/8 ${
            landscape ? "aspect-video" : "aspect-[9/16]"
          }`}
        >
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
                sizes={
                  landscape
                    ? "(max-width: 896px) 92vw, 896px"
                    : "(max-width: 768px) 90vw, 420px"
                }
                className="object-cover"
                priority
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10"
              />
              <span className="relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
                <span
                  aria-hidden="true"
                  className="qf-pulse-ring pointer-events-none absolute inset-[-6px] rounded-full border border-yellow/60"
                />
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow text-bg shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
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
      </div>
    </Reveal>
  );
}
