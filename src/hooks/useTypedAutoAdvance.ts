"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

function sleep(ms: number, signal: { cancelled: boolean }) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      if (!signal.cancelled) resolve();
      else resolve();
    }, ms);
    // Allow cancel to wake early via polling short sleeps for long holds
    if (ms > 200) {
      const poll = window.setInterval(() => {
        if (signal.cancelled) {
          window.clearTimeout(id);
          window.clearInterval(poll);
          resolve();
        }
      }, 50);
      window.setTimeout(() => window.clearInterval(poll), ms + 20);
    }
  });
}

type Options = {
  /** lines per item (stage / file / domain) */
  lineCounts: number[];
  msPerLine?: number;
  holdMs?: number;
  amount?: number;
};

/**
 * Line-by-line reveal that auto-advances items.
 * Armed once the section enters view (won't stall when you scroll within it).
 * Pause/resume continues from the current line.
 */
export function useTypedAutoAdvance({
  lineCounts,
  msPerLine = 130,
  holdMs = 1500,
  amount = 0.08,
}: Options) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount, once: false });

  const itemCount = lineCounts.length;
  const [itemIndex, setItemIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [paused, setPaused] = useState(false);
  const [armed, setArmed] = useState(false);

  const lineRef = useRef(0);
  const lineCount = lineCounts[itemIndex] ?? 0;

  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

  // Reset when item changes
  useEffect(() => {
    lineRef.current = 0;
    setVisibleLines(reduce ? lineCount : 0);
  }, [itemIndex, lineCount, reduce]);

  useEffect(() => {
    if (!armed || paused || reduce || itemCount <= 0 || lineCount <= 0) {
      if (reduce) setVisibleLines(lineCount);
      return;
    }

    const signal = { cancelled: false };

    const run = async () => {
      let line = lineRef.current;

      while (!signal.cancelled) {
        if (line < lineCount) {
          line += 1;
          lineRef.current = line;
          setVisibleLines(line);
          await sleep(msPerLine, signal);
          continue;
        }

        await sleep(holdMs, signal);
        if (signal.cancelled) return;

        lineRef.current = 0;
        setItemIndex((i) => (i + 1) % itemCount);
        return;
      }
    };

    void run();
    return () => {
      signal.cancelled = true;
    };
  }, [
    armed,
    paused,
    reduce,
    itemIndex,
    itemCount,
    lineCount,
    msPerLine,
    holdMs,
  ]);

  return {
    rootRef,
    itemIndex,
    visibleLines,
    paused,
    selectItem: (index: number) => {
      lineRef.current = 0;
      setItemIndex(index);
      setPaused(true);
    },
    togglePause: () => setPaused((p) => !p),
  };
}
