import React from "react";

const LINKS = [
  {
    title: "GitHub",
    desc: "Projetos de código aberto, repositórios e contribuições.",
    url: "https://github.com/guilhermegules",
    icon: "🐙",
  },
  {
    title: "LinkedIn",
    desc: "Trajetória profissional, conexões e artigos na rede.",
    url: "https://www.linkedin.com/in/guilhermegules/",
    icon: "💼",
  },
  {
    title: "Cinnamon CSS",
    desc: "Biblioteca CSS emulando o Linux Mint Cinnamon para a web.",
    url: "https://github.com/guilhermegules/cinnamon-css",
    icon: "🌿",
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
    desc: "Inscreva-se para receber atualizações do blog no seu leitor RSS.",
    url: "/rss.xml",
    icon: "📡",
  },
];

export default function LinksWindow() {
  return (
    <div className="flex flex-col h-full bg-[var(--cin-bg-base)] text-[var(--cin-fg-base)] overflow-y-auto p-6">
      <div className="mb-4 pb-3 border-b border-[var(--cin-separator)] flex items-center gap-2">
        <span className="text-xl">🔗</span>
        <div>
          <h2 className="text-base font-bold m-0 text-[var(--cin-fg-base)]">
            Meus Links & Projetos
          </h2>
          <p className="text-xs text-[var(--cin-fg-dim)] m-0">
            Conecte-se comigo e explore repositórios abertos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LINKS.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            download={item.download ? true : undefined}
            className="cin-box p-3 rounded-lg bg-[var(--cin-bg-surface)] hover:border-[var(--cin-accent)] hover:shadow-sm transition-all flex items-start gap-3 text-inherit no-underline group"
          >
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold group-hover:text-[var(--cin-accent)] transition-colors">
                {item.title}
              </div>
              <div className="text-xs text-[var(--cin-fg-dim)] line-clamp-2 mt-0.5">
                {item.desc}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
