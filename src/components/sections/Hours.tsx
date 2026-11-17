import type { CSSProperties } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { clinic } from "@/content/clinic";
import { PawMark } from "@/components/ui/Icons";
import type { Dictionary } from "@/i18n";
import hoursDoctor from "@/assets/images/hours-doctor.webp";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

type HoursProps = {
  t: Dictionary["hours"];
  address: Dictionary["address"];
};

// Сцена из промо-ролика клиники, собранная на сайте: волна, плитка, доктор, часы и контакты.
export function Hours({ t, address }: HoursProps) {
  return (
    <section className="hours" aria-labelledby="hours-title" data-scene>
      <PawMark className="hours-paw" />

      <div className="wrap hours-top">
        <div className="hours-head">
          <h2 id="hours-title" className="hours-pill scene-slide" style={delay(260)}>
            {t.title}
          </h2>
          <p className="hours-time scene-fade" style={delay(320)}>
            {clinic.hours}
          </p>
        </div>

        <div className="hours-stage">
          <div className="hours-tile scene-rise" style={delay(60)} />
          <div className="hours-figure">
            <Image src={hoursDoctor} alt={t.imageAlt} quality={90} sizes="(min-width: 1024px) 34vw, 92vw" className="scene-peek" style={delay(140)} />
          </div>
        </div>
      </div>

      <div className="hours-bottom scene-panel">
        <svg className="hours-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 62C210 8 420 6 690 44s500 62 750-4v60H0Z" fill="currentColor" />
        </svg>

        <div className="wrap hours-contacts">
          <a href={clinic.maps.route} target="_blank" rel="noopener noreferrer" aria-label={`${t.routeAria} ${address.full}`} className="hours-address scene-slide" style={delay(400)}>
            <MapPin size={18} strokeWidth={1.7} className="shrink-0" />
            {address.full}, {address.district}
          </a>

          <div className="hours-phones scene-fade" style={delay(460)}>
            <p className="text-milk/70">{t.phonesLabel}</p>
            <ul className="mt-1 flex flex-wrap gap-x-7">
              {clinic.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center text-[1.2rem] whitespace-nowrap tabular-nums transition-colors hover:text-amber">
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
