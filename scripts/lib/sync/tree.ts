import type { GitHubTreeItem, BlogFile } from './types';

const ALLOWED_EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
]);

const ASSET_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
]);

function extension(path: string): string {
  const idx = path.lastIndexOf('.');
  return idx === -1 ? '' : path.slice(idx).toLowerCase();
}

export function filterBlogFiles(
  items: readonly GitHubTreeItem[],
  contentRoot: string,
  contentDir: string,
  publicDir: string,
): BlogFile[] {
  const prefix = `${contentRoot}/`;

  return items
    .filter((item): item is GitHubTreeItem =>
      item.type === 'blob'
      && item.path.startsWith(prefix)
      && ALLOWED_EXTENSIONS.has(extension(item.path)),
    )
    .map((item) => {
      const relative = item.path.slice(prefix.length);
      const isAsset = ASSET_EXTENSIONS.has(extension(item.path));
      const base = isAsset ? publicDir : contentDir;

      return {
        remotePath: item.path,
        localPath: `${base}/${relative}`,
        sha: item.sha,
        size: item.size,
        isAsset,
      };
    });
}
