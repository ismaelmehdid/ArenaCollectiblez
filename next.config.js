
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '**',
      },
    ],
  },
  allowedDevOrigins: ['https://kangaroo-amazing-wrongly.ngrok-free.app'],
};

module.exports = nextConfig;
