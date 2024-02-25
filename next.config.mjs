/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.beehiiv.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
