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
  const {
    rootRef,
    index: step,
    paused,
    select,
    togglePause,
  } = useArmedAutoCycle({
    length: SYSTEM_TOUR.length,
    intervalMs: STEP_MS,
    amount: 0.08,
  });

  const current = SYSTEM_TOUR[step]!;

  return (
    <AnimatedSection id="architecture" className="border-t border-border/70">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="System"
          title={"How the pieces\nconnect."}
        />
        <button
          type="button"
          onClick={togglePause}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {paused ? (
            <>
              <Play className="h-4 w-4" /> Resume tour
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          )}
        </button>
      </div>

      <div ref={rootRef} className="mt-12">
        {/* Flow rail */}
        <div className="relative mb-10 overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-center justify-between gap-2 px-1">
            {SYSTEM_TOUR.map((s, i) => {
              const on = i === step;
              const done = i < step;
              return (
                <div key={s.id} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.span
                      animate={{
                        scale: on ? 1.12 : 1,
                        backgroundColor: on || done ? s.accent : "#ffffff",
                        color: on || done ? "#ffffff" : "#5a6170",
                        borderColor: on || done ? s.accent : "#d8dee8",
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm"
                    >
                      {ICONS[s.id]}
                    </motion.span>
                    <span
                      className={cn(
                        "max-w-[88px] text-center text-[11px] font-semibold leading-tight",
                        on ? "text-text" : "text-muted",
                      )}
                    >
                      {s.title.split(" ")[0]}
                    </span>
                  </button>
                  {i < SYSTEM_TOUR.length - 1 ? (
                    <div className="relative mx-1 mb-6 h-[2px] flex-1 overflow-hidden rounded bg-border">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-signal"
                        initial={false}
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                      {on && !reduce ? (
                        <motion.span
                          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{
                            duration: STEP_MS / 1000,
                            ease: "linear",
                            repeat: 0,
                          }}
                          key={`pulse-${step}-${i}`}
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{ backgroundColor: current.accent }}
                >
                  {ICONS[current.id]}
                </span>
                <div>
                  <p className="tech-label !mb-0">{current.subtitle}</p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {current.title}
                  </h3>
                </div>
              </div>
              <p className="text-base leading-relaxed text-muted">
                {current.detail}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-border bg-bg px-3 py-1.5 font-mono text-[12px]"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mini stack table that highlights with the tour */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="border-b border-border bg-[#f8f9fb] px-4 py-3">
              <p className="tech-label !mb-0">Technologies in this step</p>
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
                          style={
                            on ? { backgroundColor: s.accent } : undefined
                          }
                        >
                          {ICONS[s.id]}
                        </span>
                        <div>
                          <div
                            className={cn(
                              "text-sm font-semibold",
                              on ? "text-text" : "text-muted",
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
                          className="h-2 w-2 rounded-full bg-signal"
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* progress */}
            <div className="h-1 bg-border">
              {!paused ? (
                <motion.div
                  key={step}
                  className="h-full bg-signal"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: STEP_MS / 1000,
                    ease: "linear",
                  }}
                />
              ) : (
                <div className="h-full w-full bg-signal/40" />
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
