import type { CSSProperties } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import aboutDoctor from "@/assets/images/about-doctor.jpg";

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" className="rounded-t-[2.25rem] bg-pine py-24 text-milk lg:rounded-t-[3.5rem] lg:py-36">
      <div className="wrap">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8" data-reveal>
            <h2 className="heading text-[clamp(2.2rem,1.3rem+4vw,5rem)]!">{t.title}</h2>
            <p className="lead mt-7 max-w-2xl text-milk/75">{t.lead}</p>
          </div>

          <figure className="lg:col-span-4 lg:row-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage-300" data-reveal="image">
              <Image src={aboutDoctor} alt={t.imageAlt} fill placeholder="blur" quality={90} sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-milk/60" data-reveal>
              {t.caption}
            </figcaption>
          </figure>

          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
            {t.principles.map((item, index) => (
              <div key={item.title} className="border-t border-milk/20 pt-5" data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
                <dt className="text-lg font-normal">{item.title}</dt>
                <dd className="mt-2 text-milk/75">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
