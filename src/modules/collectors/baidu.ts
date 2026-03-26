import type { UniversalLogger } from '../logger';
import type { UnifiedRecord } from '../unified';
import { makeId } from '../unified';

/** 百度百科公開卡片 API（lemmaTitle 為詞條名） */
const BAIKE_CARD = 'https://baike.baidu.com/api/openapi/BaikeLemmaCardApi';

export async function fetchBaiduLemma(
  lemmaTitle: string,
  log: UniversalLogger
): Promise<UnifiedRecord | null> {
  const url = `${BAIKE_CARD}?lemmaTitle=${encodeURIComponent(lemmaTitle)}`;
  log.debug('baidu.fetch', { lemmaTitle });

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; LifeguidebookUnifiedBot/1.0)',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    log.warn('baidu.http_error', { status: res.status });
    return null;
  }

  const data = (await res.json()) as {
    title?: string;
    desc?: string;
    abstract?: string;
    lemmaDesc?: string;
  };

  const title = data.title ?? lemmaTitle;
  const body = [data.desc, data.abstract, data.lemmaDesc].filter(Boolean).join('\n\n') || '(no summary)';

  return {
    id: makeId('baidu', title),
    source: 'baidu',
    title,
    body,
    fetchedAt: new Date().toISOString(),
    raw: { lemmaTitle },
  };
}
