"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ClipboardList,
  UsersRound,
  CircleDot,
  Goal,
  Trophy,
  Target,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/cn";

type Phase = {
  id: string;
  step: string;
  horizon: string;
  title: string;
  summary: string;
  points: string[];
  icon: typeof UsersRound;
  accent: string;
};

const PHASES: Phase[] = [
  {
    id: "coach",
    step: "01",
    horizon: "Near term",
    title: "Full coach-side AthleteHub",
    summary:
      "Take the existing coach scaffolding — live game flow, roster tools, and team views — and ship a complete coach product that sits beside the player app.",
    points: [
      "Live game logging for an entire roster, not just one athlete",
      "Team dashboards, season reports, and shareable summaries for staff",
      "Coach ↔ player accounts so insights and lineups stay in sync",
      "Permissions that keep athlete data private while coaches get what they need",
    ],
    icon: UsersRound,
    accent: "#1d4ed8",
  },
  {
    id: "diamond",
    step: "02",
    horizon: "Core sports depth",
    title: "Baseball & softball, fully detailed",
    summary:
      "Deepen the diamond sports AthleteHub already serves — richer hitting and pitching models, softball-specific flows, and Scout context that matches how each game is actually played.",
    points: [
      "More complete hitting & pitching taxonomies (situational splits, advanced rates)",
      "Softball as a first-class path — not a thin baseball clone",
      "Coach + player workflows tuned for practices, tournaments, and long seasons",
      "Scout reports that speak diamond language: approach, contact quality, command",
    ],
    icon: CircleDot,
    accent: "#0f766e",
  },
  {
    id: "expand",
    step: "03",
    horizon: "Multi-sport",
    title: "Expand to basketball & football",
    summary:
      "Reuse the AthleteHub spine — seasons, game logs, skill profiles, and Scout — with sport-specific stat models and UI so new sports feel native, not bolted on.",
    points: [
      "Basketball: box-score entry, efficiency rates, and position-aware Scout context",
      "Football: position groups, counting stats, and season arcs for skill players",
      "Shared architecture: same auth, Firestore layout patterns, and AI pipeline",
      "Room for more sports later without rewriting the product from scratch",
    ],
    icon: Trophy,
    accent: "#c2410c",
  },
];

const SPORT_CHIPS = [
  { label: "Baseball", icon: Target, tone: "Now" },
  { label: "Softball", icon: CircleDot, tone: "Deepen" },
  { label: "Basketball", icon: Trophy, tone: "Next" },
  { label: "Football", icon: Goal, tone: "Next" },
];

export function FuturePlansSection() {
  const reduce = useReducedMotion();

  return (
    <AnimatedSection id="roadmap" className="border-t border-border">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Roadmap"
          title={"Where AthleteHub\ngoes next."}
          subtitle="A clear build order: finish the coach product, make diamond sports as deep as they can be, then carry the same performance system into new sports."
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="flex flex-wrap gap-2"
        >
          {SPORT_CHIPS.map((s) => {
            const Icon = s.icon;
            return (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-signal" strokeWidth={1.75} />
                {s.label}
                <span className="font-mono text-[10px] tracking-wider text-dim uppercase">
                  {s.tone}
                </span>
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative mt-14 space-y-5">
        <div className="pointer-events-none absolute top-0 bottom-0 left-[19px] hidden w-px bg-gradient-to-b from-signal/50 via-border to-transparent md:block" />

        {PHASES.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <motion.article
              key={phase.id}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                delay: reduce ? 0 : i * 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative grid gap-4 md:grid-cols-[40px_1fr] md:gap-6"
            >
              <div className="relative z-10 hidden md:flex md:justify-center">
                <span
                  className="mt-7 flex h-10 w-10 items-center justify-center rounded-xl border border-white text-white shadow-sm"
                  style={{ backgroundColor: phase.accent }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-signal/25 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-3 border-b border-border bg-bg-elevated/60 px-5 py-3.5 md:px-7">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                    Phase {phase.step}
                  </span>
                  <span className="rounded-md border border-border bg-white px-2 py-0.5 text-[11px] font-semibold text-muted">
                    {phase.horizon}
                  </span>
                  <span
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white md:hidden"
                    style={{ backgroundColor: phase.accent }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {phase.summary}
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {phase.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-sm leading-snug text-ink"
                      >
                        <ClipboardList
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal"
                          strokeWidth={1.75}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={cn(
          "mt-10 max-w-2xl text-sm leading-relaxed text-muted",
        )}
      >
        The engineering bet stays the same across every phase: one Flutter client
        family, one Firebase spine, and Scout as the analysis layer — with sport
        packs and coach tools plugging into that core instead of forking the app.
      </motion.p>
    </AnimatedSection>
  );
}
