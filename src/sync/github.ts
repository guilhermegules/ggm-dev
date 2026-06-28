import type { SyncConfig, GitHubTreeResponse, Logger } from '@sync/types';
import { sleep } from '@sync/concurrency';

const API_BASE = 'https://api.github.com';
const RAW_BASE = 'https://raw.githubusercontent.com';

interface GitHubError {
  message: string;
  documentation_url?: string;
}

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'ggm-sync/1.0',
  };
}

async function deserializeError(response: Response): Promise<string> {
  try {
    const body: GitHubError = await response.json();
    return body.message || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  logger: Logger,
  maxRetries = 3,
): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) return response;

    if (response.status === 429 || response.status === 403) {
      const retryAfter = response.headers.get('Retry-After');
      const wait = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : Math.min(1000 * 2 ** attempt, 16_000);

      logger.warn(`Rate limited. Waiting ${wait}ms before retry ${attempt + 1}/${maxRetries}`);
      await sleep(wait);
      continue;
    }

    if (response.status >= 500 && attempt < maxRetries - 1) {
      const wait = Math.min(1000 * 2 ** attempt, 16_000);
      logger.warn(
        `Server error ${response.status}. Retrying in ${wait}ms (${attempt + 1}/${maxRetries})`,
      );
      await sleep(wait);
      continue;
    }

    const msg = await deserializeError(response);
    throw new Error(`GitHub API error ${response.status}: ${msg}`);
  }

  throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`);
}

export async function fetchTree(
  config: SyncConfig,
  logger: Logger,
): Promise<GitHubTreeResponse> {
  const url = `${API_BASE}/repos/${config.owner}/${config.repo}/git/trees/${config.branch}?recursive=1`;

  const response = await fetchWithRetry(
    url,
    {
      headers: {
        ...authHeaders(config.token),
        Accept: 'application/vnd.github+json',
      },
    },
    logger,
  );

  const data: GitHubTreeResponse = await response.json();

  if (data.truncated) {
    logger.warn('Git tree is truncated. Large repositories may need subtree fetching.');
  }

  return data;
}

export async function downloadRaw(
  config: SyncConfig,
  path: string,
  logger: Logger,
): Promise<ArrayBuffer> {
  const encodedPath = path
    .split('/')
    .map(encodeURIComponent)
    .join('/');

  const url = `${RAW_BASE}/${config.owner}/${config.repo}/${config.branch}/${encodedPath}`;

  const response = await fetchWithRetry(
    url,
    { headers: authHeaders(config.token) },
    logger,
  );

  return response.arrayBuffer();
}

export async function fetchBlob(
  config: SyncConfig,
  sha: string,
  logger: Logger,
): Promise<ArrayBuffer> {
  const url = `${API_BASE}/repos/${config.owner}/${config.repo}/git/blobs/${sha}`;

  const response = await fetchWithRetry(
    url,
    {
      headers: {
        ...authHeaders(config.token),
        Accept: 'application/vnd.github+json',
      },
    },
    logger,
  );

  const data = await response.json() as { content: string; encoding: string };

  if (data.encoding !== 'base64') {
    throw new Error(`Unexpected blob encoding: ${data.encoding}`);
  }

  const binary = Uint8Array.from(atob(data.content), (c) => c.charCodeAt(0));
  return binary.buffer;
}
