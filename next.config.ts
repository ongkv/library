import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "@prisma/client/runtime/library": "@prisma/client/runtime/client",
    },
  },
};

export default nextConfig;
