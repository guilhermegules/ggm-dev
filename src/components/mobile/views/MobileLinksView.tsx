import React from "react";

const LINKS_DATA = [
  {
    title: "GitHub",
    desc: "Projetos de código aberto, repositórios e contribuições públicas.",
    url: "https://github.com/guilhermegules",
    icon: "🐙",
  },
  {
    title: "Cinnamon CSS",
    desc: "Biblioteca CSS emulando a interface do Linux Mint Cinnamon para a web.",
    url: "https://github.com/guilhermegules/cinnamon-css",
    icon: "🌿",
  },
  {
    title: "LinkedIn",
    desc: "Trajetória profissional, conexões e artigos na rede.",
    url: "https://www.linkedin.com/in/guilhermegules/",
    icon: "💼",
  },
  {
    title: "Currículo (PDF)",
    desc: "Download do currículo atualizado em formato PDF.",
    url: "/files/curriculo-guilhermegulesmoreira.pdf",
    icon: "📄",
    download: true,
  },
  {
    title: "Feed RSS",
    desc: "Acompanhe novos artigos através do seu agregador de notícias RSS.",
    url: "/rss.xml",
    icon: "📡",
  },
  {
    title: "Contato Direto",
    desc: "Envie uma mensagem profissional ou proposta de colaboração.",
    url: "mailto:guilhermegules@gmail.com",
    icon: "✉️",
  },
];

export default function MobileLinksView() {
  return (
    <div className="space-y-4 pb-24">
      <div className="cin-box p-4 rounded-2xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)]">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🔗</span>
          <div>
            <h1 className="text-base font-bold text-[var(--cin-fg-base)] leading-none">
              Links & Conexões
            </h1>
            <p className="text-xs text-[var(--cin-fg-dim)] mt-1 mb-0">
              Canais oficiais, repositórios e projetos abertos
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {LINKS_DATA.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            download={link.download ? true : undefined}
            className="cin-box p-4 rounded-xl bg-[var(--cin-bg-surface)] border border-[var(--cin-border)] hover:border-[var(--cin-accent)] hover:shadow-sm transition-all flex items-start gap-3.5 text-inherit no-underline group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--cin-bg-base)] border border-[var(--cin-border)] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
              {link.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h2 className="text-sm font-bold text-[var(--cin-fg-base)] group-hover:text-[var(--cin-accent)] transition-colors m-0">
                  {link.title}
                </h2>
                <span className="text-xs text-[var(--cin-fg-dim)] group-hover:text-[var(--cin-accent)] group-hover:translate-x-0.5 transition-all">
                  ↗
                </span>
              </div>
              <p className="text-xs text-[var(--cin-fg-dim)] line-clamp-2 mt-1 mb-0 leading-relaxed">
                {link.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
