"use client";

import { AppProvider, useApp } from "./AppContext";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CookieBar from "./CookieBar";
import Nav from "./Nav";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { setReady, ready, lang } = useApp();

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <SmoothScroll>
        <Nav />
        {/* remounting on language change keeps every split-text animation in sync */}
        <main key={lang} data-ready={ready ? "true" : "false"}>
          {children}
        </main>
      </SmoothScroll>
      <Cursor />
      <CookieBar />
    </>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ShellInner>{children}</ShellInner>
    </AppProvider>
  );
}
