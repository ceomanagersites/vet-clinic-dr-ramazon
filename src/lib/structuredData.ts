import { clinic } from "@/content/clinic";
import { getDictionary, localePaths, type Locale } from "@/i18n";
import { siteUrl } from "@/lib/site";

// Часы в разметку не входят: для неё нужны дни недели, а они пока не подтверждены.
// Рейтинг не указан, потому что разметку собственных отзывов Google не учитывает.
export function clinicStructuredData(locale: Locale) {
  const { meta, address, doctorName } = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${siteUrl}/#clinic`,
    name: clinic.name,
    description: meta.schemaDescription,
    url: `${siteUrl}${localePaths[locale] === "/" ? "" : localePaths[locale]}`,
    image: `${siteUrl}${meta.ogImage}`,
    telephone: clinic.phones.map((phone) => phone.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.full,
      addressLocality: address.city,
      addressRegion: address.district,
      postalCode: clinic.postalCode,
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.latitude,
      longitude: clinic.geo.longitude,
    },
    hasMap: clinic.maps.yandex,
    sameAs: Object.values(clinic.social),
    founder: {
      "@type": "Person",
      name: doctorName,
      jobTitle: meta.doctorJobTitle,
    },
  };
}
