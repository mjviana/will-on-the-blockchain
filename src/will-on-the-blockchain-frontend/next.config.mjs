/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  reactStrictMode: true, // Enables React Strict Mode.
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, net: false, tls: false};
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  async headers() {
    return [
      {
        // This configuration applies to all routes under the `/api` directory
        source: "/api/:path*",
        headers: [
          {key: "Access-Control-Allow-Origin", value: "*"},
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {key: "Access-Control-Allow-Headers", value: "Content-Type"},
        ],
      },
    ];
  },
};

export default nextConfig;
