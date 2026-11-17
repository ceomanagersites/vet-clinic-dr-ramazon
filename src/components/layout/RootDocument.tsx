import type { ReactNode } from "react";
import type { Locale } from "@/i18n";
import { geologica } from "@/lib/fonts";
import "@/app/globals.css";

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={geologica.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
