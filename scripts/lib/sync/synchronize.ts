import type { SyncConfig, SyncSummary, Logger } from './types';
import { fetchTree } from './github';
import { filterBlogFiles } from './tree';
import { loadCacheFromDisk, saveCacheToDisk, diffAgainstCache, mergeCache } from './cache';
import { downloadFiles, removeFiles } from './download';

export async function synchronize(
  config: SyncConfig,
  logger: Logger,
): Promise<SyncSummary> {
  const start = performance.now();

  logger.info('Reading Git tree...');
  const tree = await fetchTree(config, logger);

  const blogFiles = filterBlogFiles(
    tree.tree,
    config.contentRoot,
    config.contentDir,
    config.publicDir,
  );

  logger.info(`Found ${blogFiles.length} files inside ${config.contentRoot}/`);

  const cache = await loadCacheFromDisk(config.cacheFile, logger);

  const diff = diffAgainstCache(cache, blogFiles);

  const counts = await downloadFiles(diff.toDownload, config, logger);

  const deleted = await removeFiles(diff.toRemove, config, logger);

  const nextCache = mergeCache(cache, diff);

  await saveCacheToDisk(config.cacheFile, nextCache);

  const durationMs = Math.round(performance.now() - start);

  logger.info(`Downloaded ${counts.markdown} Markdown files`);
  if (counts.asset > 0) {
    logger.info(`Downloaded ${counts.asset} image${counts.asset !== 1 ? 's' : ''}`);
  }
  logger.info(`Skipped ${diff.toSkip.length} unchanged files`);
  if (deleted > 0) {
    logger.info(`Deleted ${deleted} removed file${deleted !== 1 ? 's' : ''}`);
  }
  logger.info(`Synchronization completed in ${durationMs}ms`);

  return {
    markdownDownloaded: counts.markdown,
    assetsDownloaded: counts.asset,
    skipped: diff.toSkip.length,
    deleted,
    totalFiles: blogFiles.length,
    durationMs,
  };
}
