"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Code2 } from "lucide-react";
import { SITE } from "@/data/content";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="overview"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-atmosphere" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 mt-20 flex max-w-xl items-start gap-2.5 rounded-2xl border border-signal/25 bg-signal/5 px-4 py-3 text-left text-sm text-text md:mt-8"
        >
          <Code2
            className="mt-0.5 h-4 w-4 shrink-0 text-signal"
            strokeWidth={1.75}
          />
          <p className="leading-relaxed">
            <span className="font-semibold">All code on this site is real</span>
            {" — "}
            snippets pulled directly from the AthleteHub Flutter app and Cloud
            Functions. Nothing here is placeholder or mocked.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex items-center gap-3"
        >
          <Image
            src="/branding/logo.jpeg"
            alt="AthleteHub"
            width={40}
            height={40}
            className="rounded-xl object-cover shadow-sm"
          />
          <p className="tech-label !mb-0">AthleteHub</p>
        </motion.div>

        <h1 className="text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[0.95] tracking-tight text-text">
          <motion.span
            className="block"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Behind the
          </motion.span>
          <motion.span
            className="block text-signal"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            scenes
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 text-sm text-muted"
        >
          Developed by {SITE.designer}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#architecture"
            className="inline-flex items-center gap-2 rounded-full bg-[#15181f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2a2f3a]"
          >
            Explore the system
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-text shadow-sm transition hover:border-border-strong"
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
      </div>
    </section>
  );
}
