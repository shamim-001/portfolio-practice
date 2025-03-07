/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "v0.blob.com",
      "drive.google.com",
      "lh3.googleusercontent.com", // For Google Drive shared images
      "i.imgur.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  // Remove these options as they're causing issues with Next.js 15
  // output: "export",
  // unoptimized: true,
}

module.exports = nextConfig

