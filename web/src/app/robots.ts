import type { MetadataRoute } from "next";

// Required for `output: export` — forces a fully static robots.txt in `out/`.
export const dynamic = "force-static";

// Static (no request-time APIs) so it emits a plain robots.txt in `out/`.
// NOTE: domain is provisional — client has not confirmed the final URL.
const BASE = "https://quickfilms.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
