"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { content, type Dict, type Lang } from "@/lib/content";

type AppValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Dict;
  dir: "ltr" | "rtl";
  ready: boolean;
  setReady: (v: boolean) => void;
};

const AppCtx = createContext<AppValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  // Hydrate the language from the visitor's last choice.
  useEffect(() => {
    const stored = window.localStorage.getItem("dama-lang") as Lang | null;
    if (stored && stored !== lang) setLangState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("is-ar", lang === "ar");
    window.localStorage.setItem("dama-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((p) => (p === "en" ? "ar" : "en")), []);

  const value = useMemo<AppValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: content[lang] as unknown as Dict,
      dir: lang === "ar" ? "rtl" : "ltr",
      ready,
      setReady,
    }),
    [lang, setLang, toggleLang, ready],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
