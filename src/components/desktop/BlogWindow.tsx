import React, { useState } from "react";
import type { BlogPostData } from "./types";

interface BlogWindowProps {
  posts: BlogPostData[];
  onOpenPost: (post: BlogPostData) => void;
}

export default function BlogWindow({ posts, onOpenPost }: BlogWindowProps) {
  const [search, setSearch] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] overflow-hidden">
      {/* Header bar with Search */}
      <div className="p-3 border-b border-[var(--cin-separator)] bg-[var(--cin-bg-surface)] flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <span className="text-sm font-bold">Explorador de Artigos</span>
          <span className="cin-badge">{filtered.length} artigos</span>
        </div>

        <div className="cin-search-box max-w-xs w-full">
          <span className="cin-search-icon">🔍</span>
          <input
            type="text"
            className="cin-input"
            placeholder="Filtrar artigos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post)}
              className="cin-box p-4 flex flex-col justify-between cursor-pointer hover:border-[var(--cin-accent)] transition-all hover:-translate-y-1 hover:shadow-md bg-[var(--cin-bg-surface)] rounded-lg group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="cin-badge">{post.pubDate}</span>
                  <span className="text-xs text-[var(--cin-fg-dim)] font-mono">{post.id}</span>
                </div>
                <h3 className="text-base font-bold text-[var(--cin-fg-base)] group-hover:text-[var(--cin-accent)] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--cin-fg-dim)] line-clamp-3 leading-relaxed m-0">
                  {post.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--cin-separator)] flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--cin-accent)]">
                  Abrir janela do artigo &rarr;
                </span>
                <span className="text-xs text-[var(--cin-fg-subtle)]">Document Viewer</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--cin-fg-dim)]">
            <p>Nenhum artigo encontrado para "{search}".</p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="cin-window-statusbar flex-shrink-0 text-xs px-3 py-1 bg-[var(--cin-bg-surface)] border-t border-[var(--cin-separator)] text-[var(--cin-fg-dim)] flex justify-between">
        <span>Total: {posts.length} artigos carregados</span>
        <span>Clique em qualquer artigo para abrir em uma janela separada</span>
      </div>
    </div>
  );
}
