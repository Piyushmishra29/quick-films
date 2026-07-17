#!/usr/bin/env bash
#
# deploy-ftp.sh — mirror web/out/ to the Hostinger FTP target.
#
# Usage:
#   scripts/deploy-ftp.sh [--dry-run] [--help]
#
# Required environment variables (never hardcode credentials):
#   FTP_HOST   e.g. ftp.quickfilms.com  (or an IP)
#   FTP_USER   FTP account username
#   FTP_PASS   FTP account password
#   FTP_DIR    remote target directory, e.g. /public_html
#
# Optional:
#   FTP_PORT   FTP port (default: 21)
#
# The script builds nothing itself — run `npm run build` in web/ first so
# that web/out/ contains the static export to publish.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOCAL_DIR="${REPO_ROOT}/web/out"

DRY_RUN=0

usage() {
  cat <<'EOF'
Usage: scripts/deploy-ftp.sh [--dry-run] [--help]

Mirrors web/out/ (the Next.js static export) to a Hostinger FTP target.

Required env vars:
  FTP_HOST   FTP hostname or IP
  FTP_USER   FTP username
  FTP_PASS   FTP password
  FTP_DIR    Remote target directory (e.g. /public_html)

Optional env vars:
  FTP_PORT   FTP port (default: 21)

Flags:
  --dry-run  Show what would be uploaded without transferring anything
  --help     Show this help text

Example:
  FTP_HOST=ftp.quickfilms.com \
  FTP_USER=u123456789 \
  FTP_PASS='********' \
  FTP_DIR=/public_html \
  scripts/deploy-ftp.sh
EOF
}

for arg in "$@"; do
  case "${arg}" in
    --dry-run) DRY_RUN=1 ;;
    --help|-h) usage; exit 0 ;;
    *)
      echo "Unknown argument: ${arg}" >&2
      usage
      exit 1
      ;;
  esac
done

# --- validate environment -------------------------------------------------

missing=()
for var in FTP_HOST FTP_USER FTP_PASS FTP_DIR; do
  if [ -z "${!var:-}" ]; then
    missing+=("${var}")
  fi
done

if [ "${#missing[@]}" -gt 0 ]; then
  echo "Error: missing required environment variable(s): ${missing[*]}" >&2
  echo "See --help for usage." >&2
  exit 1
fi

FTP_PORT="${FTP_PORT:-21}"

# --- validate local build --------------------------------------------------

if [ ! -d "${LOCAL_DIR}" ]; then
  echo "Error: ${LOCAL_DIR} does not exist." >&2
  echo "Build the site first: (cd web && npm run build)" >&2
  exit 1
fi

if [ -z "$(ls -A "${LOCAL_DIR}" 2>/dev/null)" ]; then
  echo "Error: ${LOCAL_DIR} is empty. Build the site first: (cd web && npm run build)" >&2
  exit 1
fi

# --- confirm lftp is available ---------------------------------------------

if ! command -v lftp >/dev/null 2>&1; then
  echo "Error: lftp is required but not installed." >&2
  echo "Install it with: brew install lftp" >&2
  exit 1
fi

echo "Local source:  ${LOCAL_DIR}"
echo "Remote target: ${FTP_USER}@${FTP_HOST}:${FTP_PORT}${FTP_DIR}"

if [ "${DRY_RUN}" -eq 1 ]; then
  echo "Mode: DRY RUN (no files will be transferred)"
else
  echo "Mode: LIVE"
fi
echo

# --- build the lftp mirror command -----------------------------------------

MIRROR_OPTS="--reverse --delete --verbose --parallel=4"
if [ "${DRY_RUN}" -eq 1 ]; then
  MIRROR_OPTS="${MIRROR_OPTS} --dry-run"
fi

lftp -u "${FTP_USER},${FTP_PASS}" -p "${FTP_PORT}" "${FTP_HOST}" <<EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
set net:max-retries 3
set net:timeout 15
mirror ${MIRROR_OPTS} "${LOCAL_DIR}" "${FTP_DIR}"
bye
EOF

status=$?

if [ "${status}" -eq 0 ]; then
  if [ "${DRY_RUN}" -eq 1 ]; then
    echo
    echo "Dry run complete — no files were transferred."
  else
    echo
    echo "Deploy complete."
  fi
else
  echo "lftp exited with status ${status}" >&2
fi

exit "${status}"
