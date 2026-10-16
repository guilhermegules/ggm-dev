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
              Engenheiro de Software Sênior • Fullstack & Inteligência Artificial
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              <span className="cin-badge">Java & Spring Boot</span>
              <span className="cin-badge">Node.js & React</span>
              <span className="cin-badge">IA Generativa & SDD</span>
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
              Engenharia Full Stack & Alta Complexidade
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Aplicações escaláveis e resilientes com Java (Spring Boot), Node.js (NestJS/Express) e React.
            </p>
          </div>

          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">🏛️</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              Arquitetura de Microsserviços & BFFs
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Concepção ponta a ponta, Micro Frontends, mensageria, observabilidade e modernização tecnológica.
            </p>
          </div>

          <div className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="text-sm font-bold text-[var(--cin-fg-base)] mb-1">
              IA Generativa no Ciclo de Desenvolvimento
            </h3>
            <p className="text-xs text-[var(--cin-fg-dim)] leading-relaxed m-0">
              Spec-Driven Development, Kiro, Amazon Q, agentes especializados e skills customizadas.
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
            Sou Engenheiro de Software Sênior, com sólida experiência no desenvolvimento, evolução e modernização de aplicações escaláveis e de alta disponibilidade, atuando como Fullstack em ambientes de alta complexidade. Tenho experiência com Java (Spring Boot), Node.js (NestJS/Express) e React, com forte atuação em arquitetura de microsserviços, BFFs (Backend for Frontend) e Micro Frontends. Atuo desde a concepção e arquitetura até a implementação e sustentação de soluções, incluindo criação de serviços do zero, definição de padrões, observabilidade, integrações via APIs REST, processamento assíncrono, mensageria e estratégias de modernização tecnológica, incluindo evolução para versões mais recentes do Java.
          </p>
          <p className="m-0">
            Tenho forte atuação na aplicação de Inteligência Artificial Generativa ao ciclo de desenvolvimento, utilizando Spec-Driven Development, Kiro e Amazon Q. Desenvolvo e utilizo skills customizadas e agentes especializados para automatizar atividades de desenvolvimento, testes de integração entre microsserviços, publicação e consumo de mensagens, validação de fluxos ponta a ponta e migração e transformação de sistemas. Busco combinar visão arquitetural, excelência técnica e inovação para construir soluções robustas e sustentáveis, promovendo automação, melhoria contínua, qualidade de engenharia e colaboração entre equipes.
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
