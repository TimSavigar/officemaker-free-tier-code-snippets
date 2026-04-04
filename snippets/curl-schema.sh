#!/usr/bin/env sh
# OfficeMaker Free — GET document schema (markdown) for Word.
# Usage: sh curl-schema.sh
# Override base URL: OFFICEMAKER_FREE_BASE_URL=https://free.officemaker.ai sh curl-schema.sh

set -eu
BASE="${OFFICEMAKER_FREE_BASE_URL:-https://free.officemaker.ai}"
BASE="${BASE%/}"

curl -sS "${BASE}/gpt/v1/schema?documentType=word&format=markdown" \
  -H 'Accept: text/markdown' \
  -H 'User-Agent: officemaker-free-snippets/1.0'
