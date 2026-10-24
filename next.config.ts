/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // force reload environment variables
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
