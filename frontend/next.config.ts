import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // swcMinify: true,
};

export default withPWA(nextConfig);
