"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { copy, type Copy } from "@/lib/content";

type AppValue = {
  t: Copy;
  ready: boolean;
  setReady: (v: boolean) => void;
};

const AppCtx = createContext<AppValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo<AppValue>(() => ({ t: copy, ready, setReady }), [ready]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
