"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
};

export function AnimatedSection({ id, children, className, full }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative w-full px-6 md:px-10 lg:px-16",
        full ? "min-h-screen py-20 md:py-24" : "py-24 md:py-32",
        className,
      )}
    >
      {/* Animated section divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <motion.div
          className="h-px w-full max-w-[1360px] origin-left bg-gradient-to-r from-transparent via-signal/40 to-transparent"
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-2xl"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.9 }}
      />

      <motion.div
        className="relative mx-auto w-full max-w-[1360px]"
        initial={reduce ? false : { opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
