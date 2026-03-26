/**
 * 小 C 模組：標準化日誌介面（可替換為雲端、結構化 JSON、或 365 同步）
 */
export interface UniversalLogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  /** 具名事件，便於之後匯入「消化池」或稽核 */
  logEvent(name: string, payload: Record<string, unknown>): void;
}

export function createConsoleLogger(scope = 'app'): UniversalLogger {
  const out = (level: 'debug' | 'info' | 'warn', message: string, meta?: Record<string, unknown>) => {
    const line = meta ? `${message} ${JSON.stringify(meta)}` : message;
    const prefix = `[${scope}] ${level.toUpperCase()} ${line}`;
    if (level === 'warn') console.warn(prefix);
    else console.log(prefix);
  };

  return {
    debug: (message, meta) => out('debug', message, meta),
    info: (message, meta) => out('info', message, meta),
    warn: (message, meta) => out('warn', message, meta),
    error: (message, meta) => console.error(`[${scope}] ERROR ${message}`, meta ?? ''),
    logEvent: (name, payload) => console.log(`[${scope}] EVENT ${name}`, JSON.stringify(payload)),
  };
}
