"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/data/content";

const LETTERS = SITE.product.split("");

export function ClosingSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 py-32 mesh-ink">
      <div className="pointer-events-none absolute inset-0 grid-fine opacity-40" />
      <motion.div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-signal/25 blur-[110px]"
        initial={reduce ? false : { opacity: 0, scale: 0.55 }}
        whileInView={{ opacity: 1, scale: 1.05 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 inline-block"
        >
          <motion.div
            className="absolute -inset-6 rounded-[2rem] bg-signal/35 blur-2xl"
            animate={
              reduce
                ? undefined
                : { opacity: [0.35, 0.7, 0.35], scale: [0.94, 1.06, 0.94] }
            }
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/branding/logo.jpeg"
            alt="AthleteHub logo"
            width={96}
            height={96}
            className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-white/15"
          />
        </motion.div>

        <motion.div
          className="mb-6 flex justify-center gap-[0.06em] overflow-hidden"
          aria-label={SITE.product}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {LETTERS.map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="font-display text-sm font-bold tracking-[0.28em] text-white/70 uppercase sm:text-base"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2 + i * 0.04,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        <motion.h2
          className="font-display text-3xl font-bold tracking-tight leading-[1.15] text-white md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Built so everyone has a chance
          <br />
          <span className="text-signal-bright">to achieve their dreams.</span>
        </motion.h2>

        <motion.div
          className="mx-auto mt-10 h-px w-32 origin-center bg-gradient-to-r from-transparent via-signal to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7 }}
        />

        <motion.p
          className="mt-8 text-sm text-white/50"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          Developed by {SITE.designer}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href={`mailto:${SITE.contact}`}
            className="font-medium text-white/80 transition hover:text-white"
          >
            {SITE.contact}
          </a>
          <span className="text-white/20">·</span>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-signal-bright underline-offset-4 hover:underline"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
