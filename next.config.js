/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // appDir is now default in Next.js 14
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "pic.homgzha.cc",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        // 改为代理到本地服务，避免直接请求公网IP从而出现的路由跳转及丢包导致长延迟或断开
        destination: 'http://127.0.0.1:3001/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
