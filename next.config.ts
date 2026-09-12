import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SmarterASP can serve the marketing site as a static IIS deployment.
  // Keep the normal Vinext/Sites build unchanged unless this flag is enabled.
  output:
    process.env.SMARTERASP_STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash:
    process.env.SMARTERASP_STATIC_EXPORT === "1" ? true : undefined,
  typescript: {
    // The static marketing site does not import the Cloudflare-only D1 helper.
    ignoreBuildErrors: process.env.SMARTERASP_STATIC_EXPORT === "1",
  },
  // The Sites worker image bindings are available after deployment, but not in
  // the local vinext preview. Serve supplied assets directly in both contexts.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
