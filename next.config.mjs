/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      rules: [
        {
          test: /\.wasm$/,
          type: "asset/resource",
        }
      ]
    });

    return config
  },

  output: "export",
}

export default nextConfig;
