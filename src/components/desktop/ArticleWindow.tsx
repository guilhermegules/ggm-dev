import React, { useMemo } from "react";
import { marked } from "marked";
import type { BlogPostData } from "./types";

interface ArticleWindowProps {
  post: BlogPostData;
  onClose?: () => void;
}

export default function ArticleWindow({ post, onClose }: ArticleWindowProps) {
  // Parse markdown into HTML cleanly
  const htmlContent = useMemo(() => {
    if (!post.body) return "<p>Conteúdo do artigo indisponível.</p>";

    let clean = post.body.trim();
    // Strip yaml frontmatter if present
    if (clean.startsWith("---")) {
      const endIdx = clean.indexOf("---", 3);
      if (endIdx !== -1) {
        clean = clean.slice(endIdx + 3).trim();
      }
    }

    try {
      return marked.parse(clean, {
        gfm: true,
        breaks: true,
      }) as string;
    } catch {
      return `<p>${clean}</p>`;
    }
  }, [post.body]);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)]">
      {/* Hero Image */}
      {post.heroImage && (
        <div className="w-full bg-[var(--cin-bg-alt)] border-b border-[var(--cin-separator)] overflow-hidden flex-shrink-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full max-h-64 object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex-1">
        <header className="mb-6 pb-4 border-b border-[var(--cin-separator)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="cin-badge">{post.pubDate}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-[var(--cin-fg-base)]">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-base text-[var(--cin-fg-dim)] leading-relaxed italic m-0">
              {post.description}
            </p>
          )}
        </header>

        {/* Rendered Markdown Body */}
        <div
          className="cin-markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <footer className="mt-8 pt-4 border-t border-[var(--cin-separator)] flex items-center justify-between">
          <span className="text-xs text-[var(--cin-fg-subtle)]">
            Escrito por Guilherme Gules Moreira
          </span>
          <a
            href={`/blog/${post.id}`}
            className="cin-btn cin-btn-sm cin-btn-suggested"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir URL direta &rarr;
          </a>
        </footer>
      </div>
    </div>
  );
}
