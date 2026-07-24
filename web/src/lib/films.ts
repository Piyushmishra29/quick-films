// Single source of truth for the work index + case pages.
// Copy below is FINAL — written from actual frame-grabs of the footage.
// Every film is credited to Quick Films. Keep the exported Film type STABLE.

// A single graded clip inside a clip-gallery film (see the Postcards page).
export type Clip = {
  id: string;
  title: string;
  location: string; // postmark text, e.g. "OOTY"
  note: string; // one-line caption in studio voice
  duration: string; // "0:06"
  video: string;
  poster: string;
};

export type Film = {
  slug: string;
  title: string;
  subtitle?: string; // optional distinguisher shown under the title when several films share a title (e.g. "Theyyam")
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
  clips?: Clip[]; // when present, the case page renders a postcard clip gallery
  clientLogo?: { src: string; alt: string }; // optional client mark shown on the case header
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
    title: "Arcade Film for Dave & Buster's",
    year: "2026",
    seoTag: "Venue Film — DoP",
    tags: ["Short-form", "Venue", "Interview"],
    duration: "1:14",
    description:
      "A venue film for District by Zomato, shot as a freelance Director of Photography — capturing the dynamic energy and immersive atmosphere of the Dave & Buster's Arcade Film campaign. Featured as part of the founder's cinematography portfolio.",
    credits: [
      { role: "Project", name: "District by Zomato" },
      { role: "Role", name: "Freelance DOP" },
      { role: "Production House", name: "Denzong Films" },
    ],
    video: "/films/dave-busters.mp4",
    poster: "/films/dave-busters.jpg",
    aspect: "9/16",
  },
  {
    slug: "project-grain",
    title: "F&B Digital Film",
    year: "2026",
    seoTag: "F&B Brand Film",
    tags: ["Brand Film", "F&B", "Interview"],
    duration: "1:41",
    description:
      "A digital campaign crafted for District by Zomato, capturing vibrant food, entertainment and lifestyle moments through dynamic, cinematic visuals. Shot as a freelance Director of Photography. Featured as part of the founder's cinematography portfolio.",
    credits: [
      { role: "Project", name: "District by Zomato" },
      { role: "Role", name: "Freelance DOP" },
      { role: "Production House", name: "Denzong Films" },
    ],
    video: "/films/project-grain.mp4",
    poster: "/films/project-grain.jpg",
    aspect: "9/16",
  },
  {
    slug: "interview",
    title: "Travel Documentary | Niko Works Branding",
    subtitle: "The Photographer",
    year: "2026",
    seoTag: "Documentary Edit",
    tags: ["Documentary", "Interview", "Colour Grade"],
    duration: "1:00",
    description:
      "A series of 12 cinematic short-form travel documentaries produced under Quick Films for Niko Works, with each film running between 30 and 60 seconds. Filmed across Northern Kerala, the series captures the region's rich cultural heritage through iconic traditions and ritual art forms, including Theyyam, Kathakali, Kambala, and other cultural experiences. The entire production was completed over an intensive 3-day shoot across multiple locations, with all 12 films delivered within one month. The project combined authentic storytelling with cinematic visuals to celebrate Kerala's people, traditions and landscapes.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
      { role: "Subtitles", name: "Quick Films" },
    ],
    video: "/films/interview.mp4",
    poster: "/films/interview.jpg",
    clientLogo: { src: "/logos/niko-works.png", alt: "Niko Works" },
    aspect: "9/16",
  },
  {
    slug: "kathakali",
    title: "Travel Documentary | Niko Works Branding",
    subtitle: "Kathakali",
    year: "2026",
    seoTag: "Colour Grade Reel",
    tags: ["Short-form", "Culture", "Colour Grade"],
    duration: "0:18",
    description:
      "A series of 12 cinematic short-form travel documentaries produced under Quick Films for Niko Works, with each film running between 30 and 60 seconds. Filmed across Northern Kerala, the series captures the region's rich cultural heritage through iconic traditions and ritual art forms, including Theyyam, Kathakali, Kambala, and other cultural experiences. The entire production was completed over an intensive 3-day shoot across multiple locations, with all 12 films delivered within one month. The project combined authentic storytelling with cinematic visuals to celebrate Kerala's people, traditions and landscapes.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/kathakali.mp4",
    poster: "/films/kathakali.jpg",
    clientLogo: { src: "/logos/niko-works.png", alt: "Niko Works" },
    aspect: "9/16",
    stills: ["/stills/kathakali-still-1.jpg", "/stills/kathakali-still-2.jpg"],
  },
  {
    slug: "niko-theyyam",
    title: "Travel Documentary | Niko Works Branding",
    subtitle: "Theyyam by Firelight",
    year: "2026",
    seoTag: "Documentary Colour Grade",
    tags: ["Documentary", "VO", "Colour Grade"],
    duration: "0:27",
    description:
      "A series of 12 cinematic short-form travel documentaries produced under Quick Films for Niko Works, with each film running between 30 and 60 seconds. Filmed across Northern Kerala, the series captures the region's rich cultural heritage through iconic traditions and ritual art forms, including Theyyam, Kathakali, Kambala, and other cultural experiences. The entire production was completed over an intensive 3-day shoot across multiple locations, with all 12 films delivered within one month. The project combined authentic storytelling with cinematic visuals to celebrate Kerala's people, traditions and landscapes.",
    credits: [
      { role: "Edit", name: "Quick Films" },
      { role: "Voice-over", name: "Quick Films" },
      { role: "Colour Grade", name: "Quick Films" },
    ],
    video: "/films/niko-theyyam.mp4",
    poster: "/films/niko-theyyam.jpg",
    aspect: "9/16",
    stills: ["/stills/niko-fire.jpg", "/stills/niko-night.jpg"],
    clientLogo: { src: "/logos/niko-works.png", alt: "Niko Works" },
  },
  {
    slug: "pe",
    title: "Peter England Launch Film",
    year: "2026",
    seoTag: "Menswear Brand Film",
    tags: ["Brand Film", "Menswear", "Retail"],
    duration: "0:49",
    description:
      "A launch film for Peter England, crafted to showcase the brand's latest collection through cinematic and contemporary visuals.",
    credits: [
      { role: "Role", name: "Freelance Director of Photography" },
    ],
    video: "/films/pe.mp4",
    poster: "/films/pe.jpg",
    aspect: "9/16",
  },
];

export function getFilm(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}
