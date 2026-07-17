import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Pin the workspace root to this app dir (repo root has another lockfile).
  turbopack: { root: __dirname },
};

export default nextConfig;
