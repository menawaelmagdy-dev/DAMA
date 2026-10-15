"use client";

import Link from "next/link";
import { useRef } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { useApp } from "../AppContext";
import { Arrow, Marquee } from "../ui";

export default function Footer() {
  const { t } = useApp();
  const root = useRef<HTMLElement>(null);
  const tel = t.footer.phone.replace(/\s|\(|\)|-/g, "");

  return (
    <footer ref={root} className="relative overflow-hidden bg-sand-50 pt-16 md:pt-24">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-10 border-b border-ink/10 pb-14 md:grid-cols-12 md:gap-8 md:pb-20">
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
              href={`tel:${tel}`}
              data-cursor="hover"
              className="t-display block text-[clamp(1.5rem,3vw,2.4rem)] text-ink transition-colors hover:text-clay"
            >
              {t.footer.phone}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="t-eyebrow mb-4 text-ink-mute">{t.footer.officeTitle}</p>
            <p className="text-sm/relaxed text-ink-soft">{t.footer.officeAddress}</p>
          </div>

          <div className="md:col-span-3">
            <p className="t-eyebrow mb-4 text-ink-mute">{t.footer.branchTitle}</p>
            <p className="text-sm/relaxed text-ink-soft">{t.footer.branchAddress}</p>
          </div>

          <div className="md:col-span-2">
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
                    <Arrow className="h-3 w-3 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="t-eyebrow text-ink-mute">{t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" data-cursor="hover" className="t-eyebrow text-ink-mute transition-colors hover:text-ink">
              {t.footer.privacy}
            </a>
            <a href="#" data-cursor="hover" className="t-eyebrow text-ink-mute transition-colors hover:text-ink">
              {t.footer.terms}
            </a>
            <span className="t-eyebrow flex items-center gap-2 text-ink-mute">
              {t.footer.madeBy}
              <span className="text-ink">{t.footer.madeByName}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 py-6">
        <Marquee
          text={t.brand.project}
          className="t-display text-[clamp(3rem,14vw,12rem)] leading-none text-ink/90"
          speed={90}
          separator="—"
        />
      </div>
    </footer>
  );
}
