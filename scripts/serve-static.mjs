// Локальная проверка готовой сборки из папки out так, как её отдаст хостинг:
// папка отдаёт index.html, адрес папки без слеша перенаправляется на адрес со слешем,
// а на несуществующий адрес приходит 404 на языке адреса, как в deploy/ahost/404.php.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const ROOT = "out";
const PORT = Number(process.env.PORT) || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const fileAt = async (path) => {
  try {
    return await stat(path);
  } catch {
    return null;
  }
};

const send = (res, status, path) => {
  res.writeHead(status, { "Content-Type": TYPES[extname(path)] ?? "application/octet-stream" });
  createReadStream(path).pipe(res);
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = decodeURIComponent(url.pathname);
  const local = join(ROOT, normalize(path));
  const info = await fileAt(local);

  if (info?.isDirectory()) {
    if (!path.endsWith("/")) {
      res.writeHead(301, { Location: `${path}/${url.search}` });
      return res.end();
    }
    const index = join(local, "index.html");
    if (await fileAt(index)) return send(res, 200, index);
  } else if (info && !path.endsWith(".php") && !path.endsWith(".htaccess")) {
    return send(res, 200, local);
  }

  send(res, 404, join(ROOT, /^\/ru(\/|$)/.test(path) ? "ru/error-404/index.html" : "error-404/index.html"));
}).listen(PORT, () => console.log(`Готовая сборка: http://localhost:${PORT}`));
