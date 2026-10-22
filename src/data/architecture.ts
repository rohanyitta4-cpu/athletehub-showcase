export const DATA_DOMAINS = [
  {
    id: "users",
    label: "Users",
    path: "users/{uid}",
    detail:
      "One document per signed-in player. Holds profile fields, preferences (theme, entry mode), Pro entitlement flags, and consent choices. Almost every other path hangs off this uid. Rules require request.auth.uid to match the document id before any read or write.",
    sample: `{
  "displayName": "Jordan Lee",
  "email": /* redacted */,
  "preferences": {
    "theme": "system",
    "entryMode": "flashcard"
  },
  "isPro": true,
  "createdAt": /* Timestamp */,
  "photoUrl": /* storage path */
}`,
  },
  {
    id: "seasons",
    label: "Seasons",
    path: "users/{uid}/seasons/{seasonId}",
    detail:
      "Career seasons (e.g. Spring 2026). The active season is what stats screens and Scout use for context. Totals and game lists are scoped here so history can switch years cleanly without mixing spring and summer numbers.",
    sample: `{
  "name": "Spring 2026",
  "isActive": true,
  "startDate": /* Timestamp */,
  "totals": {
    "games": 24,
    "avg": 0.312,
    "ops": 0.845
    // …other aggregated rates
  }
}`,
  },
  {
    id: "games",
    label: "Games",
    path: "users/{uid}/seasons/{seasonId}/games/{gameId}",
    detail:
      "Each logged contest. The stats map stores batting or pitching numbers from the entry UI. Scout’s performance context is built by aggregating these documents for the active season — so logging games is what makes reports useful.",
    sample: `{
  "date": /* Timestamp */,
  "ownerId": /* auth uid */,
  "updatedAt": /* Timestamp */,
  "stats": {
    "AB": 4,
    "H": 2,
    "BB": 1,
    "SO": 0,
    "HR": 0
    // pitching keys when mode is pitching
  }
}`,
  },
  {
    id: "conversations",
    label: "Scout chats",
    path: "users/{uid}/scoutConversations/{id}",
    detail:
      "Saved Scout threads — messages and metadata — so a player can reopen a scouting conversation later. A scheduled Cloud Function can delete threads older than a retention window to keep storage tidy.",
    sample: `{
  "title": "Two-strike approach",
  "updatedAt": /* Timestamp */,
  "messages": [
    { "role": "user", "content": /* player question */ },
    { "role": "assistant", "content": /* Scout reply */ }
  ]
}`,
  },
  {
    id: "insights",
    label: "Insights",
    path: "users/{uid}/insights/{statKey}",
    detail:
      "Cached Scout-style blurbs for individual stats (e.g. K%, OPS). The stats screen can show these without re-calling the model every time the chart opens, which keeps the UI fast and reduces function invocations.",
    sample: `{
  "statKey": "kRate",
  "insight": /* Scout-style paragraph */,
  "generatedAt": /* Timestamp */,
  "seasonId": /* active season id */
}`,
  },
  {
    id: "teams",
    label: "Teams",
    path: "teams/{teamId}/seasons/{seasonId}/games/{gameId}",
    detail:
      "When team/coach mode is enabled, shared games live under a team tree. The onTeamGameWrite trigger keeps season and per-player rollups updated whenever a game changes, so coach dashboards stay current without the client doing the math.",
    sample: `{
  "teamId": /* team id */,
  "seasonId": /* season id */,
  "gameId": /* game id */,
  "playerId": /* roster member */,
  "stats": { /* same shape as personal games */ }
}`,
  },
] as const;
