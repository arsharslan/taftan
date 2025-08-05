import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Assuming Pexels uses HTTPS
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https', // Assuming Pexels uses HTTPS
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https', // Assuming Pexels uses HTTPS
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
    ]
  },
};

export default nextConfig;
