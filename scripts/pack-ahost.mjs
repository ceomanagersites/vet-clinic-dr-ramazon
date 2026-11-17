// Упаковывает готовую сборку из out в ahost-site.zip для загрузки через файловый менеджер хостинга.
// Встроенный в Windows tar пишет пути со слешами, поэтому архив правильно распакуется на Linux-сервере.
import { execFileSync } from "node:child_process";
import { readFile, readdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

// Без домена ссылки для поисковиков и превью в Telegram указывали бы на localhost.
if ((await readFile("out/index.html", "utf8")).includes('rel="canonical" href="http://localhost')) {
  console.error("Сборка сделана без домена. Задайте NEXT_PUBLIC_SITE_URL и запустите npm.cmd run build ещё раз.");
  process.exit(1);
}

const zip = resolve("ahost-site.zip");
await rm(zip, { force: true });
const entries = await readdir("out");
execFileSync("tar", ["-a", "-c", "-f", zip, ...entries], { cwd: "out", stdio: "inherit" });
console.log(`Архив для Ahost: ${zip} (${((await stat(zip)).size / 1024 / 1024).toFixed(1)} МБ)`);
