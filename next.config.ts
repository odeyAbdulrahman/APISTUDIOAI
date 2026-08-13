import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Sites worker image bindings are available after deployment, but not in
  // the local vinext preview. Serve supplied assets directly in both contexts.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
