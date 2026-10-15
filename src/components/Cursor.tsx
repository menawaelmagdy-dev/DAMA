"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A calm two-part cursor: a precise dot and a lagging ring that grows
 * over interactive elements and can carry a label ("DRAG").
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || !dot.current || !ring.current) return;

    const d = dot.current;
    const r = ring.current;
    const l = label.current!;

    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power2.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.42, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.42, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([d, r], { autoAlpha: 1, duration: 0.4 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const kind = el?.dataset.cursor;
      const text = el?.dataset.cursorLabel ?? "";

      if (!kind) {
        gsap.to(r, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(22,19,15,0.28)", duration: 0.35 });
        gsap.to(d, { scale: 1, duration: 0.35 });
        gsap.to(l, { autoAlpha: 0, duration: 0.2 });
        return;
      }

      if (kind === "drag" || kind === "label") {
        gsap.to(r, {
          scale: 3.1,
          backgroundColor: "rgba(22,19,15,0.92)",
          borderColor: "rgba(22,19,15,0)",
          duration: 0.45,
        });
        gsap.to(d, { scale: 0, duration: 0.3 });
        if (text) {
          l.textContent = text;
          gsap.to(l, { autoAlpha: 1, duration: 0.3 });
        }
      } else {
        gsap.to(r, { scale: 2.1, backgroundColor: "rgba(168,112,63,0.16)", borderColor: "rgba(168,112,63,0.9)", duration: 0.4 });
        gsap.to(d, { scale: 0.6, duration: 0.3 });
        gsap.to(l, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const onLeaveWindow = () => gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[110] hidden md:block">
      <div ref={ring} className="absolute h-10 w-10 rounded-full border border-ink/30 will-change-transform">
        <span
          ref={label}
          className="t-eyebrow absolute inset-0 flex items-center justify-center text-[6px] leading-none text-sand-50 opacity-0"
        />
      </div>
      <div ref={dot} className="absolute h-1.5 w-1.5 rounded-full bg-ink will-change-transform" />
    </div>
  );
}
