"use client";

import { AnimatePresence, motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MermaidDiagram } from "@/components/shared/MermaidDiagram";
import { FIREBASE_DIAGRAMS } from "@/data/firebaseDiagrams";
import { useArmedAutoCycle } from "@/hooks/useArmedAutoCycle";
import { cn } from "@/lib/cn";

export function DataSection() {
  const diagramCycle = useArmedAutoCycle({
    length: FIREBASE_DIAGRAMS.length,
    intervalMs: 8000,
    amount: 0.1,
  });

  const diagram = FIREBASE_DIAGRAMS[diagramCycle.index]!;

  return (
    <AnimatedSection id="data" className="border-t border-border">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Data"
          title={"Where the data\nlives."}
          subtitle="Firestore entity relationships and path hierarchy — from the project's own ER docs."
        />
        <button
          type="button"
          onClick={diagramCycle.togglePause}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {diagramCycle.paused ? (
            <>
              <Play className="h-4 w-4" /> Auto-play
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          )}
        </button>
      </div>

      <div ref={diagramCycle.rootRef} className="mt-12">
        <div className="mb-5 flex flex-wrap gap-2">
          {FIREBASE_DIAGRAMS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => diagramCycle.select(i)}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm font-semibold transition",
                diagramCycle.index === i
                  ? "border-signal/40 bg-signal/10 text-signal"
                  : "border-border bg-white text-muted hover:text-ink",
              )}
            >
              {d.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={diagram.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-4">
              <h3 className="font-display text-xl font-bold tracking-tight">
                {diagram.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{diagram.blurb}</p>
            </div>
            <MermaidDiagram chart={diagram.chart} />
            {!diagramCycle.paused ? (
              <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  key={diagram.id}
                  className="h-full bg-signal"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
