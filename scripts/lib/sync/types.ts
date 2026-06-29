export interface SyncConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  contentRoot: string;
  contentDir: string;
  publicDir: string;
  cacheFile: string;
  concurrency: number;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree' | 'commit';
  sha: string;
  size: number;
  url: string;
}

export interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface BlogFile {
  remotePath: string;
  localPath: string;
  sha: string;
  size: number;
  isAsset: boolean;
}

export interface CacheEntry {
  sha: string;
}

export type SyncCache = Record<string, CacheEntry>;

export interface SyncDiff {
  toDownload: BlogFile[];
  toSkip: BlogFile[];
  toRemove: string[];
}

export interface DownloadCounts {
  markdown: number;
  asset: number;
}

export interface SyncSummary {
  markdownDownloaded: number;
  assetsDownloaded: number;
  skipped: number;
  deleted: number;
  totalFiles: number;
  durationMs: number;
}

export type FileType = 'markdown' | 'asset';

export interface Logger {
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  debug(msg: string): void;
}
