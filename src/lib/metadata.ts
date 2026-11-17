import type { Metadata, Viewport } from "next";
import { clinic } from "@/content/clinic";
import { getDictionary, localePaths, locales, openGraphLocales, type Locale } from "@/i18n";
import { isIndexable, siteUrl } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#fbf9f4",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  const path = localePaths[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: clinic.name,
    alternates: {
      canonical: path,
      languages: { uz: localePaths.uz, ru: localePaths.ru, "x-default": localePaths.uz },
    },
    robots: isIndexable ? undefined : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => openGraphLocales[other]),
      siteName: clinic.name,
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: path,
      images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: meta.ogTitle, description: meta.ogDescription, images: [meta.ogImage] },
  };
}
