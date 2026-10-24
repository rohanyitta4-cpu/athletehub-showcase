"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { SITE } from "@/data/content";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="overview"
      className="relative min-h-[100svh] overflow-hidden mesh-light"
    >
      <div className="pointer-events-none absolute inset-0 grid-fine" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 pt-24 pb-16 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pt-20">
        <div className="relative z-10 max-w-xl flex-1">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mb-7 inline-flex max-w-md items-start gap-2.5 rounded-xl border border-signal/20 bg-signal/5 px-3.5 py-2.5 text-left text-[13px] leading-snug text-text"
          >
            <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            All code here is real — pulled from the Flutter app and Cloud
            Functions.
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-5 flex items-center gap-3"
          >
            <Image
              src="/branding/logo.jpeg"
              alt=""
              width={44}
              height={44}
              className="rounded-xl object-cover shadow-sm ring-1 ring-border"
              priority
            />
            <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {SITE.product}
            </p>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,6.5vw,4.75rem)] font-extrabold leading-[0.92] tracking-tight text-ink">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Built like a
            </motion.span>
            <motion.span
              className="block text-signal"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              product company.
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.55 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-[17px]"
          >
            A walkthrough of the Flutter client, Firebase backend, and Scout AI
            that power AthleteHub — for judges, mentors, and curious engineers.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c1f28]"
            >
              Explore the system
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-border-strong"
            >
              View source
            </a>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 text-sm text-dim"
          >
            Developed by {SITE.designer}
          </motion.p>
        </div>

        <motion.div
          className="relative mt-14 flex flex-1 justify-center lg:mt-0 lg:justify-end"
          initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-3xl" />
          <PhoneMockup
            src="/screenshots/dashboard.png"
            alt="AthleteHub dashboard"
            className="relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
