import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        hostname: 'cdn.jsdelivr.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
