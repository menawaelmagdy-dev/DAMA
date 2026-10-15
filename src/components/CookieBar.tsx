"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./AppContext";

export default function CookieBar() {
  const { t, ready } = useApp();
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (window.localStorage.getItem("dama-cookies")) return;
    const call = gsap.delayedCall(1.3, () => setOpen(true));
    return () => {
      call.kill();
    };
  }, [ready]);

  useEffect(() => {
    if (!open || !bar.current) return;
    gsap.fromTo(
      bar.current,
      { yPercent: 130, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1, ease: "lux" },
    );
  }, [open]);

  const close = (value: "accepted" | "declined") => {
    window.localStorage.setItem("dama-cookies", value);
    if (!bar.current) return setOpen(false);
    gsap.to(bar.current, {
      yPercent: 130,
      autoAlpha: 0,
      duration: 0.7,
      ease: "luxInOut",
      onComplete: () => setOpen(false),
    });
  };

  if (!open) return null;

  return (
    <div
      ref={bar}
      role="dialog"
      aria-label={t.cookies.title}
      className="fixed bottom-4 start-4 end-4 z-[105] mx-auto max-w-md border border-ink/10 bg-sand-50/95 p-6 backdrop-blur-md md:start-6 md:end-auto md:bottom-6"
    >
      <p className="t-eyebrow mb-3 text-ink-mute">{t.cookies.title}</p>
      <p className="mb-5 text-sm/relaxed text-ink-soft">{t.cookies.body}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => close("accepted")}
          data-cursor="hover"
          className="t-eyebrow rounded-full bg-ink px-5 py-2.5 text-sand-50 transition-colors hover:bg-clay"
        >
          {t.cookies.accept}
        </button>
        <button
          onClick={() => close("declined")}
          data-cursor="hover"
          className="t-eyebrow px-2 py-2.5 text-ink-mute underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
        >
          {t.cookies.decline}
        </button>
      </div>
    </div>
  );
}
