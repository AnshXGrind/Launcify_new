/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint v9 is incompatible with Next.js 14's built-in linter; lint separately via `next lint`
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
