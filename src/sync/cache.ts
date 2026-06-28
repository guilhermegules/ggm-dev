import { readFile, writeFile } from 'node:fs/promises';
import type { Logger, SyncCache, SyncDiff, BlogFile } from '@sync/types';
import { isNotFoundError } from '@sync/errors';

function hasChanged(cache: SyncCache, remotePath: string, sha: string): boolean {
  const entry = cache[remotePath];
  return !entry || entry.sha !== sha;
}

export function diffAgainstCache(cache: SyncCache, files: readonly BlogFile[]): SyncDiff {
  const currentPaths = new Set(files.map((f) => f.remotePath));

  return {
    toDownload: files.filter((f) => hasChanged(cache, f.remotePath, f.sha)),
    toSkip: files.filter((f) => !hasChanged(cache, f.remotePath, f.sha)),
    toRemove: Object.keys(cache).filter((p) => !currentPaths.has(p)),
  };
}

export function mergeCache(cache: SyncCache, diff: SyncDiff): SyncCache {
  const removed = new Set(diff.toRemove);

  const kept = Object.fromEntries(
    Object.entries(cache).filter(([key]) => !removed.has(key)),
  );

  const added: SyncCache = Object.fromEntries(
    diff.toDownload.map((f) => [f.remotePath, { sha: f.sha }]),
  );

  return { ...kept, ...added };
}

export async function loadCacheFromDisk(
  cacheFile: string,
  logger: Logger,
): Promise<SyncCache> {
  try {
    const raw = await readFile(cacheFile, 'utf-8');
    const cache: unknown = JSON.parse(raw);

    if (typeof cache !== 'object' || cache === null) {
      logger.warn('Cache file is malformed, starting fresh');
      return {};
    }

    const valid: SyncCache = {};
    for (const [key, val] of Object.entries(cache)) {
      if (val && typeof val === 'object' && 'sha' in val && typeof (val as { sha: unknown }).sha === 'string') {
        valid[key] = { sha: (val as { sha: string }).sha };
      }
    }

    return valid;
  } catch (err: unknown) {
    if (isNotFoundError(err)) {
      logger.debug('No cache file found, starting fresh');
      return {};
    }
    logger.warn(`Failed to read cache: ${err}, starting fresh`);
    return {};
  }
}

export async function saveCacheToDisk(cacheFile: string, cache: SyncCache): Promise<void> {
  const raw = JSON.stringify(cache, null, 2);
  await writeFile(cacheFile, raw, 'utf-8');
}
