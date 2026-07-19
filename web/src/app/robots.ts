import type { MetadataRoute } from "next";

// Required for `output: export` — forces a fully static robots.txt in `out/`.
export const dynamic = "force-static";

// Static (no request-time APIs) so it emits a plain robots.txt in `out/`.
const BASE = "https://quickfilms.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
