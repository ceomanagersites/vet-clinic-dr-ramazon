import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { clinic, primaryPhone } from "@/content/clinic";
import { PawMark } from "@/components/ui/Icons";
import type { Dictionary } from "@/i18n";
import heroDoctor from "@/assets/images/hero-doctor.jpg";
import toeCorgi from "@/assets/images/toe-corgi.jpg";
import toeGingerCat from "@/assets/images/toe-ginger-cat.jpg";
import toeGoldenPuppy from "@/assets/images/toe-golden-puppy.jpg";
import toeGreyCat from "@/assets/images/toe-grey-cat.jpg";

type Toe = {
  className: string;
  image: StaticImageData;
  alt: string;
  press: number;
  zoom: number;
  position?: string;
};

function PawPrint({ t }: { t: Dictionary["hero"] }) {
  const toes: Toe[] = [
    { className: "pad-1", image: toeGreyCat, alt: t.toes.greyCat, press: 300, zoom: 1.04, position: "50% 34%" },
    { className: "pad-2", image: toeGoldenPuppy, alt: t.toes.puppy, press: 360, zoom: 1.22, position: "50% 40%" },
    { className: "pad-3", image: toeGingerCat, alt: t.toes.gingerCat, press: 420, zoom: 1.2, position: "60% 45%" },
    { className: "pad-4", image: toeCorgi, alt: t.toes.corgi, press: 480, zoom: 1.28, position: "50% 40%" },
  ];

  return (
    <div className="paw">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="pad-main" clipPathUnits="objectBoundingBox">
            <path d="M.5 0C.66 0 .77.1.85.26.92.4 1 .52 1 .7 1 .89.86 1 .71 1 .62 1 .57.95.5.95.43.95.38 1 .29 1 .14 1 0 .89 0 .7 0 .52.08.4.15.26.23.1.34 0 .5 0Z" />
          </clipPath>
          <clipPath id="pad-toe" clipPathUnits="objectBoundingBox">
            <path d="M.5 0C.78 0 1 .32 1 .62 1 .85.78 1 .5 1 .22 1 0 .85 0 .62 0 .32.22 0 .5 0Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="pad pad-main" style={{ "--press": "120ms" } as CSSProperties}>
        <Image
          src={heroDoctor}
          alt={t.doctorAlt}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 34vw, 74vw"
          className="object-cover object-top"
        />
      </div>

      {toes.map((toe) => (
        <div key={toe.className} className={`pad ${toe.className}`} style={{ "--press": `${toe.press}ms`, "--zoom": toe.zoom } as CSSProperties}>
          <Image
            src={toe.image}
            alt={toe.alt}
            fill
            sizes="(min-width: 1024px) 14vw, 30vw"
            className="object-cover"
            style={{ objectPosition: toe.position }}
          />
        </div>
      ))}
    </div>
  );
}

export function Hero({ t, address }: { t: Dictionary["hero"]; address: string }) {
  return (
    <section id="top" className="relative pt-[6.5rem] pb-12 lg:pt-[5.75rem] lg:pb-16">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-8 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:content-center lg:gap-y-0">
        <div className="lg:self-end">
          <h1 className="display hero-rise text-pine">{t.title}</h1>
          <p className="lead hero-rise mt-5 max-w-[34rem] text-ink/80 lg:mt-6" style={{ "--enter": "70ms" } as CSSProperties}>
            {t.lead}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[34rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mr-0 lg:max-w-[min(100%,calc(100svh-9.5rem))] lg:self-center">
          <PawPrint t={t} />
        </div>

        <div className="hero-rise lg:self-start" style={{ "--enter": "140ms" } as CSSProperties}>
          <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap lg:mt-8">
            <a href="#booking" className="btn btn-primary">
              {t.book}
            </a>
            <a href={`tel:${primaryPhone.tel}`} className="btn btn-outline text-pine" aria-label={`${t.callAria} ${primaryPhone.display}`}>
              <Phone size={18} strokeWidth={1.6} />
              {t.call}
              <span className="hidden font-light opacity-70 2xl:inline">{primaryPhone.display}</span>
            </a>
          </div>

          <ul className="mt-9 grid gap-2.5 text-[0.95rem] text-moss sm:grid-cols-2 sm:gap-x-8">
            <li className="flex items-center gap-2">
              <PawMark className="size-4 shrink-0 text-amber" />
              {t.years}
            </li>
            <li className="flex items-center gap-2">
              <PawMark className="size-4 shrink-0 text-amber" />
              {t.followers}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} strokeWidth={1.7} className="shrink-0 text-amber" />
              {address}
            </li>
            <li className="flex items-center gap-2 tabular-nums">
              <Clock size={16} strokeWidth={1.7} className="shrink-0 text-amber" />
              {clinic.hours}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
