import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**'),new URL('https://i.scdn.co/**')],
  },
};

export default nextConfig;
