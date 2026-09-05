import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Images uploaded through the admin panel are served from Sanity's CDN.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // three.js ships untranspiled ESM examples; keep the graph lean for the client bundle
  experimental: {
    optimizePackageImports: ["@react-three/drei", "motion"],
  },
};

export default nextConfig;
