"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  placeholderLabel?: string;
  video?: boolean;
  paused?: boolean;
  onVideoEnded?: () => void;
  loop?: boolean;
};

/** iPhone 16 Pro–inspired frame — larger for showcase readability. */
export function PhoneMockup({
  src,
  alt,
  className,
  placeholderLabel,
  video = false,
  paused = false,
  onVideoEnded,
  loop = true,
}: Props) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    if (paused || reduce) {
      el.pause();
      return;
    }
    void el.play().catch(() => {});
  }, [video, paused, reduce, src]);

  return (
    <div
      className={cn(
        "relative mx-auto",
        video
          ? "w-[340px] sm:w-[390px] lg:w-[420px]"
          : "w-[320px] sm:w-[360px] lg:w-[380px]",
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-signal/12 blur-3xl" />

      <motion.div
        className={cn(
          "relative [perspective:1400px]",
          video ? "aspect-[9/18.2]" : "aspect-[9/19.5]",
        )}
        animate={
          reduce
            ? undefined
            : {
                y: [0, -12, 0],
                rotateY: [-5, 5, -5],
                rotateX: [1.5, -1.5, 1.5],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative h-full w-full rounded-[3rem] p-[11px] shadow-[0_50px_100px_-36px_rgba(15,18,24,0.65)]"
          style={{
            background:
              "linear-gradient(145deg, #5c5f66 0%, #2c2e33 22%, #1a1b1f 50%, #3a3d44 78%, #6a6d74 100%)",
          }}
        >
          <div className="absolute -left-[3px] top-[16%] h-8 w-[3px] rounded-l-sm bg-zinc-600" />
          <div className="absolute -left-[3px] top-[22%] h-14 w-[3px] rounded-l-sm bg-zinc-600" />
          <div className="absolute -left-[3px] top-[32%] h-14 w-[3px] rounded-l-sm bg-zinc-600" />
          <div className="absolute -right-[3px] top-[26%] h-[72px] w-[3px] rounded-r-sm bg-zinc-600" />

          <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-black ring-1 ring-black/80">
            <div className="pointer-events-none absolute left-1/2 top-[11px] z-20 flex h-7 w-[108px] -translate-x-1/2 items-center justify-center rounded-full bg-black ring-1 ring-white/10">
              <div className="absolute right-3.5 h-2.5 w-2.5 rounded-full bg-slate-950 ring-1 ring-slate-700" />
            </div>

            <div className="relative h-full w-full bg-surface">
              {src && video ? (
                <video
                  key={src}
                  ref={videoRef}
                  src={src}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  muted
                  playsInline
                  autoPlay={!paused && !reduce}
                  loop={loop}
                  onEnded={onVideoEnded}
                  aria-label={alt}
                />
              ) : src ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-top"
                  sizes="420px"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                  <div className="h-10 w-10 rounded-full border border-border" />
                  <p className="tech-label">
                    {placeholderLabel ?? "Screenshot needed"}
                  </p>
                  <p className="text-sm text-muted">{alt}</p>
                </div>
              )}
            </div>

            <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-white/35" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
