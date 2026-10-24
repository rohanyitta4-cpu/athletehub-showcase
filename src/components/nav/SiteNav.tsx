"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { NAV_ITEMS, SITE } from "@/data/content";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const [active, setActive] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[1.5px] origin-left bg-signal"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-white/80 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8">
          <a href="#overview" className="flex items-center gap-2.5">
            <Image
              src="/branding/logo.jpeg"
              alt=""
              width={28}
              height={28}
              className="rounded-md object-cover"
            />
            <span className="font-display text-[15px] font-bold tracking-tight text-ink">
              {SITE.product}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative px-3 py-2 text-[13px] font-medium tracking-tight transition-colors",
                  active === item.id
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-signal"
                  />
                ) : null}
              </a>
            ))}
          </nav>

          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-border bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-sm transition hover:border-border-strong sm:inline-flex"
          >
            GitHub
          </a>
        </div>
      </header>
    </>
  );
}
