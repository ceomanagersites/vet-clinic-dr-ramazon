import { clinic } from "@/content/clinic";
import { ReviewsSlider } from "@/components/sections/ReviewsSlider";
import type { Dictionary } from "@/i18n";

export function Reviews({ t }: { t: Dictionary["reviews"] }) {
  const sources = [
    { label: t.allYandex, href: clinic.reviews.yandex },
    { label: t.allGoogle, href: clinic.reviews.google },
    { label: t.all2gis, href: clinic.reviews.twoGis },
  ];

  return (
    <section id="reviews" className="overflow-clip bg-sage-100 py-24 lg:py-36">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end" data-reveal>
          <h2 className="heading text-pine lg:col-span-7">{t.title}</h2>
          <p className="text-moss lg:col-span-5">{t.lead}</p>
        </div>
      </div>

      <ReviewsSlider t={t} />

      <div className="wrap mt-9">
        <p className="text-moss">
          {t.allLabel}{" "}
          {sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && ", "}
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="py-2.5 text-pine underline underline-offset-4">
                {source.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
