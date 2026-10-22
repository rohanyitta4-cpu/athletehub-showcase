"use client";

import { useState, type ReactNode } from "react";
import { IntroSplash } from "@/components/sections/IntroSplash";

export function ShowcaseShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <IntroSplash onDone={() => setReady(true)} />
      <div
        className={
          ready
            ? "opacity-100 transition-opacity duration-700"
            : "opacity-0"
        }
      >
        {children}
      </div>
    </>
  );
}
