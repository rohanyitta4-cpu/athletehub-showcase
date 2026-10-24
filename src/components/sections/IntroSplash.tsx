"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SITE } from "@/data/content";

type Props = {
  onDone?: () => void;
};

export function IntroSplash({ onDone }: Props) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"play" | "exit" | "gone">(
    reduce ? "gone" : "play",
  );

  useEffect(() => {
    if (reduce) {
      onDone?.();
      return;
    }
    const toExit = window.setTimeout(() => setPhase("exit"), 2400);
    const toGone = window.setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, 3100);
    return () => {
      window.clearTimeout(toExit);
      window.clearTimeout(toGone);
    };
  }, [reduce, onDone]);

  return (
    <AnimatePresence>
      {phase !== "gone" ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden mesh-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-signal/30 blur-[120px]"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.9, scale: 1.1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <Image
                src="/branding/logo.jpeg"
                alt=""
                width={72}
                height={72}
                className="rounded-2xl object-cover shadow-2xl ring-1 ring-white/15"
                priority
              />
            </motion.div>

            <motion.h1
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {SITE.product}
            </motion.h1>

            <motion.p
              className="mt-3 text-sm tracking-[0.2em] text-white/45 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              Engineering showcase
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
