import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'picsum.photos',
      }
    ]
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'5mb',
    },
    optimizeCss: true,
  }
};

export default nextConfig;
