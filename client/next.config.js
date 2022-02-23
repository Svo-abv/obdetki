/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  env: {
    API_HOST: 'http://localhost:5000',
    CLIENT_HOST: 'http://localhost:3000',
    PAIR_IN_BOX_ID: 25,
  },
  images: {
    domains: ['localhost', 'localhost:3000', 'localhost:5000',],
  },
}

module.exports = nextConfig
