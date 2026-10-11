import React from "react";
import type { BlogPostData } from "./types";

interface ArticleWindowProps {
  post: BlogPostData;
  onClose?: () => void;
}

export default function ArticleWindow({ post, onClose }: ArticleWindowProps) {
  // Render simple markdown paragraphs and headings cleanly
  const renderContent = (bodyText?: string) => {
    if (!bodyText) return <p className="text-gray-400">Conteúdo do artigo indisponível.</p>;

    const lines = bodyText.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: number) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        elements.push(
          <p key={key} className="mb-4 leading-relaxed text-[var(--cin-fg-base)]">
            {text}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        flushParagraph(idx);
        elements.push(
          <h2
            key={idx}
            className="text-xl font-bold mt-6 mb-3 pb-1 border-b border-[var(--cin-separator)] text-[var(--cin-fg-base)]"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(idx);
        elements.push(
          <h3 key={idx} className="text-lg font-bold mt-4 mb-2 text-[var(--cin-fg-base)]">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("```")) {
        flushParagraph(idx);
        // Code block indicator
      } else if (trimmed === "") {
        flushParagraph(idx);
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph(lines.length);
    return elements;
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)]">
      {/* Hero Image */}
      {post.heroImage && (
        <div className="w-full bg-[var(--cin-bg-alt)] border-b border-[var(--cin-separator)] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full max-h-64 object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="p-6 md:p-8 max-w-3xl mx-auto w-full">
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

        <div className="prose max-w-none text-base">
          {renderContent(post.body)}
        </div>

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
