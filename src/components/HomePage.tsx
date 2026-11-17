import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";
import { Contacts } from "@/components/sections/Contacts";
import { Doctor } from "@/components/sections/Doctor";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Hours } from "@/components/sections/Hours";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getDictionary, type Locale } from "@/i18n";
import { clinicStructuredData } from "@/lib/structuredData";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData(locale)) }} />
      <Header locale={locale} t={t.header} nav={t.nav} social={t.social.aria} />
      <main>
        <Hero t={t.hero} address={t.address.full} />
        <About t={t.about} />
        <Services t={t.services} clinicalCase={t.clinicalCase} locale={locale} />
        <Doctor t={t.doctor} />
        <Gallery t={t.gallery} />
        <Reviews t={t.reviews} />
        <Hours t={t.hours} address={t.address} />
        <Booking t={t.booking} />
        <Contacts t={t.contacts} address={t.address} social={t.social.aria} />
      </main>
      <Footer t={t.footer} nav={t.nav} address={t.address} logoAria={t.header.logoAria} social={t.social.aria} />
      <MobileCallBar call={t.header.callShort} book={t.header.book} />
      <RevealObserver />
    </>
  );
}
