import type { NextConfig } from "next";
import path from "path";

const apiUrl = process.env.API_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiUrl}/api/:path*` }];
  },
};

export default nextConfig;
