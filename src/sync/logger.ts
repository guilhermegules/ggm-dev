import type { Logger } from '@sync/types';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export function createLogger(prefix?: string): Logger {
  function format(level: LogLevel, msg: string): string {
    const ts = new Date().toISOString().slice(11, 23);
    const pfx = prefix ? ` [${prefix}]` : '';
    return `${ts}  ${level.padEnd(5)}${pfx} ${msg}`;
  }

  return {
    info(msg: string) {
      console.info(format('info', msg));
    },
    warn(msg: string) {
      console.warn(format('warn', msg));
    },
    error(msg: string) {
      console.error(format('error', msg));
    },
    debug(msg: string) {
      if (process.env.DEBUG) {
        console.debug(format('debug', msg));
      }
    },
  };
}
