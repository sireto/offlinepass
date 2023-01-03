/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    newNextLinkBehavior: false,
  },
  images: {
    loader: "custom",
  },
};

module.exports = nextConfig;
