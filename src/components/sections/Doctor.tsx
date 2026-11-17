import type { CSSProperties } from "react";
import Image from "next/image";
import { PawMark } from "@/components/ui/Icons";
import type { Dictionary } from "@/i18n";
import portrait from "@/assets/images/doctor-portrait.jpg";
import blackCat from "@/assets/images/doctor-black-cat.jpg";
import siamese from "@/assets/images/doctor-siamese.jpg";
import gloves from "@/assets/images/doctor-kitten-gloves.jpg";
import maineCoon from "@/assets/images/doctor-maine-coon.jpg";
import greyCat from "@/assets/images/doctor-grey-cat.jpg";
import british from "@/assets/images/doctor-british.jpg";
import raximov from "@/assets/images/team-raximov.webp";
import abdurahmonov from "@/assets/images/team-abdurahmonov.webp";
import razzokov from "@/assets/images/team-razzokov.webp";
import jamolov from "@/assets/images/team-jamolov.webp";
import meyliyeva from "@/assets/images/team-meyliyeva.webp";
import mamasoliyev from "@/assets/images/team-mamasoliyev.webp";
import qochqorov from "@/assets/images/team-qochqorov.webp";

const patientImages = { blackCat, maineCoon, siamese, british, gloves, greyCat };
const patientOrder = ["blackCat", "maineCoon", "siamese", "british", "gloves", "greyCat"] as const;

// Портреты выровнены по размеру лица и линии глаз, поэтому все стоят в одном масштабе.
// Имена латиницей, как их дала клиника, и в том же порядке, что у доктора: фамилия, затем имя.
const team = [
  { id: "raximov", name: "Raximov Xusniddin", image: raximov },
  { id: "abdurahmonov", name: "Abdurahmonov Abdurahim", image: abdurahmonov },
  { id: "razzokov", name: "Razzokov Jamoliddin", image: razzokov },
  { id: "jamolov", name: "Jamolov Kamol", image: jamolov },
  { id: "meyliyeva", name: "Meyliyeva Kibriyo", image: meyliyeva },
  { id: "mamasoliyev", name: "Mamasoliyev Mirzoolim", image: mamasoliyev },
  { id: "qochqorov", name: "Qochqorov Begzod", image: qochqorov },
] as const;

export function Doctor({ t }: { t: Dictionary["doctor"] }) {
  return (
    <section id="doctor" className="overflow-clip bg-oat pt-24 pb-24 lg:pt-32 lg:pb-36">
      <div className="wrap">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="text-[clamp(3rem,1.2rem+7.4vw,7.5rem)] leading-[0.98] font-light tracking-[-0.04em] text-pine">
              {t.nameLines[0]}
              <br />
              {t.nameLines[1]}
            </h2>
            <p className="mt-6 flex items-center gap-2.5 text-lg text-moss">
              <PawMark className="size-5 shrink-0 text-amber" />
              {t.role}
            </p>

            <p className="heading mt-10 max-w-2xl text-[clamp(1.55rem,1.25rem+1.2vw,2.3rem)]! text-pine">{t.tagline}</p>

            <div className="lead mt-6 flex max-w-2xl flex-col gap-4 text-ink/80">
              {t.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <a href="#booking" className="btn btn-primary mt-9">
              {t.book}
            </a>
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-[2rem] bg-sage-300 sm:rounded-t-[14rem] lg:max-h-[calc(100svh-7.5rem)] lg:w-full"
              data-reveal="image"
            >
              <Image src={portrait} alt={t.portraitAlt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </div>

        <h3 className="mt-20 text-[1.6rem] font-light tracking-[-0.02em] text-pine lg:mt-28" data-reveal>
          {t.patientsTitle}
        </h3>

        <ul className="scroll-strip -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {patientOrder.map((id, index) => (
            <li
              key={id}
              data-reveal="image"
              style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}
              className={`relative aspect-[3/4] w-[62vw] max-w-[17rem] shrink-0 snap-center overflow-hidden rounded-2xl bg-sage-300 sm:w-[34vw] lg:w-auto lg:max-w-none ${
                index % 2 === 1 ? "lg:translate-y-6" : ""
              }`}
            >
              <Image src={patientImages[id]} alt={t.patients[id]} fill placeholder="blur" sizes="(min-width: 1024px) 16vw, 62vw" className="object-cover" />
            </li>
          ))}
        </ul>

        <div id="team" className="mt-24 grid scroll-mt-24 gap-4 lg:mt-36 lg:grid-cols-12 lg:items-end" data-reveal>
          <h3 className="heading text-pine lg:col-span-6">{t.teamTitle}</h3>
          <p className="lead text-moss lg:col-span-5 lg:col-start-8">{t.teamLead}</p>
        </div>

        {/* Неполный последний ряд стоит по центру */}
        <ul className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-8 sm:gap-x-5 lg:mt-14 lg:gap-x-6">
          {team.map((member, index) => (
            <li
              key={member.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}
              className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <figure>
                <div className="team-figure">
                  <div className="team-tile" />
                  <Image src={member.image} alt={t.team[member.id].alt} quality={90} sizes="(min-width: 1024px) 22vw, 46vw" />
                </div>
                <figcaption className="mt-4">
                  <span className="block text-[clamp(1rem,0.92rem+0.4vw,1.2rem)] leading-snug tracking-[-0.01em] text-pine">{member.name}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-moss">{t.team[member.id].role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
