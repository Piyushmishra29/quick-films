// Single source of truth for the work index + case pages.
// Copy below is FINAL — written from actual frame-grabs of the footage.
// Every film is credited to Quick Films. Keep the exported Film type STABLE.

export type Film = {
  slug: string;
  title: string;
  year: string;
  seoTag?: string; // short service label appended to the SEO <title> (e.g. "Brand Film Edit")
  tags: string[]; // e.g. ["Documentary", "Colour Grade", "VO"]
  duration: string; // "0:60"
  description: string; // 2–3 sentence editorial copy in studio voice
  credits: { role: string; name: string }[]; // "Edit & Grade — Quick Films" etc.
  video: string; // "/films/<slug>.mp4"
  poster: string; // "/films/<slug>.jpg"
  aspect: "9/16" | "16/9";
  stills?: string[]; // optional frame grabs shown as a "FRAMES" strip on the case page
};

export const films: Film[] = [
  {
    slug: "reel",
    title: "QF Reel — Vol. 1",
    year: "2026",
    tags: ["Showreel", "Cinematography", "Edit"],
    duration: "0:32",
    description:
      "Thirty-two seconds, no wasted frames: dawn breaking above the clouds, a sprint down the beach, tramcars, cricket whites, vintage steel, kids mid-laugh at a picnic. Every shot ours, cut hard to the music and graded as one piece. This is the reel we send when someone asks what Quick Films feels like — press play, you'll know before it ends.",
    credits: [
      { role: "Cinematography", name: "Quick Films" },
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/reel.mp4",
    poster: "/films/reel.jpg",
    aspect: "16/9",
  },
  {
    slug: "soch",
    title: "Dressed for Success",
    year: "2026",
    seoTag: "Brand Film Edit",
    tags: ["Brand Film", "Fashion", "VO"],
    duration: "0:50",
    description:
      "Everyone said a vintage car was a risky first buy. She bought the powder-blue Premier Padmini anyway. Made for SOCH, the film moves between the car, the streets and one creased family photograph while the voice-over quietly rewrites what success is allowed to look like. The grade holds her indigo dress and the car's blue in the same cool family — girl and machine, dressed to match.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
      { role: "Subtitles", name: "Quick Films" },
    ],
    video: "/films/soch.mp4",
    poster: "/films/soch.jpg",
    aspect: "16/9",
  },
  {
    slug: "dave-busters",
    title: "Game On at Dave & Buster's",
    year: "2026",
    seoTag: "Venue Reel Edit",
    tags: ["Short-form", "Venue", "Interview"],
    duration: "1:14",
    description:
      "Bowling lanes, dart boards, racing rigs, a wall of sports screens and an arcade running full neon. We cut the staff's own interviews against the games they can't stop talking about, and let the venue's light do the grading — a vertical built to make you want to walk in and lose track of time.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
      { role: "Subtitles", name: "Quick Films" },
    ],
    video: "/films/dave-busters.mp4",
    poster: "/films/dave-busters.jpg",
    aspect: "9/16",
  },
  {
    slug: "project-grain",
    title: "Woody, Dark, Cozy",
    year: "2026",
    seoTag: "F&B Brand Film",
    tags: ["Brand Film", "F&B", "Motion"],
    duration: "1:41",
    description:
      "Their words, not ours — and the edit takes them literally. Barrel-aged spirits catch the shelf light, a cocktail pours slow, salmon nigiri waits under a lamp, and a live jazz set slips into black and white. Shot low, cut unhurried, finished with in-house motion graphics down to the book-a-table end card. You can almost hear the room.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Motion & Titles", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/project-grain.mp4",
    poster: "/films/project-grain.jpg",
    aspect: "9/16",
  },
  {
    slug: "interview",
    title: "Every Face Has a Moment",
    year: "2026",
    seoTag: "Documentary Edit",
    tags: ["Documentary", "Interview", "Colour Grade"],
    duration: "1:00",
    description:
      "A working photographer, camera in his lap, explaining why he keeps going back — intercut with the faces he went to find. We built the edit around the cadence of his speech, set clean subtitles throughout, and graded the forest light to stay warm without giving up its shadows. One minute long; none of it filler.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
      { role: "Subtitles", name: "Quick Films" },
    ],
    video: "/films/interview.mp4",
    poster: "/films/interview.jpg",
    aspect: "9/16",
  },
  {
    slug: "kathakali",
    title: "Kathakali at First Light",
    year: "2026",
    seoTag: "Colour Grade Reel",
    tags: ["Short-form", "Culture", "Colour Grade"],
    duration: "0:18",
    description:
      "Full costume at golden hour: deliberate hands, painted eyes, a photographer circling for his frame. Eighteen seconds cut tight to the movement, the reds and greens graded to burn richly against the backlit forest. Blink and it's over — that's the point.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/kathakali.mp4",
    poster: "/films/kathakali.jpg",
    aspect: "9/16",
    stills: ["/stills/kathakali-still-1.jpg", "/stills/kathakali-still-2.jpg"],
  },
  {
    slug: "niko-theyyam",
    title: "Theyyam by Firelight",
    year: "2026",
    seoTag: "Documentary Colour Grade",
    tags: ["Documentary", "VO", "Colour Grade"],
    duration: "0:27",
    description:
      "Shot after dark and lit almost entirely by fire. The voice-over carries the ritual beat for beat while the grade leans into ember reds and the gold of the dress. Twenty-seven seconds of Theyyam the way it's actually seen — close, hot, and hard to look away from.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Voice-over", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/niko-theyyam.mp4",
    poster: "/films/niko-theyyam.jpg",
    aspect: "9/16",
    stills: ["/stills/niko-fire.jpg", "/stills/niko-night.jpg"],
  },
  {
    slug: "pe",
    title: "Flagship",
    year: "2026",
    seoTag: "Menswear Brand Film",
    tags: ["Brand Film", "Menswear", "Motion"],
    duration: "0:49",
    description:
      "A launch film for the Peter England flagship store: moodboards and material swatches becoming rails, mirrors and a finished floor. We assembled the story, built the type and titles, and graded the whole piece toward a cool, considered navy — the brand's own colour, worn by the film itself.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Motion & Titles", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/pe.mp4",
    poster: "/films/pe.jpg",
    aspect: "9/16",
  },
];

export function getFilm(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}
