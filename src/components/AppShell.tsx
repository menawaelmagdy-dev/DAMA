"use client";

import { AppProvider, useApp } from "./AppContext";
import Preloader from "./Preloader";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CookieBar from "./CookieBar";
import Nav from "./Nav";
import { RequestModalProvider } from "./RequestModal";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { setReady, ready } = useApp();

  return (
    <RequestModalProvider>
      <Preloader onComplete={() => setReady(true)} />
      <SmoothScroll>
        <Nav />
        <main data-ready={ready ? "true" : "false"}>{children}</main>
      </SmoothScroll>
      <Cursor />
      <CookieBar />
    </RequestModalProvider>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ShellInner>{children}</ShellInner>
    </AppProvider>
  );
}
