"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  chart: string;
  className?: string;
};

/** Shared outer frame — diagrams scroll inside at a readable scale */
export const DIAGRAM_FRAME =
  "h-[560px] w-full sm:h-[620px] lg:h-[680px]";

let mermaidReady: Promise<typeof import("mermaid").default> | null = null;

function loadMermaid() {
  if (!mermaidReady) {
    mermaidReady = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        themeVariables: {
          primaryColor: "#dbeafe",
          primaryTextColor: "#15181f",
          primaryBorderColor: "#2563eb",
          lineColor: "#64748b",
          secondaryColor: "#f8fafc",
          tertiaryColor: "#ffffff",
          background: "#ffffff",
          mainBkg: "#ffffff",
          nodeBorder: "#d8dee8",
          clusterBkg: "#f8f9fb",
          titleColor: "#15181f",
          edgeLabelBackground: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          fontSize: "16px",
        },
        flowchart: {
          curve: "basis",
          padding: 20,
          useMaxWidth: false,
          nodeSpacing: 40,
          rankSpacing: 50,
        },
        er: {
          layoutDirection: "TB",
          useMaxWidth: false,
          entityPadding: 18,
          minEntityWidth: 120,
          minEntityHeight: 60,
          fontSize: 16,
        },
      });
      return m.default;
    });
  }
  return mermaidReady;
}

function prepareSvg(svgEl: SVGSVGElement) {
  // Natural size for readability — frame scrolls if needed
  svgEl.style.display = "block";
  svgEl.style.maxWidth = "none";
  svgEl.style.height = "auto";

  const vb = svgEl.getAttribute("viewBox");
  if (vb) {
    const parts = vb.split(/[\s,]+/).map(Number);
    const w = parts[2] ?? 0;
    // Scale so entity text is readable (~1.15–1.35× natural)
    const targetWidth = Math.max(w * 1.25, 920);
    svgEl.setAttribute("width", String(targetWidth));
    svgEl.removeAttribute("height");
  } else {
    svgEl.style.width = "min(1100px, 160%)";
  }
}

export function MermaidDiagram({ chart, className }: Props) {
  const reactId = useId().replace(/:/g, "");
  const hostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError(null);

    (async () => {
      try {
        const mermaid = await loadMermaid();
        const id = `mmd-${reactId}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg } = await mermaid.render(id, chart);
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = svg;
        const svgEl = hostRef.current.querySelector("svg");
        if (svgEl) prepareSvg(svgEl);
        setBusy(false);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
          setBusy(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  return (
    <div
      className={cn(
        "relative overflow-auto rounded-2xl border border-border bg-white p-4 md:p-6 scrollbar-thin",
        DIAGRAM_FRAME,
        className,
      )}
    >
      {busy ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-muted">
          Drawing diagram…
        </div>
      ) : null}
      {error ? (
        <p className="p-6 text-center text-sm text-red-600">{error}</p>
      ) : null}
      <div
        ref={hostRef}
        className={cn(
          "flex min-h-full min-w-full items-start justify-center",
          busy && "opacity-0",
        )}
      />
    </div>
  );
}
