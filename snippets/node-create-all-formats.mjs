#!/usr/bin/env node
/**
 * Minimal OfficeMaker Free examples: create and download native DOCX, XLSX, PPTX.
 * Prerequisite: Node 20+. No API key for the public free create route.
 * Example: node snippets/node-create-all-formats.mjs
 * Optional: OFFICEMAKER_FREE_BASE_URL=https://free.officemaker.ai
 *
 * Read the live schema for each document type; schemas can evolve.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = (process.env.OFFICEMAKER_FREE_BASE_URL || 'https://free.officemaker.ai').replace(/\/+$/, '');
const OUT = process.env.OFFICEMAKER_EXAMPLES_OUT || 'officemaker-output';
const examples = [
  {
    type: 'word', ext: 'docx', filename: 'business-brief',
    doc: {
      type: 'document',
      content: { children: [
        { type: 'paragraph', children: [{ type: 'text', text: 'OfficeMaker editable Word document example' }] },
        { type: 'paragraph', children: [{ type: 'text', text: 'Created from a structured JSON payload.' }] }
      ] }
    }
  },
  {
    type: 'excel', ext: 'xlsx', filename: 'task-tracker',
    doc: {
      type: 'excel',
      sheets: [{ name: 'Tasks', rows: [
        { cells: [{ col: 0, row: 0, t: 's', value: 'Task' }, { col: 1, row: 0, t: 's', value: 'Status' }] },
        { cells: [{ col: 0, row: 1, t: 's', value: 'Prepare brief' }, { col: 1, row: 1, t: 's', value: 'In progress' }] },
        { cells: [{ col: 0, row: 2, t: 's', value: 'Review output' }, { col: 1, row: 2, t: 's', value: 'Pending' }] }
      ] }]
    }
  },
  {
    type: 'powerpoint', ext: 'pptx', filename: 'project-overview',
    doc: {
      type: 'powerpoint',
      content: [{ layout: 'Title and Content', shapes: [
        { type: 'textBox', shapeName: 'Title 1', text: 'OfficeMaker editable PowerPoint example',
          position: { x: 0.6, y: 0.4, width: 8.2, height: 0.8 }, fontSize: 28, alignment: 'left' },
        { type: 'textBox', shapeName: 'Content Placeholder 2',
          text: 'Generated from structured JSON with OfficeMaker document middleware.',
          position: { x: 0.8, y: 1.6, width: 7.8, height: 3.8 }, fontSize: 20, alignment: 'left' }
      ] }]
    }
  }
];

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const example of examples) {
    const schema = await fetch(`${BASE}/gpt/v1/schema?documentType=${example.type}&format=markdown`);
    if (!schema.ok) throw new Error(`Schema lookup for ${example.type}: HTTP ${schema.status}`);
    const request = {
      document_type: example.type,
      file_name: example.filename,
      // Free HTTP API expects a JSON STRING, unlike the internal structured MCP.
      document_json: JSON.stringify(example.doc)
    };
    const created = await fetch(`${BASE}/gpt/v1/create-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request)
    });
    const data = await created.json();
    if (!created.ok || !data.success || !data.documentUrl) {
      throw new Error(`Create ${example.type} failed (HTTP ${created.status}): ${JSON.stringify(data).slice(0, 300)}`);
    }
    const downloadUrl = new URL(data.documentDownloadUrl || data.documentUrl);
    if (downloadUrl.protocol !== 'https:') throw new Error('Refusing an insecure document download URL.');
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error(`Download ${example.type}: HTTP ${response.status}`);
    const output = join(OUT, `${example.filename}.${example.ext}`);
    await writeFile(output, Buffer.from(await response.arrayBuffer()));
    console.log(`Created ${output}`);
  }
  console.log('All three native Office examples created successfully.');
}
main().catch((err) => {
  console.error(err?.message || err);
  process.exitCode = 1;
});
