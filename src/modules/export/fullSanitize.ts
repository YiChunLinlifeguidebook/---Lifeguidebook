import { sanitizeForExternalPayload } from './sanitizeOutbound';
import { stripPIIFromText } from '../privacy/piiSanitize';

/** 對外／下游：先洗 PII 樣式，再去路徑與 token 類樣式 */
export function sanitizeForDownstream(text: string): string {
  return sanitizeForExternalPayload(stripPIIFromText(text));
}
