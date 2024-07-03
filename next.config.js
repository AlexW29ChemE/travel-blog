/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
  },  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.alexwieringa.com',
        port: '',
        pathname: '/travel-images/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.alexwieringa.com',
        port: '',
        pathname: '/test-Images/**',
      },
    ],
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
