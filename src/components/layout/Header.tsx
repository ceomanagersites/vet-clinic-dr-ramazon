"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Menu, Phone, X } from "lucide-react";
import { clinic, primaryPhone } from "@/content/clinic";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/ru";

type HeaderProps = {
  locale: Locale;
  t: Dictionary["header"];
  nav: Dictionary["nav"];
  social: string;
};

export function Header({ locale, t, nav, social }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          isScrolled || isOpen ? "border-sage-300/60 bg-milk/92 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-[4.75rem] items-center justify-between gap-3 lg:gap-6">
          <Logo label={t.logoAria} className="text-pine" />

          <nav aria-label={t.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[0.95rem]">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={activeHref === href ? "true" : undefined}
                    className={`link-underline py-1 whitespace-nowrap transition-colors ${activeHref === href ? "text-pine" : "text-ink/70 hover:text-pine"}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <LanguageSwitcher locale={locale} label={t.language} />
            <a
              href={`tel:${primaryPhone.tel}`}
              aria-label={`${t.callAria} ${primaryPhone.display}`}
              className="hidden size-11 place-items-center rounded-full bg-sage-100 text-pine active:scale-95 xs:grid"
            >
              <Phone size={18} strokeWidth={1.6} />
            </a>
            <a href="#booking" className="btn btn-primary hidden min-h-11! px-5! py-2! text-[0.95rem] md:inline-flex">
              {t.book}
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t.closeMenu : t.openMenu}
              className="grid size-11 place-items-center rounded-full text-pine xl:hidden"
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!isOpen}
        data-open={isOpen}
        className="mobile-menu fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-milk px-5 pt-[5.5rem] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] xl:hidden"
      >
        <nav aria-label={t.mobileNav}>
          <ul className="flex flex-col">
            {nav.map(({ href, label }, index) => (
              <li key={href} className="menu-item border-b border-sage-300/60" style={{ "--enter": `${index * 30}ms` } as CSSProperties}>
                <a href={href} onClick={close} className="block py-2.5 text-[1.55rem] font-light tracking-[-0.02em] text-pine">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6">
          <a href="#booking" onClick={close} className="btn btn-primary w-full">
            {t.bookFull}
          </a>
          <ul className="mt-4 flex flex-col">
            {clinic.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="block py-1 text-[1.05rem] text-pine">
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
          <SocialLinks suffix={social} className="mt-4 text-pine" />
        </div>
      </div>
    </>
  );
}
