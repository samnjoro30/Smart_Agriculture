import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  otput: 'export',
  // trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
