"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { NAV_ITEMS } from "@/data/content";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const [active, setActive] = useState("overview");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

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
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-signal"
        style={{ scaleX: progress }}
      />
      <nav className="fixed top-4 left-1/2 z-40 hidden -translate-x-1/2 md:block">
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-white/90 px-1.5 py-1.5 shadow-sm backdrop-blur-xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors",
                active === item.id
                  ? "bg-[#171717] text-white"
                  : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
