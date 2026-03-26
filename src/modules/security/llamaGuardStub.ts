import type { UniversalLogger } from '../logger';
import { isDevRelaxedGuard } from './guardPolicy';

/**
 * Llama Guard 類資安防衛占位：正式環境請改為實際 Guard API/SDK。
 * 本機開發可設 DEV_RELAXED_MODE=1 略過此 stub（仍不繞過法律或平台 ToS）。
 */
export async function screenWithLlamaGuardStub(
  text: string,
  log: UniversalLogger
): Promise<{ safe: boolean; reason?: string }> {
  if (isDevRelaxedGuard()) {
    log.debug('llama_guard.stub_skipped_dev_relaxed', { len: text.length });
    return { safe: true };
  }
  log.debug('llama_guard.stub', { len: text.length });
  return { safe: true };
}
