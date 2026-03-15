/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@coinbase/onchainkit"],

  webpack: (config) => {
    // Fix @metamask/sdk React Native dependency issue
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/.well-known/farcaster.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
