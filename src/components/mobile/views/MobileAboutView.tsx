import React from "react";
import type { BlogPostData } from "../../desktop/types";

interface MobileAboutViewProps {
  posts: BlogPostData[];
  onGoToBlog: () => void;
}

export default function MobileAboutView({ posts, onGoToBlog }: MobileAboutViewProps) {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-6 pb-24">
      <section className="cin-box p-5 sm:p-6 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <img
            src="/me.jpg"
            alt="Guilherme Gules Moreira"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[var(--cin-border)] object-cover shadow-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--cin-fg-base)] mb-1">
              Guilherme Gules Moreira
            </h1>
            <p className="text-xs sm:text-sm text-[var(--cin-fg-dim)] mb-3 leading-relaxed">
              Desenvolvedor Full Stack • Especialista em Arquitetura & Acessibilidade
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              <span className="cin-badge">React & Angular</span>
              <span className="cin-badge">Node.js & Java</span>
              <span className="cin-badge">WCAG Acessibilidade</span>
              <span className="cin-badge">Cinnamon CSS</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-5 pt-4 border-t border-[var(--cin-separator)] justify-center sm:justify-start">
          <a
            href="/files/curriculo-guilhermegulesmoreira.pdf"
            download
            className="cin-btn cin-btn-suggested text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
          >
            <span>📄</span>
            <span>Baixar Currículo (PDF)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/guilhermegules/"
            target="_blank"
            rel="noopener noreferrer"
            className="cin-btn text-xs py-2 px-3 inline-flex items-center gap-1.5"
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/guilhermegules"
            target="_blank"
            rel="noopener noreferrer"
            className="cin-btn text-xs py-2 px-3 inline-flex items-center gap-1.5"
          >
            <span>🐙</span>
            <span>GitHub</span>
          </a>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--cin-fg-dim)] px-1">
          Áreas de Atuação
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              Desenvolvimento Full Stack
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Aplicações resilientes com TypeScript, Angular, React, Node.js, NestJS e Spring.
            </p>
          </div>

          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">🏛️</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              Arquitetura & Escalabilidade
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Separação modular com Microfrontends e Backends for Frontends (BFFs).
            </p>
          </div>

          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">♿</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              Acessibilidade Digital (WCAG)
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Interfaces inclusivas com semântica acessível e alto padrão de usabilidade.
            </p>
          </div>

          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">🌿</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              Open Source & Cinnamon CSS
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Criador da biblioteca Cinnamon CSS trazendo a estética Linux Mint para a web.
            </p>
          </div>
        </div>
      </section>

      <section className="cin-box p-5 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
        <h2 className="text-base font-bold text-[var(--cin-fg-base)] mb-3 flex items-center gap-2">
          <span>📖</span>
          <span>Sobre Mim</span>
        </h2>
        <div className="text-xs sm:text-sm text-[var(--cin-fg-base)] leading-relaxed space-y-3">
          <p className="m-0">
            Meu nome é Guilherme Gules Moreira ou apenas Gules, sou desenvolvedor de software, apaixonado por criar soluções escaláveis e impactantes. Desde que comecei minha jornada na tecnologia, mergulhei de cabeça no universo do desenvolvimento full stack, explorando frameworks como Angular, React, Node.js, NestJS e Spring.
          </p>
          <p className="m-0">
            Além de escrever código, me dedico a arquiteturas modernas como Microfrontends e Backends for Frontends (BFFs), sempre buscando separar responsabilidades de forma eficiente e inteligente.
          </p>
          <p className="m-0">
            Acredito que compartilhar conhecimento é tão importante quanto escrever uma boa função assíncrona. Atualmente, priorizo acessibilidade seguindo as diretrizes da WCAG, garantindo que a tecnologia seja inclusiva e acessível a todas as pessoas.
          </p>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--cin-fg-dim)]">
              Artigos Recentes
            </h2>
            <button
              type="button"
              onClick={onGoToBlog}
              className="text-xs font-semibold text-[var(--cin-accent)] hover:underline flex items-center gap-1"
            >
              <span>Ver todos</span>
              <span>→</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {recentPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="block cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] hover:border-[var(--cin-accent)] transition-all no-underline text-inherit group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="cin-badge text-[10px] py-0 px-2">{post.pubDate}</span>
                  <span className="text-[11px] font-semibold text-[var(--cin-accent)] group-hover:translate-x-0.5 transition-transform">
                    Ler artigo →
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--cin-fg-base)] group-hover:text-[var(--cin-accent)] transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--cin-fg-dim)] line-clamp-2 m-0 leading-relaxed">
                  {post.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
