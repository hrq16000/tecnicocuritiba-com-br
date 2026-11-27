#!/usr/bin/env bash
set -euo pipefail
port="${1:-8080}"
test -f .output/server/wrangler.json
export CI=true WRANGLER_SEND_METRICS=false
npm exec --yes --package=wrangler@4.169.0 -- wrangler --version
npm exec --yes --package=wrangler@4.169.0 -- wrangler dev --config .output/server/wrangler.json --ip 127.0.0.1 --port "$port" --local > preview.log 2>&1 &
for i in {1..60}; do
  if curl -fsS "http://127.0.0.1:$port/" >/dev/null 2>&1; then exit 0; fi
  sleep 1
done
echo "preview Nitro/Cloudflare não retornou 2xx"
tail -n 35 preview.log
exit 1
