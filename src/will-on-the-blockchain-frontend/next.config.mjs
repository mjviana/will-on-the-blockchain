/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  reactStrictMode: true, // Enables React Strict Mode.
  webpack: (config) => {
    config.resolve.fallback = {fs: false, net: false, tls: false};
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
};

export default nextConfig;
