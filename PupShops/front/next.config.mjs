/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**", // Acepta cualquier dominio sin importar el protocolo
      },
    ],
  },
};

export default nextConfig;
