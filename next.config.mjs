import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ZERO_THREE = path.resolve(
  __dirname,
  "cleanroom/zero-energy-from-prompt/vendor/three"
);

function isZeroEnergyIssuer(data) {
  const ctx = String(data.context || "").replace(/\\/g, "/");
  const issuer = String(data.contextInfo?.issuer || "").replace(/\\/g, "/");
  return (
    ctx.includes("zero-energy-from-prompt") ||
    issuer.includes("zero-energy-from-prompt")
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide Next.js dev chrome (static route circle + build pill).
  // Runtime "1 error" toast is separate — capture scripts strip nextjs-portal.
  // Never burn these into storefront demos / product previews.
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "cdn.ms.prompts" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    // Isolate Zero Energy on three@0.161.0. Never alias the rest of MS (R3F / 0.185).
    config.plugins.push({
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap(
          "ZeroEnergyThreeAlias",
          (nmf) => {
            nmf.hooks.beforeResolve.tap("ZeroEnergyThreeAlias", (data) => {
              if (!data || !isZeroEnergyIssuer(data)) return;
              const req = data.request;
              if (req === "three") {
                data.request = path.join(ZERO_THREE, "build/three.module.js");
              } else if (typeof req === "string" && req.startsWith("three/")) {
                data.request = path.join(
                  ZERO_THREE,
                  req.slice("three/".length)
                );
              }
            });
          }
        );
      },
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
