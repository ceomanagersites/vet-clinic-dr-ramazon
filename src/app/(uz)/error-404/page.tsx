import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";
import { getDictionary } from "@/i18n";

// Готовая страница 404: на хостинге её показывает .htaccess для любого несуществующего адреса.
export const metadata: Metadata = { title: getDictionary("uz").notFound.title, robots: { index: false } };

export default function NotFound404() {
  return <NotFoundPage locale="uz" />;
}
