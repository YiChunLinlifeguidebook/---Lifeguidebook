/** 跨領域資料統一後的最小結構（LINE / Maps / 365 / 百科等皆可映射至此） */
export type DataSource =
  | 'wikipedia'
  | 'baidu'
  | 'line'
  | 'google_maps'
  | 'm365'
  | 'unknown';

export interface UnifiedRecord {
  id: string;
  source: DataSource;
  title: string;
  body: string;
  fetchedAt: string;
  raw: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export function makeId(source: DataSource, key: string): string {
  const safe = key.replace(/\s+/g, '_').slice(0, 80);
  return `${source}:${safe}:${Date.now()}`;
}
