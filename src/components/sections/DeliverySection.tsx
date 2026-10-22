"use client";

import { motion, useReducedMotion } from "motion/react";
import { GitBranch, SearchCode, FlaskConical, Package, Rocket } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STAGES = [
  {
    title: "Source",
    tools: "Git · GitHub",
    detail: "Flutter app + Functions TypeScript.",
    icon: GitBranch,
  },
  {
    title: "Analyze",
    tools: "flutter analyze · ESLint",
    detail: "Static checks on CI.",
    icon: SearchCode,
  },
  {
    title: "Test",
    tools: "flutter test · npm test",
    detail: "Unit & Functions tests.",
    icon: FlaskConical,
  },
  {
    title: "Build",
    tools: "tsc · Flutter build",
    detail: "Compile client & server.",
    icon: Package,
  },
  {
    title: "Ship",
    tools: "Firebase · TestFlight",
    detail: "Deploy Functions / Hosting; iOS path.",
    icon: Rocket,
  },
] as const;

export function DeliverySection() {
  const reduce = useReducedMotion();

  return (
    <AnimatedSection id="delivery" className="border-t border-border/70">
      <SectionHeading
        eyebrow="Ship"
        title={"From source\nto running app."}
        subtitle="Pipeline stages from the repo’s CI and Firebase setup — labels are architectural, not live badges."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal/10 text-signal">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-[11px] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                {s.tools}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
