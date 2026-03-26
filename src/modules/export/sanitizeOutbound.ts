/**
 * 對外傳輸前的資料過濾：去敏路徑、疑似金鑰、常見秘密樣式。
 * 不會「隱藏審計痕跡」；僅降低誤把本機路徑或 token 送到第三方 API 的風險。
 */
const PATTERNS: { name: string; regex: RegExp; replace: string }[] = [
  { name: 'bearer', regex: /\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi, replace: '[REDACTED_BEARER]' },
  { name: 'long_hex', regex: /\b[0-9a-f]{32,}\b/gi, replace: '[REDACTED_HEX]' },
  {
    name: 'unix_home',
    regex: /\/(?:Users|home)\/[^\s/]+/g,
    replace: '[PATH]',
  },
  { name: 'win_path', regex: /[A-Za-z]:\\(?:Users|Documents)[^\\s]*/g, replace: '[PATH]' },
];

export function sanitizeForExternalPayload(text: string): string {
  let out = text;
  for (const p of PATTERNS) {
    out = out.replace(p.regex, p.replace);
  }
  return out;
}
