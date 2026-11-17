import { clinic } from "@/content/clinic";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Dictionary } from "@/i18n";

type FooterProps = {
  t: Dictionary["footer"];
  nav: Dictionary["nav"];
  address: Dictionary["address"];
  logoAria: string;
  social: string;
};

export function Footer({ t, nav, address, logoAria, social }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine pt-20 pb-28 text-milk md:pb-10">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo label={logoAria} />
            <p className="mt-6 max-w-sm text-milk/75">
              {t.description} {t.tagline}
            </p>
            <SocialLinks suffix={social} className="mt-7" />
          </div>

          <nav aria-label={t.sectionsAria} className="lg:col-span-2">
            <h2 className="text-sm text-milk/60">{t.sections}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="link-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm text-milk/60">{t.phones}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {clinic.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="link-underline whitespace-nowrap">
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-7 text-sm text-milk/60">{t.hours}</h2>
            <p className="mt-2 tabular-nums">{clinic.hours}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm text-milk/60">{t.address}</h2>
            <p className="mt-4">
              {address.full}
              <br />
              {address.district}
              <br />
              {address.city}
            </p>
          </div>
        </div>

        <p className="mt-16 border-t border-milk/15 pt-6 text-sm text-milk/60">
          © {year} {clinic.name}
        </p>
      </div>
    </footer>
  );
}
