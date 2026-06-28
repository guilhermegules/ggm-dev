import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { BlogFile, SyncConfig, DownloadCounts, FileType, Logger } from '@sync/types';
import { downloadRaw, fetchBlob } from '@sync/github';
import { isNotFoundError } from '@sync/errors';
import { concurrentMap } from '@sync/concurrency';

export function classifyFile(file: BlogFile): FileType {
  const path = file.remotePath.toLowerCase();
  return path.endsWith('.md') || path.endsWith('.mdx') ? 'markdown' : 'asset';
}

export function localPathsForRemoved(
  remotePath: string,
  contentRoot: string,
  contentDir: string,
  publicDir: string,
): string[] {
  const prefix = `${contentRoot}/`;
  const relative = remotePath.startsWith(prefix)
    ? remotePath.slice(prefix.length)
    : remotePath;

  return [
    `${contentDir}/${relative}`,
    `${publicDir}/${relative}`,
  ];
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

async function writeBlogFile(file: BlogFile, data: ArrayBuffer): Promise<void> {
  await ensureDir(file.localPath);
  await writeFile(file.localPath, Buffer.from(data));
}

async function downloadOne(
  file: BlogFile,
  config: SyncConfig,
  logger: Logger,
): Promise<void> {
  try {
    const data = await downloadRaw(config, file.remotePath, logger);
    await writeBlogFile(file, data);
  } catch (err) {
    logger.warn(`Raw download failed for ${file.remotePath}, falling back to blob API: ${err}`);
    const data = await fetchBlob(config, file.sha, logger);
    await writeBlogFile(file, data);
  }
}

async function removeSingleFile(localPath: string): Promise<boolean> {
  try {
    await unlink(localPath);
    return true;
  } catch (err: unknown) {
    if (isNotFoundError(err)) return false;
    throw err;
  }
}

export async function downloadFiles(
  files: readonly BlogFile[],
  config: SyncConfig,
  logger: Logger,
): Promise<DownloadCounts> {
  if (files.length === 0) return { markdown: 0, asset: 0 };

  logger.info(`Downloading ${files.length} files...`);

  const types = await concurrentMap(
    files,
    async (file) => {
      await downloadOne(file, config, logger);
      return classifyFile(file);
    },
    config.concurrency,
  );

  return {
    markdown: types.filter((t): t is 'markdown' => t === 'markdown').length,
    asset: types.filter((t): t is 'asset' => t === 'asset').length,
  };
}

export async function removeFiles(
  remotePaths: readonly string[],
  config: SyncConfig,
  logger: Logger,
): Promise<number> {
  let deleted = 0;

  for (const remotePath of remotePaths) {
    const localPaths = localPathsForRemoved(
      remotePath,
      config.contentRoot,
      config.contentDir,
      config.publicDir,
    );

    for (const localPath of localPaths) {
      try {
        const removed = await removeSingleFile(localPath);
        if (removed) deleted++;
      } catch (err) {
        logger.warn(`Failed to delete ${localPath}: ${err}`);
      }
    }
  }

  return deleted;
}
