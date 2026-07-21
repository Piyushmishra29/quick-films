# Incoming changes — working notes (2026-07-21)

Piyush is preparing a round of site changes. This file collects everything received so far.
**Nothing implemented yet — more changes are coming.**

## 1. Portfolio disclaimer (verbatim, to be placed on the site)

> The portfolio below showcases a combination of projects produced by Quick Films and
> selected freelance cinematography work by our founder. Individual project credits
> indicate the role and production company where applicable.

Implications when we implement:
- Likely placement: /work index intro (above the film list) and/or the About section.
- The credits model must distinguish **role** and **production company** per film.
  `Film.credits` is already `{ role, name }[]` — freelance items get e.g.
  `{ role: "Cinematography", name: "<Founder>" }` + `{ role: "Production", name: "<Company>" }`
  instead of everything crediting "Quick Films".
- Current copy claims like "All work by Quick Films" (footer legal bar) and "Every shot ours"
  (reel description) will need softening to match the disclaimer.
- Which of the 9 existing films are Quick Films productions vs founder freelance — **needs
  Piyush's mapping** (SOCH / Dave & Buster's / Peter England / Project Grain are the likely
  freelance/production-company candidates).

## 2. New assets received (`assets/incoming-20260721/Quick Films/`, 59 MB, gitignored)

All images — no video in this batch:

| Asset | What it appears to be |
|---|---|
| `behance_project_1703399904272.jpg` | Frame: woman playing guitar in a sunlit interior (brand-film look) |
| `Screenshot (57)–(365).png` (13 files) | Cinematic frame grabs from shoots — e.g. (140) is a fashion frame at Koshy's Bakery Store, Bengaluru |
| `InCollage_20260710_221354457.jpg` | 3-panel football/adidas shoot collage (red kit, turf) |
| `DSC00181.jpg`, `DSC03220.jpg` | Camera stills (unreviewed) |
| `DSC05465.png` | The helmeted-rider sunset frame (already used as mobile hero) |
| `IMG_5116.PNG`, `IMG-20250813-WA0000.jpg`, `Picsart_...jpg` | Unreviewed (phone exports) |
| `Logos/NIKO_Logo.png`, `NIKO_Logo2.png`, `Only Logo.png` | NIKO logos — presumably the niko-theyyam client; maybe for a client-logo strip |

Likely uses (to confirm): new portfolio entries / stills strips for freelance cinematography
work, a client-logo row, richer About imagery.

## 3. Open questions for Piyush

1. Which films/frames are Quick Films productions vs founder freelance? Production company
   names per freelance project? (District by Zomato/Denzong Films confirmed; "these films"
   was plural — others TBD. Yolk Studio & Creative Habitat seen in browser tabs.)
2. ~~Founder's name?~~ RESOLVED: **Founder Pranay, co-founder Hema** — DoP credit now
   "Pranay (freelance)"; About credits + Organization JSON-LD founders added.
3. Do the new stills become new portfolio entries (photo/cinematography section?) or FRAMES
   strips on existing case pages?
4. Where exactly should the disclaimer sit — /work intro, About, footer, or all?
5. NIKO logos — client-logo strip on home, or niko-theyyam case page branding?

## 4. Direct change requests (received 2026-07-21, WhatsApp-style drip)

- [x] **Stats band**: add "Projects completed — 04" + clients worked with: **Drizzl, Niko
      Works, Eshwari Canteen** (Niko Works ↔ the NIKO logos in the zip). → implemented
- [x] **Rename film**: `project-grain` title "Woody, Dark, Cozy" → **"Project Grain"** (the
      description keeps the woody/dark/cozy line). → implemented
- [x] **dave-busters is freelance work**: project **District by Zomato** · Role: Freelance
      Director of Photography · Production: **Denzong Films**. "These are not through Quick
      Films. The others are through Quick Films." → credits updated; founder's display name
      still needed (currently credited as "Freelance (founder)").
- [x] **Disclaimer** placed on /work intro; footer "All work by Quick Films" softened.
- [x] **Project Grain is ALSO freelance** (full thread showed "these are not through Quick
      films" under BOTH the Project Grain and D&B videos, one credit block for both) →
      same credits applied: District by Zomato / Pranay (freelance DoP) / Denzong Films;
      "in-house" claim removed from description.
- [x] **Client logo strip live** in the stats band: Drizzl (zip's "Only Logo.png" inverted
      to white), Niko Works (white variant), Eshwari Canteen — ⚠️ TEMPORARY typeset
      wordmark in the site font (no public logo found; swap in the real one when Pranay
      sends it, file: web/public/logos/eshwari-canteen.png).
- [ ] Google Drive folder link received (source of the zip). "Mention this mama.. as most
      of the work has been prod…" (truncated) — likely the disclaimer we already placed;
      confirm wording covers it.
- [ ] Browser tabs in Piyush's screenshot also showed "Yolk Studio & Creative Habitat" —
      possibly another freelance production credit coming (which film?).
- [ ] (awaiting more…)

## 5. Already live before this batch (context)

9 films · Postcards clip gallery · narrative-first services · Mini Films · SEO pass ·
branded 404 · disclaimer NOT yet present anywhere.
