/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  devIndicators: {
    buildActivityPosition: 'top-right',
  },
  compiler: {
    emotion: true,
    styledComponents: true,
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

module.exports = nextConfig;
