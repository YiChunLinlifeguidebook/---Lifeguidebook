/**
 * 文字層級 PII 洗滌（啟發式，非完備；正式環境應搭配流程與法遵審查）。
 */
const RULES: { name: string; regex: RegExp; replace: string }[] = [
  { name: 'email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, replace: '[EMAIL]' },
  {
    name: 'tw_phone',
    regex: /\b(?:\+886|0)?9\d{8}\b/g,
    replace: '[PHONE]',
  },
  {
    name: 'intl_phone',
    regex: /\b\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/g,
    replace: '[PHONE]',
  },
  {
    name: 'credit_card',
    regex: /\b(?:\d[ -]*?){13,19}\b/g,
    replace: '[CARD]',
  },
  {
    name: 'tw_id',
    regex: /\b[A-Z][12]\d{8}\b/g,
    replace: '[ID]',
  },
];

export function stripPIIFromText(text: string): string {
  let out = text;
  for (const r of RULES) {
    out = out.replace(r.regex, r.replace);
  }
  return out;
}
