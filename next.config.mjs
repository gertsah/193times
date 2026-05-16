/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "193times";
const basePath = isProd ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // Make basePath available client-side for raw <video>, <source>, etc.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // GitHub Pages serves static files only — no Image Optimization API.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
