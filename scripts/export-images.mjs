// Запускается после next build. Нарезает фото во всех размерах, которые страницы просят в srcset,
// и кладёт рядом файлы настроек хостинга из deploy/ahost. На обычном хостинге нет сервера,
// который сжимал бы фото на лету, поэтому все копии должны лежать готовыми.
import { cp, readdir, readFile, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const OUT = "out";
const MEDIA = join(OUT, "_next", "static", "media");
// Формат имени задаёт src/lib/imageLoader.ts: name.hash.w828q90.webp
const VARIANT = /\/_next\/static\/media\/([^"'\s,]+?)\.w(\d+)q(\d+)\.webp/g;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return entry.name === "_next" ? [] : htmlFiles(path);
      return entry.name.endsWith(".html") ? [path] : [];
    }),
  );
  return nested.flat();
}

// Набор ширин общий для всех фото: увеличенная копия того же фото в лайтбоксе просит другие ширины,
// чем его превью, а клиентские компоненты строят srcset по тем же правилам.
const qualities = new Map();
const widths = new Set();
for (const file of await htmlFiles(OUT)) {
  for (const [, base, width, quality] of (await readFile(file, "utf8")).matchAll(VARIANT)) {
    widths.add(Number(width));
    if (!qualities.has(base)) qualities.set(base, new Set());
    qualities.get(base).add(Number(quality));
  }
}

const media = await readdir(MEDIA);
const originals = new Map();
for (const name of media) {
  if (/\.w\d+q\d+\.webp$/.test(name)) continue;
  const match = name.match(/^(.+)\.(jpe?g|png|webp|avif)$/i);
  if (match) originals.set(match[1], name);
}

const jobs = [];
for (const [base, set] of qualities) {
  const source = originals.get(base);
  if (!source) throw new Error(`Нет исходника для ${base}`);
  for (const quality of set) {
    for (const width of widths) {
      jobs.push({ source: join(MEDIA, source), target: join(MEDIA, `${base}.w${width}q${quality}.webp`), width, quality });
    }
  }
}

let bytes = 0;
const run = async ({ source, target, width, quality }) => {
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 100, effort: 5 })
    .toFile(target);
  bytes += (await stat(target)).size;
};
for (let i = 0; i < jobs.length; i += 8) await Promise.all(jobs.slice(i, i + 8).map(run));

await cp(join("deploy", "ahost"), OUT, { recursive: true });
// Стандартная английская 404 от Next.js не нужна: несуществующие адреса получают error-404 через 404.php.
await rm(join(OUT, "404"), { recursive: true, force: true });
await rm(join(OUT, "404.html"), { force: true });

console.log(`Фото: ${qualities.size} исходников, ${jobs.length} копий, ${(bytes / 1024 / 1024).toFixed(1)} МБ`);
