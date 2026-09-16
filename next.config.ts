import type { NextConfig } from "next";

const isSmarterAspExport = process.env.SMARTERASP_STATIC_EXPORT === "1";
const isDockerBuild = process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  // SmarterASP can serve the marketing site as a static IIS deployment.
  // Docker uses Vinext's self-contained Node server. Keep the normal
  // Vinext/Sites build unchanged when neither deployment flag is enabled.
  output: isSmarterAspExport
    ? "export"
    : isDockerBuild
      ? "standalone"
      : undefined,
  trailingSlash: isSmarterAspExport ? true : undefined,
  typescript: {
    // The static marketing site does not import the Cloudflare-only D1 helper.
    ignoreBuildErrors: isSmarterAspExport,
  },
  // The Sites worker image bindings are available after deployment, but not in
  // the local vinext preview. Serve supplied assets directly in both contexts.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
