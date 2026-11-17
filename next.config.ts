import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Сайт собирается в готовые файлы в папке out: обычному хостингу вроде Ahost сервер Next.js не нужен.
  output: "export",
  // GitHub Pages: sayt manzili /repo-nomi/ ostida bo'ladi. Boshqa joyda o'zgaruvchi bo'sh.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Каждая страница становится папкой с index.html: так её отдаёт любой хостинг без особых настроек.
  trailingSlash: true,
  images: {
    // Сжимать фото на лету некому, поэтому их заранее нарезает scripts/export-images.mjs
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [420, 640, 828, 1080, 1440, 1920],
    imageSizes: [96, 160, 256, 384],
    qualities: [75, 90],
  },
};

export default nextConfig;
