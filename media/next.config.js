/** @type {import('next').NextConfig} */

const path = require("node:path");

module.exports = {
  transpilePackages: ["semix-table"],
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  experimental: { esmExternals: "loose" },
};
