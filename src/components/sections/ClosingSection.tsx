"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/data/content";

const LETTERS = SITE.product.split("");

export function ClosingSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 py-32">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[#0c0e14]" />
      <div className="pointer-events-none absolute inset-0 grid-atmosphere opacity-25" />
      <motion.div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-signal/20 blur-[110px]"
        initial={reduce ? false : { opacity: 0, scale: 0.55 }}
        whileInView={{ opacity: 1, scale: 1.1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-[360px] w-[360px] rounded-full bg-[#1d4ed8]/20 blur-[100px]"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1.2 }}
      />

      {/* Sweep line */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-signal/60 to-transparent"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.55, y: 36 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 inline-block"
        >
          <motion.div
            className="absolute -inset-6 rounded-[2.25rem] bg-signal/30 blur-2xl"
            animate={
              reduce
                ? undefined
                : { opacity: [0.35, 0.75, 0.35], scale: [0.92, 1.08, 0.92] }
            }
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/branding/logo.jpeg"
            alt="AthleteHub logo"
            width={104}
            height={104}
            className="relative rounded-[1.75rem] object-cover shadow-2xl ring-1 ring-white/15"
          />
        </motion.div>

        {/* Letter-stagger wordmark */}
        <motion.div
          className="mb-6 flex justify-center gap-[0.08em] overflow-hidden"
          aria-label={SITE.product}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {LETTERS.map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="text-sm font-semibold tracking-[0.28em] text-white/70 uppercase sm:text-base"
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.25 + i * 0.045,
                    duration: 0.55,
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
          className="text-3xl font-semibold tracking-tight leading-[1.2] text-white md:text-5xl lg:text-[3.25rem]"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Built so everyone has a chance
          <br />
          <span className="bg-gradient-to-r from-white via-blue-100 to-signal bg-clip-text text-transparent">
            to achieve their dreams.
          </span>
        </motion.h2>

        <motion.div
          className="mx-auto mt-10 h-px w-36 origin-center bg-gradient-to-r from-transparent via-signal to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.75 }}
        />

        <motion.p
          className="mt-8 text-sm text-white/55"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.55 }}
        >
          Developed by {SITE.designer}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.05, duration: 0.55 }}
        >
          <a
            href={`mailto:${SITE.contact}`}
            className="font-medium text-white/85 transition hover:text-white"
          >
            Contact: {SITE.contact}
          </a>
          <span className="text-white/25">·</span>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-signal underline-offset-4 hover:underline"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
            </svg>
            GitHub
          </a>
        </motion.div>

        <motion.p
          className="mt-14 text-[11px] font-medium tracking-[0.22em] text-white/30 uppercase"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.25, duration: 0.6 }}
        >
          End of walkthrough
        </motion.p>
      </div>
    </section>
  );
}
