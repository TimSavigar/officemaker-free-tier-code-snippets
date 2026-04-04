#!/usr/bin/env python3
"""
OfficeMaker Free — schema (markdown) + minimal Word create using stdlib only.
Usage: python python-requests.py
Env: OFFICEMAKER_FREE_BASE_URL (default https://free.officemaker.ai)
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request

BASE = os.environ.get("OFFICEMAKER_FREE_BASE_URL", "https://free.officemaker.ai").rstrip("/")

MINIMAL_WORD = {
    "type": "document",
    "content": {
        "children": [
            {
                "type": "paragraph",
                "children": [{"type": "text", "text": "Hello from OfficeMaker Free tier Python example."}],
            }
        ]
    },
}


def http_json(method: str, url: str, data: dict | None = None) -> object:
    headers = {
        "Accept": "application/json",
        "User-Agent": "officemaker-free-snippets/1.0",
    }
    body = None
    if data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            raw = resp.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"HTTP {e.code}: {err_body[:2000]}") from e


def main() -> None:
    schema_url = f"{BASE}/gpt/v1/schema?documentType=word&format=markdown"
    req = urllib.request.Request(
        schema_url,
        headers={"Accept": "text/markdown", "User-Agent": "officemaker-free-snippets/1.0"},
        method="GET",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        schema_text = resp.read().decode("utf-8")
    print("=== schema (first 800 chars) ===\n", schema_text[:800], "\n...")

    payload = {
        "document_type": "word",
        "file_name": "python-snippet-demo",
        "document_json": json.dumps(MINIMAL_WORD),
    }
    out = http_json("POST", f"{BASE}/gpt/v1/create-document", payload)
    print("=== create-document ===\n", json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
