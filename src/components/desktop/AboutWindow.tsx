import React from "react";

export default function AboutWindow() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] p-6 md:p-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-[var(--cin-separator)] flex-shrink-0">
        <img
          src="/me.jpg"
          alt="Guilherme Gules Moreira"
          className="w-24 h-24 rounded-lg border-2 border-[var(--cin-border)] object-cover shadow-sm flex-shrink-0"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-1">Guilherme Gules Moreira</h1>
          <p className="text-[var(--cin-fg-dim)] text-sm mb-3">
            Engenheiro de Software Sênior • Fullstack & Inteligência Artificial
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="cin-badge">Java & Spring Boot</span>
            <span className="cin-badge">Node.js & React</span>
            <span className="cin-badge">IA Generativa & SDD</span>
            <span className="cin-badge">Cinnamon CSS</span>
          </div>
        </div>
      </div>

      <div className="cin-pref-card mb-6">
        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🚀</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Engenharia Full Stack & Alta Complexidade</div>
            <div className="cin-pref-desc">Aplicações escaláveis e resilientes com Java (Spring Boot), Node.js (NestJS/Express) e React.</div>
          </div>
        </div>

        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🏛️</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Arquitetura de Microsserviços & BFFs</div>
            <div className="cin-pref-desc">Concepção ponta a ponta, Micro Frontends, mensageria, observabilidade e modernização tecnológica.</div>
          </div>
        </div>

        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🤖</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">IA Generativa no Ciclo de Desenvolvimento</div>
            <div className="cin-pref-desc">Spec-Driven Development, Kiro, Amazon Q, agentes especializados e skills customizadas.</div>
          </div>
        </div>

        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🌿</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Open Source & Cinnamon CSS</div>
            <div className="cin-pref-desc">Criador da biblioteca Cinnamon CSS, trazendo a estética do Linux Mint para a web.</div>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-sm md:text-base leading-relaxed mb-6 space-y-4">
        <p>
          Sou Engenheiro de Software Sênior, com sólida experiência no desenvolvimento, evolução e modernização de aplicações escaláveis e de alta disponibilidade, atuando como Fullstack em ambientes de alta complexidade. Tenho experiência com Java (Spring Boot), Node.js (NestJS/Express) e React, com forte atuação em arquitetura de microsserviços, BFFs (Backend for Frontend) e Micro Frontends. Atuo desde a concepção e arquitetura até a implementação e sustentação de soluções, incluindo criação de serviços do zero, definição de padrões, observabilidade, integrações via APIs REST, processamento assíncrono, mensageria e estratégias de modernização tecnológica, incluindo evolução para versões mais recentes do Java.
        </p>
        <p>
          Tenho forte atuação na aplicação de Inteligência Artificial Generativa ao ciclo de desenvolvimento, utilizando Spec-Driven Development, Kiro e Amazon Q. Desenvolvo e utilizo skills customizadas e agentes especializados para automatizar atividades de desenvolvimento, testes de integração entre microsserviços, publicação e consumo de mensagens, validação de fluxos ponta a ponta e migração e transformação de sistemas. Busco combinar visão arquitetural, excelência técnica e inovação para construir soluções robustas e sustentáveis, promovendo automação, melhoria contínua, qualidade de engenharia e colaboração entre equipes.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--cin-separator)] mt-auto">
        <a
          href="/files/curriculo-guilhermegulesmoreira.pdf"
          download
          className="cin-btn cin-btn-suggested"
        >
          📄 Baixar Currículo (PDF)
        </a>
        <a
          href="https://www.linkedin.com/in/guilhermegules/"
          target="_blank"
          rel="noopener noreferrer"
          className="cin-btn"
        >
          🔗 LinkedIn
        </a>
        <a
          href="https://github.com/guilhermegules"
          target="_blank"
          rel="noopener noreferrer"
          className="cin-btn"
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}
