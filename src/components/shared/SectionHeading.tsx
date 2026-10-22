"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}
    >
      <p className="tech-label mb-4">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.05] text-text whitespace-pre-line">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
