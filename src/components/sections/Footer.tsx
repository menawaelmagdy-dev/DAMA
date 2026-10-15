"use client";

import Link from "next/link";
import { useRef } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { site } from "@/lib/content";
import { asset } from "@/lib/era";
import { useApp } from "../AppContext";
import { Arrow, Marquee } from "../ui";

export default function Footer() {
  const { t } = useApp();
  const root = useRef<HTMLElement>(null);

  return (
    <footer ref={root} className="relative overflow-hidden bg-paper">
      <div className="relative h-[36svh] w-full overflow-hidden md:h-[46svh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.footer.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="u-edge pt-14 md:pt-20">
        <div className="grid grid-cols-1 gap-10 border-b border-line pb-14 md:grid-cols-12 md:gap-8 md:pb-20">
          <div className="md:col-span-4">
            <button
              onClick={() => scrollToTarget(0)}
              data-cursor="hover"
              className="t-eyebrow group mb-8 inline-flex items-center gap-3 text-ink-mute transition-colors hover:text-ink"
            >
              <span className="inline-block h-3.5 w-3.5 rounded-full border border-current">
                <span className="mx-auto block h-1.5 w-px -translate-y-0.5 bg-current" />
              </span>
              {t.footer.toTop}
            </button>

            <a
              href={site.phoneHref}
              data-cursor="hover"
              dir="ltr"
              className="t-display block text-[clamp(1.5rem,3vw,2.4rem)] text-ink transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              data-cursor="hover"
              className="t-eyebrow mt-4 inline-flex text-ink-mute underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="t-eyebrow mb-4 text-ink-mute">{t.footer.officeTitle}</p>
            <a
              href={site.mapOffice}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group inline-flex items-start gap-2 text-sm/relaxed text-ink-soft transition-colors hover:text-ink"
            >
              {t.footer.officeAddress}
              <Arrow className="mt-1 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="t-eyebrow mb-4 text-ink-mute">{t.nav.menu}</p>
            <ul className="flex flex-col gap-3">
              {[
                { l: t.nav.home, h: "/" },
                { l: t.nav.apartments, h: "/apartments" },
                { l: t.nav.contact, h: "/contact" },
              ].map((it) => (
                <li key={it.h}>
                  <Link
                    href={it.h}
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {it.l}
                    <Arrow className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="t-eyebrow text-ink-mute">{t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={asset.privacyPdf}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="t-eyebrow text-ink-mute transition-colors hover:text-ink"
            >
              {t.footer.privacy}
            </a>
            <a
              href={asset.termsPdf}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="t-eyebrow text-ink-mute transition-colors hover:text-ink"
            >
              {t.footer.terms}
            </a>
            <a
              href={site.makerUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="t-eyebrow flex items-center gap-2 text-ink-mute transition-colors hover:text-ink"
            >
              {t.footer.madeBy} <span className="text-ink underline decoration-ink/20 underline-offset-4">{site.maker}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line py-6">
        <Marquee
          text={t.footer.wordmark}
          className="t-display text-[clamp(3rem,13vw,11rem)] leading-none text-ink/90"
          speed={90}
          separator="—"
        />
      </div>
    </footer>
  );
}
