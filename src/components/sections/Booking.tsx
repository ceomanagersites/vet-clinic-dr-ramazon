import { clinic } from "@/content/clinic";
import { BookingForm } from "@/components/sections/BookingForm";
import type { Dictionary } from "@/i18n";

export function Booking({ t }: { t: Dictionary["booking"] }) {
  return (
    <section id="booking" className="relative -mt-px bg-pine pt-16 pb-24 text-milk lg:pt-24 lg:pb-32">
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <h2 className="heading">{t.title}</h2>
          <p className="lead mt-6 max-w-md text-milk/75">{t.lead}</p>
          <ul className="mt-8 flex flex-col">
            {clinic.phones.map((phone) => (
              <li key={phone.tel} className="border-t border-milk/15 last:border-b">
                <a
                  href={`tel:${phone.tel}`}
                  className="block py-3.5 text-[clamp(1.4rem,1.2rem+0.8vw,1.9rem)] font-light tracking-[-0.015em] whitespace-nowrap transition-colors hover:text-amber"
                >
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <BookingForm t={t} />
        </div>
      </div>
    </section>
  );
}
