"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useApp } from "@/components/AppContext";
import { Eyebrow, Reveal, RevealGroup, SplitLines } from "@/components/ui";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export default function ContactClient({ unit }: { unit?: string }) {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: unit ? t.contact.form.interestOptions[0] : t.contact.form.interestOptions[4],
    message: unit ? `${t.apartments.unit}: ${unit}` : "",
    consent: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = t.contact.form.errors.name;
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) e.phone = t.contact.form.errors.phone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = t.contact.form.errors.email;
    if (!form.consent) e.consent = t.contact.form.errors.consent;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      gsap.fromTo(".form-field-error", { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)", stagger: 0.03 });
      return;
    }
    setSending(true);

    // Demo submission — wire this to your CRM / email endpoint.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  /* success animation */
  useGSAP(
    () => {
      if (!sent || !successRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.fromTo(".success-card", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9 })
        .fromTo(".success-ring", { strokeDashoffset: 176 }, { strokeDashoffset: 0, duration: 1.1, ease: "luxInOut" }, 0.15)
        .fromTo(".success-tick", { strokeDashoffset: 30 }, { strokeDashoffset: 0, duration: 0.6, ease: "luxInOut" }, 0.85)
        .fromTo(".success-copy", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1);
    },
    { scope: successRef, dependencies: [sent] },
  );

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      gsap.fromTo(
        ".form-row",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.06,
          scrollTrigger: { trigger: ".contact-form", start: "top 85%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  const field =
    "w-full border-b border-ink/20 bg-transparent py-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-mute/60 focus:border-ink";

  return (
    <div ref={root} className="bg-sand-100">
      <header className="u-edge pt-36 pb-12 md:pt-48 md:pb-16">
        <Reveal>
          <Link
            href="/"
            data-cursor="hover"
            className="t-eyebrow mb-8 inline-flex items-center gap-2 text-ink-mute transition-colors hover:text-ink"
          >
            ← {t.apartments.backHome}
          </Link>
        </Reveal>
        <Reveal>
          <Eyebrow className="mb-6 text-ink-mute">{t.brand.project} — {t.brand.city}</Eyebrow>
        </Reveal>
        <SplitLines as="h1" className="t-display mb-7 text-[clamp(2.6rem,8vw,6.5rem)] text-ink" stagger={0.06}>
          {t.contact.title}
        </SplitLines>
        <Reveal delay={0.15}>
          <p className="max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">{t.contact.lead}</p>
        </Reveal>
      </header>

      <div className="u-edge grid grid-cols-1 gap-14 pb-24 md:grid-cols-12 md:gap-16 md:pb-32">
        {/* form */}
        <div className="md:col-span-7">
          {unit && (
            <Reveal className="mb-8">
              <p className="t-eyebrow inline-flex items-center gap-2 rounded-full bg-clay/12 px-4 py-2 text-clay">
                {t.apartments.unit} {unit}
              </p>
            </Reveal>
          )}

          {sent ? (
            <div ref={successRef} className="success-card invisible border border-ink/12 bg-sand-50 p-9 md:p-14">
              <svg viewBox="0 0 64 64" className="mb-8 h-16 w-16" fill="none" aria-hidden>
                <circle
                  className="success-ring"
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#a8703f"
                  strokeWidth="1.5"
                  strokeDasharray="176"
                  strokeDashoffset="176"
                />
                <path
                  className="success-tick"
                  d="M20 33.5 28.5 42 45 24"
                  stroke="#16130f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="30"
                  strokeDashoffset="30"
                />
              </svg>
              <h2 className="success-copy t-display mb-4 text-[clamp(1.8rem,4vw,2.9rem)] text-ink opacity-0">
                {t.contact.form.successTitle}
              </h2>
              <p className="success-copy mb-9 max-w-md text-sm/relaxed text-ink-soft opacity-0 md:text-base/relaxed">
                {t.contact.form.successBody}
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm((p) => ({ ...p, name: "", phone: "", email: "", message: "" }));
                }}
                data-cursor="hover"
                className="success-copy t-eyebrow rounded-full border border-ink/25 px-6 py-3 text-ink opacity-0 transition-colors hover:border-ink hover:bg-ink hover:text-sand-50"
              >
                {t.contact.form.again}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="contact-form flex flex-col gap-7">
              <div className="form-row grid grid-cols-1 gap-7 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="t-eyebrow text-ink-mute">{t.contact.form.name}</span>
                  <input
                    className={field}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="—"
                    autoComplete="name"
                  />
                  {errors.name && <span className="form-field-error t-eyebrow pt-2 text-clay">{errors.name}</span>}
                </label>

                <label className="flex flex-col gap-1">
                  <span className="t-eyebrow text-ink-mute">{t.contact.form.phone}</span>
                  <input
                    className={field}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+20"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="form-field-error t-eyebrow pt-2 text-clay">{errors.phone}</span>}
                </label>
              </div>

              <div className="form-row grid grid-cols-1 gap-7 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="t-eyebrow text-ink-mute">{t.contact.form.email}</span>
                  <input
                    className={field}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="name@email.com"
                    inputMode="email"
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-field-error t-eyebrow pt-2 text-clay">{errors.email}</span>}
                </label>

                <label className="flex flex-col gap-1">
                  <span className="t-eyebrow text-ink-mute">{t.contact.form.interest}</span>
                  <select
                    className={`${field} appearance-none`}
                    value={form.interest}
                    onChange={(e) => set("interest", e.target.value)}
                  >
                    {t.contact.form.interestOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="form-row flex flex-col gap-1">
                <span className="t-eyebrow text-ink-mute">{t.contact.form.message}</span>
                <textarea
                  className={`${field} min-h-28 resize-none`}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </label>

              <label className="form-row flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-black"
                />
                <span className="text-sm/relaxed text-ink-soft">{t.contact.form.consent}</span>
              </label>
              {errors.consent && <span className="form-field-error t-eyebrow -mt-4 text-clay">{errors.consent}</span>}

              <div className="form-row flex items-center gap-6 pt-2">
                <button
                  type="submit"
                  data-cursor="hover"
                  disabled={sending}
                  className="t-eyebrow group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-sand-50 transition-colors hover:bg-clay disabled:opacity-60"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-clay transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="relative z-10">{sending ? t.contact.form.sending : t.contact.form.submit}</span>
                </button>
                <span className="t-eyebrow text-ink-mute">{t.contact.details.hours}</span>
              </div>
            </form>
          )}
        </div>

        {/* details */}
        <aside className="md:col-span-5">
          <RevealGroup selector=":scope > *" className="flex flex-col gap-8" stagger={0.08}>
            <div className="border-t border-ink/12 pt-7">
              <p className="t-eyebrow mb-3 text-ink-mute">{t.contact.details.title}</p>
              <p className="text-sm/relaxed text-ink-soft">{t.footer.officeAddress}</p>
            </div>

            <div className="border-t border-ink/12 pt-7">
              <p className="t-eyebrow mb-3 text-ink-mute">{t.footer.branchTitle}</p>
              <p className="text-sm/relaxed text-ink-soft">{t.footer.branchAddress}</p>
            </div>

            <div className="border-t border-ink/12 pt-7">
              <p className="t-eyebrow mb-3 text-ink-mute">{t.contact.details.call}</p>
              <a
                href={`tel:${t.footer.phone.replace(/\s|\(|\)|-/g, "")}`}
                data-cursor="hover"
                className="t-display block text-[clamp(1.5rem,3vw,2.2rem)] text-ink transition-colors hover:text-clay"
                dir="ltr"
              >
                {t.footer.phone}
              </a>
              <a
                href={`https://wa.me/${t.footer.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="t-eyebrow mt-5 inline-flex text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-clay"
              >
                {t.contact.details.whatsapp}
              </a>
            </div>

            <div className="border-t border-ink/12 pt-7">
              <a
                href="https://maps.google.com/?q=New+Sohag+City,+Sohag,+Egypt"
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="t-eyebrow inline-flex text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-clay"
              >
                {t.contact.details.directions}
              </a>
            </div>
          </RevealGroup>
        </aside>
      </div>
    </div>
  );
}
