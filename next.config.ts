/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // chỉ định thư mục hiện tại là root
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

module.exports = nextConfig;
