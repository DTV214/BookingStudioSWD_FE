/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.hf.uio.no" },
      { protocol: "https", hostname: "hf.uio.no" }, // thêm dòng này để Next.js chấp nhận ảnh của bạn
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ['@/components/AdminPage'],
  },
};

module.exports = nextConfig;
