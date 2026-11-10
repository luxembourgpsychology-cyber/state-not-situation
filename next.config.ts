import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return ["/live/:path*", "/api/live/:path*"].map(source => ({
      source,
      headers: [
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    }));
  },
};

export default nextConfig;
