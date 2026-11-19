/** @type {import('next').NextConfig} */
const nextConfig = {
  // AVIF first, WebP as the fallback, for every next/image photo
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
