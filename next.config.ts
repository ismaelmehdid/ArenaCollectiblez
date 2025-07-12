import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  allowedDevOrigins: ['https://kangaroo-amazing-wrongly.ngrok-free.app'],
};

export default nextConfig;
