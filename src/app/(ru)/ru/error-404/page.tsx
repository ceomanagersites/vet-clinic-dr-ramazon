import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";
import { getDictionary } from "@/i18n";

// Готовая страница 404 для адресов на /ru: её показывает .htaccess.
export const metadata: Metadata = { title: getDictionary("ru").notFound.title, robots: { index: false } };

export default function NotFound404() {
  return <NotFoundPage locale="ru" />;
}
