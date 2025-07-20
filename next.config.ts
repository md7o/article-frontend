import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // this is the url https://article-backend.fly.dev
      {
        protocol: "https",
        hostname: "article-backend.fly.dev",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      // Supabase storage for article images
      {
        protocol: "https",
        hostname: "yvjeofnvutcusahztrfj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
