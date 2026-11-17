import type { CSSProperties } from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { clinic, primaryPhone } from "@/content/clinic";
import { serviceGroups, type Service, type ServiceGroup } from "@/content/services";
import type { Dictionary, Locale } from "@/i18n";
import { formatPriceFrom } from "@/lib/format";
import xray from "@/assets/images/case-xray.jpg";

type ServicesTexts = Dictionary["services"];

function ServiceCard({ service, index, t, locale }: { service: Service; index: number; t: ServicesTexts; locale: Locale }) {
  const Icon = service.icon;
  const isTelegram = service.contact === "telegram";
  const text = t.items[service.id];

  return (
    <div className="flex min-w-0 flex-[1_1_min(15rem,100%)]" data-reveal style={{ "--reveal-delay": `${index * 40}ms` } as CSSProperties}>
      <article className="service-card flex w-full flex-col rounded-2xl border border-sage-300/70 bg-milk p-6">
        <span className="service-icon grid size-11 place-items-center rounded-full bg-sage-100 text-pine">
          <Icon size={20} strokeWidth={1.5} />
        </span>
        <h4 className="mt-5 text-lg leading-snug font-normal text-pine">{text.name}</h4>
        <p className="mt-2 mb-5 text-[0.97rem] leading-relaxed text-moss">{text.text}</p>
        <div className="mt-auto">
          {service.priceFrom && <p className="mb-1 text-[1.3rem] leading-tight font-normal tracking-[-0.01em] text-pine tabular-nums">{formatPriceFrom(locale, service.priceFrom)}</p>}
          <a
            href={isTelegram ? clinic.telegramChat : `tel:${primaryPhone.tel}`}
            target={isTelegram ? "_blank" : undefined}
            rel={isTelegram ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-pine"
          >
            {isTelegram ? <MessageCircle size={16} strokeWidth={1.6} /> : <Phone size={16} strokeWidth={1.6} />}
            <span className="link-underline">{isTelegram ? t.telegramLink : t.callLink}</span>
          </a>
        </div>
      </article>
    </div>
  );
}

function ServiceGroupBlock({ group, t, locale }: { group: ServiceGroup; t: ServicesTexts; locale: Locale }) {
  const heading = t.groups[group.id];

  return (
    <div>
      <div data-reveal>
        <h3 className="text-[1.6rem] leading-tight font-light tracking-[-0.02em] text-pine">{heading.title}</h3>
        <p className="mt-1.5 max-w-xl text-moss">{heading.note}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {group.services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} t={t} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function ClinicalCase({ t }: { t: Dictionary["clinicalCase"] }) {
  return (
    <figure className="grid overflow-hidden rounded-[2rem] bg-ink text-milk md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative aspect-[3/2] overflow-hidden md:aspect-auto md:min-h-[24rem]" data-reveal="image">
        <Image src={xray} alt={t.imageAlt} fill placeholder="blur" sizes="(min-width: 768px) 52vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="flex flex-col justify-center p-7 sm:p-10 lg:p-14" data-reveal>
        <p className="text-sm text-sage">{t.label}</p>
        <h3 className="heading mt-4 text-[clamp(1.9rem,1.4rem+2vw,3.2rem)]!">{t.title}</h3>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-milk/80">{t.text}</p>
      </figcaption>
    </figure>
  );
}

type ServicesProps = {
  t: ServicesTexts;
  clinicalCase: Dictionary["clinicalCase"];
  locale: Locale;
};

export function Services({ t, clinicalCase, locale }: ServicesProps) {
  const [examination, treatment, ...rest] = serviceGroups;

  return (
    <section id="services" className="bg-milk py-24 lg:py-36">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end" data-reveal>
          <h2 className="heading text-pine lg:col-span-7">{t.title}</h2>
          <p className="lead text-moss lg:col-span-5">{t.lead}</p>
        </div>

        <div className="mt-14 flex flex-col gap-14 lg:mt-20 lg:gap-20">
          <ServiceGroupBlock group={examination} t={t} locale={locale} />
          <ClinicalCase t={clinicalCase} />
          <ServiceGroupBlock group={treatment} t={t} locale={locale} />
          <div className="grid gap-x-3 gap-y-14 lg:grid-cols-2 lg:gap-y-20">
            {rest.map((group) => (
              <ServiceGroupBlock key={group.id} group={group} t={t} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
