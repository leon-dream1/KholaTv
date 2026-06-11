import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    staleTimes: { dynamic: 120, static: 600 },
  },
};

export default nextConfig;
