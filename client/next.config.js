/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  env: {
    API_HOST_SSR: 'http://localhost:5000',
    API_HOST_CLIENT: 'http://5.189.68.90:5000',
    // API_HOST_CLIENT: 'http://localhost:5000',
    // CLIENT_HOST: 'http://localhost:3000',
    CLIENT_HOST: 'http://5.189.68.90:3000',
    PAIR_IN_BOX_ID: 25,
  },
  images: {
    domains: [
      'localhost', 'localhost:3000', 'localhost:5000',
      '5.189.68.90', '5.189.68.90:3000', '5.189.68.90:5000',
    ],
  },
}

module.exports = nextConfig
