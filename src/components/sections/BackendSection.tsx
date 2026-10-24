"use client";

import { Pause, Play } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CodeBlock, countLines } from "@/components/shared/CodeBlock";
import { FN_MODULES } from "@/data/functions";
import { useTypedAutoAdvance } from "@/hooks/useTypedAutoAdvance";
import { cn } from "@/lib/cn";

const LINE_COUNTS = FN_MODULES.map((f) => countLines(f.snippet));

export function BackendSection() {
  const {
    rootRef,
    itemIndex: fileIdx,
    visibleLines,
    paused,
    selectItem,
    togglePause,
  } = useTypedAutoAdvance({
    lineCounts: LINE_COUNTS,
    msPerLine: 120,
    holdMs: 1600,
  });

  const fn = FN_MODULES[fileIdx]!;
  const totalLines = LINE_COUNTS[fileIdx]!;

  return (
    <AnimatedSection id="code" className="border-t border-border">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Code"
          title={"Straight from\nthe repo."}
          subtitle="Live snippets from Flutter and Cloud Functions — typed out line by line."
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

      <div
        ref={rootRef}
        className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
      >
        <div className="grid lg:grid-cols-[260px_1fr]">
          <div className="border-b border-border bg-bg-elevated/50 lg:border-b-0 lg:border-r">
            <p className="tech-label px-4 py-3.5">Files</p>
            <div className="max-h-[520px] overflow-y-auto scrollbar-thin pb-3">
              {FN_MODULES.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => selectItem(i)}
                  className={cn(
                    "block w-full border-l-2 px-4 py-2.5 text-left transition",
                    fileIdx === i
                      ? "border-signal bg-signal/8 text-ink"
                      : "border-transparent text-muted hover:bg-bg hover:text-ink",
                  )}
                >
                  <span className="block font-mono text-[12px] font-medium">
                    {f.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-dim">
                    {f.file}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {fn.name}
                </h3>
                <span className="font-mono text-[11px] text-dim">
                  {Math.min(visibleLines, totalLines)}/{totalLines}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {fn.purpose}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {fn.relates.map((r) => (
                  <span
                    key={r}
                    className="rounded-md border border-border bg-bg px-2 py-0.5 text-[11px] text-muted"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <CodeBlock
              key={fn.id}
              code={fn.snippet}
              filename={fn.file}
              language={fn.language}
              highlightLines={fn.highlightLines}
              visibleLines={visibleLines}
              maxHeight="400px"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
