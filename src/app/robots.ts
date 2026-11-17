import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

// Сайт собирается в готовые файлы, поэтому robots.txt создаётся один раз при сборке.
export const dynamic = "force-static";

// Страницу не закрываем здесь: иначе поисковики и превью в мессенджерах не увидят метатеги.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: isIndexable ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
