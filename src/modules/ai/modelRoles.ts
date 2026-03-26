/**
 * 多腦架構角色常數（對應 docs/google-meta-integration.md）
 * 實際 API 呼叫請在獨立 service 中依 GOOGLE_* / VERTEX_* / META_* 環境變數實作。
 */
export const ModelRole = {
  /** Gemini — 跨域消化 */
  PRIMARY_CROSS_DOMAIN: 'gemini-1.5-pro',
  /** Llama — 在地化中文等 */
  LOCALE_DIALOGUE: 'meta-llama',
} as const;

export type ModelRoleId = (typeof ModelRole)[keyof typeof ModelRole];
