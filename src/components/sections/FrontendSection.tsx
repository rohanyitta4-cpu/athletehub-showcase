"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { cn } from "@/lib/cn";

type Shot = {
  id: string;
  label: string;
  src: string;
  note: string;
  video?: boolean;
  dwellMs?: number;
};

/** 1 Home → 2 Share → … → 5 Scout → rest. */
const SHOTS: Shot[] = [
  {
    id: "dashboard",
    label: "1 · Home",
    src: "/screenshots/dashboard.png",
    note: "Open AthleteHub — Scout score, recent games, and your season at a glance.",
    dwellMs: 4500,
  },
  {
    id: "sharecard",
    label: "2 · Share",
    src: "/screenshots/sharecard.png",
    note: "Export-ready cards for teammates, coaches, and highlight reels.",
    dwellMs: 4200,
  },
  {
    id: "entry-scr",
    label: "3 · Log a game",
    src: "/screenshots/data-entry-scr.mp4",
    note: "Screen recording — flashcard / form flow to enter game stats.",
    video: true,
  },
  {
    id: "history",
    label: "4 · History",
    src: "/screenshots/historyscreen.png",
    note: "Every logged game lands in history, backed by Firestore.",
    dwellMs: 4200,
  },
  {
    id: "scout-scr",
    label: "5 · Scout",
    src: "/screenshots/scout-scr.mp4",
    note: "Screen recording — ask Scout for a report on your performance.",
    video: true,
  },
  {
    id: "bottomdash",
    label: "6 · Navigate",
    src: "/screenshots/bottomdash.png",
    note: "Jump into logging, stats, history, or Scout from the dashboard.",
    dwellMs: 4000,
  },
  {
    id: "topstats",
    label: "7 · Season stats",
    src: "/screenshots/topstats.png",
    note: "Season totals — the numbers Scout later uses for coaching tips.",
    dwellMs: 4500,
  },
  {
    id: "radar",
    label: "8 · Radar",
    src: "/screenshots/radar.png",
    note: "Hitting radar — strengths and gaps in one view.",
    dwellMs: 4200,
  },
];

const IMAGE_FALLBACK_MS = 4500;

export function FrontendSection() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.12, once: false });

  const [shot, setShot] = useState(0);
  const [paused, setPaused] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

  const current = SHOTS[shot]!;

  useEffect(() => {
    if (!armed || paused || reduce || current.video) return;
    const ms = current.dwellMs ?? IMAGE_FALLBACK_MS;
    const id = window.setTimeout(() => {
      setShot((i) => (i + 1) % SHOTS.length);
    }, ms);
    return () => window.clearTimeout(id);
  }, [armed, paused, reduce, shot, current.video, current.dwellMs]);

  const advance = () => setShot((i) => (i + 1) % SHOTS.length);

  return (
    <AnimatedSection id="frontend" className="border-t border-border/70">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="App"
          title={"The Flutter\nexperience."}
        />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {paused ? (
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

      <div
        ref={rootRef}
        className="mt-12 grid items-center gap-10 lg:grid-cols-[240px_1fr]"
      >
        <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
          {SHOTS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setShot(i);
                setPaused(true);
              }}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left transition",
                shot === i
                  ? "border-signal/40 bg-signal/5 shadow-sm"
                  : "border-border bg-white hover:border-border-strong",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{s.label}</div>
                {s.video ? (
                  <span className="tech-label text-[10px] text-signal">REC</span>
                ) : null}
              </div>
              {shot === i && !paused && !s.video ? (
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    key={s.id}
                    className="h-full bg-signal"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: (s.dwellMs ?? IMAGE_FALLBACK_MS) / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : null}
              {shot === i && s.video && !paused ? (
                <p className="mt-1.5 text-[11px] text-muted">
                  Playing recording…
                </p>
              ) : null}
            </button>
          ))}
        </div>

        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <PhoneMockup
                src={current.src}
                alt={current.label}
                video={current.video}
                paused={paused || !armed}
                loop={false}
                onVideoEnded={() => {
                  if (!paused && !reduce) advance();
                }}
                placeholderLabel="Screenshot"
              />
            </motion.div>
          </AnimatePresence>
          <p className="mx-auto mt-8 max-w-md text-center text-sm text-muted">
            {current.note}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
