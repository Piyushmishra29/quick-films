# Quick Films — web

The Quick Films site: a **Next.js 16** app built as a **static export**
(`output: "export"`, `images.unoptimized`) — no server runtime, publishable to
plain FTP hosting.

## Stack

- **Next.js 16** (App Router, static export)
- **Tailwind CSS v4** (tokens defined in `src/app/globals.css`)
- **Framer Motion** — scroll/entrance motion beats
- **Lenis** — smooth scroll (`components/shared/LenisProvider.tsx`)
- **Fonts:** self-hosted **BDO Grotesk Variable** (display) + **Inter** (body),
  wired in `src/app/fonts.ts` from `src/app/fonts/`

## Content

All film copy, credits, posters and videos live in
[`src/lib/films.ts`](./src/lib/films.ts) — the single source of truth for the
`/work` index and every `/work/[slug]/` case page.

## Develop

```bash
npm install   # first time only
npm run dev    # http://localhost:3000
```

## Build

```bash
npm run build  # produces ./out — the folder that gets deployed
```

`public/.htaccess` (caching + compression) is copied into `out/` automatically.

## Deploy

See the root [`../README.md`](../README.md) for the FTP deploy steps
(`scripts/deploy-ftp.sh`).
