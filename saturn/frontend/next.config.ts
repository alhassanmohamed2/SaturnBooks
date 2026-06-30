import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:80/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://backend:80/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
