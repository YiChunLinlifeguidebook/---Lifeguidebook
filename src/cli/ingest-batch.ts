/**
 * 批次採集：每行一個關鍵字，寫入 JSON Lines（節流避免打爆 API）
 * npm run ingest-batch -- --wiki --file queries.txt --out out/wiki.jsonl
 * npm run ingest-batch -- --baidu --file queries.txt --out out/baidu.jsonl
 */
import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import { createConsoleLogger } from '../modules/logger';
import { fetchBaiduLemma, fetchWikipediaSummary } from '../modules/collectors';
import { sanitizeForExternalPayload } from '../modules/export';

const log = createConsoleLogger('ingest-batch');

const DELAY_MS = Number(process.env.INGEST_DELAY_MS) || 800;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const wiki = args.includes('--wiki');
  const baidu = args.includes('--baidu');
  const fileIdx = args.indexOf('--file');
  const outIdx = args.indexOf('--out');
  const sanitize = args.includes('--sanitize');

  if ((!wiki && !baidu) || fileIdx === -1 || !args[fileIdx + 1] || outIdx === -1 || !args[outIdx + 1]) {
    console.error(
      'Usage: npm run ingest-batch -- --wiki|--baidu --file queries.txt --out out/data.jsonl [--sanitize]'
    );
    process.exit(1);
  }

  const filePath = args[fileIdx + 1];
  const outPath = args[outIdx + 1];
  const raw = await fsp.readFile(filePath, 'utf-8');
  const lines = raw
    .split(/\r?\n/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  const stream = fs.createWriteStream(outPath, { flags: 'w' });

  try {
    for (let i = 0; i < lines.length; i++) {
      const q = lines[i];
      const rec = wiki ? await fetchWikipediaSummary(q, log) : await fetchBaiduLemma(q, log);
      if (rec) {
        const outRec = sanitize
          ? {
              ...rec,
              title: sanitizeForExternalPayload(rec.title),
              body: sanitizeForExternalPayload(rec.body),
            }
          : rec;
        stream.write(JSON.stringify(outRec) + '\n');
        log.info('ingest.line_ok', { i: i + 1, total: lines.length, q });
      } else {
        log.warn('ingest.line_skip', { q });
      }
      if (i < lines.length - 1) await sleep(DELAY_MS);
    }
  } finally {
    await new Promise<void>((resolve, reject) => {
      stream.end((err: Error | null | undefined) => (err ? reject(err) : resolve()));
    });
  }

  log.info('ingest.done', { outPath, lines: lines.length });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
