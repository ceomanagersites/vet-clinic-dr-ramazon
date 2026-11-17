"use client";

import type { MouseEvent } from "react";
import { basePath, localeNames, localePaths, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  // Посетитель остаётся в том же разделе, когда меняет язык.
  const keepSection = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    event.currentTarget.href = `${basePath}${localePaths[target]}${window.location.hash}`;
  };

  return (
    <nav aria-label={label} className={`lang-switch ${className}`}>
      {locales.map((item) => (
        <a
          key={item}
          href={`${basePath}${localePaths[item]}`}
          hrefLang={item}
          lang={item}
          aria-label={localeNames[item].full}
          aria-current={item === locale ? "true" : undefined}
          onClick={(event) => keepSection(event, item)}
        >
          {localeNames[item].short}
        </a>
      ))}
    </nav>
  );
}
