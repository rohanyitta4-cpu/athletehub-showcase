/**
 * Mermaid diagrams sourced from docs/FIREBASE_ER_DIAGRAM_MERMAID.md
 * Only the two densest / most important views.
 */

export type FirebaseDiagram = {
  id: string;
  title: string;
  blurb: string;
  chart: string;
};

export const FIREBASE_DIAGRAMS: FirebaseDiagram[] = [
  {
    id: "er",
    title: "Entity relationships",
    blurb: "How users, seasons, games, insights, conversations, and teams relate in Firestore.",
    chart: `erDiagram
    USER ||--o{ SEASON : has
    USER ||--o{ STAT_INSIGHT : has
    USER ||--o{ CONVERSATION : has
    USER ||--o| DASHBOARD : has
    USER ||--o{ IMAGE : has
    SEASON ||--o{ GAME : contains
    GAME ||--|| PLAYER_STATS : contains
    TEAM ||--o{ GAME : has
    TEAM ||--o{ USER : coachIds
    TEAM ||--o{ USER : playerIds

    USER {
        string userId PK
    }

    SEASON {
        string id PK
        string userId FK
        string name
        timestamp startDate
        timestamp endDate
        boolean isActive
        object overallStats
    }

    GAME {
        string id PK
        string seasonId FK
        timestamp date
        object stats
    }

    PLAYER_STATS {
        int atBats
        int hits
        int runs
        int doubles
        int triples
        int homeRuns
        int walks
        int strikeouts
        double battingAverage
        double onBasePercentage
        double sluggingPercentage
        double runsCreated
    }

    STAT_INSIGHT {
        string statName PK
        string userId FK
        string mainAnalysis
        array keyInsights
        array recommendations
        string trend
        double trendPercentage
        timestamp lastUpdated
    }

    CONVERSATION {
        string id PK
        string userId FK
        array messages
        timestamp timestamp
    }

    DASHBOARD {
        string id PK
        string userId FK
        object preferences
    }

    IMAGE {
        string id PK
        string userId FK
        object metadata
    }

    TEAM {
        string teamId PK
        string teamName
        array coachIds
        array playerIds
        timestamp createdAt
        timestamp updatedAt
        timestamp expiresAt
    }`,
  },
  {
    id: "hierarchy",
    title: "Path hierarchy",
    blurb: "Nested paths under users/ and top-level teams/ and games/ collections.",
    chart: `graph TD
    A["users/"] --> B["{userId}/"]
    B --> C["seasons/"]
    B --> D["statInsights/"]
    B --> E["conversations/"]
    B --> F["dashboard/"]
    B --> G["images/"]

    C --> H["{seasonId}/"]
    H --> I["games/"]
    I --> J["{gameId}<br/>date · stats"]
    H --> K["Season doc<br/>name · dates · overallStats"]

    D --> L["{statName}<br/>StatInsight"]
    E --> M["{conversationId}"]
    F --> N["{dashboardId}"]
    G --> O["{imageId}"]

    P["teams/"] --> Q["{teamId}<br/>coaches · players"]
    R["games/"] --> S["{gameId}<br/>teamHome · teamAway"]

    style A fill:#dbeafe,stroke:#2563eb,color:#15181f
    style P fill:#ffedd5,stroke:#ea580c,color:#15181f
    style R fill:#ffedd5,stroke:#ea580c,color:#15181f
    style J fill:#eff6ff,stroke:#3b82f6,color:#15181f
    style K fill:#eff6ff,stroke:#3b82f6,color:#15181f
    style L fill:#f5f3ff,stroke:#7c3aed,color:#15181f`,
  },
];
