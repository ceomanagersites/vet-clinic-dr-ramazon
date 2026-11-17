import type { MetadataRoute } from "next";
import { localePaths, locales } from "@/i18n";
import { siteUrl } from "@/lib/site";

// Сайт собирается в готовые файлы, поэтому sitemap.xml создаётся один раз при сборке.
export const dynamic = "force-static";

const absolute =(path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, absolute(localePaths[locale])]));

  return locales.map((locale) => ({
    url: absolute(localePaths[locale]),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
