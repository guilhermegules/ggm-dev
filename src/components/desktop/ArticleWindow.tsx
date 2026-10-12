import React, { useMemo } from "react";
import { marked } from "marked";
import type { BlogPostData } from "./types";
import Giscus from "@components/Giscus";

interface ArticleWindowProps {
    post: BlogPostData;
    onClose?: () => void;
}

export default function ArticleWindow({ post, onClose }: ArticleWindowProps) {
    const contentHtml = useMemo(() => {
        if (post.html) {
            return post.html;
        }

        if (post.body) {
            let clean = post.body.trim();
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
        }

        return "<p>Conteúdo do artigo indisponível.</p>";
    }, [post.html, post.body]);

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

                <footer className="mt-8 pt-4 border-t border-[var(--cin-separator)] flex items-center justify-between">
                    <span className="text-xs text-[var(--cin-fg-subtle)]">
                        Escrito por Guilherme Gules Moreira
                    </span>
                </footer>

                <div className="cin-box p-4 md:p-6 mt-4 bg-[var(--cin-bg-surface)] rounded-lg">
                    <Giscus />
                </div>
            </div>
        </div>
    );
}
