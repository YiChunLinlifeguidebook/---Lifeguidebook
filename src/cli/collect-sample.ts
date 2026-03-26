/**
 * 範例：跨域採集（Wikipedia + 百度百科）→ 輸出統一 JSON 至 stdout
 * npm run collect -- --wiki Taiwan
 * npm run collect -- --baidu 人工智能
 */
import { createConsoleLogger } from '../modules/logger';
import { fetchBaiduLemma, fetchWikipediaSummary } from '../modules/collectors';

const log = createConsoleLogger('collect-sample');

async function main() {
  const args = process.argv.slice(2);
  const wikiIdx = args.indexOf('--wiki');
  const baiduIdx = args.indexOf('--baidu');

  const out: unknown[] = [];

  if (wikiIdx !== -1 && args[wikiIdx + 1]) {
    const q = args[wikiIdx + 1];
    const rec = await fetchWikipediaSummary(q, log);
    if (rec) out.push(rec);
    else log.warn('wikipedia.empty', { q });
  }

  if (baiduIdx !== -1 && args[baiduIdx + 1]) {
    const q = args[baiduIdx + 1];
    const rec = await fetchBaiduLemma(q, log);
    if (rec) out.push(rec);
    else log.warn('baidu.empty', { q });
  }

  if (out.length === 0) {
    console.error('Usage: npm run collect -- --wiki <query> | --baidu <lemma>');
    process.exit(1);
  }

  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
