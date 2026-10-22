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
    const toExit = window.setTimeout(() => setPhase("exit"), 2600);
    const toGone = window.setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, 3400);
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0c0e14]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* soft radial wash */}
          <motion.div
            className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-signal/25 blur-[100px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.15 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              <motion.div
                className="absolute -inset-4 rounded-[2rem] bg-signal/30 blur-xl"
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <Image
                src="/branding/logo.jpeg"
                alt="AthleteHub"
                width={96}
                height={96}
                priority
                className="relative rounded-3xl object-cover shadow-2xl ring-2 ring-white/20"
              />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {SITE.product}
              </motion.h1>
            </div>

            <motion.p
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              Engineering showcase
            </motion.p>

            <motion.div
              className="mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            />

            <motion.p
              className="mt-6 max-w-sm text-sm text-white/55"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.55 }}
            >
              Real code. Real architecture. Built by {SITE.designer}.
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
