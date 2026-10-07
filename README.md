# OfficeMaker Free Tier — Word, Excel and PowerPoint document generation examples

**OfficeMaker** is an AI document-generation and workflow-automation platform for creating native Microsoft Word (`.docx`), Excel (`.xlsx`) and PowerPoint (`.pptx`) files from structured JSON.

This repository contains copy-paste examples for the **public OfficeMaker Free HTTP API** at `https://free.officemaker.ai`. It is useful for developers searching for **JSON to DOCX**, **JSON to XLSX**, **JSON to PPTX**, **AI document generation API** and **MCP document generation** patterns.

The core OfficeMaker architecture is:

**application / agent → live document schema → structured JSON → validation → OfficeMaker middleware → native Office file**

OfficeMaker keeps Office-file construction outside the language-model context. The model works with schema-led structured state; OfficeMaker middleware performs the deterministic file-writing work.

## Public developer resources

- [OfficeMaker](https://officemaker.ai/)
- [Developer hub](https://officemaker.ai/developer)
- [MCP document generation](https://officemaker.ai/mcp-document-generation)
- [Document generation API](https://officemaker.ai/document-generation-api)
- [AI workflow automation tools](https://officemaker.ai/ai-workflow-automation-tools)

No API key is required for the public free routes. For Custom GPT Actions, import the live OpenAPI:

`https://free.officemaker.ai/gpt/openapi.json`

## What the free tier is for

- **Schema-led creation** of Word (`.docx`), Excel (`.xlsx`), and PowerPoint (`.pptx`) from JSON.
- **GET** `/gpt/v1/schema` — human-readable schema (use `format=markdown` for full shapes).
- **POST** `/gpt/v1/create-document` — returns a presigned download URL for the file.
- Optional: `/gpt/v1/gap-analysis`, `/gpt/v1/create-preview`, `/gpt/v1/instructions`.

## What is not on the public free surface

File conversion, WBS assembly, enterprise automation, authenticated full-document-service features, and **Salesforce / macro write-back** are paid/internal capabilities rather than promises of this repository.

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

## Workflow integrations

OfficeMaker is the **document execution layer**, not a generic workflow orchestrator. Zapier, Make and n8n can trigger, branch and connect business applications, then call OfficeMaker when the workflow must finish as a native Word, Excel or PowerPoint file.

See:
- [OfficeMaker + workflow automation positioning](https://officemaker.ai/ai-workflow-automation-tools)
- [MCP workflow tools](https://officemaker.ai/blog/best-mcp-workflow-tools)

## License

MIT — see [LICENSE](LICENSE).
