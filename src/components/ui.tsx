"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, lineReveal, EASE, reduced } from "@/lib/gsap";
import { useApp } from "./AppContext";
import { scrollToTarget } from "@/lib/scroll";

/* ------------------------------------------------------------------ */
/*  Section label                                                      */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className = "",
  index,
}: {
  children: ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <span className={`t-eyebrow inline-flex items-center gap-2.5 ${className}`}>
      {index && <span className="t-num text-clay">{index}</span>}
      <span className="inline-block h-px w-6 bg-current opacity-40" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Masked line-by-line text reveal                                    */
/* ------------------------------------------------------------------ */
type SplitTag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span" | "li" | "blockquote";

export function SplitLines({
  children,
  as = "p",
  className = "",
  delay = 0,
  stagger = 0.085,
  start = "top 88%",
  play = "scroll",
}: {
  children: ReactNode;
  as?: SplitTag;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  play?: "scroll" | "mount";
}) {
  const ref = useRef<HTMLElement>(null);
  const { ready } = useApp();
  const Tag = as as unknown as React.ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!ready || !el) return;

      if (reduced()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      // the wrapper starts hidden so nothing flashes before the mask is built
      gsap.set(el, { autoAlpha: 1 });

      const { split, tween } = lineReveal(el, { stagger, delay });

      if (play === "mount") {
        tween.play();
        return () => split.revert();
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => tween.play(),
      });

      return () => {
        st.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <Tag ref={ref} className={`line-mask invisible ${className}`}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic fade / rise reveal                                         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  y = 34,
  delay = 0,
  start = "top 90%",
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!ready || !el) return;
      if (reduced()) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <div ref={ref} className={`invisible ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered children reveal                                          */
/* ------------------------------------------------------------------ */
export function RevealGroup({
  children,
  className = "",
  selector = ":scope > *",
  y = 28,
  stagger = 0.09,
  start = "top 88%",
}: {
  children: ReactNode;
  className?: string;
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!ready || !el) return;
      const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector));
      if (!items.length) return;
      if (reduced()) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });
      gsap.fromTo(
        items,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          ease: EASE.out,
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <div ref={ref} className={`invisible ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image with clip reveal + scroll parallax                           */
/* ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 10,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 60vw",
  clip = true,
  revealStart = "top 92%",
  quality = 82,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  priority?: boolean;
  sizes?: string;
  clip?: boolean;
  revealStart?: string;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const imgEl = el.querySelector("img");
      if (!imgEl) return;

      if (reduced()) {
        gsap.set(el, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: revealStart, once: true },
      });

      if (clip) {
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "luxInOut" },
        );
      }
      tl.fromTo(imgEl, { scale: 1.22 }, { scale: 1, duration: 1.6, ease: EASE.out }, clip ? 0.05 : 0);

      if (ready && speed) {
        gsap.fromTo(
          imgEl,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      gsap.set(el, { autoAlpha: 1 });
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <div
      ref={ref}
      className={`invisible relative overflow-hidden ${className}`}
      style={clip ? { clipPath: "inset(100% 0% 0% 0%)" } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover will-change-transform ${imgClassName}`}
        style={{ transform: "scale(1.05)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PillProps = {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
  cursorLabel?: string;
  scrollTarget?: string;
  ariaLabel?: string;
};

export function Pill({
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
  cursorLabel,
  scrollTarget,
  ariaLabel,
}: PillProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 t-eyebrow transition-colors duration-500";
  const styles: Record<string, string> = {
    solid: "bg-ink text-sand-50",
    outline: "border border-ink/25 text-ink hover:border-ink",
    ghost: "border border-sand-50/30 text-sand-50 hover:border-sand-50",
    light: "bg-sand-50 text-ink",
  };
  const fill: Record<string, string> = {
    solid: "bg-clay",
    outline: "bg-ink",
    ghost: "bg-sand-50",
    light: "bg-clay",
  };
  const hoverText: Record<string, string> = {
    solid: "group-hover:text-sand-50",
    outline: "group-hover:text-sand-50",
    ghost: "group-hover:text-ink",
    light: "group-hover:text-sand-50",
  };

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${fill[variant]}`}
      />
      <span className={`relative z-10 flex items-center gap-2.5 ${hoverText[variant]}`}>
        {children}
        <Arrow className="transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </span>
    </>
  );

  const common = {
    className: `${base} ${styles[variant]} ${className}`,
    "data-cursor": "hover",
    "data-cursor-label": cursorLabel,
    "aria-label": ariaLabel,
    onClick: (e: React.MouseEvent) => {
      if (scrollTarget) {
        e.preventDefault();
        scrollToTarget(scrollTarget);
      }
      onClick?.();
    },
  };

  if (href && !scrollTarget) {
    return (
      <Link href={href} {...common}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={scrollTarget ?? href ?? "#"} {...common}>
      {inner}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Infinite marquee                                                   */
/* ------------------------------------------------------------------ */
export function Marquee({
  text,
  className = "",
  speed = 42,
  repeat = 6,
  separator = "·",
}: {
  text: string;
  className?: string;
  speed?: number;
  repeat?: number;
  separator?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = track.current;
    if (!t || reduced()) return;

    const dir = document.documentElement.dir === "rtl" ? 1 : -1;
    const half = t.scrollWidth / 2;
    const tween = gsap.to(t, {
      x: dir * half,
      duration: half / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${((parseFloat(x) % half) + half) % half - half}px`,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, repeat]);

  const items = Array.from({ length: repeat });

  return (
    <div ref={wrap} className={`relative flex overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <div ref={track} className="flex shrink-0 will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="px-[0.35em]">{text}</span>
                <span className="px-[0.35em] text-clay">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
export function Counter({
  to,
  suffix = "",
  className = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ready } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ready) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <span ref={ref} className={`t-num ${className}`}>
      0{suffix}
    </span>
  );
}
