"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Pause,
  Play,
  ClipboardList,
  Database,
  MessageSquare,
  ShieldCheck,
  Server,
  Sparkles,
  FileText,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CodeBlock, countLines } from "@/components/shared/CodeBlock";
import { useTypedAutoAdvance } from "@/hooks/useTypedAutoAdvance";
import { cn } from "@/lib/cn";

const STAGES = [
  {
    id: "enter",
    title: "Enter game stats",
    icon: ClipboardList,
    detail: "Player logs batting or pitching numbers in the Flutter game entry UI.",
    language: "dart" as const,
    file: "lib/firebase_stats_service.dart",
    code: `Future<void> logGame(Map<String, dynamic> gameData) async {
  if (currentUserId == null) return;

  var activeSeason = await getActiveSeason();
  if (activeSeason == null) {
    await createDefaultSeason();
    activeSeason = await getActiveSeason();
  }
  if (activeSeason == null) return;

  final gameStats = gameData['stats'] as Map<String, dynamic>;
  _validateGameStats(gameStats);
  // next: write under the season's games collection
}`,
  },
  {
    id: "save",
    title: "Save to Firestore",
    icon: Database,
    detail: "Stats land under the active season as a game document.",
    language: "dart" as const,
    file: "lib/firebase_stats_service.dart",
    code: `final payload = {
  'date': gameData['date'] ?? FieldValue.serverTimestamp(),
  'stats': gameStats,
  'updatedAt': FieldValue.serverTimestamp(),
  'ownerId': currentUserId,
};

await activeSeason.reference
    .collection('games')
    .add(payload);

// season totals refresh after the write lands`,
  },
  {
    id: "ask",
    title: "Ask Scout",
    icon: MessageSquare,
    detail: "Player opens Scout and asks for a scouting report on their performance.",
    language: "dart" as const,
    file: "lib/widgets/scout_chat_sheet.dart",
    code: `final callable = FirebaseFunctions.instance.httpsCallable(
  'chatWithScout',
);
final result = await callable.call({
  'message': userMessage,
  'context': ctx.toJson(),
  'history': history,
  if (report != null)
    'report': {
      'grade': report.grade,
      'overallScore': report.overallScore,
      'focusArea': report.focusArea,
    },
}).timeout(const Duration(seconds: 30));`,
  },
  {
    id: "auth",
    title: "Auth check",
    icon: ShieldCheck,
    detail: "Cloud Function confirms the user is signed in before continuing.",
    language: "typescript" as const,
    file: "functions/src/chatWithScout.ts",
    code: `export const chatWithScout = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to chat with Scout.",
      );
    }

    const { message, context: perfContext, history, report } = data;
    if (!message || !String(message).trim()) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Message is required.",
      );
    }
    // continue with authenticated uid…
  },
);`,
  },
  {
    id: "build",
    title: "Build Scout context",
    icon: Server,
    detail: "Backend loads performance context and prepares the model request.",
    language: "typescript" as const,
    file: "functions/src/chatWithScout.ts",
    code: `const contextBlock = perfContext
  ? buildContextBlock(perfContext, !!report?.grade)
  : "";

const systemWithContext =
  SCOUT_SYSTEM_PROMPT + "\\n\\n" + contextBlock;

const contents = [
  { role: "user", parts: [{ text: systemWithContext }] },
  { role: "model", parts: [{ text: "Understood. I'm Scout." }] },
  ...trimmedHistory,
  { role: "user", parts: [{ text: message }] },
];`,
  },
  {
    id: "gemini",
    title: "Gemini generates report",
    icon: Sparkles,
    detail: "Scout’s answer is generated with optional Google Search grounding.",
    language: "typescript" as const,
    file: "functions/src/chatWithScout.ts",
    code: `// API key from Functions environment — never from the client
const response = await axios.default.post(url, {
  contents,
  generationConfig: {
    temperature: TEMPERATURE,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  },
  tools: [{ googleSearch: {} }],
});

const candidate = response.data?.candidates?.[0];
const parts = candidate?.content?.parts ?? [];
const text = parts.map((p) => p?.text || "").join("");
const groundedIds = extractGroundingYoutubeIds(candidate);`,
  },
  {
    id: "report",
    title: "Scout delivers report",
    icon: FileText,
    detail: "Sanitized scouting report returns to the chat UI for the player to read.",
    language: "typescript" as const,
    file: "functions/src/chatWithScout.ts",
    code: `const sanitized = await sanitizeScoutYoutubeLinks(
  text.trim(),
  groundedIds,
);

return { response: sanitized };

// Flutter client:
// final reply = result.data['response'] as String?;
// append Scout bubble in the chat sheet`,
  },
] as const;

const LINE_COUNTS = STAGES.map((s) => countLines(s.code));

export function TraceSection() {
  const {
    rootRef,
    itemIndex: step,
    visibleLines,
    paused,
    selectItem,
    togglePause,
  } = useTypedAutoAdvance({
    lineCounts: LINE_COUNTS,
    msPerLine: 130,
    holdMs: 1500,
  });

  const active = STAGES[step]!;

  return (
    <AnimatedSection id="trace" className="border-t border-border/70">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Trace"
          title={"From logged stats\nto a Scout report."}
        />
        <button
          type="button"
          onClick={togglePause}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
        >
          {paused ? (
            <>
              <Play className="h-4 w-4" /> Resume
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          )}
        </button>
      </div>

      <div ref={rootRef} className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="space-y-2">
            {STAGES.map((s, i) => {
              const on = i <= step;
              const current = i === step;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectItem(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                    current
                      ? "border-signal/40 bg-signal/5"
                      : on
                        ? "border-border bg-bg"
                        : "border-transparent hover:bg-bg",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl border",
                      current
                        ? "border-signal/30 bg-white text-signal"
                        : "border-border bg-white text-muted",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          on ? "text-text" : "text-muted",
                        )}
                      >
                        {s.title}
                      </span>
                    </div>
                  </div>
                  {current ? (
                    <motion.span
                      layoutId="trace-dot"
                      className="h-2 w-2 rounded-full bg-signal"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="tech-label mb-2">
                Step {step + 1} of {STAGES.length}
              </p>
              <h3 className="text-xl font-semibold tracking-tight">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {active.detail}
              </p>
              <div className="mt-5">
                <CodeBlock
                  key={active.id}
                  code={active.code}
                  filename={active.file}
                  language={active.language}
                  visibleLines={visibleLines}
                  maxHeight="340px"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </AnimatedSection>
  );
}
