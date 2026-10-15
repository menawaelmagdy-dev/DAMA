import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All artwork is served straight from ERA's Webflow CDN, so no server-side
    // optimisation pass is needed (or possible, in a sandboxed build).
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.prod.website-files.com" }],
  },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
