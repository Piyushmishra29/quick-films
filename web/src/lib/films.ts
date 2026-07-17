// Single source of truth for the work index + case pages.
// Copy below is FINAL — written from actual frame-grabs of the footage.
// Every film is credited to Quick Films. Keep the exported Film type STABLE.

export type Film = {
  slug: string;
  title: string;
  year: string;
  tags: string[]; // e.g. ["Documentary", "Colour Grade", "VO"]
  duration: string; // "0:60"
  description: string; // 2–3 sentence editorial copy in studio voice
  credits: { role: string; name: string }[]; // "Edit & Grade — Quick Films" etc.
  video: string; // "/films/<slug>.mp4"
  poster: string; // "/films/<slug>.jpg"
  aspect: "9/16";
  stills?: string[]; // optional frame grabs shown as a "FRAMES" strip on the case page
};

export const films: Film[] = [
  {
    slug: "interview",
    title: "Every Face Has a Moment",
    year: "2026",
    tags: ["Documentary", "Interview", "Colour Grade"],
    duration: "1:00",
    description:
      "A working photographer sits with the camera in his lap and talks about why he keeps returning to the field — cut as a tight one-minute interview and threaded with the faces he came to shoot. We built the edit around the cadence of his speech, set clean subtitles throughout, and graded the forest light to hold its warmth without giving up the shadows.",
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
    tags: ["Short-form", "Culture", "Colour Grade"],
    duration: "0:18",
    description:
      "Eighteen seconds of Kathakali caught at golden hour — full costume, deliberate hands, a photographer circling for the frame. We cut it tight to the movement and graded the reds and greens to sit richly against the backlit forest.",
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
    tags: ["Documentary", "VO", "Colour Grade"],
    duration: "0:27",
    description:
      "A voice-over short on Theyyam, shot after dark and lit almost entirely by fire. The edit follows the narration beat for beat while the grade leans into the ember reds and gold of the ritual dress.",
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
    tags: ["Brand Film", "Colour Grade", "Motion"],
    duration: "0:49",
    description:
      "A launch film for a retail flagship, moving from moodboards and material swatches to the finished floor. We assembled the story, built the type and titles, and graded the whole piece toward a cool, considered navy.",
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
