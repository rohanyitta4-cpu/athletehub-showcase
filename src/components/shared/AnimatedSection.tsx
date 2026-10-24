"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
  ink?: boolean;
};

export function AnimatedSection({
  id,
  children,
  className,
  full,
  ink,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative w-full px-5 md:px-8 lg:px-10",
        full ? "min-h-screen py-24 md:py-28" : "py-24 md:py-32",
        ink ? "mesh-ink text-white" : "",
        className,
      )}
    >
      <motion.div
        className="relative mx-auto w-full max-w-[1200px]"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
