import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'wxjtfebzgrthjdunksfq.supabase.co'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  }
};

export default nextConfig;
