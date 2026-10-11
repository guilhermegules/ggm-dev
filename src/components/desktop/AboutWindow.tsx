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
            Desenvolvedor Full Stack • Especialista em Arquitetura & Acessibilidade
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="cin-badge">React & Angular</span>
            <span className="cin-badge">Node.js & Java</span>
            <span className="cin-badge">WCAG Accessibility</span>
            <span className="cin-badge">Cinnamon CSS</span>
          </div>
        </div>
      </div>

      {/* Preference Rows */}
      <div className="cin-pref-card mb-6">
        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🚀</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Desenvolvimento Full Stack</div>
            <div className="cin-pref-desc">Construção de aplicações resilientes com TypeScript, Angular, React, Node.js, NestJS e Spring.</div>
          </div>
        </div>

        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">🏛️</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Arquitetura Moderna & Escalabilidade</div>
            <div className="cin-pref-desc">Separação eficiente de responsabilidades com Microfrontends e Backends for Frontends (BFFs).</div>
          </div>
        </div>

        <div className="cin-pref-row">
          <div className="cin-pref-icon text-xl">♿</div>
          <div className="cin-pref-info">
            <div className="cin-pref-title">Acessibilidade Digital (WCAG)</div>
            <div className="cin-pref-desc">Foco em interfaces inclusivas, semântica acessível e usabilidade para todas as pessoas.</div>
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

      {/* Bio Text */}
      <div className="prose max-w-none text-sm md:text-base leading-relaxed mb-6">
        <p>
          Meu nome é Guilherme Gules Moreira ou apenas Gules, sou desenvolvedor de
          software, apaixonado por criar soluções escaláveis e impactantes. Desde
          que comecei minha jornada na tecnologia, mergulhei de cabeça no universo
          do desenvolvimento full stack, explorando frameworks como Angular,
          React, Node.js, NestJS e Spring. Além de escrever código, me dedico a
          arquiteturas modernas como Microfrontends e Backends for Frontends
          (BFFs), sempre buscando separar responsabilidades de forma eficiente e
          inteligente.
        </p>
        <p>
          Mas não vivo só de código e commits! Acredito que compartilhar
          conhecimento é tão importante quanto escrever uma boa função assíncrona.
          Por isso, estou sempre trocando ideias sobre tecnologia, acessibilidade
          e arquitetura de software. Se quiser bater um papo, é só chamar –
          prometo que o bug do dia pode esperar um pouco!
        </p>
        <p>
          Atualmente, atuo como desenvolvedor construindo aplicações que vão além
          do funcional: priorizo acessibilidade seguindo as diretrizes da WCAG,
          garantindo que a tecnologia seja inclusiva e acessível a todos.
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
