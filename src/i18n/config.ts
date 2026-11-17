// Без словарей, чтобы клиентские компоненты могли импортировать это без лишнего веса.
export const locales = ["uz", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

// Со слешем на конце: на обычном хостинге русская версия лежит в папке ru как ru/index.html.
export const localePaths: Record<Locale, string> = { uz: "/", ru: "/ru/" };
// Для обычных <a href>: Next сам добавляет префикс только к своим ссылкам (GitHub Pages: /имя-репозитория).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const openGraphLocales: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU" };

export const localeNames: Record<Locale, { short: string; full: string }> = {
  uz: { short: "UZ", full: "Oʻzbekcha" },
  ru: { short: "RU", full: "Русский" },
};

export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value);
}
