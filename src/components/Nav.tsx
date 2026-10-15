"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { useApp } from "./AppContext";
import { Arrow } from "./ui";
import { img } from "@/lib/media";

export default function Nav() {
  const { t, toggleLang, ready } = useApp();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.project, href: "/#concept" },
    { label: t.nav.apartments, href: "/apartments" },
    { label: t.nav.amenities, href: "/#amenities" },
    { label: t.nav.contact, href: "/contact" },
  ];

  /* ---- build the menu timeline once ---- */
  useGSAP(
    () => {
      const el = overlay.current;
      if (!el) return;

      gsap.set(el, { autoAlpha: 1 });

      const t1 = gsap.timeline({ paused: true, defaults: { ease: "luxInOut" } });
      t1.set(el, { pointerEvents: "auto" })
        .fromTo(".menu-panel", { yPercent: 101 }, { yPercent: 0, duration: 0.95, stagger: 0.07 })
        .fromTo(
          ".menu-item-inner",
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.06, ease: EASE.out },
          "-=0.55",
        )
        .fromTo(".menu-meta", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 }, "-=0.6")
        .fromTo(
          ".menu-visual",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1, ease: EASE.out },
          "-=0.9",
        );

      t1.reverse(0).pause();
      tl.current = t1;
    },
    { scope: root },
  );

  useEffect(() => {
    const el = overlay.current;
    if (!el || !tl.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      tl.current.timeScale(1).play();
    } else {
      document.body.style.overflow = "";
      tl.current.timeScale(1.5).reverse();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* close on route change + on Escape */
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---- nav bar + floating UI behave with the page ---- */
  useGSAP(
    () => {
      if (!ready) return;
      const bar = root.current?.querySelector(".nav-bar");
      if (bar) gsap.fromTo(bar, { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: EASE.out, delay: 0.35 });

      const hero = document.querySelector("#hero");
      const st = ScrollTrigger.create({
        trigger: hero ?? document.body,
        start: "bottom 70%",
        onEnter: () => {
          gsap.to(".nav-top", { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE.out });
          gsap.to(".nav-cta", { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.out });
        },
        onLeaveBack: () => {
          gsap.to(".nav-top", { autoAlpha: 0, y: 14, duration: 0.4 });
          gsap.to(".nav-cta", { autoAlpha: 0, y: 18, duration: 0.4 });
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [ready, pathname] },
  );

  const onLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(1);
      if (pathname === "/") {
        e.preventDefault();
        setOpen(false);
        gsap.delayedCall(0.5, () => scrollToTarget(id, -70));
        return;
      }
    }
    setOpen(false);
  };

  return (
    <div ref={root}>
      {/* ---------------- top bar ---------------- */}
      <header className="nav-bar pointer-events-none fixed inset-x-0 top-0 z-[96] u-edge py-5 opacity-0 md:py-7">
        <div className="flex items-start justify-between gap-4">
          <Link
            href="/"
            data-cursor="hover"
            className="pointer-events-auto flex flex-col leading-none text-ink"
            aria-label={`${t.brand.name} ${t.brand.sub}`}
          >
            <span className="t-display text-[1.75rem] tracking-tight md:text-[2rem]">{t.brand.name}</span>
            <span className="t-eyebrow mt-1 text-ink-mute">{t.brand.sub}</span>
          </Link>

          <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleLang}
              data-cursor="hover"
              aria-label="Switch language"
              className="t-eyebrow rounded-full border border-ink/15 bg-sand-50/40 px-4 py-2.5 text-ink backdrop-blur-sm transition-colors hover:border-ink/40"
            >
              {t.nav.switchTo}
            </button>

            <Link
              href="/apartments"
              data-cursor="hover"
              className="t-eyebrow hidden rounded-full border border-ink/15 bg-sand-50/40 px-4 py-2.5 text-ink backdrop-blur-sm transition-colors hover:border-ink/40 lg:inline-flex"
            >
              {t.nav.apartments}
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              aria-expanded={open}
              className="t-eyebrow relative inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 text-sand-50 transition-colors hover:bg-clay"
            >
              <span className="relative block h-2.5 w-3.5">
                <span
                  className="absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500"
                  style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500"
                  style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
                />
              </span>
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- floating UI ---------------- */}
      <button
        onClick={() => scrollToTarget(0)}
        data-cursor="hover"
        className="nav-top t-eyebrow pointer-events-auto fixed bottom-5 start-5 z-[96] flex translate-y-3 items-center gap-2 text-ink opacity-0 mix-blend-difference md:bottom-7 md:start-[clamp(1.25rem,4vw,5.5rem)]"
      >
        <span className="inline-block h-3.5 w-3.5 rounded-full border border-current">
          <span className="mx-auto block h-1.5 w-px bg-current" />
        </span>
        {t.nav.backToTop}
      </button>

      <Link
        href="/contact"
        data-cursor="hover"
        className="nav-cta group fixed bottom-4 end-4 z-[96] inline-flex translate-y-4 items-center gap-3 rounded-full bg-ink px-6 py-3.5 t-eyebrow text-sand-50 opacity-0 shadow-lg shadow-ink/10 transition-colors hover:bg-clay md:bottom-7 md:end-[clamp(1.25rem,4vw,5.5rem)]"
      >
        {t.nav.bookCall}
        <Arrow className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </Link>

      {/* ---------------- fullscreen menu ---------------- */}
      <div ref={overlay} className="fixed inset-0 z-[97] invisible" style={{ visibility: "hidden" }}>
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="menu-panel h-full flex-1 bg-sand-50" />
          ))}
        </div>

        <div className="grain relative grid h-full grid-cols-1 content-center gap-10 overflow-hidden u-edge pt-28 pb-16 md:grid-cols-12 md:pt-32">
          <nav className="md:col-span-7 md:self-center">
            <ol className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.href + i} className="overflow-hidden border-b border-ink/10 last:border-b-0">
                  <Link
                    href={l.href}
                    onClick={(e) => onLinkClick(e, l.href)}
                    data-cursor="hover"
                    className="menu-item-block group flex items-baseline gap-4 py-3.5 md:py-4"
                  >
                    <span className="t-eyebrow t-num w-7 shrink-0 text-clay">0{i + 1}</span>
                    <span className="overflow-hidden">
                      <span className="menu-item-inner t-display block text-[clamp(2rem,6.5vw,4.75rem)] leading-[1.05] transition-colors group-hover:text-clay">
                        {l.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <aside className="md:col-span-5 md:self-center md:ps-10">
            <div className="menu-visual relative mb-8 hidden aspect-4/3 w-full overflow-hidden md:block">
              <Image src={img.heroNight} alt="" fill sizes="40vw" className="object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-5">
              <div className="menu-meta">
                <p className="t-eyebrow mb-2 text-ink-mute">{t.footer.officeTitle}</p>
                <p className="text-sm/relaxed text-ink-soft">{t.footer.officeAddress}</p>
              </div>
              <div className="menu-meta">
                <p className="t-eyebrow mb-2 text-ink-mute">{t.footer.branchTitle}</p>
                <p className="text-sm/relaxed text-ink-soft">{t.footer.branchAddress}</p>
              </div>
              <div className="menu-meta col-span-2 md:col-span-1">
                <a
                  href={`tel:${t.footer.phone.replace(/\s|\(|\)|-/g, "")}`}
                  data-cursor="hover"
                  className="t-display text-2xl text-ink transition-colors hover:text-clay"
                >
                  {t.footer.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
