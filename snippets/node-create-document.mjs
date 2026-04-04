#!/usr/bin/env node
/**
 * OfficeMaker Free — fetch Word schema (markdown) and create a minimal document.
 * Usage: node node-create-document.mjs
 * Env: OFFICEMAKER_FREE_BASE_URL (default https://free.officemaker.ai)
 */

const baseUrl = (process.env.OFFICEMAKER_FREE_BASE_URL || 'https://free.officemaker.ai').replace(/\/+$/, '');

const minimalWord = {
  type: 'document',
  content: {
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Hello from OfficeMaker Free tier Node example.' }]
      }
    ]
  }
};

async function main() {
  const schemaRes = await fetch(`${baseUrl}/gpt/v1/schema?documentType=word&format=markdown`, {
    headers: {
      Accept: 'text/markdown',
      'User-Agent': 'officemaker-free-snippets/1.0'
    }
  });
  const schemaText = await schemaRes.text();
  console.log('=== schema (first 800 chars) ===\n', schemaText.slice(0, 800), '\n...');

  const body = {
    document_type: 'word',
    file_name: 'node-snippet-demo',
    document_json: JSON.stringify(minimalWord)
  };

  const createRes = await fetch(`${baseUrl}/gpt/v1/create-document`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'officemaker-free-snippets/1.0'
    },
    body: JSON.stringify(body)
  });
  const createJson = await createRes.json();
  console.log('=== create-document ===\n', JSON.stringify(createJson, null, 2));
  if (!createRes.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
