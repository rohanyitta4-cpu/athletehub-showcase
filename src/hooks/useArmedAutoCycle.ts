"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Options = {
  length: number;
  intervalMs: number;
  amount?: number;
};

/**
 * Simple index auto-cycle that arms once in view and keeps going
 * even if the observed node dips below the visibility threshold.
 */
export function useArmedAutoCycle({
  length,
  intervalMs,
  amount = 0.12,
}: Options) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount, once: false });

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

  useEffect(() => {
    if (!armed || paused || reduce || length <= 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [armed, paused, reduce, length, intervalMs]);

  return {
    rootRef,
    index,
    setIndex,
    paused,
    setPaused,
    togglePause: () => setPaused((p) => !p),
    select: (i: number) => {
      setIndex(i);
      setPaused(true);
    },
  };
}
