
import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  turbopack: {}
};

export default nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);

// import type { NextConfig } from "next";
// import nextPWA from "next-pwa";

// const withPWA = nextPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true,
//   },
//   reactStrictMode: true,
// };

// export default withPWA(nextConfig);
