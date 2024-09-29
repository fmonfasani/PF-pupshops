/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Activar el modo estricto de React

  // Configuración para imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },

  // Deshabilitar ESLint durante el build
  eslint: {
    ignoreDuringBuilds: true, // Ignora ESLint en el proceso de build
  },
};

export default nextConfig;
