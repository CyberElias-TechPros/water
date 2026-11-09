/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the Arena preview host(s) to load dev assets / HMR.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "localhost", "127.0.0.1"],
  experimental: { optimizePackageImports: ["lenis"] },
};

export default nextConfig;
