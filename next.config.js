/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net', 'api.unsplash.com', '127.0.0.1'],
  },
}

module.exports = nextConfig
