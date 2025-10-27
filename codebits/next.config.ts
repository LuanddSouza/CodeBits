import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Evita que erros de ESLint quebrem o build (útil para deploy)
    ignoreDuringBuilds: true,
  },
  // Outras opções podem ir aqui
};


module.exports = nextConfig;


export default nextConfig;
