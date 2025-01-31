import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'images.unsplash.com'], // Sanity CDN and Unsplash allowed
  },
};

export default nextConfig;
