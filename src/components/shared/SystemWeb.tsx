"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export type WebNode = {
  id: string;
  label: string;
  sub?: string;
  icon?: ReactNode;
  angle: number;
  radius: number;
};

type Props = {
  nodes: WebNode[];
  centerLabel: string;
  centerIcon?: ReactNode;
  links?: [string, string][];
  onSelect?: (id: string | null) => void;
  selectedId?: string | null;
  className?: string;
};

function polar(angle: number, radius: number, cx = 50, cy = 50) {
  const r = (angle * Math.PI) / 180;
  return {
    x: cx + Math.cos(r) * radius * 38,
    y: cy + Math.sin(r) * radius * 38,
  };
}

export function SystemWeb({
  nodes,
  centerLabel,
  centerIcon,
  links,
  onSelect,
  selectedId,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const focus = selectedId ?? hover;

  const positioned = useMemo(
    () => nodes.map((n) => ({ ...n, ...polar(n.angle, n.radius) })),
    [nodes],
  );

  const edges = useMemo(() => {
    if (links?.length) {
      return links
        .map(([a, b]) => {
          const A =
            a === "center"
              ? { id: "center", x: 50, y: 50, label: centerLabel }
              : positioned.find((n) => n.id === a);
          const B =
            b === "center"
              ? { id: "center", x: 50, y: 50, label: centerLabel }
              : positioned.find((n) => n.id === b);
          if (!A || !B) return null;
          return { a: A, b: B, key: `${a}-${b}` };
        })
        .filter(Boolean) as {
        a: { id: string; x: number; y: number };
        b: { id: string; x: number; y: number };
        key: string;
      }[];
    }
    return positioned.map((n) => ({
      a: { id: "center", x: 50, y: 50 },
      b: n,
      key: `c-${n.id}`,
    }));
  }, [links, positioned, centerLabel]);

  const related = useMemo(() => {
    if (!focus) return null;
    const set = new Set<string>([focus]);
    for (const e of edges) {
      if (e.a.id === focus || e.b.id === focus) {
        set.add(e.a.id);
        set.add(e.b.id);
      }
    }
    if (focus !== "center") set.add("center");
    return set;
  }, [focus, edges]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[640px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.14)" />
            <stop offset="65%" stopColor="rgba(37,99,235,0)" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(37,99,235,0.35)" />
            <stop offset="100%" stopColor="rgba(21,24,31,0.12)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="url(#webGlow)" />
        {[14, 26, 38].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(21,24,31,0.07)"
            strokeWidth="0.22"
            strokeDasharray="0.8 1.6"
          />
        ))}

        {edges.map((e, i) => {
          const lit =
            !related || related.has(e.a.id) || related.has(e.b.id);
          const strong =
            related && related.has(e.a.id) && related.has(e.b.id);
          const toCenter = e.a.id === "center" || e.b.id === "center";
          const d = toCenter
            ? `M ${e.a.x} ${e.a.y} L ${e.b.x} ${e.b.y}`
            : `M ${e.a.x} ${e.a.y} Q 50 50 ${e.b.x} ${e.b.y}`;
          return (
            <motion.path
              key={e.key}
              d={d}
              fill="none"
              stroke={
                strong
                  ? "rgba(37,99,235,0.65)"
                  : lit
                    ? "url(#edgeGrad)"
                    : "rgba(21,24,31,0.05)"
              }
              strokeWidth={strong ? 0.55 : 0.32}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.035 * i, duration: 0.65 }}
            />
          );
        })}
      </svg>

      <button
        type="button"
        onClick={() => onSelect?.(null)}
        className="absolute left-1/2 top-1/2 z-10 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#15181f] text-white shadow-[0_12px_40px_-12px_rgba(21,24,31,0.55)] ring-4 ring-white"
      >
        {centerIcon}
        <span className="mt-0.5 max-w-[66px] text-center text-[9px] font-semibold leading-tight tracking-wide">
          {centerLabel}
        </span>
      </button>

      {positioned.map((n) => {
        const dim = related && !related.has(n.id);
        const on = selectedId === n.id;
        return (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect?.(n.id)}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            className={cn(
              "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition duration-200",
              dim && "opacity-25",
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl border bg-white shadow-sm transition",
                on
                  ? "border-signal text-signal ring-4 ring-signal/15"
                  : "border-border text-text hover:border-signal/50 hover:text-signal",
              )}
            >
              {n.icon}
            </span>
            <span className="max-w-[84px] text-center text-[11px] font-semibold leading-tight text-text">
              {n.label}
            </span>
            {n.sub ? (
              <span className="hidden max-w-[90px] text-center text-[9px] leading-tight text-muted sm:block">
                {n.sub}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
