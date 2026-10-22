"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Options = {
  length: number;
  /** ms between steps */
  intervalMs: number;
  /** start only when this element is in view */
  enabled?: boolean;
  /** pause when user interacts */
  paused?: boolean;
  loop?: boolean;
};

/** Auto-advance an index when the section is visible. */
export function useAutoCycle({
  length,
  intervalMs,
  enabled = true,
  paused = false,
  loop = true,
}: Options) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!enabled || paused || !playing || reduce || length <= 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i >= length - 1) return loop ? 0 : i;
        return i + 1;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [enabled, paused, playing, reduce, length, intervalMs, loop]);

  return {
    index,
    setIndex,
    playing,
    setPlaying,
    pause: () => setPlaying(false),
    resume: () => setPlaying(true),
  };
}

/** Reveal code lines one-by-one, then call onComplete. */
export function useLineReveal(
  lineCount: number,
  {
    msPerLine = 90,
    enabled = true,
    onComplete,
  }: {
    msPerLine?: number;
    enabled?: boolean;
    onComplete?: () => void;
  } = {},
) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ? lineCount : 0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    doneRef.current = false;
    if (reduce) {
      setVisible(lineCount);
      return;
    }
    if (!enabled) {
      setVisible(0);
      return;
    }
    setVisible(0);
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setVisible(n);
      if (n >= lineCount) {
        window.clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          window.setTimeout(() => onCompleteRef.current?.(), 700);
        }
      }
    }, msPerLine);
    return () => window.clearInterval(id);
  }, [lineCount, msPerLine, enabled, reduce]);

  return visible;
}

/** True once the element scrolls into view. */
export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}
