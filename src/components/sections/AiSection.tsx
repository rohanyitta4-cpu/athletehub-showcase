"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

const FLOW = [
  "USER INPUT",
  "MOBILE UI",
  "CLOUD FUNCTION",
  "GEMINI",
  "RESPONSE",
  "MOBILE UI",
] as const;

const MODULES = [
  {
    title: "Scout conversational assistant",
    detail:
      "chatWithScout — analyst chat with player context, Google Search tool, and YouTube link sanitization.",
  },
  {
    title: "Zuno coaching assistant",
    detail:
      "chatWithZuno — coaching-oriented conversations and related client entry flows.",
  },
  {
    title: "Handwritten box-score interpretation",
    detail:
      "Vision path in chatWithZuno — image input processed server-side via Gemini image-capable models.",
  },
] as const;

export function AiSection() {
  const reduce = useReducedMotion();

  return (
    <AnimatedSection id="ai" className="border-t border-border/60">
      <SectionHeading
        eyebrow="AI integrations"
        title={"Model capabilities\nconnected to real workflows."}
        subtitle="Gemini is an external service reached through Cloud Functions — the mobile client does not hold the private API key."
      />

      <div className="mt-14 overflow-x-auto rounded-2xl border border-border bg-bg-elevated p-6">
        <div className="flex min-w-[800px] items-center justify-between gap-2">
          {FLOW.map((label, i) => (
            <div key={label + i} className="flex flex-1 items-center">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-surface px-3 py-3 text-center"
              >
                <div className="font-mono text-[10px] tracking-wider text-signal">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[11px] font-medium leading-tight">
                  {label}
                </div>
              </motion.div>
              {i < FLOW.length - 1 ? (
                <div className="relative mx-1 h-px flex-1 bg-border">
                  {!reduce ? (
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
                      animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2.2,
                        delay: i * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-5 tech-label">
          Illustrative packet motion · not a live Gemini session
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface/40 px-5 py-4">
        <p className="tech-label mb-2">Vision branch</p>
        <p className="font-mono text-xs text-muted sm:text-sm">
          IMAGE INPUT → BACKEND → GEMINI VISION → INTERPRETED RESULT → MOBILE UI
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {MODULES.map((m) => (
          <div
            key={m.title}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <h3 className="text-base font-semibold">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border p-5">
          <p className="tech-label mb-3">Why the backend owns the key</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>API credentials stay in Functions environment / secrets</li>
            <li>Callables enforce authentication before model access</li>
            <li>Server can sanitize outputs (e.g. YouTube URLs)</li>
            <li>Client receives only the response payload it needs</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border p-5">
          <p className="tech-label mb-3">Sample reply (illustrative)</p>
          <div className="rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed text-muted">
            “Your recent K% rose versus your season baseline. Here’s a
            two-strike approach drill to tighten chase rates.”
            <span className="mt-2 block text-[11px] text-dim">
              Example wording only — not a live model output.
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
