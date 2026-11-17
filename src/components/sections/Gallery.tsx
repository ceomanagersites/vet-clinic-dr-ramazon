import { clinic } from "@/content/clinic";
import { galleryPhotos } from "@/content/gallery";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import type { Dictionary } from "@/i18n";

export function Gallery({ t }: { t: Dictionary["gallery"] }) {
  const items = galleryPhotos.map((photo) => ({ ...photo, alt: t.items[photo.id] }));

  return (
    <section id="gallery" className="bg-milk py-24 lg:py-36">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end" data-reveal>
          <h2 className="heading text-pine lg:col-span-7">{t.title}</h2>
          <p className="lead text-moss lg:col-span-5">
            {t.lead}{" "}
            <a href={clinic.social.telegram} target="_blank" rel="noopener noreferrer" className="py-2.5 text-pine underline underline-offset-4">
              {t.telegram}
            </a>{" "}
            {t.and}{" "}
            <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer" className="py-2.5 text-pine underline underline-offset-4">
              {t.instagram}
            </a>
            .
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <GalleryGrid
            items={items}
            labels={{
              openPhoto: t.openPhoto,
              dialog: t.dialog,
              closeViewer: t.closeViewer,
              previous: t.previous,
              next: t.next,
              of: t.of,
            }}
          />
        </div>
      </div>
    </section>
  );
}
