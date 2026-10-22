"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PhoneMockup } from "@/components/shared/PhoneMockup";

const RING = [
  { label: "Flutter client", angle: -90 },
  { label: "Firebase", angle: -18 },
  { label: "Cloud Functions", angle: 54 },
  { label: "Gemini", angle: 126 },
  { label: "CI / Release", angle: 198 },
] as const;

export function ProductSection() {
  const reduce = useReducedMotion();

  return (
    <AnimatedSection id="product" className="border-t border-border/60">
      <SectionHeading
        eyebrow="The complete product"
        title="One connected product"
        subtitle="Frontend, cloud infrastructure, backend services, AI integrations, and delivery — converging on a single athlete experience."
        align="center"
      />

      <div className="relative mx-auto mt-16 flex min-h-[520px] max-w-4xl items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 mx-auto h-full w-full max-w-[640px]"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.3"
          />
          {RING.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = 50 + Math.cos(rad) * 32;
            const y = 50 + Math.sin(rad) * 32;
            return (
              <g key={n.label}>
                <motion.line
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="rgba(79,140,255,0.45)"
                  strokeWidth="0.35"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.8 }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#fff"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                />
                <text
                  x={x}
                  y={y + (y < 50 ? -4 : 6)}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="2.4"
                  fontFamily="ui-monospace, monospace"
                >
                  {n.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="relative z-10 scale-90 sm:scale-100">
          <PhoneMockup src="/screenshots/dashboard.png" alt="AthleteHub dashboard" />
        </div>
      </div>

      <div className="mx-auto mt-8 flex justify-center">
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2">
          <Image
            src="/branding/logo.jpeg"
            alt="AthleteHub"
            width={28}
            height={28}
            className="rounded-md object-cover"
          />
          <span className="text-sm font-semibold tracking-wide">ATHLETEHUB</span>
        </div>
      </div>
    </AnimatedSection>
  );
}
