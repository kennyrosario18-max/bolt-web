import type { NextConfig } from "next";

// BASE_PATH se usa para el preview en GitHub Pages (/bolt-web).
// En producción (dominio raíz) queda vacío.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
