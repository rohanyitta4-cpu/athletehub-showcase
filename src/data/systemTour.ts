/**
 * Unified auto-play tour: architecture layers + main technologies.
 */

export type TourStep = {
  id: string;
  kind: "layer" | "tech";
  title: string;
  subtitle: string;
  detail: string;
  tech: string[];
  /** visual accent for the flow node */
  accent: string;
};

export const SYSTEM_TOUR: TourStep[] = [
  {
    id: "flutter",
    kind: "tech",
    title: "Flutter + Dart",
    subtitle: "Client",
    detail:
      "The AthleteHub app is built with Flutter. Players log games, view stats with fl_chart, browse history, and chat with Scout — all in one cross-platform codebase for iOS and Android.",
    tech: ["Flutter", "Dart", "Provider", "fl_chart"],
    accent: "#2563eb",
  },
  {
    id: "auth",
    kind: "layer",
    title: "Firebase Auth",
    subtitle: "Identity",
    detail:
      "Every Scout request and privileged write requires a signed-in user. Auth gives the backend a trusted uid so data stays tied to the right player.",
    tech: ["Firebase Auth"],
    accent: "#f59e0b",
  },
  {
    id: "firestore",
    kind: "layer",
    title: "Cloud Firestore",
    subtitle: "Database",
    detail:
      "Games, seasons, Scout chats, and insights live as documents. The app reads and writes through security rules; Cloud Functions can roll up team totals when games change.",
    tech: ["Firestore", "Security rules"],
    accent: "#ea580c",
  },
  {
    id: "functions",
    kind: "tech",
    title: "Cloud Functions",
    subtitle: "Backend · TypeScript",
    detail:
      "Node.js 22 functions bridge the app to Gemini. chatWithScout checks auth, builds performance context, calls the model, and sanitizes video links before returning text.",
    tech: ["Node.js 22", "TypeScript", "firebase-functions"],
    accent: "#16a34a",
  },
  {
    id: "gemini",
    kind: "layer",
    title: "Gemini",
    subtitle: "Scout AI",
    detail:
      "Scout’s scouting reports come from Gemini with optional Google Search grounding. The API key never ships in the app — only Functions can call the model.",
    tech: ["gemini-2.5-flash", "Search grounding"],
    accent: "#7c3aed",
  },
  {
    id: "storage",
    kind: "layer",
    title: "Cloud Storage",
    subtitle: "Files",
    detail:
      "Profile images and other binary assets sit in Cloud Storage, protected by storage rules and linked from Firestore user documents.",
    tech: ["Cloud Storage"],
    accent: "#0891b2",
  },
];
