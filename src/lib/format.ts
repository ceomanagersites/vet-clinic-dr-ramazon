import type { Locale } from "@/i18n";

// Разряды разделены неразрывным пробелом, чтобы цена не переносилась на две строки.
function groupThousands(amount: number) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPriceFrom(locale: Locale, amount: number) {
  const value = groupThousands(amount);
  return locale === "uz" ? `${value} soʻmdan` : `от ${value} сум`;
}
