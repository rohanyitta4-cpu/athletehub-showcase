"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  code: string;
  filename?: string;
  language?: "typescript" | "dart";
  className?: string;
  highlightLines?: number[];
  maxHeight?: string;
  /** How many lines to show (for typewriter reveal). Defaults to all. */
  visibleLines?: number;
};

const KEYWORDS =
  /\b(export|const|let|var|function|async|await|return|if|else|for|of|in|try|catch|throw|new|import|from|class|extends|implements|static|final|void|true|false|null|undefined|typeof|instanceof|as|is|switch|case|break|continue|while|do|yield|type|interface|enum)\b/g;

const TYPES =
  /\b(String|int|double|bool|List|Map|Future|void|Promise|Array|Record|number|boolean|any|unknown|never|HttpsError|PerformanceContext|DocumentReference|FieldValue|GameData)\b/g;

type Tok = { t: string; c: string };

function tokenizeLine(line: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < line.length) {
    if (line.startsWith("//", i)) {
      tokens.push({ t: "cm", c: line.slice(i) });
      break;
    }
    const q = line[i];
    if (q === "'" || q === '"' || q === "`") {
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\") {
          j += 2;
          continue;
        }
        if (line[j] === q) {
          j += 1;
          break;
        }
        j += 1;
      }
      tokens.push({ t: "str", c: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/\d/.test(line[i]!)) {
      let j = i;
      while (j < line.length && /[\d._xXa-fA-F]/.test(line[j]!)) j += 1;
      tokens.push({ t: "num", c: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[A-Za-z_$]/.test(line[i]!)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_$]/.test(line[j]!)) j += 1;
      const word = line.slice(i, j);
      const next = line.slice(j).match(/^\s*\(/);
      let t = "plain";
      if (KEYWORDS.test(word)) t = "kw";
      else if (TYPES.test(word)) t = "type";
      else if (next) t = "fn";
      KEYWORDS.lastIndex = 0;
      TYPES.lastIndex = 0;
      tokens.push({ t, c: word });
      i = j;
      continue;
    }
    if (/[{}()\[\];:,.<>!=+\-*/%&|?]/.test(line[i]!)) {
      tokens.push({ t: "op", c: line[i]! });
      i += 1;
      continue;
    }
    tokens.push({ t: "plain", c: line[i]! });
    i += 1;
  }
  return tokens;
}

export function CodeBlock({
  code,
  filename,
  language = "typescript",
  className,
  highlightLines = [],
  maxHeight = "420px",
  visibleLines,
}: Props) {
  const lines = code.replace(/\t/g, "  ").split("\n");
  const shown = visibleLines ?? lines.length;
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [shown]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#2a2d36] bg-code-bg shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[11px] text-white/45">
          {filename ?? (language === "dart" ? "lib/…" : "functions/src/…")}
        </span>
      </div>
      <pre
        ref={preRef}
        className="overflow-auto p-4 font-mono text-[12.5px] leading-[1.7] scrollbar-thin"
        style={{ maxHeight }}
      >
        <code>
          {lines.slice(0, shown).map((line, idx) => {
            const n = idx + 1;
            const lit = highlightLines.includes(n) || n === shown;
            return (
              <div
                key={n}
                className={cn(
                  "flex gap-4 px-1 transition-colors duration-200",
                  lit && "rounded bg-signal/15",
                )}
              >
                <span className="w-6 shrink-0 select-none text-right text-white/25">
                  {n}
                </span>
                <span className="min-w-0 grow whitespace-pre">
                  {tokenizeLine(line).map((tok, ti) => (
                    <span key={ti} className={`code-tok-${tok.t}`}>
                      {tok.c}
                    </span>
                  ))}
                  {line.length === 0 ? " " : null}
                </span>
              </div>
            );
          })}
          {shown < lines.length ? (
            <div className="mt-1 flex gap-4 px-1 text-white/25">
              <span className="w-6 shrink-0 text-right">·</span>
              <span className="animate-pulse">▌</span>
            </div>
          ) : null}
        </code>
      </pre>
    </div>
  );
}

export function countLines(code: string) {
  return code.replace(/\t/g, "  ").split("\n").length;
}
