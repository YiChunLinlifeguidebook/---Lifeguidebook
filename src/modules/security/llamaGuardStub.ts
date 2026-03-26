import type { UniversalLogger } from '../logger';

/**
 * Llama Guard 類資安防衛占位：正式環境請改為實際 Guard API/SDK。
 * 輸入為使用者或上游文字；回傳是否允許進入主模型鏈。
 */
export async function screenWithLlamaGuardStub(
  text: string,
  log: UniversalLogger
): Promise<{ safe: boolean; reason?: string }> {
  log.debug('llama_guard.stub', { len: text.length });
  return { safe: true };
}
