import type { Locale } from "@/i18n/config";
import { ru, type Dictionary } from "@/i18n/ru";
import { uz } from "@/i18n/uz";

export * from "@/i18n/config";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { uz, ru };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
