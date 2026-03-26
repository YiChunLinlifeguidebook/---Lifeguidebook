import * as crypto from 'node:crypto';

/** 隨機匿名主體 ID（與真人無關聯，適合新會話） */
export function newSubjectUuid(): string {
  return crypto.randomUUID();
}

/**
 * 將外部系統的使用者 ID 穩定映射為假名（需固定密鑰；勿提交密鑰至 Git）。
 * 同一 secret + 同一 externalId → 同一假名；不可逆還原 externalId（在 secret 未洩漏前提下）。
 */
export function pseudonymFromExternalId(externalId: string, secret: string): string {
  if (!secret) {
    throw new Error('PSEUDONYM_SECRET (or PII_SUBJECT_SALT) is required for deterministic pseudonyms');
  }
  return crypto.createHmac('sha256', secret).update(externalId, 'utf8').digest('hex').slice(0, 32);
}

/** 從環境變數讀取密鑰後做穩定假名（與 pseudonymFromExternalId 相同演算法） */
export function pseudonymFromEnvExternalId(externalId: string): string {
  const secret = process.env.PSEUDONYM_SECRET || process.env.PII_SUBJECT_SALT || '';
  return pseudonymFromExternalId(externalId, secret);
}
