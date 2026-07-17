# Quick Films Website — Design Spec

_2026-07-17 · approved direction; this file is the authoritative brief for all build agents._

## What this is

Multi-page portfolio site for **Quick Films**, a video-editing / short-form film studio
(client of Daily Mark8ing). Dark, cinematic, editorial mood (reference:
anamorph.framer.website — mood/type reference ONLY; the layout, code, and copy must be
**original**, not a reproduction).

## Stack

- Next.js 16, **static export** (`output: 'export'`), App Router, TypeScript
- Tailwind CSS v4
- Framer Motion (reveals) + Lenis (smooth scroll)
- Self-hosted fonts from `brand/fonts/` (already in repo)
- App lives in `web/` inside the repo root `~/Desktop/quick-films/`
- Deploy target: Hostinger FTP later — everything must work as flat static files
  (relative assets, no server features, `images.unoptimized: true`)

## Design tokens

| Token | Value |
|---|---|
| `--bg` | `#0A0A0A` near-black |
| `--surface` | `#141412` panels/cards |
| `--text` | `#EDEDEA` warm off-white |
| `--muted` | `#8A8A85` |
| `--red` | `#F5352B` (QF brand red — primary accent) |
| `--yellow` | `#F5C518` (QF brand yellow — secondary accent, tags/numbers) |
| Display font | `BDO Grotesk Variable` (`brand/fonts/BDOGrotesk-Variable.woff2`, weight range 100–900) |
| Body font | `Inter` (400 + 700 latin woff2s in `brand/fonts/`) |

Accent discipline: red/yellow are **small sharp signals** (tags, index numbers, hovers,
underlines, the CTA). Never large color fields. The site reads near-black.

## Sitemap

```
/                    Home
/work                Work index
/work/[slug]         Case pages: interview, kathakali, niko-theyyam, pe
```

## Content model — `web/src/lib/films.ts`

Single data file drives work index + case pages:

```ts
type Film = {
  slug: string; title: string; year: string;
  tags: string[];            // e.g. ["Documentary", "Colour Grade", "VO"]
  duration: string;          // "0:60"
  description: string;       // 2–3 sentence editorial draft (marked DRAFT for client)
  credits: { role: string; name: string }[];  // "Edit & Grade — Quick Films" etc.
  video: string;             // "/films/<slug>.mp4"
  poster: string;            // "/films/<slug>.jpg"
  aspect: "9/16";
};
```

Films: `interview` (4K source, 60s), `kathakali` (18s), `niko-theyyam` (27s, VO),
`pe` (49s, graded). Copy is drafted from actual frame-grabs of the footage — plausible,
editorial, no invented client names; credit everything to Quick Films.

## Pages

### Home `/`
1. **Nav** (all pages): wordmark "quick FILMS" (script "quick" small + FILMS heavy),
   links Work / About / Contact, CTA button "Start a project" (red) → WhatsApp/mailto.
2. **Kinetic type hero**: giant stacked "QUICK FILMS" in BDO Grotesk (fluid clamp size,
   ~20vw), staggered rise-in on load; one-line positioning statement; small metadata
   accents (©2026, "EDIT · GRADE · MOTION", yellow index marks). NO video in hero.
3. **Work reel**: the 4 films as vertical 9:16 cards in a horizontal row (scrolls
   horizontally on desktop overflow, stacks 2-up/1-up on mobile). Poster shown; video
   plays muted inline on hover (desktop) / on tap (mobile). Card = poster + index number
   (yellow) + title + tags. Links to case page.
4. **Services**: numbered big-type list (01 Long-form Edit / 02 Short-form & Reels /
   03 Colour Grade / 04 Motion & Titles). Hover: row fills, number flips red.
5. **About**: short studio statement, 2–3 stat chips (turnaround, formats, tools).
6. **Contact / footer** (all pages): oversized wordmark, email + WhatsApp links,
   red CTA, GitHub-free, minimal legal line.

### Work `/work`
Editorial index: full-width typographic rows (index number, title, tags, year, duration)
with a poster thumb that follows/reveals on hover; click → case page. Mobile: simple
stacked cards.

### Case `/work/[slug]`
Generated from `films.ts` via `generateStaticParams`. Layout: huge title + yellow tags,
meta row (year, duration, role), the film centered as a 9:16 player (poster + play,
native controls, NOT autoplay with sound), description block, credits list,
prev/next film navigation.

## Motion system (exactly 3 beats — restraint is a requirement)

1. **Hero type rise**: staggered translateY+fade on the stacked wordmark, once on load.
2. **Scroll reveals**: ONE consistent fade-up-8px reveal (Framer Motion `whileInView`,
   ~0.6s, small stagger) used sitewide for sections/rows.
3. **Work-card hover**: video fades in over poster + subtle scale (1.02) + title shift.

Baseline: Lenis smooth scroll. Nothing else — no parallax stacking, no cursor effects,
no marquees beyond (at most) one thin ticker if home feels empty. `prefers-reduced-motion`
disables beats 1–3.

## Video pipeline

Sources in `assets/videos/` (gitignored, 458MB). Transcode with ffmpeg to
`assets/web-encodes/` then copy into `web/public/films/`:

- `<slug>.mp4` — H.264, 720×1280, CRF 27, preset slow, AAC 128k, +faststart, ~3–8MB
- `<slug>.jpg` — poster frame (pick a strong, well-lit frame, not frame 0), q=3, 720w
- Slugs: `interview`, `kathakali`, `niko-theyyam`, `pe`

Web encodes DO get committed (they're small); sources stay ignored.

## Quality bar / verification

- `npm run build` produces a clean static export in `web/out/`
- All 6 routes render; local `npx serve out` + Playwright screenshots desktop (1440)
  and mobile (390) — layout must hold at both
- Fonts load locally (no external font/CDN requests anywhere)
- Lighthouse-ish sanity: total home payload < 15MB with videos lazy
- Accent discipline + 3-beat motion rule respected

## Explicit non-goals (v1)

- No CMS, no contact form backend (mailto/WhatsApp only), no blog, no analytics,
  no dark/light toggle (site is dark, period), no i18n.

## Agent file-ownership map (build-time)

| Agent | Owns |
|---|---|
| scaffold | `web/` bootstrap, tokens, fonts, `layout.tsx`, Nav, Footer, Lenis provider, `Reveal` motion component, `films.ts` stub |
| encode | `assets/web-encodes/*` |
| films-data | final `films.ts` copy + `web/public/films/*` |
| home | `web/src/app/page.tsx` + `web/src/components/home/*` |
| work-index | `web/src/app/work/page.tsx` + `web/src/components/work/*` |
| case-pages | `web/src/app/work/[slug]/page.tsx` + `web/src/components/case/*` |
| deploy-script | `scripts/deploy-ftp.sh`, README deploy section |

No agent runs `npm run dev`; no agent commits (orchestrator commits).
