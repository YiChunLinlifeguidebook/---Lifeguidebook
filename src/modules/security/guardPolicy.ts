/**
 * 本機開發可放寬 Guard（僅限 DEV_RELAXED_MODE=1 且非 production）。
 * 正式環境請勿設定 DEV_RELAXED_MODE。
 */
export function isDevRelaxedGuard(): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  return process.env.DEV_RELAXED_MODE === '1' || process.env.DEV_RELAXED_MODE === 'true';
}
