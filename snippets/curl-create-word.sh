#!/usr/bin/env sh
# OfficeMaker Free — POST minimal Word document (snake_case body, document_json as string).
# Usage: sh curl-create-word.sh
# Requires: jq (to stringify inner JSON). Install: https://stedolan.github.io/jq/

set -eu
BASE="${OFFICEMAKER_FREE_BASE_URL:-https://free.officemaker.ai}"
BASE="${BASE%/}"

DOC_JSON=$(jq -c -n '{
  type: "document",
  content: {
    children: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Hello from OfficeMaker Free tier curl example." }]
      }
    ]
  }
}')

BODY=$(jq -n \
  --arg doc "$DOC_JSON" \
  '{ document_type: "word", file_name: "curl-snippet-demo", document_json: $doc }')

curl -sS "${BASE}/gpt/v1/create-document" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'User-Agent: officemaker-free-snippets/1.0' \
  -d "$BODY" | jq .
