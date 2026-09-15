import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // lucide-react ships ~1500 icon modules under one package; this keeps
    // each route's bundle limited to only the icons it actually imports.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
