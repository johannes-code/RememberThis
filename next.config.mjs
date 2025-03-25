import path from "path";

const nextConfig = (module.exports = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
});

export default nextConfig;
