/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  eslint: {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
};

module.exports = nextConfig;