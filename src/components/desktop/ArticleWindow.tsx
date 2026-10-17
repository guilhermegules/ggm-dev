import React, { useMemo, useState } from "react";
import type { BlogPostData } from "./types";
import "../../utils/giscus";

interface ArticleWindowProps {
  post: BlogPostData;
  onClose?: () => void;
}

export default function ArticleWindow({ post }: ArticleWindowProps) {
  const [copied, setCopied] = useState(false);
  const sharePath = `/blog/${post.id}`;

  const contentHtml = useMemo(() => {
    if (post.html) {
      return post.html;
    }

    if (typeof document !== "undefined") {
      const tpl = document.querySelector<HTMLTemplateElement>(
        `template[data-post-template="${post.id}"]`
      );
      if (tpl?.innerHTML) {
        return tpl.innerHTML;
      }
    }

    return "<p>Conteúdo do artigo indisponível.</p>";
  }, [post.id, post.html]);

  const handleCopyLink = async () => {
    const url =
      typeof window !== "undefined"
        ? new URL(sharePath, window.location.origin).toString()
        : sharePath;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)]">
      {post.heroImage && (
        <div className="w-full bg-[var(--cin-bg-alt)] border-b border-[var(--cin-separator)] overflow-hidden flex-shrink-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full max-h-64 object-cover"
          />
        </div>
      )}

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

        <div
          className="prose cin-markdown-body max-w-none text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="mt-8 pt-4 border-t border-[var(--cin-separator)] flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[var(--cin-fg-subtle)]">
            Escrito por Guilherme Gules Moreira
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="cin-btn cin-btn-sm cin-btn-flat text-xs"
              title="Copiar link do artigo"
            >
              {copied ? "Link copiado!" : "Copiar link"}
            </button>
            <a
              href={sharePath}
              target="_blank"
              rel="noreferrer"
              className="cin-btn cin-btn-sm cin-btn-flat text-xs no-underline"
              title="Abrir artigo em nova aba"
            >
              Abrir página
            </a>
          </div>
        </footer>

        <div className="cin-box p-4 md:p-6 mt-4 bg-[var(--cin-bg-surface)] rounded-lg">
          {React.createElement("cin-giscus", { className: "block w-full" })}
        </div>
      </div>
    </div>
  );
}
