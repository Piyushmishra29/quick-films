# Quick Films

Website for **Quick Films** — a video-editing / short-form film studio.

> Status: **planning / gathering assets** — not built yet.

## Brand
See [`BRAND.md`](./BRAND.md) for the locked brand & type direction.

- **Type:** BDO Grotesk Variable (display) + Inter (body)
- **Palette:** red `#F5352B` · golden yellow `#F5C518` · black
- **Reference:** [anamorph.framer.website](https://anamorph.framer.website) — moody, cinematic, editorial

## Structure
```
brand/              logo + brand marks
assets/videos/      work-sample footage  (gitignored — large files, stored out-of-band)
reference/          design reference      (gitignored — local only)
```

## Notes
Video source and the reference site are **not** committed (GitHub 100MB limit + third-party
copyright). They live locally in the project folder.

## Deploy

The site is a static export (`images.unoptimized: true`, no server features) published to
Hostinger over FTP.

**1. Build the static export**

```bash
cd web
npm install   # first time only
npm run build
```

This produces `web/out/` — the folder that gets published.

**2. Deploy with `scripts/deploy-ftp.sh`**

The script mirrors `web/out/` to the Hostinger FTP target using `lftp` (`brew install lftp`
if you don't have it). Credentials are read from environment variables — **never hardcode
them** in the script or commit them anywhere.

Required env vars:

| Var | Example |
|---|---|
| `FTP_HOST` | `ftp.quickfilms.com` |
| `FTP_USER` | `u123456789` |
| `FTP_PASS` | your FTP password |
| `FTP_DIR` | `/public_html` |

Optional: `FTP_PORT` (default `21`).

```bash
# Preview what would change, no upload:
FTP_HOST=ftp.quickfilms.com FTP_USER=u123456789 FTP_PASS='...' FTP_DIR=/public_html \
  scripts/deploy-ftp.sh --dry-run

# Actually deploy:
FTP_HOST=ftp.quickfilms.com FTP_USER=u123456789 FTP_PASS='...' FTP_DIR=/public_html \
  scripts/deploy-ftp.sh
```

Tip: keep credentials in a local (gitignored) `.env.deploy` file and `source` it before
running the script, e.g. `set -a && source .env.deploy && set +a && scripts/deploy-ftp.sh`.

---
Built by [Daily Mark8ing](https://dailymark8ing.com).
