import type { UniversalLogger } from '../logger';
import type { UnifiedRecord } from '../unified';
import { makeId } from '../unified';

const API = 'https://en.wikipedia.org/w/api.php';

export async function fetchWikipediaSummary(
  query: string,
  log: UniversalLogger
): Promise<UnifiedRecord | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'extracts',
    exintro: 'true',
    explaintext: 'true',
    titles: query,
    redirects: '1',
  });

  const url = `${API}?${params.toString()}`;
  log.debug('wikipedia.fetch', { url });

  const res = await fetch(url, { headers: { 'User-Agent': 'LifeguidebookUnifiedBot/1.0 (contact: dev)' } });
  if (!res.ok) {
    log.warn('wikipedia.http_error', { status: res.status });
    return null;
  }

  const data = (await res.json()) as {
    query?: { pages?: Record<string, { title?: string; extract?: string; missing?: string }> };
  };
  const pages = data.query?.pages;
  if (!pages) return null;

  const page = Object.values(pages)[0];
  if (!page || page.missing) return null;

  const title = page.title ?? query;
  const body = (page.extract ?? '').trim() || '(no extract)';

  return {
    id: makeId('wikipedia', title),
    source: 'wikipedia',
    title,
    body,
    fetchedAt: new Date().toISOString(),
    raw: { query },
  };
}
