"use client";

import { useRef } from "react";
import Link from "next/link";
import { asset } from "@/lib/era";
import { site } from "@/lib/content";
import { useApp } from "@/components/AppContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Arrow, Eyebrow, Reveal, RevealGroup, SplitLines } from "@/components/ui";
import { useRequestModal } from "@/components/RequestModal";

export default function ContactClient() {
  const { t } = useApp();
  const { open } = useRequestModal();
  const root = useRef<HTMLDivElement>(null);

  const socials = [
    { label: t.contact.social.linkedin, href: site.linkedin },
    { label: t.contact.social.facebook, href: site.facebook },
    { label: t.contact.social.instagram, href: site.instagram },
  ];

  return (
    <div ref={root} className="bg-paper">
      <Breadcrumbs items={[{ label: t.nav.home, href: "/" }, { label: t.contact.breadcrumb }]} />

      <header className="u-edge pb-12 pt-10 md:pb-16 md:pt-14">
        <Reveal>
          <Eyebrow className="mb-5 text-ink-mute">{t.intro.region}</Eyebrow>
        </Reveal>
        <SplitLines as="h1" className="t-display text-[clamp(2.5rem,8vw,6rem)] text-ink">
          {t.contact.title}
        </SplitLines>
      </header>

      <div className="u-edge grid grid-cols-1 gap-12 pb-16 md:grid-cols-12 md:gap-14 md:pb-24">
        {/* write us */}
        <RevealGroup selector=":scope > *" className="flex flex-col gap-10 md:col-span-5">
          <div className="border-t border-line pt-6">
            <h2 className="t-display mb-4 text-[clamp(1.4rem,3vw,2.1rem)] text-ink">{t.contact.subtitle}</h2>
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              className="t-eyebrow group inline-flex items-center gap-3 text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
            >
              {site.email}
              <Arrow className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="t-eyebrow mb-4 text-ink-mute">{t.contact.salesOffice}</h3>
            <a
              href={site.mapOffice}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="max-w-xs text-sm/relaxed text-ink-soft transition-colors hover:text-ink"
            >
              {t.footer.officeAddress}
            </a>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="t-eyebrow mb-4 text-ink-mute">{t.contact.location}</h3>
            <a
              href={site.mapLocation}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="max-w-xs text-sm/relaxed text-ink-soft transition-colors hover:text-ink"
            >
              {t.contact.locationValue}
            </a>
          </div>

          <div className="border-t border-line pt-6">
            <h3 className="t-eyebrow mb-4 text-ink-mute">{t.contact.talkToUs}</h3>
            <a
              href={site.phoneHref}
              data-cursor="hover"
              dir="ltr"
              className="t-display block text-[clamp(1.5rem,3.2vw,2.4rem)] text-ink transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="t-eyebrow text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
              >
                {t.contact.whatsapp}
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="t-eyebrow text-ink-mute transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-line pt-6">
            <button
              onClick={() => open()}
              data-cursor="hover"
              className="t-eyebrow rounded-full bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-accent"
            >
              {t.contact.cta}
            </button>
          </div>
        </RevealGroup>

        {/* map */}
        <div className="md:col-span-7">
          <div className="relative aspect-4/3 w-full overflow-hidden border border-line bg-paper-2/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.mapSalesOffice} alt={t.contact.mapAlt} className="h-full w-full object-contain" />

            <div className="absolute bottom-5 start-5 border border-line bg-paper/95 p-5 backdrop-blur-sm">
              <p className="t-eyebrow mb-2 text-ink-mute">{t.contact.mapLabel}</p>
              <p className="t-display text-lg text-ink">{t.contact.hours}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={site.mapOffice}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="t-eyebrow inline-flex items-center gap-3 text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
            >
              {t.footer.officeAddress}
            </a>
          </div>
        </div>
      </div>

      <section className="u-edge pb-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-8 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <SplitLines as="p" className="t-display text-[clamp(1.4rem,3.2vw,2.4rem)] text-ink">
              {t.architecture.closing}
            </SplitLines>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/apartments"
              data-cursor="hover"
              className="t-eyebrow inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-3.5 text-ink transition-colors hover:border-ink"
            >
              {t.hero.cta}
              <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
