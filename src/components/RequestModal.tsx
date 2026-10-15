"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { copy } from "@/lib/content";
import { useApp } from "./AppContext";

type RequestCtx = { open: (apartment?: string) => void; close: () => void; isOpen: boolean };
const Ctx = createContext<RequestCtx | null>(null);

export function useRequestModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRequestModal must be used inside <RequestModalProvider>");
  return ctx;
}

export function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const { ready } = useApp();
  const t = copy.request;
  const [isOpen, setIsOpen] = useState(false);
  const [apartment, setApartment] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email" | "consent", string>>>({});
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", consent: false });

  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const open = useCallback((apt?: string) => {
    setApartment(apt);
    setSent(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 1 });

      const t1 = gsap.timeline({ paused: true, defaults: { ease: EASE.out } });
      t1.set(el, { pointerEvents: "auto" })
        .fromTo(".req-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
        .fromTo(
          ".req-card",
          { yPercent: 8, autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { yPercent: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "luxInOut" },
          "-=0.3",
        )
        .fromTo(".req-row", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.5");

      t1.reverse(0).pause();
      tl.current = t1;
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current.timeScale(1).play();
    } else {
      document.body.style.overflow = "";
      tl.current.timeScale(1.6).reverse();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (form.name.trim().length < 2) err.name = t.errors.name;
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) err.phone = t.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) err.email = t.errors.email;
    if (!form.consent) err.consent = t.errors.consent;
    setErrors(err);
    if (Object.keys(err).length) {
      gsap.fromTo(".req-error", { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)", stagger: 0.03 });
      return;
    }
    setSending(true);
    // Demo submission — wire to your CRM / endpoint.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  useGSAP(
    () => {
      if (!sent || !root.current) return;
      gsap
        .timeline({ defaults: { ease: EASE.out } })
        .fromTo(".req-success-ring", { strokeDashoffset: 176 }, { strokeDashoffset: 0, duration: 1, ease: "luxInOut" })
        .fromTo(".req-success-tick", { strokeDashoffset: 30 }, { strokeDashoffset: 0, duration: 0.6 }, 0.7)
        .fromTo(".req-success-copy", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.85);
    },
    { scope: root, dependencies: [sent] },
  );

  const field =
    "w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-mute/60 focus:border-ink";

  return (
    <Ctx.Provider value={value}>
      {children}

      <div ref={root} className="fixed inset-0 z-[115] invisible" style={{ visibility: "hidden" }} aria-hidden={!isOpen}>
        <div className="req-backdrop absolute inset-0 bg-ink/55 backdrop-blur-[3px]" onClick={close} />

        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            className="req-card relative max-h-[92svh] w-full max-w-xl overflow-y-auto bg-paper p-7 md:p-11"
          >
            <button
              onClick={close}
              data-cursor="hover"
              className="t-eyebrow absolute end-5 top-5 text-ink-mute transition-colors hover:text-ink"
            >
              ✕ {t.close}
            </button>

            {sent ? (
              <div className="py-6">
                <svg viewBox="0 0 64 64" className="mb-7 h-14 w-14" fill="none" aria-hidden>
                  <circle className="req-success-ring" cx="32" cy="32" r="28" stroke="#b08968" strokeWidth="1.5" strokeDasharray="176" strokeDashoffset="176" />
                  <path className="req-success-tick" d="M20 33.5 28.5 42 45 24" stroke="#14130f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="30" />
                </svg>
                <h2 className="req-success-copy t-display mb-3 text-3xl text-ink">{t.successTitle}</h2>
                <p className="req-success-copy mb-8 text-sm/relaxed text-ink-soft">{t.successBody}</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", phone: "", email: "", message: "", consent: false });
                  }}
                  data-cursor="hover"
                  className="req-success-copy t-eyebrow rounded-full border border-ink/25 px-6 py-3 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {t.again}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="t-eyebrow mb-4 text-accent">{apartment ? `${copy.unit.titlePrefix} ${apartment}` : copy.nav.bookCall}</p>
                <h2 className="req-row t-display mb-3 text-[clamp(1.8rem,4vw,2.6rem)] text-ink">{t.title}</h2>
                <p className="req-row mb-8 max-w-md text-sm/relaxed text-ink-soft">{t.lead}</p>

                <div className="flex flex-col gap-6">
                  <label className="req-row flex flex-col gap-1">
                    <span className="t-eyebrow text-ink-mute">{t.name}</span>
                    <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                    {errors.name && <span className="req-error t-eyebrow pt-2 text-accent">{errors.name}</span>}
                  </label>

                  <div className="req-row grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-1">
                      <span className="t-eyebrow text-ink-mute">{t.phone}</span>
                      <input className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="+34" />
                      {errors.phone && <span className="req-error t-eyebrow pt-2 text-accent">{errors.phone}</span>}
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="t-eyebrow text-ink-mute">{t.email}</span>
                      <input className={field} value={form.email} onChange={(e) => set("email", e.target.value)} inputMode="email" autoComplete="email" placeholder="name@email.com" />
                      {errors.email && <span className="req-error t-eyebrow pt-2 text-accent">{errors.email}</span>}
                    </label>
                  </div>

                  <label className="req-row flex flex-col gap-1">
                    <span className="t-eyebrow text-ink-mute">{t.message}</span>
                    <textarea
                      className={`${field} min-h-24 resize-none`}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder={copy.architecture.closing}
                    />
                  </label>

                  <label className="req-row flex cursor-pointer items-start gap-3">
                    <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-black" />
                    <span className="text-sm/relaxed text-ink-soft">{t.consent}</span>
                  </label>
                  {errors.consent && <span className="req-error t-eyebrow -mt-3 text-accent">{errors.consent}</span>}

                  <div className="req-row flex items-center gap-5">
                    <button
                      type="submit"
                      disabled={sending}
                      data-cursor="hover"
                      className="t-eyebrow group relative overflow-hidden rounded-full bg-ink px-8 py-4 text-paper transition-colors hover:bg-accent disabled:opacity-60"
                    >
                      <span className="relative z-10">{sending ? t.sending : t.submit}</span>
                    </button>
                    <a href={`mailto:${copy.contact.subtitle ? "info@era-residence.com" : ""}`} className="t-eyebrow text-ink-mute underline decoration-ink/20 underline-offset-4">
                      info@era-residence.com
                    </a>
                  </div>
                </div>
              </form>
            )}

            {!ready && null}
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}
