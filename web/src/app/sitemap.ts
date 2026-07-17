import type { MetadataRoute } from "next";
import { films } from "@/lib/films";

// Required for `output: export` — forces a fully static sitemap.xml in `out/`.
export const dynamic = "force-static";

// Static (no request-time APIs) so it emits a plain sitemap.xml in `out/`.
// NOTE: domain is provisional — client has not confirmed the final URL.
const BASE = "https://quickfilms.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${BASE}/work/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...films.map((film) => ({
      url: `${BASE}/work/${film.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
