// Адрес заранее нарезанной копии фото. Файлы создаёт scripts/export-images.mjs после сборки,
// поэтому формат имени здесь и в скрипте должен совпадать.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.includes("/_next/static/media/") || src.endsWith(".svg")) return src;
  return `${src.replace(/\.[a-z0-9]+$/i, "")}.w${width}q${quality ?? 75}.webp`;
}
