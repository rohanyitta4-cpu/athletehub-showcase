# AthleteHub — Cinematic Engineering Showcase

Standalone Next.js site for a Congressional App Challenge / launch video.  
**Does not modify** the Flutter app in `flutter_first_app_vsc/`.

## Run locally

```bash
cd athletehub-showcase
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Recommended recording viewport: **1440 × 900** (16:9).

## Stack

- Next.js (App Router) · React · TypeScript
- Tailwind CSS v4
- Motion for React
- Lucide icons

## Sections

1. Cinematic hero  
2. Interactive full-stack architecture  
3. Request trace walkthrough  
4. Frontend engineering  
5. Data layer (Firestore)  
6. AI integrations  
7. Backend / Cloud Functions  
8. Testing & delivery  
9. Technology stack map  
10. Complete product + closing  

Scout scoring mathematics are intentionally excluded.

## App media

Files live in `public/screenshots/` and power the App section carousel:

| File | Role |
|------|------|
| `dashboard.png` / `bottomdash.png` | Home |
| `topstats.png` / `radar.png` | Stats |
| `historyscreen.png` / `sharecard.png` | History + share |
| `data-entry-scr.mp4` / `scout-scr.mp4` | Screen recordings (auto-converted from `*scr.mov`) |

Logo: `public/branding/logo.jpeg` (copied from the Flutter branding asset).

## Notes

- Architecture names and function modules were verified against the AthleteHub repo.
- Animations are client-side explanations — not live production calls.
- Designer credit defaults to **Rohan** in `src/data/content.ts` — edit if needed.
