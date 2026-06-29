import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadConfig } from './lib/sync/config';
import { createLogger } from './lib/sync/logger';
import { synchronize } from './lib/sync/synchronize';

function loadEnvFile(filePath: string): void {
  try {
    const resolved = resolve(filePath);
    if (!existsSync(resolved)) return;

    const content = readFileSync(resolved, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env file is optional
  }
}

async function main(): Promise<void> {
  loadEnvFile('.env');
  loadEnvFile('.env.production');

  const logger = createLogger();
  let config;

  try {
    config = loadConfig();
  } catch (err) {
    logger.error(String(err));
    process.exit(1);
  }

  try {
    await synchronize(config, logger);
  } catch (err) {
    logger.error(`Synchronization failed: ${err}`);
    process.exit(1);
  }
}

main();
