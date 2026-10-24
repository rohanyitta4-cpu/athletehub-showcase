"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Smartphone,
  ShieldCheck,
  Database,
  Server,
  Sparkles,
  HardDrive,
  Pause,
  Play,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SYSTEM_TOUR } from "@/data/systemTour";
import { useArmedAutoCycle } from "@/hooks/useArmedAutoCycle";
import { cn } from "@/lib/cn";

const ICONS: Record<string, ReactNode> = {
  flutter: <Smartphone className="h-5 w-5" strokeWidth={1.75} />,
  auth: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  firestore: <Database className="h-5 w-5" strokeWidth={1.75} />,
  functions: <Server className="h-5 w-5" strokeWidth={1.75} />,
  gemini: <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
  storage: <HardDrive className="h-5 w-5" strokeWidth={1.75} />,
};

const STEP_MS = 6000;

export function SystemTourSection() {
  const reduce = useReducedMotion();
  const { rootRef, index: step, paused, select, togglePause } =
    useArmedAutoCycle({
      length: SYSTEM_TOUR.length,
      intervalMs: STEP_MS,
      amount: 0.08,
    });

  const current = SYSTEM_TOUR[step]!;

  return (
    <AnimatedSection id="architecture" className="border-t border-border">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="System"
          title={"How the stack\nfits together."}
          subtitle="An auto-playing tour of the client, identity, data, backend, and Scout AI layers."
        />
        <button
          type="button"
          onClick={togglePause}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {paused ? (
            <>
              <Play className="h-4 w-4" /> Resume
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          )}
        </button>
      </div>

      <div ref={rootRef} className="mt-14">
        <div className="relative mb-12 overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-center justify-between gap-2 px-1">
            {SYSTEM_TOUR.map((s, i) => {
              const on = i === step;
              const done = i < step;
              return (
                <div key={s.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className="flex flex-col items-center gap-2.5"
                  >
                    <motion.span
                      animate={{
                        scale: on ? 1.08 : 1,
                        backgroundColor: on || done ? s.accent : "#ffffff",
                        color: on || done ? "#ffffff" : "#5c6472",
                        borderColor: on || done ? s.accent : "rgba(12,14,20,0.1)",
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm"
                    >
                      {ICONS[s.id]}
                    </motion.span>
                    <span
                      className={cn(
                        "max-w-[90px] text-center text-[11px] font-semibold leading-tight",
                        on ? "text-ink" : "text-muted",
                      )}
                    >
                      {s.title.split(" ")[0]}
                    </span>
                  </button>
                  {i < SYSTEM_TOUR.length - 1 ? (
                    <div className="relative mx-1 mb-7 h-px flex-1 overflow-hidden bg-border">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-signal"
                        initial={false}
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.45 }}
                      />
                      {on && !reduce ? (
                        <motion.span
                          key={`pulse-${step}-${i}`}
                          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{
                            duration: STEP_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-border bg-white p-7 shadow-sm md:p-9"
            >
              <div className="mb-5 flex items-center gap-3.5">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: current.accent }}
                >
                  {ICONS[current.id]}
                </span>
                <div>
                  <p className="tech-label !mb-0">{current.subtitle}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {current.title}
                  </h3>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-muted md:text-base">
                {current.detail}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-[12px] text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="border-b border-border bg-bg-elevated/70 px-4 py-3">
              <p className="tech-label !mb-0">Layers</p>
            </div>
            <ul className="divide-y divide-border">
              {SYSTEM_TOUR.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition",
                        on ? "bg-signal/8" : "hover:bg-bg",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border",
                            on
                              ? "border-transparent text-white"
                              : "border-border text-muted",
                          )}
                          style={on ? { backgroundColor: s.accent } : undefined}
                        >
                          {ICONS[s.id]}
                        </span>
                        <div>
                          <div
                            className={cn(
                              "text-sm font-semibold",
                              on ? "text-ink" : "text-muted",
                            )}
                          >
                            {s.title}
                          </div>
                          <div className="text-[11px] text-dim">{s.subtitle}</div>
                        </div>
                      </div>
                      {on ? (
                        <motion.span
                          layoutId="tour-dot"
                          className="h-1.5 w-1.5 rounded-full bg-signal"
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="h-1 bg-border">
              {!paused ? (
                <motion.div
                  key={step}
                  className="h-full bg-signal"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              ) : (
                <div className="h-full w-full bg-signal/35" />
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
