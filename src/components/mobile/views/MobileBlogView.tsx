import React, { useState } from "react";
import type { BlogPostData } from "../../desktop/types";

interface MobileBlogViewProps {
  posts: BlogPostData[];
}

export default function MobileBlogView({ posts }: MobileBlogViewProps) {
  const [search, setSearch] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24">
      <div className="cin-box p-4 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <div>
              <h1 className="text-base font-bold text-[var(--cin-fg-base)] leading-none">
                Artigos & Guias
              </h1>
              <p className="text-xs text-[var(--cin-fg-dim)] mt-0.5 mb-0">
                Conteúdos sobre frontend, arquitetura e engenharia
              </p>
            </div>
          </div>
          <span className="cin-badge text-xs flex-shrink-0">
            {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
          </span>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--cin-fg-dim)]">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[var(--cin-border)] bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] text-sm placeholder-[var(--cin-fg-dim)] focus:outline-none focus:border-[var(--cin-accent)] transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpar pesquisa"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs w-5 h-5 rounded-full bg-[var(--cin-bg-surface)] text-[var(--cin-fg-dim)] hover:text-[var(--cin-fg-base)] flex items-center justify-center border border-[var(--cin-border)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="cin-box p-8 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] text-center space-y-2">
          <span className="text-3xl block">🔍</span>
          <h2 className="text-sm font-bold text-[var(--cin-fg-base)] m-0">
            Nenhum artigo encontrado
          </h2>
          <p className="text-xs text-[var(--cin-fg-dim)] m-0">
            Tente pesquisar com outros termos ou limpe o filtro.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="cin-btn cin-btn-sm mt-3"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="cin-box p-4 sm:p-5 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] hover:border-[var(--cin-accent)] hover:shadow-sm transition-all flex flex-col justify-between text-inherit no-underline group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="cin-badge text-[11px] py-0.5 px-2.5">
                    {post.pubDate}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--cin-fg-dim)] truncate max-w-[120px]">
                    {post.id}
                  </span>
                </div>

                <h2 className="text-base font-bold text-[var(--cin-fg-base)] group-hover:text-[var(--cin-accent)] transition-colors line-clamp-2 mb-2 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--cin-fg-dim)] line-clamp-3 leading-relaxed m-0">
                  {post.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--cin-separator)] flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--cin-accent)] group-hover:underline flex items-center gap-1">
                  <span>Ler artigo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <span className="text-[11px] text-[var(--cin-fg-dim)]">
                  Publicação técnica
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
