import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...other config options...
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // Increase as needed
    },
  },
};

export default nextConfig;
