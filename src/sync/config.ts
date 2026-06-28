import type { SyncConfig } from '@sync/types';

export function loadConfig(): SyncConfig {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const token = process.env.GITHUB_TOKEN;
  const contentRoot = process.env.CONTENT_ROOT;

  const missing: string[] = [];
  if (!owner) missing.push('GITHUB_OWNER');
  if (!repo) missing.push('GITHUB_REPO');
  if (!branch) missing.push('GITHUB_BRANCH');
  if (!token) missing.push('GITHUB_TOKEN');
  if (!contentRoot) missing.push('CONTENT_ROOT');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    owner: owner!,
    repo: repo!,
    branch: branch!,
    token: token!,
    contentRoot: contentRoot!,
    contentDir: 'src/content/blog',
    publicDir: 'public/blog',
    cacheFile: '.sync-cache.json',
    concurrency: Number(process.env.SYNC_CONCURRENCY) || 10,
  };
}
