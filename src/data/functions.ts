/**
 * Scout-focused excerpts from the app.
 * No API keys, secrets, or scoring internals.
 */

export type FnModule = {
  id: string;
  file: string;
  name: string;
  purpose: string;
  language: "typescript" | "dart";
  relates: string[];
  snippet: string;
  highlightLines?: number[];
};

export const FN_MODULES: FnModule[] = [
  {
    id: "logGame",
    file: "lib/firebase_stats_service.dart",
    name: "logGame",
    language: "dart",
    purpose:
      "When a player finishes entering stats, this writes the game under their active season in Firestore — the data Scout later analyzes.",
    relates: ["Flutter", "Firestore"],
    highlightLines: [1, 20, 21, 22],
    snippet: `Future<void> logGame(Map<String, dynamic> gameData) async {
  if (currentUserId == null) return;

  var activeSeason = await getActiveSeason();
  if (activeSeason == null) {
    await createDefaultSeason();
    activeSeason = await getActiveSeason();
  }
  if (activeSeason == null) return;

  final gameStats = gameData['stats'] as Map<String, dynamic>;
  _validateGameStats(gameStats);

  final payload = {
    'date': gameData['date'] ?? FieldValue.serverTimestamp(),
    'stats': gameStats,
    'updatedAt': FieldValue.serverTimestamp(),
    'ownerId': currentUserId,
  };

  await activeSeason.reference
      .collection('games')
      .add(payload);

  // season aggregates refresh after the write
}`,
  },
  {
    id: "clientScout",
    file: "lib/widgets/scout_chat_sheet.dart",
    name: "Scout chat call",
    language: "dart",
    purpose:
      "The Scout chat UI packages the player’s question, recent performance context, chat history, and an optional report summary — then calls the Cloud Function.",
    relates: ["Flutter", "Cloud Functions"],
    highlightLines: [1, 2, 3],
    snippet: `final callable = FirebaseFunctions.instance.httpsCallable(
  'chatWithScout',
);
final result = await callable
    .call({
      'message': userMessage,
      'context': ctx.toJson(),
      'history': history,
      if (report != null)
        'report': {
          'grade': report.grade,
          'overallScore': report.overallScore,
          'focusArea': report.focusArea,
          'overallTrend': report.overallTrend,
          'categories': report.categories
              .map((c) => {
                return {'label': c.label, 'score': c.score};
              })
              .toList(),
        },
    })
    .timeout(const Duration(seconds: 30));

return result.data['response'] as String?;`,
  },
  {
    id: "chatWithScout",
    file: "functions/src/chatWithScout.ts",
    name: "chatWithScout",
    language: "typescript",
    purpose:
      "Server entry point for Scout. Checks auth, validates the message, builds Gemini contents, enables search grounding, sanitizes YouTube links, returns the report text.",
    relates: ["Auth", "Gemini", "Firestore"],
    highlightLines: [1, 2, 3, 4, 5],
    snippet: `export const chatWithScout = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to chat with Scout.",
    );
  }

  const { message, context: perfContext, history, report } = data;

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Message is required.",
    );
  }

  const contextBlock = perfContext
    ? buildContextBlock(perfContext, !!report?.grade)
    : "";

  const systemWithContext =
    SCOUT_SYSTEM_PROMPT + "\\n\\n" + contextBlock;

  const contents = [
    { role: "user", parts: [{ text: systemWithContext }] },
    { role: "model", parts: [{ text: "Understood. I'm Scout." }] },
    ...trimmedHistory,
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await axios.default.post(url, {
    contents,
    generationConfig: {
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
    tools: [{ googleSearch: {} }],
  });

  const text = parts.map((p) => p?.text || "").join("");
  const groundedIds = extractGroundingYoutubeIds(candidate);
  const sanitized = await sanitizeScoutYoutubeLinks(
    text.trim(),
    groundedIds,
  );

  return { response: sanitized };
});`,
  },
  {
    id: "buildContext",
    file: "functions/src/chatWithScout.ts",
    name: "buildContextBlock",
    language: "typescript",
    purpose:
      "Turns the player’s season rates, trends, and situational splits into the text block Gemini reads before writing a scouting report.",
    relates: ["Gemini", "Performance context"],
    highlightLines: [1, 5, 6],
    snippet: `function buildContextBlock(
  ctx: PerformanceContext,
  hasReport: boolean,
): string {
  const s = ctx.season;
  const t = ctx.trend;
  const sit = ctx.situational;

  return \`
PLAYER STATISTICS (\${ctx.gamesAnalyzed} games):

SEASON RATES:
- AVG: \${s.avg.toFixed(3)}
- OBP: \${s.obp.toFixed(3)}
- SLG: \${s.slg.toFixed(3)}
- OPS: \${s.ops.toFixed(3)}
- K%: \${s.kRate.toFixed(1)}%
- BB%: \${s.bbRate.toFixed(1)}%

RECENT TRENDS:
- Last 5 games AVG: \${t.last5Avg.toFixed(3)}
- Last 10 games AVG: \${t.last10Avg.toFixed(3)}
- Contact trend: \${t.contactTrend}
- Strikeout trend: \${t.strikeoutTrend}

SITUATIONAL:
- Two-strike AVG: \${sit.twoStrike.avg.toFixed(3)}
\`;
}`,
  },
  {
    id: "sanitizeYt",
    file: "functions/src/chatWithScout.ts",
    name: "sanitizeScoutYoutubeLinks",
    language: "typescript",
    purpose:
      "After Gemini replies, Scout validates YouTube drill links (markdown and bare URLs) so players don’t get dead videos.",
    relates: ["YouTube oEmbed", "Scout"],
    highlightLines: [1, 2, 3],
    snippet: `async function sanitizeScoutYoutubeLinks(
  text: string,
  groundedIds: Set<string>,
): Promise<string> {
  const mdRe =
    /\\[([^\\]]+)\\]\\((https?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/\\S+|youtu\\.be\\/\\S+?))\\)/gi;

  const hits: Array<{
    full: string;
    title: string;
    url: string;
    isMarkdown: boolean;
  }> = [];

  for (const m of text.matchAll(mdRe)) {
    const url = m[2].replace(/[.,;:!?)]+$/, "").trim();
    hits.push({
      full: m[0],
      title: m[1].trim(),
      url,
      isMarkdown: true,
    });
  }

  if (hits.length === 0) return text;

  // validate each URL, drop dead IDs, keep grounded ones
  let out = text;
  for (const hit of hits) {
    const ok = await isValidYoutubeUrl(hit.url, groundedIds);
    if (!ok) out = out.replace(hit.full, "");
  }
  return out.trim();
}`,
  },
  {
    id: "analyzeStat",
    file: "lib/utils/insight_generator_helper.dart",
    name: "analyzeStat",
    language: "dart",
    purpose:
      "Stats screens can ask for a Scout-style insight on a single metric. The callable returns text the UI shows under that chart.",
    relates: ["Flutter", "Cloud Functions"],
    highlightLines: [1, 2],
    snippet: `final callable = _functions.httpsCallable('analyzeStat');
final result = await callable.call({
  'statKey': statKey,
  'metrics': metricsPayload,
});

final insight = result.data['insight'] as String?;
if (insight != null && insight.isNotEmpty) {
  // show under the selected stat chart
  return insight;
}`,
  },
  {
    id: "onTeamGameWrite",
    file: "functions/src/index.ts",
    name: "onTeamGameWrite",
    language: "typescript",
    purpose:
      "Firestore trigger: when a team game document is created or updated, season and per-player rollups stay in sync automatically.",
    relates: ["Firestore", "Triggers"],
    highlightLines: [1, 2, 3, 4],
    snippet: `export const onTeamGameWrite = functions.firestore
  .document(
    "teams/{teamId}/seasons/{seasonId}/games/{gameId}",
  )
  .onWrite(async (change, context) => {
    const { teamId, seasonId, gameId } = context.params;

    const before = change.before.exists
      ? (change.before.data() as GameData)
      : null;
    const after = change.after.exists
      ? (change.after.data() as GameData)
      : null;

    await db.runTransaction(async (tx) => {
      // update season totals + player aggregates
    });
  });`,
  },
];
