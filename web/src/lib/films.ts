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
      "Thirty-two seconds of everything the studio shoots and cuts — dawn above the clouds, a sprint down the beach, vintage cars, tramcars, cricket whites, kids at a picnic, product macro, silhouettes at golden hour. Cut hard to the music and graded as one piece, this is the working reel we send when someone asks what Quick Films feels like.",
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
    tags: ["Brand Film", "Fashion", "VO"],
    duration: "0:50",
    description:
      "A brand film for SOCH about a first car nobody approved of — a powder-blue Premier Padmini — and the woman who bought it anyway. The edit moves between the car, the streets and an old family photograph while the voice-over rewrites what success looks like; the grade keeps the indigo of the dress and the blue of the body in the same cool family.",
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
    tags: ["Short-form", "Venue", "Interview"],
    duration: "1:14",
    description:
      "A vertical venue film for Dave & Buster's, built from staff interviews and the floor itself — bowling lanes, darts, racing rigs, the arcade in full neon and the sports bar's wall of screens. We cut the interviews against the games they talk about and let the venue's own light do the grading talk.",
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
    tags: ["Brand Film", "F&B", "Motion"],
    duration: "1:41",
    description:
      "A bar film shot low and warm — barrel-aged spirits on the shelf, a slow cocktail pour, salmon nigiri under the lamp, a live jazz set caught in black and white. The team talks through what the room is for while the edit settles into their words: woody, dark, cozy. Motion graphics and the booking end-card were built in-house.",
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
