import { Clock, Navigation, Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Dictionary } from "@/i18n";

type ContactsProps = {
  t: Dictionary["contacts"];
  address: Dictionary["address"];
  social: string;
};

export function Contacts({ t, address, social }: ContactsProps) {
  return (
    <section id="contacts" className="bg-milk py-24 lg:py-32">
      <div className="wrap grid gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <h2 className="heading text-pine">{t.title}</h2>
          <p className="mt-3 text-moss">{clinic.name}</p>

          <address className="mt-8 not-italic">
            <p className="text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-tight font-light tracking-[-0.015em] text-pine">{address.full}</p>
            <p className="mt-2 text-moss">
              {address.district}, {address.city}
            </p>
            <p className="mt-1 text-moss">{t.metro}</p>
          </address>

          <p className="mt-5 rounded-2xl bg-oat px-5 py-4 text-[0.97rem] text-ink/85">{t.moved}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={clinic.maps.route} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation size={18} strokeWidth={1.6} />
              {t.route}
            </a>
          </div>
          <p className="mt-3 text-moss">
            {t.alsoOpen}{" "}
            <a href={clinic.maps.google} target="_blank" rel="noopener noreferrer" className="py-2.5 text-pine underline underline-offset-4">
              {t.googleMaps}
            </a>{" "}
            {t.and}{" "}
            <a href={clinic.maps.twoGis} target="_blank" rel="noopener noreferrer" className="py-2.5 text-pine underline underline-offset-4">
              {t.twoGis}
            </a>{" "}
            {t.alsoOpenAfter}
          </p>

          <h3 className="mt-10 text-sm text-moss">{t.phonesTitle}</h3>
          <ul className="mt-2 flex flex-col">
            {clinic.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center gap-2.5 text-lg text-pine">
                  <Phone size={17} strokeWidth={1.6} />
                  <span className="link-underline whitespace-nowrap">{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center gap-2.5 text-lg text-pine tabular-nums">
            <Clock size={17} strokeWidth={1.6} />
            {t.hoursLabel} {clinic.hours}
          </p>

          <h3 className="mt-8 text-sm text-moss">{t.socialTitle}</h3>
          <SocialLinks suffix={social} className="mt-3 text-pine" />
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div className="h-[24rem] overflow-hidden rounded-[2rem] bg-sage-100 sm:h-[30rem] lg:sticky lg:top-28 lg:h-[min(44rem,calc(100svh-9rem))]">
            <iframe src={clinic.maps.widget} title={t.mapTitle} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="size-full border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
