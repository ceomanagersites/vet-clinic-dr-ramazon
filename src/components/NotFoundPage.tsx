import { PawMark } from "@/components/ui/Icons";
import { getDictionary, localePaths, type Locale } from "@/i18n";
import { basePath } from "@/i18n/config";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).notFound;

  return (
    <main className="wrap flex min-h-svh flex-col items-start justify-center py-20">
      <PawMark className="size-12 text-pine" />
      <h1 className="heading mt-8 text-pine">{t.title}</h1>
      <p className="lead mt-4 max-w-md text-moss">{t.text}</p>
      <a href={`${basePath}${localePaths[locale]}`} className="btn btn-primary mt-8">
        {t.back}
      </a>
    </main>
  );
}
