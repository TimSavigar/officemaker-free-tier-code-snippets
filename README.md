# OfficeMaker Free Tier — code snippets

Copy-paste examples for the **public** OfficeMaker Free HTTP API at `https://free.officemaker.ai`.

No API key is required for these routes. For Custom GPT Actions, import the live OpenAPI:

`https://free.officemaker.ai/gpt/openapi.json`

## What the free tier is for

- **Schema-led creation** of Word (`.docx`), Excel (`.xlsx`), and PowerPoint (`.pptx`) from JSON.
- **GET** `/gpt/v1/schema` — human-readable schema (use `format=markdown` for full shapes).
- **POST** `/gpt/v1/create-document` — returns a presigned download URL for the file.
- Optional: `/gpt/v1/gap-analysis`, `/gpt/v1/create-preview`, `/gpt/v1/instructions`.

## What is not on the public free surface

File conversion, WBS assembly, enterprise automation, authenticated full-document-service features, and **Salesforce / macro write-back** (those are premium / internal product capabilities).

## Snippets in this repo

| File | Language | Purpose |
|------|-----------|---------|
| [snippets/curl-schema.sh](snippets/curl-schema.sh) | curl | Fetch Word schema (markdown) |
| [snippets/curl-create-word.sh](snippets/curl-create-word.sh) | curl | Create a minimal Word document |
| [snippets/node-create-document.mjs](snippets/node-create-document.mjs) | Node 18+ | Schema + create with `fetch` |
| [snippets/python-requests.py](snippets/python-requests.py) | Python 3 | Same flow with `urllib` (stdlib only) |

## Request rules (GPT Actions / free API)

- **POST bodies** use **snake_case**: `document_type`, `file_name`, `document_json`.
- **`document_json` must be a string**: the stringified JSON object (not a nested JSON object).
- **`document_type`** is `word`, `excel`, or `powerpoint` (lowercase). Inside Word JSON, the root `type` is usually `"document"`.

## Related open-source starters

Platform-specific examples (Zapier, n8n, Pipedream, Salesforce samples, etc.) live in sibling repositories under the same GitHub organization. See the [OfficeMaker Developer](https://docs.officemaker.ai/developer) page on the public site for curated links.

## License

MIT — see [LICENSE](LICENSE).
